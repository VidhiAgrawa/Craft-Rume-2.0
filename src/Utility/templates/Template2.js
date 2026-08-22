import { getSampleDataForTemplate } from '../sampleData';

/**
 * Template 2: Chris Johnson (Executive Steel Blue Original Format)
 */
export const generateTemplate2 = (data = {}) => {
  const defaultData = getSampleDataForTemplate('Chris Johnson');

  const firstName = data.firstName || defaultData.firstName;
  const lastName = data.lastName || defaultData.lastName;
  const phone = data.phone || defaultData.phone;
  const email = data.email || defaultData.email;
  const location = data.location || defaultData.location;
  const summary = data.summary || defaultData.summary;
  const skills = data.skills || defaultData.skills;

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
  <title>${firstName} ${lastName} - Resume</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #2b2b2b;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .resume-page {
      width: 800px;
      min-height: 1000px;
      margin: 0 auto;
      background: #ffffff;
      display: flex;
      box-sizing: border-box;
      page-break-inside: avoid;
    }
    .left-col {
      width: 35%;
      background: #8592ad;
      color: #ffffff;
      padding: 32px 22px 35px 22px;
      box-sizing: border-box;
    }
    .right-col {
      width: 65%;
      padding: 32px 30px 35px 30px;
      background: #ffffff;
      box-sizing: border-box;
    }
    .sidebar-name {
      font-size: 26px;
      font-weight: 900;
      line-height: 1.1;
      color: #222b38;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .sidebar-divider {
      height: 3px;
      width: 35px;
      background: #505c75;
      margin-bottom: 18px;
    }
    .contact-item {
      font-size: 11px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      word-break: break-all;
      color: #ffffff;
    }
    .sidebar-section-title {
      font-size: 13px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #1c2533;
      margin-top: 22px;
      margin-bottom: 10px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .edu-item {
      margin-bottom: 12px;
      font-size: 11.5px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .edu-school {
      font-weight: 800;
      font-size: 12px;
      color: #ffffff;
    }
    .edu-meta {
      font-size: 10.5px;
      opacity: 0.9;
      color: #f1f5f9;
    }
    .edu-degree {
      font-style: italic;
      margin-top: 2px;
      color: #ffffff;
    }
    .skill-item {
      margin-bottom: 10px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .skill-name {
      font-size: 11px;
      font-weight: 700;
      margin-bottom: 3px;
      color: #ffffff;
    }
    .rating-bars {
      display: flex;
      gap: 3px;
    }
    .bar-segment {
      height: 5px;
      flex: 1;
      background: rgba(255,255,255,0.4);
      border-radius: 2px;
    }
    .bar-segment.filled {
      background: #1c2533;
    }
    .main-section-title {
      font-size: 13.5px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #111111;
      margin-top: 14px;
      margin-bottom: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .main-section-title:first-of-type {
      margin-top: 0;
    }
    .objective-text {
      font-size: 11.5px;
      line-height: 1.5;
      color: #444444;
      margin-bottom: 16px;
    }
    .job-title {
      font-size: 13px;
      font-weight: 800;
      color: #111111;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .job-company {
      font-size: 11.5px;
      font-style: italic;
      color: #555555;
      margin-bottom: 4px;
    }
    .bullets {
      padding-left: 16px;
      margin: 0 0 14px 0;
      font-size: 11px;
      line-height: 1.5;
      color: #333333;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .bullets li {
      margin-bottom: 3px;
    }
  </style>
</head>
<body>
  <div class="resume-page">
    <div class="left-col">
      <div class="sidebar-name">${firstName}<br/>${lastName}</div>
      <div class="sidebar-divider"></div>

      <div class="contact-item"> ${location}</div>
      <div class="contact-item"> ${phone}</div>
      <div class="contact-item"> ${email}</div>

      <div class="sidebar-section-title">EDUCATION</div>
      ${eduList.map((edu) => `
        <div class="edu-item">
          <div class="edu-school">${edu.school || 'University'}</div>
          <div class="edu-meta">${edu.eduYear || edu.gradYear || '2020'} | ${edu.location || ''}</div>
          <div class="edu-degree">${edu.degree || 'Degree'}</div>
        </div>
      `).join('')}

      ${certificateList.length > 0 ? `
      <div class="sidebar-section-title">CERTIFICATES</div>
      ${certificateList.map((c) => `
        <div class="edu-item">
          <div class="edu-school">${c.title}</div>
          <div class="edu-meta">${c.issuer} | ${c.year}</div>
        </div>
      `).join('')}
      ` : ''}

      <div class="sidebar-section-title">SKILLS</div>
      ${skillList.slice(0, 6).map((sk, idx) => {
        const fillCount = 5 - (idx % 2);
        return `
          <div class="skill-item">
            <div class="skill-name">${sk}</div>
            <div class="rating-bars">
              ${[1,2,3,4,5].map((i) => `<div class="bar-segment ${i <= fillCount ? 'filled' : ''}"></div>`).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="right-col">
      <div class="main-section-title">SUMMARY</div>
      <div class="objective-text">${summary}</div>

      <div class="main-section-title">EXPERIENCE</div>
      ${expList.map((exp) => {
        const bullets = (exp.experienceDesc || exp.description || '').split('.').map(s => s.trim()).filter(Boolean);
        return `
          <div class="job-title">${exp.jobTitle || 'Sales Associate'}</div>
          <div class="job-company">${exp.company || 'Company'} | ${exp.dates || exp.startDate || 'Dates'}</div>
          <ul class="bullets">
            ${bullets.map(b => `<li>${b}.</li>`).join('')}
          </ul>
        `;
      }).join('')}

      ${projectList.length > 0 ? `
      <div class="main-section-title">PROJECTS</div>
      ${projectList.map((p) => `
        <div class="job-title">${p.title}</div>
        <div class="job-company">${p.techStack ? `Tech: ${p.techStack}` : ''} ${p.link ? `| ${p.link}` : ''}</div>
        <ul class="bullets">
          <li>${p.description}</li>
        </ul>
      `).join('')}
      ` : ''}

      ${hackathonList.length > 0 ? `
      <div class="main-section-title">HACKATHONS</div>
      ${hackathonList.map((h) => `
        <div class="job-title">${h.name} ${h.award ? `(${h.award})` : ''}</div>
        <div class="job-company">${h.date || ''}</div>
        <ul class="bullets">
          <li>${h.description}</li>
        </ul>
      `).join('')}
      ` : ''}
    </div>
  </div>
</body>
</html>`;
};
