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

  <span class="t-prompt">whoami</span>      <span class="t-dim">-</span> Quick introduction
  <span class="t-prompt">skills</span>      <span class="t-dim">-</span> Technical skills
  <span class="t-prompt">experience</span>  <span class="t-dim">-</span> Career history
  <span class="t-prompt">certs</span>       <span class="t-dim">-</span> Certifications
  <span class="t-prompt">lab</span>         <span class="t-dim">-</span> Home lab details
  <span class="t-prompt">education</span>   <span class="t-dim">-</span> Education background
  <span class="t-prompt">contact</span>     <span class="t-dim">-</span> Get in touch
  <span class="t-prompt">amazon</span>      <span class="t-dim">-</span> Why Amazon matters
  <span class="t-prompt">clear</span>       <span class="t-dim">-</span> Clear terminal
  <span class="t-prompt">neofetch</span>    <span class="t-dim">-</span> System info`,

  whoami: () =>
    `<span class="t-bold">Russell J. Adams</span>
<span class="t-dim">──────────────────────────────</span>
Air Force veteran, field technician, and aspiring cybersecurity
professional based in Grand Junction, CO.

I've analyzed intelligence under pressure, run cable through
crawlspaces, and delivered 200 packages a day in the Colorado
heat. Now I'm channeling that same intensity into security.

<span class="t-info">Currently pursuing:</span> CEH + Google Cybersecurity Certificate
<span class="t-info">Home lab:</span> 15+ VMs for networking and security configs
<span class="t-info">CTF platforms:</span> TryHackMe, HackTheBox`,

  skills: () =>
    `<span class="t-bold">Technical Skills</span>
<span class="t-dim">──────────────────────────────</span>
<span class="t-warn">[Security]</span>    Network Security, Vuln Assessment, OPSEC,
              Threat Analysis, Cryptography, CTFs

<span class="t-warn">[Network]</span>     TCP/IP, Wi-Fi, DOCSIS, DNS/DHCP,
              VPN, Firewalls, Routing

<span class="t-warn">[Physical]</span>    Low-Voltage Cabling (Cat6/Coax/Fiber),
              Rack Building, Cable Management,
              Signal Diagnostics, Device Mounting

<span class="t-warn">[Tools]</span>       Linux/Kali, Wireshark, Nmap, Burp Suite,
              Python, Bash, VirtualBox/VMware`,

  experience: () =>
    `<span class="t-bold">Career Timeline</span>
<span class="t-dim">──────────────────────────────</span>
<span class="t-prompt">[2021-NOW]</span>  Amazon Logistics - Delivery Associate
            180-200+ stops/day | Driver of the Month
            Longest tenured driver at station

<span class="t-warn">[2017-2021]</span> Spectrum - Field Technician II
            Installed Internet/TV/Voice services
            Coax & Cat6 termination, rack building

<span class="t-err">[2012-2017]</span> Telecom - Technical Support
            Modem/router/Wi-Fi troubleshooting

<span class="t-info">[2006-2010]</span> USAF - Operations Intelligence Analyst
            Air Force Commendation Medal
            OPSEC & operational data analysis`,

  certs: () =>
    `<span class="t-bold">Certifications & Training</span>
<span class="t-dim">──────────────────────────────</span>
<span class="t-warn">[IN PROGRESS]</span> Certified Ethical Hacker (CEH) - EC-Council
<span class="t-warn">[IN PROGRESS]</span> Google Cybersecurity Certificate

<span class="t-prompt">[COMPLETED]</span>   Univ. of Kansas - Math, Algorithms,
              Network Security, Cryptography (2010-12)
<span class="t-prompt">[COMPLETED]</span>   USAF Intelligence Ops Specialist (2006-10)`,

  lab: () =>
    `<span class="t-bold">Home Lab Environment</span>
<span class="t-dim">──────────────────────────────</span>
<span class="t-info">15+ virtual machines</span> configured for:

  <span class="t-prompt">></span> Network security testing and configuration
  <span class="t-prompt">></span> Vulnerability scanning and exploitation practice
  <span class="t-prompt">></span> Active Directory environments
  <span class="t-prompt">></span> Firewall and routing simulations
  <span class="t-prompt">></span> Malware analysis in sandboxed environments

<span class="t-info">Platforms:</span> TryHackMe, HackTheBox
<span class="t-info">Primary OS:</span> Kali Linux

This isn't a checkbox lab. I use it to learn how attacks
work so I can defend against them.`,

  education: () =>
    `<span class="t-bold">Education</span>
<span class="t-dim">──────────────────────────────</span>
<span class="t-info">University of Kansas</span> (2010-2012)
  Coursework in Mathematics, Algorithms,
  Network Security, and Cryptography

<span class="t-info">USAF Training</span> (2006-2010)
  Intelligence Operations Specialist Course`,

  contact: () =>
    `<span class="t-bold">Contact</span>
<span class="t-dim">──────────────────────────────</span>
<span class="t-info">Location:</span>  Grand Junction, CO
<span class="t-info">Email:</span>     radams.starpointlogistics@gmail.com
<span class="t-info">Status:</span>    Open to relocation for the right role

