import { getSampleDataForTemplate } from '../sampleData';

/**
 * Template 4: Special Template (Exact 75% ATS-Approved Layout from Special_Templete.png)
 */
export const generateTemplate4 = (data = {}) => {
  const defaultData = getSampleDataForTemplate('Special Template');

  const firstName = data.firstName || defaultData.firstName;
  const lastName = data.lastName || defaultData.lastName;
  const jobTitle = data.jobTitle || defaultData.jobTitle;
  const phone = data.phone || defaultData.phone;
  const email = data.email || defaultData.email;
  const location = data.location || defaultData.location;
  const summary = data.summary || defaultData.summary;
  const skills = data.skills || defaultData.skills;
  const accomplishments = data.accomplishments || defaultData.accomplishments;

  const fullName = `${firstName} ${lastName}`.trim() || defaultData.firstName;

  const expList = Array.isArray(data.experiences) && data.experiences.length > 0
    ? data.experiences
    : defaultData.experiences;

  const eduList = Array.isArray(data.educations) && data.educations.length > 0
    ? data.educations
    : defaultData.educations;

  const projectList = Array.isArray(data.projects) && data.projects.length > 0
    ? data.projects.filter(p => p.title || p.description)
    : defaultData.projects;

  const hackathonList = Array.isArray(data.hackathons) && data.hackathons.length > 0
    ? data.hackathons.filter(h => h.name || h.description)
    : defaultData.hackathons;

  const certificateList = Array.isArray(data.certificates) && data.certificates.length > 0
    ? data.certificates.filter(c => c.title || c.issuer)
    : defaultData.certificates;

  const skillCategories = typeof skills === 'string'
    ? skills.split('\n').map(line => line.trim()).filter(Boolean)
    : defaultData.skills.split('\n').map(line => line.trim()).filter(Boolean);

  const summaryBullets = typeof summary === 'string'
    ? summary.split('\n').map(s => s.trim()).filter(Boolean)
    : [summary];

  const page1Projects = projectList.slice(0, 2);
  const page2Projects = projectList.slice(2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${fullName} - Special Template</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      color: #111111;
      background: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .resume-container {
      width: 800px;
      margin: 0 auto;
      background: #ffffff;
    }
    .resume-page {
      width: 800px;
      height: 1020px;
      max-height: 1020px;
      box-sizing: border-box;
      padding: 35px 45px 25px 45px;
      background: #ffffff;
      position: relative;
      overflow: hidden;
    }
    .page-2 {
      page-break-before: always;
      break-before: page;
    }
    .header {
      margin-bottom: 12px;
    }
    .header .name {
      font-size: 21px;
      font-weight: 800;
      color: #000000;
      margin: 0 0 3px 0;
    }
    .header .role-title {
      font-size: 11.5px;
      font-weight: 700;
      color: #222222;
      margin-bottom: 6px;
    }
    .header .contact-row {
      font-size: 10.5px;
      color: #222222;
      margin-bottom: 2px;
      line-height: 1.4;
    }
    .header .contact-row a {
      color: #0000ee;
      text-decoration: underline;
    }
    .section-header {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #000000;
      border-bottom: 1.5px solid #111111;
      padding-bottom: 2px;
      margin-top: 14px;
      margin-bottom: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .bullet-list {
      margin: 0 0 8px 0;
      padding-left: 18px;
      font-size: 11px;
      line-height: 1.45;
      color: #111111;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .bullet-list li {
      margin-bottom: 4px;
    }
    .item-title-bold {
      font-size: 11.5px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 2px;
    }
    .item-sub-italic {
      font-size: 11px;
      font-style: italic;
      font-weight: 600;
      color: #222222;
      margin-bottom: 4px;
    }
    .sub-bullet-list {
      margin: 4px 0 6px 0;
      padding-left: 24px;
      list-style-type: none;
      font-size: 10.8px;
      line-height: 1.45;
      color: #111111;
    }
    .sub-bullet-list li {
      margin-bottom: 4px;
      position: relative;
    }
    .sub-bullet-list li::before {
      content: "-";
      position: absolute;
      left: -12px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="resume-container">
    
    <!-- PAGE 1 OF 2 -->
    <div class="resume-page page-1">
      
      <!-- HEADER -->
      <div class="header">
        <div class="name">${fullName}</div>
        <div class="role-title">${jobTitle || 'MERN Stack Developer | Full Stack Developer'}</div>
        <div class="contact-row">
          LinkedIn: <a href="https://www.linkedin.com/in/vidhiagrawa/" target="_blank">https://www.linkedin.com/in/vidhiagrawa/</a> | GitHub: <a href="https://github.com/VidhiAgrawa" target="_blank">https://github.com/VidhiAgrawa</a>
        </div>
        <div class="contact-row">
          Email: <a href="mailto:${email}">${email}</a> | Mobile: ${phone} | Location: ${location}
        </div>
      </div>

      <!-- SUMMARY -->
      <div class="section-header">SUMMARY</div>
      <ul class="bullet-list">
        ${summaryBullets.map(s => `<li>${s}</li>`).join('')}
      </ul>

      <!-- SKILLS SUMMARY -->
      <div class="section-header">SKILLS SUMMARY</div>
      <ul class="bullet-list">
        ${skillCategories.map(sc => {
          const parts = sc.split(':');
          if (parts.length > 1) {
            return `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(':')}</li>`;
          }
          return `<li>${sc}</li>`;
        }).join('')}
      </ul>

      <!-- EXPERIENCE -->
      <div class="section-header">EXPERIENCE</div>
      ${expList.map(exp => {
        const bullets = (exp.experienceDesc || exp.description || '').split('\n').map(s => s.trim()).filter(Boolean);
        return `
          <div style="margin-bottom: 8px;">
            <div class="item-title-bold">${exp.jobTitle || 'Web Developer Intern'}</div>
            <div class="item-sub-italic">${exp.company || 'Abreonix Cyber Security — Internship (3 Months)'} | ${exp.dates || 'Nov 2025 – Feb 2026'}</div>
            <ul class="bullet-list">
              ${bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        `;
      }).join('')}

      <!-- EDUCATION -->
      <div class="section-header">EDUCATION</div>
      ${eduList.map(edu => `
        <div style="margin-bottom: 6px;">
          <div class="item-title-bold">${edu.school || 'Shri Vaishnav Vidyapeeth Vishwavidyalaya'}</div>
          <div class="item-sub-italic">${edu.degree || 'B. Tech in Computer Science and Engineering'}</div>
          <div style="font-size: 11px; color: #222222; font-weight: 600; margin-bottom: 3px;">
            ${edu.location || 'Indore, India'} | ${edu.eduYear || 'Jul 2023 - Jun 2027'}
          </div>
          <ul class="bullet-list">
            <li><em>Core Courses:</em> Microservices (JavaScript, Node.js), Data Structures, Analysis of Algorithms, Web Development, Databases.</li>
          </ul>
        </div>
      `).join('')}

      <!-- HACKATHONS -->
      <div class="section-header">HACKATHONS</div>
      ${hackathonList.map(h => {
        const bullets = (h.description || '').split('\n').map(s => s.trim()).filter(Boolean);
        return `
          <div style="margin-bottom: 6px;">
            <div class="item-title-bold">• ${h.name || 'INNONOVA - SAIT'} ${h.date ? `| ${h.date}` : ''}</div>
            <ul class="sub-bullet-list">
              ${bullets.map(b => {
                const parts = b.split(':');
                if (parts.length > 1) {
                  return `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(':')}</li>`;
                }
                return `<li>${b}</li>`;
              }).join('')}
            </ul>
          </div>
        `;
      }).join('')}

      ${page1Projects.length > 0 ? `
      <!-- PROJECTS (PAGE 1) -->
      <div class="section-header">PROJECTS</div>
      ${page1Projects.map(p => {
        const bullets = (p.description || '').split('\n').map(s => s.trim()).filter(Boolean);
        return `
          <div style="margin-bottom: 8px;">
            <div class="item-title-bold">${p.title}</div>
            ${p.techStack ? `<div style="font-size: 11px; font-weight: 700; color: #222; margin-bottom: 2px;">Tech Stack: <span style="font-weight: normal;">${p.techStack}</span></div>` : ''}
            <ul class="bullet-list">
              ${bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        `;
      }).join('')}
      ` : ''}

    </div>

    <!-- PAGE 2 OF 2 -->
    <div class="resume-page page-2">
      
      ${page2Projects.length > 0 ? `
      <!-- PROJECTS (PAGE 2 CONTINUED) -->
      <div class="section-header" style="margin-top: 0;">PROJECTS (CONTINUED)</div>
      ${page2Projects.map(p => {
        const bullets = (p.description || '').split('\n').map(s => s.trim()).filter(Boolean);
        return `
          <div style="margin-bottom: 10px;">
            <div class="item-title-bold">${p.title}</div>
            ${p.techStack ? `<div style="font-size: 11px; font-weight: 700; color: #222; margin-bottom: 3px;">Tech Stack: <span style="font-weight: normal;">${p.techStack}</span></div>` : ''}
            <ul class="bullet-list">
              ${bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        `;
      }).join('')}
      ` : ''}

      <!-- ACHIEVEMENTS -->
      <div class="section-header" ${page2Projects.length === 0 ? 'style="margin-top: 0;"' : ''}>ACHIEVEMENTS</div>
      <ul class="bullet-list">
        ${certificateList.map(c => `
          <li><strong>${c.title}:</strong> ${c.issuer ? `${c.issuer} | ` : ''}${c.year || ''}</li>
        `).join('')}
      </ul>

      <!-- INTERESTS -->
      <div class="section-header">INTERESTS</div>
      <ul class="bullet-list">
        <li>${accomplishments || 'Novel Reading, Continuous Learning, Creative Writing, and Problem Solving.'}</li>
      </ul>

    </div>

  </div>
</body>
</html>`;
};
