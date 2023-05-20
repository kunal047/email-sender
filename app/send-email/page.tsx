'use client';

import { useState } from 'react';
import { api } from '../../api';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SendEmail() {
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [validationError, setValidationError] = useState('');

  // loading
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSend = async () => {
    if (!toEmail || !subject || !emailBody) {
      setValidationError('Please fill in all fields.');
      return;
    }

    if (!emailRegex.test(toEmail)) {
      setValidationError('To email is not valid.');
      return;
    }

    // Send data to the backend
    const formData = {
      toEmail,
      subject,
      text: emailBody,
    };

    try {
      setIsLoading(true);
      const response = await api.post(
        'email-account/mail',
        {
          ...formData,
        }
      );

      if (response.status === 200) {
        console.log('Email sent successfully');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }

    // Reset form fields
    setToEmail('');
    setSubject('');
    setEmailBody('');
    setValidationError('');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-2/3 bg-white shadow-md rounded px-8 py-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="toEmail"
          >
            To Email Address
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="toEmail"
            type="email"
            placeholder="Enter the email address"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subject"
            type="text"
            placeholder="Enter the subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="emailBody"
          >
            Email Body
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="emailBody"
            rows={5}
            placeholder="Enter the email body"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
          />
        </div>
        {validationError && (
          <p className="text-red-500 mb-4">{validationError}</p>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSend}
          >
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              'Send Email'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
