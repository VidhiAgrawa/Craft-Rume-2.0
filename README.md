# ⚡ CraftRume 2.0 — Next-Gen Resume Builder & PDF Studio

<div align="center">

  ![CraftRume 2.0 Banner](https://img.shields.io/badge/CraftRume-2.0-indigo?style=for-the-badge&logo=react)

  **Craft stunning, ATS-friendly, professional resumes with real-time customization and 1-click A4 PDF export.**

  [![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

---

## 🌟 Overview

**CraftRume 2.0** is an interactive, high-performance web application designed to help developers, designers, accountants, and executives create modern, high-impact resumes in seconds. 

Whether you need a sleek minimalist layout, a corporate split-column executive format, or a detailed engineering layout with project and hackathon highlights, CraftRume 2.0 provides an intuitive real-time builder with seamless vector-quality PDF generation.

---

## ✨ Key Features

- 🎨 **Multiple Curated Designer Templates**:
  - **Sebastian Bennett**: Clean minimalist layout optimized for business & finance professionals.
  - **Chris Johnson**: Steel blue split-column executive design featuring skill rating bars & objective sidebar.
  - **Alexander Taylor**: Engineering & Tech layout with clean serif typography and section divider bars.
- ⚡ **High-Fidelity A4 PDF Export**:
  - Vector-rendered single-page PDF generator powered by `html2pdf.js` with exact layout locking and print optimization.
- 📝 **Dynamic Portfolio & Data Fields**:
  - Add & edit multiple **Work Experiences**, **Education**, **Projects (with Tech Stack & Links)**, **Hackathons (with Awards)**, **Certificates**, and **Skill lists**.
- 🌙 **Dark & Light Mode Engine**:
  - Smooth global theme toggle with dynamic background gradients and modern glassmorphism aesthetics.
- 🔐 **User Authentication & Session Persistence**:
  - Built-in signup/login routing with local storage session management protecting app workflow.
- 📥 **Downloads Hub & History Management**:
  - Track downloaded resumes with timestamping, size estimation, deduplication, live preview modal, and re-download capability.
- 🎭 **Smooth Micro-Animations**:
  - Fluid UI transitions and responsive card components powered by **GSAP** and **Lucide Icons**.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 7](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Design Tokens |
| **Animations** | [GSAP 3](https://greensock.com/gsap/) |
| **PDF Rendering** | [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) / html2canvas / jsPDF |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Routing** | [React Router v8](https://reactrouter.com/) |

---

## 📂 Project Structure

```text
Craft-Rume-2.0/
├── public/                     # Static public assets
├── src/
│   ├── assets/                 # Template preview thumbnails & static images
│   ├── Components/
│   │   ├── About/              # Product backstory & feature overview
│   │   ├── Auth/               # Login & Signup authentication portal
│   │   ├── Download/           # Downloads hub & downloaded resume details
│   │   ├── Final/              # Post-download confirmation & quick preview
│   │   ├── Home/               # Hero landing section & features breakdown
│   │   ├── Navbar/             # Persistent sticky navbar with theme & auth state
│   │   ├── Requirement/        # Multi-section resume builder form & dynamic fields
│   │   └── Templete/           # Interactive template gallery & selection engine
│   ├── Utility/
│   │   ├── Global.css          # Core design tokens & keyframes
│   │   └── ResumeGenerator.js  # HTML-to-PDF compiler & template HTML generators
│   ├── App.css                 # Main application styles
│   ├── App.jsx                 # App routing & state orchestration
│   ├── index.css               # Tailwind CSS imports & global baseline
│   └── main.jsx                # React DOM entry point
├── eslint.config.js            # Code linting rules
├── index.html                  # HTML entry point
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0 or higher)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/VidhiAgrawa/Craft-Rume-2.0.git
   cd Craft-Rume-2.0
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your web browser.

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## 🎯 How to Use

1. **Authenticate**: Log in or create an account to enter the generator portal.
2. **Choose Template**: Browse available template designs (*Sebastian Bennett*, *Chris Johnson*, or *Alexander Taylor*) and pick the layout that best fits your target role.
3. **Fill Resume Form**:
   - Enter your **Personal Details** & professional summary.
   - Add **Work Experiences** and **Education**.
   - Fill in **Projects**, **Hackathons**, and **Certifications** to showcase your achievement portfolio.
4. **Generate & Download**: Click **"Download PDF"** to produce a pixel-perfect, A4 single-page resume document.
5. **Manage History**: Visit the **Downloads** tab anytime to view previous resume exports, inspect dates, and download again.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/VidhiAgrawa/Craft-Rume-2.0/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is released under the [MIT License](LICENSE).

---

<div align="center">
  Crafted with ❤️ by <b>Vidhi Agrawal</b>
</div>