 


import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, files }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Uploaded Files</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>
        <ul className="space-y-4">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{file.name}</span>
              <div className="space-x-2">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Preview
                </a>
                <a
                  href={file.url}
                  download={file.name}
                  className="text-green-500 hover:text-green-700 text-sm"
                >
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;