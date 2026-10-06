# BN Power Enterprises (BNPE) — Official Corporate Web Portal

Official corporate web portal for **BN Power Enterprises (BNPE)**, a premier engineering, industrial construction, infrastructure, and EPC services conglomerate.

---

## 🌟 Key Features

* **Real-Time Market & Regulatory Bar:**
  * Live simulated stock quotes for BSE (`539302`) and NSE (`BNPE`).
  * Direct investor center shortcuts and tender notifications.
* **Header & Information Architecture:**
  * Official corporate insignia with high-resolution cogwheel & Goddess Saraswati emblem.
  * Hierarchical navigation dropdowns for:
    * **About Us** *(Story, Profile, Vision, Values, Leadership & Awards)*
    * **Sustainability** *(HSE Zero Harm Policy, CSR, Quality Assurance)*
    * **Businesses** *(Mega menu covering 8 primary business units)*
    * **Subsidiaries** *(BNPE Industry, BNPE Arabia, BNPE Projects BR FZE, Hydro Magus)*
    * **Investor Relations** *(Financials, Annual Reports, Shareholding Pattern, Regulatory Filings)*
    * **Careers** *(Job Openings, Culture & Talent Submission)*
* **7-Slide Hero Banner Carousel:**
  * High-resolution cinematic industrial photography for:
    1. *Ultra-Supercritical Power Plant Construction*
    2. *Industrial Services (O&M & Outages)*
    3. *Civil Construction & Heavy Infrastructure*
    4. *Flue Gas Desulphurisation (FGD) & Clean Tech*
    5. *Electrical & Transmission Systems (up to 765 kV)*
    6. *Water Infrastructure & Lift Irrigation*
    7. *Mining Solutions & Material Handling (MDO)*
  * Per-slide progress bar, slide counter (`01 / 07`), pause/play toggle, next/prev arrow controls, and touch swipe gestures.
* **Corporate Heritage & Animated 4-Column Stats Grid:**
  * `208+` Projects Executed
  * `80+` Global Clients
  * `25+` Years in Business
  * `40,000+` Workforce / Manpower
  * Animated with `IntersectionObserver` when scrolled into view.
* **"What We Offer" — 8 Business Verticals:**
  * Interactive category tabs (*All Verticals*, *Power & Energy*, *Civil & Water Infra*, *Services & Mining*).
  * In-depth modal dialogs detailing key performance indicators, technical scope, and landmark project references.
* **Commercial Tender / RFP Portal:**
  * Interactive tender inquiry drawer with client-side validation and toast notifications.
* **Sustainability & Safety First:**
  * Highlight of 45.8M+ safe manhours executed without Lost Time Injury (LTI) and ISO 9001/14001/45001 compliance.
* **Investor Relations Dashboard:**
  * Live stock metrics card and simulated downloads for Q3 Unaudited Results, Annual Reports, and SEBI Reg 30 filings.
* **Careers & Talent Portal:**
  * Immediate vacancy openings list and quick CV application modal.
* **Responsive & Mobile-First:**
  * Glassmorphism header, mobile sliding drawer with accordion menus, and floating smooth back-to-top button.

---

## 🚀 Getting Started

No external framework dependencies or compilation steps required. Built entirely with clean semantic HTML5, Vanilla CSS3, and modern Vanilla JavaScript.

### Option 1: Direct File Opening
Double-click `index.html` in any modern web browser.

### Option 2: Run with Local HTTP Server

**Using Python:**
```bash
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

**Using Node.js / npx:**
```bash
npx serve .
```

---

## 📁 Repository Structure

```
.
├── index.html                    # Main HTML5 semantic web portal
├── favicon.ico                   # 32x32 native favicon
├── favicon.png                   # 64x64 PNG favicon
├── favicon.svg                   # Vector SVG favicon
├── README.md                     # Documentation & project overview
├── .gitignore                    # Git ignore file
└── assets/
    ├── css/
    │   └── style.css             # Vanilla CSS design system & responsive styling
    ├── js/
    │   └── main.js               # Interactive carousel, modals, counters, filters & ticker
    └── images/
        ├── bnpe-logo.png         # Official high-resolution company logo
        ├── bnpe-logo-transparent.png # Transparent cogwheel emblem
        ├── hero-power-plant.jpg  # Supercritical thermal power EPC
        ├── hero-turbines-om.jpg  # Turbine overhauling & industrial services
        ├── hero-civil-infra.jpg  # Monumental civil engineering & bridges
        ├── hero-fgd-green.jpg    # Environmental FGD units & clean solar
        ├── hero-electrical-substation.jpg # EHV substations & transmission lines
        ├── hero-water-infra.jpg  # Mega pumping stations & bulk water pipelines
        ├── hero-mining-solutions.jpg # Surface mining & material handling
        ├── corporate-heritage.jpg # Corporate leadership boardroom
        └── safety-hse.jpg        # Safety First field engineering team
```

---

## 📜 License & Copyright

&copy; 2026 BN Power Enterprises (BNPE). All Rights Reserved.
CIN: L74140TG1999PLC032156
