import Add from '../Home/Company/AddPosition';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api';

const AddCompany = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [url, setUrl] = useState('');
  const [logo, setLogo] = useState(null);
  const access_token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    // Handle form submission logic here
    if (!access_token) {
      console.error('No access token found. Please log in.');
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    const trimmedName = name.trim();
    const trimmedAddress = address.trim();
    const trimmedUrl = url.trim();
    console.log('Submitting company:', {
      name: trimmedName,
      address: trimmedAddress,
      url: trimmedUrl,
      logo: logo,
    });
    formData.append('name', trimmedName);
    formData.append('address', trimmedAddress);
    formData.append('url', trimmedUrl);
    if (logo) formData.append('logo', logo);
    try {
      await api.post('/company', formData);
      toast.success('Company added successfully!');
      setName('');
      setAddress('');
      setUrl('');
      setLogo('');
    } catch (error) {
      const status = error.response?.status;
      if (status === 400) {
        toast.error('This company already exists. Try a different name/url.');
        return;
      }
      console.error('Error adding company:', error);
      console.log('DATA:', error.response?.data);
      toast.error('Error adding company. Please read the constraints and try again.');
    }
  };

  const handleCancel = () => {
    // Handle cancel action here
    setName('');
    setAddress('');
    setUrl('');
    setLogo('');
  };
  return (
    <div className="w-full h-screen px-10 pt-15 bg-black text-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-[1200px] mx-auto h-screen bg-gray-700">
        <div>
          <h1 className="text-center py-5 text-lg md:text-xl xl:text-2xl font-bold text-amber-200">
            Manage Company
          </h1>
        </div>
        {/* Company management content */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="max-w-[60%] max-h-auto flex flex-col mx-auto gap-y-5 py-10 bg-white text-gray-800 "
        >
          <div className='text-center'>
            <h1 className="text-center font-bold text-lg md:text-xl">Initial Information</h1>
            <p className="font-bold mr-2 text-red-500 mt-1">Constraint</p>
            <p className='text-red-500  text-sm'><span className='font-bold'>Name</span>and <span className='font-bold'>URL</span> have to be unique.</p>
          </div>
          <hr className="text-xl font-bold text-black border-2 border-black" />
          <div className="px-4 flex flex-col gap-y-4">
            {/* Name */}
            <div className="flex justify-between">
              <label htmlFor="name" className="text-gray-800 font-semibold text-md md:text-lg">
                Name
              </label>
              <button
                onClick={handleCancel}
                className="text-red-500 hover:cursor-pointer hover:font-semibold"
              >
                Cancel
              </button>
            </div>
            <p className=" flex gap-x-1 text-xs text-red-500 align-middle ">
              <span className="font-bold  ">*</span> Required
            </p>
            <input
              type="text"
              placeholder="Wabtech"
              className="border border-gray-300 rounded px-2 py-1
              shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Address */}
            <label htmlFor="address" className="text-gray-800 font-semibold text-md md:text-lg">
              Address
            </label>
            <p className=" flex gap-x-1 text-xs text-red-500 align-middle ">
              <span className="font-bold  ">*</span> Required
            </p>
            <input
              type="text"
              placeholder="123 Main St, City, Country"
              className="border border-gray-300 rounded px-2 py-1
              shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={true}
              onChange={(e) => setAddress(e.target.value)}
            />
            {/* Website URL */}
            <label htmlFor="url" className="text-gray-800 font-semibold text-md md:text-lg">
              Website URL
            </label>
            <p className=" flex gap-x-1 text-xs text-red-500 align-middle ">
              <span className="font-bold  ">*</span> Required
            </p>

            <input
              type="url"
              placeholder="https://www.wabtech.com"
              className="border border-gray-300 rounded px-2 py-1
              shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500
            "
              required={true}
              onChange={(e) => setUrl(e.target.value)}
            />
            {/* Logo */}
            <label htmlFor="logo" className="text-gray-800 font-semibold text-md md:text-lg">
              Logo
            </label>
            <input
              type="file"
              placeholder="https://www.wabtech.com"
              className="border border-gray-300 rounded px-2 py-1
              shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500
            "
              required={false}
              onChange={(e) => setLogo(e.target.files[0])}
            />
          </div>
          <button
            className=" text-gray-800 py-2 px-1 bg-blue-400 w-full mx-auto rounded-md hover:bg-blue-700 hover:text-white hover:cursor-pointer shadow-md font-bold"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
