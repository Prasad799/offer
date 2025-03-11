import React, { useState, useEffect } from 'react';
import NavButton from './NavButton';
import { Menu, Home, FileText, Info, Mail } from 'lucide-react';

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen, setShowTermsCard, setTermsAccepted, isBgvActive, setIsBgvActive, setCurrentPage }) => {
  useEffect(() => {
    // Check if the current path is '/Admin123'
    if (window.location.pathname === '/Admin/12f1c4a3-5b67-4d92-a8c3-9f1c8e60a92e') {
      setIsBgvActive(true);
      // setCurrentPage('upload');
    } else {
      setIsBgvActive(false);
    }
  }, [setIsBgvActive, setCurrentPage]);
const [is_upload,setis_upload]=useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-lg shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
              alt="IBM Logo"
              className="h-6 sm:h-8 w-auto mr-4"
            />
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {!isBgvActive && (
                <>
                  <NavButton page="home" icon={Home} setCurrentPage={setCurrentPage} />
                  <NavButton page="terms" icon={FileText} setCurrentPage={setCurrentPage} />
                  <NavButton page="about" icon={Info} setCurrentPage={setCurrentPage} />
                  <NavButton page="contact" icon={Mail} setCurrentPage={setCurrentPage} />
                  <button
                    onClick={() => setCurrentPage('login')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    IBM-OFFER
                  </button>
                </>
              )}
              {/* {isBgvActive && ( */}
                <button
                  onClick={() => {
              
                    setCurrentPage('upload');
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  IBM-BGV
                </button>
              {/* )} */}
            </div>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/80 shadow-lg hover:bg-white/90 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white/80 backdrop-blur-lg`}>
        <div className="px-4 pt-2 pb-4 space-y-2">
          {!isBgvActive && (
            <>
              <NavButton page="home" icon={Home} setCurrentPage={setCurrentPage} />
              <NavButton page="terms" icon={FileText} setCurrentPage={setCurrentPage} />
              <NavButton page="about" icon={Info} setCurrentPage={setCurrentPage} />
              <NavButton page="contact" icon={Mail} setCurrentPage={setCurrentPage} />
              <button
                onClick={() => setCurrentPage('login')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                IBM-OFFER
              </button>
            </>
          )}
          {isBgvActive && (
            <button
              onClick={() => {
                setShowTermsCard(false);
                setTermsAccepted(true);
                setCurrentPage('upload');
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              IBM-BGV
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
