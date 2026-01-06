import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import api from '../../api';
import { toast } from 'react-toastify';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const normalizedUsername = username.trim().toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!normalizedUsername || !password) {
      const msg = 'Please fill in all fields.';
      setError(msg);
      toast?.error?.(msg);
      return;
    }

    setLoading(true);
    try {
      // Many FastAPI OAuth2PasswordRequestForm endpoints expect x-www-form-urlencoded
      const body = new URLSearchParams();
      body.append('username', normalizedUsername);
      body.append('password', password);

      const res = await api.post('/signin', body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const token = res?.data?.access_token;
      if (!token) throw new Error('No access token returned from server.');

      localStorage.setItem('token', token);
      toast?.success?.('Signed in ✅');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        'Incorrect credentials.';
      setError(msg);
      toast?.error?.(msg);
      console.error('Error signing in:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col px-3 py-3">
      {error && (
        <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {/* Username */}
      <label className="text-lg my-1 text-gray-800 font-semibold">
        Username (email)
      </label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="example@gmail.com"
        type="email"
        autoComplete="email"
        required
        disabled={loading}
        className="rounded-md border border-gray-200 px-3 py-2 text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-60"
      />

      {/* Password */}
      <label className="mt-4 text-gray-800 text-lg font-semibold">
        Password
      </label>
      <div className="relative mt-1">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
          minLength={8}
          type={visible ? 'text' : 'password'}
          autoComplete="current-password"
          disabled={loading}
          className="w-full rounded-md border border-gray-200 px-3 py-2 pr-10 text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-60"
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 disabled:opacity-60"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? (
            <AiOutlineEyeInvisible className="h-6 w-6" />
          ) : (
            <AiOutlineEye className="h-6 w-6" />
          )}
        </button>
      </div>

      <button
        className="mt-6 w-full rounded-md bg-gray-900 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>

      <p className="mt-4 text-sm text-gray-700">
        Forgot{' '}
        <Link
          to="/forgot-username-password"
          className="font-semibold text-blue-600 underline hover:text-blue-700"
        >
          username
        </Link>{' '}
        or{' '}
        <Link
          to="/forgot-username-password"
          className="font-semibold text-blue-600 underline hover:text-blue-700"
        >
          password
        </Link>
        ?
      </p>
    </form>
  );
};

export default Signin;
