import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../api';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const CompanyDetails = () => {
  const { state } = useLocation();
  const companyId = state?.companyId;
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [newPosition, setNewPosition] = useState({});
  const [generalInfo, setGeneralInfo] = useState(null);
  const [addPosition, setAddPosition] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Title, setTitle] = useState('');
  const [Number, setNumber] = useState('');
  const [ExperienceLevel, setExperienceLevel] = useState('');
  const [RemoteType, setRemoteType] = useState('');
  const [DatePosted, setDatePosted] = useState('');
  const [Department, setDepartment] = useState('');
  const [Compensation, setCompensation] = useState('');
  const [Accommodation, setAccommodation] = useState('');
  const [Status, setStatus] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [allPositions, setAllPositions] = useState([]);

  //   Fetch company details using companyId
  useEffect(() => {
    console.log('Received companyId:', companyId);
    if (!companyId) {
      setError('No company ID provided.');
      return;
    }
    // Fetch company details logic here
    console.log('Fetching details for company ID:', companyId);
    const fetchCompanyDetails = async () => {
      try {
        const response = await api.get(`/company/get/company/${companyId}`);
        setGeneralInfo(response.data);
        console.log('Company details:', response.data);
        setLoading(false);
        // Handle the fetched data as needed
      } catch (error) {
        setError('Error fetching company details.');
        toast.error('Error fetching company details.');
        console.error('Error fetching company details:', error);
      }
    };
    fetchCompanyDetails();
  }, [companyId, newPosition]);

  // get all positions for the company
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await api.get(`/position/get_all_positions/${companyId}`);
        setAllPositions(response.data);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };
    fetchPositions();
  }, [companyId, newPosition]);

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
        compensation: Number,
        accommodation: Accommodation || 'NA',
        status: Status || 'Have not decided',
        company_id: companyId, // IMPORTANT: snake_case
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
      toast.success('Position added successfully.');
    } catch (error) {
      toast.error('Error adding position.');
      console.error('Error adding position:', error);
    }
  };

  return (
    <div className="w-full h-screen  items-center bg-black text-white">
      {loading && (
        <>
          <div className="flex items-center justify-center h-screen">
            <AiOutlineLoading3Quarters className="animate-spin text-amber-500 text-4xl" />
          </div>
        </>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-[1200px] mx-auto bg-gray-800 text-white p-6 shadow-xl shadow-white h-screen flex flex-col gap-y-5">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-white text-center">
          Company Details
        </h1>
        <div>
          <h1 className="text-lg md:text-xl font-bold mb-2 text-amber-500">General Information</h1>
          {generalInfo ? (
            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-amber-500">
                Name: <span className="text-white text-sm md:text-base ">{generalInfo.name}</span>
              </h2>
              <p className="text-sm md:text-base text-amber-500">
                Address:{' '}
                <span className="text-white text-sm md:text-base ">{generalInfo.address}</span>
              </p>
              <p className="text-sm md:text-base text-amber-500">
                URL:{' '}
                <a href={generalInfo.url} target="_blank" rel="noopener noreferrer">
                  <span className="text-blue-600 underline">{generalInfo.url}</span>
                </a>
              </p>
            </div>
          ) : (
            <p className="text-center">Loading company details...</p>
          )}
        </div>
        {/* Positions */}
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg md:text-xl font-bold mb-2 text-amber-500">Positions</h1>
            <button
              onClick={() => setAddPosition(true)}
              className="bg-white hover:bg-amber-800 hover:text-white text-gray-800  px-1 rounded-lg shadow-sm shadow-white text-xs md:text-sm"
            >
              Add Position
            </button>
          </div>
          {/* Positions details would go here */}
          <div>
            {allPositions.length > 0 ? (
              allPositions.map((position) => (
                <div key={position.id} className="bg-gray-700 p-4 rounded-lg shadow-md mb-4">
                  <h2 className="text-lg md:text-xl font-bold mb-2 text-amber-500">
                    Title: <span className='text-white text-sm md:text-base ml-1'>{position.title}</span>
                  </h2>
                  <p className="text-sm md:text-base text-amber-500">
                    Number: <span className="text-white text-sm md:text-base ml-1 ">{position.job_number}</span>
                    <span className="text-white text-sm md:text-base ml-1">{position.Number}</span>
                  </p>
                  <p className="text-sm md:text-base text-amber-500">
                    Experience Level: <span className="text-white text-sm md:text-base ml-1">{position.experience_level}</span>
                  </p>
                  <p className="text-sm md:text-base text-amber-500">
                    Remote Type: <span className="text-white text-sm md:text-base ml-1">{position.remote_type || "NA"}</span>
                  </p>
                  <p className="text-sm md:text-base text-amber-500">
                    Date Posted: <span className="text-white text-sm md:text-base ml-1">{position.date_posted}</span>
                  </p>
                  <p className="text-sm md:text-base text-amber-500">
                    Department:  <span className="text-white text-sm md:text-base ">{position.department || "NA"}</span>
                  </p>
                  <p className="text-sm md:text-base text-amber-500">
                    Compensation: 
                    <span className="text-white text-sm md:text-base ml-1">
                      {position.compensation ? `$${position.compensation}/hr` : 'NA'}
                    </span>
                  </p>

                  <p className="text-sm md:text-base text-amber-500">
                    Accommodation: <span className="text-white text-sm md:text-base ml-1">{position.accommodation}</span>
                  </p>
                  <p className="text-sm md:text-base text-amber-500">
                    Status: <span className="text-white text-sm md:text-base ml-1">{position.status}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center">No positions available for this company.</p>
            )}
          </div>
        </div>
        {addPosition && (
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
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                className="flex flex-col gap-y-4"
              >
                {/* Position Title */}
                <p className="text-red-500 -mb-5">*</p>
                <input
                  type="text"
                  placeholder="Position Title"
                  className="p-2 rounded bg-gray-700 text-white"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                {/* Position Number */}
                <p className="text-red-500 -mb-5">*</p>

                <input
                  type="text"
                  placeholder="Position Number"
                  className="p-2 rounded bg-gray-700 text-white"
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
                {/* Position Experience Level */}
                <p className="text-red-500 -mb-5">*</p>

                <select
                  required
                  name="experience_level"
                  id=""
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                >
                  <option value="default">NA</option>
                  <option value="full_time">Full Time</option>
                  <option value="part_time">Part Time</option>
                  <option value="internship">Internship</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                </select>
                {/* Position Remote type */}
                <p className="text-red-500 -mb-5">*</p>

                <select
                  required
                  name="remote_type"
                  on
                  id=""
                  onChange={(e) => setRemoteType(e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                >
                  <option value="default">NA</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote</option>
                </select>
                {/* Position Date Posted */}
                <input
                  type="date"
                  max={today}
                  placeholder="Position Date Posted"
                  onChange={(e) => setDatePosted(e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                />
                {/* Position department */}
                <input
                  type="text"
                  placeholder="Position Department"
                  className="p-2 rounded bg-gray-700 text-white"
                  onChange={(e) => setDepartment(e.target.value)}
                />
                {/* Position Compensation */}
                <p className="text-red-500 -mb-5">*</p>

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
                <p className="text-red-500 -mb-5">*</p>

                <select
                  required
                  name="Accommodation"
                  id=""
                  className="p-2 rounded bg-gray-700 text-white"
                  onChange={(e) => setAccommodation(e.target.value)}
                >
                  <option value="default">NA</option>
                  <option value="provided">Provided</option>
                  <option value="required">Not provided</option>
                </select>
                {/* Position Status */}
                <p className="text-red-500 -mb-5">*</p>

                <select
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  name="Status"
                  id=""
                  className="p-2 rounded bg-gray-700 text-white"
                >
                  <option value="default">NA</option>
                  <option value="applied">Applied</option>
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
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;
