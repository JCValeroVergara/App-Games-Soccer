import React, { useEffect, useState } from 'react';
import { CheckOk, Close } from '../icons';

const SuccesfullRegisterToast = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      {isVisible && (
        <div className="fixed top-0 left-0 z-50 w-full h-24 flex items-center justify-center">
          <div
            className="flex items-center w-full max-w-md h-12 p-4 mb-4 text-gray-500 border border-green-100 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <CheckOk className="w-4 h-4" />
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ml-3 text-sm font-medium text-green-600">
              {message}
            </div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => {
                setIsVisible(false);
                onClose();
              }}
            >
              <span className="sr-only">Close</span>
              <Close className="w-3 h-3  text-red-500" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccesfullRegisterToast;
