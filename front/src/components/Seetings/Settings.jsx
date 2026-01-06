import { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { IoCheckmarkOutline } from 'react-icons/io5';
import React from 'react';
import SettingsSidebar from './SettingsSidebar';
import api from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import AddUserInfo from './AddUserInfo';
import { FaTruckLoading } from 'react-icons/fa';
import { GiHidden } from 'react-icons/gi';

const Settings = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [add, setAdd] = useState(false);
  const [changed, setChanged] = useState(false);
  const [changeFirstNameOpen, setChangeFirstNameOpen] = useState(false);
  const [changeLastNameOpen, setChangeLastNameOpen] = useState(false);
  const [changeDobOpen, setChangeDobOpen] = useState(false);
  const [changePhoneNumberOpen, setChangePhoneNumberOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [changeEmailOpen, setChangeEmailOpen] = useState(false);
  const [changeAddressOpen, setChangeAddressOpen] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedDob, setEditedDob] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [userName, setUserName] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const response = await api.get('/userinfo/me');
        setInfo(response.data);
        console.log('User Info:', response.data);
      } catch (err) {
        setError('Failed to fetch user information.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [changed]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await api.get('/user/me');
        setUserName(response.data.username);
        console.log('Username:', response.data.username);
      } catch (err) {
        console.error('Failed to fetch username.', err);
      }
    };
    fetchUserName();
  }, [userName]);

  const handleUserInfoRemove = async () => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to remove your user information? This action cannot be undone.'
      );
      if (!confirmed) return;
      await api.delete('/userinfo/remove/all');
      toast.success('User information removed successfully!');
      setInfo(null);
      setChanged(!changed);
    } catch (err) {
      toast.error('Failed to remove user information.');
      console.error(err);
    }
  };
  const handleEditFirstName = async () => {
    try {
      const payload = {
        first_name: editedFirstName.trim(),
      };
      console.log('edit first name payload:', payload);
      await api.put('/userinfo/update/first_name', payload);
      toast.success('First name updated successfully!');
      setChanged(!changed);
      setChangeFirstNameOpen(false);
      setEditedFirstName('');
    } catch (err) {
      toast.error('Failed to update first name.');
      console.error(err);
    }
  };
  const handleEditLastName = async () => {
    try {
      const payload = {
        last_name: editedLastName.trim(),
      };
      console.log('edit last name payload:', payload);
      await api.put('/userinfo/update/last_name', payload);
      toast.success('Last name updated successfully!');
      setChanged(!changed);
      setChangeLastNameOpen(false);
      setEditedLastName('');
    } catch (err) {
      toast.error('Failed to update last name.');
      console.error(err);
    }
  };
  const handleEditDob = async () => {
    try {
      const payload = {
        dob: editedDob.trim(),
      };
      console.log('edit dob payload:', payload);
      await api.put('/userinfo/update/dob', payload);
      toast.success('DOB updated successfully!');
      setChanged(!changed);
      setChangeDobOpen(false);
      setEditedDob('');
    } catch (err) {
      toast.error('Failed to update first name.');
      console.error(err);
    }
  };
  const handleEditPhoneNumber = async () => {
    if (editedPhoneNumber.length !== 10) {
      toast.error('Phone number must be exactly 10 digits long.');
      return;
    }
    try {
      const payload = {
        phone_number: '+1' + editedPhoneNumber.trim(),
      };
      console.log('edit phone number payload:', payload);
      await api.put('/userinfo/update/phone_number', payload);
      toast.success('Phone number updated successfully!');
      setChanged(!changed);
      setChangePhoneNumberOpen(false);
      setEditedPhoneNumber('');
    } catch (err) {
      toast.error('Failed to update phone number. Phone number should be unique.');
      console.error(err);
    }
  };
  const handleEditAddress = async () => {
    try {
      const payload = {
        address: editedAddress.trim(),
      };
      console.log('edit address payload:', payload);
      await api.put('/userinfo/update/address', payload);
      toast.success('Address updated successfully!');
      setChanged(!changed);
      setChangeAddressOpen(false);
      setEditedAddress('');
    } catch (err) {
      toast.error('Failed to update address.');
      console.error(err);
    }
  };

  const handleEditPassword = async () => {
    if(editedPassword.length < 9){
      toast.error('Password must be at least 9 characters long.');
      return;
    }else if (!/^(?=(?:.*\d){4,})(?=(?:.*[A-Za-z]){4,})(?=.*[^A-Za-z0-9]).{8,}$/.test(editedPassword)) {
      toast.error('Password must contain at least 4 digits, 4 letters, and 1 special character.');
      return;
    }
    else if (editedPassword.length > 20) {
      toast.error('Password must not exceed 20 characters.');
      return;
    } 
    try {
      const payload = {
        password: editedPassword.trim(),
      };
      console.log('edit password payload:', payload);
      await api.put('/user/passwordid', payload);
      toast.success('Password updated successfully!');
      setChanged(!changed);
      setChangePasswordOpen(false);
      setEditedPassword('');
    } catch (err) {
      toast.error('Failed to update password.');
      console.error(err);
    }
  };

  const sendOtp = async (email) => {
    try {
      const payload = {
        email: email.trim(),
      };
      console.log('send OTP payload:', payload);
      await api.post('/send-otp/', payload);
      toast.success('OTP sent successfully! Please check your email.');
    } catch (err) {
      toast.error('Failed to send OTP. Please try again.');
      console.error(err);
    }
  };
  const verifyOtp = async (email, otp) => {
    try {
      const payload = {
        email: email.trim(),
        otp: otp.trim(),
      };
      console.log('send OTP payload:', payload);
      await api.post('/verify-otp/', payload);
      toast.success('OTP was successfully verified!');
    } catch (err) {
      toast.error('Failed to verify OTP. Please try again.');
      console.error(err);
    }
  };
  const handleEditEmail = async () => {
    if (!otpOpen) {
      toast.error('Please send OTP first.');
      return;
    }
    verifyOtp(editedEmail, otp);
    const payload = {
      username: editedEmail.trim(),
    };
    try {
      console.log('edit email payload:', payload);
      await api.put('/user/change/username', payload);
      toast.success('Email (username) updated successfully! New username is ' + editedEmail.trim());
      setChanged(!changed);
      setChangeEmailOpen(false);
      setEditedEmail('');
      setUserName(editedEmail.trim());
      setOtpOpen(false);
      setOtp('');
    } catch (err) {
      toast.error('Failed to update email.');
      console.error(err);
    }
  };

  return (
    <div className="bg-black w-full min-h-screen text-white flex relative ">
      {error && (
        <div className="flex justify-center items-center">
          <p className="text-red-500 font-semibold">{error.message}</p>
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center ">
          <FaTruckLoading className="text-3xl text-center text-amber-500 w-12 h-12 animate-pulse" />
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        className={`fixed text-white  transition-all duration-1000 ease-in-out animate-spin-slow ${
          open
            ? 'md:w-[10.5%] h-full border-r border-blue-500 border-2 bg-white'
            : 'w-[3%] bg-transparent'
        } `}
      >
        <SettingsSidebar
          open={open}
          setOpen={setOpen}
          changeFirstNameOpen={changeFirstNameOpen}
          changeLastNameOpen={changeLastNameOpen}
          changePasswordOpen={changePasswordOpen}
          changeEmailOpen={changeEmailOpen}
          setChangeFirstNameOpen={setChangeFirstNameOpen}
          setChangeLastNameOpen={setChangeLastNameOpen}
          setChangePasswordOpen={setChangePasswordOpen}
          setChangeEmailOpen={setChangeEmailOpen}
          setChangeDobOpen={setChangeDobOpen}
          changeDobOpen={changeDobOpen}
          setChangePhoneNumberOpen={setChangePhoneNumberOpen}
          changePhoneNumberOpen={changePhoneNumberOpen}
          setChangeAddressOpen={setChangeAddressOpen}
          changeAddressOpen={changeAddressOpen}
        />
      </div>
      {/* Main Content */}
      <div className="max-w-[1200px] px-6 mx-auto flex-1 bg-gray-800 h-fill ">
        <h1 className="text-amber-500 text-3xl pt-10 px-10 text-center font-bold">Settings Page</h1>
        <h1 className="text-center my-3">
          This is the Settings page. Here you can configure your application preferences and account
          settings.{' '}
          <span>
            <button onClick={() => setAdd(!add)} className="text-blue-500 underline font-semibold">
              Add your information
            </button>
          </span>
        </h1>

        {/* Information */}
        {add && (
          <div className="flex justify-center items-center mx-auto ">
            <AddUserInfo setAdd={setAdd} changed={changed} setChanged={setChanged} />
          </div>
        )}
        {!add && (
          <div className="bg-slate-50 mx-auto w-full max-w-4xl p-6 rounded-xl text-gray-800 flex justify-between gap-10 flex-col md:flex-row">
            <div>
              <h1 className="text-amber-500 font-bold text-lg md:text-xl lg:text-2xl">
                First Name:{' '}
                <span className="text-gray-800 font-normal text-md md:text-lg">
                  {info?.first_name || 'Not provided'}
                </span>
              </h1>
              <h1 className="text-amber-500 font-bold text-lg md:text-xl lg:text-2xl">
                Last Name:{' '}
                <span className="text-gray-800 font-normal text-md md:text-lg">
                  {info?.last_name || 'Not provided'}
                </span>
              </h1>
              <h1 className="text-amber-500 font-bold text-lg md:text-xl lg:text-2xl">
                Date of Birth:{' '}
                <span className="text-gray-800 font-normal text-md md:text-lg">
                  {info?.dob || 'Not provided'}
                </span>
              </h1>
              <h1 className="text-amber-500 font-bold text-lg md:text-xl lg:text-2xl">
                Phone Number:{' '}
                <span className="text-gray-800 font-normal text-md md:text-lg">
                  {info?.phone_number || 'Not provided'}
                </span>
              </h1>
              <h1 className="text-amber-500 font-bold text-lg md:text-xl lg:text-2xl">
                Address:{' '}
                <span className="text-gray-800 font-normal text-md md:text-lg">
                  {info?.address || 'Not provided'}
                </span>
              </h1>
            </div>
            <div>
              <button
                onClick={() => handleUserInfoRemove()}
                className="text-white bg-red-500 px-2 rounded-lg py-2 mt-4 hover:bg-red-600 font-semibold"
              >
                Remove Information
              </button>
            </div>
          </div>
        )}
        {changeFirstNameOpen && (
          <div className="text-center mt-10 bg-gray-50 px-4 py-6 rounded-lg text-gray-800">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-500">Change First Name </h1>
            <h1 className="text-blue-500 font-bold text-lg md:text-xl py-2">
              First Name:{' '}
              <span className="text-md md:text-lg text-gray-800">
                {info?.first_name || 'Not provided'}
              </span>
            </h1>
            <input
              type="text"
              placeholder="Updated Name"
              value={editedFirstName}
              onChange={(e) => setEditedFirstName(e.target.value)}
              className="bg-white px-2 rounded-lg border-2  shadow-2xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-md md:text-lg"
              required
            />
            <IoCheckmarkOutline
              onClick={() => handleEditFirstName()}
              size={20}
              className="inline ml-2 mb-1  text-green-500 hover:cursor-pointer hover:text-green-700 hover:animate-pulse "
            />
            <IoCloseOutline
              onClick={() => setChangeFirstNameOpen(false)}
              size={20}
              className="inline ml-2 mb-1  text-red-500 hover:cursor-pointer hover:text-red-700 hover:animate-pulse"
            />
          </div>
        )}
        {changeLastNameOpen && (
          <div className="text-center mt-10 bg-gray-50 px-4 py-6 rounded-lg text-gray-800">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-500">Change Last Name </h1>
            <h1 className="text-blue-500 font-bold text-lg md:text-xl py-2">
              Last Name:{' '}
              <span className="text-md md:text-lg text-gray-800">
                {info?.last_name || 'Not provided'}
              </span>
            </h1>
            <input
              type="text"
              placeholder="Updated Name"
              value={editedLastName}
              onChange={(e) => setEditedLastName(e.target.value)}
              className="bg-white px-2 rounded-lg border-2  shadow-2xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-md md:text-lg"
              required
            />
            <IoCheckmarkOutline
              onClick={() => handleEditLastName()}
              size={20}
              className="inline ml-2 mb-1  text-green-500 hover:cursor-pointer hover:text-green-700 hover:animate-pulse "
            />
            <IoCloseOutline
              onClick={() => setChangeLastNameOpen(false)}
              size={20}
              className="inline ml-2 mb-1  text-red-500 hover:cursor-pointer hover:text-red-700 hover:animate-pulse"
            />
          </div>
        )}
        {changeDobOpen && (
          <div className="text-center mt-10 bg-gray-50 px-4 py-6 rounded-lg text-gray-800">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-500">Change Date Of Birth </h1>
            <h1 className="text-blue-500 font-bold text-lg md:text-xl py-2">
              Date Of Birth:{' '}
              <span className="text-md md:text-lg text-gray-800">
                {info?.dob || 'Not provided'}
              </span>
            </h1>
            <input
              type="date"
              placeholder="Updated Date Of Birth"
              value={editedDob}
              onChange={(e) => setEditedDob(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="bg-white px-2 rounded-lg border-2  shadow-2xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-md md:text-lg"
              required
            />
            <IoCheckmarkOutline
              onClick={() => handleEditDob()}
              size={20}
              className="inline ml-2 mb-1  text-green-500 hover:cursor-pointer hover:text-green-700 hover:animate-pulse "
            />
            <IoCloseOutline
              onClick={() => setChangeDobOpen(false)}
              size={20}
              className="inline ml-2 mb-1  text-red-500 hover:cursor-pointer hover:text-red-700 hover:animate-pulse"
            />
          </div>
        )}
        {changePhoneNumberOpen && (
          <div className="text-center mt-10 bg-gray-50 px-4 py-6 rounded-lg text-gray-800">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-500">Change Phone Number </h1>
            <h1 className="text-blue-500 font-bold text-lg md:text-xl py-2">
              Phone Number:{' '}
              <span className="text-md md:text-lg text-gray-800">
                {info?.phone_number || 'Not provided'}
              </span>
            </h1>
            <input
              type="tel"
              inputMode="numeric"
              pattern="^\\d{10}$"
              minLength={10}
              maxLength={10}
              placeholder="Updated Phone Number"
              value={editedPhoneNumber}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 10);
                setEditedPhoneNumber(onlyDigits);
              }}
              required
              className="bg-white px-2 rounded-lg border-2  shadow-2xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-md md:text-lg"
            />
            <IoCheckmarkOutline
              onClick={() => handleEditPhoneNumber()}
              size={20}
              className="inline ml-2 mb-1  text-green-500 hover:cursor-pointer hover:text-green-700 hover:animate-pulse "
            />
            <IoCloseOutline
              onClick={() => setChangePhoneNumberOpen(false)}
              size={20}
              className="inline ml-2 mb-1  text-red-500 hover:cursor-pointer hover:text-red-700 hover:animate-pulse"
            />
          </div>
        )}
        {changeAddressOpen && (
          <div className="text-center mt-10 bg-gray-50 px-4 py-6 rounded-lg text-gray-800">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-500">Change Address </h1>
            <h1 className="text-blue-500 font-bold text-lg md:text-xl py-2">
              Address (zipcode):{' '}
              <span className="text-md md:text-lg text-gray-800">
                {info?.address || 'Not provided'}
              </span>
            </h1>
            <input
              type="text"
              placeholder="Updated Address"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
              className="bg-white px-2 rounded-lg border-2  shadow-2xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-md md:text-lg"
              required
            />
            <IoCheckmarkOutline
              onClick={() => handleEditAddress()}
              size={20}
              className="inline ml-2 mb-1  text-green-500 hover:cursor-pointer hover:text-green-700 hover:animate-pulse "
            />
            <IoCloseOutline
              onClick={() => setChangeAddressOpen(false)}
              size={20}
              className="inline ml-2 mb-1  text-red-500 hover:cursor-pointer hover:text-red-700 hover:animate-pulse"
            />
          </div>
        )}
        {changePasswordOpen && (
          <div className="text-center mt-10 bg-gray-50 px-4 py-6 rounded-lg text-gray-800">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-500">Change Password </h1>
            <h1 className="text-blue-500 font-bold text-lg md:text-xl py-2">
              Current Password:{' '}
              <span className="text-md md:text-lg text-gray-800">
                {info?.password || 'Not provided'}
              </span>
            </h1>
            <div>
              <input
                type={hiddenPassword ? 'password' : 'text'}
                placeholder="New Password"
                value={editedPassword}
                minLength={9}
                maxLength={20}
                pattern="^(?=(?:.*\d){4,})(?=(?:.*[A-Za-z]){4,})(?=.*[^A-Za-z0-9]).{8,}$"
                onChange={(e) => setEditedPassword(e.target.value)}
                className="bg-white px-2 rounded-lg border-2  shadow-2xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-md md:text-lg"
                required
              />
              <GiHidden
                onClick={() => setHiddenPassword(!hiddenPassword)}
                className={`inline -ml-5 mb-1  ${
                  hiddenPassword ? 'text-gray-500' : 'text-blue-500'
                }`}
              />
              <IoCheckmarkOutline
                onClick={() => handleEditPassword()}
                size={20}
                className="inline ml-2 mb-1  text-green-500 hover:cursor-pointer hover:text-green-700 hover:animate-pulse "
              />
              <IoCloseOutline
                onClick={() => setChangePasswordOpen(false)}
                size={20}
                className="inline ml-2 mb-1  text-red-500 hover:cursor-pointer hover:text-red-700 hover:animate-pulse"
              />
            </div>
            <div className="flex flex-col justify-center items-center text-sm">
              <p className="mt-4 text-gray-800 font-semibold text-base">Password Rules:</p>
              <ul className="list-disc list-inside text-gray-800 text-left max-w-md mx-auto">
                <li>At least 4 digits</li>
                <li>At least 4 characters</li>
                <li>At least 1 special character</li>
                <li>Max 20 characters</li>
              </ul>
            </div>
          </div>
        )}
        {changeEmailOpen && (
          <div className="text-center mt-10 bg-gray-50 px-4 py-6 rounded-lg text-gray-800">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-500">
              Change Email{' '}
              <span>
                <IoCloseOutline
                  onClick={() => setChangeEmailOpen(false)}
                  size={20}
                  className="inline mb-1  text-red-500 hover:cursor-pointer hover:text-red-700 hover:animate-pulse"
                />
              </span>
            </h1>
            <h1 className="text-blue-500 font-bold text-lg md:text-xl py-2">
              Email Address:{' '}
              <span className="text-md md:text-lg text-gray-800">{userName || 'Not provided'}</span>
            </h1>

            <div className="flex justify-center items-center gap-x-2">
              {otpOpen ? (
                <div>
                  <button
                    onClick={() => setOtpOpen(false)}
                    className="bg-red-500 text-white rounded-lg px-2  mx-2 hover:text-black hover:bg-red-600"
                  >
                    reset
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-white px-2 rounded-lg border-2  shadow-2xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-md md:text-lg"
                    required
                  />
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Updated Email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="bg-white px-2 rounded-lg border-2  shadow-2xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-xs md:text-sm "
                  required
                />
              )}
              {otpOpen ? (
                <button
                  onClick={() => handleEditEmail()}
                  className="bg-green-500 text-white rounded-lg px-2"
                >
                  Verify OTP
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOtpOpen(!otpOpen);
                    sendOtp(editedEmail);
                  }}
                  className="bg-blue-500 rounded-lg px-1 text-white mx-2 hover:text-black hover:bg-green-500 cursor-pointer"
                >
                  Send OTP
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
