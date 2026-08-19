import html2pdf from 'html2pdf.js';

/**
 * Downloads the given HTML content as a PDF file with exact A4 single-page formatting.
 */
export const downloadResumeAsPDF = async (htmlContent, fileName = 'resume.pdf') => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.zIndex = '-99999';
  container.style.width = '800px';
  container.style.opacity = '0.001';
  container.style.pointerEvents = 'none';
  container.innerHTML = htmlContent;
  document.body.appendChild(container);

  // Allow DOM to settle and render layout
  await new Promise((resolve) => setTimeout(resolve, 200));

  const targetElement = container.querySelector('.resume-page') || container.firstElementChild || container;

  const opt = {
    margin: 0,
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 800
    },
    jsPDF: {
      unit: 'px',
      format: [800, 1030],
      orientation: 'portrait'
    },
    pagebreak: { mode: 'avoid-all' }
  };

  try {
    await html2pdf().set(opt).from(targetElement).save();
  } catch (err) {
    console.error('PDF export error:', err);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
};

/**
 * Generates semantic HTML string representation of a resume based on template name and form data.
 */
export const generateResumeHTML = (data = {}, templateName = 'Sebastian Bennett') => {
  const {
    firstName = 'SEBASTIAN',
    lastName = 'BENNETT',
    jobTitle = 'Professional Accountant',
    phone = '+123-456-7890',
    email = 'hello@reallygreatsite.com',
    location = '123 Anywhere St., Any City',
    summary = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    skills = 'Auditing, Financial Accounting, Financial Reporting, Market Analysis, Negotiation',
    accomplishments = 'Boosted annual revenue by $300,000 through strategic sales initiatives.',
    courses = 'Advanced Cloud Computing — Completed Advanced Cloud Computing course from Coursera.'
  } = data;

  const fullName = `${firstName} ${lastName}`.trim() || 'SEBASTIAN BENNETT';
  
  // Multi-item Experiences list with fallback
  const expList = Array.isArray(data.experiences) && data.experiences.length > 0
    ? data.experiences
    : [{
        jobTitle: data.jobTitle || 'Senior Accountant',
        company: data.company || 'Salford & Co.',
        dates: '2023 - Present',
        experienceDesc: data.experienceDesc || 'Managed quarterly reporting and audit processes.'
      }];

  // Multi-item Educations list with fallback
  const eduList = Array.isArray(data.educations) && data.educations.length > 0
    ? data.educations
    : [{
        degree: data.degree || 'Bachelor of Science in Accounting',
        school: data.school || 'Borcelle University',
        eduYear: data.eduYear || '2026-2030'
      }];

  // Dynamic Projects List
  const projectList = Array.isArray(data.projects) && data.projects.length > 0
    ? data.projects.filter(p => p.title || p.description)
    : [];

  // Dynamic Hackathons List
  const hackathonList = Array.isArray(data.hackathons) && data.hackathons.length > 0
    ? data.hackathons.filter(h => h.name || h.description)
    : [];

  // Dynamic Certificates List
  const certificateList = Array.isArray(data.certificates) && data.certificates.length > 0
    ? data.certificates.filter(c => c.title || c.issuer)
    : [];

  const skillList = typeof skills === 'string' 
    ? skills.split(',').map((s) => s.trim()).filter(Boolean)
    : ['Auditing', 'Financial Accounting', 'Financial Reporting'];

  // ================= TEMPLATE 1: SEBASTIAN BENNETT (Clean Minimalist Accountant) =================
  if (templateName === 'Sebastian Bennett' || templateName === 'Modern Minimalist' || !templateName) {
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
      padding: 45px 40px;
      page-break-inside: avoid;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 30px;
      font-weight: 900;
      letter-spacing: 2px;
      margin: 0 0 6px 0;
      color: #111111;
      text-transform: uppercase;
    }
    .header .subtitle {
      font-size: 15px;
      color: #555555;
      margin-bottom: 14px;
      font-weight: 500;
    }
    .contact-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      font-size: 12px;
      color: #555555;
      padding: 8px 0;
      border-top: 1px solid #222222;
      border-bottom: 1px solid #222222;
    }
    .section {
      margin-top: 20px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #111111;
      margin-bottom: 10px;
    }
    .divider {
      height: 1px;
      background: #cccccc;
      margin-top: 16px;
      margin-bottom: 16px;
    }
    .summary-text {
      font-size: 12.5px;
      line-height: 1.6;
      color: #444444;
    }
    .item-group {
      margin-bottom: 16px;
    }
    .item-meta {
      font-size: 11.5px;
      color: #666666;
      margin-bottom: 3px;
    }
    .item-role {
      font-size: 13.5px;
      font-weight: 800;
      color: #111111;
      margin-bottom: 4px;
    }
    .item-desc {
      font-size: 12px;
      line-height: 1.5;
      color: #444444;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      font-size: 12px;
      color: #333333;
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
        <span>📞 ${phone}</span>
        <span>✉ ${email}</span>
        <span>📍 ${location}</span>
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
          <div class="item-meta">${edu.school || 'Borcelle University'} | ${edu.eduYear || edu.gradYear || '2026-2030'}</div>
          <div class="item-role">${edu.degree || 'Bachelor of Science'}</div>
        </div>
      `).join('')}
    </div>

    <div class="divider"></div>

    <div class="section">
      <div class="section-title">WORK EXPERIENCE</div>
      ${expList.map((exp) => `
        <div class="item-group">
          <div class="item-meta">${exp.company || 'Salford & Co.'} | ${exp.dates || exp.startDate || '2023 - Present'}</div>
          <div class="item-role">${exp.jobTitle || 'Senior Accountant'}</div>
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
          <div class="item-role">${p.title} ${p.techStack ? `<span style="font-weight:normal; font-size:11.5px; color:#666;">(${p.techStack})</span>` : ''}</div>
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
  }

  // ================= TEMPLATE 2: CHRIS JOHNSON (Executive Steel Blue Original Format) =================
  if (templateName === 'Chris Johnson' || templateName === 'Creative Flare' || templateName === 'Executive Bold') {
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
      page-break-inside: avoid;
    }
    .left-col {
      width: 35%;
      background: #8592ad;
      color: #ffffff;
      padding: 40px 25px;
    }
    .right-col {
      width: 65%;
      padding: 40px 35px;
      background: #ffffff;
    }
    .sidebar-name {
      font-size: 30px;
      font-weight: 900;
      line-height: 1.1;
      color: #222b38;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .sidebar-divider {
      height: 3px;
      width: 40px;
      background: #505c75;
      margin-bottom: 25px;
    }
    .contact-item {
      font-size: 12px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      word-break: break-all;
      color: #ffffff;
    }
    .sidebar-section-title {
      font-size: 14px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #1c2533;
      margin-top: 35px;
      margin-bottom: 15px;
    }
    .edu-item {
      margin-bottom: 16px;
      font-size: 12px;
    }
    .edu-school {
      font-weight: 800;
      font-size: 13px;
      color: #ffffff;
    }
    .edu-meta {
      font-size: 11px;
      opacity: 0.9;
      color: #f1f5f9;
    }
    .edu-degree {
      font-style: italic;
      margin-top: 2px;
      color: #ffffff;
    }
    .skill-item {
      margin-bottom: 14px;
    }
    .skill-name {
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 4px;
      color: #ffffff;
    }
    .rating-bars {
      display: flex;
      gap: 3px;
    }
    .bar-segment {
      height: 6px;
      flex: 1;
      background: rgba(255,255,255,0.4);
      border-radius: 2px;
    }
    .bar-segment.filled {
      background: #1c2533;
    }
    .main-section-title {
      font-size: 15px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #111111;
      margin-bottom: 12px;
    }
    .objective-text {
      font-size: 13px;
      line-height: 1.6;
      color: #444444;
      margin-bottom: 30px;
    }
    .job-title {
      font-size: 14px;
      font-weight: 800;
      color: #111111;
    }
    .job-company {
      font-size: 13px;
      font-style: italic;
      color: #555555;
      margin-bottom: 8px;
    }
    .bullets {
      padding-left: 18px;
      margin: 0 0 24px 0;
      font-size: 12.5px;
      line-height: 1.6;
      color: #333333;
    }
    .bullets li {
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  <div class="resume-page">
    <div class="left-col">
      <div class="sidebar-name">${firstName}<br/>${lastName}</div>
      <div class="sidebar-divider"></div>

      <div class="contact-item">📍 ${location}</div>
      <div class="contact-item">📞 ${phone}</div>
      <div class="contact-item">✉ ${email}</div>

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
  }

  // ================= TEMPLATE 3: ALEXANDER TAYLOR (Engineering & Tech Divider Bars Layout) =================
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
      padding: 40px 45px;
      page-break-inside: avoid;
    }
    .header-name {
      font-size: 32px;
      font-weight: 700;
      color: #111111;
      margin-bottom: 6px;
    }
    .contact-row {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 11px;
      color: #555555;
      margin-bottom: 20px;
      display: flex;
      gap: 15px;
    }
    .section-header {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #111111;
      border-bottom: 2px solid #111111;
      padding-bottom: 3px;
      margin-top: 22px;
      margin-bottom: 12px;
    }
    .summary-p {
      font-size: 12px;
      line-height: 1.6;
      color: #333333;
      margin-bottom: 15px;
    }
    .item-title {
      font-size: 14px;
      font-weight: 700;
      color: #111111;
    }
    .item-sub {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 11.5px;
      color: #666666;
      margin-bottom: 6px;
    }
    .item-body {
      font-size: 12px;
      line-height: 1.55;
      color: #333333;
      margin-bottom: 14px;
    }
    .skills-tech {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 12px;
      line-height: 1.6;
      color: #333333;
    }
  </style>
