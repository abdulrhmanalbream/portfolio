import React, { useState, useRef, useEffect } from "react";
import { CommandResponse } from "../types";
import { PROJECTS, METRICS, SKILL_CATEGORIES, TIMELINE_LOGS, TERMINAL_HELP, TERMINAL_CONTENT } from "../data";
import { motion } from "framer-motion";

// Diagnostics Typing Animation Component with Multi-Color Support
interface DiagnosticsPart {
  text: string;
  color: "yellow" | "cyan" | "green";
}

function DiagnosticsTyping({ parts }: { parts: DiagnosticsPart[] }) {
  const [displayedChars, setDisplayedChars] = useState(0);

  // Calculate total characters across all parts
  const totalChars = parts.reduce((sum, part) => sum + part.text.length, 0);

  useEffect(() => {
    if (displayedChars < totalChars) {
      const timer = setTimeout(() => {
        setDisplayedChars(displayedChars + 1);
      }, 15); // Adjust speed (15ms per character)
      return () => clearTimeout(timer);
    }
  }, [displayedChars, totalChars]);

  // Build the displayed content based on displayedChars
  let charCount = 0;
  const displayedParts = parts.map((part, idx) => {
    const startChar = charCount;
    const endChar = charCount + part.text.length;
    charCount = endChar;

    let displayedText = "";
    if (displayedChars >= endChar) {
      displayedText = part.text; // Full text visible
    } else if (displayedChars > startChar) {
      displayedText = part.text.substring(0, displayedChars - startChar); // Partial text
    }

    const colorClass = {
      yellow: "text-yellow-500",
      cyan: "text-cyan-400",
      green: "text-emerald-400 font-bold drop-shadow-lg shadow-emerald-500/50"
    }[part.color];

    return (
      <span key={idx} className={colorClass}>
        {displayedText}
      </span>
    );
  });

  const cursorVisible = displayedChars < totalChars;

  return (
    <pre className="font-mono text-xs text-neutral-300 mt-1 whitespace-pre-wrap break-words leading-relaxed">
      {displayedParts}
      {cursorVisible && <span className="text-yellow-500 animate-pulse">▌</span>}
    </pre>
  );
}

