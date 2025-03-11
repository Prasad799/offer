import React from 'react';

const TermsContent = () => (
  <div className="w-full max-w-3xl p-4 sm:p-8 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl animate-fade-in">
    <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-black">
      Terms of Service
    </h1>
    <div className="prose prose-black max-w-none">
      <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
        By using our service, you agree to these terms. We reserve the right to modify these terms
        at any time. Please read these terms carefully before using our services. These terms
        govern your use of our website and services. If you do not agree with any part of these
        terms, you may not use our services.
      </p>
    </div>
  </div>
);

export default TermsContent;
