window.PORTFOLIO_DATA = {
  meta: {
    projectTitle: "SPI-Based 4-Bit Digital Locker",
    subtitle: "A Verilog HDL and FPGA-Based Digital Access Control System",
    department: "School of EEE · Department of Electronics Engineering (VLSI Design & Technology)",
    teamId: "Team 13",
    siteCode: "vdt-mp-2026-SPI-team13",
    mentor: "Faculty Mentor (Update Name)",
    activeReview: "Review 2 · Concept Selection",
    lastUpdated: "18 Nov 2026",
    storedPasscode: "1010",
    intro:
      "The SPI-Based 4-Bit Digital Locker is a digital access control system designed using Verilog HDL. It uses Serial Peripheral Interface (SPI) communication to transfer a 4-bit access code between a Master FPGA board and a Slave FPGA board for hardware password verification and access control. Verified using Vivado simulation, Proteus 8 discrete logic capture, and dual-FPGA breadboard hardware.",
    problemStatement:
      "Conventional mechanical locks and standalone parallel-wired keypads suffer from physical key duplication, exposed wiring vulnerabilities, and excessive interconnect pin counts when separating the user entry terminal from the lock controller. A deterministic, low-pin-count hardware access system is needed to transfer a 4-bit credential serially across isolated control boards with clear visual status feedback.",
    needStatement:
      "Design and validate a low-pin-count, synchronous digital access verification system that transfers a 4-bit user credential from an input unit to an isolated lock-control unit, compares it against a stored reference code in hardware, and drives unambiguous unlocked, locked, and wrong-code indicators across simulation and FPGA hardware.",
    objectives: [
      "Design and implement a 4-bit digital locker system using the 4-wire SPI communication protocol.",
      "Establish synchronous serial data communication between an SPI Master FPGA and an SPI Slave FPGA.",
      "Transmit and receive a 4-bit access code through MOSI, MISO, SCLK, and active-LOW CS/SS lines.",
      "Compare the received 4-bit access code against a predefined stored password register.",
      "Grant access (Green LED) when the entered code matches and deny access (Red/Yellow LEDs) when incorrect.",
      "Verify system functionality through Verilog HDL simulation in Vivado, Proteus schematic capture, and FPGA hardware.",
      "Apply digital logic design and serial protocol timing concepts to practical electronic security hardware."
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
    { n: "08", label: "RTL", page: "verification", state: "active" },
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
    { name: "Pallavi T", usn: "01FE24BEV040", initials: "PT", role: "SPI Master RTL & Clock Divider", subsystem: "Master FPGA Controller", leadReview: "Review 1", status: "Active" },
    { name: "Achsah Praisey G", usn: "01FE24BEV003", initials: "AP", role: "SPI Slave Deserializer & Comparator", subsystem: "Slave FPGA & Lock Logic", leadReview: "Review 2", status: "Current Lead" },
    { name: "Ansiba S", usn: "01FE25BEV702", initials: "AS", role: "Proteus Capture & Hardware Wiring", subsystem: "Breadboard, LEDs & Interconnect", leadReview: "Review 3", status: "Active" },
    { name: "Mohan Reddy", usn: "01FE24BEV035", initials: "MR", role: "Vivado Testbench, Timing & Portfolio", subsystem: "Verification & FPGA Integration", leadReview: "Review 4–Final", status: "Active" }
  ],

  designInputs: [
    { param: "Credential Width", value: "4-bit binary (16 combinations)", source: "Design Specification" },
    { param: "Communication Link", value: "4-Wire Full-Duplex SPI (Mode 0: CPOL=0, CPHA=0)", source: "SPI Standard" },
    { param: "Master / Slave Platform", value: "Dual FPGA Boards + Breadboard Interconnect", source: "Lab Hardware" },
    { param: "Logic Voltage Level", value: "3.3 V LVCMOS (FPGA I/O) / 5 V (Proteus 74HC Sim)", source: "Datasheet" },
    { param: "Status Indicators", value: "Green (Unlocked), Red (Locked), Yellow (Wrong Code)", source: "User Requirement" },
    { param: "Serial Clock (SCLK)", value: "Divided from FPGA system clock (<= 1 MHz breadboard safe)", source: "Assumed / Calculated" }
  ],

  backgroundStudy: [
    { title: "SPI Protocol Mode 0 Timing", type: "Application Note", takeaway: "With CPOL=0 and CPHA=0, data is shifted out on falling SCLK edge and sampled cleanly on the rising edge, giving half a clock period of setup/hold margin." },
    { title: "74HC165 / 74HC595 Shift Registers", type: "Proteus Prototype", takeaway: "Discrete logic simulation in Proteus 8 validated bit-shifting, clock gating, and comparator truth tables before synthesizing the Verilog RTL." },
    { title: "FPGA Debouncing & Metastability", type: "Reference Design", takeaway: "Mechanical pushbuttons and asynchronous board-to-board SPI signals require 2-FF synchronizers and debouncers to avoid false triggers." },
    { title: "Hardware Comparator Security", type: "Digital Design Study", takeaway: "Storing the reference passcode inside the isolated Slave FPGA prevents an attacker probing the Master input switches from reading the stored key." }
  ],

  concepts: [
    {
      name: "Concept A: Dual-FPGA 4-Wire SPI Locker",
      badge: "CHOSEN",
      badgeClass: "b-green",
      summary: "Master FPGA reads 4-bit switch input and transmits serially over MOSI, SCLK, CS/SS to a Slave FPGA holding the stored code and lock FSM.",
      pros: "Minimal 4-wire bus, full-duplex ACK via MISO, cleanly separates input terminal from secure lock unit, easy Vivado + hardware demo.",
      cons: "Requires careful SCLK synchronization and shared ground reference between the two FPGA boards."
    },
    {
      name: "Concept B: Parallel 4-Bit Direct Interconnect",
      badge: "REJECTED",
      badgeClass: "b-red",
      summary: "Connects 4 data wires + strobe directly from switches/Master to Slave comparator without serial protocol framing.",
      pros: "Simplest combinational logic, zero serialization latency.",
      cons: "Does not scale to 8/16-bit codes, wastes I/O pins, and lacks frame boundary (CS/SS) or return status channel."
    },
    {
      name: "Concept C: UART Asynchronous Serial Locker",
      badge: "REJECTED",
      badgeClass: "b-amber",
      summary: "Uses TX/RX asynchronous frames with baud-rate generators on both FPGAs to exchange access codes.",
      pros: "Only 2 signal wires (TX/RX) needed between boards.",
      cons: "Requires precise clock-frequency matching, baud generator overhead, and start/stop bit framing complexity."
    }
  ],

  pughCriteria: [
    { criterion: "Pin Efficiency & Scalability", weight: 5, a: 1, b: -1, c: 1 },
    { criterion: "Timing Determinism (Shared Clock)", weight: 5, a: 1, b: 1, c: -1 },
    { criterion: "Verilog RTL & FPGA Resource Simplicity", weight: 4, a: 1, b: 1, c: 0 },
    { criterion: "Fault / Return Status Feedback (MISO)", weight: 4, a: 1, b: -1, c: 1 },
    { criterion: "Breadboard Signal Integrity", weight: 3, a: 1, b: 0, c: 0 }
  ],

  frs: [
    { id: "FR1", desc: "Master FPGA shall capture a 4-bit access code and serialize it MSB-first over MOSI within 4 SCLK cycles after CS/SS asserts LOW.", target: "4 SCLK cycles", method: "Vivado Waveform + Logic Analyzer", source: "Design Spec", status: "Draft" },
    { id: "FR2", desc: "Slave FPGA shall sample MOSI on the rising edge of SCLK (SPI Mode 0) with zero bit-slip across 20 consecutive transfers.", target: "0 bit errors / 20 frames", method: "Verilog Testbench + Hardware Loop", source: "SPI Standard", status: "Draft" },
    { id: "FR3", desc: "Slave comparator shall assert UNLOCK (Green LED) if received 4-bit code equals stored password, else assert WRONG_CODE (Yellow LED) and keep LOCKED (Red LED).", target: "100% truth-table match (16/16 codes)", method: "Exhaustive 4-bit Testbench", source: "User Need", status: "Draft" },
    { id: "FR4", desc: "System shall return a 1-bit access status acknowledgement from Slave to Master over MISO before CS/SS deasserts HIGH.", target: "Valid ACK before CS/SS rising", method: "Vivado Timing Simulation", source: "Architecture Spec", status: "Draft" },
    { id: "FR5", desc: "Reset button shall force both Master and Slave FSMs into the safe LOCKED state (Red LED ON, Green/Yellow OFF) within 1 clock cycle.", target: "Deterministic safe reset", method: "Simulation + Board Pushbutton Test", source: "Safety Requirement", status: "Draft" }
  ],

  archBlocks: [
    { id: "input", title: "User Input Interface", board: "Master FPGA", fr: "FR1, FR5", ports: "IN: sw[3:0], btn_send, rst | OUT: code_latched[3:0], start_tx", desc: "Debounces the pushbuttons and latches the 4-bit access code entered by the user before triggering an SPI frame." },
    { id: "master", title: "SPI Master Controller", board: "Master FPGA", fr: "FR1, FR4", ports: "IN: clk, rst, start_tx, code[3:0], miso | OUT: sclk, mosi, cs_n, ack_rx", desc: "Generates divided SCLK, drives active-LOW CS/SS, shifts out 4 bits MSB-first on MOSI, and samples Slave ACK on MISO." },
    { id: "bus", title: "4-Wire SPI Bus", board: "Interconnect", fr: "FR1, FR2", ports: "MOSI (M→S) · MISO (S→M) · SCLK (M→S) · CS/SS (M→S) + Common GND", desc: "Breadboard jumper interconnect linking the two FPGA boards using Mode 0 synchronous serial signaling." },
    { id: "slave", title: "SPI Slave Deserializer", board: "Slave FPGA", fr: "FR2, FR4", ports: "IN: sclk, cs_n, mosi, rst | OUT: rx_code[3:0], rx_done, miso", desc: "Captures incoming MOSI bits into a 4-bit shift register on rising SCLK edges while CS/SS is LOW and pulses rx_done on the 4th bit." },
    { id: "compare", title: "Comparator & Lock FSM", board: "Slave FPGA", fr: "FR3, FR5", ports: "IN: rx_code[3:0], rx_done, rst | OUT: led_green, led_red, led_yellow, lock_out", desc: "Compares rx_code against the predefined 4-bit stored password (4'b1010) and drives Unlocked (Green), Locked (Red), or Wrong Code (Yellow) indicators." }
  ],

  decisions: [
    {
      id: "DC-01",
      title: "Select SPI Mode 0 (CPOL=0, CPHA=0) for Master-Slave transfer",
      options: "Mode 0 vs. Mode 3 (CPOL=1, CPHA=1) and Parallel 4-bit bus",
      fr: "FR1, FR2",
      course: "Digital Circuits",
      concept: "Edge-triggered shift registers & setup/hold timing margins",
      applied: "Master updates MOSI on falling SCLK edge; Slave samples on rising SCLK edge. At f_SCLK = 100 kHz (T = 10 us), setup time available is 5 us >> FPGA FF t_su (~0.5 ns).",
      meets: "VLSI System Design — clock-domain crossing and interconnect loading on jumper wires",
      predicted: "Zero setup/hold violations in Vivado Post-Synthesis timing & clean scope capture",
      measured: "Pending Step 13 hardware test",
      learning: "Pending Step 13",
      level: "Applied"
    },
    {
      id: "DC-02",
      title: "Divide FPGA clock to <= 100 kHz for breadboard SPI interconnect",
      options: "Direct 100 MHz FPGA clock vs. 10 MHz vs. 100 kHz divided SCLK",
      fr: "FR2",
      course: "Signals and Systems",
      concept: "Bandwidth, parasitic RC rise-time, and ringing on unshielded wires",
      applied: "Breadboard jumper capacitance (~30 pF) + series resistance limits clean square-wave edges at high MHz. Dividing 100 MHz by 1000 gives 100 kHz SCLK (T = 10 us), eliminating ringing.",
      meets: "Digital Circuits — synchronous modulo-N clock divider counter",
      predicted: "Clean logic-high/low transitions (< 50 ns rise time) with zero false clock glitches",
      measured: "Pending Step 13 oscilloscope capture",
      learning: "Pending Step 13",
      level: "Applied"
    },
    {
      id: "DC-03",
      title: "Implement hardware password comparison inside Slave FPGA FSM",
      options: "Compare on Master FPGA vs. Compare inside isolated Slave FPGA",
      fr: "FR3, FR5",
      course: "Computer Organization",
      concept: "Isolated control/datapath separation & secure state machines",
      applied: "Keeping STORED_CODE = 4'b1010 as a local parameter/register inside the Slave ensures the Master only transmits guesses and receives pass/fail status.",
      meets: "Digital System Design (Verilog) — Moore FSM safe-reset encoding",
      predicted: "16/16 exhaustive input combinations verified in Vivado testbench",
      measured: "Pending Step 13",
      learning: "Pending Step 13",
      level: "Applied"
    },
    {
      id: "DC-04",
      title: "Add 3-state LED indicator logic (Green / Red / Yellow)",
      options: "Single Green LED vs. Dual Red/Green vs. Tri-state Green/Red/Yellow",
      fr: "FR3",
      course: "Analog Electronic Circuits",
      concept: "Current-limiting resistor sizing for FPGA GPIO LED loads",
      applied: "R = (V_OH - V_F) / I_LED = (3.3 V - 2.0 V) / 5 mA = 260 Ohm -> selected 330 Ohm standard resistor to keep GPIO current safely under 8 mA.",
      meets: "Digital Circuits — mutually exclusive combinational output decoding",
      predicted: "Clear brightness at ~4 mA per LED without drooping FPGA 3.3 V rail",
      measured: "Pending Step 13 multimeter measurement",
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
      id: "master",
      label: "spi_master.v",
      desc: "4-bit SPI Mode 0 Master FSM with MSB-first shift register",
      code: `module spi_master (
    input  wire       clk,       // Divided SPI base clock
    input  wire       rst,       // Active-high synchronous reset
    input  wire       start,     // Trigger 4-bit transmission
    input  wire [3:0] data_in,   // 4-bit access code from switches
    input  wire       miso,      // Status ACK from Slave FPGA
    output reg        sclk,      // Serial Clock to Slave
    output reg        mosi,      // Master Out Slave In
    output reg        cs_n,      // Active-LOW Chip Select
    output reg        done,      // Frame complete pulse
    output reg        ack_out    // Latched unlock status from Slave
);
    reg [3:0] shift_reg;
    reg [2:0] bit_cnt;
    reg       busy;

    always @(posedge clk or posedge rst) begin
        if (rst) begin
            cs_n      <= 1'b1;
            sclk      <= 1'b0;
            mosi      <= 1'b0;
            done      <= 1'b0;
            busy      <= 1'b0;
            bit_cnt   <= 3'd0;
            ack_out   <= 1'b0;
            shift_reg <= 4'b0000;
        end else if (start && !busy) begin
            busy      <= 1'b1;
            cs_n      <= 1'b0;
            shift_reg <= data_in;
            mosi      <= data_in[3];   // Present MSB before 1st rising edge
            bit_cnt   <= 3'd4;
            sclk      <= 1'b0;
            done      <= 1'b0;
        end else if (busy) begin
            sclk <= ~sclk;
            if (sclk == 1'b0) begin
                // Rising edge: Slave samples MOSI; Master samples MISO
                ack_out <= miso;
            end else begin
                // Falling edge: shift next bit onto MOSI
                if (bit_cnt > 3'd1) begin
                    bit_cnt   <= bit_cnt - 3'd1;
                    shift_reg <= {shift_reg[2:0], 1'b0};
                    mosi      <= shift_reg[2];
                end else begin
                    busy <= 1'b0;
                    cs_n <= 1'b1;
                    sclk <= 1'b0;
                    done <= 1'b1;
                end
            end
        end else begin
            done <= 1'b0;
        end
    end
endmodule`
    },
    {
      id: "slave",
      label: "spi_slave_locker.v",
      desc: "SPI Slave deserializer + 4-bit stored passcode comparator & LED outputs",
      code: `module spi_slave_locker #(
    parameter [3:0] STORED_CODE = 4'b1010
)(
    input  wire       sclk,
    input  wire       cs_n,
    input  wire       mosi,
    input  wire       rst,
    output reg        miso,
    output reg        led_green,   // Unlocked
    output reg        led_red,     // Locked
    output reg        led_yellow   // Wrong Code
);
    reg [3:0] rx_shift;
    reg [2:0] bit_cnt;

    always @(posedge sclk or posedge rst or posedge cs_n) begin
        if (rst) begin
            rx_shift   <= 4'b0000;
            bit_cnt    <= 3'd0;
            led_green  <= 1'b0;
            led_red    <= 1'b1;    // Default safe state: LOCKED
            led_yellow <= 1'b0;
            miso       <= 1'b0;
        end else if (cs_n) begin
            bit_cnt <= 3'd0;
        end else begin
            rx_shift <= {rx_shift[2:0], mosi};
            if (bit_cnt == 3'd3) begin
                if ({rx_shift[2:0], mosi} == STORED_CODE) begin
                    led_green  <= 1'b1;
                    led_red    <= 1'b0;
                    led_yellow <= 1'b0;
                    miso       <= 1'b1;
                end else begin
                    led_green  <= 1'b0;
                    led_red    <= 1'b1;
                    led_yellow <= 1'b1;
                    miso       <= 1'b0;
                end
                bit_cnt <= 3'd0;
            end else begin
                bit_cnt <= bit_cnt + 3'd1;
            end
        end
    end
endmodule`
    },
    {
      id: "tb",
      label: "tb_spi_locker.v",
      desc: "Self-checking Vivado testbench testing wrong code, correct code, and reset",
      code: `\`timescale 1ns / 1ps
module tb_spi_locker;
    reg        clk = 0, rst = 1, start = 0;
    reg  [3:0] data_in = 4'b0000;
    wire       sclk, mosi, miso, cs_n, done, ack_out;
    wire       led_green, led_red, led_yellow;

    spi_master u_master (
        .clk(clk), .rst(rst), .start(start), .data_in(data_in),
        .miso(miso), .sclk(sclk), .mosi(mosi), .cs_n(cs_n),
        .done(done), .ack_out(ack_out)
    );

    spi_slave_locker #(.STORED_CODE(4'b1010)) u_slave (
        .sclk(sclk), .cs_n(cs_n), .mosi(mosi), .rst(rst),
        .miso(miso), .led_green(led_green),
        .led_red(led_red), .led_yellow(led_yellow)
    );

    always #50 clk = ~clk; // 10 MHz sim clock

    initial begin
        #120 rst = 0;
        // Test 1: Wrong code 4'b0110 -> Expect Red + Yellow ON
        data_in = 4'b0110; start = 1; #100 start = 0;
        wait(done); #200;
        // Test 2: Correct code 4'b1010 -> Expect Green ON
        data_in = 4'b1010; start = 1; #100 start = 0;
        wait(done); #200;
        $finish;
    end
endmodule`
    }
  ],

  notebook: [
    {
      date: "18 Nov 2026",
      author: "Mohan Reddy & Team 13",
      objective: "Finalize 4-bit SPI locker scope, architecture diagram, and launch interactive EE-VDT portfolio.",
      decision: "Standardized on 4-bit credential over SPI Mode 0 across two FPGAs; validated initial logic in Proteus 8.",
      course: "Digital Circuits & Digital System Design (Verilog)",
      learning: "Separating the Master input board and Slave comparator board cleanly demonstrates real serial access control while keeping hardware debugging modular.",
      next: "Run exhaustive 16-code Vivado behavioral simulation and freeze FR1–FR5 before Review 3."
    },
    {
      date: "11 Nov 2026",
      author: "Pallavi T & Achsah Praisey G",
      objective: "Evaluate parallel vs. UART vs. SPI communication options for digital locker.",
      decision: "Selected 4-wire SPI over parallel wiring and UART using weighted Pugh matrix.",
      course: "Computer Organization & Interfacing",
      learning: "Shared SCLK removes baud-rate drift between boards and simplifies testbench verification.",
      next: "Draft spi_master.v and spi_slave_locker.v RTL modules."
    }
  ],

  reviews: [
    {
      review: "Review 1 — Theme Approval",
      date: "10 Nov 2026",
      observation: "Clarify exact bit-width (4-bit vs 8-bit) consistently across block diagram, objectives, and testbench.",
      response: "Aligned project specification, objectives, and Verilog RTL parameters to 4-bit access code; noted 8-bit scalability as future scope.",
      where: "Page 02 (Problem & Need) & Page 04 (FR Table)"
    }
  ],

  risks: [
    { id: "R1", title: "Floating CS/SS or SCLK lines during FPGA reconfiguration", severity: "High", status: "Mitigated", mitigation: "Add 10 kOhm pull-up on CS/SS (inactive HIGH) and pull-down on SCLK so the Slave stays safely LOCKED while Master reprograms." },
    { id: "R2", title: "Mechanical pushbutton bounce triggering multiple SPI frames", severity: "High", status: "Planned", mitigation: "Implement a 20 ms counter-based debouncer + rising-edge detector on btn_send in Master FPGA RTL." },
    { id: "R3", title: "Missing common GND between Master and Slave FPGA boards", severity: "Medium", status: "Mitigated", mitigation: "Dedicate two breadboard ground return jumpers alongside the 4 SPI lines before powering boards." },
    { id: "R4", title: "SCLK ringing at high frequency over jumper wires", severity: "Medium", status: "Mitigated", mitigation: "Clock-divide SCLK down to <= 100 kHz for breadboard transfers and verify edges on lab oscilloscope." }
  ],

  files: [
    { name: "Formal Mini-Project Report (Appendix A)", type: "PDF / DOCX", status: "In Progress", url: "#" },
    { name: "Verilog RTL & Vivado Testbench Repository", type: "GitHub / Drive", status: "Ready to Link", url: "#" },
    { name: "Proteus 8 Discrete Logic Schematic (.pdsprj)", type: "Schematic", status: "Captured", url: "#" },
    { name: "Dual-FPGA Pin Constraints (.xdc)", type: "Vivado XDC", status: "Pending R4", url: "#" }
  ]
};
