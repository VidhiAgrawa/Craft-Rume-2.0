import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Star, Heart, Trophy, FileText, Download, Pencil, Loader2 } from 'lucide-react';
import { generateResumeHTML, downloadResumeAsPDF } from '../../Utility/ResumeGenerator';

const Final = ({ isDarkMode, downloadedFiles = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExporting, setIsExporting] = useState(false);

  // Get current file data passed from Requirement.jsx or latest downloaded file
  const fileData = location.state?.fileData || (downloadedFiles.length > 0 ? downloadedFiles[0] : null);

  const handleDownloadPDF = async () => {
    if (!fileData) {
      navigate('/download');
      return;
    }
    setIsExporting(true);
    const htmlContent = fileData.htmlContent || generateResumeHTML(fileData.formData, fileData.template);
    const pdfName = fileData.name ? fileData.name.replace(/\.html$/i, '.pdf') : `CraftRume_${fileData.template || 'Resume'}.pdf`;
    
    try {
      await downloadResumeAsPDF(htmlContent, pdfName);
    } catch (err) {
      console.error('Download PDF error:', err);
    } finally {
      setIsExporting(false);
      navigate('/download');
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-12 transition-colors duration-500 relative overflow-hidden">
      
      {/* Outer Clay Canvas Box */}
      <div className="relative w-full max-w-xl my-auto p-4 sm:p-6">
        
        {/* Floating Top-Left Mint Clay Star Badge (Home Page float-pulse animation) */}
        <div className="absolute -top-3 -left-2 sm:-top-5 sm:-left-4 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#A7F3D0] to-[#6EE7B7] circle-box-shadow flex items-center justify-center animate-float-pulse hover:scale-110 transition-transform duration-300">
          <Star className="w-7 h-7 sm:w-9 sm:h-9 text-[#047857] stroke-[2]" />
        </div>

        {/* Floating Mid-Right Soft Pink Clay Heart Badge (Home Page float-reverse animation) */}
        <div className="absolute top-1/2 -right-2 sm:-right-4 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FCE7F3] to-[#FBCFE8] circle-box-shadow flex items-center justify-center animate-float-reverse hover:scale-110 transition-transform duration-300">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#DB2777] stroke-[2]" />
        </div>

        {/* Floating Bottom-Right Soft Lavender Clay Trophy Badge (Home Page float-slow animation) */}
        <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-[2.5rem] bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] small-box-shadow flex items-center justify-center animate-float-slow hover:scale-110 transition-transform duration-300">
          <Trophy className="w-9 h-9 sm:w-11 sm:h-11 text-[#4338CA] stroke-[2]" />
        </div>

        {/* Main Center Clay Container Card (Home Page float-slow animation) */}
        <div className={`w-full rounded-[3.5rem] p-8 sm:p-14 text-center transition-all duration-500 relative z-10 animate-float-slow ${
          isDarkMode
            ? 'medium-box-shadow-black bg-[#1f1f1f] text-white'
            : 'white medium-box-shadow text-slate-800'
        }`}>
          
          {/* Central Circular Soft Lavender Clay Document Icon */}
          <div className={`w-30 h-30 sm:w-36 sm:h-36 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-500 ${
            isDarkMode
              ? 'small-box-shadow-black bg-[#2a2a2a]'
              : 'circle-box-shadow bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF]'
          }`}>
            <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-3xl bg-[#C7D2FE]/60 flex items-center justify-center">
              <FileText className="w-10 h-10 sm:w-10 sm:h-10 text-[#4338CA] stroke-[2.2]" />
            </div>
          </div>

          {/* Heading */}
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-3 tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Your Masterpiece <br />
            is <span className="relative inline-block text-[#4338CA] dark:text-[#A5B4FC]">
              Ready!
              {/* Mint Underline Accent */}
              <span className="absolute left-0 -bottom-1 w-full h-1.5 bg-[#A7F3D0] rounded-full -z-10" />
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className={`max-w-md text-xs sm:text-xs md:text-base font-semibold leading-relaxed mb-8 mx-auto ${
            isDarkMode ? 'text-slate-300' : 'text-slate-500'
          }`}>
            Your resume has been successfully compiled and styled with claymorphic perfection. It’s time to impress.
          </p>

          {/* Main Action Buttons Stack */}
          <div className="space-y-4 max-w-xs mx-auto">
            {/* Primary Direct Download PDF Button */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="w-full darker-blue medium-box-shadow text-white font-extrabold text-sm py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 shadow-lg disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Secondary Return to Editor Link */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/requirements')}
                className="text-xs font-bold text-[#4338CA] dark:text-[#A5B4FC] hover:underline inline-flex items-center gap-1.5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Return to Editor</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Final;
