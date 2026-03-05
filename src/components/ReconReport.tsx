import CredlyBadge from "./CredlyBadge";

const STATS = [
  { value: "16+", label: "Years Experience" },
  { value: "4", label: "Yrs Field Tech" },
  { value: "3", label: "Certifications" },
];

export default function ReconReport() {
  return (
    <div>
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-green)]">
              {s.value}
            </div>
            <div className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-txt-sec)] uppercase tracking-wide mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recon scan output */}
      <div className="recon-report">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-green-dim)] bg-[rgba(0,255,170,0.03)]">
          <span className="w-3 h-3 rounded-full bg-[var(--color-red)]" />
          <span className="w-3 h-3 rounded-full bg-[var(--color-amber)]" />
          <span className="w-3 h-3 rounded-full bg-[var(--color-green)]" />
          <span className="font-[family-name:var(--font-fira)] text-[11px] text-[var(--color-txt-dim)] ml-2">
            recon-scan — radams
          </span>
        </div>

        <div className="p-5 md:p-7 font-[family-name:var(--font-fira)] text-[13px] leading-relaxed overflow-x-auto">
          <div className="t-prompt">$ recon-scan --target radams --verbose</div>
          <br />
          <div className="t-dim">{`[*] Scanning target profile...`}</div>
          <div className="t-dim">{`[*] Enumeration complete.`}</div>
          <br />
          <div>
            <span className="t-info">YEARS_ACTIVE:</span>
            <span className="text-[var(--color-txt)]">{`  16+`}</span>
          </div>
          <div>
            <span className="t-info">CLEARANCE:</span>
            <span className="text-[var(--color-txt)]">{`     USAF Intelligence (2006-2010)`}</span>
          </div>
          <div>
            <span className="t-info">FIELD_OPS:</span>
            <span className="text-[var(--color-txt)]">{`      4 years network field tech (Spectrum)`}</span>
          </div>
          <div>
            <span className="t-info">CERT_STACK:</span>
            <span className="text-[var(--color-txt)]">{`     CEH | Google Cybersecurity | KU`}</span>
          </div>
          <br />
          <div className="t-bold">PORT     STATE   SERVICE</div>
          <div>
            <span className="t-prompt">22/tcp</span>
            <span className="text-[var(--color-txt)]">   open    </span>
            <span className="t-dim">Linux / Kali / Bash</span>
          </div>
          <div>
            <span className="t-prompt">80/tcp</span>
            <span className="text-[var(--color-txt)]">   open    </span>
            <span className="t-dim">TCP/IP, DNS, DHCP, Routing, VPN</span>
          </div>
          <div>
            <span className="t-prompt">443/tcp</span>
            <span className="text-[var(--color-txt)]">  open    </span>
            <span className="t-dim">Wireshark, Nmap, Burp Suite</span>
          </div>
          <div>
            <span className="t-prompt">1337/tcp</span>
            <span className="text-[var(--color-txt)]"> open    </span>
            <span className="t-dim">Vuln Assessment, OPSEC, Pen Testing</span>
          </div>
          <div>
            <span className="t-prompt">3389/tcp</span>
            <span className="text-[var(--color-txt)]"> open    </span>
            <span className="t-dim">Hardware Diag, Cabling, Signal Testing</span>
          </div>
          <br />
          <div className="t-warn">{`[!] Target appears well-armed. Proceed with caution.`}</div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-6 mt-8">
        <iframe
          src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=1602223"
          style={{ border: "none" }}
          className="max-w-full"
        />
        <CredlyBadge badgeId="e4440991-5903-458d-b184-3b72584ad77b" />
      </div>
    </div>
  );
}
