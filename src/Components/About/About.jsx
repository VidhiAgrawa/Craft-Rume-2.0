import React from 'react';
import { Rocket, Heart, Leaf, Pointer } from 'lucide-react';
import firstAboutImg from '../../assets/firstaboutimage.png';
import secondAboutImg from '../../assets/second.png';
import thirdAboutImg from '../../assets/third.png';

const About = ({ isDarkMode }) => {
  return (
    <div className="w-full flex flex-col items-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 md:py-16 transition-colors duration-500 overflow-y-auto animate-fadeIn">
      
      {/* ================= 1. HERO HEADER SECTION ================= */}
      <section className="w-full max-w-5xl mx-auto text-center space-y-6 mb-12 sm:mb-16">
        
        {/* Hello There Badge */}
        <div className="w-full flex justify-center animate-textFade">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#D1FAE5] text-[#047857] text-xs sm:text-sm font-extrabold circle-box-shadow">
            👋 Hello there!
          </span>
        </div>

        {/* Main Headline */}
        <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] animate-textFade-delay-1 ${
          isDarkMode ? 'text-white' : 'text-[#534DB4]'
        }`}>
          Building a Resume Shouldn’t Feel <br className="hidden sm:inline" />
          Like{' '}
          <span className="relative inline-block text-[#C2410C] dark:text-[#F97316]">
            Work
            {/* Orange / Copper Hand-drawn Squiggle */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 100 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M2 15C20 5 40 18 60 8C80 -2 95 12 98 10"
                stroke="#F97316"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-medium transition-colors animate-textFade-delay-2 ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          We believe that landing your dream job starts with a little bit of joy. CraftRume 2.0 is designed to be a soft, squishy, and deeply reassuring companion on your career journey.
        </p>

        {/* Big Banner Card with 3D Clay Illustration */}
        <div className={`w-full rounded-[2.5rem] p-6 sm:p-10 relative overflow-hidden transition-all duration-500 animate-textFade-delay-3 ${
          isDarkMode ? 'medium-box-shadow-black bg-[#212121]' : 'white medium-box-shadow'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="md:col-span-5 text-left space-y-3 z-10">
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                About - <br />
                CraftRume 2.0
              </h2>
              <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                Welcome to the studio behind formatting your world, one piece at a time.
              </p>
            </div>

            {/* Right Banner Image */}
            <div className="md:col-span-7 rounded-3xl overflow-hidden max-h-[260px] sm:max-h-[300px]">
              <img 
                src={firstAboutImg} 
                alt="About CraftRume 2.0" 
                className="w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

      </section>

      {/* ================= 2. OUR MISSION SECTION ================= */}
      <section className="w-full max-w-5xl mx-auto mb-16 sm:mb-20 animate-fadeIn">
        
        {/* Section Heading */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8 text-left">
          <Rocket className="w-6 h-6 text-[#534DB4] dark:text-[#A5B4FC]" />
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Our Mission
          </h2>
        </div>

        {/* Mission Content 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Card */}
          <div className={`md:col-span-7 rounded-[2.5rem] p-8 sm:p-10 text-left space-y-4 transition-all duration-500 ${
            isDarkMode ? 'medium-box-shadow-black bg-[#212121]' : 'white medium-box-shadow'
          }`}>
            <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#534DB4]'}`}>
              Taking the ‘Ugh’ out of Updates
            </h3>
            
            <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Let’s face it: traditional resume builders are rigid, sterile, and stressful. They look like tax forms and feel just as fun to fill out. Our mission was to flip that paradigm entirely. What if adjusting your margins felt as satisfying as popping bubble wrap? What if choosing a color scheme felt like picking out candy?
            </p>
            
            <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              By wrapping robust, professional formatting tools in a playful, toy-like interface, we aim to reduce application anxiety and help your true personality shine through the rigid structures of the corporate world.
            </p>
          </div>

          {/* Right 3D Character Illustration Card */}
          <div className="md:col-span-5 rounded-[2.5rem] overflow-hidden p-2 bg-[#D1FAE5] circle-box-shadow flex items-center justify-center">
            <img 
              src={secondAboutImg} 
              alt="CraftRume 3D Character" 
              className="w-full h-auto rounded-[2rem] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

        </div>

      </section>

      {/* ================= 3. THE CLAY STORY SECTION ================= */}
      <section className="w-full max-w-5xl mx-auto mb-16 sm:mb-20 animate-fadeIn">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            The Clay Story
          </h2>
          <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
            Why does everything look so... squishy? It’s not just an aesthetic; it’s a carefully considered psychological choice.
          </p>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Pillar 1: Tactile Joy */}
          <div className={`rounded-[2.5rem] p-8 text-left space-y-4 transition-all duration-500 hover:scale-105 cursor-pointer ${
            isDarkMode ? 'medium-box-shadow-black bg-[#212121]' : 'white medium-box-shadow'
          }`}>
            <div className="w-12 h-12 rounded-full bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center circle-box-shadow">
              <Pointer className="w-6 h-6" />
            </div>
            <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Tactile Joy
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              The double inner shadows simulate physical volume. Buttons look like they want to be pressed. This tactile feedback loop makes the digital experience feel grounded and satisfying.
            </p>
          </div>

          {/* Pillar 2: Approachable Form */}
          <div className={`rounded-[2.5rem] p-8 text-left space-y-4 transition-all duration-500 hover:scale-105 cursor-pointer ${
            isDarkMode ? 'medium-box-shadow-black bg-[#212121]' : 'white medium-box-shadow'
          }`}>
            <div className="w-12 h-12 rounded-full bg-[#FCE7F3] text-[#DB2777] flex items-center justify-center circle-box-shadow">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Approachable Form
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              By eliminating sharp corners and harsh borders, we remove visual aggression. The soft, pillowy forms communicate safety, encouraging experimentation without fear of breaking things.
            </p>
          </div>

          {/* Pillar 3: Stress-Free Building */}
          <div className={`rounded-[2.5rem] p-8 text-left space-y-4 transition-all duration-500 hover:scale-105 cursor-pointer ${
            isDarkMode ? 'medium-box-shadow-black bg-[#212121]' : 'white medium-box-shadow'
          }`}>
            <div className="w-12 h-12 rounded-full bg-[#D1FAE5] text-[#047857] flex items-center justify-center circle-box-shadow">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Stress-Free Building
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Job hunting is stressful enough. The matte textures and pastel palettes act as a visual palate cleanser, lowering cognitive load and keeping you calm while you craft your story.
            </p>
          </div>

        </div>

      </section>

      {/* ================= 4. CLAY BANNER SECTION WITH PILL FRAME BORDER ================= */}
      <section className={`w-full max-w-5xl mx-auto mb-16 rounded-[3rem] p-3 sm:p-4 border-4 sm:border-[6px] transition-all duration-500 animate-fadeIn ${
        isDarkMode 
          ? 'medium-box-shadow-black ' 
          : 'white circle-box-shadow border-white'
      }`}>
        <div className="w-full rounded-[2.2rem] overflow-hidden">
          <img 
            src={thirdAboutImg} 
            alt="CraftRume 3D Clay Banner" 
            className="w-full max-h-[300px] sm:max-h-[340px] object-cover rounded-[2.2rem] hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className={`w-full max-w-5xl mx-auto pt-8 pb-6 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-sm mt-auto transition-colors duration-300 ${
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

export default About;
