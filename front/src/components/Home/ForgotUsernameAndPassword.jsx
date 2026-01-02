import { useState } from 'react';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotUsernameAndPassword = () => {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [usernameVerified, setUsernameVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Verify Email
  const handleVerifyEmail = async () => {
    setError('');
    if (!username) {
      toast.error('Please enter your email first.');
      return;
    }

    setVerifying(true);
    try {
      await axios.post('/api/send-otp', { email: username });
      toast.success('OTP sent. Check your email.');
    } catch (err) {
      const msg = err?.response?.data?.detail || err.message || 'Failed to send OTP';
      setError(msg);
      toast.error(msg);
      setVerifying(false); // allow retry
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    setError('');
    if (!otp) {
      toast.error('Please enter the OTP code.');
      return;
    }

    try {
      await axios.post('/api/verify-otp', { email: username, otp: otp });
      setUsernameVerified(true);
      toast.success('Email verified ✅');
    } catch (err) {
      const msg = err?.response?.data?.detail || err.message || 'Invalid OTP';
      setError(msg);
      toast.error(msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      console.log(username, password);
      await axios.put('/api/user/forget-password', { username, password });
      toast.success(`${username} and password updated successfully ✅`);
      navigate('/entrygate');
    } catch (err) {
      const msg = err?.response?.data?.detail || err.message || 'Signup failed';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="flex flex-col min-h-screen  w-full bg-gray-800 ">
      <div className='flex flex-col mx-auto my-auto h-auto min-w-[500px] border-2 border-black bg-white rounded-sm shadow-lg'>
        {/* Put this once (App.jsx is even better, but this works) */}
        <ToastContainer position="top-right" autoClose={3000} />

        {error && <p className="text-red-500">{error}</p>}

        {!usernameVerified ? (
          <div className="flex flex-col px-3 py-3 ">
            <label className="text-lg my-1 text-gray-800 font-semibold">Username (email)</label>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="example@gmail.com"
              type="text"
              className="border-blue-50 shadow-xl mt-1 px-1 py-1 text-gray-800"
            />

            <div className="flex my-9 gap-x-2 items-center justify-center">
              {!verifying ? (
                <button
                  type="button"
                  onClick={handleVerifyEmail} // ✅ call correctly
                  className="w-full rounded-sm shadow-lg text-lg px-1 py-2 bg-gray-200 font-semibold hover:font-bold hover:shadow-xl"
                >
                  Verify Email
                </button>
              ) : (
                <div className="w-full">
                  <label className="block mb-1">Code</label>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full border shadow px-2 py-1 mb-2"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOTP} // ✅ call correctly
                    className="w-full rounded-sm shadow-lg text-lg px-1 py-2 bg-gray-200 font-semibold hover:font-bold hover:shadow-xl"
                  >
                    Verify OTP
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col px-3 py-3">
            <label className="mt-2 text-gray-800 text-lg font-semibold">New Password</label>

            <div className="w-full flex items-center">
              <input
                minLength={8}
                maxLength={20}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Resd@344"
                pattern="^(?=(?:.*\d){4,})(?=(?:.*[A-Za-z]){4,})(?=.*[^A-Za-z0-9]).{8,}$"
                type={visible ? 'text' : 'password'}
                className="border-blue-50 shadow-xl px-1 py-1 mt-1 text-gray-800 w-full"
              />
              <AiOutlineEyeInvisible
                onClick={() => setVisible(!visible)}
                className="w-6 h-6 mt-1.5 text-gray-800 -ml-10 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="my-6 bg-gray-800 text-white px-3 py-2 w-full hover:bg-gray-600 shadow-sm"
            >
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotUsernameAndPassword;
