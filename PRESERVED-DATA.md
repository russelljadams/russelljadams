# PRESERVED-DATA.md — russelljadams Portfolio Site
# Everything that must survive a complete gut.
# Generated: 2026-03-04

---

## 1. Contact Information

| Field    | Value |
|----------|-------|
| Name     | Russell J. Adams |
| Location | Grand Junction, CO |
| Phone    | (970) 260-2840 |
| Email    | radams.starpointlogistics@gmail.com |
| Website  | russelljadams.com |
| GitHub   | russelljadams |

---

## 2. Resume Summary

Security-focused technician with 10+ years of network and telecom experience, backed by military intelligence analysis. Holds CEH and Google Cybersecurity Professional certifications. Background spans network diagnostics, infrastructure troubleshooting, and operational security. Building AI-augmented security infrastructure. Seeking to apply analytical skills and technical foundation in a security analyst or SOC analyst role.

---

## 3. Resume Tagline

Security Operator -- Veteran -- Augmented Human

---

## 4. Core Competencies

- Network Troubleshooting & Diagnostics
- TCP/IP, DNS, DHCP, Firewalls, VPNs
- Linux, Python, SQL, Bash
- OPSEC, Documentation & Reporting
- Security Monitoring & Incident Response
- SIEM Concepts & Log Analysis
- Vulnerability Assessment
- Security Frameworks (NIST, CIA Triad)
- MCP Protocol & AI Agent Systems

---

## 5. Professional Experience

### Operations Intelligence Analyst
**United States Air Force** | 2006 -- 2010
- Analyzed technical and operational intelligence data to support mission-critical decisions under strict deadlines.
- Applied operational security (OPSEC) protocols and maintained documentation discipline in high-tempo environments.
- Processed and correlated multi-source data to identify patterns, threats, and actionable intelligence.

### Field Technician II
**Spectrum (Charter Communications)** | 2017 -- 2021
- Diagnosed and resolved network connectivity issues across residential and business environments.
- Performed signal diagnostics and troubleshooting to DOCSIS standards; configured routers, gateways, and access points.
- Built and maintained structured cabling infrastructure (Cat5e/Cat6, coax, fiber) with rack and cable management.

### Technical Support
**Telecom Outsourcing & Call Centers** | 2012 -- 2017
- Troubleshot network connectivity, modem/router issues, and Wi-Fi configuration for telecom customers.
- Documented cases, escalated security-relevant issues, and managed high-volume incident queues.

### Delivery Associate
**Amazon Logistics** | 2021 -- Present
- Recognized for reliability and performance (Driver of the Month); maintained accuracy across 180-200+ daily stops.

---

## 6. Education & Certifications

| Code | Name | Detail |
|------|------|--------|
| GCC  | Google Cybersecurity Professional Certificate | Google (2025) |
| CEH  | Certified Ethical Hacker | EC-Council (2025) |
| KU   | Mathematics, Algorithms, Network Security, Cryptography | University of Kansas, 2010 -- 2012 |
| USAF | Intelligence Operations Specialist Course | United States Air Force, 2006 -- 2010 |

---

## 7. Services / Capabilities

### Page Header Copy
- Title: "I fix things and break into things."
- Subtitle: "Tech repair and offensive security. Air Force intelligence background, CEH certified, 10+ years in networks and telecom. I know how systems work -- and how they fail."
- Secondary: "Broken laptop? I'll fix it. Want to know if your network is actually secure? I'll find out."
- Metadata description: "Tech repair, security testing, and offensive security services. Veteran-owned, CEH-certified."

### Service Cards

**Tech Repair** (color: green)
Malware removal, hardware diagnostics, data recovery, performance issues. I find what's broken and fix it -- computers, networks, whatever.

**Network Troubleshooting** (color: amber)
WiFi dead zones, slow connections, device conflicts, ISP issues. 4 years as a Spectrum field tech -- I've seen it all.

**Penetration Testing** (color: red)
Find out where you're vulnerable before someone else does. Network, web app, and wireless assessments. CEH-certified.

**Security Audits** (color: cyan)
Full security posture review -- network hardening, access control, policy gaps. Clear report with prioritized fixes, not a sales pitch for more services.

