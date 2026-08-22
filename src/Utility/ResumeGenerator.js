import html2pdf from 'html2pdf.js';
import { generateTemplate1 } from './templates/Template1';
import { generateTemplate2 } from './templates/Template2';
import { generateTemplate3 } from './templates/Template3';
import { generateTemplate4 } from './templates/Template4';

/**
 * Downloads the given HTML content as a PDF file with exact A4 page formatting.
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

  const targetElement = container.querySelector('.resume-container') || container.querySelector('.resume-page') || container.firstElementChild || container;

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
    pagebreak: { mode: 'css', before: '.page-2' }
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
  if (templateName === 'Sebastian Bennett' || templateName === 'Modern Minimalist' || templateName === 'template1' || templateName === 'Template 1') {
    return generateTemplate1(data);
  }

  if (templateName === 'Chris Johnson' || templateName === 'Creative Flare' || templateName === 'Executive Bold' || templateName === 'template2' || templateName === 'Template 2') {
    return generateTemplate2(data);
  }
  
  if (templateName === 'Alexander Taylor' || templateName === 'Engineering & Tech' || templateName === 'template3' || templateName === 'Template 3') {
    return generateTemplate3(data);
  }
  
  if (templateName === 'Special Template' || templateName === 'Special_Template' || templateName === 'special-template' || templateName === 'Special Templete' || templateName === 'template4' || templateName === 'Template 4') {
    return generateTemplate4(data);
  }

  // Fallback default: Sebastian Bennett (Template 1)
  return generateTemplate1(data);
};
