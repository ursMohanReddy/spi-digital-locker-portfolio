window.SPISimulator = (function () {
  // ---- Everything below adapts to the width of the stored passcode ----
  // storedPasscode "10" -> 2 bits (4 variations). "1010" -> 4 bits.
  let N = 2;                 // number of code bits (set in init)
  let TOTAL = 2 * N + 2;     // steps: 2 per bit (SCLK low/high) + 2 latch/result steps
  let bits = [1, 0];         // D(N-1) ... D0
  let stepIndex = 0;         // 0 = idle, 1..2N = shifting, 2N+1..2N+2 = latch/result
  let timer = null;
  let lockState = "LOCKED";  // LOCKED | UNLOCKED
  let lastTransmitted = "--";

  function getTargetCode() {
    return (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.meta.storedPasscode) || "10";
  }

  function getEnteredString() {
    return bits.join("");
  }

  function setupWidth() {
    const target = getTargetCode();
    const newN = target.length;
    if (newN !== N || bits.length !== newN) {
      N = newN;
      bits = target.split("").map(Number); // start on the correct code
    }
    TOTAL = 2 * N + 2;
    if (lastTransmitted.indexOf("-") === 0 || lastTransmitted.length !== N) {
      lastTransmitted = "-".repeat(N);
    }
  }

  function init() {
    stopTimer();
    const canvas = document.getElementById("spiCanvas");
    if (!canvas) return;
    setupWidth();
    stepIndex = 0;
    lockState = "LOCKED";
    lastTransmitted = "-".repeat(N);
    ensureCircuitCard();
    buildDipRow();
    bindControls();
    updateTelemetryUI();
    drawWaveform();
  }

  // Draws exactly N switches, so the page always matches the code width
  function buildDipRow() {
    const row = document.querySelector(".dip-row");
    if (!row) return;
    row.innerHTML = bits
      .map(
        (b, i) =>
          `<button class="dip-btn ${b ? "on" : ""}" data-bit="${i}"><span>D${N - 1 - i}</span><strong>${b}</strong></button>`
      )
      .join("");
  }

  function syncDipUI() {
    document.querySelectorAll(".dip-btn").forEach((btn) => {
      const idx = Number(btn.dataset.bit);
      btn.classList.toggle("on", bits[idx] === 1);
      const strong = btn.querySelector("strong");
      if (strong) strong.textContent = bits[idx];
    });
  }

  function bindControls() {
    document.querySelectorAll(".dip-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        // Changing the switches after a send starts a fresh attempt
        if (stepIndex !== 0) resetSim();
        const idx = Number(btn.dataset.bit);
        bits[idx] = bits[idx] ? 0 : 1;
        syncDipUI();
        updateTelemetryUI();
        drawWaveform();
      });
    });

    const txBtn = document.getElementById("simTransmit");
    const stepBtn = document.getElementById("simStep");
    const rstBtn = document.getElementById("simReset");

    if (txBtn) txBtn.addEventListener("click", startAutoTransmit);
    if (stepBtn) stepBtn.addEventListener("click", stepOnce);
    if (rstBtn) rstBtn.addEventListener("click", resetSim);
  }

  function startAutoTransmit() {
    stopTimer();
    stepIndex = 0;
    timer = setInterval(() => {
      if (stepIndex < TOTAL) {
        stepIndex++;
        evaluateResultIfDone();
        updateTelemetryUI();
        drawWaveform();
      } else {
        stopTimer();
      }
    }, 500);
  }

  function stepOnce() {
    stopTimer();
    stepIndex = stepIndex >= TOTAL ? 1 : stepIndex + 1;
    evaluateResultIfDone();
    updateTelemetryUI();
    drawWaveform();
  }

  function resetSim() {
    stopTimer();
    stepIndex = 0;
    lockState = "LOCKED";
    lastTransmitted = "-".repeat(N);
    updateTelemetryUI();
    drawWaveform();
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function evaluateResultIfDone() {
    if (stepIndex >= 2 * N + 1) {
      lastTransmitted = getEnteredString();
      lockState = lastTransmitted === getTargetCode() ? "UNLOCKED" : "LOCKED";
    }
  }

  function updateTelemetryUI() {
    const stateText = document.getElementById("padlockText");
    const ledG = document.getElementById("ledGreen");
    const ledR = document.getElementById("ledRed");
    const readCode = document.getElementById("simCodeReadout");
    const cycleRead = document.getElementById("simCycleReadout");

    if (readCode) {
      readCode.textContent = `Entered: ${N}'b${getEnteredString()} | Stored: ${N}'b${getTargetCode()}`;
    }
    if (cycleRead) {
      const clkNum = Math.min(N, Math.floor(stepIndex / 2));
      cycleRead.textContent =
        stepIndex === 0
          ? "IDLE"
          : stepIndex >= 2 * N + 1
          ? `DONE · RECEIVED = ${lastTransmitted}`
          : `SHIFTING · Clock pulse ${clkNum}/${N}`;
    }

    if (ledG) ledG.className = "led" + (lockState === "UNLOCKED" ? " green-on" : "");
    if (ledR) ledR.className = "led" + (lockState !== "UNLOCKED" ? " red-on" : "");

    if (stateText) {
      if (lockState === "UNLOCKED") {
        stateText.innerHTML = `<span style="color:#10b981">🔓 UNLOCKED</span>`;
      } else {
        stateText.innerHTML = `<span style="color:#ef4444">🔒 LOCKED</span>`;
      }
    }
    updateCircuit();
  }

  function drawWaveform() {
    const canvas = document.getElementById("spiCanvas");
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(rect.width, 520);
    const h = 240;
    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    // Background & grid
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, w, h);

    const labelW = 86;
    const padR = 16;
    const plotW = w - labelW - padR;
    const totalSlots = TOTAL;
    const slotW = plotW / totalSlots;

    // Vertical grid lines
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let i = 0; i <= totalSlots; i++) {
      const x = labelW + i * slotW;
      ctx.beginPath();
      ctx.moveTo(x, 12);
      ctx.lineTo(x, h - 18);
      ctx.stroke();
    }

    // Active progress cursor
    if (stepIndex > 0) {
      const cx = labelW + Math.min(stepIndex, totalSlots) * slotW;
      ctx.fillStyle = "rgba(14, 165, 233, 0.08)";
      ctx.fillRect(labelW, 12, cx - labelW, h - 30);
      ctx.strokeStyle = "#38bdf8";
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(cx, 12);
      ctx.lineTo(cx, h - 18);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    const match = getEnteredString() === getTargetCode();
    const inFrame = (s) => s >= 1 && s <= 2 * N;
    const signals = [
      { name: "CLOCK (555)", color: "#38bdf8", y: 38, fn: (s) => (inFrame(s) ? (s % 2 === 0 ? 1 : 0) : 0) },
      { name: "LOAD CODE", color: "#a855f7", y: 84, fn: (s) => (s === 0 ? 1 : 0) },
      { name: "SERIAL DATA", color: "#10b981", y: 130, fn: (s) => (inFrame(s) ? bits[Math.floor((s - 1) / 2)] : 0), bitLabels: true },
      { name: "GREEN LED", color: "#22c55e", y: 176, fn: (s) => (s >= 2 * N + 1 && match ? 1 : 0) },
      { name: "RED LED", color: "#ef4444", y: 214, fn: (s) => (s >= 2 * N + 1 && match ? 0 : 1) }
    ];

    const amp = 18;
    const drawLimit = stepIndex === 0 ? totalSlots : stepIndex;

    signals.forEach((sig) => {
      ctx.fillStyle = sig.color;
      ctx.font = "600 11px 'JetBrains Mono', monospace";
      ctx.fillText(sig.name, 10, sig.y + 4);

      ctx.strokeStyle = sig.color;
      ctx.lineWidth = 2.2;
      ctx.beginPath();

      for (let s = 0; s < drawLimit; s++) {
        const val = sig.fn(s);
        const nextVal = s + 1 < drawLimit ? sig.fn(s + 1) : val;
        const x0 = labelW + s * slotW;
        const x1 = labelW + (s + 1) * slotW;
        const yPos = val ? sig.y - amp : sig.y + 6;
        const nextY = nextVal ? sig.y - amp : sig.y + 6;

        if (s === 0) ctx.moveTo(x0, yPos);
        ctx.lineTo(x1, yPos);
        if (nextY !== yPos) ctx.lineTo(x1, nextY);

        if (sig.bitLabels && inFrame(s) && s % 2 === 1) {
          const bIdx = Math.floor((s - 1) / 2);
          ctx.fillStyle = "#e2e8f0";
          ctx.font = "700 10px 'JetBrains Mono', monospace";
          ctx.fillText(`D${N - 1 - bIdx}=${bits[bIdx]}`, x0 + 6, sig.y - amp - 4);
        }
      }
      ctx.stroke();
    });

    ctx.fillStyle = "#64748b";
    ctx.font = "500 10px 'JetBrains Mono', monospace";
    ctx.fillText("IDLE", labelW + 6, h - 5);
    for (let c = 0; c < N; c++) {
      ctx.fillText(`BIT ${N - 1 - c}`, labelW + (1 + c * 2) * slotW + 8, h - 5);
    }
    ctx.fillText("COMPARE", labelW + (2 * N + 1) * slotW + 2, h - 5);
  }


  // ================== Circuit animation (conceptual) ==================
  const $c = (id) => document.getElementById(id);

  function ensureCircuitCard() {
    const canvas = document.getElementById("spiCanvas");
    if (!canvas || $c("circuitCard")) return;
    const host = canvas.closest(".card");
    if (!host) return;
    const card = document.createElement("div");
    card.className = "card";
    card.id = "circuitCard";
    card.innerHTML = `
      <div class="card-title"><span>How the Circuit Works · Live Animation</span><span class="badge b-purple">Conceptual</span></div>
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:10px">Press <strong>Send Code</strong> or <strong>Step Clock</strong> above and watch the code travel: SW1 → 74165 → serial wire → 74595 → 7485 → LEDs.</p>
      <div style="overflow-x:auto"><svg id="circuitSvg" viewBox="0 0 980 360" style="width:100%;min-width:760px;height:auto;display:block" xmlns="http://www.w3.org/2000/svg"></svg></div>
      <div id="circuitStep" style="margin-top:12px;padding:12px 14px;border-radius:10px;background:var(--surface-alt);border:1px solid var(--border);font-size:13.5px"></div>`;
    host.insertAdjacentElement("afterend", card);
    buildCircuitSvg();
  }

  function cellRow(prefix, x, y) {
    let out = "";
    for (let i = 0; i < N; i++) {
      out += `<rect id="${prefix}r${i}" x="${x + i * 34}" y="${y}" width="28" height="28" rx="5" fill="#162033" stroke="#334155" stroke-width="1.5" style="transition:all .25s"/>` +
             `<text id="${prefix}t${i}" x="${x + i * 34 + 14}" y="${y + 19}" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-weight="700" font-size="14">0</text>`;
    }
    return out;
  }

  function box(x, y, w, h, color, id) {
    return `<rect id="${id || ""}" x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#0f172a" stroke="${color}" stroke-width="2" style="transition:all .25s"/>`;
  }

  function label(x, y, text, color, size, weight, anchor) {
    return `<text x="${x}" y="${y}" text-anchor="${anchor || "middle"}" fill="${color}" font-family="Inter, sans-serif" font-weight="${weight || 700}" font-size="${size || 12}">${text}</text>`;
  }

  function wire(id, d, cls) {
    return `<path id="${id}" class="${cls || ""}" d="${d}" fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="transition:stroke .25s"/>`;
  }

  function lamp(id, cx, cy, r) {
    return `<circle id="${id}" cx="${cx}" cy="${cy}" r="${r}" fill="#1f2937" stroke="#475569" stroke-width="2" style="transition:all .25s"/>`;
  }

  function buildCircuitSvg() {
    const svg = $c("circuitSvg");
    if (!svg) return;
    const mono = "JetBrains Mono, monospace";
    svg.innerHTML = `
      <rect x="0" y="0" width="980" height="360" rx="14" fill="#0b1220"/>

      <!-- wires (drawn first) -->
      ${wire("w-sw1", "M130 195 H190")}
      ${wire("w-clk555", "M310 50 H360 M335 50 V125", "ca-clk")}
      ${wire("w-clkbus", "M265 125 H495 M265 125 V150 M495 125 V150", "ca-clk")}
      ${wire("w-serial", "M340 195 H420")}
      ${wire("w-a", "M570 195 H630")}
      ${wire("w-sw2", "M695 290 V260")}
      ${wire("w-gt", "M760 165 H775 V62 H810")}
      ${wire("w-lt", "M760 195 H787 V88 H810")}
      ${wire("w-red", "M910 75 H936")}
      ${wire("w-eq", "M760 225 H936")}

      <!-- SW1 -->
      ${box(20, 150, 110, 90, "#38bdf8")}
      ${label(75, 172, "SW1", "#38bdf8", 13)}
      ${label(75, 187, "entered code", "#94a3b8", 10, 500)}
      ${cellRow("s1", 75 - (N * 34 - 6) / 2, 200)}

      <!-- NE555 -->
      ${box(190, 20, 120, 60, "#f59e0b")}
      ${label(250, 43, "NE555", "#f59e0b", 13)}
      ${label(250, 60, "clock source", "#94a3b8", 10, 500)}
      ${lamp("l555", 290, 33, 6)}

      <!-- 74163 -->
      ${box(360, 20, 130, 80, "#0ea5e9")}
      ${label(425, 42, "74163 counter", "#0ea5e9", 12)}
      <text id="cnt-dec" x="425" y="72" text-anchor="middle" fill="#e2e8f0" font-family="${mono}" font-weight="800" font-size="24">0</text>
      <text id="cnt-bin" x="425" y="90" text-anchor="middle" fill="#94a3b8" font-family="${mono}" font-size="10">0000</text>

      <!-- 74165 -->
      ${box(190, 150, 150, 90, "#10b981")}
      ${label(265, 172, "74165 PISO", "#10b981", 13)}
      ${label(265, 187, "parallel in, serial out", "#94a3b8", 10, 500)}
      ${cellRow("p1", 265 - (N * 34 - 6) / 2, 200)}

      <!-- 74595 -->
      ${box(420, 150, 150, 90, "#a855f7")}
      ${label(495, 172, "74595 SIPO", "#a855f7", 13)}
      ${label(495, 187, "serial in, parallel out", "#94a3b8", 10, 500)}
      ${cellRow("p5", 495 - (N * 34 - 6) / 2, 200)}

      <!-- 7485 -->
      ${box(630, 130, 130, 130, "#ec4899")}
      ${label(695, 150, "7485 compare", "#ec4899", 12)}
      <text id="cmp-a" x="695" y="172" text-anchor="middle" fill="#e2e8f0" font-family="${mono}" font-size="11">A = --</text>
      <text id="cmp-b" x="695" y="190" text-anchor="middle" fill="#e2e8f0" font-family="${mono}" font-size="11">B = --</text>
      <text x="745" y="168" text-anchor="end" fill="#94a3b8" font-family="${mono}" font-size="9">A&gt;B</text>
      <text x="745" y="198" text-anchor="end" fill="#94a3b8" font-family="${mono}" font-size="9">A&lt;B</text>
      <text x="745" y="228" text-anchor="end" fill="#94a3b8" font-family="${mono}" font-size="9">A=B</text>
      ${lamp("lgt", 760, 165, 6)}
      ${lamp("llt", 760, 195, 6)}
      ${lamp("leq", 760, 225, 6)}

      <!-- SW2 -->
      ${box(630, 290, 130, 60, "#38bdf8")}
      ${label(695, 308, "SW2 stored code", "#38bdf8", 11)}
      ${cellRow("s2", 695 - (N * 34 - 6) / 2, 315)}

      <!-- 7432 -->
      ${box(810, 40, 100, 70, "#f59e0b")}
      ${label(860, 70, "7432 OR", "#f59e0b", 13)}
      ${label(860, 88, "A&gt;B or A&lt;B", "#94a3b8", 10, 500)}

      <!-- LEDs -->
      ${lamp("led-red", 950, 75, 14)}
      ${label(950, 108, "RED", "#ef4444", 11)}
      ${label(950, 121, "LOCKED", "#94a3b8", 9, 500)}
      ${lamp("led-green", 950, 225, 14)}
      ${label(950, 258, "GREEN", "#22c55e", 11)}
      ${label(950, 271, "UNLOCKED", "#94a3b8", 9, 500)}

      <!-- labels on wires -->
      ${label(375, 188, "SERIAL DATA", "#10b981", 9, 700)}
      ${label(400, 118, "CLOCK", "#38bdf8", 9, 700)}
      ${label(600, 188, "A", "#94a3b8", 10, 700)}

      <!-- moving bit token -->
      <g id="ca-token" style="transform:translateX(0px);transition:transform .35s ease, opacity .25s;opacity:0">
        <circle cx="350" cy="195" r="11" fill="#10b981" stroke="#fff" stroke-width="1.5"/>
        <text id="ca-token-t" x="350" y="200" text-anchor="middle" fill="#04130d" font-family="${mono}" font-weight="800" font-size="13">1</text>
      </g>`;
  }

  function setAttrs(id, attrs) {
    const el = $c(id);
    if (!el) return;
    for (const k in attrs) el.setAttribute(k, attrs[k]);
  }

  function setLamp(id, on, onColor) {
    setAttrs(id, on ? { fill: onColor, stroke: onColor } : { fill: "#1f2937", stroke: "#475569" });
    const el = $c(id);
    if (el) el.style.filter = on ? `drop-shadow(0 0 8px ${onColor})` : "none";
  }

  function setCell(prefix, i, text, active, color) {
    const t = $c(prefix + "t" + i);
    const r = $c(prefix + "r" + i);
    if (t) {
      t.textContent = text;
      t.setAttribute("fill", text === "·" ? "#64748b" : "#e2e8f0");
    }
    if (r) {
      r.setAttribute("stroke", active ? color : "#334155");
      r.setAttribute("fill", active ? "#1e293b" : "#162033");
    }
  }

  function updateCircuit() {
    if (!$c("circuitSvg")) return;
    const target = getTargetCode();
    const s = stepIndex;
    const inFrame = s >= 1 && s <= 2 * N;
    const done = s >= 2 * N + 1;
    const c = Math.min(N, Math.floor(s / 2));       // clock pulses counted so far
    const clockHigh = inFrame && s % 2 === 0;
    const entered = getEnteredString();
    const eq = entered === target;
    const a = parseInt(entered, 2);
    const b = parseInt(target, 2);

    // switches
    for (let i = 0; i < N; i++) {
      setCell("s1", i, String(bits[i]), false, "#38bdf8");
      setCell("s2", i, target[i], false, "#38bdf8");
    }
    // 74165: shifts out one bit per clock pulse
    for (let i = 0; i < N; i++) {
      const v = s === 0 ? String(bits[i]) : i < N - c ? String(bits[i + c]) : "·";
      setCell("p1", i, v, i === 0 && !done && v !== "·", "#10b981");
    }
    // 74595: fills as bits arrive
    for (let i = 0; i < N; i++) {
      setCell("p5", i, i < c ? String(bits[i]) : "·", i === c - 1, "#a855f7");
    }
    // counter
    const cd = $c("cnt-dec");
    const cb = $c("cnt-bin");
    if (cd) cd.textContent = String(c);
    if (cb) cb.textContent = c.toString(2).padStart(4, "0");
    // clock
    setLamp("l555", clockHigh, "#f59e0b");
    document.querySelectorAll("#circuitSvg .ca-clk").forEach((w) => w.setAttribute("stroke", clockHigh ? "#38bdf8" : "#334155"));
    // serial wire and token
    setAttrs("w-serial", { stroke: inFrame ? "#10b981" : "#334155" });
    const token = $c("ca-token");
    if (token) {
      token.style.opacity = inFrame ? "1" : "0";
      token.style.transform = s % 2 === 0 ? "translateX(60px)" : "translateX(0px)";
      const idx = s % 2 === 1 ? (s - 1) / 2 : s / 2 - 1;
      const tt = $c("ca-token-t");
      if (tt && idx >= 0 && idx < N) tt.textContent = String(bits[idx]);
    }
    // comparator
    setAttrs("w-a", { stroke: done ? "#ec4899" : "#334155" });
    setAttrs("w-sw2", { stroke: done ? "#38bdf8" : "#334155" });
    const ca = $c("cmp-a");
    const cbb = $c("cmp-b");
    if (ca) ca.textContent = "A = " + (c === 0 ? "--" : entered.slice(0, c) + "·".repeat(N - c));
    if (cbb) cbb.textContent = "B = " + target;
    const gt = done && a > b;
    const lt = done && a < b;
    const eqOn = done && eq;
    setLamp("lgt", gt, "#f59e0b");
    setLamp("llt", lt, "#f59e0b");
    setLamp("leq", eqOn, "#22c55e");
    setAttrs("w-gt", { stroke: gt ? "#f59e0b" : "#334155" });
    setAttrs("w-lt", { stroke: lt ? "#f59e0b" : "#334155" });
    setAttrs("w-eq", { stroke: eqOn ? "#22c55e" : "#334155" });
    // OR gate and LEDs
    const redOn = !eqOn;
    setAttrs("w-red", { stroke: redOn ? "#ef4444" : "#334155" });
    setLamp("led-red", redOn, "#ef4444");
    setLamp("led-green", eqOn, "#22c55e");

    // plain-English caption
    const step = $c("circuitStep");
    if (step) {
      let msg;
      if (s === 0) {
        msg = `<strong>Ready.</strong> SW1 holds ${N}'b${entered} and the 74165 has loaded it. The red LED is on, so the lock is closed. Press Send Code.`;
      } else if (inFrame && s % 2 === 1) {
        const i = (s - 1) / 2;
        msg = `<strong>Clock low.</strong> The 74165 puts bit D${N - 1 - i} (= ${bits[i]}) on the serial data wire.`;
      } else if (inFrame) {
        const i = s / 2 - 1;
        msg = `<strong>Clock rising edge.</strong> The 74595 captures bit D${N - 1 - i} (= ${bits[i]}) and the 74163 counts pulse ${c} of ${N}.`;
      } else if (s === 2 * N + 1) {
        msg = `<strong>All ${N} bits sent.</strong> The 74163 has reached ${N}, so the transfer stops. The 7485 compares A = ${entered} with B = ${target}.`;
      } else if (eq) {
        msg = `<strong>A = B.</strong> The codes match, so the green LED turns on and the red LED goes off. <strong>UNLOCKED.</strong>`;
      } else {
        msg = `<strong>A ${a > b ? ">" : "<"} B.</strong> The 7432 OR gate combines A&gt;B and A&lt;B, so the red LED stays on. <strong>Access denied.</strong>`;
      }
      step.innerHTML = msg;
    }
  }

  window.addEventListener("resize", drawWaveform);

  return { init, drawWaveform, resetSim };
})();