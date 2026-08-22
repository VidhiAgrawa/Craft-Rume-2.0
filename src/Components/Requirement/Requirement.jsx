import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Phone, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, AlertCircle, FileText, Plus, Trash2, Code, Trophy, Award } from 'lucide-react';
import { generateResumeHTML } from '../../Utility/ResumeGenerator';
import { getSampleDataForTemplate } from '../../Utility/sampleData';

const Requirement = ({ isDarkMode, selectedTemplate = 'Sebastian Bennett', onAddDownload }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [validationError, setValidationError] = useState('');
  const downloadCompletedRef = useRef(false);

  // Form State with Multi-Item Arrays for Experiences, Educations, Projects, Hackathons, Certificates
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experiences: [
      { id: 1, jobTitle: '', company: '', dates: '', location: '', experienceDesc: '' }
    ],
    educations: [
      { id: 1, degree: '', school: '', eduYear: '', location: '' }
    ],
    projects: [
      { id: 1, title: '', techStack: '', link: '', description: '' }
    ],
    hackathons: [
      { id: 1, name: '', award: '', date: '', description: '' }
    ],
    certificates: [
      { id: 1, title: '', issuer: '', year: '' }
    ],
    skills: '',
    accomplishments: '',
    courses: '',
  });

    const inputClass = (extra = '') =>
    `w-full rounded-2xl h-12 pl-5 pr-4 font-medium text-sm transition-all outline-none border ${
      isDarkMode
        ? 'bg-slate-900 text-white placeholder-slate-500 border-slate-700 shadow-[inset_1px_1px_5px_#0f172a]'
        : 'bg-[#f0f2f5] text-slate-800 placeholder-slate-400 border-gray-400 shadow-[inset_1px_1px_5px_#b8b9be]'
    } ${extra}`;

  const textareaClass = (extra = '') =>
    `w-full rounded-2xl p-4 font-medium text-sm transition-all outline-none border resize-none ${
      isDarkMode
        ? 'bg-slate-900 text-white placeholder-slate-500 border-slate-700 shadow-[inset_1px_1px_5px_#0f172a]'
        : 'bg-[#f0f2f5] text-slate-800 placeholder-slate-400 border-gray-400 shadow-[inset_1px_1px_5px_#b8b9be]'
    } ${extra}`;

  const steps = [
    { id: 1, name: 'Personal', title: 'Personal Details' },
    { id: 2, name: 'Experience', title: 'Work Experience' },
    { id: 3, name: 'Education', title: 'Education' },
    { id: 4, name: 'Projects & Hackathons', title: 'Projects & Hackathons' },
    { id: 5, name: 'Skills & Certificates', title: 'Skills & Achievements' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError('');
  };

  // Dynamic Experience Handlers
  const handleExperienceChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
    if (validationError) setValidationError('');
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { id: Date.now(), jobTitle: '', company: '', dates: '', location: '', experienceDesc: '' },
      ],
    }));
  };

  const removeExperience = (id) => {
    if (formData.experiences.length > 1) {
      setFormData((prev) => ({
        ...prev,
        experiences: prev.experiences.filter((exp) => exp.id !== id),
      }));
    }
  };

  // Dynamic Education Handlers
  const handleEducationChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      educations: prev.educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
    if (validationError) setValidationError('');
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educations: [
        ...prev.educations,
        { id: Date.now(), degree: '', school: '', eduYear: '', location: '' },
      ],
    }));
  };

  const removeEducation = (id) => {
    if (formData.educations.length > 1) {
      setFormData((prev) => ({
        ...prev,
        educations: prev.educations.filter((edu) => edu.id !== id),
      }));
    }
  };

  // Dynamic Project Handlers
  const handleProjectChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
    if (validationError) setValidationError('');
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: Date.now(), title: '', techStack: '', link: '', description: '' },
      ],
    }));
  };

  const removeProject = (id) => {
    if (formData.projects.length > 1) {
      setFormData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
      }));
    }
  };

  // Dynamic Hackathon Handlers
  const handleHackathonChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      hackathons: prev.hackathons.map((h) =>
        h.id === id ? { ...h, [field]: value } : h
      ),
    }));
    if (validationError) setValidationError('');
  };

  const addHackathon = () => {
    setFormData((prev) => ({
      ...prev,
      hackathons: [
        ...prev.hackathons,
        { id: Date.now(), name: '', award: '', date: '', description: '' },
      ],
    }));
  };

  const removeHackathon = (id) => {
    if (formData.hackathons.length > 1) {
      setFormData((prev) => ({
        ...prev,
        hackathons: prev.hackathons.filter((h) => h.id !== id),
      }));
    }
  };

  // Dynamic Certificate & Achievement Handlers
  const handleCertificateChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
    if (validationError) setValidationError('');
  };

  const addCertificate = () => {
    setFormData((prev) => ({
      ...prev,
      certificates: [
        ...prev.certificates,
        { id: Date.now(), title: '', issuer: '', year: '' },
      ],
    }));
  };

  const removeCertificate = (id) => {
    if (formData.certificates.length > 1) {
      setFormData((prev) => ({
        ...prev,
        certificates: prev.certificates.filter((c) => c.id !== id),
      }));
    }
  };

  const handleFillStaticData = () => {
    setValidationError('');
    const sampleData = getSampleDataForTemplate(selectedTemplate);
    setFormData(sampleData);
  };

  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.summary.trim()) {
        setValidationError('Please fill in all required personal details (First Name, Last Name, Email, Phone, and Summary) before proceeding.');
        return false;
      }
    } else if (step === 2) {
      const hasValidExp = formData.experiences.some((exp) => exp.jobTitle.trim() && exp.company.trim());
      if (!hasValidExp) {
        setValidationError('Please specify at least one Work Experience with Job Title and Company Name.');
        return false;
      }
    } else if (step === 3) {
      const hasValidEdu = formData.educations.some((edu) => edu.degree.trim() && edu.school.trim());
      if (!hasValidEdu) {
        setValidationError('Please specify at least one Education degree and Institution.');
        return false;
      }
    } else if (step === 5) {
      if (!formData.skills.trim()) {
        setValidationError('Please enter at least one skill.');
        return false;
      }
    }
    setValidationError('');
    return true;
  };

  const startDownloadProcess = () => {
    if (downloadCompletedRef.current) return;
    downloadCompletedRef.current = true;

    setIsDownloading(true);
    setDownloadProgress(0);

    let progressVal = 0;
    const interval = setInterval(() => {
      progressVal += 10;
      setDownloadProgress(progressVal);

      if (progressVal >= 100) {
        clearInterval(interval);

        const fullHtml = generateResumeHTML(formData, selectedTemplate);
        const fileName = `CraftRume_${selectedTemplate.replace(/\s+/g, '_')}_${(formData.firstName || 'User').trim()}.html`;

        const newFileData = {
          name: fileName,
          template: selectedTemplate,
          formData: formData,
          htmlContent: fullHtml,
        };

        if (onAddDownload) {
          onAddDownload(newFileData);
        }

        setTimeout(() => {
          setIsDownloading(false);
          downloadCompletedRef.current = false;
          navigate('/final', { state: { fileData: newFileData } });
        }, 600);
      }
    }, 200);
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      startDownloadProcess();
    }
  };

  const handleBack = () => {
    setValidationError('');
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate('/templates');
    }
  };

  // Render Loader Screen matching exact image when downloading
  if (isDownloading) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-12 text-center transition-colors duration-500 animate-fadeIn">
        <div className={`w-52 h-52 sm:w-64 sm:h-64 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-500 ${isDarkMode
            ? 'small-box-shadow-black bg-[#212121]'
            : 'white circle-box-shadow'
          }`}>
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#D4D2FF] rounded-3xl small-box-shadow flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-[#534DB4] opacity-80" />
          </div>
        </div>

        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#534DB4]'
          }`}>
          Sculpting your success...
        </h1>

        <div className="w-12 h-1 bg-[#34D399] rounded-full mx-auto mb-6" />

        <p className={`max-w-md text-sm sm:text-base font-medium leading-relaxed mb-8 mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-500'
          }`}>
          Building your {selectedTemplate} resume... Softening edges, defining your narrative, and preparing your document.
        </p>

        <div className="w-full max-w-xs mx-auto space-y-2">
          <div className="w-full h-3 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60 shadow-inner">
            <div
              className="h-full bg-[#534DB4] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
          <div className="text-xs font-extrabold text-[#534DB4] dark:text-[#A5B4FC]">
            {downloadProgress}% Completed
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 md:py-16 transition-colors duration-500">

      {/* Main Form Card Container */}
      <div className={`w-full max-w-5xl rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 relative ${isDarkMode
          ? 'medium-box-shadow-black bg-[#212121]'
          : 'white medium-box-shadow text-slate-800'
        }`}>

        {/* Active Template Badge Banner */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 dark:bg-slate-800 text-[#534DB4] dark:text-[#A5B4FC] flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            Selected Template: <strong>{selectedTemplate}</strong>
          </span>
        </div>

        {/* Header Title & Step Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="text-center sm:text-left">
            <h1 className={`text-3xl md:text-4xl font-extrabold mb-1 tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-[#534DB4]'
              }`}>
              Let’s build your resume
            </h1>
            <p className={`text-sm font-semibold transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
              Step {currentStep} of 5: {steps[currentStep - 1].title}
            </p>
          </div>

          {/* Auto-fill Static Data Button */}
          <button
            type="button"
            onClick={handleFillStaticData}
            title={`Auto-fill sample data for ${selectedTemplate}`}
            className={`px-4 py-2 rounded-full font-bold text-xs transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0 ${isDarkMode
                ? 'darker-blue small-box-shadow text-white'
                : 'formBGColor small-box-shadow text-[#534DB4]'
              }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Fill {selectedTemplate} Data</span>
          </button>
        </div>

        {/* Validation Error Notification Banner */}
        {validationError && (
          <div className="bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-2xl mb-6 flex items-center justify-between text-xs font-bold animate-fadeIn shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{validationError}</span>
            </div>
            <button
              onClick={() => setValidationError('')}
              className="text-red-700 dark:text-red-300 font-extrabold hover:opacity-80 p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* 5-Step Tab Navigation Bar (Mobile Responsive) */}
        <div className="w-full border-b border-slate-200/80 dark:border-slate-700/80 mb-8 overflow-x-auto">
          <div className="flex items-center justify-start sm:justify-between gap-3 sm:gap-4 min-w-max sm:min-w-full px-1 pb-1">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    if (validateStep(currentStep)) setCurrentStep(step.id);
                  }}
                  className={`relative py-2.5 px-1 sm:px-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 sm:gap-1.5 shrink-0 ${isActive
                      ? isDarkMode
                        ? 'text-[#A5B4FC]'
                        : 'text-[#534DB4]'
                      : isCompleted
                        ? 'text-emerald-500'
                        : isDarkMode
                          ? 'text-slate-500 hover:text-slate-300'
                          : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />}
                  <span className="whitespace-nowrap">{step.name}</span>

                  {isActive && (
                    <span className={`absolute bottom-0 left-0 w-full h-[2.5px] rounded-full transition-all ${isDarkMode ? 'bg-[#A5B4FC]' : 'bg-[#534DB4]'
                      }`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Body - Step 1: Personal Details */}
        {currentStep === 1 && (
          <div className="space-y-6 text-left animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Aarush"
                  className={inputClass()}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Sharma"
                  className={inputClass()}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 absolute left-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="aarush@example.com"
                    className={inputClass('pl-11')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 absolute left-4 text-slate-400" />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(91) 99389-16387"
                    className={inputClass('pl-11')}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                City / Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Bhubaneswar, Odisha"
                className={inputClass()}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                About Me / Objective <span className="text-red-500">*</span>
              </label>
              <textarea
                name="summary"
                rows={4}
                value={formData.summary}
                onChange={handleInputChange}
                placeholder="A brief overview of your background and objectives..."
                className={textareaClass()}
              />
            </div>
          </div>
        )}

        {/* Form Body - Step 2: Work Experience (DYNAMIC MULTI-ITEM) */}
        {currentStep === 2 && (
          <div className="space-y-8 text-left animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Work Experiences ({formData.experiences.length})
              </span>
              <button
                type="button"
                onClick={addExperience}
                className="off-blue small-box-shadow text-[#534DB4] font-bold text-xs px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Work Experience</span>
              </button>
            </div>

            {formData.experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`p-6 rounded-3xl space-y-4 relative border transition-all ${isDarkMode
                    ? 'bg-slate-800/60 border-slate-700'
                    : 'bg-slate-50/90 border-slate-200/80 shadow-sm'
                  }`}
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700 pb-3">
                  <h3 className="font-bold text-sm text-[#534DB4] dark:text-[#A5B4FC]">
                    Experience #{index + 1}
                  </h3>
                  {formData.experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full transition-colors cursor-pointer"
                      title="Remove experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) => handleExperienceChange(exp.id, 'jobTitle', e.target.value)}
                      placeholder="Senior Accountant"
                      className={inputClass()}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                      placeholder="Microsoft"
                      className={inputClass()}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Dates / Duration
                    </label>
                    <input
                      type="text"
                      value={exp.dates}
                      onChange={(e) => handleExperienceChange(exp.id, 'dates', e.target.value)}
                      placeholder="DD/MM/YYYY or 01/2023 - 12/2025 or 2022 - Present"
                      className={inputClass()}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                      placeholder="Mumbai"
                      className={inputClass()}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Responsibilities & Key Achievements
                  </label>
                  <textarea
                    rows={3}
                    value={exp.experienceDesc}
                    onChange={(e) => handleExperienceChange(exp.id, 'experienceDesc', e.target.value)}
                    placeholder="Led financial reporting, increased sales targets by 150%, or developed microservices architecture..."
                    className={inputClass()}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form Body - Step 3: Education (DYNAMIC MULTI-ITEM) */}
        {currentStep === 3 && (
          <div className="space-y-8 text-left animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Education & Degrees ({formData.educations.length})
              </span>
              <button
                type="button"
                onClick={addEducation}
                className="off-blue small-box-shadow text-[#534DB4] font-bold text-xs px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Education Degree</span>
              </button>
            </div>

            {formData.educations.map((edu, index) => (
              <div
                key={edu.id}
                className={`p-6 rounded-3xl space-y-4 relative border transition-all ${isDarkMode
                    ? 'bg-slate-800/60 border-slate-700'
                    : 'bg-slate-50/90 border-slate-200/80 shadow-sm'
                  }`}
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700 pb-3">
                  <h3 className="font-bold text-sm text-[#534DB4] dark:text-[#A5B4FC]">
                    Education #{index + 1}
                  </h3>
                  {formData.educations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full transition-colors cursor-pointer"
                      title="Remove education"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Degree / Qualification <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                      placeholder="B.S. in Computer Science"
                      className={inputClass()}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      University / School <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)}
                      placeholder="University"
                      className={inputClass()}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Graduation Year / Dates
                    </label>
                    <input
                      type="text"
                      value={edu.eduYear}
                      onChange={(e) => handleEducationChange(edu.id, 'eduYear', e.target.value)}
                      placeholder="2027"
                      className={inputClass()}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Location
                    </label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => handleEducationChange(edu.id, 'location', e.target.value)}
                      placeholder="Indore"
                      className={inputClass()}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form Body - Step 4: Projects & Hackathons (DYNAMIC MULTI-ITEM) */}
        {currentStep === 4 && (
          <div className="space-y-10 text-left animate-fadeIn">
            {/* --- MULTI-ITEM PROJECTS SECTION --- */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#534DB4] dark:text-[#A5B4FC]" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Projects ({formData.projects.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={addProject}
                  className="off-blue small-box-shadow text-[#534DB4] font-bold text-xs px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {formData.projects.map((proj, index) => (
                <div
                  key={proj.id}
                  className={`p-6 rounded-3xl space-y-4 border transition-all ${isDarkMode
                      ? 'bg-slate-800/60 border-slate-700'
                      : 'bg-slate-50/90 border-slate-200/80 shadow-sm'
                    }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700 pb-2">
                    <span className="font-bold text-xs text-[#534DB4] dark:text-[#A5B4FC]">
                      Project #{index + 1}
                    </span>
                    {formData.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProject(proj.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full transition-colors cursor-pointer"
                        title="Remove project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => handleProjectChange(proj.id, 'title', e.target.value)}
                        placeholder="Cloud Orchestrator"
                        className={inputClass()}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Tech Stack / Tools</label>
                      <input
                        type="text"
                        value={proj.techStack}
                        onChange={(e) => handleProjectChange(proj.id, 'techStack', e.target.value)}
                        placeholder="React, Go, AWS, Docker"
                        className={inputClass()}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Project Link / URL</label>
                    <input
                      type="text"
                      value={proj.link}
                      onChange={(e) => handleProjectChange(proj.id, 'link', e.target.value)}
                      placeholder="https://github.com/username/project"
                      className={inputClass()}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Project Description & Highlights</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => handleProjectChange(proj.id, 'description', e.target.value)}
                      placeholder="Built automated lead scoring pipeline increasing conversion rates by 25%..."
                      className={inputClass()}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* --- MULTI-ITEM HACKATHONS SECTION --- */}
            <div className="space-y-6 pt-4 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Hackathons & Competitions ({formData.hackathons.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={addHackathon}
                  className="off-blue small-box-shadow text-[#534DB4] font-bold text-xs px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Hackathon</span>
                </button>
              </div>

              {formData.hackathons.map((h, index) => (
                <div
                  key={h.id}
                  className={`p-6 rounded-3xl space-y-4 border transition-all ${isDarkMode
                      ? 'bg-slate-800/60 border-slate-700'
                      : 'bg-slate-50/90 border-slate-200/80 shadow-sm'
                    }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700 pb-2">
                    <span className="font-bold text-xs text-[#534DB4] dark:text-[#A5B4FC]">
                      Hackathon #{index + 1}
                    </span>
                    {formData.hackathons.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHackathon(h.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full transition-colors cursor-pointer"
                        title="Remove hackathon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Hackathon Name</label>
                      <input
                        type="text"
                        value={h.name}
                        onChange={(e) => handleHackathonChange(h.id, 'name', e.target.value)}
                        placeholder="Global FinTech Hackathon 2024"
                        className={inputClass()}
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Award / Position</label>
                      <input
                        type="text"
                        value={h.award}
                        onChange={(e) => handleHackathonChange(h.id, 'award', e.target.value)}
                        placeholder="1st Place Winner / Best Cloud App"
                        className={inputClass()}
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Date / Year</label>
                      <input
                        type="text"
                        value={h.date}
                        onChange={(e) => handleHackathonChange(h.id, 'date', e.target.value)}
                        placeholder="DD/MM/YYYY or 10/2024 or 2024"
                        className={inputClass()}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Project Built & Details</label>
                    <textarea
                      rows={2}
                      value={h.description}
                      onChange={(e) => handleHackathonChange(h.id, 'description', e.target.value)}
                      placeholder="Developed automated AI sales pitching tool for enterprise clients..."
                      className={inputClass()}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Body - Step 5: Skills & Certificates (DYNAMIC MULTI-ITEM) */}
        {currentStep === 5 && (
          <div className="space-y-8 text-left animate-fadeIn">
            {/* Skills String */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Key Skills (comma separated) <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="Auditing, Java, Python, Financial Accounting, Cloud Computing"
                className={inputClass()}
              />
            </div>

            {/* --- MULTI-ITEM CERTIFICATES & ACHIEVEMENTS SECTION --- */}
            <div className="space-y-6 pt-4 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#059669]" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Certificates & Achievements ({formData.certificates.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={addCertificate}
                  className="off-blue small-box-shadow text-[#534DB4] font-bold text-xs px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certificate / Achievement</span>
                </button>
              </div>

              {formData.certificates.map((cert, index) => (
                <div
                  key={cert.id}
                  className={`p-6 rounded-3xl space-y-4 border transition-all ${isDarkMode
                      ? 'bg-slate-800/60 border-slate-700'
                      : 'bg-slate-50/90 border-slate-200/80 shadow-sm'
                    }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700 pb-2">
                    <span className="font-bold text-xs text-[#534DB4] dark:text-[#A5B4FC]">
                      Certificate / Achievement #{index + 1}
                    </span>
                    {formData.certificates.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCertificate(cert.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full transition-colors cursor-pointer"
                        title="Remove certificate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Title / Award</label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => handleCertificateChange(cert.id, 'title', e.target.value)}
                        placeholder="AWS Certified Solutions Architect / CPA Prep"
                        className={inputClass()}
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Issuer / Organization</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => handleCertificateChange(cert.id, 'issuer', e.target.value)}
                        placeholder="Amazon Web Services / SMEI"
                        className={inputClass()}
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Year / Date</label>
                      <input
                        type="text"
                        value={cert.year}
                        onChange={(e) => handleCertificateChange(cert.id, 'year', e.target.value)}
                        placeholder="2024"
                        className={inputClass()}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Additional Highlights / Accomplishments</label>
              <input
                type="text"
                name="accomplishments"
                value={formData.accomplishments}
                onChange={handleInputChange}
                placeholder="Boosted annual revenue by $300,000"
                className={inputClass()}
              />
            </div>
          </div>
        )}

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-between pt-10 mt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleBack}
            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-bold text-sm px-4 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
          >
            {currentStep > 1 && <ArrowLeft className="w-4 h-4" />}
            <span>{currentStep === 1 ? 'Cancel' : 'Back'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="white small-box-shadow text-[#534DB4] font-bold text-sm px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2"
          >
            <span>{currentStep === 5 ? 'Finish & Download' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default Requirement;
