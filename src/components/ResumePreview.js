import React from 'react';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

function ResumePreview({ formData, sections, sectionTitles = {}, profileImage, variant = 'pdf' }) {
  const divider = <hr className="my-4 border-gray-300" />;

  const IconText = ({ icon, children }) => (
    <div className="flex items-center gap-2 mb-1 text-sm">
      <span className="text-black text-lg">{icon}</span>
      <span className="break-all">{children}</span>
    </div>
  );

  return (
    <div className="text-black text-sm leading-relaxed break-words overflow-hidden">
      {/* Profile */}
      {sections.includes('profile') && (
        <div className="mb-4">
          <div className="flex justify-between items-start gap-4">
            {/* Left: Text Info */}
            <div className="flex-1">
              <p className="text-xl font-bold">{formData.name || 'Your Name'}</p>
              <div className="mt-2 space-y-1">
                {formData.email && (
                  <IconText icon={<HiOutlineMail />}>{formData.email}</IconText>
                )}
                {formData.phone && (
                  <IconText icon={<HiOutlinePhone />}>{formData.phone}</IconText>
                )}
                {formData.linkedin && (
                  <IconText icon={<FaLinkedinIn />}>
                    <a
                      href={formData.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 underline"
                    >
                      {formData.linkedin}
                    </a>
                  </IconText>
                )}
                {formData.github && (
                  <IconText icon={<FaGithub />}>
                    <a
                      href={formData.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 underline"
                    >
                      {formData.github}
                    </a>
                  </IconText>
                )}
              </div>

              {formData.summary && (
                <p className="mt-2 italic text-sm text-gray-700">{formData.summary}</p>
              )}
            </div>

            {/* Right: Image */}
            {profileImage && (
              <div className="shrink-0">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full border"
                />
              </div>
            )}
          </div>
          {divider}
        </div>
      )}

      {/* Education */}
      {sections.includes('education') && formData.education?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">{sectionTitles.education}</h3>
          {formData.education.map((e, i) => (
            <div key={i} className="ml-4 mb-1">
              • <strong>{e.degree}</strong> at {e.school} ({e.startYear} - {e.endYear})
            </div>
          ))}
          {divider}
        </div>
      )}

      {/* Skills */}
      {sections.includes('skills') && formData.skills?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">{sectionTitles.skills}</h3>
          {formData.skills.map((s, i) => (
            <div key={i} className="ml-4 mb-1">
              • {s}
            </div>
          ))}
          {divider}
        </div>
      )}

      {/* Projects */}
      {sections.includes('projects') && formData.projects?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">{sectionTitles.projects}</h3>
          {formData.projects.map((p, i) => (
            <div key={i} className="ml-4 mb-2">
              • <strong>{p.title}</strong>
              {p.description && <div className="ml-4">{p.description}</div>}
            </div>
          ))}
          {divider}
        </div>
      )}

      {/* Certificates */}
      {sections.includes('certificates') && formData.certificates?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">{sectionTitles.certificates}</h3>
          {formData.certificates.map((c, i) => (
            <div key={i} className="ml-4 mb-2">
              • <strong>{c.name}</strong> – {c.issuer} ({c.year})
              {c.description && <div className="ml-4">{c.description}</div>}
            </div>
          ))}
          {divider}
        </div>
      )}

      {/* Languages */}
      {sections.includes('languages') && formData.languages?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">{sectionTitles.languages}</h3>
          {formData.languages.map((lang, i) => (
            <div key={i} className="ml-4 mb-1">
              • {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumePreview;
