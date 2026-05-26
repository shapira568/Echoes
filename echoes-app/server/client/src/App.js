// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import './App.css'

// Features pages
import TextMessages from './pages/TextMessages';
import VoiceMessages from './pages/VoiceMessages';
import AIEnhancement from './pages/AIEnhancement';
import EventTriggers from './pages/EventTriggers';
import LegacyVault from './pages/LegacyVault';

// Resources pages
import Blog from './pages/Blog';
import HelpCenter from './pages/HelpCenter';
import Community from './pages/Community';
import Webinars from './pages/Webinars';
import Api from './pages/Api';

// Company pages
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy'; // Fixed typo

// Pricing pages
import FreePlan from './pages/FreePlan';
import PremiumPlan from './pages/PremiumPlan';
import ProPlan from './pages/ProPlan';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Features */}
          <Route path="/features/text-messages" element={<TextMessages />} />
          <Route path="/features/voice-messages" element={<VoiceMessages />} />
          <Route path="/features/ai-enhancement" element={<AIEnhancement />} />
          <Route path="/features/event-triggers" element={<EventTriggers />} />
          <Route path="/features/legacy-vault" element={<LegacyVault />} />
          
          {/* Resources */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/community" element={<Community />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/api" element={<Api />} />
          
          {/* Company */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Pricing */}
          <Route path="/pricing/free" element={<FreePlan />} />
          <Route path="/pricing/premium" element={<PremiumPlan />} />
          <Route path="/pricing/pro" element={<ProPlan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;                                                  