// components/Modal.js
import React from "react";

const GuestModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-120 ">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GuestModal;