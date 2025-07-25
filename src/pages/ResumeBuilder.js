import React, { useRef, useState } from 'react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import ExportPDF from '../components/ExportPDF';
import SuggestionBox from '../components/SuggestionBox';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';


function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    summary: '',
    education: [],
    skills: [],
    projects: [],
    certificates: [],
    languages: [],
  });

  const [profileImage, setProfileImage] = useState(null);
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

  const resumeRef = useRef();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-purple-50 text-gray-800">
      <header className="bg-purple-300 text-purple-900 shadow p-4 text-center font-bold text-2xl">
        Smart Resume Builder
      </header>

      <main className="flex flex-col md:flex-row p-4 gap-6 flex-grow">
        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-700">Resume Input</h2>
            <button
              onClick={() => navigate('/customize')}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Customize
            </button>
          </div>

          <ResumeForm
            formData={formData}
            setFormData={setFormData}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-700">Live Preview</h2>
          </div>

          <div
            ref={resumeRef}
            className="bg-white p-4 shadow rounded border border-purple-200"
          >
            <ResumePreview
              formData={formData}
              sections={sectionOrder}
              sectionTitles={sectionTitles}
              profileImage={profileImage}
              variant="pdf"
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <SuggestionBox formData={formData} />
            <ExportPDF resumeRef={resumeRef} />
          </div>
        </div>
      </main>

      <footer className="bg-purple-300 text-center p-3 text-sm text-purple-900">
        © {new Date().getFullYear()} Smart Resume Builder by Tanushree Ray
      </footer>
    </div>
  );
}

export default ResumeBuilder;
