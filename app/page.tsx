'use client';
import { useState } from 'react';

export default function Home() {
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState('');
  const [messagesPerDay, setMessagesPerDay] = useState('');
  const [minTimeGap, setMinTimeGap] = useState('');
  const [showReplyTo, setShowReplyTo] = useState(false);
  const [replyToAddress, setReplyToAddress] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // imap settings
  const [useDifferentEmailForIMAP, setUseDifferentEmailForIMAP] =
    useState(false);
  const [imapUserName, setImapUserName] = useState('');
  const [imapPassword, setImapPassword] = useState('');
  const [imapHost, setImapHost] = useState('');
  const [imapPort, setImapPort] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Form validation
    const validationErrors: Record<string, string> = {};
    if (!fromName) {
      validationErrors.fromName = 'From Name is required';
    }
    if (!fromEmail) {
      validationErrors.fromEmail = 'From Email is required';
    }
    if (!userName) {
      validationErrors.userName = 'User Name is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }
    if (!smtpHost) {
      validationErrors.smtpHost = 'SMTP Host is required';
    }
    if (!smtpPort) {
      validationErrors.smtpPort = 'SMTP Port is required';
    }
    if (!messagesPerDay) {
      validationErrors.messagesPerDay = 'Messages per Day is required';
    }
    if (!minTimeGap) {
      validationErrors.minTimeGap = 'Minimum Time Gap is required';
    }
    if (showReplyTo && !replyToAddress) {
      validationErrors.replyToAddress = 'Reply To Address is required';
    }

    if (useDifferentEmailForIMAP && !imapUserName) {
      validationErrors.imapUserName = 'IMAP User Name is required';
    }

    if (useDifferentEmailForIMAP && !imapPassword) {
      validationErrors.imapPassword = 'IMAP Password is required';
    }

    if (!imapHost) {
      validationErrors.imapHost = 'IMAP Host is required';
    }

    if (!imapPort) {
      validationErrors.imapPort = 'IMAP Port is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = {
      fromName,
      fromEmail,
      userName,
      password,
      smtpHost,
      smtpPort,
      messagesPerDay,
      minTimeGap,
      replyToAddress,
      imapUserName,
      imapPassword,
      imapHost,
      imapPort,
    };

    try {
      const response = await fetch('/api/email-accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Form data saved successfully
        console.log('Form data saved');
        // Reset form fields
        setFromName('');
        setFromEmail('');
        // ... reset other form fields
      } else {
        // Handle error response from API
        console.error('Error saving form data');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error', error);
    }

    // Reset form fields
    setFromName('');
    setFromEmail('');
    setUserName('');
    setPassword('');
    setSmtpHost('');
    setSmtpPort('');
    setMessagesPerDay('');
    setMinTimeGap('');
    setShowReplyTo(false);
    setReplyToAddress('');
    // imap settings
    setUseDifferentEmailForIMAP(false);
    setImapUserName('');
    setImapPassword('');
    setImapHost('');
    setImapPort('');
  };

  const handleCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowReplyTo(e.target.checked);
  };

  return (
    <div className="flex justify-center items-center">
      <form className="w-2/3 p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">SMTP Settings</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">From Name:</label>
            <input
              type="text"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              className={`w-full border rounded py-2 px-3 ${
                errors.fromName ? 'border-red-500' : ''
              }`}
            />
            {errors.fromName && (
              <p className="text-red-500 text-sm mt-1">{errors.fromName}</p>
            )}
          </div>
          <div>
            <label className="block mb-2">From Email:</label>
            <input
              type="email"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              className={`w-full border rounded py-2 px-3 ${
                errors.fromEmail ? 'border-red-500' : ''
              }`}
            />
            {errors.fromEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.fromEmail}</p>
            )}
          </div>
          <div>
            <label className="block mb-2">User Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={`w-full border rounded py-2 px-3 ${
                errors.userName ? 'border-red-500' : ''
              }`}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>
          <div>
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border rounded py-2 px-3 ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block mb-2">SMTP Host:</label>
            <input
              type="text"
              value={smtpHost}
              onChange={(e) => setSmtpHost(e.target.value)}
              className={`w-full border rounded py-2 px-3 ${
                errors.smtpHost ? 'border-red-500' : ''
              }`}
            />
            {errors.smtpHost && (
              <p className="text-red-500 text-sm mt-1">{errors.smtpHost}</p>
            )}
          </div>
          <div className="mr-4 flex items-center">
            <label className="block mb-2">SMTP Port:</label>
            <input
              type="text"
              readOnly
              value={smtpPort}
              onChange={(e) => setSmtpPort(e.target.value)}
              className={`w-24 border rounded py-2 px-3 ${
                errors.smtpPort ? 'border-red-500' : ''
              }`}
            />
            {errors.smtpPort && (
              <p className="text-red-500 text-sm mt-1">{errors.smtpPort}</p>
            )}
            <div className="flex ml-4">
              <label className="mr-4">
                <input
                  type="radio"
                  name="smtpPortOption"
                  value="465"
                  checked={smtpPort === '465'}
                  onChange={(e) => setSmtpPort(e.target.value)}
                />
                SSL
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="smtpPortOption"
                  value="993"
                  checked={smtpPort === '993'}
                  onChange={(e) => setSmtpPort(e.target.value)}
                />
                TLS
              </label>
              <label>
                <input
                  type="radio"
                  name="smtpPortOption"
                  value="0"
                  checked={smtpPort === '0'}
                  onChange={(e) => setSmtpPort(e.target.value)}
                />
                None
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-2">Messages per Day:</label>
            <input
              type="text"
              value={messagesPerDay}
              onChange={(e) => setMessagesPerDay(e.target.value)}
              className={`w-full border rounded py-2 px-3 ${
                errors.messagesPerDay ? 'border-red-500' : ''
              }`}
            />
            {errors.messagesPerDay && (
              <p className="text-red-500 text-sm mt-1">
                {errors.messagesPerDay}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2">Minimum Time Gap:</label>
            <input
              type="text"
              value={minTimeGap}
              onChange={(e) => setMinTimeGap(e.target.value)}
              className={`w-full border rounded py-2 px-3 ${
                errors.minTimeGap ? 'border-red-500' : ''
              }`}
            />
            {errors.minTimeGap && (
              <p className="text-red-500 text-sm mt-1">{errors.minTimeGap}</p>
            )}
          </div>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={showReplyTo}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="replyToCheckbox">
              Set a different reply to address
            </label>
          </div>
          {showReplyTo && (
            <div className="mt-4">
              <label className="block mb-2">Reply To Address:</label>
              <input
                type="email"
                value={replyToAddress}
                onChange={(e) => setReplyToAddress(e.target.value)}
                className={`w-full border rounded py-2 px-3 ${
                  errors.replyToAddress ? 'border-red-500' : ''
                }`}
              />
              {errors.replyToAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.replyToAddress}
                </p>
              )}
            </div>
          )}
        </div>

        {/* IMAP Settings */}
        <h1 className="text-2xl font-bold mb-4 mt-8">IMAP Settings</h1>
        <div className="mb-4">
          <input
            className="mr-2 leading-tight"
            type="checkbox"
            checked={useDifferentEmailForIMAP}
            onChange={(e) => setUseDifferentEmailForIMAP(e.target.checked)}
          />
          <span className="text-gray-700">
            Use different email accounts for receiving emails
          </span>
        </div>

        {useDifferentEmailForIMAP && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                IMAP User Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="IMAP User Name"
                value={imapUserName}
                onChange={(e) => setImapUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                IMAP Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="IMAP Password"
                value={imapPassword}
                onChange={(e) => setImapPassword(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="flex mt-4">
          <div className="w-1/2 mr-4">
            <label className="block text-gray-700 text-sm mb-2">
              IMAP Host
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="IMAP Host"
              value={imapHost}
              onChange={(e) => setImapHost(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm mb-2">
              IMAP Port
            </label>
            <div className="flex items-center">
              <input
                className="appearance-none border rounded-l w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="IMAP Port"
                value={imapPort}
                onChange={(e) => setImapPort(e.target.value)}
                readOnly
              />
              <div className="ml-2 flex items-center">
                <input
                  className="mr-1"
                  type="radio"
                  name="imapPort"
                  value="465"
                  onChange={(e) => setImapPort(e.target.value)}
                />
                <span className="text-sm">SSL</span>
              </div>
              <div className="ml-2 flex items-center">
                <input
                  className="mr-1"
                  type="radio"
                  name="imapPort"
                  value="993"
                  onChange={(e) => setImapPort(e.target.value)}
                />
                <span className="text-sm">TLS</span>
              </div>
              <div className="ml-2 flex items-center">
                <input
                  className="mr-1"
                  type="radio"
                  name="imapPort"
                  value="0"
                  onChange={(e) => setImapPort(e.target.value)}
                />
                <span className="text-sm">None</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verify Email button */}

        <button
          className="mt-4 w-full bg-gray-500 text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Verify Email
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded text-center w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}
