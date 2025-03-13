import React from 'react';

const Modal = ({ title, body, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg w-96">
    
        <div className="flex justify-between items-center border-b border-gray-600 pb-2">
          <h2 className="text-white text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition text-2xl"
          >
            ✖
          </button>
        </div>

        <div className="text-gray-300 mt-4">{body}</div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
