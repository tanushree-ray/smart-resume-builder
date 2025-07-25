import React from 'react';
import html2pdf from 'html2pdf.js';

function ExportPDF({ resumeRef }) {
  const handleDownload = () => {
    if (!resumeRef.current) {
      console.error('❌ resumeRef is not attached or visible');
      return;
    }

    const element = resumeRef.current;

    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY,
      },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Download as PDF
    </button>
  );
}

export default ExportPDF;
