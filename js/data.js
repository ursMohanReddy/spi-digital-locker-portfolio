window.PORTFOLIO_DATA = {
  meta: {
    projectTitle: "SPI-Based 2-Bit Digital Locker",
    subtitle: "A Discrete-IC Digital Access Control System (Logisim-evolution + Breadboard)",
    department: "School of EEE · Department of Electronics Engineering (VLSI Design & Technology)",
    teamId: "Team 13",
    siteCode: "vdt-mp-2026-SPI-team13",
    mentor: "Urja Ma'am · Pratiksha Ma'am · Suraj Sir",
    activeReview: "Review 2 · Concept Selection",
    lastUpdated: "18 Nov 2026",
    storedPasscode: "10",
    intro:
      "The SPI-Based 2-Bit Digital Locker is a digital access control system built from six standard ICs (NE555, 74163, 74165, 74595, 7485 and 7432). A 2-bit access code (4 possible codes) is entered on a DIP switch, sent serially in the style of SPI, received by a serial-in parallel-out register, and compared with a stored code by a magnitude comparator. A green LED shows UNLOCKED and a red LED shows LOCKED. The design is verified in Logisim-evolution simulation and on a breadboard.",
    problemStatement:
      "Conventional mechanical locks and standalone parallel-wired keypads suffer from physical key duplication, exposed wiring, and a high wire count when the user entry unit is separated from the lock unit. A simple, low-wire-count hardware access circuit is needed that sends a short credential serially between two stages, checks it against a stored code, and gives clear visual feedback.",
    needStatement:
      "Design and validate a low-wire-count, synchronous digital access verification circuit built from standard ICs that transfers a 2-bit user credential serially from an input stage to a lock stage, compares it against a stored reference code, and drives unambiguous UNLOCKED (green) and LOCKED (red) indicators in Logisim-evolution simulation and on a breadboard.",
    objectives: [
      "Design and implement a 2-bit digital locker using an SPI-style serial transfer built from discrete ICs.",
      "Generate a stable clock with an NE555 astable timer and sequence the transfer with a 74163 synchronous counter.",
      "Load the 2-bit code into a 74165 parallel-in serial-out register and shift it serially into a 74595 serial-in parallel-out register.",
      "Compare the received 2-bit code against the stored code using a 7485 4-bit magnitude comparator.",
      "Grant access (Green LED) when the codes match (A = B) and deny access (Red LED) otherwise, using a 7432 OR gate to combine A > B and A < B.",
      "Verify system functionality through Logisim-evolution simulation and a breadboard prototype.",
      "Apply digital logic design and serial timing concepts to practical electronic security hardware."
    ]
  },

  pages: [
    { id: "home", num: "00", group: "core", title: "Project Overview", step: "Home", status: "done", due: "Review 1", dateStamp: "18 Nov 2026" },
    { id: "team", num: "01", group: "core", title: "Team and Roles", step: "Roles", status: "done", due: "Review 1", dateStamp: "18 Nov 2026" },
    { id: "problem", num: "02", group: "core", title: "Problem and Need", step: "Step 01", status: "done", due: "Review 1", dateStamp: "18 Nov 2026" },
    { id: "concepts", num: "03", group: "core", title: "Concept Choices", step: "Step 02", status: "active", due: "Review 2", dateStamp: "18 Nov 2026" },
    { id: "frs", num: "04", group: "core", title: "Functional Requirements", step: "Step 03", status: "active", due: "Review 3", dateStamp: "18 Nov 2026" },
    { id: "architecture", num: "05", group: "core", title: "Architecture & Subsystems", step: "Steps 04–05", status: "active", due: "Review 3", dateStamp: "18 Nov 2026" },
    { id: "calculations", num: "06", group: "core", title: "Design & Calculations", step: "Steps 06–09", status: "upcoming", due: "Review 4", dateStamp: "Pending R4" },
    { id: "integration", num: "07", group: "core", title: "Foundation Integration Map", step: "Steps 03–13", status: "active", due: "Review 3", dateStamp: "18 Nov 2026" },
    { id: "verification", num: "08", group: "core", title: "Build & Verification", step: "Steps 10–12", status: "active", due: "Review 5", dateStamp: "18 Nov 2026" },
    { id: "validation", num: "09", group: "core", title: "Predicted vs Measured", step: "Step 13", status: "upcoming", due: "Final Review", dateStamp: "Pending Final" },
    { id: "failures", num: "10", group: "core", title: "Failures and Fixes", step: "Steps 11–14", status: "upcoming", due: "Review 5", dateStamp: "Pending R5" },
    { id: "notebook", num: "11", group: "ongoing", title: "Engineering Notebook", step: "Weekly", status: "done", due: "Weekly", dateStamp: "18 Nov 2026" },
    { id: "reviews", num: "12", group: "ongoing", title: "Review Record", step: "Feedback", status: "done", due: "Each Review", dateStamp: "18 Nov 2026" },
    { id: "reflections", num: "13", group: "ongoing", title: "Reflections & Forward Links", step: "Step 15", status: "upcoming", due: "Final Review", dateStamp: "Pending Final" },
    { id: "demo", num: "14", group: "ongoing", title: "Final Demonstration", step: "Step 16", status: "upcoming", due: "Final Review", dateStamp: "Pending Final" },
    { id: "files", num: "15", group: "ongoing", title: "Project Files & Repo", step: "Archive", status: "done", due: "Final Review", dateStamp: "18 Nov 2026" },
    { id: "roadmap", num: "R1", group: "resources", title: "Review Roadmap", step: "Rubric", status: "done", due: "All Reviews", dateStamp: "18 Nov 2026" },
    { id: "evidence", num: "R2", group: "resources", title: "Evidence & Acceptance", step: "Checklist", status: "done", due: "All Reviews", dateStamp: "18 Nov 2026" },
    { id: "risks", num: "R3", group: "resources", title: "Risks & Decisions", step: "Proactive", status: "done", due: "Ongoing", dateStamp: "18 Nov 2026" }
  ],

  steps16: [
    { n: "01", label: "Need", page: "problem", state: "done" },
    { n: "02", label: "Concept", page: "concepts", state: "active" },
    { n: "03", label: "FRs", page: "frs", state: "active" },
    { n: "04", label: "Arch", page: "architecture", state: "active" },
    { n: "05", label: "Subsys", page: "architecture", state: "active" },
    { n: "06", label: "Calc", page: "calculations", state: "upcoming" },
    { n: "07", label: "Comp", page: "calculations", state: "upcoming" },
    { n: "08", label: "Logisim", page: "verification", state: "active" },
    { n: "09", label: "BOM", page: "calculations", state: "upcoming" },
    { n: "10", label: "Sim", page: "verification", state: "active" },
    { n: "11", label: "Build", page: "verification", state: "upcoming" },
    { n: "12", label: "Test", page: "verification", state: "upcoming" },
    { n: "13", label: "Valid", page: "validation", state: "upcoming" },
    { n: "14", label: "Debug", page: "failures", state: "upcoming" },
    { n: "15", label: "Reflect", page: "reflections", state: "upcoming" },
    { n: "16", label: "Demo", page: "demo", state: "upcoming" }
  ],

  team: [
    { name: "Pallavi T", usn: "01FE24BEV040", initials: "PT", role: "Clock & Sender Stage (NE555, 74163, 74165)", subsystem: "Clock & Sender Circuit", leadReview: "Review 1", status: "Active" },
    { name: "Achsah Praisey G", usn: "01FE24BEV003", initials: "AP", role: "Logisim simulation Receiver & Comparator (74595, 7485, 7432)", subsystem: "Receiver & Lock Logic", leadReview: "Review 2", status: "Current Lead" },
    { name: "Ansiba S", usn: "01FE25BEV702", initials: "AS", role: "Logisim simulation, Breadboard Wiring & Hardware Testing", subsystem: "Breadboard, LEDs & Interconnect", leadReview: "Review 3", status: "Active" },
    { name: "Mohan Reddy", usn: "01FE24BEV035", initials: "MR", role: "Logisim Simulation, Timing & Portfolio", subsystem: "Verification & System Integration", leadReview: "Review 4–Final", status: "Active" }
  ],

  designInputs: [
    { param: "Credential Width", value: "2-bit binary (4 combinations)", source: "Design Specification" },
    { param: "Serial Link", value: "SPI-style: serial data + shared clock + load/latch", source: "Design Specification" },
    { param: "Implementation", value: "Six discrete ICs on a breadboard, simulated in Logisim-evolution", source: "Lab Hardware" },
    { param: "Logic Supply", value: "5 V supply, common ground for all ICs", source: "Datasheet" },
    { param: "Code Entry", value: "Two 4-way DIP switches: SW1 = entered code, SW2 = stored code (2 of 4 switches used)", source: "Purchase Invoice #755" },
    { param: "Status Indicators", value: "Green (Unlocked) and Red (Locked)", source: "User Requirement" },
    { param: "Clock", value: "NE555 astable, slow enough (a few Hz) to see every shift on the LEDs", source: "Assumed / Calculated" }
  ],

  backgroundStudy: [
    { title: "74165 PISO and 74595 SIPO Shift Registers", type: "Datasheet", takeaway: "The 74165 loads parallel inputs and shifts them out serially on clock pulses; the 74595 collects a serial stream back into parallel outputs. Together they form a serial link between two stages, and both are 8-bit parts, so the same wiring could carry wider codes." },
    { title: "NE555 Astable Timer", type: "Datasheet", takeaway: "Two resistors and one capacitor set the output frequency, f ≈ 1.44 / ((R1 + 2·R2)·C). Larger capacitor values give a slow clock so every shift is visible on LEDs." },
    { title: "74163 Synchronous 4-Bit Counter", type: "Datasheet", takeaway: "All flip-flops change on the same clock edge, so decoded count states are glitch-free and can mark exactly when the 2 bits have been sent." },
    { title: "7485 4-Bit Magnitude Comparator", type: "Datasheet", takeaway: "Compares two 4-bit words and gives A > B, A = B and A < B outputs. For a 2-bit code the unused inputs must be tied to a fixed level, and the cascade inputs must be set correctly for single-chip use." }
  ],

  concepts: [
    {
      name: "Concept A: Serial (SPI-style) Link with 74165 → 74595 and 7485 Comparator",
      badge: "CHOSEN",
      badgeClass: "b-green",
      summary: "The 2-bit code from SW1 is loaded into a 74165, shifted serially with the NE555/74163 clock into a 74595, and compared with the stored code on SW2 by a 7485. Green LED on A = B, red LED otherwise.",
      pros: "Few wires between stages, scales to wider codes, shared clock keeps timing simple, and every step can be seen on LEDs and in Logisim.",
      cons: "Needs more ICs than a direct comparison, and the clock and counter must be sequenced correctly."
    },
    {
      name: "Concept B: Direct Parallel Comparison",
      badge: "REJECTED",
      badgeClass: "b-red",
      summary: "Wires SW1 straight into the 7485 comparator next to the stored code with no serial stage.",
      pros: "Simplest circuit, fewest ICs, no timing or clock needed.",
      cons: "Wire count grows with every extra bit, and it does not demonstrate serial communication, which is the theme of this project."
    },
    {
      name: "Concept C: UART-style Asynchronous Serial",
      badge: "REJECTED",
      badgeClass: "b-amber",
      summary: "Sends the code with start and stop bits and a baud-rate clock on each side, without a shared clock.",
      pros: "Only one data wire between stages.",
      cons: "Needs framing logic and matched baud clocks on both sides, which means many more ICs than a breadboard project should use."
    }
  ],

  pughCriteria: [
    { criterion: "Wire-Count Scalability (wider codes)", weight: 5, a: 1, b: -1, c: 1 },
    { criterion: "Timing Determinism (Shared Clock)", weight: 5, a: 1, b: 1, c: -1 },
    { criterion: "IC Count & Breadboard Simplicity", weight: 4, a: 0, b: 1, c: -1 },
    { criterion: "Demonstrates Serial Communication (Project Theme)", weight: 4, a: 1, b: -1, c: 1 },
    { criterion: "Ease of Debugging with LEDs / Logisim", weight: 3, a: 1, b: 0, c: 0 }
  ],

  frs: [
    { id: "FR1", desc: "The 74165 shall load the 2-bit code from SW1 and shift it out serially, one bit per clock pulse, so the full code is sent in 2 clock pulses.", target: "2 clock pulses", method: "Logisim Waveform + Breadboard LED Check", source: "Design Spec", status: "Draft" },
    { id: "FR2", desc: "The 74595 shall receive the serial stream and present the same 2-bit code on its outputs, with zero bit errors across 20 consecutive transfers.", target: "0 bit errors / 20 transfers", method: "Logisim Simulation + Breadboard Repeat Test", source: "Design Spec", status: "Draft" },
    { id: "FR3", desc: "The 7485 shall compare the received code with the stored code on SW2 and light the Green LED only when A = B; for every other code the Red LED stays on.", target: "100% truth-table match (4/4 codes)", method: "Exhaustive 2-Bit Test (all 4 codes)", source: "User Need", status: "Draft" },
    { id: "FR4", desc: "The NE555 clock and the 74163 counter shall limit each attempt to exactly 2 clock pulses at a slow, stable rate.", target: "Exactly 2 bits per attempt", method: "Logisim Waveform + Breadboard LED Check", source: "Architecture Spec", status: "Draft" },
    { id: "FR5", desc: "A reset shall force the circuit into the safe LOCKED state (Red LED ON, Green LED OFF).", target: "Deterministic safe reset", method: "Simulation + Breadboard Test", source: "Safety Requirement", status: "Draft" }
  ],

  archBlocks: [
    { id: "input", title: "Code Entry (DIP Switches)", board: "Input", fr: "FR1, FR5", ports: "IN: SW1[1:0] entered code, SW2[1:0] stored code | OUT: parallel code to 74165, stored code to 7485", desc: "Two 4-way DIP switches, with 2 of the 4 switches used on each. SW1 holds the code being entered and SW2 holds the stored code." },
    { id: "master", title: "Sender Stage (NE555 + 74163 + 74165)", board: "Sender", fr: "FR1, FR4", ports: "NE555: clock out | 74163: counts clock pulses | 74165: parallel in, serial out", desc: "The NE555 generates the clock, the 74163 counts pulses so exactly 2 bits are sent, and the 74165 loads the entered code and shifts it out serially." },
    { id: "bus", title: "Serial Link (data · clock · load)", board: "Interconnect", fr: "FR1, FR2", ports: "Serial data (74165 → 74595) · Shared clock · Load/Latch · Common GND", desc: "The few wires that carry the code one bit at a time from the sender stage to the receiver stage, in the style of SPI." },
    { id: "slave", title: "Receiver Stage (74595 + 7485)", board: "Receiver", fr: "FR2, FR3", ports: "74595: serial in, parallel out | 7485: A = received code, B = stored code | OUT: A>B, A=B, A<B", desc: "The 74595 collects the serial bits back into a 2-bit code and the 7485 compares it with the stored code from SW2." },
    { id: "compare", title: "Decision & LEDs (7432 + Green / Red)", board: "Output", fr: "FR3, FR5", ports: "IN: A>B, A=B, A<B | OUT: Green LED (A = B), Red LED (A > B OR A < B)", desc: "The Green LED lights when the 7485 reports A = B. A 7432 OR gate combines A > B and A < B to light the Red LED for every wrong code." }
  ],

  decisions: [
    {
      id: "DC-01",
      title: "Use an NE555 astable timer as the common clock source",
      options: "NE555 astable vs. manual push-button clock vs. crystal oscillator",
      fr: "FR1, FR4",
      course: "Analog Electronic Circuits",
      concept: "RC timing network and astable oscillation",
      applied: "f ≈ 1.44 / ((R1 + 2·R2)·C). The purchased 1 µF and 4.7 µF capacitors allow a slow clock of a few Hz, so every shift can be seen on the LEDs. Final R and C values to be entered after calculation.",
      meets: "Digital Circuits — synchronous clocking of counters and shift registers",
      predicted: "Stable slow clock (a few Hz) with a repeatable period",
      measured: "Pending Step 13 breadboard measurement",
      learning: "Pending Step 13",
      level: "Applied"
    },
    {
      id: "DC-02",
      title: "Sequence the transfer with a 74163 synchronous counter",
      options: "74163 synchronous counter vs. ripple counter vs. manual control",
      fr: "FR1, FR4",
      course: "Digital Circuits",
      concept: "Synchronous counting without glitches",
      applied: "All 74163 flip-flops change on the same clock edge, so decoded count states are glitch-free and can mark exactly 2 shifts per attempt.",
      meets: "Computer Organization — control sequencing of a datapath",
      predicted: "Exactly 2 clock pulses per attempt in Logisim and on the breadboard",
      measured: "Pending Step 13",
      learning: "Pending Step 13",
      level: "Applied"
    },
    {
      id: "DC-03",
      title: "Send the code serially with a 74165 → 74595 pair",
      options: "Parallel wires vs. 74165 → 74595 serial link vs. UART-style serial",
      fr: "FR1, FR2",
      course: "Microcontrollers & Interfacing",
      concept: "Serial data transfer with shift registers",
      applied: "The 74165 loads the 2 switch bits in parallel and shifts them out; the 74595 collects them back into parallel outputs after 2 clocks. Both are 8-bit parts, so the same link could carry wider codes without extra wires.",
      meets: "Digital Circuits — parallel-to-serial and serial-to-parallel conversion",
      predicted: "Received code equals the entered code for all 4 codes",
      measured: "Pending Step 13",
      learning: "Pending Step 13",
      level: "Applied"
    },
    {
      id: "DC-04",
      title: "Compare with a 7485 and drive the Red LED through a 7432 OR gate",
      options: "7485 A = B output only vs. 7485 plus 7432 OR gate for the wrong-code signal",
      fr: "FR3",
      course: "Digital Circuits",
      concept: "Magnitude comparison and combinational logic",
      applied: "The 7485 gives A > B, A = B and A < B. The Green LED follows A = B, and the Red LED follows (A > B) OR (A < B) through the 7432. Unused comparator inputs are tied low for a 2-bit code.",
      meets: "Digital Circuits — mutually exclusive combinational output decoding",
      predicted: "Green only for the stored code, Red for the other 3 codes",
      measured: "Pending Step 13",
      learning: "Pending Step 13",
      level: "Named"
    }
  ],

  foundationCourses: [
    "Digital Circuits",
    "Digital System Design (Verilog)",
    "Computer Organization",
    "Analog Electronic Circuits",
    "Signals and Systems",
    "VLSI System Design",
    "Linear Integrated Circuits",
    "Microcontrollers & Interfacing",
    "Semiconductor Devices"
  ],

  verilogTabs: [
    {
      id: "wiring",
      label: "IC Roles & Wiring Notes",
      desc: "What each IC does in the circuit, with wiring notes for a 2-bit code",
      code: `IC ROLES (2-bit code, 5 V logic)

NE555   astable timer   : generates the common clock
74163   4-bit counter   : counts clock pulses, marks when 2 bits have been sent
74165   PISO register   : loads SW1 (entered code) and shifts it out serially
74595   SIPO register   : receives the serial bits, holds the received code
7485    comparator      : compares received code (A) with SW2 stored code (B)
7432    OR gate         : Red LED = (A > B) OR (A < B)
LEDs                    : Green = A = B (UNLOCKED), Red = otherwise (LOCKED)

WIRING NOTES
- Use only 2 of the 4 switches on SW1 and SW2.
- Tie every unused IC input to GND or +5 V (never leave inputs floating).
- 7485: tie unused inputs A2, A3, B2, B3 low. For single-chip use set the
  cascade input I(A=B) high and I(A>B), I(A<B) low.
- All ICs share +5 V and a common GND.
- Final pin-by-pin wiring table: copy from the Logisim-evolution circuit.`
    },
    {
      id: "truth",
      label: "Truth Table",
      desc: "All 4 possible codes checked against the stored code 10",
      code: `Stored code (SW2) = 10

Entered  Received   A>B  A=B  A<B   Green  Red
(SW1)    (74595)
  00        00       0    0    1     OFF    ON
  01        01       0    0    1     OFF    ON
  10        10       0    1    0     ON     OFF   <- UNLOCKED
  11        11       1    0    0     OFF    ON

Red LED = (A>B) OR (A<B)   [7432 OR gate]
Green LED = (A=B)`
    },
    {
      id: "test",
      label: "Test Procedure",
      desc: "How to verify the circuit in Logisim-evolution and on the breadboard",
      code: `1. Set SW2 (stored code) = 10.
2. Set SW1 (entered code) = 00 and start a transfer (2 clock pulses).
3. Check the 74595 outputs and the LEDs (expect Red ON, Green OFF).
4. Repeat for 01, 10 and 11 (expect Green ON only for 10).
5. Press reset and confirm Red ON, Green OFF.
6. On the breadboard, repeat each code 5 times (20 transfers) and log any
   bit error or wrong LED.`
    }
  ],

  notebook: [
    {
      date: "18 Nov 2026",
      author: "Mohan Reddy & Team 13",
      objective: "Finalize the 2-bit SPI locker scope, IC list and interactive portfolio.",
      decision: "Standardized on a 2-bit credential built from 6 ICs (NE555, 74163, 74165, 74595, 7485, 7432); parts bought on invoice #755 (₹214).",
      course: "Digital Circuits",
      learning: "Splitting the circuit into a sender stage and a receiver stage with a serial link keeps debugging modular, one IC at a time.",
      next: "Complete the Logisim-evolution circuit and run all 4 codes before freezing FR1–FR5 at Review 3."
    },
    {
      date: "11 Nov 2026",
      author: "Pallavi T & Achsah Praisey G",
      objective: "Evaluate parallel vs. UART-style vs. SPI-style communication options for the digital locker.",
      decision: "Selected the SPI-style serial link over direct parallel wiring and UART-style serial using the weighted Pugh matrix.",
      course: "Computer Organization & Interfacing",
      learning: "A shared clock removes baud-rate drift between stages and keeps testing simple.",
      next: "Draw the circuit in Logisim-evolution using the six ICs."
    }
  ],

  reviews: [
    {
      review: "Review 1 — Theme Approval",
      date: "10 Nov 2026",
      observation: "Clarify exact bit-width (4-bit vs 8-bit) consistently across block diagram, objectives, and testbench.",
      response: "Aligned project specification, objectives, and circuit design to a 2-bit access code (4 variations); wider codes noted as future scope.",
      where: "Page 02 (Problem & Need) & Page 04 (FR Table)"
    }
  ],

  risks: [
    { id: "R1", title: "Floating or unused inputs on the 74-series ICs cause random behaviour", severity: "High", status: "Planned", mitigation: "Tie every unused input to GND or +5 V, including the 7485 inputs A2, A3, B2, B3 and any unused 74165 inputs." },
    { id: "R2", title: "An unstable clock or a bouncing switch causes extra shifts", severity: "High", status: "Planned", mitigation: "Use a slow, stable NE555 clock and, if any push-button is used for load or reset, add an RC debounce." },
    { id: "R3", title: "Missing common GND or loose breadboard jumpers", severity: "Medium", status: "Planned", mitigation: "Run a dedicated ground rail to every IC and re-seat the jumpers before powering the board." },
    { id: "R4", title: "7485 cascade inputs left unset give a wrong A = B output", severity: "Medium", status: "Planned", mitigation: "For single-chip use tie I(A=B) high and I(A>B), I(A<B) low, as given in the datasheet." }
  ],

  files: [
    { name: "Formal Mini-Project Report (Appendix A)", type: "PDF / DOCX", status: "In Progress", url: "#" },
    { name: "Logisim-evolution Circuit File (.circ)", type: "Logisim", status: "In Progress", url: "#" },
    { name: "Breadboard Photos & Wiring Table", type: "Images / Table", status: "Pending", url: "#" },
    { name: "Component Purchase Invoice #755 (₹214)", type: "Invoice", status: "Captured", url: "#" }
  ],

  bom: {
    invoice: "Invoice No. 755 · 29-10-2026 · Elekzone Technologies, Hubballi",
    items: [
      { n: 1, part: "IC 74165 Parallel-In Serial-Out 8-Bit Shift Register", qty: 1, rate: 33.90, amount: 33.90 },
      { n: 2, part: "IC 74595 SIPO 8-Bit Serial-to-Parallel Shift Register", qty: 1, rate: 25.42, amount: 25.42 },
      { n: 3, part: "IC 7485 4-Bit Magnitude Comparator", qty: 1, rate: 25.42, amount: 25.42 },
      { n: 4, part: "IC 7432 Quad 2-Input OR Gate", qty: 1, rate: 12.71, amount: 12.71 },
      { n: 5, part: "IC 74163 4-Bit Binary Synchronous Counter", qty: 1, rate: 33.90, amount: 33.90 },
      { n: 6, part: "NE555 Timer IC", qty: 1, rate: 8.48, amount: 8.48 },
      { n: 7, part: "1 µF 63 V Capacitor", qty: 2, rate: 2.54, amount: 5.08 },
      { n: 8, part: "4.7 µF 63 V Capacitor", qty: 1, rate: 2.54, amount: 2.54 },
      { n: 9, part: "DIP Switch 4-Way", qty: 2, rate: 16.95, amount: 33.90 }
    ],
    subtotal: 181.35,
    cgst: 16.32,
    sgst: 16.32,
    total: 214.00
  }
};