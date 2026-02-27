from fpdf import FPDF

FONT_DIR = "/usr/share/fonts/truetype/dejavu/"

class ResumePDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_font("DejaVu", "", FONT_DIR + "DejaVuSans.ttf")
        self.add_font("DejaVu", "B", FONT_DIR + "DejaVuSans-Bold.ttf")

    def section_header(self, text):
        self.set_font("DejaVu", "B", 12)
        self.cell(0, 7, text, new_x="LMARGIN", new_y="NEXT")
        y = self.get_y()
        self.set_draw_color(0, 0, 0)
        self.set_line_width(0.4)
        self.line(self.l_margin, y, self.w - self.r_margin, y)
        self.ln(3)

    def job_header(self, text):
        self.set_font("DejaVu", "B", 10)
        self.cell(0, 5.5, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def bullet(self, text):
        self.set_font("DejaVu", "", 9.5)
        self.cell(4, 5, "\u2022", new_x="END")
        self.multi_cell(0, 5, " " + text, new_x="LMARGIN", new_y="NEXT")
        self.ln(0.5)

    def edu_bullet_bold(self, bold_part, rest):
        self.set_font("DejaVu", "", 9.5)
        self.cell(4, 5, "\u2022", new_x="END")
        self.set_font("DejaVu", "B", 9.5)
        self.write(5, " " + bold_part)
        self.set_font("DejaVu", "", 9.5)
        self.write(5, rest)
        self.ln(6)

    def edu_bullet(self, text):
        self.set_font("DejaVu", "", 9.5)
        self.cell(4, 5, "\u2022", new_x="END")
        self.multi_cell(0, 5, " " + text, new_x="LMARGIN", new_y="NEXT")
        self.ln(0.5)


pdf = ResumePDF()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()
pdf.set_left_margin(18)
pdf.set_right_margin(18)
pdf.set_x(18)

# Name
pdf.set_font("DejaVu", "B", 22)
pdf.cell(0, 10, "Russell J. Adams", align="C", new_x="LMARGIN", new_y="NEXT")

# Tagline
pdf.set_font("DejaVu", "", 10.5)
pdf.set_text_color(80, 80, 80)
pdf.cell(0, 6, "Security-Focused Technician  |  Network Operations  |  U.S. Air Force Veteran", align="C", new_x="LMARGIN", new_y="NEXT")

# Contact
pdf.set_font("DejaVu", "", 9)
pdf.set_text_color(60, 60, 60)
pdf.cell(0, 6, "Grand Junction, CO  |  (970) 260-2840  |  radams.starpointlogistics@gmail.com", align="C", new_x="LMARGIN", new_y="NEXT")
pdf.set_text_color(0, 0, 0)
pdf.ln(3)

# Professional Summary
pdf.section_header("Professional Summary")
pdf.set_font("DejaVu", "", 9.5)
pdf.multi_cell(0, 5,
    "Security-focused technician with 10+ years of network and telecom experience, backed by military "
    "intelligence analysis. Holds CEH and Google Cybersecurity Professional certifications. Background "
    "spans network diagnostics, infrastructure troubleshooting, and operational security. Seeking to "
    "apply analytical skills and technical foundation in a security analyst or SOC analyst role.",
    new_x="LMARGIN", new_y="NEXT")
pdf.ln(1)

# Core Competencies
pdf.section_header("Core Competencies")
pdf.set_font("DejaVu", "", 9.5)
comps_left = [
    "Network Troubleshooting & Diagnostics",
    "TCP/IP, DNS, DHCP, Firewalls, VPNs",
    "Linux, Python, SQL, Bash",
    "OPSEC, Documentation & Reporting",
]
comps_right = [
    "Security Monitoring & Incident Response",
    "SIEM Concepts & Log Analysis",
    "Vulnerability Assessment",
    "Security Frameworks (NIST, CIA Triad)",
]
col_width = (pdf.w - pdf.l_margin - pdf.r_margin) / 2
for left, right in zip(comps_left, comps_right):
    pdf.set_font("DejaVu", "", 9.5)
    pdf.cell(4, 5, "\u2022", new_x="END")
    pdf.cell(col_width - 4, 5, " " + left, new_x="END")
    pdf.cell(4, 5, "\u2022", new_x="END")
    pdf.cell(col_width - 4, 5, " " + right, new_x="LMARGIN", new_y="NEXT")
pdf.ln(1)

# Professional Experience
pdf.section_header("Professional Experience")

pdf.job_header("United States Air Force \u2014 Operations Intelligence Analyst (2006 \u2013 2010)")
pdf.bullet("Analyzed technical and operational intelligence data to support mission-critical decisions under strict deadlines.")
pdf.bullet("Applied operational security (OPSEC) protocols and maintained documentation discipline in high-tempo environments.")
pdf.bullet("Processed and correlated multi-source data to identify patterns, threats, and actionable intelligence.")

pdf.ln(1)
pdf.job_header("Spectrum (Charter Communications) \u2014 Field Technician II (2017 \u2013 2021)")
pdf.bullet("Diagnosed and resolved network connectivity issues across residential and business environments.")
pdf.bullet("Performed signal diagnostics and troubleshooting to DOCSIS standards; configured routers, gateways, and access points.")
pdf.bullet("Built and maintained structured cabling infrastructure (Cat5e/Cat6, coax, fiber) with rack and cable management.")

pdf.ln(1)
pdf.job_header("Telecom Outsourcing & Call Centers \u2014 Technical Support (2012 \u2013 2017)")
pdf.bullet("Troubleshot network connectivity, modem/router issues, and Wi-Fi configuration for telecom customers.")
pdf.bullet("Documented cases, escalated security-relevant issues, and managed high-volume incident queues.")

pdf.ln(1)
pdf.job_header("Amazon Logistics \u2014 Delivery Associate (2021 \u2013 Present)")
pdf.bullet("Recognized for reliability and performance (Driver of the Month); maintained accuracy across 180\u2013200+ daily stops.")

pdf.ln(1)

# Education & Certifications
pdf.section_header("Education & Certifications")
pdf.edu_bullet_bold("Google Cybersecurity Professional Certificate", " \u2014 Google (2025)")
pdf.edu_bullet_bold("Certified Ethical Hacker (CEH)", " \u2014 EC-Council (2025)")
pdf.edu_bullet("University of Kansas \u2014 Coursework in Mathematics, Algorithms, Network Security, Cryptography (2010 \u2013 2012)")
pdf.edu_bullet("USAF \u2014 Intelligence Operations Specialist Course (2006 \u2013 2010)")

pdf.output("technician_resume_ascii.pdf")

import shutil
shutil.copy("technician_resume_ascii.pdf", "public/Russell_J_Adams_Resume.pdf")

print("Resume generated and copied to public/")
