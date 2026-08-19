import React from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowRight, 
  PlayCircle, 
  Users, 
  Star, 
  Palette, 
  Sparkles, 
  Download, 
  Briefcase, 
  Pencil,
  ChevronRight
} from 'lucide-react';

const Home = ({ isDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center min-h-screen px-4 sm:px-6 lg:px-8 py-4 sm:py-8 transition-colors duration-500 animate-fadeIn">
      {/* ================= HERO SECTION ================= */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center py-8 md:py-16">
        {/* Left Column: Headline, Subtitle, CTA & Stats */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Top Badge */}
          <div className={`w-fit inline-flex items-center gap-2 px-4 py-1.5 rounded-full small-box-shadow text-xs md:text-sm font-semibold transition-transform duration-200 cursor-pointer animate-textFade ${
            isDarkMode ? 'darker-blue text-white' : 'formBGColor text-[#534DB4]'
          }`}>
            <span className="flex items-center gap-1">
              <ChevronRight className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white' : 'text-[#534DB4]'}`} />
              New: 3D Resume Builder
            </span>
          </div>

          {/* Main Headline with SVG Squiggle */}
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] transition-colors duration-300 animate-textFade-delay-1 ${
            isDarkMode ? 'text-white' : 'text-[#112D55]'
          }`}>
            Craft Your Story in{' '}
            <span className={`relative inline-block ${isDarkMode ? 'text-[#A5B4FC]' : 'text-[#534DB4]'}`}>
              3D
              {/* Hand-drawn squiggly underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 100 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 15C20 5 40 18 60 8C80 -2 95 12 98 10"
                  stroke="#34D399"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`max-w-xl text-base md:text-lg leading-relaxed font-medium transition-colors duration-300 animate-textFade-delay-2 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Build professional, standout resumes with our intuitive claymorphism interface. Soft, approachable, and uniquely yours.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto animate-textFade-delay-3">
            <button
              onClick={() => navigate('/templates')}
              className="darker-blue small-box-shadow text-white font-bold text-base px-7 py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>Start Building</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('/about')}
              className={`font-bold text-base px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isDarkMode 
                  ? 'small-box-shadow-black bg-[#1e1e1e] text-[#A5B4FC]' 
                  : 'white small-box-shadow text-[#534DB4]'
              }`}
            >
              <PlayCircle className={`w-5 h-5 ${isDarkMode ? 'text-[#A5B4FC]' : 'text-[#534DB4]'}`} />
              <span>See how it works</span>
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="flex items-center gap-6 pt-2 animate-textFade-delay-3">
            {/* 10k+ Users Badge */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#A7F3D0] flex items-center justify-center text-[#065F46] circle-box-shadow">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className={`text-sm font-extrabold leading-none ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>10k+</div>
                <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Users</div>
              </div>
            </div>

            {/* 4.9/5 Rating Badge */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FCA5A5] flex items-center justify-center text-[#991B1B] circle-box-shadow">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <div className="text-left">
                <div className={`text-sm font-extrabold leading-none ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>4.9/5</div>
                <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Rating</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Compact Animated 3D Claymorphism Visual */}
        <div className="lg:col-span-5 relative flex items-center justify-center py-4 animate-textFade-delay-2">
          {/* Main Compact Animated 3D Floating Clay Resume Card */}
          <div className={`relative w-full max-w-[260px] sm:max-w-[290px] aspect-[4/5] rounded-[2rem] p-5 sm:p-6 flex flex-col justify-between animate-float-slow transition-all duration-500 ${
            isDarkMode
              ? 'medium-box-shadow-black bg-[#212121]'
              : 'white medium-box-shadow'
          }`}>
            
            {/* Header Block inside Card */}
            <div className="space-y-3">
              <div className={`w-16 h-5 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200/80'}`} />
              <div className="space-y-2 pt-1">
                <div className={`w-full h-2.5 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200/90'}`} />
                <div className={`w-3/4 h-2.5 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200/70'}`} />
                <div className={`w-4/5 h-2.5 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200/70'}`} />
              </div>
            </div>

            {/* Middle Section preview */}
            <div className="space-y-2.5 pt-4">
              <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`} />
              <div className={`w-5/6 h-2 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`} />
              <div className={`w-2/3 h-2 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`} />
            </div>

            {/* Bottom Card Elements */}
            <div className="flex items-center gap-2.5 pt-6">
              <div className={`w-7 h-7 rounded-full ${isDarkMode ? 'bg-[#A5B4FC]' : 'bg-[#534DB4]'}`} />
              <div className="space-y-1 flex-1">
                <div className={`w-20 h-2 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                <div className={`w-12 h-1.5 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`} />
              </div>
            </div>
          </div>

          {/* Animated Floating Badges around Card */}
          <div className="absolute -top-1 right-3 sm:right-8 w-11 h-11 rounded-full bg-[#A7F3D0] flex items-center justify-center text-[#047857] circle-box-shadow animate-float-pulse">
            <Pencil className="w-5 h-5" />
          </div>

          <div className="absolute top-1/2 -right-2 sm:-right-4 w-9 h-9 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#4338CA] circle-box-shadow animate-float-reverse">
            <Briefcase className="w-4 h-4" />
          </div>

          <div className="absolute bottom-4 -left-2 sm:-left-4 w-11 h-11 rounded-full bg-[#FCA5A5] flex items-center justify-center text-white circle-box-shadow animate-float-pulse">
            <Star className="w-5 h-5 fill-current text-[#991B1B]" />
          </div>

          <div className={`absolute bottom-20 left-4 sm:left-6 w-8 h-8 rounded-full flex items-center justify-center circle-box-shadow animate-float-slow ${
            isDarkMode ? 'bg-[#A5B4FC]' : 'bg-[#534DB4]'
          }`}>
            <div className="w-3 h-3 rounded-full bg-white/90" />
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ("Designed for Impact") ================= */}
      <section className="w-full max-w-6xl mx-auto py-12 md:py-16 animate-textFade-delay-2">
        <h2 className={`text-3xl md:text-4xl font-extrabold text-center mb-10 md:mb-12 tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-[#112D55]'
        }`}>
          Designed for Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className={`rounded-[2rem] p-8 flex flex-col items-start text-left space-y-4 transition-all duration-500 hover:scale-105 cursor-pointer ${
            isDarkMode
              ? 'medium-box-shadow-black bg-[#212121]'
              : 'white medium-box-shadow'
          }`}>
            <div className="w-12 h-12 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#4338CA] circle-box-shadow">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold pt-2 ${isDarkMode ? 'text-white' : 'text-[#112D55]'}`}>
              Custom Themes
            </h3>
            <p className={`text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Tailor colors and soft clay shapes to match your personal brand.
            </p>
          </div>

          <div className={`rounded-[2rem] p-8 flex flex-col items-start text-left space-y-4 transition-all duration-500 hover:scale-105 cursor-pointer ${
            isDarkMode
              ? 'medium-box-shadow-black bg-[#212121]'
              : 'white medium-box-shadow'
          }`}>
            <div className="w-12 h-12 rounded-full bg-[#D1FAE5] flex items-center justify-center text-[#059669] circle-box-shadow">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold pt-2 ${isDarkMode ? 'text-white' : 'text-[#112D55]'}`}>
              AI Assisted
            </h3>
            <p className={`text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Generate bullet points and summaries with intelligent suggestions.
            </p>
          </div>

          <div className={`rounded-[2rem] p-8 flex flex-col items-start text-left space-y-4 transition-all duration-500 hover:scale-105 cursor-pointer ${
            isDarkMode
              ? 'medium-box-shadow-black bg-[#212121]'
              : 'white medium-box-shadow'
          }`}>
            <div className="w-12 h-12 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#991B1B] circle-box-shadow">
              <Download className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold pt-2 ${isDarkMode ? 'text-white' : 'text-[#112D55]'}`}>
              Export Anywhere
            </h3>
            <p className={`text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Download as PDF or share a live link to your interactive 3D resume.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className={`w-full max-w-6xl mx-auto pt-8 pb-6 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-sm mt-auto transition-colors duration-300 ${
        isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200/60 text-slate-500'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`font-bold text-lg ${isDarkMode ? 'text-[#A5B4FC]' : 'text-[#534DB4]'}`}>
            CraftRume 2.0
          </span>
        </div>

        <div className="flex items-center space-x-6 text-xs md:text-sm font-semibold">
          <a href="#privacy" className={`transition-colors ${isDarkMode ? 'hover:text-[#A5B4FC]' : 'hover:text-[#534DB4]'}`}>Privacy Policy</a>
          <a href="#terms" className={`transition-colors ${isDarkMode ? 'hover:text-[#A5B4FC]' : 'hover:text-[#534DB4]'}`}>Terms of Service</a>
          <a href="#contact" className={`transition-colors ${isDarkMode ? 'hover:text-[#A5B4FC]' : 'hover:text-[#534DB4]'}`}>Contact</a>
        </div>

        <div className="text-xs opacity-75">
          © 2024 CraftRume 2.0. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
