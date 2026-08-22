import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { UploadCloud, FileText, CheckCircle2, Sparkles, X, ArrowRight, RefreshCw, FileCheck2, AlertCircle } from 'lucide-react';


const Parse = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isRefining, setIsRefining] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRefineClick = async () => {
    if (!file) return;
    setIsRefining(true);
    try {
      let arrayBuffer = null;
      let rawText = '';

      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        arrayBuffer = await file.arrayBuffer();
      } else {
        rawText = await file.text();
      }

      if (arrayBuffer) {
        window.__uploadedPdfArrayBuffer = arrayBuffer;
      }

      navigate('/refine', {
        state: {
          arrayBuffer,
          rawText,
          fileName: file.name
        }
      });
    } catch (err) {
      console.error('Error processing PDF file:', err);
      navigate('/refine');
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full flex flex-col items-center min-h-[calc(100vh-100px)] px-4 sm:px-6 lg:px-8 py-8 md:py-16 transition-colors duration-500">
      
      {/* Main Container */}
      <div className={`w-full max-w-4xl rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 relative ${
        isDarkMode
          ? 'medium-box-shadow-black bg-[#212121] text-white'
          : 'white medium-box-shadow text-slate-800'
      }`}>
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-slate-800 text-[#534DB4] dark:text-[#A5B4FC] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Smart Resume Parser & Refiner</span>
          </div>
          
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 ${
            isDarkMode ? 'text-white' : 'text-[#534DB4]'
          }`}>
            Parse & Refine Your Resume
          </h1>
          
          <p className={`text-sm sm:text-base font-medium leading-relaxed ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Drag & drop your existing resume file below. Our parser will analyze your background and help you refine it to modern ATS standards.
          </p>
        </div>

        {/* Drag & Drop Upload Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".pdf,.docx,.doc,.txt"
            className="hidden"
          />

          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full min-h-[280px] rounded-3xl border-2 border-dashed transition-all duration-300 p-8 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden group ${
                isDragging
                  ? 'border-[#534DB4] dark:border-[#A5B4FC] bg-indigo-50/50 dark:bg-slate-800/80 scale-[1.01]'
                  : isDarkMode
                    ? 'border-slate-700 bg-slate-900/60 hover:border-slate-500 hover:bg-slate-900/90'
                    : 'border-slate-300 bg-[#f0f2f5] hover:border-[#534DB4] hover:bg-slate-100/80 shadow-[inset_2px_2px_6px_#b8b9be]'
              }`}
            >
              {/* Icon Container */}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${
                isDarkMode ? 'bg-slate-800 text-[#A5B4FC]' : 'bg-indigo-100 text-[#534DB4]'
              }`}>
                <UploadCloud className="w-10 h-10 animate-bounce" />
              </div>

              <h3 className="text-lg font-extrabold mb-1">
                {isDragging ? 'Drop your resume file here' : 'Drag & drop your resume here'}
              </h3>
              
              <p className={`text-xs font-semibold mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Supports PDF, DOCX, DOC, or TXT files (Max 10MB)
              </p>

              <button
                type="button"
                className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 ${
                  isDarkMode
                    ? 'darker-blue small-box-shadow text-white'
                    : 'formBGColor small-box-shadow text-[#534DB4]'
                }`}
              >
                <span>Browse File</span>
              </button>
            </div>
          ) : (
            /* Uploaded File Card */
            <div className={`w-full rounded-3xl p-6 border transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isDarkMode
                ? 'bg-slate-900/90 border-slate-700 shadow-lg'
                : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="flex items-center gap-4 text-left w-full sm:w-auto">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-slate-800 text-[#534DB4] dark:text-[#A5B4FC] flex items-center justify-center shrink-0">
                  <FileCheck2 className="w-7 h-7 text-emerald-500" />
                </div>
                
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm sm:text-base truncate max-w-[240px] sm:max-w-[320px]">
                      {file.name}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Ready
                    </span>
                  </div>
                  <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {formatFileSize(file.size)} • {file.type || 'Document'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeFile}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors cursor-pointer self-end sm:self-center"
                title="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Refine Your Resume Action Button */}
        {file && (
          <div className="flex flex-col items-center justify-center mt-6 animate-fadeIn">
            <button
              type="button"
              onClick={handleRefineClick}
              disabled={isRefining}
              className={`px-8 py-4 rounded-full font-extrabold text-base transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3 shadow-xl ${
                isRefining
                  ? 'bg-emerald-600 text-white cursor-wait'
                  : isDarkMode
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
                    : 'bg-[#534DB4] text-white hover:bg-[#4338CA]'
              }`}
            >
              {isRefining ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Parsing & Refining...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Refine your resume</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            
            {isRefining && (
              <p className={`text-xs font-bold mt-4 animate-pulse ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Analyzing resume structure, extracting data, and preparing refinement studio...
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Parse;
