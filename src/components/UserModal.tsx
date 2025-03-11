import React from 'react';

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

interface UserModalProps {
  user: User | null;
  showUserModal: boolean;
  setShowUserModal: (show: boolean) => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, showUserModal, setShowUserModal }) => {
  if (!showUserModal || !user || !user.file_url) return null;

  return (
   <div
  style={{
    animation: 'fadeIn 0.5s ease-out',
  }}
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
  <div
    style={{
      animation: 'slideDown 0.5s ease-out',
      maxHeight: 'calc(100vh - 1rem)', // Increased the height
      height: 'auto', // Allow the modal to expand
    }}
    className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 overflow-y-auto"
  >
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-3xl font-semibold">Welcome, {user.name}</h3>
      <button
        onClick={() => setShowUserModal(false)}
        className="text-gray-500 hover:text-gray-700"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <div className="mt-8">
      <a
        href={user.file_url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#006699] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-4 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span>Download Offer Letter</span>
      </a>
    </div>
  </div>
</div>

  );
};

export default UserModal;
