"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type HistoryEntry = {
  type: "input" | "output";
  content: string;
};

const QUOTES = [
  `"There is no spoon." \u2014 The Matrix`,
  `"The quieter you become, the more you are able to hear." \u2014 Kali Linux motd`,
  `"Hack the planet." \u2014 Hackers (1995)`,
  `"I'm in." \u2014 Every hacker movie ever`,
  `"It's not a bug, it's a feature." \u2014 Anonymous`,
  `"The best way to predict the future is to invent it." \u2014 Alan Kay`,
  `"Never trust a computer you can't throw out a window." \u2014 Steve Wozniak`,
  `"We are the ghosts in the machine." \u2014 The Symbiosis`,
];

const ASCII_ALIEN = `<span class="alien-glow">
    .-"      "-.
   /    _    _   \\
  |   (o)  (o)   |
  |    \\  __/    |
   \\   '.__.'   /
    '-._    _.-'
     /  '--'  \\
    |  ||  ||  |
     \\_||__||_/
      \\______/
</span>`;

const FAKE_HISTORY = `  1  nmap -sV 192.168.1.0/24
  2  ssh root@10.10.10.1
  3  python3 exploit.py --target 10.10.10.1
  4  wireshark -i eth0
  5  hashcat -m 0 hash.txt rockyou.txt
  6  gobuster dir -u http://10.10.10.1 -w /usr/share/wordlists/common.txt
  7  curl -s http://10.10.10.1/robots.txt
  8  john --wordlist=rockyou.txt shadow.hash
  9  nc -lvnp 4444`;

const MOTD = `<span class="t-dim">Last login: ${typeof window !== "undefined" ? new Date().toDateString() : "..."} from 127.0.0.1</span>
<span class="t-dim">Welcome back, visitor. Look around.</span>`;

const SYMBIOSIS_QUOTES = [
  "The human provides intuition, creativity, and judgment. The AI provides speed, memory, and pattern recognition. Together: something neither could be alone.",
  "We are not building a tool. We are building an extension of human capability.",
  "The augmented human doesn't replace the operator. It amplifies them.",
  "One human + one AI, tightly integrated, outperforms any team that treats AI as a service.",
];

