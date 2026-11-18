window.SPISimulator = (function () {
  let bits = [1, 0, 1, 0]; // D3 D2 D1 D0
  let stepIndex = 0;       // 0 = idle, 1..8 = 4 SCLK cycles, 9..10 = latch/result
  let timer = null;
  let lockState = "LOCKED"; // LOCKED | UNLOCKED | WRONG
  let lastTransmitted = "----";

  function getTargetCode() {
    return (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.meta.storedPasscode) || "1010";
  }

  function getEnteredString() {
    return bits.join("");
  }

  function init() {
    stopTimer();
    const canvas = document.getElementById("spiCanvas");
    if (!canvas) return;
    syncDipUI();
    bindControls();
    updateTelemetryUI();
    drawWaveform();
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
      if (stepIndex < 10) {
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
    stepIndex = stepIndex >= 10 ? 1 : stepIndex + 1;
    evaluateResultIfDone();
    updateTelemetryUI();
    drawWaveform();
  }

  function resetSim() {
    stopTimer();
    stepIndex = 0;
    lockState = "LOCKED";
    lastTransmitted = "----";
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
    if (stepIndex >= 9) {
      lastTransmitted = getEnteredString();
      lockState = lastTransmitted === getTargetCode() ? "UNLOCKED" : "WRONG";
    }
  }

  function updateTelemetryUI() {
    const stateText = document.getElementById("padlockText");
    const ledG = document.getElementById("ledGreen");
    const ledR = document.getElementById("ledRed");
    const ledY = document.getElementById("ledYellow");
    const readCode = document.getElementById("simCodeReadout");
    const cycleRead = document.getElementById("simCycleReadout");

    if (readCode) {
      readCode.textContent = `TX: 4'b${getEnteredString()} | Stored: 4'b${getTargetCode()}`;
    }
    if (cycleRead) {
      const clkNum = Math.min(4, Math.floor(stepIndex / 2));
      cycleRead.textContent =
        stepIndex === 0
          ? "IDLE (CS_N = 1)"
          : stepIndex >= 9
          ? `DONE · RX = ${lastTransmitted}`
          : `SHIFTING · SCLK Cycle ${clkNum}/4`;
    }

    if (ledG) ledG.className = "led" + (lockState === "UNLOCKED" ? " green-on" : "");
    if (ledR) ledR.className = "led" + (lockState !== "UNLOCKED" ? " red-on" : "");
    if (ledY) ledY.className = "led" + (lockState === "WRONG" ? " yellow-on" : "");

    if (stateText) {
      if (lockState === "UNLOCKED") {
        stateText.innerHTML = `<span style="color:#10b981">🔓 UNLOCKED</span>`;
      } else if (lockState === "WRONG") {
        stateText.innerHTML = `<span style="color:#f59e0b">⚠ WRONG CODE</span>`;
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
    const totalSlots = 10;
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
    const signals = [
      { name: "CS / SS", color: "#a855f7", y: 38, fn: (s) => (s >= 1 && s <= 8 ? 0 : 1) },
      { name: "SCLK", color: "#38bdf8", y: 84, fn: (s) => (s >= 1 && s <= 8 ? (s % 2 === 0 ? 1 : 0) : 0) },
      { name: "MOSI", color: "#10b981", y: 130, fn: (s) => (s >= 1 && s <= 8 ? bits[Math.floor((s - 1) / 2)] : 0), bitLabels: true },
      { name: "MISO ACK", color: "#f59e0b", y: 176, fn: (s) => (s >= 8 && match ? 1 : 0) },
      { name: "UNLOCK", color: "#22c55e", y: 214, fn: (s) => (s >= 9 && match ? 1 : 0) }
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

        if (sig.bitLabels && s >= 1 && s <= 8 && s % 2 === 1) {
          const bIdx = Math.floor((s - 1) / 2);
          ctx.fillStyle = "#e2e8f0";
          ctx.font = "700 10px 'JetBrains Mono', monospace";
          ctx.fillText(`D${3 - bIdx}=${bits[bIdx]}`, x0 + 6, sig.y - amp - 4);
        }
      }
      ctx.stroke();
    });

    ctx.fillStyle = "#64748b";
    ctx.font = "500 10px 'JetBrains Mono', monospace";
    ctx.fillText("IDLE", labelW + 6, h - 5);
    for (let c = 0; c < 4; c++) {
      ctx.fillText(`BIT ${3 - c}`, labelW + (1 + c * 2) * slotW + 8, h - 5);
    }
    ctx.fillText("LATCH", labelW + 9 * slotW + 4, h - 5);
  }

  window.addEventListener("resize", drawWaveform);

  return { init, drawWaveform, resetSim };
})();
