import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => (
  <footer className="bg-white/60 backdrop-blur-lg border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div className="col-span-2 sm:col-span-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
            alt="IBM Logo"
            className="h-6 sm:h-8 w-auto mb-4"
          />
          <p className="text-xs sm:text-sm text-gray-600">
            Empowering innovation through technology and expertise.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">About Us</a></li>
            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">Careers</a></li>
            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">Partners</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">Documentation</a></li>
            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">Support</a></li>
            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">Blog</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Connect</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100">
        <p className="text-xs sm:text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} IBM. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
