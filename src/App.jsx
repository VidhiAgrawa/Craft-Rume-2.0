import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Templete from './Components/Templete';
import Requirement from './Components/Requirement';
import About from './Components/About';
import DownloadPage from './Components/Download';
import Final from './Components/Final';
import Parse, { Refine } from './Components/Editing';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [downloadedFiles, setDownloadedFiles] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('Sebastian Bennett');
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('craftrume_user');
      return saved ? JSON.parse(saved) : { name: 'User' };
    } catch {
      return { name: 'User' };
    }
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('craftrume_user');
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addDownloadedFile = (fileData) => {
    setDownloadedFiles((prev) => {
      const now = Date.now();
      // Deduplicate: Don't add if an identical file was added within 3 seconds
      const isDuplicate = prev.some(
        (f) => f.name === fileData.name && now - f.id < 3000
      );
      if (isDuplicate) return prev;

      const newFile = {
        id: now,
        name: fileData.name || 'CraftRume_3D_Resume.pdf',
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        template: fileData.template || selectedTemplate,
        size: '1.2 MB',
        ...fileData,
      };
      return [newFile, ...prev];
    });
  };

  return (
    <Router>
      <div className="w-full min-h-screen flex flex-col items-center transition-colors duration-500">
        {/* Persistent Sticky Navbar */}
        <Navbar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          downloadedFiles={downloadedFiles}
          user={user}
          onLogout={handleLogout}
        />

        {/* Dynamic Route Pages */}
        <main className="flex-1 w-full flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/home" element={<Home isDarkMode={isDarkMode} />} />
            <Route
              path="/templates"
              element={
                <Templete
                  isDarkMode={isDarkMode}
                  onSelectTemplate={(tpl) => setSelectedTemplate(tpl)}
                />
              }
            />
            <Route
              path="/requirements"
              element={
                <Requirement
                  isDarkMode={isDarkMode}
                  selectedTemplate={selectedTemplate}
                  onAddDownload={addDownloadedFile}
                />
              }
            />
            <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
            <Route path="/parse" element={<Parse isDarkMode={isDarkMode} />} />
            <Route path="/refine" element={<Refine isDarkMode={isDarkMode} />} />
            <Route
              path="/download"
              element={
                <DownloadPage
                  isDarkMode={isDarkMode}
                  downloadedFiles={downloadedFiles}
                />
              }
            />
            <Route
              path="/final"
              element={
                <Final
                  isDarkMode={isDarkMode}
                  downloadedFiles={downloadedFiles}
                />
              }
            />
            <Route
              path="/auth"
              element={<Navigate to="/templates" replace />}
            />
            <Route
              path="/login"
              element={<Navigate to="/templates" replace />}
            />
            <Route path="*" element={<Home isDarkMode={isDarkMode} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
