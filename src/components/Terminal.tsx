"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// FLAG #4: Hidden terminal command `cat .secret` reveals base64
// Decodes to: FLAG{terminal_treasure_hunter}
const SECRET_B64 = "RkxBR3t0ZXJtaW5hbF90cmVhc3VyZV9odW50ZXJ9";

// FLAG #5: XOR encrypted flag hidden in source
// Users must find _ENCRYPTED_FLAG in source, identify XOR key 0x52
// from data-sk attribute on #hero, then decrypt
// Decrypts to: FLAG{reverse_engineer_this}
const _ENCRYPTED_FLAG = [
  0x14, 0x1e, 0x13, 0x15, 0x29, 0x20, 0x37, 0x24, 0x37, 0x20, 0x21, 0x37,
  0x0d, 0x37, 0x3c, 0x35, 0x3b, 0x3c, 0x37, 0x37, 0x20, 0x0d, 0x26, 0x3a,
  0x3b, 0x21, 0x2f,
];
// Key derivation hint is in hero section data attribute

type HistoryEntry = {
  type: "input" | "output";
  content: string;
};

const COMMANDS: Record<string, () => string> = {
  help: () =>
    `<span class="t-bold">Available commands:</span>

  <span class="t-prompt">whoami</span>      <span class="t-dim">-</span> About me
  <span class="t-prompt">skills</span>      <span class="t-dim">-</span> Technical skills
  <span class="t-prompt">experience</span>  <span class="t-dim">-</span> Work history
  <span class="t-prompt">certs</span>       <span class="t-dim">-</span> Certifications
  <span class="t-prompt">education</span>   <span class="t-dim">-</span> Education
  <span class="t-prompt">contact</span>     <span class="t-dim">-</span> Contact info
  <span class="t-prompt">clear</span>       <span class="t-dim">-</span> Clear terminal
  <span class="t-prompt">neofetch</span>    <span class="t-dim">-</span> System info`,

  whoami: () =>
    `<span class="t-bold">Russell J. Adams</span>
<span class="t-dim">──────────────────────────────</span>
Grand Junction, CO
USAF veteran, telecom field tech, CEH, Google Cybersecurity.
Looking for work in cybersecurity or IT.`,

  skills: () =>
    `<span class="t-warn">[Security]</span>    Network Security, OPSEC, Vuln Assessment,
              Cryptography, Threat Analysis

<span class="t-warn">[Network]</span>     TCP/IP, Wi-Fi, DOCSIS, DNS/DHCP,
              VPN, Firewalls, Routing

<span class="t-warn">[Physical]</span>    Low-Voltage Cabling (Cat6/Coax/Fiber),
              Rack Building, Cable Management,
              Signal Diagnostics, Device Mounting

<span class="t-warn">[Tools]</span>       Linux/Kali, Wireshark, Nmap, Burp Suite,
              Python, Bash, VirtualBox/VMware`,

  experience: () =>
    `<span class="t-prompt">[2024-NOW]</span>  Amazon Logistics - Delivery Associate

<span class="t-warn">[2017-2021]</span> Spectrum - Field Technician II
            Internet/TV/Voice install and service
            Coax & Cat6 termination, rack building

<span class="t-err">[2012-2017]</span> Telecom - Technical Support
            Modem/router/Wi-Fi troubleshooting

<span class="t-info">[2006-2010]</span> USAF - Operations Intelligence Analyst`,

  certs: () =>
    `<span class="t-prompt">CEH</span>        Certified Ethical Hacker - EC-Council
<span class="t-prompt">GCC</span>        Google Cybersecurity Certificate
<span class="t-prompt">KU</span>         Math, Algorithms, Network Security, Crypto
<span class="t-prompt">USAF</span>       Intelligence Operations Specialist`,

  education: () =>
    `<span class="t-info">University of Kansas</span> (2010-2012)
  Mathematics, Algorithms, Network Security, Cryptography

<span class="t-info">USAF</span> (2006-2010)
  Intelligence Operations Specialist Course`,

  contact: () =>
    `<span class="t-info">Location:</span>  Grand Junction, CO
<span class="t-info">Email:</span>     radams.starpointlogistics@gmail.com`,

  neofetch: () =>
    `<span class="t-prompt">       .--.        </span>  <span class="t-bold">radams@portfolio</span>
<span class="t-prompt">      |o_o |       </span>  <span class="t-dim">──────────────────</span>
<span class="t-prompt">      |:_/ |       </span>  <span class="t-info">OS:</span>     Kali Linux
<span class="t-prompt">     //   \\ \\      </span>  <span class="t-info">Shell:</span>  /bin/bash
<span class="t-prompt">    (|     | )     </span>  <span class="t-info">Certs:</span>  CEH, GCC
<span class="t-prompt">   /'\\_   _/\`\\    </span>  <span class="t-info">CTFs:</span>   TryHackMe, HTB
<span class="t-prompt">   \\___)=(___/    </span>  <span class="t-info">Status:</span> Available`,

  // Hidden commands (not in help)
  ls: () =>
    `<span class="t-info">about.txt</span>  <span class="t-info">experience/</span>  <span class="t-info">skills.dat</span>  <span class="t-info">certs/</span>`,

  "ls -la": () =>
    `total 42
drwxr-xr-x  6 radams radams 4096 Feb 19 12:00 <span class="t-info">.</span>
drwxr-xr-x  3 radams radams 4096 Feb 19 12:00 <span class="t-info">..</span>
-rw-------  1 radams radams   64 Feb 19 12:00 <span class="t-warn">.secret</span>
-rw-r--r--  1 radams radams  220 Feb 19 12:00 about.txt
drwxr-xr-x  2 radams radams 4096 Feb 19 12:00 <span class="t-info">certs/</span>
drwxr-xr-x  2 radams radams 4096 Feb 19 12:00 <span class="t-info">experience/</span>
-rw-r--r--  1 radams radams  512 Feb 19 12:00 skills.dat`,

  "ls -a": () =>
    `<span class="t-info">.</span>  <span class="t-info">..</span>  <span class="t-warn">.secret</span>  <span class="t-info">about.txt</span>  <span class="t-info">experience/</span>  <span class="t-info">skills.dat</span>  <span class="t-info">certs/</span>`,

  "cat .secret": () =>
    `<span class="t-dim">// Decode this:</span>

<span class="t-warn">${SECRET_B64}</span>`,

  "cat about.txt": () => COMMANDS.whoami(),

  pwd: () => `/home/radams/portfolio`,

  uname: () => `Linux portfolio 6.1.0-radams #1 SMP x86_64 GNU/Linux`,

  "uname -a": () =>
    `Linux portfolio 6.1.0-radams #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`,

  date: () => `<span class="t-info">${new Date().toString()}</span>`,

  ping: () =>
    `<span class="t-info">PING localhost (127.0.0.1): 56 data bytes</span>
64 bytes from 127.0.0.1: time=0.1ms`,

  sudo: () =>
    `<span class="t-err">[sudo] password for radams:</span>
Access denied.`,

  "sudo su": () =>
    `<span class="t-err">[sudo] password for radams:</span>
Access denied.`,

  hack: () =>
    `<span class="t-dim">There are hidden things on this site if you look.</span>`,

  "cat flag.txt": () =>
    `<span class="t-err">No such file or directory</span>`,

  rm: () =>
    `<span class="t-err">rm: permission denied</span>`,

  exit: () =>
    `<span class="t-dim">Connection closed.</span>`,

  id: () => `uid=1000(radams) gid=1000(radams) groups=1000(radams),27(sudo)`,

  hostname: () => `portfolio`,

  clear: () => "__CLEAR__",
};

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      type: "output",
      content:
        '<span class="t-dim">Welcome to Russell\'s portfolio terminal.</span>\n<span class="t-dim">Type</span> <span class="t-prompt">help</span> <span class="t-dim">to see available commands.</span>',
    },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
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

  function processCommand(cmd: string): string {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return "";
    if (COMMANDS[trimmed]) return COMMANDS[trimmed]();
    // Check starts-with for partial matches
    if (trimmed.startsWith("rm "))
      return '<span class="t-err">rm: cannot remove: this portfolio is permanent</span>';
    if (trimmed.startsWith("cat "))
      return `<span class="t-err">cat: ${cmd.trim().slice(4)}: No such file or directory</span>`;
    if (trimmed.startsWith("cd "))
      return `<span class="t-dim">Nice try, but there's nowhere to go.</span>`;
    if (trimmed.startsWith("ping "))
      return COMMANDS.ping();
    if (trimmed.startsWith("ssh "))
      return `<span class="t-err">Connection refused.</span> But you can email me instead.`;
    if (trimmed.startsWith("nmap "))
      return `<span class="t-warn">Scanning...</span>\n<span class="t-info">PORT     STATE SERVICE</span>\n443/tcp  open  https\n<span class="t-dim">Nmap done: 1 IP address (1 host up)</span>`;
    return `<span class="t-err">Command not found:</span> ${cmd.trim()}\nType <span class="t-prompt">help</span> for available commands.`;
  }

  function handleSubmit() {
    if (!input.trim()) return;
    const cmd = input;
    setCmdHistory((prev) => [cmd, ...prev]);
    setHistoryIdx(-1);

    const result = processCommand(cmd);

    if (result === "__CLEAR__") {
      setHistory([]);
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

  const promptHtml = `<span class="t-prompt">radams</span><span class="t-dim">@</span><span class="t-info">portfolio</span><span class="t-dim">:~$</span> `;

  return (
    <div className="bg-black border border-[var(--color-border)] rounded-lg overflow-hidden max-w-[900px] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* Title bar */}
      <div className="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[var(--color-border)]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] ml-3">
          radams@portfolio ~
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="terminal-body p-5 h-[420px] overflow-y-auto font-[family-name:var(--font-fira)] text-[13px] leading-[1.7]"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {entry.type === "input" ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: promptHtml + entry.content,
                }}
              />
            ) : (
              <span dangerouslySetInnerHTML={{ __html: entry.content }} />
            )}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center mt-1">
          <span
            className="mr-2 whitespace-nowrap"
            dangerouslySetInnerHTML={{ __html: promptHtml }}
          />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none font-[family-name:var(--font-fira)] text-[13px] text-[var(--color-txt)] caret-[var(--color-green)]"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