Interested in: SOC Analyst, Security Operations,
Network Security, IT/Field Technician roles`,

  amazon: () =>
    `<span class="t-bold">Why Amazon Matters</span>
<span class="t-dim">──────────────────────────────</span>
People overlook delivery work. They shouldn't.

<span class="t-info">180-200+ stops a day.</span> Every day. In Colorado weather.
Longest tenured driver at my station. Driver of the Month.

What this proves:
  <span class="t-prompt">></span> I show up. Every single day.
  <span class="t-prompt">></span> I perform under pressure and time constraints.
  <span class="t-prompt">></span> I solve logistics problems on the fly.
  <span class="t-prompt">></span> I maintain equipment and follow safety protocols.
  <span class="t-prompt">></span> I do the hardest version of the job, consistently.

The same discipline that makes me reliable at 200 stops
makes me reliable in a SOC at 2 AM.`,

  neofetch: () =>
    `<span class="t-prompt">       .--.        </span>  <span class="t-bold">radams@portfolio</span>
<span class="t-prompt">      |o_o |       </span>  <span class="t-dim">──────────────────</span>
<span class="t-prompt">      |:_/ |       </span>  <span class="t-info">OS:</span>     Kali Linux
<span class="t-prompt">     //   \\ \\      </span>  <span class="t-info">Role:</span>   Security Enthusiast
<span class="t-prompt">    (|     | )     </span>  <span class="t-info">Shell:</span>  /bin/bash
<span class="t-prompt">   /'\\_   _/\`\\    </span>  <span class="t-info">Uptime:</span> 15+ years in tech
<span class="t-prompt">   \\___)=(___/    </span>  <span class="t-info">VMs:</span>    15+
                   <span class="t-info">CTFs:</span>   TryHackMe, HTB
                   <span class="t-info">Certs:</span>  CEH (wip), GCC (wip)
                   <span class="t-info">Medal:</span>  AF Commendation`,

  // Hidden commands (not in help)
  ls: () =>
    `<span class="t-info">about.txt</span>  <span class="t-info">experience/</span>  <span class="t-info">skills.dat</span>  <span class="t-info">lab/</span>  <span class="t-info">certs/</span>`,

  "ls -la": () =>
    `total 42
drwxr-xr-x  6 radams radams 4096 Feb 19 12:00 <span class="t-info">.</span>
drwxr-xr-x  3 radams radams 4096 Feb 19 12:00 <span class="t-info">..</span>
-rw-------  1 radams radams   64 Feb 19 12:00 <span class="t-warn">.secret</span>
-rw-r--r--  1 radams radams  220 Feb 19 12:00 about.txt
drwxr-xr-x  2 radams radams 4096 Feb 19 12:00 <span class="t-info">certs/</span>
drwxr-xr-x  2 radams radams 4096 Feb 19 12:00 <span class="t-info">experience/</span>
drwxr-xr-x  2 radams radams 4096 Feb 19 12:00 <span class="t-info">lab/</span>
-rw-r--r--  1 radams radams  512 Feb 19 12:00 skills.dat`,

  "ls -a": () =>
    `<span class="t-info">.</span>  <span class="t-info">..</span>  <span class="t-warn">.secret</span>  <span class="t-info">about.txt</span>  <span class="t-info">experience/</span>  <span class="t-info">skills.dat</span>  <span class="t-info">lab/</span>  <span class="t-info">certs/</span>`,

  "cat .secret": () =>
    `<span class="t-dim">// Interesting. You found the hidden file.</span>
<span class="t-dim">// Decode this to claim your flag:</span>

<span class="t-warn">${SECRET_B64}</span>`,

  "cat about.txt": () => COMMANDS.whoami(),

  pwd: () => `/home/radams/portfolio`,

  uname: () => `Linux portfolio 6.1.0-radams #1 SMP x86_64 GNU/Linux`,

  "uname -a": () =>
    `Linux portfolio 6.1.0-radams #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`,

  date: () => `<span class="t-info">${new Date().toString()}</span>`,

  ping: () =>
    `<span class="t-info">PING hiring-manager (10.0.0.1): 56 data bytes</span>
64 bytes from 10.0.0.1: time=0.1ms <span class="t-prompt">&lt;-- I respond fast</span>`,

  sudo: () =>
    `<span class="t-err">[sudo] password for radams:</span>
Nice try. OPSEC says no.`,

  "sudo su": () =>
    `<span class="t-err">[sudo] password for radams:</span>
Nice try. OPSEC says no.`,

  hack: () =>
    `<span class="t-warn">[!] Unauthorized access detected...</span>
<span class="t-warn">[!] Tracing IP address...</span>
<span class="t-warn">[!] Just kidding.</span> But there are hidden flags on this site.`,

  "cat flag.txt": () =>
    `<span class="t-err">Permission denied.</span> You'll have to look harder than that.`,

  rm: () =>
    `<span class="t-err">rm: cannot remove: this portfolio is permanent</span>`,

  exit: () =>
    `<span class="t-dim">Logout? No. You should hire me first.</span>`,

  id: () => `uid=1000(radams) gid=1000(radams) groups=1000(radams),27(sudo),44(video)`,

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