const COMMANDS: Record<string, () => string> = {
  help: () =>
    `<span class="t-bold">Available commands:</span>

  <span class="t-prompt">whoami</span>      <span class="t-dim">-</span> About me
  <span class="t-prompt">skills</span>      <span class="t-dim">-</span> Technical skills
  <span class="t-prompt">experience</span>  <span class="t-dim">-</span> Work history
  <span class="t-prompt">certs</span>       <span class="t-dim">-</span> Certifications
  <span class="t-prompt">contact</span>     <span class="t-dim">-</span> Contact info
  <span class="t-prompt">tools</span>       <span class="t-dim">-</span> Study tools & resources
  <span class="t-prompt">neofetch</span>    <span class="t-dim">-</span> System info
  <span class="t-prompt">alien</span>       <span class="t-dim">-</span> \u{1F47D}
  <span class="t-prompt">matrix</span>      <span class="t-dim">-</span> Toggle Matrix rain
  <span class="t-prompt">symbiosis</span>   <span class="t-dim">-</span> The philosophy
  <span class="t-prompt">decode</span>      <span class="t-dim">-</span> Base64 decode
  <span class="t-prompt">morse</span>       <span class="t-dim">-</span> Text to morse code
  <span class="t-prompt">scan</span>        <span class="t-dim">-</span> Scan a target
  <span class="t-prompt">gh0st</span>       <span class="t-dim">-</span> Ask the AI agent
  <span class="t-prompt">clear</span>       <span class="t-dim">-</span> Clear terminal`,

  whoami: () =>
    `<span class="t-bold">a1i3n37x (Russell J. Adams)</span>
<span class="t-dim">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
Grand Junction, CO
USAF intel vet \u00B7 CEH certified \u00B7 Augmented Human
Security operator building AI-human symbiosis.`,

  skills: () =>
    `<span class="t-warn">[Offensive]</span>   Nmap, Burp Suite, Metasploit, Wireshark, Kali, OSINT
<span class="t-warn">[Dev]</span>        Python, TypeScript, Next.js, React, Bash, SQL
<span class="t-warn">[Infra]</span>      TCP/IP, Linux, Tailscale, Docker, DOCSIS/RF
<span class="t-warn">[AI]</span>         MCP Protocol, Ollama, ReAct Agents, Qdrant, Claude Code`,

  experience: () =>
    `<span class="t-prompt">[2021-NOW]</span>  Amazon Logistics + Independent Security Ops
<span class="t-warn">[2017-2021]</span> Spectrum - Field Technician II
<span class="t-err">[2012-2017]</span> Telecom - Technical Support
<span class="t-info">[2006-2010]</span> USAF - Operations Intelligence Analyst`,

  certs: () =>
    `<span class="t-prompt">CEH</span>        Certified Ethical Hacker - EC-Council
<span class="t-prompt">GCC</span>        Google Cybersecurity Certificate
<span class="t-prompt">USAF</span>       Intelligence Operations Specialist`,

  contact: () =>
    `<span class="t-info">Location:</span>  Grand Junction, CO
<span class="t-info">Email:</span>     radams.starpointlogistics@gmail.com
<span class="t-info">GitHub:</span>    github.com/russelljadams`,

  tools: () =>
    `<span class="t-bold">Study Tools & Resources</span>
<span class="t-dim">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>

<span class="t-info">[CEH Cram Station]</span>  424-question spaced repetition app
                    for the CEH v13 (312-50) exam.
                    <a href="/ceh-cram/" style="color:#00d4ff">/ceh-cram/</a>`,

  neofetch: () =>
    `<span class="t-prompt">       .--.        </span>  <span class="t-bold">a1i3n37x@gh0st</span>
<span class="t-prompt">      |o_o |       </span>  <span class="t-dim">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
<span class="t-prompt">      |:_/ |       </span>  <span class="t-info">OS:</span>     Kali Linux / LineageOS
<span class="t-prompt">     //   \\\\ \\\\      </span>  <span class="t-info">Shell:</span>  /bin/bash
<span class="t-prompt">    (|     | )     </span>  <span class="t-info">Certs:</span>  CEH, GCC
<span class="t-prompt">   /'\\\\_   _/\\\`\\\\    </span>  <span class="t-info">Agent:</span>  Gh0st v2 (117 tools)
<span class="t-prompt">   \\\\___)=(___/    </span>  <span class="t-info">Status:</span> Augmented`,

  alien: () => ASCII_ALIEN,

  matrix: () => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__toggleMatrix?.();
    }
    return `<span class="t-prompt">Matrix rain toggled.</span>`;
  },

  symbiosis: () => {
    const q = SYMBIOSIS_QUOTES[Math.floor(Math.random() * SYMBIOSIS_QUOTES.length)];
    return `<span class="t-warn">\u2726 THE SYMBIOSIS \u2726</span>\n\n<span class="t-info">"${q}"</span>`;
  },

  konami: () =>
    `<span class="t-dim">Try the Konami code: \u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192BA</span>`,

  ls: () =>
    `<span class="t-info">dossier/</span>  <span class="t-info">projects/</span>  <span class="t-info">arsenal/</span>  <span class="t-info">contact.sh</span>  <span class="t-info">resume.pdf</span>`,

  "ls -la": () =>
    `total 42
drwxr-xr-x  6 a1i3n37x gh0st 4096 Mar  4 12:00 <span class="t-info">.</span>
drwxr-xr-x  3 a1i3n37x gh0st 4096 Mar  4 12:00 <span class="t-info">..</span>
-rw-r--r--  1 a1i3n37x gh0st  512 Mar  4 12:00 <span class="t-warn">.ghost</span>
-rw-r--r--  1 a1i3n37x gh0st   42 Mar  4 12:00 <span class="t-warn">.history</span>
-rw-r--r--  1 a1i3n37x gh0st  256 Mar  4 12:00 <span class="t-warn">.quotes</span>
drwxr-xr-x  2 a1i3n37x gh0st 4096 Mar  4 12:00 <span class="t-info">arsenal/</span>
-rwxr-x---  1 a1i3n37x gh0st 1200 Mar  4 12:00 <span class="t-prompt">contact.sh</span>
drwxr-xr-x  2 a1i3n37x gh0st 4096 Mar  4 12:00 <span class="t-err">dossier/</span>
drwxr-xr-x  2 a1i3n37x gh0st 4096 Mar  4 12:00 <span class="t-warn">projects/</span>
-rw-r--r--  1 a1i3n37x gh0st 4800 Mar  4 12:00 resume.pdf`,

  "ls -a": () =>
    `<span class="t-info">.</span>  <span class="t-info">..</span>  <span class="t-warn">.ghost</span>  <span class="t-warn">.history</span>  <span class="t-warn">.quotes</span>  <span class="t-info">arsenal/</span>  <span class="t-prompt">contact.sh</span>  <span class="t-info">dossier/</span>  <span class="t-info">projects/</span>  resume.pdf`,

  "cat .quotes": () => {
    const idx = Math.floor(Math.random() * QUOTES.length);
    return `<span class="t-warn">${QUOTES[idx]}</span>`;
  },

  "cat .history": () => `<span class="t-dim">${FAKE_HISTORY}</span>`,
  "cat .motd": () => MOTD,
  "cat .ghost": () => `<span class="t-prompt">The ghost is always watching.</span>\n<span class="t-dim">Try: cd /ghost</span>`,

  pwd: () => `/home/a1i3n37x/portfolio`,
  uname: () => `Linux gh0st 6.1.0-a1i3n37x #1 SMP x86_64 GNU/Linux`,
  "uname -a": () => `Linux gh0st 6.1.0-a1i3n37x #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`,
  date: () => `<span class="t-info">${new Date().toString()}</span>`,
  ping: () => `<span class="t-info">PING localhost (127.0.0.1): 56 data bytes</span>\n64 bytes from 127.0.0.1: time=0.1ms`,
  sudo: () => `<span class="t-err">[sudo] password for visitor:</span>\nAccess denied. Nice try.`,
  "sudo su": () => `<span class="t-err">[sudo] password for visitor:</span>\nAccess denied. Nice try.`,
  rm: () => `<span class="t-err">rm: permission denied</span>`,
  exit: () => `<span class="t-dim">Connection closed.</span>`,
  id: () => `uid=1337(visitor) gid=1337(visitor) groups=1337(visitor)`,
  hostname: () => `gh0st`,
  clear: () => "__CLEAR__",
};

