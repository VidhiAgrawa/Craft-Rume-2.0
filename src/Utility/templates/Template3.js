import { getSampleDataForTemplate } from '../sampleData';

/**
 * Template 3: Alexander Taylor (Engineering & Tech Divider Bars Layout)
 */
export const generateTemplate3 = (data = {}) => {
  const defaultData = getSampleDataForTemplate('Alexander Taylor');

  const firstName = data.firstName || defaultData.firstName;
  const lastName = data.lastName || defaultData.lastName;
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
      font-family: Georgia, 'Times New Roman', serif;
      color: #1a1a1a;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .resume-page {
      width: 800px;
      min-height: 1000px;
      margin: 0 auto;
      background: #ffffff;
      padding: 32px 36px 35px 36px;
      box-sizing: border-box;
      page-break-inside: avoid;
    }
    .header-name {
      font-size: 26px;
      font-weight: 700;
      color: #111111;
      margin-bottom: 4px;
    }
    .contact-row {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 10.5px;
      color: #555555;
      margin-bottom: 10px;
      display: flex;
      gap: 15px;
    }
    .section-header {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #111111;
      border-bottom: 2px solid #111111;
      padding-bottom: 2px;
      margin-top: 10px;
      margin-bottom: 6px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .summary-p {
      font-size: 11px;
      line-height: 1.45;
      color: #333333;
      margin-bottom: 8px;
    }
    .item-group {
      margin-bottom: 6px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .item-title {
      font-size: 12px;
      font-weight: 700;
      color: #111111;
    }
    .item-sub {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 10.5px;
      color: #666666;
      margin-bottom: 2px;
    }
    .item-body {
      font-size: 10.5px;
      line-height: 1.4;
      color: #333333;
      margin-bottom: 4px;
    }
    .skills-tech {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 11px;
      line-height: 1.45;
      color: #333333;
      page-break-inside: avoid;
      break-inside: avoid;
    }
  </style>
</head>
<body>
  <div class="resume-page">
    <div class="header-name">${fullName}</div>
    <div class="contact-row">
      <span>Location: ${location}</span>
      <span>Phone: ${phone}</span>
      <span>Email: ${email}</span>
    </div>

    <div class="section-header">SUMMARY</div>
    <div class="summary-p">${summary}</div>

    <div class="section-header">EXPERIENCE</div>
    ${expList.map((exp) => `
      <div class="item-group">
        <div class="item-title">${exp.jobTitle || 'Software Engineer'} — ${exp.company || 'Company'}</div>
        <div class="item-sub">${exp.dates || exp.startDate || 'Dates'} | ${exp.location || ''}</div>
        <div class="item-body">${exp.experienceDesc || exp.description || ''}</div>
      </div>
    `).join('')}

    ${projectList.length > 0 ? `
    <div class="section-header">PROJECTS</div>
    ${projectList.map((p) => `
      <div class="item-group">
        <div class="item-title">${p.title} ${p.techStack ? `(${p.techStack})` : ''}</div>
        ${p.link ? `<div class="item-sub">${p.link}</div>` : ''}
        <div class="item-body">${p.description}</div>
      </div>
    `).join('')}
    ` : ''}

    ${hackathonList.length > 0 ? `
    <div class="section-header">HACKATHONS</div>
    ${hackathonList.map((h) => `
      <div class="item-group">
        <div class="item-title">${h.name} ${h.award ? `— ${h.award}` : ''}</div>
        <div class="item-sub">${h.date || ''}</div>
        <div class="item-body">${h.description}</div>
      </div>
    `).join('')}
    ` : ''}

    <div class="section-header">EDUCATION</div>
    ${eduList.map((edu) => `
      <div class="item-group">
        <div class="item-title">${edu.degree || 'Degree'}</div>
        <div class="item-sub">${edu.school || 'University'} | ${edu.eduYear || edu.gradYear || 'Year'} | ${edu.location || ''}</div>
      </div>
    `).join('')}

    ${certificateList.length > 0 ? `
    <div class="section-header">CERTIFICATES & ACHIEVEMENTS</div>
    ${certificateList.map((c) => `
      <div class="item-group">
        <div class="item-title">${c.title}</div>
        <div class="item-sub">${c.issuer} | ${c.year}</div>
      </div>
    `).join('')}
    ` : ''}

    <div class="section-header">SKILLS</div>
    <div class="skills-tech">${skillList.join(' • ')}</div>
  </div>
</body>
</html>`;
};