export function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandResponse[]>([
    {
      command: "system_boot",
      output: (
        <div className="space-y-1">
          <p className="text-matrix-green text-xs font-semibold">{TERMINAL_CONTENT.bootMessage.line1}</p>
          <p className="text-neutral-500 text-[11px]">{TERMINAL_CONTENT.bootMessage.line2}</p>
          <p className="text-neutral-300 text-xs">
            {TERMINAL_CONTENT.bootMessage.line3}
            <span className="text-matrix-green font-bold bg-matrix-green/10 px-1 border border-matrix-green/20 rounded ml-1">help</span>
          </p>
        </div>
      ),
      timestamp: "08:05:56"
    }
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [userIp, setUserIp] = useState("127.0.0.1");
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.ip) {
          setUserIp(data.ip);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch user IP, using default loopback.", err);
      });
  }, []);

  // Scroll terminal content area to bottom when history updates
  useEffect(() => {
    if (contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollTo({ top: contentRef.current.scrollHeight, behavior: "smooth" });
      }, 0);
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    if (trimmed.startsWith("ping")) {
      const parts = trimmed.split(/\s+/);
      let targetHost = "gateway.alburaym.dev";
      let targetIp = "1.1.1.1";

      if (parts.length > 1 && parts[1]) {
        const arg = parts[1];
        if (arg === "8.8.8.8" || arg.toLowerCase().includes("google")) {
          targetHost = "google-public-dns-a.google.com";
          targetIp = "8.8.8.8";
        } else if (arg === "1.1.1.1" || arg.toLowerCase().includes("cloudflare")) {
          targetHost = "one.one.one.one";
          targetIp = "1.1.1.1";
        } else {
          targetHost = arg;
          targetIp = "192.168.1.50";
        }
      }

      // Add initial header line to history
      setHistory((prev) => [
        ...prev,
        {
          command: cmdStr,
          output: (
            <div className="font-mono text-xs text-zinc-400 space-y-1">
              <p>PING {targetHost} ({targetIp}) 56(84) bytes of data.</p>
              <p className="animate-pulse text-neutral-500">Checking latency...</p>
            </div>
          ),
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      setInputVal("");

      // Measure latency and update history
      (async () => {
        const pings: number[] = [];
        const measurePing = async () => {
          const pStart = performance.now();
          try {
            await fetch(`https://api.ipify.org?format=json&t=${Date.now()}`, { mode: "no-cors", cache: "no-store" });
            const pEnd = performance.now();
            const raw = pEnd - pStart;
            return Math.max(12, Math.min(28, Math.round(raw / 12 + Math.random() * 3)));
          } catch {
            return Math.floor(Math.random() * 8) + 14;
          }
        };

        const seq1 = await measurePing();
        pings.push(seq1);

        setHistory((prev) =>
          prev.map((h, idx) => {
            if (idx === prev.length - 1 && h.command === cmdStr) {
              return {
                ...h,
                output: (
                  <div className="font-mono text-xs text-zinc-400 space-y-1">
                    <p>PING {targetHost} ({targetIp}) 56(84) bytes of data.</p>
                    <p>64 bytes from {targetIp}: icmp_seq=1 ttl=56 time={seq1} ms</p>
                    <p className="animate-pulse text-neutral-500">Sending next packet...</p>
                  </div>
                )
              };
            }
            return h;
          })
        );

        await new Promise((r) => setTimeout(r, 600));

        const seq2 = await measurePing();
        pings.push(seq2);

        const min = Math.min(...pings);
        const max = Math.max(...pings);
        const avg = Math.round(pings.reduce((a, b) => a + b, 0) / pings.length);

        setHistory((prev) =>
          prev.map((h, idx) => {
            if (idx === prev.length - 1 && h.command === cmdStr) {
              return {
                ...h,
                output: (
                  <div className="font-mono text-xs text-zinc-400 space-y-1">
                    <p>PING {targetHost} ({targetIp}) 56(84) bytes of data.</p>
                    <p>64 bytes from {targetIp}: icmp_seq=1 ttl=56 time={seq1} ms</p>
                    <p>64 bytes from {targetIp}: icmp_seq=2 ttl=56 time={seq2} ms</p>
                    <p className="text-matrix-green mt-1">--- {targetHost} ping statistics ---</p>
                    <p>2 packets transmitted, 2 received, 0% packet loss</p>
                    <p>rtt min/avg/max = {min}/{avg}/{max} ms</p>
                  </div>
                )
              };
            }
            return h;
          })
        );
      })();
      return;
    }

    if (trimmed === "matrix") {
      // Calculate total skills
      const totalSkills = SKILL_CATEGORIES.reduce((sum, cat) => sum + cat.skills.length, 0);

      const diagnosticsParts: DiagnosticsPart[] = [
        { text: "[SCAN_INITIATED] Core Systems Diagnostic...\n\n", color: "yellow" },
        { text: "▓▓▓▓▓░░░░░ 45% - Projects Database: LOADED\n", color: "cyan" },
        { text: "▓▓▓▓▓▓▓░░░ 72% - Skills Index: INDEXED\n", color: "cyan" },
        { text: "▓▓▓▓▓▓▓▓▓░ 92% - AI Models: INTEGRATED\n", color: "cyan" },
        { text: `[SCAN_COMPLETE] ${PROJECTS.length} Projects | ${totalSkills} Skills | ${METRICS.length} Metrics Ready`, color: "green" }
      ];

      setHistory((prev) => [
        ...prev,
        {
          command: "matrix",
          output: <DiagnosticsTyping parts={diagnosticsParts} />,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      setInputVal("");
      return;
    }

    let out: React.ReactNode = "";

    switch (trimmed) {
      case "help":
        out = (
          <div className="space-y-2 mt-1">
            <p className="text-zinc-400 text-xs">{TERMINAL_HELP.intro}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              {TERMINAL_HELP.commands.map((cmd, idx) => (
                <div key={idx}>
                  <span className="text-matrix-green font-bold font-mono">{cmd.command}</span>
                  <span className="text-neutral-500 text-[11px] block">{cmd.description}</span>
                </div>
              ))}
            </div>
            <p className="text-neutral-500 text-[11px]">{TERMINAL_HELP.tip}</p>
          </div>
        );
        break;

      case "about":
        out = (
          <div className="space-y-1.5 mt-1 text-xs">
            <p className="text-matrix-green font-bold">{`OPERATIVE: ${TERMINAL_CONTENT.about.operative}`}</p>
            <p className="text-neutral-300"><span className="text-neutral-500">CLASSIFICATION:</span> {TERMINAL_CONTENT.about.classification}</p>
            <p className="text-neutral-300"><span className="text-neutral-500">SPECIALIZATION:</span> {TERMINAL_CONTENT.about.specialization}</p>
            <p className="text-neutral-300 leading-relaxed"><span className="text-neutral-500">CORE ETHOS:</span> {TERMINAL_CONTENT.about.ethos}</p>
          </div>
        );
        break;

      case "education":
        out = (
          <div className="space-y-1.5 mt-1 text-xs">
            <p className="text-matrix-green font-bold">ACADEMIC CREDENTIALS:</p>
            <p className="text-neutral-300"><span className="text-neutral-500">DEGREE:</span> {TERMINAL_CONTENT.education.degree}</p>
            <p className="text-neutral-300"><span className="text-neutral-500">UNIVERSITY:</span> {TERMINAL_CONTENT.education.university}</p>
            <p className="text-neutral-300"><span className="text-neutral-500">GRADUATION:</span> {TERMINAL_CONTENT.education.graduation}</p>
            <p className="text-neutral-300 leading-relaxed"><span className="text-neutral-500">CORE INTERESTS:</span> {TERMINAL_CONTENT.education.interests}</p>
          </div>
        );
        break;

      case "certifications":
        out = (
          <div className="space-y-1.5 mt-1 text-xs">
            <p className="text-matrix-green font-bold">{TERMINAL_CONTENT.certifications.intro}</p>
            <div className="space-y-1 pl-3">
              {TERMINAL_CONTENT.certifications.items.map((item, idx) => (
                <p key={idx} className="text-neutral-300">▸ {item}</p>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        out = (
          <div className="space-y-3 mt-1">
            <p className="text-zinc-400 text-xs">{TERMINAL_CONTENT.projectsLabel}</p>
            {PROJECTS.map((proj, idx) => (
              <div key={proj.id} className="border-l border-matrix-green/30 pl-3 py-1 space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-matrix-green font-mono">[{idx + 1}] {proj.title}</span>
                  <span className="text-neutral-500">[STATUS: {proj.status}]</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-zinc-500 font-mono">
                  <span>STATED TECH: {proj.tech.join(", ")}</span>
                  {proj.metrics?.map((met) => (
                    <span key={met.label} className="text-matrix-green">
                      {met.label}: {met.value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "metrics":
        out = (
          <div className="space-y-2 mt-1">
            <p className="text-zinc-400 text-xs">{TERMINAL_CONTENT.metricsLabel}</p>
            {METRICS.map((met) => {
              const bars = "■".repeat(Math.round(met.progressPercent / 10)) + "□".repeat(10 - Math.round(met.progressPercent / 10));
              return (
                <div key={met.id} className="text-xs space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-matrix-green">{met.label}</span>
                    <span className="text-emerald-accent font-bold">{met.value}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="text-matrix-green/60 tracking-tighter">{bars}</span>
                    <span className="text-neutral-500">{met.subValue}</span>
                  </div>
                </div>
              );
            })}
          </div>
        );
        break;

      case "skills":
        out = (
          <div className="space-y-2.5 mt-1 text-xs">
            <p className="text-zinc-400">{TERMINAL_CONTENT.skillsLabel}</p>
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <p className="text-matrix-green font-semibold text-[11px] font-mono">► {cat.categoryName}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 pl-3 text-[11px]">
                  {cat.skills.map((s, si) => (
                    <div key={si} className="flex justify-between text-neutral-400">
                      <span>- {s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "timeline":
        out = (
          <div className="space-y-2 mt-1">
            <p className="text-zinc-400 text-xs">{TERMINAL_CONTENT.timelineLabel}</p>
            {TIMELINE_LOGS.map((log) => (
              <div key={log.id} className="text-xs pl-3 border-l border-neutral-800 space-y-0.5">
                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                  <span>[{log.timestamp}]</span>
                  <span className="text-matrix-green/80">[{log.category}]</span>
                </div>
                <p className="text-neutral-300 font-mono text-[11px] font-medium">{log.event}</p>
                <p className="text-neutral-500 text-[10px] leading-relaxed">{log.details}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        out = (
          <div className="space-y-1.5 mt-1 text-xs text-neutral-300">
            <p className="text-matrix-green font-bold">{TERMINAL_CONTENT.contactLabel}</p>
            <p>{TERMINAL_CONTENT.contactMessage}</p>
            <p className="font-mono text-[11px] text-neutral-400">
              EMAIL: <a href={`mailto:${TERMINAL_CONTENT.contactDetails.email}`} className="hover:text-matrix-green text-matrix-green underline">{TERMINAL_CONTENT.contactDetails.email}</a>
            </p>
            <p className="font-mono text-[11px] text-neutral-400">
              GITHUB: <a href={TERMINAL_CONTENT.contactDetails.github} target="_blank" rel="noreferrer" className="hover:text-matrix-green text-matrix-green underline">{TERMINAL_CONTENT.contactDetails.github}</a>
            </p>
            <p className="font-mono text-[11px] text-neutral-400">
              LINKEDIN: <a href={TERMINAL_CONTENT.contactDetails.linkedin} target="_blank" rel="noreferrer" className="hover:text-matrix-green text-matrix-green underline">{TERMINAL_CONTENT.contactDetails.linkedin}</a>
            </p>
          </div>
        );
        break;

      // Ping is now handled by the async ping interceptor above the switch statement

      default:
        out = `COMMAND NOT FOUND: '${cmdStr}'. Type 'help' to review directory of diagnostic protocols.`;
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmdStr,
        output: typeof out === "string" ? <p className="text-red-500 text-xs font-mono">{out}</p> : out,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);

    setInputVal("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  const handleShortcutClick = (cmd: string) => {
    handleCommand(cmd);
    // Focus terminal input
    inputRef.current?.focus();
  };

  return (
    <section id="terminal" className="px-4 md:px-8 lg:px-16 py-16 md:py-24 relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-12"
      >
        <div className="font-mono text-xs text-text-dim tracking-widest mb-2">
          {'// '}SHELL_MODULES
        </div>
        <h2 className="font-terminal text-2xl md:text-3xl lg:text-4xl text-matrix text-glow tracking-wider">
          {'<'}TERMINAL{'/>'}
        </h2>
      </motion.div>
      <div className={`bg-black/90 border border-matrix-green/20 rounded-lg flex flex-col font-mono text-xs select-text shadow-xl relative ${isMaximized
        ? "fixed inset-0 z-50 rounded-none p-5 border-0"
        : isMinimized
          ? "w-full max-h-fit cursor-pointer hover:border-matrix-green/50 transition-all"
          : "p-3 md:p-5 w-full min-h-[350px] max-h-[500px]"
        }`}>

        {/* Terminal Title Bar */}
        {!isMinimized && (
          <div className="flex items-center justify-between border-b border-matrix-green/10 pb-2 mb-3 select-none" onClick={() => isMinimized && setIsMinimized(false)}>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600/50 hover:bg-red-500 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); setHistory([]); }} title="Clear terminal" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-600/50 hover:bg-yellow-500 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} title="Minimize" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-600/50 hover:bg-green-500 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }} title="Maximize" />
              </div>
              <span className="text-[10px] text-matrix-green/50 font-bold ml-1 md:ml-2">GUEST_TERMINAL@ALBURAYM.DEV:~</span>
            </div>
            <div className="text-[9px] text-neutral-500 flex items-center gap-1.5 font-sans">
              <span className="w-1.5 h-1.5 bg-matrix-green rounded-full animate-pulse" />
              SSL AUTO SHIELD
            </div>
          </div>
        )}

        {/* Minimized View - Enhanced Design */}
        {isMinimized && (
          <div className="py-4 px-4 space-y-3 cursor-pointer hover:bg-matrix-green/5 transition-colors rounded" onClick={() => setIsMinimized(false)}>
            {/* <p className="text-neutral-400 text-[16px] mt-1">GUEST_TERMINAL@ALBURAYM.DEV:~</p> */}
            <div className="flex items-center justify-between border-b border-matrix-green/10 pb-2 mb-3 select-none" onClick={() => isMinimized && setIsMinimized(false)}>
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-[16px] text-matrix-green/50 font-bold ml-1 md:ml-2">GUEST_TERMINAL@ALBURAYM.DEV:~</span>
              </div>
              <div className="text-[9px] text-neutral-500 flex items-center gap-1.5 font-sans">
                <span className="w-1.5 h-1.5 bg-matrix-green rounded-full animate-pulse" />
                SSL AUTO SHIELD
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2 text-neutral-500 text-[14px]">
              <span>Click to expand terminal</span>
            </div>
          </div>
        )}

        {/* Terminal Content Lines */}
        {!isMinimized && (
          <div ref={contentRef} className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0 text-left scrollbar">
            {history.map((h, i) => (
              <div key={i} className="space-y-1">
                {h.command !== "system_boot" && h.command !== "matrix_stream" && (
                  <div className="flex items-center gap-2 select-none text-neutral-500 text-[11px]">
                    <span className="text-matrix-green">&gt;</span>
                    <span className="text-zinc-300 font-bold">{h.command}</span>
                    <span className="ml-auto text-[9px] text-neutral-600">{h.timestamp}</span>
                  </div>
                )}
                <div className="text-neutral-300 pl-1">{h.output}</div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Interactive Command Buttons for UX Ease */}
        {!isMinimized && (
          <div className="mt-3 pt-2.5 border-t border-matrix-green/10 flex flex-wrap gap-1.5 items-center select-none text-[10px]">
            <span className="text-neutral-500 mr-1 font-sans">CMD_SHORTCUTS:</span>
            <button
              onClick={() => handleShortcutClick("about")}
              className="px-2 py-0.5 rounded border border-matrix-green/20 hover:border-matrix-green hover:bg-matrix-green/10 text-matrix-green text-[10px] transition duration-200 cursor-pointer"
            >
              [about]
            </button>
            <button
              onClick={() => handleShortcutClick("education")}
              className="px-2 py-0.5 rounded border border-matrix-green/20 hover:border-matrix-green hover:bg-matrix-green/10 text-matrix-green text-[10px] transition duration-200 cursor-pointer"
            >
              [education]
            </button>
            <button
              onClick={() => handleShortcutClick("certifications")}
              className="px-2 py-0.5 rounded border border-matrix-green/20 hover:border-matrix-green hover:bg-matrix-green/10 text-matrix-green text-[10px] transition duration-200 cursor-pointer"
            >
              [certifications]
            </button>
            <button
              onClick={() => handleShortcutClick("projects")}
              className="px-2 py-0.5 rounded border border-matrix-green/20 hover:border-matrix-green hover:bg-matrix-green/10 text-matrix-green text-[10px] transition duration-200 cursor-pointer"
            >
              [projects]
            </button>
            <button
              onClick={() => handleShortcutClick("metrics")}
              className="px-2 py-0.5 rounded border border-matrix-green/20 hover:border-matrix-green hover:bg-matrix-green/10 text-matrix-green text-[10px] transition duration-200 cursor-pointer"
            >
              [metrics]
            </button>
            <button
              onClick={() => handleShortcutClick("skills")}
              className="px-2 py-0.5 rounded border border-matrix-green/20 hover:border-matrix-green hover:bg-matrix-green/10 text-matrix-green text-[10px] transition duration-200 cursor-pointer"
            >
              [skills]
            </button>
            <button
              onClick={() => handleShortcutClick("timeline")}
              className="px-2 py-0.5 rounded border border-matrix-green/20 hover:border-matrix-green hover:bg-matrix-green/10 text-matrix-green text-[10px] transition duration-200 cursor-pointer"
            >
              [timeline]
            </button>
            <button
              onClick={() => handleShortcutClick("contact")}
              className="px-2 py-0.5 rounded border border-matrix-green/20 hover:border-matrix-green hover:bg-matrix-green/10 text-matrix-green text-[10px] transition duration-200 cursor-pointer"
            >
              [contact]
            </button>
            <button
              onClick={() => handleShortcutClick("matrix")}
              className="px-2 py-0.5 rounded border border-yellow-600/20 hover:border-yellow-600 hover:bg-yellow-600/10 text-yellow-500 text-[10px] transition duration-200 cursor-pointer"
            >
              [diagnostics]
            </button>
            <button
              onClick={() => handleShortcutClick("ping")}
              className="px-2 py-0.5 rounded border border-matrix-green/20 hover:border-matrix-green hover:bg-matrix-green/10 text-matrix-green text-[10px] transition duration-200 cursor-pointer"
            >
              [ping]
            </button>
            <button
              onClick={() => handleShortcutClick("clear")}
              className="px-1.5 py-0.5 rounded border border-neutral-800 hover:border-neutral-500 hover:bg-neutral-800 text-neutral-400 text-[10px] transition duration-200 ml-auto cursor-pointer"
            >
              [clear]
            </button>
          </div>
        )}

        {/* Terminal Input Form */}
        {!isMinimized && (
          <form onSubmit={handleFormSubmit} className="mt-2.5 flex items-center gap-2 select-none border border-matrix-green/10 rounded px-2 bg-black">
            <span className="text-matrix-green font-bold text-xs select-none animate-pulse">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type 'help' or click any shortcut tag..."
              className="flex-1 bg-transparent border-none text-matrix-green font-mono text-xs focus:ring-0 focus:outline-none placeholder-matrix-green/40 py-2"
            />
            <span className="text-[10px] text-neutral-500 font-sans hidden sm:inline">RETURN KEY TO RUN</span>
          </form>
        )}
      </div>
    </section>
  );
}
