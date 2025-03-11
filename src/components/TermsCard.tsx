// TermsCard.tsx
import React from 'react';
import { Shield, X } from 'lucide-react';

const TermsCard = ({ showTermsCard, setShowTermsCard, setTermsAccepted, setCurrentPage }) => (
  <div className="w-full max-w-[384px] bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-8 animate-scale-in">
    <button
      onClick={() => setShowTermsCard(false)}
      className="absolute right-3 sm:right-4 top-3 sm:top-4 text-gray-400 hover:text-gray-600 transition-colors"
    >
      <X className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
    <div className="flex flex-col items-center">
      <div className="bg-[#006699] p-3 sm:p-4 rounded-2xl shadow-lg">
        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </div>
      <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-gray-900 text-center">
        Accept Terms of Service
      </h2>
      <p className="mt-3 sm:mt-4 text-center text-sm sm:text-base text-gray-600">
        Please accept our Terms of Service to continue using our platform
      </p>
      <div className="mt-6 sm:mt-8 flex flex-col w-full gap-3 sm:gap-4">
        <button
          onClick={() => {
            setShowTermsCard(false);
            setTermsAccepted(true);
          }}
          className="w-full bg-[#006699] text-white text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 rounded-xl
            hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
        >
          Accept Terms
        </button>
        <button
          onClick={() => {
            setCurrentPage('terms');
            setShowTermsCard(false);
          }}
          className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          View Terms
        </button>
      </div>
    </div>
  </div>
);

export default TermsCard;
