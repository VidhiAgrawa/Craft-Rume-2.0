import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, User as UserIcon, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const Auth = ({ isDarkMode, user, setUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: user ? user.email : '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage('Please enter both email and password.');
      return;
    }

    const userData = {
      name: isLogin ? (formData.email.split('@')[0] || 'User') : (formData.name || 'User'),
      email: formData.email,
    };

    if (setUser) setUser(userData);
    localStorage.setItem('craftrume_user', JSON.stringify(userData));

    setMessage(isLogin ? 'Successfully logged in! Redirecting to templates...' : 'Account created successfully! Redirecting...');
    
    setTimeout(() => {
      navigate('/templates');
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col items-center min-h-[calc(100vh-100px)] px-4 py-12 transition-colors duration-500">
      
      {/* Auth Card Container */}
      <div className={`w-full max-w-md rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 text-left relative ${
        isDarkMode
          ? 'medium-box-shadow-black bg-[#212121] text-white'
          : 'white medium-box-shadow text-slate-800'
      }`}>
        
        {/* Toggle Login / Signup Header Tabs */}
        <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-full mb-8 border border-slate-200/80 dark:border-slate-700/80">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setMessage(''); }}
            className={`flex-1 py-2.5 rounded-full font-bold text-xs transition-all duration-300 cursor-pointer text-center ${
              isLogin
                ? isDarkMode
                  ? 'bg-[#534DB4] text-white shadow-md'
                  : 'white small-box-shadow text-[#534DB4]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Log In
          </button>

          <button
            type="button"
            onClick={() => { setIsLogin(false); setMessage(''); }}
            className={`flex-1 py-2.5 rounded-full font-bold text-xs transition-all duration-300 cursor-pointer text-center ${
              !isLogin
                ? isDarkMode
                  ? 'bg-[#534DB4] text-white shadow-md'
                  : 'white small-box-shadow text-[#534DB4]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-[#534DB4]'
          }`}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isLogin ? 'Sign in to access and manage your 3D resumes' : 'Join CraftRume 2.0 to save and build your resumes'}
          </p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-4 py-3 rounded-2xl mb-6 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <div className="relative flex items-center">
                <UserIcon className="w-4 h-4 absolute left-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className={`w-full rounded-2xl pl-11 pr-4 py-3 text-sm font-medium transition-all ${
                    isDarkMode
                      ? 'bg-slate-800/90 text-white placeholder-slate-500 border border-slate-700 focus:border-[#A5B4FC]'
                      : 'bg-slate-50/90 text-slate-800 placeholder-slate-400 border border-slate-200/80 focus:border-[#534DB4] shadow-inner'
                  }`}
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 absolute left-4 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                className={`w-full rounded-2xl pl-11 pr-4 py-3 text-sm font-medium transition-all ${
                  isDarkMode
                    ? 'bg-slate-800/90 text-white placeholder-slate-500 border border-slate-700 focus:border-[#A5B4FC]'
                    : 'bg-slate-50/90 text-slate-800 placeholder-slate-400 border border-slate-200/80 focus:border-[#534DB4] shadow-inner'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-4 text-slate-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className={`w-full rounded-2xl pl-11 pr-4 py-3 text-sm font-medium transition-all ${
                  isDarkMode
                    ? 'bg-slate-800/90 text-white placeholder-slate-500 border border-slate-700 focus:border-[#A5B4FC]'
                    : 'bg-slate-50/90 text-slate-800 placeholder-slate-400 border border-slate-200/80 focus:border-[#534DB4] shadow-inner'
                }`}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 darker-blue small-box-shadow text-white font-bold text-sm py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Secure 256-bit encrypted session</span>
        </div>

      </div>

    </div>
  );
};

export default Auth;
