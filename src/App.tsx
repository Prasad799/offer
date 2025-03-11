import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import HomeContent from './components/HomeContent';
import TermsContent from './components/TermsContent';
import AboutContent from './components/AboutContent';
import ContactContent from './components/ContactContent';
import UploadCard from './components/UploadCard';
import TermsCard from './components/TermsCard';
import Login from './components/Login';
import Footer from './components/Footer';
import UserModal from './components/UserModal';

interface User {
  _id: string;
  file_url: string;
  email: string;
  password: string;
  name: string;
  uploadedAt: string;
  createdAt: string;
  __v: number;
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showTermsCard, setShowTermsCard] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBgvActive, setIsBgvActive] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const fileInputRef = useRef(null);
   
  const [user, setUser] = useState<User | null>(null);
  const handleLogin = (data: User) => {
    // Handle login logic here
    console.log('Logged in successfully!');
    setUser(data)
    setShowUserModal(true);
    console.log(data)
    setCurrentPage('home');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <HomeContent />
            {showTermsCard && !termsAccepted && (
              <TermsCard
                showTermsCard={showTermsCard}
                setShowTermsCard={setShowTermsCard}
                setTermsAccepted={setTermsAccepted}
              />
            )}
          </div>
        );
      case 'terms':
        return <TermsContent />;
      case 'about':
        return <AboutContent />;
      case 'contact':
        return <ContactContent />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'upload':
        return (
          <UploadCard
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            uploadSuccess={uploadSuccess}
            setUploadSuccess={setUploadSuccess}
            fileInputRef={fileInputRef}
           
          />
        );
      default:
        return (
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setShowTermsCard={setShowTermsCard}
        setTermsAccepted={setTermsAccepted}
        isBgvActive={isBgvActive}
        setIsBgvActive={setIsBgvActive}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-32">
        {renderContent()}
      </div>

      <Footer />
      <UserModal user={user} showUserModal={showUserModal} setShowUserModal={setShowUserModal} />
    </div>
  );
};

export default App;
