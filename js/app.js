(function () {
  const D = window.PORTFOLIO_DATA;
  let currentPage = "home";
  let activeVerilogTab = "wiring";
  let activeDecisionFilter = "All";

  const sidebarNav = document.getElementById("sidebarNav");
  const mainContent = document.getElementById("mainContent");
  const sidebar = document.getElementById("sidebar");
  const cmdModal = document.getElementById("cmdModal");
  const cmdInput = document.getElementById("cmdInput");
  const cmdResults = document.getElementById("cmdResults");

  function init() {
    initTheme();
    document.getElementById("activeReviewPill").textContent = D.meta.activeReview;
    renderSidebar();
    bindGlobalEvents();
    const initialHash = location.hash.replace("#", "");
    navigate(D.pages.some((p) => p.id === initialHash) ? initialHash : "home", false);
  }

  function initTheme() {
    const saved = localStorage.getItem("spi-theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    document.getElementById("themeToggle").textContent = saved === "dark" ? "☀️" : "🌙";
  }

  function showToast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2200);
  }

  function renderSidebar() {
    const groups = [
      { key: "core", label: "Core 16-Step Record" },
      { key: "ongoing", label: "Ongoing & Final Pages" },
      { key: "resources", label: "Review Resources" }
    ];

    const liveCount = D.pages.filter((p) => p.group !== "resources" && p.status !== "upcoming").length;
    document.getElementById("sidebarProgressChip").textContent = `${liveCount} / 16 Active`;

    sidebarNav.innerHTML = groups
      .map((g) => {
        const items = D.pages
          .filter((p) => p.group === g.key)
          .map(
            (p) => `
          <button class="nav-item ${p.id === currentPage ? "active" : ""}" data-page="${p.id}">
            <span class="nav-item-left">
              <span class="nav-num">${p.num}</span>
              <span class="nav-label">${p.title}</span>
            </span>
            <span class="status-dot status-${p.status}" title="${p.status}"></span>
          </button>`
          )
          .join("");
        return `<div class="nav-group-title">${g.label}</div>${items}`;
      })
      .join("");

    sidebarNav.querySelectorAll(".nav-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigate(btn.dataset.page);
        sidebar.classList.remove("open");
      });
    });
  }

  function navigate(pageId, pushHash = true) {
    currentPage = pageId;
    if (pushHash) location.hash = pageId;
    renderSidebar();
    const pageMeta = D.pages.find((p) => p.id === pageId) || D.pages[0];
    mainContent.innerHTML = `<div class="page-wrap">${renderPage(pageMeta)}</div>`;
    mainContent.scrollTop = 0;
    bindPageInteractions(pageId);
  }

  function pageHead(p, subtitle) {
    return `
      <div class="page-head">
        <div>
          <div class="page-kicker">${p.step} · Due ${p.due}</div>
          <h1 class="page-title">${p.title}</h1>
          ${subtitle ? `<p class="page-sub">${subtitle}</p>` : ""}
        </div>
        <div class="date-stamp">Date-stamp: ${p.dateStamp}</div>
      </div>`;
  }

  function renderPage(p) {
    switch (p.id) {
      case "home": return renderHome();
      case "team": return renderTeam(p);
      case "problem": return renderProblem(p);
      case "concepts": return renderConcepts(p);
      case "frs": return renderFRs(p);
      case "architecture": return renderArchitecture(p);
      case "calculations": return renderCalculations(p);
      case "integration": return renderIntegration(p);
      case "verification": return renderVerification(p);
      case "validation": return renderValidation(p);
      case "failures": return renderFailures(p);
      case "notebook": return renderNotebook(p);
      case "reviews": return renderReviews(p);
      case "reflections": return renderReflections(p);
      case "demo": return renderDemo(p);
      case "files": return renderFiles(p);
      case "roadmap": return renderRoadmap(p);
      case "evidence": return renderEvidence(p);
      case "risks": return renderRisks(p);
      default: return renderHome();
    }
  }

  function renderHome() {
    const N = D.meta.storedPasscode.length; // code width (2 bits = 4 variations)
    const bitsInit = D.meta.storedPasscode.split("").map(Number);
    return `
      <section class="hero-card">
        <div class="hero-grid">
          <div>
            <div class="hero-badges">
              <span class="hero-badge">EE-VDT · SEM V MINI PROJECT</span>
              <span class="hero-badge">SPI-STYLE SERIAL LINK</span>
              <span class="hero-badge">6 ICs · LOGISIM + BREADBOARD</span>
            </div>
            <h1>${D.meta.projectTitle}</h1>
            <p>${D.meta.intro}</p>
            <div class="hero-actions">
              <button class="btn btn-primary" data-jump="architecture">Explore Architecture →</button>
              <button class="btn btn-outline" data-jump="verification">Circuit & Verification</button>
              <button class="btn btn-outline" data-jump="notebook">Weekly Notebook</button>
            </div>
          </div>

          <div class="telemetry-box">
            <div class="telemetry-top">
              <span>LIVE ${N}-BIT LOCKER BENCH</span>
              <span id="simCodeReadout">TX: ${N}'b${D.meta.storedPasscode} | Stored: ${N}'b${D.meta.storedPasscode}</span>
            </div>
            <div class="padlock-readout">
              <div class="padlock-state" id="padlockText"><span style="color:#ef4444">🔒 LOCKED</span></div>
              <div class="led-bank">
                <div class="led-item"><div class="led" id="ledGreen"></div><span>UNLOCK</span></div>
                <div class="led-item"><div class="led red-on" id="ledRed"></div><span>LOCK</span></div>
              </div>
            </div>
            <div class="dip-row">
              ${bitsInit
                .map(
                  (b, i) => `
                <button class="dip-btn ${b ? "on" : ""}" data-bit="${i}">
                  <span>D${N - 1 - i}</span><strong>${b}</strong>
                </button>`
                )
                .join("")}
            </div>
            <div class="hero-actions">
              <button class="btn btn-primary" id="simTransmit" style="flex:1">▶ Send Code</button>
              <button class="btn btn-outline" id="simStep">Step Clock</button>
              <button class="btn btn-outline" id="simReset">Reset</button>
            </div>
          </div>
        </div>
      </section>

      <div class="grid-4">
        <div class="card card-hover"><div class="kpi-label">Access Code</div><div class="kpi-val">${N}-Bit</div><div class="kpi-sub">${2 ** N} combinations · Stored ${N}'b${D.meta.storedPasscode}</div></div>
        <div class="card card-hover"><div class="kpi-label">Hardware</div><div class="kpi-val">6 ICs</div><div class="kpi-sub">NE555 · 74163 · 74165 · 74595 · 7485 · 7432</div></div>
        <div class="card card-hover"><div class="kpi-label">Functional Reqs</div><div class="kpi-val">${D.frs.length} FRs</div><div class="kpi-sub">Ready for Review 3 Freeze</div></div>
        <div class="card card-hover"><div class="kpi-label">Last Updated</div><div class="kpi-val" style="font-size:19px">${D.meta.lastUpdated}</div><div class="kpi-sub">${D.meta.teamId} · ${D.meta.activeReview}</div></div>
      </div>

      <div class="card">
        <div class="card-title">
          <span>Interactive Serial Transfer Timing (conceptual view)</span>
          <span class="badge b-blue" id="simCycleReadout">IDLE</span>
        </div>
        <p style="font-size:13px;color:var(--text-muted)">Toggle the ${N} DIP switches above (try <code>${D.meta.storedPasscode}</code> for UNLOCK or any other code to stay LOCKED), then click <strong>Send Code</strong> or <strong>Step Clock</strong> to watch the code shift across one bit per clock pulse.</p>
        <div class="sim-canvas-wrap">
          <canvas id="spiCanvas"></canvas>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          <span>16-Step Design Progress Strip</span>
          <span class="badge b-green">Click any step to jump</span>
        </div>
        <div class="step-strip">
          ${D.steps16
            .map(
              (s) => `
            <button class="step-pill ${s.state}" data-jump="${s.page}">
              <div>${s.n}</div><div>${s.label}</div>
            </button>`
            )
            .join("")}
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title"><span>Project Objectives</span><span class="badge b-purple">${D.meta.objectives.length} Goals</span></div>
          <ul style="padding-left:18px;font-size:13.5px;display:grid;gap:6px">
            ${D.meta.objectives.map((o) => `<li>${o}</li>`).join("")}
          </ul>
        </div>
        <div class="card">
          <div class="card-title"><span>Latest Dated Update</span><span class="badge b-blue">${D.notebook[0].date}</span></div>
          <p style="font-size:13.5px;margin-bottom:10px"><strong>Objective:</strong> ${D.notebook[0].objective}</p>
          <p style="font-size:13.5px;margin-bottom:10px"><strong>Decision:</strong> ${D.notebook[0].decision}</p>
          <p style="font-size:13.5px;color:var(--text-muted);margin-bottom:14px"><strong>Next Action:</strong> ${D.notebook[0].next}</p>
          <button class="btn btn-subtle" data-jump="notebook">Open Full Engineering Notebook →</button>
        </div>
      </div>`;
  }

  function renderTeam(p) {
    return `
      ${pageHead(p, `${D.meta.teamId} · Subsystem ownership and rotating Portfolio Lead schedule.`)}
      <div class="grid-2">
        ${D.team
          .map(
            (m) => `
          <div class="card card-hover">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px">
              <div style="width:46px;height:46px;border-radius:12px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;font-weight:800;font-family:var(--font-mono)">${m.initials}</div>
              <div>
                <div style="font-weight:700;font-size:16px">${m.name}</div>
                <div class="mono" style="font-size:12px;color:var(--text-muted)">${m.usn}</div>
              </div>
              <span class="badge ${m.status === "Current Lead" ? "b-blue" : "b-slate"}" style="margin-left:auto">${m.status}</span>
            </div>
            <p style="font-size:13.5px"><strong>Role:</strong> ${m.role}</p>
            <p style="font-size:13.5px;color:var(--text-muted)"><strong>Owned Subsystem:</strong> ${m.subsystem}</p>
          </div>`
          )
          .join("")}
      </div>
      <div class="card">
        <div class="card-title"><span>Portfolio Lead Rotation & Faculty Mentor</span><span class="badge b-purple">${D.meta.mentor}</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Member</th><th>USN</th><th>Owned Subsystem</th><th>Portfolio Lead Window</th></tr></thead>
            <tbody>
              ${D.team.map((m) => `<tr><td><strong>${m.name}</strong></td><td class="mono">${m.usn}</td><td>${m.subsystem}</td><td><span class="badge b-blue">${m.leadReview}</span></td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>`;
  }

  function renderProblem(p) {
    return `
      ${pageHead(p, "Step 01 — Need statement, quantified design inputs, background study, and candidate FRs.")}
      <div class="grid-2">
        <div class="card"><div class="card-title"><span>Problem Statement</span><span class="badge b-red">Context</span></div><p style="font-size:14px">${D.meta.problemStatement}</p></div>
        <div class="card"><div class="card-title"><span>EE-VDT Need Statement</span><span class="badge b-green">Circuit-Free Need</span></div><p style="font-size:14px">${D.meta.needStatement}</p></div>
      </div>
      <div class="card">
        <div class="card-title"><span>Quantified Design Inputs</span><span class="badge b-blue">Source-Tagged</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Parameter</th><th>Quantified Value / Spec</th><th>Source</th></tr></thead>
            <tbody>
              ${D.designInputs.map((d) => `<tr><td><strong>${d.param}</strong></td><td class="mono">${d.value}</td><td><span class="badge b-slate">${d.source}</span></td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="grid-2">
        ${D.backgroundStudy
          .map(
            (b) => `
          <div class="card card-hover">
            <div class="card-title"><span>${b.title}</span><span class="badge b-purple">${b.type}</span></div>
            <p style="font-size:13.5px;color:var(--text-muted)">${b.takeaway}</p>
          </div>`
          )
          .join("")}
      </div>`;
  }

  function renderConcepts(p) {
    const totals = D.pughCriteria.reduce(
      (acc, r) => ({ a: acc.a + r.weight * r.a, b: acc.b + r.weight * r.b, c: acc.c + r.weight * r.c }),
      { a: 0, b: 0, c: 0 }
    );
    return `
      ${pageHead(p, "Step 02 — Evaluated alternatives, rejected options retained with reasons, and weighted Pugh matrix.")}
      <div class="grid-3">
        ${D.concepts
          .map(
            (c) => `
          <div class="card card-hover">
            <div class="card-title"><span>${c.name}</span><span class="badge ${c.badgeClass}">${c.badge}</span></div>
            <p style="font-size:13.5px;margin-bottom:10px">${c.summary}</p>
            <p style="font-size:12.5px;color:var(--emerald);margin-bottom:6px"><strong>Strengths:</strong> ${c.pros}</p>
            <p style="font-size:12.5px;color:var(--rose)"><strong>Trade-offs:</strong> ${c.cons}</p>
          </div>`
          )
          .join("")}
      </div>
      <div class="card">
        <div class="card-title"><span>Weighted Pugh Decision Matrix</span><span class="badge b-green">Winner: Concept A (+${totals.a})</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Selection Criterion</th><th>Weight</th><th>Concept A (SPI)</th><th>Concept B (Parallel)</th><th>Concept C (UART)</th></tr></thead>
            <tbody>
              ${D.pughCriteria
                .map(
                  (r) => `<tr><td>${r.criterion}</td><td class="mono">${r.weight}</td><td class="mono">${r.a > 0 ? "+1" : r.a}</td><td class="mono">${r.b > 0 ? "+1" : r.b}</td><td class="mono">${r.c > 0 ? "+1" : r.c}</td></tr>`
                )
                .join("")}
              <tr style="font-weight:800;background:var(--surface-alt)">
                <td>Weighted Total</td><td class="mono">—</td>
                <td class="mono" style="color:var(--emerald)">+${totals.a} (CHOSEN)</td>
                <td class="mono">${totals.b}</td>
                <td class="mono">${totals.c}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`;
  }

  function renderFRs(p) {
    const N = D.meta.storedPasscode.length;
    return `
      ${pageHead(p, "Step 03 — Live Functional Requirements Table (Appendix C) with verification methods and freeze history.")}
      <div class="card">
        <div class="card-title"><span>Functional Requirements (FR1 – FR5)</span><span class="badge b-amber">Freeze Scheduled at Review 3</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Requirement Statement</th><th>Target</th><th>Verification Method</th><th>Status</th></tr></thead>
            <tbody>
              ${D.frs
                .map(
                  (f) => `<tr><td class="mono"><strong>${f.id}</strong></td><td>${f.desc}</td><td class="mono">${f.target}</td><td>${f.method}</td><td><span class="badge b-blue">${f.status}</span></td></tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-title"><span>FR Change History Log</span><span class="badge b-slate">Audit Trail</span></div>
        <p style="font-size:13.5px;color:var(--text-muted)"><strong>18 Nov 2026:</strong> Standardized all FR bit-widths to ${N}-bit access codes following Review 1 observation. Freeze date will be stamped upon Mentor sign-off at Review 3.</p>
      </div>`;
  }

  function renderArchitecture(p) {
    const N = D.meta.storedPasscode.length;
    return `
      ${pageHead(p, "Steps 04–05 — Six-IC serial architecture (NE555, 74163, 74165, 74595, 7485, 7432). Click any block to inspect ports and governing FRs.")}
      <div class="card">
        <div class="card-title"><span>Interactive Six-IC Signal Flow</span><span class="badge b-blue">Animated Bus · Click Any Block</span></div>
        <svg class="arch-svg" viewBox="0 0 920 270" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="45" width="160" height="175" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="2" class="arch-node" data-arch="input"/>
          <text x="92" y="108" text-anchor="middle" fill="#38bdf8" font-family="Inter" font-weight="700" font-size="14">Code Entry</text>
          <text x="92" y="132" text-anchor="middle" fill="#cbd5e1" font-family="JetBrains Mono" font-size="11">${N}-bit DIP Switches</text>
          <text x="92" y="152" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono" font-size="10">FR1 · FR5</text>

          <line x1="172" y1="132" x2="218" y2="132" stroke="#38bdf8" stroke-width="2.5" class="spi-flow"/>

          <rect x="218" y="30" width="195" height="205" rx="14" fill="#0f172a" stroke="#0ea5e9" stroke-width="2" class="arch-node" data-arch="master"/>
          <text x="315" y="65" text-anchor="middle" fill="#38bdf8" font-family="Inter" font-weight="800" font-size="15">Sender Stage</text>
          <text x="315" y="92" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono" font-size="12">NE555 Clock</text>
          <text x="315" y="118" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono" font-size="11">74163 Counter</text>
          <text x="315" y="144" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono" font-size="11">74165 PISO Register</text>
          <text x="315" y="198" text-anchor="middle" fill="#10b981" font-family="JetBrains Mono" font-size="11">Governs: FR1, FR4</text>

          <g class="arch-node" data-arch="bus">
            <line x1="413" y1="85" x2="545" y2="85" stroke="#10b981" stroke-width="3" class="spi-flow"/>
            <text x="479" y="76" text-anchor="middle" fill="#10b981" font-family="JetBrains Mono" font-weight="700" font-size="11">SERIAL DATA →</text>

            <line x1="413" y1="135" x2="545" y2="135" stroke="#38bdf8" stroke-width="3" class="spi-flow"/>
            <text x="479" y="126" text-anchor="middle" fill="#38bdf8" font-family="JetBrains Mono" font-weight="700" font-size="11">SHARED CLOCK →</text>

            <line x1="413" y1="185" x2="545" y2="185" stroke="#a855f7" stroke-width="3" class="spi-flow"/>
            <text x="479" y="176" text-anchor="middle" fill="#a855f7" font-family="JetBrains Mono" font-weight="700" font-size="11">LOAD / LATCH →</text>
          </g>

          <rect x="545" y="30" width="195" height="205" rx="14" fill="#0f172a" stroke="#8b5cf6" stroke-width="2" class="arch-node" data-arch="slave"/>
          <text x="642" y="65" text-anchor="middle" fill="#a78bfa" font-family="Inter" font-weight="800" font-size="15">Receiver Stage</text>
          <text x="642" y="92" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono" font-size="12">74595 SIPO Register</text>
          <text x="642" y="118" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono" font-size="11">7485 Comparator</text>
          <text x="642" y="144" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono" font-size="11">Stored: ${N}'b${D.meta.storedPasscode}</text>
          <text x="642" y="198" text-anchor="middle" fill="#a78bfa" font-family="JetBrains Mono" font-size="11">Governs: FR2, FR3</text>

          <line x1="740" y1="132" x2="778" y2="132" stroke="#10b981" stroke-width="2.5" class="spi-flow"/>

          <rect x="778" y="45" width="130" height="175" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="2" class="arch-node" data-arch="compare"/>
          <text x="843" y="88" text-anchor="middle" fill="#10b981" font-family="Inter" font-weight="700" font-size="13">Lock Output</text>
          <text x="843" y="118" text-anchor="middle" fill="#10b981" font-family="JetBrains Mono" font-size="11">● Green: A = B</text>
          <text x="843" y="140" text-anchor="middle" fill="#ef4444" font-family="JetBrains Mono" font-size="11">● Red: A ≠ B</text>
          <text x="843" y="170" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono" font-size="10">7432 OR gate</text>
        </svg>

        <div id="archInspector" style="margin-top:14px;padding:14px;border-radius:10px;background:var(--surface-alt);border:1px solid var(--border)">
          <strong>Inspector:</strong> Click any block above to view its port interface, governing FR, and design responsibility.
        </div>
      </div>

      <div class="grid-2">
        ${D.archBlocks
          .map(
            (b) => `
          <div class="card card-hover">
            <div class="card-title"><span>${b.title}</span><span class="badge b-blue">${b.fr}</span></div>
            <div class="mono" style="font-size:11.5px;color:var(--accent);margin-bottom:8px">${b.ports}</div>
            <p style="font-size:13.5px;color:var(--text-muted)">${b.desc}</p>
          </div>`
          )
          .join("")}
      </div>`;
  }

  function renderCalculations(p) {
    const bom = D.bom;
    const money = (n) => n.toFixed(2);
    return `
      ${pageHead(p, "Steps 06–09 — Design calculations (NE555 clock, LED resistor) and Bill of Materials (Due Review 4).")}
      <div class="grid-2">
        <div class="card">
          <div class="card-title"><span>Calc 01 · NE555 Clock Frequency</span><span class="badge b-blue">Serves FR1, FR4</span></div>
          <p class="mono" style="font-size:13px;margin-bottom:8px">f ≈ 1.44 / ((R1 + 2·R2) · C)</p>
          <p style="font-size:13.5px;color:var(--text-muted)">Choose R1, R2 and C so the clock is slow (a few Hz) and every shift can be seen on the LEDs. Capacitors bought: 1 µF (×2) and 4.7 µF (×1). Final resistor values and the calculated frequency: add here after calculation.</p>
        </div>
        <div class="card">
          <div class="card-title"><span>Calc 02 · Status LED Resistor</span><span class="badge b-green">Serves FR3</span></div>
          <p class="mono" style="font-size:13px;margin-bottom:8px">R = (V_supply − V_LED) / I_LED</p>
          <p style="font-size:13.5px;color:var(--text-muted)">Example for a 5 V supply, an LED drop of about 2 V and 10 mA: R = 3 V / 10 mA = 300 Ω, so use 330 Ω. Check the output current limit of the IC that drives the LED; if it is weak, use a larger resistor such as 1 kΩ (about 3 mA). Confirm with your actual LEDs and ICs.</p>
        </div>
      </div>

      <div class="card">
        <div class="card-title"><span>Bill of Materials</span><span class="badge b-purple">Total ₹${money(bom.total)}</span></div>
        <p style="font-size:12.5px;color:var(--text-muted);margin-bottom:10px">${bom.invoice}</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>#</th><th>Part</th><th>Qty</th><th>Rate (₹)</th><th>Amount (₹)</th></tr></thead>
            <tbody>
              ${bom.items.map((i) => `<tr><td>${i.n}</td><td>${i.part}</td><td>${i.qty}</td><td class="mono">${money(i.rate)}</td><td class="mono">${money(i.amount)}</td></tr>`).join("")}
              <tr><td></td><td colspan="3"><strong>Sub Total</strong></td><td class="mono">${money(bom.subtotal)}</td></tr>
              <tr><td></td><td colspan="3">CGST (9%)</td><td class="mono">${money(bom.cgst)}</td></tr>
              <tr><td></td><td colspan="3">SGST (9%)</td><td class="mono">${money(bom.sgst)}</td></tr>
              <tr><td></td><td colspan="3"><strong>Total (as per invoice)</strong></td><td class="mono"><strong>${money(bom.total)}</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="scaffold-box">
        <h3>Full Schematic & Wiring Table Unlock at Review 4</h3>
        <p style="margin-top:6px;font-size:13.5px">Add your Logisim-evolution circuit image and the pin-by-pin breadboard wiring table here before Review 4.</p>
      </div>`;
  }

  function renderIntegration(p) {
    const filtered = activeDecisionFilter === "All" ? D.decisions : D.decisions.filter((d) => d.level === activeDecisionFilter);
    const counts = D.foundationCourses.map((c) => ({
      course: c,
      count: D.decisions.filter((d) => d.course.toLowerCase().includes(c.toLowerCase()) || d.meets.toLowerCase().includes(c.toLowerCase())).length
    }));
    const maxC = Math.max(2, ...counts.map((x) => x.count));

    return `
      ${pageHead(p, "Steps 03–13 — Foundation Integration Decision Cards and automatic 9-course coverage strip.")}
      <div class="card">
        <div class="card-title">
          <span>Decision Cards (${filtered.length} shown)</span>
          <div style="display:flex;gap:6px">
            ${["All", "Named", "Applied", "Verified"]
              .map((lvl) => `<button class="btn ${activeDecisionFilter === lvl ? "btn-primary" : "btn-subtle"}" data-filter="${lvl}" style="padding:5px 10px;font-size:12px">${lvl}</button>`)
              .join("")}
          </div>
        </div>
        <div class="grid-2" style="margin-top:12px">
          ${filtered
            .map(
              (d) => `
            <div class="card" style="background:var(--surface-alt)">
              <div class="card-title"><span>${d.id} · ${d.title}</span><span class="badge ${d.level === "Verified" ? "b-green" : d.level === "Applied" ? "b-blue" : "b-amber"}">${d.level}</span></div>
              <p style="font-size:12.5px;margin-bottom:6px"><strong>Options:</strong> ${d.options}</p>
              <p style="font-size:12.5px;margin-bottom:6px"><strong>FR Served:</strong> <span class="mono">${d.fr}</span> · <strong>Course:</strong> ${d.course}</p>
              <p style="font-size:12.5px;margin-bottom:6px"><strong>Foundation Concept:</strong> ${d.concept}</p>
              <p style="font-size:12.5px;margin-bottom:6px"><strong>Concept Applied:</strong> ${d.applied}</p>
              <p style="font-size:12.5px;margin-bottom:6px"><strong>Where Courses Meet:</strong> ${d.meets}</p>
              <p style="font-size:12.5px;color:var(--text-muted)"><strong>Predicted:</strong> ${d.predicted} | <strong>Measured:</strong> ${d.measured}</p>
              <p style="font-size:12.5px;color:var(--text-muted);margin-top:6px"><strong>Learning:</strong> ${d.learning}</p>
            </div>`
            )
            .join("")}
        </div>
      </div>

      <div class="card">
        <div class="card-title"><span>9-Course Foundation Coverage Strip (Auto-Computed)</span><span class="badge b-purple">Live Count</span></div>
        ${counts
          .map(
            (x) => `
          <div class="bar-row">
            <div class="bar-meta"><span>${x.course}</span><span class="mono">${x.count} card(s)</span></div>
            <div class="bar-track"><div class="bar-fill" style="width:${Math.round((x.count / maxC) * 100)}%"></div></div>
          </div>`
          )
          .join("")}
      </div>`;
  }

  function renderVerification(p) {
    const activeTab = D.verilogTabs.find((t) => t.id === activeVerilogTab) || D.verilogTabs[0];
    return `
      ${pageHead(p, "Steps 10–12 — Logisim-evolution simulation, breadboard prototype and test evidence for the six-IC circuit.")}
      <div class="card">
        <div class="card-title">
          <span>Circuit Notes, Truth Table & Test Procedure</span>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${D.verilogTabs
              .map((t) => `<button class="btn ${t.id === activeTab.id ? "btn-primary" : "btn-subtle"}" data-vtab="${t.id}" style="padding:5px 10px;font-size:12px">${t.label}</button>`)
              .join("")}
          </div>
        </div>
        <p style="font-size:13px;color:var(--text-muted)">${activeTab.desc}</p>
        <div class="code-box">
          <div class="code-head">
            <span>${activeTab.label}</span>
            <button class="btn btn-outline" id="copyCodeBtn" style="padding:4px 10px;font-size:11px">Copy Text</button>
          </div>
          <pre id="verilogCodePre"></pre>
        </div>
      </div>

      <div class="card">
        <div class="card-title"><span>Logisim-evolution Simulation & Breadboard Evidence</span><span class="badge b-green">Click Image to Zoom</span></div>
        <p style="font-size:13.5px;color:var(--text-muted);margin-bottom:12px">Place your Logisim-evolution screenshot in <code>assets/images/logisim-circuit.jpg</code> and your breadboard photo in <code>assets/images/breadboard.jpg</code> to display them interactively here.</p>
        <div class="grid-2">
          <div style="border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center">
            <img src="assets/images/logisim-circuit.jpg" alt="Logisim-evolution circuit" class="zoomable" style="width:100%;max-height:220px;object-fit:cover;border-radius:8px;cursor:zoom-in" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/>
            <div style="display:none;padding:34px 10px;color:var(--text-muted);font-size:12.5px">Drop <code>logisim-circuit.jpg</code> into <code>assets/images/</code></div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:8px">Fig 8.1 — Logisim-evolution six-IC circuit</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center">
            <img src="assets/images/breadboard.jpg" alt="Breadboard prototype" class="zoomable" style="width:100%;max-height:220px;object-fit:cover;border-radius:8px;cursor:zoom-in" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/>
            <div style="display:none;padding:34px 10px;color:var(--text-muted);font-size:12.5px">Drop <code>breadboard.jpg</code> into <code>assets/images/</code></div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:8px">Fig 8.2 — Breadboard prototype</div>
          </div>
        </div>
      </div>`;
  }

  function renderValidation(p) {
    return `
      ${pageHead(p, "Step 13 — Validation Sheet (Appendix G): Predicted vs Measured results for every FR (Final Review).")}
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead><tr><th>FR</th><th>Predicted Value (Dated Before Build)</th><th>Measured Value</th><th>Deviation</th><th>Status</th></tr></thead>
            <tbody>
              ${D.frs.map((f) => `<tr><td class="mono"><strong>${f.id}</strong></td><td>${f.target}</td><td style="color:var(--text-muted)">Pending Step 13</td><td>—</td><td><span class="badge b-slate">Pending Final</span></td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>`;
  }

  function renderFailures(p) {
    return `
      ${pageHead(p, "Steps 11–14 — Debugging & Failure Log (Appendix E): Symptom → Test → Root Cause → Fix → Re-measurement.")}
      <div class="scaffold-box">
        <h3>Failure Cycles Populate During Build & Hardware Debugging (Review 5)</h3>
        <p style="margin:8px 0 16px;font-size:13.5px">At least 3 documented root-cause debugging cycles are required by Final Review. Proactive hardware failure modes are already tracked in Risks & Decisions.</p>
        <button class="btn btn-primary" data-jump="risks">View Proactive Risk Register →</button>
      </div>`;
  }

  function renderNotebook(p) {
    return `
      ${pageHead(p, "Weekly dated entries (Appendix B) — Add new entries in js/data.js every Monday and Friday.")}
      ${D.notebook
        .map(
          (n) => `
        <div class="card">
          <div class="card-title"><span>${n.date} · ${n.author}</span><span class="badge b-blue">${n.course}</span></div>
          <p style="font-size:13.5px;margin-bottom:6px"><strong>Objective:</strong> ${n.objective}</p>
          <p style="font-size:13.5px;margin-bottom:6px"><strong>Decision / Work Done:</strong> ${n.decision}</p>
          <p style="font-size:13.5px;margin-bottom:6px"><strong>Learning:</strong> ${n.learning}</p>
          <p style="font-size:13.5px;color:var(--accent)"><strong>Next Action:</strong> ${n.next}</p>
        </div>`
        )
        .join("")}`;
  }

  function renderReviews(p) {
    return `
      ${pageHead(p, "Verbatim faculty review observations and direct trace to portfolio updates (Appendix K).")}
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Review & Date</th><th>Faculty Observation</th><th>Team Response</th><th>Where Updated</th></tr></thead>
            <tbody>
              ${D.reviews.map((r) => `<tr><td><strong>${r.review}</strong><div class="mono" style="font-size:11px;color:var(--text-muted)">${r.date}</div></td><td>${r.observation}</td><td>${r.response}</td><td><span class="badge b-green">${r.where}</span></td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>`;
  }

  function renderReflections(p) {
    return `${pageHead(p, "Step 15 — Individual team reflections after each review and lessons for Sem VI–VII.")}
      <div class="scaffold-box"><h3>Reflections Open After Each Review & Complete at Final Review</h3><p style="margin-top:6px;font-size:13.5px">Each member (Pallavi, Achsah, Ansiba, Mohan) adds their own learning takeaway after every review milestone.</p></div>`;
  }

  function renderDemo(p) {
    return `${pageHead(p, "Step 16 — 3–5 minute Final Demonstration video walking through FR1–FR5 and summary poster.")}
      <div class="scaffold-box"><h3>Final Demonstration Video & Poster (Step 16)</h3><p style="margin-top:6px;font-size:13.5px">Embed your YouTube / Google Drive demo video and poster PDF here before the Final Viva.</p></div>`;
  }

  function renderFiles(p) {
    return `
      ${pageHead(p, "Links to the formal report, Logisim circuit file, breadboard photos and purchase invoice.")}
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Deliverable</th><th>Format</th><th>Status</th><th>Link</th></tr></thead>
            <tbody>
              ${D.files.map((f) => `<tr><td><strong>${f.name}</strong></td><td class="mono">${f.type}</td><td><span class="badge b-blue">${f.status}</span></td><td><a href="${f.url}" class="btn btn-subtle" style="text-decoration:none;padding:4px 10px;font-size:12px">Open</a></td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>`;
  }

  function renderRoadmap(p) {
    const milestones = [
      { r: "Review 1 — Theme Approval (5 Marks)", pages: "Home, 1, 2, 11, 12", state: "Done", cls: "b-green" },
      { r: "Review 2 — Concept Selection (10 Marks)", pages: "+ Page 3 (Pugh Matrix & Alternatives)", state: "Active", cls: "b-blue" },
      { r: "Review 3 — FR & Architecture Hard Gate (15 Marks)", pages: "+ Pages 4, 5, 7 (Frozen FRs & Applied Cards)", state: "Next", cls: "b-amber" },
      { r: "Review 4 — Design & Calculations (20 Marks)", pages: "+ Page 6 (Calc Cards, Schematic, BOM)", state: "Upcoming", cls: "b-slate" },
      { r: "Review 5 — Build, Sim & Debugging (20 Marks)", pages: "+ Pages 8, 10 (Breadboard Build + 2+ Failure Cycles)", state: "Upcoming", cls: "b-slate" },
      { r: "Final Review — Validation & Viva (30 Marks)", pages: "All 16 Pages + Verified Cards + Demo Video", state: "Upcoming", cls: "b-slate" }
    ];
    return `${pageHead(p, "EE-VDT Semester V review milestones and required live pages.")}
      <div class="card"><div class="table-wrap"><table><thead><tr><th>Review Gate</th><th>Required Pages</th><th>Status</th></tr></thead><tbody>
        ${milestones.map((m) => `<tr><td><strong>${m.r}</strong></td><td>${m.pages}</td><td><span class="badge ${m.cls}">${m.state}</span></td></tr>`).join("")}
      </tbody></table></div></div>`;
  }

  function renderEvidence(p) {
    const checks = [
      "Chronological dated progress visible week by week from Home page",
      "Every design decision keeps rejected options with clear reasons",
      "Every decision card names a specific foundation concept applied with numbers",
      "Predictions are date-stamped earlier than hardware measurements",
      "At least 3 failure-and-fix debugging cycles logged with re-measurement",
      "Every faculty review observation answered with a direct page reference",
      "Individual reflections written by all 4 team members"
    ];
    return `${pageHead(p, "Mentor 8-point EE-VDT quality verification checklist.")}
      <div class="card"><ul style="list-style:none;display:grid;gap:10px;font-size:14px">
        ${checks.map((c) => `<li><label style="display:flex;gap:10px;align-items:center;cursor:pointer"><input type="checkbox"/> <span>${c}</span></label></li>`).join("")}
      </ul></div>`;
  }

  function renderRisks(p) {
    return `${pageHead(p, "Proactive hardware risk register before breadboard integration.")}
      <div class="grid-2">
        ${D.risks
          .map(
            (r) => `
          <div class="card card-hover">
            <div class="card-title"><span>${r.id} · ${r.title}</span><span class="badge ${r.severity === "High" ? "b-red" : "b-amber"}">${r.severity}</span></div>
            <p style="font-size:13.5px;color:var(--text-muted);margin-bottom:10px"><strong>Mitigation:</strong> ${r.mitigation}</p>
            <span class="badge b-green">${r.status}</span>
          </div>`
          )
          .join("")}
      </div>`;
  }

  function bindPageInteractions(pageId) {
    mainContent.querySelectorAll("[data-jump]").forEach((el) => {
      el.addEventListener("click", () => navigate(el.dataset.jump));
    });

    if (pageId === "home" && window.SPISimulator) {
      window.SPISimulator.init();
    }

    if (pageId === "architecture") {
      const box = document.getElementById("archInspector");
      mainContent.querySelectorAll(".arch-node").forEach((node) => {
        node.addEventListener("click", () => {
          const item = D.archBlocks.find((b) => b.id === node.dataset.arch);
          if (item && box) {
            box.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><strong>${item.title} (${item.board})</strong><span class="badge b-blue">${item.fr}</span></div><div class="mono" style="font-size:12px;color:var(--accent);margin-bottom:6px">${item.ports}</div><p style="font-size:13.5px;color:var(--text-muted)">${item.desc}</p>`;
          }
        });
      });
    }

    if (pageId === "integration") {
      mainContent.querySelectorAll("[data-filter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeDecisionFilter = btn.dataset.filter;
          navigate("integration", false);
        });
      });
    }

    if (pageId === "verification") {
      const activeTab = D.verilogTabs.find((t) => t.id === activeVerilogTab) || D.verilogTabs[0];
      const pre = document.getElementById("verilogCodePre");
      if (pre) pre.textContent = activeTab.code;

      mainContent.querySelectorAll("[data-vtab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeVerilogTab = btn.dataset.vtab;
          navigate("verification", false);
        });
      });

      const copyBtn = document.getElementById("copyCodeBtn");
      if (copyBtn) {
        copyBtn.addEventListener("click", () => {
          copyText(activeTab.code)
            .then(() => showToast(`Copied ${activeTab.label} to clipboard!`))
            .catch(() => showToast("Could not copy automatically. Select the text and press Ctrl+C."));
        });
      }

      mainContent.querySelectorAll(".zoomable").forEach((img) => {
        img.addEventListener("click", () => {
          document.getElementById("lightboxImg").src = img.src;
          document.getElementById("lightboxCaption").textContent = img.alt;
          document.getElementById("lightbox").classList.remove("hidden");
        });
      });
    }
  }

  // Copy that also works when the page is opened as a plain file
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(ta);
    });
  }

  function openCmd() {
    cmdModal.classList.remove("hidden");
    cmdInput.value = "";
    renderCmdResults("");
    cmdInput.focus();
  }

  function renderCmdResults(q) {
    const term = q.trim().toLowerCase();
    const matches = D.pages.filter((p) => p.title.toLowerCase().includes(term) || p.step.toLowerCase().includes(term));
    cmdResults.innerHTML = matches
      .map((p) => `<button class="cmd-item" data-cmd="${p.id}"><span>${p.num} · ${p.title}</span><span class="badge b-slate">${p.step}</span></button>`)
      .join("");
    cmdResults.querySelectorAll(".cmd-item").forEach((b) => {
      b.addEventListener("click", () => {
        cmdModal.classList.add("hidden");
        navigate(b.dataset.cmd);
      });
    });
  }

  function bindGlobalEvents() {
    document.getElementById("menuToggle").addEventListener("click", () => sidebar.classList.toggle("open"));
    document.getElementById("themeToggle").addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("spi-theme", next);
      document.getElementById("themeToggle").textContent = next === "dark" ? "☀️" : "🌙";
    });

    document.getElementById("searchTrigger").addEventListener("click", openCmd);
    document.getElementById("cmdClose").addEventListener("click", () => cmdModal.classList.add("hidden"));
    cmdInput.addEventListener("input", (e) => renderCmdResults(e.target.value));
    cmdModal.addEventListener("click", (e) => { if (e.target === cmdModal) cmdModal.classList.add("hidden"); });

    document.getElementById("lightboxClose").addEventListener("click", () => document.getElementById("lightbox").classList.add("hidden"));
    document.getElementById("lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") e.target.classList.add("hidden"); });

    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openCmd();
      } else if (e.key === "Escape") {
        cmdModal.classList.add("hidden");
        document.getElementById("lightbox").classList.add("hidden");
      }
    });

    window.addEventListener("hashchange", () => {
      const target = location.hash.replace("#", "");
      if (target && target !== currentPage && D.pages.some((p) => p.id === target)) {
        navigate(target, false);
      }
    });
  }

  init();
})();