</head>
<body>
  <div class="resume-page">
    <div class="header-name">${fullName}</div>
    <div class="contact-row">
      <span>📍 ${location}</span>
      <span>📞 ${phone}</span>
      <span>✉ ${email}</span>
    </div>

    <div class="section-header">SUMMARY</div>
    <div class="summary-p">${summary}</div>

    <div class="section-header">EXPERIENCE</div>
    ${expList.map((exp) => `
      <div class="item-title">${exp.jobTitle || 'Software Engineer'} — ${exp.company || 'Company'}</div>
      <div class="item-sub">${exp.dates || exp.startDate || 'Dates'} | ${exp.location || ''}</div>
      <div class="item-body">${exp.experienceDesc || exp.description || ''}</div>
    `).join('')}

    ${projectList.length > 0 ? `
    <div class="section-header">PROJECTS</div>
    ${projectList.map((p) => `
      <div class="item-title">${p.title} ${p.techStack ? `(${p.techStack})` : ''}</div>
      ${p.link ? `<div class="item-sub">${p.link}</div>` : ''}
      <div class="item-body">${p.description}</div>
    `).join('')}
    ` : ''}

    ${hackathonList.length > 0 ? `
    <div class="section-header">HACKATHONS</div>
    ${hackathonList.map((h) => `
      <div class="item-title">${h.name} ${h.award ? `— ${h.award}` : ''}</div>
      <div class="item-sub">${h.date || ''}</div>
      <div class="item-body">${h.description}</div>
    `).join('')}
    ` : ''}

    <div class="section-header">EDUCATION</div>
    ${eduList.map((edu) => `
      <div class="item-title">${edu.degree || 'Degree'}</div>
      <div class="item-sub">${edu.school || 'University'} | ${edu.eduYear || edu.gradYear || 'Year'} | ${edu.location || ''}</div>
    `).join('')}

    ${certificateList.length > 0 ? `
    <div class="section-header">CERTIFICATES & ACHIEVEMENTS</div>
    ${certificateList.map((c) => `
      <div class="item-title">${c.title}</div>
      <div class="item-sub">${c.issuer} | ${c.year}</div>
    `).join('')}
    ` : ''}

    <div class="section-header">SKILLS</div>
    <div class="skills-tech">${skillList.join(' • ')}</div>
  </div>
</body>
</html>`;
};