---

## 8. Recon Report Stats

| Value | Label |
|-------|-------|
| 16+   | Years Experience |
| 4     | Yrs Field Tech |
| 3     | Certifications |

### Recon Report "Port Scan" Display Data

```
PORT     STATE   SERVICE
22/tcp   open    Linux / Kali / Bash
80/tcp   open    TCP/IP, DNS, DHCP, Routing, VPN
443/tcp  open    Wireshark, Nmap, Burp Suite
1337/tcp open    Vuln Assessment, OPSEC, Pen Testing
3389/tcp open    Hardware Diag, Cabling, Signal Testing
```

Additional recon text:
- YEARS_ACTIVE: 16+
- CLEARANCE: USAF Intelligence (2006-2010)
- FIELD_OPS: 4 years network field tech (Spectrum)
- CERT_STACK: CEH | Google Cybersecurity | KU

---

## 9. External IDs and Embed URLs

| Item | Value |
|------|-------|
| Credly Badge ID | `e4440991-5903-458d-b184-3b72584ad77b` |
| Credly Embed Script | `https://cdn.credly.com/assets/utilities/embed.js` |
| TryHackMe Badge iframe | `https://tryhackme.com/api/v2/badges/public-profile?userPublicId=1602223` |
| TryHackMe Public ID | `1602223` |
| Resume PDF path | `/Russell_J_Adams_Resume.pdf` (in public/) |

---

## 10. API Routes

### /api/contact (route.ts)
- **POST** (public): Accepts `{ name, email, message }`, stores to Vercel KV
- **GET** (authenticated): Returns all submissions (admin dashboard)
- KV key: `contact:submissions`, max 100 entries, newest first (lpush + ltrim)
- Message max length: 2000 chars
- Uses `@vercel/kv` and `@/lib/auth` (getUser)

### /api/agent (route.ts)
- **POST** (admin only): Proxies `{ text }` to Gh0st Agent v2 at `${AGENT_BASE_URL}/voice`
- Env var: `AGENT_BASE_URL` (points to `http://100.112.110.105:8080` in production)
- 8-second timeout with AbortController
- Auth: requires `getUser()` with `role === "admin"`

---

## 11. Key Components (preserve as-is)

### ContactForm.tsx
- Client component, 3 fields: name, email, message (textarea, maxLength 2000)
- States: idle, sending, sent, error
- POSTs to `/api/contact`
- On success: shows confirmation with "Send another" button

### AgentChat.tsx
- Client component, terminal-style chat UI
- Messages: user (green), agent/gh0st (cyan), error (red)
- POSTs to `/api/agent` with `{ text }`
- "thinking..." indicator in amber
- Prompt shows `gh0st@agent:~$` in title bar, `$` in input
- Placeholder: "Ask Gh0st..."
- 400px height, scrollable message area

### CredlyBadge.tsx
- Props: `badgeId` (required), `width` (default 150), `height` (default 270)
- Dynamically creates Credly embed div + loads script
- Cleanup on unmount

---

## 12. Environment Variables Required

| Variable | Purpose |
|----------|---------|
| `AGENT_BASE_URL` | Gh0st Agent v2 endpoint (e.g., `http://100.112.110.105:8080`) |
| Vercel KV vars | Required by `@vercel/kv` (auto-set when KV is linked in Vercel) |
| Auth-related vars | Whatever `@/lib/auth` needs (check `src/lib/auth.ts`) |

---

## 13. Design System Reference

### Color Variables Used
- `--color-bg-deep` (page background)
- `--color-bg-card` / `--color-bg-card-hover`
- `--color-border`
- `--color-txt` / `--color-txt-sec` / `--color-txt-dim`
- `--color-green` / `--color-green-dim`
- `--color-amber`
- `--color-red`
- `--color-cyan`

### Font Variables Used
- `--font-fira` (monospace, UI labels, terminal text)
- `--font-chakra` (headings, bold display)
- `--font-outfit` (body text, descriptions)

### Accent Color Mapping for Experience/Education
- USAF: cyan
- Spectrum: amber
- Telecom Support: red
- Amazon: green
- Google Cert: green
- CEH: green
- KU: amber
- USAF Education: cyan
