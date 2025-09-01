import React from 'react'

export default function ImageModal({preview, onAccept, onDecline}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Image Uploaded
          </h3>
          <button
            onClick={onDecline}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex justify-center">
          {preview && <img src={preview} alt="Preview" className="max-h-80 rounded-lg" />}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t dark:border-gray-600">
          <button
            onClick={onAccept}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Accept
          </button>
          <button
            onClick={onDecline}
            className="px-5 py-2.5 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
