'use client';
import { useState } from 'react';
import { api } from '../api';
import PopUp from '../components/PopUp';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home() {
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [smtpHost, setSmtpHost] = useState('smtp.');
  const [smtpPort, setSmtpPort] = useState('465');
  const [messagesPerDay, setMessagesPerDay] = useState(200);
  const [minimumTimeGap, setMinimumTimeGap] = useState(20);
  const [showReplyTo, setShowReplyTo] = useState(false);
  const [replyToAddress, setReplyToAddress] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // imap settings
  const [useDifferentEmailForIMAP, setUseDifferentEmailForIMAP] =
    useState(false);
  const [imapUserName, setImapUserName] = useState('');
  const [imapPassword, setImapPassword] = useState('');
  const [imapHost, setImapHost] = useState('imap.');
  const [imapPort, setImapPort] = useState('465');

  // pop up
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [popUpType, setPopUpType] = useState<'success' | 'error'>('success');
  const handleShowPopUp = () => {
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  // loading
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: { preventDefault: () => void }, trigger: string) => {
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
    if (!minimumTimeGap) {
      validationErrors.minimumTimeGap = 'Minimum Time Gap is required';
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

    if (!emailRegex.test(fromEmail)) {
      validationErrors.fromEmail = 'From Email is invalid';
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
      minimumTimeGap,
      replyToAddress,
      imapUserName,
      imapPassword,
      imapHost,
      imapPort,
    };

    try {
      setIsLoading(true);
      const response = await api.post(trigger === 'submit' ? 'email-account' : 'email-account/verify', {
        ...formData,
      });

      if (response.data.statusCode === 200) {
        setIsLoading(false);
        // Form data saved successfully
        console.log('Form data saved');
        // Reset form fields
        // Reset form fields
        if (trigger === 'submit') {
          setFromName('');
          setFromEmail('');
          setUserName('');
          setPassword('');
          setSmtpHost('smtp.');
          setSmtpPort('');
          setMessagesPerDay(0);
          setMinimumTimeGap(0);
          setShowReplyTo(false);
          setReplyToAddress('');
          // imap settings
          setUseDifferentEmailForIMAP(false);
          setImapUserName('');
          setImapPassword('');
          setImapHost('imap.');
          setImapPort('');

          // show success popup
          setPopUpMessage('Email account added successfully');
          setPopUpType('success');
          handleShowPopUp();
        } else {
          // show success popup
          setPopUpMessage('Email account verified successfully');
          setPopUpType('success');
          handleShowPopUp();
        }
      } else {
        // Handle error response from API
        console.error('Error saving form data', response.data);
        setPopUpMessage(response.data.message 
          || 'Something went wrong');
        setPopUpType('error');
        setIsLoading(false);
        // show error popup
        handleShowPopUp();
      }
    } catch (error: any) {
      // Handle network error
      console.error('Network error', error.response);
      setPopUpMessage(error.response.data.message || 'Something went wrong');
      setIsLoading(false);
      setPopUpType('error');
      // show error popup
      handleShowPopUp();
    }
  };

  const handleCheckboxChange = (e: { target: { checked: boolean } }) => {
    setShowReplyTo(e.target.checked);
  };

  return (
    <div className="flex justify-center items-center">
      {showPopUp && (
        <PopUp message={popUpMessage} type={popUpType} onClose={handleClosePopUp} />
      )}
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
                  value="587"
                  checked={smtpPort === '587'}
                  onChange={(e) => setSmtpPort(e.target.value)}
                />
                TLS
              </label>
              <label>
                <input
                  type="radio"
                  name="smtpPortOption"
                  value="25"
                  checked={smtpPort === '25'}
                  onChange={(e) => setSmtpPort(e.target.value)}
                />
                None
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-2">Messages per Day:</label>
            <input
              type="number"
              value={messagesPerDay}
              onChange={(e) => setMessagesPerDay(parseInt(e.target.value, 10))}
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
              type="number"
              value={minimumTimeGap}
              onChange={(e) => setMinimumTimeGap(parseInt(e.target.value, 10))}
              className={`w-full border rounded py-2 px-3 ${
                errors.minimumTimeGap ? 'border-red-500' : ''
              }`}
            />
            {errors.minimumTimeGap && (
              <p className="text-red-500 text-sm mt-1">
                {errors.minimumTimeGap}
              </p>
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
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.imapHost ? 'border-red-500' : ''
              }`}
              type="text"
              placeholder="IMAP Host"
              value={imapHost}
              onChange={(e) => setImapHost(e.target.value)}
            />
            {errors.imapHost && (
              <p className="text-red-500 text-sm mt-1">{errors.imapHost}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm mb-2">
              IMAP Port
            </label>
            <div className="flex items-center">
              <input
                className={`appearance-none border rounded-l w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.imapPort ? 'border-red-500' : ''
                }`}
                type="text"
                placeholder="IMAP Port"
                value={imapPort}
                onChange={(e) => setImapPort(e.target.value)}
                readOnly
              />
              {errors.imapPort && (
                <p className="text-red-500 text-sm mt-1">{errors.imapPort}</p>
              )}
              <div className="ml-2 flex items-center">
                <input
                  className="mr-1"
                  type="radio"
                  name="imapPort"
                  value="465"
                  checked={imapPort === '465'}
                  onChange={(e) => setImapPort(e.target.value)}
                />
                <span className="text-sm">SSL</span>
              </div>
              <div className="ml-2 flex items-center">
                <input
                  className="mr-1"
                  type="radio"
                  name="imapPort"
                  value="587"
                  checked={imapPort === '587'}
                  onChange={(e) => setImapPort(e.target.value)}
                />
                <span className="text-sm">TLS</span>
              </div>
              <div className="ml-2 flex items-center">
                <input
                  className="mr-1"
                  type="radio"
                  name="imapPort"
                  value="25"
                  checked={imapPort === '25'}
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
          onClick={(e) => handleSubmit(e, 'verify')}
        >
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            'Verify Email'
          )}
        </button>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e, 'submit')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded text-center w-full"
        >
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Save'}
        </button>
        <p className='mt-4'>
        For sending emails, you can go to {' '}  
        <a href='/send-email' className='underline'>
          Send Email
        </a>
      </p>
      </form>

    </div>
  );
}
