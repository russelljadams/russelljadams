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
pdf.cell(0, 6, "Technician  |  Veteran  |  Technical Problem Solver", align="C", new_x="LMARGIN", new_y="NEXT")

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
    "Veteran technician with hands-on experience in low-voltage cabling, telecom troubleshooting, "
    "and field service. Skilled in installing, terminating, and testing cabling and devices; setting "
    "up and maintaining networks; and mounting/configuring AV and connected systems. Proven reliability, "
    "safety, and problem-solving across military, telecom, and logistics roles. Strong ability to work "
    "independently or lead tasks to completion.",
    new_x="LMARGIN", new_y="NEXT")
pdf.ln(1)

# Core Competencies
pdf.section_header("Core Competencies")
pdf.set_font("DejaVu", "", 9.5)
comps_left = [
    "Low-Voltage Cabling (Cat6, coax, basic fiber)",
    "Cable Termination, Labeling & Testing",
    "Network/Wi-Fi Setup & Troubleshooting",
    "Device Mounting: TVs, cameras, access points",
]
comps_right = [
    "Rack Building & Cable Management",
    "Blueprint/Work Order Reading, OSHA Safety",
    "Hand/Power Tools, Cable Test Equipment",
    "Customer Communication & End-User Training",
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

pdf.job_header("Spectrum (Charter Communications) \u2014 Field Technician II (2017 \u2013 2021)")
pdf.bullet("Installed and serviced Internet, TV, and Voice for residential/business customers.")
pdf.bullet("Placed/terminated coax and Cat5e/Cat6; mounted gateways, set-top boxes, Wi-Fi access points.")
pdf.bullet("Performed signal diagnostics and resolved impairments to DOCSIS standards.")
pdf.bullet("Executed clean cable management and safety compliance in varied environments.")
pdf.bullet("Completed work orders, documented materials, and provided customer training.")

pdf.ln(1)
pdf.job_header("Amazon Logistics \u2014 Delivery Associate (2021 \u2013 Present)")
pdf.bullet("Completed 180\u2013200+ stops per day with accuracy and safety.")
pdf.bullet("Recognized for reliability and teamwork (Driver of the Month).")
pdf.bullet("Maintained vehicle, equipment, and route efficiency.")

pdf.ln(1)
pdf.job_header("Telecom Outsourcing & Call Centers \u2014 Technical Support & Customer Service (2012 \u2013 2017)")
pdf.bullet("Provided technical support for telecom customers: modem/router setup, Wi-Fi configuration, connectivity troubleshooting.")
pdf.bullet("Assisted customers with wiring checks, resets, and device setup.")
pdf.bullet("Created clear case notes and escalations while managing high call volumes.")

pdf.ln(1)
pdf.job_header("United States Air Force \u2014 Operations Intelligence Analyst (2006 \u2013 2010)")
pdf.bullet("Analyzed technical and operational data under strict deadlines.")
pdf.bullet("Applied operational security (OPSEC) and documentation discipline in fast-moving environments.")

pdf.ln(1)

# Education & Certifications
pdf.section_header("Education & Certifications")
pdf.edu_bullet_bold("Google Cybersecurity Professional Certificate", " \u2014 Google (2025)")
pdf.edu_bullet_bold("Certified Ethical Hacker (CEH)", " \u2014 EC-Council (2025)")
pdf.edu_bullet("University of Kansas \u2014 Coursework in Mathematics, Algorithms, Network Security, Cryptography (2010 \u2013 2012)")
pdf.edu_bullet("USAF \u2014 Intelligence Operations Specialist Course (2006 \u2013 2010)")

pdf.output("technician_resume_ascii.pdf")
print("Resume generated successfully")
