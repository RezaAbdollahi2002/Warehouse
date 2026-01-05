import { useState } from 'react';
import api from '../../../api';
import { ToastContainer, toast } from 'react-toastify';

const Recruiter = ({ setRecruiterAss, positionIdToAddRecruiter, setUpdated, updated }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      position_id: Number(positionIdToAddRecruiter),
    };
    console.log(payload);
    // Make API call to submit the form data
    try {
      setPhoneNumber('+1' + phoneNumber);
      console.log('Submitting payload:', payload);
      await api.post('/recruiter', payload);
      toast.success('Form submitted successfully!');
      setRecruiterAss(false);
      setUpdated(!updated);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
    } catch (error) {
      const msg =
        (error.response && error.response.data && error.response.data.message) ||
        'Error submitting form. Make sure a unique email is provided. Please try again.';
      console.error('Error submitting form:', error);
      toast.error(msg);
    }
  };

  return (
    <div className="w-full mx-auto pb-3 rounded-lg ">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center my-4">
          Recruiter Information
        </h2>
      </div>
      {/* Content */}
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="flex flex-col gap-y-3"
        >
          <label className="font-bold text-amber-500 text-base md:text-lg  ">
            <span className="text-red-500 mr-2 mt-1">*</span>First Name
          </label>
          <input
            type="text"
            placeholder="Alex"
            required
            pattern=".*\S.*"
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-gray-400 text-black font-semibold px-3 py-1 rounded-sm text-break text-wrap "
          />
          <label className="font-bold text-amber-500 text-base md:text-lg  ">
            <span className="text-red-500 mr-2 mt-1">*</span>Last Name
          </label>
          <input
            type="text"
            required
            pattern=".*\S.*"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Smith"
            className="bg-gray-400 text-black font-semibold px-3 py-1 rounded-sm text-break text-wrap "
          />
          <label className="font-bold text-amber-500 text-base md:text-lg sm text-break text-wrap ">
            <span className="text-red-500 mr-2 mt-1">*</span>Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            required
            className="bg-gray-400 text-black font-semibold px-3 py-1 rounded-sm"
          />
          <label className="font-bold text-amber-500 text-base md:text-lg  sm text-break text-wrap">
            Phone Number
          </label>
          <input
            type="tel"
            min={10}
            max={10}
            inputMode="numeric"
            pattern="[0-9]{10}"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="2345678901"
            className="bg-gray-400 text-black font-semibold px-3 py-1 rounded-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 text-md md:text-lg hover:bg-blue-900 font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Recruiter;
