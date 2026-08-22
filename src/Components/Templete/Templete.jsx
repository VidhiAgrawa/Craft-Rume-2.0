import React from 'react';
import { useNavigate } from 'react-router';
import sebastianImg from '../../assets/templates/sebastian_bennett.png';
import chrisImg from '../../assets/templates/chris_johnson.png';
import alexanderImg from '../../assets/templates/alexander_taylor.png';
import specialImg from '../../assets/templates/Special_Templete2.png';

// Dynamic Array of Template Objects for easy scalability
export const TEMPLATES_DATA = [
  {
    id: 'sebastian-bennett',
    name: 'Sebastian Bennett',
    category: 'Accounting & Finance',
    description: 'Clean minimalist accountant template with centered header, contact bar, and structured sections.',
    image: sebastianImg,
    badges: [
      { text: 'Clean', style: 'bg-[#D1FAE5] text-[#047857]' },
      { text: 'Minimalist', style: 'bg-slate-200/90 dark:bg-slate-800 text-slate-700 dark:text-slate-300' }
    ]
  },
  {
    id: 'chris-johnson',
    name: 'Chris Johnson',
    category: 'Executive & Sales',
    description: 'Executive steel blue two-column layout with sidebar rating bars and structured sales history.',
    image: chrisImg,
    badges: [
      { text: 'Executive', style: 'bg-[#E0E7FF] text-[#4338CA]' },
      { text: '2-Column', style: 'bg-slate-200/90 dark:bg-slate-800 text-slate-700 dark:text-slate-300' }
    ]
  },
  {
    id: 'alexander-taylor',
    name: 'Alexander Taylor',
    category: 'Engineering & Tech',
    description: 'Software engineer classic template with serif headings, section divider bars, and achievements grid.',
    image: alexanderImg,
    badges: [
      { text: 'Engineering', style: 'bg-[#FCA5A5] text-[#991B1B]' },
      { text: 'Classic', style: 'bg-slate-200/90 dark:bg-slate-800 text-slate-700 dark:text-slate-300' }
    ]
  },
  {
    id: 'special-template',
    name: 'Special Template',
    category: '75% ATS Approved',
    description: 'Professional 75% ATS-approved two-page template designed for maximum recruiter readability and parser pass rates.',
    image: specialImg,
    badges: [
      { text: '75% ATS Approved', style: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold' },
      { text: '2-Page Layout', style: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' }
    ]
  }
];

const Templete = ({ isDarkMode, onSelectTemplate }) => {
  const navigate = useNavigate();

  const handleUseTemplate = (templateName) => {
    if (onSelectTemplate) {
      onSelectTemplate(templateName);
    }
    navigate('/requirements');
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 md:py-16 transition-colors duration-500 animate-fadeIn">
      
      {/* ================= HEADER TITLE & SUBTITLE ================= */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 transition-colors duration-300 animate-textFade ${
          isDarkMode ? 'text-white' : 'text-[#534DB4]'
        }`}>
          Shape Your Career
        </h1>
        <p className={`text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto transition-colors duration-300 animate-textFade-delay-1 ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Choose from our curated collection of professional 3D resume templates designed to make your experience stand out in high definition.
        </p>
      </div>

      {/* ================= DYNAMIC TEMPLATES GRID (Mapped from TEMPLATES_DATA) ================= */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 animate-textFade-delay-2">
        {TEMPLATES_DATA.map((template) => (
          <div 
            key={template.id}
            className={`rounded-[2.5rem] p-6 flex flex-col justify-between transition-all duration-500 hover:scale-[1.03] cursor-pointer ${
              isDarkMode 
                ? 'medium-box-shadow-black bg-[#212121]' 
                : 'white medium-box-shadow'
            }`}
          >
            <div className="space-y-5">
              
              {/* Proportional Centered Template Image Frame */}
              <div className="w-full max-w-[190px] h-[220px] mx-auto rounded-3xl flex items-center justify-center border shadow-inner relative overflow-hidden bg-slate-50 dark:bg-slate-800/50">
                <img 
                  src={template.image} 
                  alt={`${template.name} Resume Template`} 
                  className="w-full h-full object-contain rounded-2xl transition-transform duration-500 hover:scale-105 drop-shadow-sm"
                />
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-1.5 justify-center">
                {template.badges.map((b, i) => (
                  <span key={i} className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${b.style}`}>
                    {b.text}
                  </span>
                ))}
              </div>

              {/* Template Info */}
              <div className="text-left space-y-1.5 pt-1">
                <h3 className={`text-lg font-bold transition-colors ${
                  isDarkMode ? 'text-white' : 'text-[#112D55]'
                }`}>
                  {template.name}
                </h3>
                <p className={`text-xs leading-relaxed font-medium transition-colors ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {template.description}
                </p>
              </div>

            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleUseTemplate(template.name)}
              className="w-full mt-6 darker-blue small-box-shadow text-white font-bold text-sm py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}
      <footer className={`w-full max-w-6xl mx-auto pt-8 pb-6 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-sm mt-auto transition-colors duration-300 ${
        isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200/60 text-slate-500'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`font-bold text-lg ${isDarkMode ? 'text-[#A5B4FC]' : 'text-[#534DB4]'}`}>
            CraftRume 2.0
          </span>
        </div>

        <div className="text-xs opacity-75">
          © 2024 CraftRume 2.0. All rights reserved.
        </div>

        <div className="flex items-center space-x-6 text-xs md:text-sm font-semibold">
          <a href="#privacy" className={`transition-colors ${isDarkMode ? 'hover:text-[#A5B4FC]' : 'hover:text-[#534DB4]'}`}>Privacy Policy</a>
          <a href="#terms" className={`transition-colors ${isDarkMode ? 'hover:text-[#A5B4FC]' : 'hover:text-[#534DB4]'}`}>Terms of Service</a>
          <a href="#contact" className={`transition-colors ${isDarkMode ? 'hover:text-[#A5B4FC]' : 'hover:text-[#534DB4]'}`}>Contact</a>
        </div>
      </footer>

    </div>
  );
};

export default Templete;
