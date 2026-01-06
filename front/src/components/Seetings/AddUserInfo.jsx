import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../api';
import { toast } from 'react-toastify';
import { IoMdCloseCircle } from 'react-icons/io';

const AddUserInfo = ({ setAdd, changed, setChanged }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      dob: '',
      phone_number: '',
      address: '',
    },
    mode: 'onTouched',
  });

  const handleCancel = () => {
    // Reset the form fields
    reset();
  };

  const onSubmit = async (formData) => {
    // Simulate an async operation
    try {
      const payload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        dob: formData.dob || null,
        phone_number: '+1' + formData.phone_number?.trim() || null,
        address: formData.address.trim(),
      };
      console.log('submit:', payload);
      await api.post('/userinfo', payload);
      toast.success('User information created successfully!');
      setChanged(!changed);
      setAdd(false);
    } catch (err) {
      toast.error('Failed to create user information. You may already have user information.');
      console.error(err);
    }
  };

  return (
    <div className=" text-gray-800">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md space-y-4 rounded-xl border p-6 bg-slate-50"
      >
        <button onClick={() => setAdd(false)}>
          <IoMdCloseCircle
            size={22}
            className="text-gray-500 hover:text-red-500 hover:cursor:pointer"
          />
        </button>
        {/* First Name */}
        <div className="">
          <label className="mb-1 block text-sm font-medium">First Name</label>
          <input
            className={`w-full rounded-lg border-2 px-3 py-2 outline-none focus:ring focus:ring-amber-500 bg-white text-gray-800   ${
              errors.first_name ? 'border-red-500' : 'border-gray-300'
            }`}
            type="text"
            placeholder="Alex"
            {...register('first_name', {
              required: 'First name is required',
            })}
          />
          {errors.first_name && (
            <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
          )}
        </div>
        {/* Last Name */}
        <div>
          <label className="mb-1 block text-sm font-medium">Last Name</label>
          <input
            className={`w-full rounded-lg border-2 px-3 py-2 outline-none focus:ring focus:ring-amber-500 bg-white text-gray-800   ${
              errors.last_name ? 'border-red-500' : 'border-gray-300'
            }`}
            type="text"
            placeholder="Smith"
            {...register('last_name', {
              required: 'Last name is required',
            })}
          />
          {errors.last_name && (
            <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
          )}
        </div>
        {/* Date of Birth */}
        <div>
          <label className="mb-1 block text-sm font-medium">Date of Birth</label>
          <input
            className={`w-full rounded-lg border-2 px-3 py-2 outline-none focus:ring focus:ring-amber-500 bg-white text-gray-800   ${
              errors.dob ? 'border-red-500' : 'border-gray-300'
            }`}
            type="date"
            placeholder="1990-01-01"
            max={new Date().toISOString().slice(0, 10)}
            {...register('dob', {
              required: 'Date of birth is required',
            })}
          />
          {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
        </div>
        {/* Phone Number */}
        <div>
          <label className="mb-1 block text-sm font-medium">Phone Number</label>
          <input
            className={`w-full rounded-lg border-2 px-3 py-2 outline-none focus:ring focus:ring-amber-500 bg-white text-gray-800   ${
              errors.phone_number ? 'border-red-500' : 'border-gray-300'
            }`}
            type="tel"
            placeholder="123-456-7890"
            {...register('phone_number', {
              required: 'Phone number is required',
              pattern: { value: /^\d{3}\d{3}\d{4}$/, message: 'Invalid phone number' },
            })}
          />
          {errors.phone_number && (
            <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>
          )}
        </div>
        {/* Address - Zipcode */}
        <div>
          <label className="mb-1 block text-sm font-medium">Address (Zipcode)</label>
          <input
            className={`w-full rounded-lg border-2 px-3 py-2 outline-none focus:ring focus:ring-amber-500 bg-white text-gray-800 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            type="text"
            placeholder="*****"
            {...register('address', {
              required: 'Address is required',
              pattern: { value: /\d{5}$/, message: 'Invalid zipcode' },
            })}
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleCancel()}
            className="w-full bg-red-500 text-white font-bold rounded-lg hover:text-black "
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            className="w-full rounded-lg bg-green-500 px-4 py-2 text-white disabled:opacity-60"
            type="submit"
          >
            {isSubmitting ? 'Submitting...' : 'Create user information'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserInfo;