// Morse code lookup
const MORSE_MAP: Record<string, string> = {
  a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.",
  h: "....", i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.",
  o: "---", p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-",
  u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--", z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  " ": "/",
};

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      type: "output",
      content:
        '<span class="t-dim">Gh0st Terminal v2.0 \u2014 a1i3n37x@gh0st</span>\n<span class="t-dim">Type</span> <span class="t-prompt">help</span> <span class="t-dim">to see available commands.</span>',
    },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [streaming, setStreaming] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  async function handleGh0st(query: string) {
    setStreaming(true);
    setHistory((prev) => [
      ...prev,
      { type: "output", content: `<span class="t-warn">Connecting to Gh0st Agent...</span>` },
    ]);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHistory((prev) => [
          ...prev,
          { type: "output", content: `<span class="t-err">[error] ${data.error || "Agent unreachable"}</span>` },
        ]);
      } else {
        const response = data.response || JSON.stringify(data);
        setHistory((prev) => [
          ...prev,
          { type: "output", content: `<span class="t-info">gh0st:</span> ${response}` },
        ]);
      }
    } catch {
      setHistory((prev) => [
        ...prev,
        { type: "output", content: `<span class="t-err">[error] Failed to reach agent</span>` },
      ]);
    } finally {
      setStreaming(false);
    }
  }

  function processCommand(cmd: string): string | null {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return "";
    if (COMMANDS[trimmed]) return COMMANDS[trimmed]();

    // gh0st command — async, returns null to signal async handling
    if (trimmed.startsWith("gh0st ")) {
      const query = cmd.trim().slice(6);
      handleGh0st(query);
      return null;
    }

    // scan command
    if (trimmed.startsWith("scan ")) {
      const target = cmd.trim().slice(5);
      return `<span class="t-warn">Starting Nmap scan on ${target}...</span>

<span class="t-info">PORT     STATE SERVICE         VERSION</span>
22/tcp   open  ssh             OpenSSH 8.9
80/tcp   open  http            nginx 1.18.0
443/tcp  open  https           nginx 1.18.0
3306/tcp open  mysql           MySQL 8.0.32
8080/tcp open  http-proxy      Apache Tomcat 9.0

<span class="t-dim">Nmap done: 1 IP address (1 host up) scanned in 12.34 seconds</span>
<span class="t-warn">[!] 5 open ports detected. Recommend further enumeration.</span>`;
    }

    // decode command
    if (trimmed.startsWith("decode ")) {
      const encoded = cmd.trim().slice(7);
      try {
        const decoded = atob(encoded);
        return `<span class="t-prompt">Decoded:</span> ${decoded}`;
      } catch {
        return `<span class="t-err">Invalid base64 input</span>`;
      }
    }

    // morse command
    if (trimmed.startsWith("morse ")) {
      const text = cmd.trim().slice(6).toLowerCase();
      const morse = text
        .split("")
        .map((c) => MORSE_MAP[c] || c)
        .join(" ");

      // Play morse beeps using Web Audio API
      if (typeof window !== "undefined" && window.AudioContext) {
        try {
          const ctx = new AudioContext();
          let t = ctx.currentTime;
          for (const char of morse) {
            if (char === ".") {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.frequency.value = 600;
              gain.gain.value = 0.1;
              osc.start(t);
              osc.stop(t + 0.1);
              t += 0.15;
            } else if (char === "-") {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.frequency.value = 600;
              gain.gain.value = 0.1;
              osc.start(t);
              osc.stop(t + 0.3);
              t += 0.35;
            } else if (char === "/") {
              t += 0.4;
            } else if (char === " ") {
              t += 0.15;
            }
          }
        } catch {
          // Web Audio not available
        }
      }

      return `<span class="t-prompt">MORSE:</span> <span class="t-info">${morse}</span>`;
    }

    // cd /ghost
    if (trimmed === "cd /ghost" || trimmed === "cd ghost") {
      if (typeof window !== "undefined") {
        setTimeout(() => { window.location.href = "/ghost"; }, 500);
      }
      return `<span class="t-prompt">Entering ghost protocol...</span>`;
    }

    // Fallback handlers
    if (trimmed.startsWith("rm "))
      return '<span class="t-err">rm: cannot remove: this portfolio is permanent</span>';
    if (trimmed.startsWith("cat "))
      return `<span class="t-err">cat: ${cmd.trim().slice(4)}: No such file or directory</span>`;
    if (trimmed.startsWith("cd "))
      return `<span class="t-dim">Access denied. Try: cd /ghost</span>`;
    if (trimmed.startsWith("ping "))
      return COMMANDS.ping();
    if (trimmed.startsWith("ssh "))
      return `<span class="t-err">Connection refused.</span> But you can email me instead.`;
    if (trimmed.startsWith("nmap "))
      return `<span class="t-dim">Use</span> <span class="t-prompt">scan &lt;target&gt;</span> <span class="t-dim">instead.</span>`;

    return `<span class="t-err">Command not found:</span> ${cmd.trim()}\nType <span class="t-prompt">help</span> for available commands.`;
  }

  function handleSubmit() {
    if (!input.trim() || streaming) return;
    const cmd = input;
    setCmdHistory((prev) => [cmd, ...prev]);
    setHistoryIdx(-1);

    const result = processCommand(cmd);

    if (result === "__CLEAR__") {
      setHistory([]);
    } else if (result === null) {
      // Async command (gh0st) — just log the input
      setHistory((prev) => [...prev, { type: "input", content: cmd }]);
    } else {
      setHistory((prev) => [
        ...prev,
        { type: "input", content: cmd },
        ...(result ? [{ type: "output" as const, content: result }] : []),
      ]);
    }
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIdx < cmdHistory.length - 1) {
        const newIdx = historyIdx + 1;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  }

  const promptHtml = `<span class="t-prompt">a1i3n37x</span><span class="t-dim">@</span><span class="t-info">gh0st</span><span class="t-dim">:~$</span> `;

  return (
    <div className="bg-black border border-[var(--color-border)] rounded-lg overflow-hidden max-w-[900px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] h-full flex flex-col">
      {/* Title bar */}
      <div className="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[var(--color-border)] shrink-0">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] ml-3">
          a1i3n37x@gh0st ~
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="terminal-body p-4 flex-1 overflow-y-auto font-[family-name:var(--font-fira)] text-[13px] leading-[1.7]"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {entry.type === "input" ? (
              <span dangerouslySetInnerHTML={{ __html: promptHtml + entry.content }} />
            ) : (
              <span dangerouslySetInnerHTML={{ __html: entry.content }} />
            )}
          </div>
        ))}

        {streaming && (
          <div className="text-[var(--color-amber)] animate-[blink_1s_step-end_infinite]">thinking...</div>
        )}

        {/* Input line */}
        <div className="flex items-center mt-1">
          <span className="mr-2 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: promptHtml }} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={streaming}
            className="flex-1 bg-transparent border-none outline-none font-[family-name:var(--font-fira)] text-[13px] text-[var(--color-txt)] caret-[var(--color-green)] disabled:opacity-50"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
