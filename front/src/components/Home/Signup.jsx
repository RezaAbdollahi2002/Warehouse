import { useMemo, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api';

const Signup = ({ setSignin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'password'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cleanEmail = useMemo(() => email.trim().toLowerCase(), [email]);

  // Rules:
  // - at least 4 digits
  // - at least 4 letters
  // - at least 1 special character
  // - length >= 8
  const passwordPattern = useMemo(
    () => /^(?=(?:.*\d){4,})(?=(?:.*[A-Za-z]){4,})(?=.*[^A-Za-z0-9]).{8,}$/,
    []
  );

  const setErr = (msg) => {
    setError(msg);
    if (msg) toast.error(msg);
  };

  const forgotLinks = (
    <p className="text-sm">
      Forgot{' '}
      <Link to="/forgot-username-password" className="underline text-blue-500 hover:text-blue-600">
        username
      </Link>{' '}
      or{' '}
      <Link to="/forgot-username-password" className="underline text-blue-500 hover:text-blue-600">
        password
      </Link>
    </p>
  );

  const goToStep = (next) => {
    setError('');
    setStep(next);
  };

  const handleSendOtp = async () => {
    setError('');

    if (!cleanEmail) {
      toast.error('Please enter your email first.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/send-otp', { email: cleanEmail });
      toast.success('OTP sent. Check your email.');
      toast.info('The OTP code is valid for 5 minutes.');
      goToStep('otp');
    } catch (err) {
      const msg = err?.response?.data?.detail || err?.message || 'Failed to send OTP';
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');

    const cleanOtp = otp.trim();
    if (!cleanOtp) {
      toast.error('Please enter the OTP code.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/verify-otp', { email: cleanEmail, otp: cleanOtp });
      toast.success('Email verified ✅');
      goToStep('password');
    } catch (err) {
      const msg = err?.response?.data?.detail || err?.message || 'Invalid OTP';
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!passwordPattern.test(cleanPass)) {
      toast.error('Password does not meet the rules.');
      return;
    }

    setLoading(true);
    try {
      // NOTE: api.js baseURL is '/api', so this becomes POST /api/signup
      await api.post('/signup', { username: cleanEmail, password: cleanPass });

      toast.success(`User ${cleanEmail} created successfully ✅`);
      if (typeof setSignin === 'function') setSignin(true);
      navigate('/entrygate', { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.detail || err?.message || 'Signup failed';
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-start min-h-[70%vh] w-full bg-white shadow-lg rounded-md">
      {/* Best practice: render <ToastContainer /> once in App.jsx */}
      <ToastContainer position="top-right" autoClose={3000} />

      {error ? <p className="text-red-500 mb-2 text-sm">{error}</p> : null}

      {step === 'email' && (
        <div className="flex flex-col px-3 py-3">
          <label className="text-lg my-1 text-gray-800 font-semibold">Username (email)</label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            type="email"
            className="border-blue-50 shadow-xl px-2 py-2 text-gray-800"
            disabled={loading}
          />

          <div className="flex my-6 items-center justify-center">
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full rounded-sm shadow-lg text-lg px-1 py-2 bg-gray-200 font-semibold hover:font-bold hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Send OTP'}
            </button>
          </div>

          <div className="px-3">{forgotLinks}</div>
        </div>
      )}

      {step === 'otp' && (
        <div className="flex flex-col px-3 py-3">
          <div className="flex items-center justify-between">
            <label className="text-lg my-1 text-gray-800 font-semibold">OTP Code</label>

            <button
              type="button"
              onClick={() => goToStep('email')}
              disabled={loading}
              className="text-sm underline text-gray-700 disabled:opacity-60"
            >
              Change email
            </button>
          </div>

          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            inputMode="numeric"
            className="w-full border shadow px-2 py-2 mb-3"
            disabled={loading}
          />

          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full rounded-sm shadow-lg text-lg px-1 py-2 bg-gray-200 font-semibold hover:font-bold hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying…' : 'Verify OTP'}
          </button>

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading}
            className="mt-3 text-sm underline text-blue-500 hover:text-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Resend code
          </button>

          <div className="px-3 mt-6">{forgotLinks}</div>
        </div>
      )}

      {step === 'password' && (
        <form onSubmit={handleSignup} className="flex flex-col px-3 py-3">
          <div className="flex items-center justify-between">
            <label className="mt-2 text-gray-800 text-lg font-semibold">Password</label>

            <button
              type="button"
              onClick={() => goToStep('otp')}
              disabled={loading}
              className="text-sm underline text-gray-700 disabled:opacity-60"
            >
              Back
            </button>
          </div>

          <div className="w-full flex items-center relative">
            <input
              minLength={8}
              maxLength={20}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Resd@344"
              type={visible ? 'text' : 'password'}
              className="border-blue-50 shadow-xl px-2 py-2 mt-1 text-gray-800 w-full pr-10"
              disabled={loading}
            />

            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-800"
              aria-label={visible ? 'Hide password' : 'Show password'}
              disabled={loading}
            >
              {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>

          <div className="mt-3 text-gray-800">
            <p className="text-sm md:text-md font-semibold text-gray-800">Password Rules</p>
            <ul className="flex flex-col gap-y-0.5">
              <li className="text-sm">
                <span className="text-lg font-bold">•</span> At least 4 digits
              </li>
              <li className="text-sm">
                <span className="text-lg font-bold">•</span> At least 4 letters
              </li>
              <li className="text-sm">
                <span className="text-lg font-bold">•</span> At least 1 special character
              </li>
              <li className="text-sm">
                <span className="text-lg font-bold">•</span> Minimum length 8
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="my-6 bg-gray-800 text-white px-3 py-2 w-full hover:bg-gray-600 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating…' : 'Create Account'}
          </button>

          <div className="px-3 pb-6 ">{forgotLinks}</div>
        </form>
      )}
    </div>
  );
};

export default Signup;
