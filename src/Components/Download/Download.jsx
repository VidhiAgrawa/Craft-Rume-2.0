import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, ArrowRight, Loader2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { generateResumeHTML, downloadResumeAsPDF } from '../../Utility/ResumeGenerator';

const DownloadPage = ({ isDarkMode, downloadedFiles = [] }) => {
  const navigate = useNavigate();
  const [downloadingId, setDownloadingId] = useState(null);

  const handlePreviewResume = (fileItem) => {
    const htmlContent = fileItem.htmlContent || generateResumeHTML(fileItem.formData, fileItem.template);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleDownloadFile = async (fileItem) => {
    setDownloadingId(fileItem.id);
    const htmlContent = fileItem.htmlContent || generateResumeHTML(fileItem.formData, fileItem.template);
    const pdfFileName = fileItem.name.replace(/\.html$/i, '.pdf');
    
    try {
      await downloadResumeAsPDF(htmlContent, pdfFileName);
    } catch (err) {
      console.error('PDF download error:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-12 md:py-16 flex flex-col items-center transition-colors duration-500 animate-fadeIn">
      {/* Page Header */}
      <div className="text-center max-w-2xl mb-8 sm:mb-12">
        <h1 className={`text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight animate-textFade ${
          isDarkMode ? 'text-white' : 'text-[#112D55]'
        }`}>
          Your Resumes
        </h1>
        <p className={`mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-medium animate-textFade-delay-1 ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Download your custom 3D claymorphism resumes directly in <strong>PDF format</strong>.
        </p>
      </div>

      {/* Main Clay Container */}
      <div className={`w-full rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-8 md:p-10 transition-all duration-500 animate-textFade-delay-2 ${
        isDarkMode ? 'medium-box-shadow-black bg-[#212121]' : 'white medium-box-shadow'
      }`}>
        {downloadedFiles.length === 0 ? (
          <div className="text-center py-8 sm:py-12 space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-indigo-50 dark:bg-slate-800 text-[#534DB4] dark:text-[#A5B4FC] mx-auto flex items-center justify-center circle-box-shadow">
              <FileText className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">No Resumes Generated Yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Select a template and complete your requirements to generate your custom 3D resume in PDF.
            </p>
            <button
              onClick={() => navigate('/templates')}
              className="mt-4 darker-blue small-box-shadow text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Browse Templates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white text-left px-1 sm:px-2 mb-3 sm:mb-4">
              Downloaded PDF Files ({downloadedFiles.length})
            </h3>

            {downloadedFiles.map((file) => {
              const displayName = file.name.replace(/\.html$/i, '.pdf');
              const isExporting = downloadingId === file.id;

              return (
                <div
                  key={file.id}
                  className={`p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:scale-[1.01] ${
                    isDarkMode ? 'bg-slate-800/80 border border-slate-700' : 'bg-slate-50/90 border border-slate-200/80'
                  }`}
                >
                  {/* File Info */}
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center shrink-0 circle-box-shadow">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-bold text-slate-900 dark:text-gray-500 text-sm sm:text-base flex items-center gap-1.5 truncate">
                        <span className="truncate">{displayName}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        Template: <span className="font-semibold text-[#534DB4] dark:text-[#A5B4FC]">{file.template}</span> • PDF File
                      </div>
                    </div>
                  </div>

                  {/* Actions (Mobile optimized) */}
                  <div className="flex items-center gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-700">
                    {/* Primary Direct PDF Download Button */}
                    <button
                      onClick={() => handleDownloadFile(file)}
                      disabled={isExporting}
                      className="darker-blue small-box-shadow text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 justify-center flex-1 sm:flex-none disabled:opacity-50"
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download PDF</span>
                        </>
                      )}
                    </button>

                    {/* Secondary Preview Button */}
                    <button
                      onClick={() => handlePreviewResume(file)}
                      className="off-blue small-box-shadow text-[#534DB4] font-bold text-xs sm:text-sm px-3.5 py-2.5 sm:py-3 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 justify-center"
                      title="Preview resume in browser"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadPage;
