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
    }, 220);
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

  window.addEventListener("resize", drawWaveform);

  return { init, drawWaveform, resetSim };
})();