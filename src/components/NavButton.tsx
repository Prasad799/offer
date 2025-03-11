import React from 'react';

const NavButton = ({ page, icon: Icon, setCurrentPage }) => (
  <button
    onClick={() => setCurrentPage(page)}
    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm sm:text-base transition-all duration-300
      ${page === window.location.pathname.slice(1) || (page === 'home' && window.location.pathname === '/')
        ? 'bg-white/80 text-gray-900 shadow-md'
        : 'text-gray-600 hover:bg-white/40 hover:text-gray-900'
      }`}
  >
    <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
    <span className="font-medium capitalize">{page}</span>
  </button>
);

export default NavButton;
