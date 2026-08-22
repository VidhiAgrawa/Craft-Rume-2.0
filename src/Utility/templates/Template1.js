import { getSampleDataForTemplate } from '../sampleData';

/**
 * Template 1: Sebastian Bennett (Clean Minimalist Accountant / Finance Professional)
 * Single Source of Truth using central sampleData.
 */
export const generateTemplate1 = (data = {}) => {
  const defaultData = getSampleDataForTemplate('Sebastian Bennett');

  const firstName = data.firstName || defaultData.firstName;
  const lastName = data.lastName || defaultData.lastName;
  const jobTitle = data.jobTitle || defaultData.jobTitle;
  const phone = data.phone || defaultData.phone;
  const email = data.email || defaultData.email;
  const location = data.location || defaultData.location;
  const summary = data.summary || defaultData.summary;
  const skills = data.skills || defaultData.skills;

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

  const skillList = typeof skills === 'string'
    ? skills.split(',').map((s) => s.trim()).filter(Boolean)
    : defaultData.skills.split(',').map((s) => s.trim()).filter(Boolean);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${fullName} - Resume</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #222222;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .resume-page {
      width: 800px;
      min-height: 1000px;
      margin: 0 auto;
      background: #ffffff;
      padding: 35px 38px 35px 38px;
      box-sizing: border-box;
      page-break-inside: avoid;
    }
    .header {
      text-align: center;
      margin-bottom: 12px;
    }
    .header h1 {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: 2px;
      margin: 0 0 4px 0;
      color: #111111;
      text-transform: uppercase;
    }
    .header .subtitle {
      font-size: 13.5px;
      color: #444444;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .contact-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      font-size: 11px;
      color: #444444;
      padding: 6px 0;
      border-top: 1px solid #222222;
      border-bottom: 1px solid #222222;
    }
    .section {
      margin-top: 10px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .section:last-of-type {
      margin-bottom: 10px;
    }
    .section-title {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #111111;
      margin-bottom: 6px;
    }
    .divider {
      height: 1px;
      background: #e0e0e0;
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .summary-text {
      font-size: 11.5px;
      line-height: 1.5;
      color: #333333;
    }
    .item-group {
      margin-bottom: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .item-meta {
      font-size: 10.5px;
      color: #555555;
      margin-bottom: 2px;
    }
    .item-role {
      font-size: 12.5px;
      font-weight: 800;
      color: #111111;
      margin-bottom: 3px;
    }
    .item-desc {
      font-size: 11px;
      line-height: 1.45;
      color: #333333;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      font-size: 11px;
      color: #333333;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .skill-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .bullet { font-weight: bold; }
  </style>
</head>
<body>
  <div class="resume-page">
    <div class="header">
      <h1>${fullName}</h1>
      <div class="subtitle">${jobTitle}</div>
      <div class="contact-bar">
        <span> ${phone}</span>
        <span> ${email}</span>
        <span> ${location}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">ABOUT ME</div>
      <div class="summary-text">${summary}</div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <div class="section-title">EDUCATION</div>
      ${eduList.map((edu) => `
        <div class="item-group">
          <div class="item-meta">${edu.school || 'University'} | ${edu.eduYear || edu.gradYear || '2026-2030'}</div>
          <div class="item-role">${edu.degree || 'Degree'}</div>
        </div>
      `).join('')}
    </div>

    <div class="divider"></div>

    <div class="section">
      <div class="section-title">WORK EXPERIENCE</div>
      ${expList.map((exp) => `
        <div class="item-group">
          <div class="item-meta">${exp.company || 'Company'} | ${exp.dates || exp.startDate || '2023 - Present'}</div>
          <div class="item-role">${exp.jobTitle || 'Role'}</div>
          <div class="item-desc">${exp.experienceDesc || exp.description || ''}</div>
        </div>
      `).join('')}
    </div>

    ${projectList.length > 0 ? `
    <div class="divider"></div>
    <div class="section">
      <div class="section-title">PROJECTS</div>
      ${projectList.map((p) => `
        <div class="item-group">
          <div class="item-role">${p.title} ${p.techStack ? `<span style="font-weight:normal; font-size:11px; color:#666;">(${p.techStack})</span>` : ''}</div>
          ${p.link ? `<div class="item-meta"><a href="${p.link}" target="_blank" style="color:#4338CA;">${p.link}</a></div>` : ''}
          <div class="item-desc">${p.description}</div>
        </div>
      `).join('')}
    </div>` : ''}

    ${hackathonList.length > 0 ? `
    <div class="divider"></div>
    <div class="section">
      <div class="section-title">HACKATHONS</div>
      ${hackathonList.map((h) => `
        <div class="item-group">
          <div class="item-meta">${h.name} | ${h.date || ''} ${h.award ? `(${h.award})` : ''}</div>
          <div class="item-desc">${h.description}</div>
        </div>
      `).join('')}
    </div>` : ''}

    ${certificateList.length > 0 ? `
    <div class="divider"></div>
    <div class="section">
      <div class="section-title">CERTIFICATES & ACHIEVEMENTS</div>
      ${certificateList.map((c) => `
        <div class="item-group">
          <div class="item-role">${c.title}</div>
          <div class="item-meta">${c.issuer} | ${c.year}</div>
        </div>
      `).join('')}
    </div>` : ''}

    <div class="divider"></div>

    <div class="section">
      <div class="section-title">SKILLS</div>
      <div class="skills-grid">
        ${skillList.map((s) => `<div class="skill-item"><span class="bullet">•</span> ${s}</div>`).join('')}
      </div>
    </div>
  </div>
</body>
</html>`;
};
