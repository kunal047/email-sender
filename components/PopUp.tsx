'use client';
import React from 'react';

interface PopUpProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
}

export default function PopUp({ message, type, onClose }: PopUpProps) {
  const getTypeClass = () => {
    if (type === 'error') {
      return 'text-red-500';
    } else if (type === 'success') {
      return 'text-green-500';
    }
    return 'text-gray-500';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-white text-black p-6 rounded-lg shadow-lg"
        role="alert"
        style={{ width: '600px' }}
      >
        <div className={`font-bold text-xl mb-2 ${getTypeClass()}`}>
          {type === 'error' ? 'Failure' : 'Success'}
        </div>
        <div className="text-sm">{message}</div>
        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
