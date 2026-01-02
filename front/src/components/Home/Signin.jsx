import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEyeInvisible } from 'react-icons/ai';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    } else {
      try {
        const body = new URLSearchParams();
        body.append('username', username.trim().toLowerCase());
        body.append('password', password);
        const response = await axios.post(`/api/signin`,body,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        localStorage.setItem('token', response.data.access_token);
        navigate('/dashboard');
      } catch (error) {
        setError('Incorrect credentials.');
        console.error('Error signing in:', error);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
      className="flex flex-col px-3 py-3"
    >
      {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
      {/* Username */}
      <label className="text-lg my-1 text-gray-800 font-semibold">Username</label>
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="example@gmai.com"
        type="text"
        required={true}
        className="border-blue-50 shadow-xl px-1 py-1 text-gray-800 text-wrap text-break"
      />
      {/* Password */}
      <label className="mt-2 text-gray-800 text-lg font-semibold">Password</label>
      <div className='w-full flex items-center'>
        <input
          min={8}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Resd@344"
          required={true}
          type={visible ? "text" : "password"}
          className="border-blue-50 shadow-xl px-1 py-1 mt-1 text-gray-800 text-wrap text-break w-full"
        />
        <AiOutlineEyeInvisible onClick={()=> setVisible(!visible)} className='w-6 h-6 mt-1.5 text-gray-800 -ml-10'/>
      </div>
      <div className="justify-center font-semibold text-white w-full">
        <button
          className="my-8 bg-gray-800 px-3 py-2 w-full hover:bg-gray-600 shadow-sm"
          type="submit"
        >
          Signin
        </button>
      </div>
      <p className="text-sm ">
        Forgot{' '}
        <Link
          to={'/forgot-username-password'}
          className="underline text-blue-500 hover:text-blue-600 hover:cursor-pointer"
        >
          username
        </Link>{' '}
        or{' '}
        <Link
          to={'/forgot-username-password'}
          className="underline text-blue-500 hover:text-blue-600 hover:cursor-pointer"
        >
          password
        </Link>
      </p>
    </form>
  );
};

export default Signin;
