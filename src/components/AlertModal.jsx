// components/AlertModal.js
import React from "react";

const AlertModal = ({ isOpen, onClose, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <p className="text-lg font-semibold text-gray-800">{message}</p>
        <div className="mt-4 flex justify-end space-x-4">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Confirm
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;