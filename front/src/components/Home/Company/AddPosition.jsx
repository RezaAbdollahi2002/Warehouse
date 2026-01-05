import React from 'react'
import api from "../../../api";
import { toast } from 'react-toastify';
import { useState } from 'react'; 



const AddPosition = ({setAddPosition,companyId, setNewPosition}) => {

  const [Title, setTitle] = useState('');
  const [Number, setNumber] = useState('');
  const [ExperienceLevel, setExperienceLevel] = useState('NA');
  const [RemoteType, setRemoteType] = useState('NA');
  const [DatePosted, setDatePosted] = useState('2025-01-01');
  const [Department, setDepartment] = useState('NA');
  const [Compensation, setCompensation] = useState('');
  const [Accommodation, setAccommodation] = useState('NA');
  const [Status, setStatus] = useState('Have not decided');
  const today = new Date().toISOString().split('T')[0];


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const positionData = {
        title: (Title ?? '').trim(),
        job_number: (Number ?? '').trim(),
        experience_level: ExperienceLevel || 'NA',
        remote_type: RemoteType || 'NA',
        date_posted: DatePosted, // "2025-05-02"
        department: (Department ?? '').trim(),
        compensation: Compensation || '0.00',
        accommodation: (Accommodation ?? '').trim() || 'NA',
        status: Status || 'Have not decided',
        company_id: companyId,
      };
      console.log('Submitting position data:', positionData);
      const response = await api.post(`/position`, positionData);
      setNewPosition(response.data);
      toast.success('Position added successfully.');
      setAddPosition(false);
      setTitle('');
      setNumber('');
      setExperienceLevel('');
      setRemoteType('');
      setDatePosted('');
      setDepartment('');
      setCompensation('');
      setAccommodation('');
      setStatus('');
    } catch (error) {
      const msg = "Error adding position. Make sure Title and Position Number are unique. Please try again.";
      toast.error(msg);
      alert(msg);
      console.error('Error adding position:', error);
    }
  };
  return (
   <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
              <h2 className="text-xl font-bold mb-4 text-amber-500">Add New Position</h2>
              <p className="text-red-500 text-sm ">
                <span className="font-bold text-md text-red-500">Title</span> and{' '}
                <span className="font-bold text-md"> Position Number</span> must be unique for each
                position.
              </p>
              {/* Form fields for adding a new position */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-y-4"
              >
                {/* Position Title */}
                <p className="text-red-500 -mb-2 ">
                  * <span className="text-sm text-white">Title</span>
                </p>
                <input
                  type="text"
                  placeholder="Position Title"
                  className="p-2 rounded bg-gray-700 text-white"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                {/* Position Number */}
                <p className="text-red-500 -mb-2 ">
                  * <span className="text-sm text-white">Position Number</span>
                </p>

                <input
                  type="text"
                  placeholder="Position Number"
                  className="p-2 rounded bg-gray-700 text-white"
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
                {/* Position Experience Level */}
                <p className="text-red-500 -mb-2 ">
                  * <span className="text-sm text-white">Experience Level</span>
                </p>
                <select
                  required
                  name="experience_level"
                  id=""
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                >
                  <option value="NA">NA</option>
                  <option value="full_time">Full Time</option>
                  <option value="part_time">Part Time</option>
                  <option value="internship">Internship</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                </select>
                {/* Position Remote type */}
                <p className="text-red-500 -mb-2 ">
                  * <span className="text-sm text-white">Remote Type</span>
                </p>
                <select
                  required
                  name="remote_type"
                  aria-label="Remote Type"
                  id=""
                  onChange={(e) => setRemoteType(e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                >
                  <option value="NA">NA</option>
                  <option value="on-site">On-site</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote</option>
                </select>
                {/* Position Date Posted */}
                <p className="text-red-500 -mb-2 ">
                  * <span className="text-sm text-white">Date Posted</span>
                </p>

                <input
                  type="date"
                  required
                  max={today}
                  placeholder="Position Date Posted"
                  onChange={(e) => setDatePosted(e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                />
                {/* Position Department */}
                <p className="text-red-500 -mb-2 ">
                  <span className="text-sm text-white">Department</span>
                </p>

                <input
                  type="text"
                  placeholder="Position Department"
                  className="p-2 rounded bg-gray-700 text-white"
                  onChange={(e) => setDepartment(e.target.value)}
                />
                {/* Position Compensation */}
                <p className="text-red-500 -mb-2 ">
                  * <span className="text-sm text-white">Compensation</span>
                </p>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min="0"
                  placeholder="Position Compensation (e.g., 18.50)"
                  className="p-2 rounded bg-gray-700 text-white"
                  required
                  onChange={(e) => setCompensation(e.target.value)}
                />
                {/* Position Accommodation */}
                <p className="text-red-500 -mb-2 ">
                  * <span className="text-sm text-white">Accommodation</span>
                </p>

                <select
                  required
                  name="Accommodation"
                  id=""
                  className="p-2 rounded bg-gray-700 text-white"
                  onChange={(e) => setAccommodation(e.target.value)}
                >
                  <option value="NA">NA</option>
                  <option value="provided">Provided</option>
                  <option value="not provided">Not provided</option>
                </select>
                {/* Position Status */}
                <p className="text-red-500 -mb-2 ">
                  * <span className="text-sm text-white">Status</span>
                </p>

                <select
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  name="Status"
                  id=""
                  className="p-2 rounded bg-gray-700 text-white"
                >
                  <option value="Have not decided">NA</option>
                  <option value="submitted">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
                {/* Buttons */}
                <div className="flex justify-end gap-x-4">
                  <button
                    type="button"
                    onClick={() => setAddPosition(false)}
                    className="bg-red-600 hover:bg-red-800 text-white py-1 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-800 text-white py-1 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
  )
}

export default AddPosition
