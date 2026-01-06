import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotUsernameAndPassword = () => {
  const navigate = useNavigate();

  // form state
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // flow: email -> otp -> reset
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'reset'

  // ui state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email]);

  const safeSetState = (fn) => {
    if (mountedRef.current) fn();
  };

  const showErr = useCallback((msg) => {
    safeSetState(() => setError(msg));
    toast.error(msg);
  }, []);

  const verifyEmailExist = useCallback(
    async (emailToCheck) => {
      try {
        const res = await api.get(
          `/user/checkusername/${encodeURIComponent(emailToCheck)}`
        );
        return Boolean(res?.data?.exists);
      } catch (err) {
        // If your backend returns 404 for not found, treat as "doesn't exist"
        if (err?.response?.status === 404) return false;

        const msg =
          err?.response?.data?.detail ||
          err?.message ||
          'Failed to verify email';
        showErr(msg);
        return false;
      }
    },
    [showErr]
  );

  const handleSendOtp = async () => {
    safeSetState(() => setError(''));

    if (!normalizedEmail) {
      toast.error('Please enter your email first.');
      return;
    }

    safeSetState(() => setLoading(true));
    try {
      const exists = await verifyEmailExist(normalizedEmail);

      if (!exists) {
        toast.error('Email does not exist. Please check again.');
        safeSetState(() => {
          setEmail('');
          setOtp('');
          setStep('email');
        });
        return;
      }

      // Use your API instance so baseURL + interceptors apply
      await api.post('/send-otp', { email: normalizedEmail });

      toast.success('OTP sent. Check your email.');
      safeSetState(() => setStep('otp'));
    } catch (err) {
      const msg =
        err?.response?.data?.detail || err?.message || 'Failed to send OTP';
      showErr(msg);
    } finally {
      safeSetState(() => setLoading(false));
    }
  };

  const handleVerifyOtp = async () => {
    safeSetState(() => setError(''));

    if (!otp.trim()) {
      toast.error('Please enter the OTP code.');
      return;
    }

    safeSetState(() => setLoading(true));
    try {
      await api.post('/verify-otp', {
        email: normalizedEmail,
        otp: otp.trim(),
      });

      toast.success('Email verified ✅');
      safeSetState(() => setStep('reset'));
    } catch (err) {
      const msg =
        err?.response?.data?.detail || err?.message || 'Invalid OTP';
      showErr(msg);
    } finally {
      safeSetState(() => setLoading(false));
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    safeSetState(() => setError(''));

    if (!normalizedEmail || !newPassword) {
      toast.error('Please fill in all fields.');
      return;
    }

    safeSetState(() => setLoading(true));
    try {
      await api.put('/user/forget-password', {
        username: normalizedEmail,
        password: newPassword,
      });

      toast.success('Password updated successfully ✅');
      navigate('/entrygate', { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        'Failed to reset password';
      showErr(msg);
    } finally {
      safeSetState(() => setLoading(false));
    }
  };

  const resetToEmailStep = () => {
    safeSetState(() => {
      setError('');
      setOtp('');
      setNewPassword('');
      setStep('email');
    });
  };

  const canEditEmail = step === 'email';
  const canResendOtp = step === 'otp';

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-md rounded-lg border border-white/10 bg-white p-5 shadow-xl">
        <h1 className="text-xl font-bold text-gray-900">Forgot Password</h1>
        <p className="mt-1 text-sm text-gray-600">
          Verify your email, then reset your password.
        </p>

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* EMAIL + OTP STEPS */}
        {step !== 'reset' ? (
          <div className="mt-5">
            <label className="text-sm font-semibold text-gray-800">
              Username (email)
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              type="email"
              autoComplete="email"
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-60"
              disabled={loading || !canEditEmail}
            />

            {step === 'email' ? (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="mt-5 w-full rounded-md bg-gray-900 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            ) : (
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-800">
                    Code
                  </label>
                  <button
                    type="button"
                    onClick={resetToEmailStep}
                    className="text-sm text-blue-600 hover:underline disabled:opacity-60"
                    disabled={loading}
                  >
                    Change email
                  </button>
                </div>

                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  inputMode="numeric"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-60"
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="mt-4 w-full rounded-md bg-gray-900 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-60"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading || !canResendOtp}
                  className="mt-3 w-full rounded-md border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50 disabled:opacity-60"
                >
                  Resend OTP
                </button>
              </div>
            )}
          </div>
        ) : (
          /* RESET STEP */
          <form onSubmit={handleResetPassword} className="mt-6">
            <label className="text-sm font-semibold text-gray-800">
              New Password
            </label>

            <div className="relative mt-2">
              <input
                minLength={8}
                maxLength={20}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Resd@344"
                pattern="^(?=(?:.*\d){4,})(?=(?:.*[A-Za-z]){4,})(?=.*[^A-Za-z0-9]).{8,}$"
                type={showPassword ? 'text' : 'password'}
                className="w-full rounded-md border border-gray-200 px-3 py-2 pr-10 text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-60"
                disabled={loading}
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 disabled:opacity-60"
                disabled={loading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-6 w-6" />
                ) : (
                  <AiOutlineEye className="h-6 w-6" />
                )}
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Must include: 4 digits, 4 letters, 1 special character, min 8 chars.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full rounded-md bg-amber-500 px-4 py-2 font-bold text-black shadow-sm transition hover:bg-amber-400 disabled:opacity-60"
            >
              {loading ? 'Updating...' : 'Reset Password'}
            </button>

            <button
              type="button"
              onClick={resetToEmailStep}
              disabled={loading}
              className="mt-3 w-full rounded-md border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50 disabled:opacity-60"
            >
              Start over
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotUsernameAndPassword;
