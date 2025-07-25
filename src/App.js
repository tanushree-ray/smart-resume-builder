import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumeBuilder from './pages/ResumeBuilder';
import CustomizeSections from './pages/CustomizeSections';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    linkedin: '',
    github: '',
    education: [{ school: '', degree: '', startYear: '', endYear: '' }],
    skills: [''],
    projects: [{ title: '', description: '' }],
    certificates: [{ name: '', issuer: '', year: '', description: '' }],
    languages: [''],
  });

  const [sectionOrder, setSectionOrder] = useState([
    'profile',
    'education',
    'skills',
    'projects',
    'certificates',
    'languages',
  ]);

  const [sectionTitles, setSectionTitles] = useState({
    profile: 'Profile',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    certificates: 'Certificates',
    languages: 'Languages',
  });

  const [profileImage, setProfileImage] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ResumeBuilder
              formData={formData}
              setFormData={setFormData}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              sectionOrder={sectionOrder}
              sectionTitles={sectionTitles}
            />
          }
        />
        <Route
          path="/customize"
          element={
            <CustomizeSections
              sectionOrder={sectionOrder}
              setSectionOrder={setSectionOrder}
              sectionTitles={sectionTitles}
              setSectionTitles={setSectionTitles}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
