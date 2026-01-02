import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../api';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { FaCheckCircle } from 'react-icons/fa';
import Recruiter from './Recruiter';

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
  const [editTitle, setEditTitle] = useState(false);
  const [editNumber, setEditNumber] = useState(false);
  const [editExperienceLevel, setEditExperienceLevel] = useState(false);
  const [editRemoteType, setEditRemoteType] = useState(false);
  const [editDatePosted, setEditDatePosted] = useState(false);
  const [editDepartment, setEditDepartment] = useState(false);
  const [editCompensation, setEditCompensation] = useState(false);
  const [editAccommodation, setEditAccommodation] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [recruiterShow, setRecruiterShow] = useState(false);

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
  }, [companyId, newPosition, updated]);

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
        accommodation: Accommodation || 'NA',
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
      toast.success('Position added successfully.');
    } catch (error) {
      toast.error('Error adding position.');
      console.error('Error adding position:', error);
    }
  };

  const handleRemove = async (positionId) => {
    if (!positionId) return;

    try {
      console.log('Removing position with ID:', positionId);
      await api.delete(`/position/remove/position`, { params: { position_id: positionId } });
      setAllPositions(allPositions.filter((pos) => pos.id !== positionId));
      toast.success('Position removed successfully.');
    } catch (error) {
      toast.error('Error removing position.');
      console.error('Error removing position:', error);
    }
  };
  // Edit Title
  const handleTitle = async (companyId, positionId) => {
    if (!positionId) return;
    try {
      console.log('Updating title for position ID:', positionId);
      console.log('New title:', Title);
      console.log('Company ID:', companyId);
      const payload = { company_id: companyId, position_id: positionId, title: Title };
      await api.put(`/position/update/title`, payload);
      toast.success('Title updated successfully.');
      setEditTitle(false);
      setUpdated(!updated);
    } catch (error) {
      toast.error('Error updating title.');
      console.error('Error updating title:', error);
    }
  };
  // Edit Position Number
  const handlePositionNumber = async (companyId, positionId) => {
    if (!positionId) return;
    try {
      const payload = { company_id: companyId, position_id: positionId, job_number: Number };
      await api.put(`/position/update/job_number`, payload);
      toast.success('Position number updated successfully.');
      setEditNumber(false);
      setUpdated(!updated);
    } catch (error) {
      toast.error('Error updating position number.');
      console.error('Error updating position number:', error);
    }
  };
  // Position Experience Level
  const handleExperienceLevel = async (companyId, positionId) => {
    if (!positionId) return;
    try {
      const payload = {
        company_id: companyId,
        position_id: positionId,
        experience_level: ExperienceLevel,
      };
      await api.put(`/position/update/experience_level`, payload);
      toast.success('Experience level updated successfully.');
      setEditExperienceLevel(false);
      setUpdated(!updated);
    } catch (error) {
      toast.error('Error updating experience level.');
      console.error('Error updating experience level:', error);
    }
  };
  // Position Remote Type
  const handleRemoteType = async (companyId, positionId) => {
    if (!positionId) return;
    try {
      const payload = { company_id: companyId, position_id: positionId, remote_type: RemoteType };
      await api.put(`/position/update/remote_type`, payload);
      toast.success('Remote type updated successfully.');
      setEditRemoteType(false);
      setUpdated(!updated);
    } catch (error) {
      toast.error('Error updating remote type.');
      console.error('Error updating remote type:', error);
    }
  };
  // Position Date Posted
  const handleDatePosted = async (companyId, positionId) => {
    if (!positionId) return;
    try {
      const payload = { company_id: companyId, position_id: positionId, date_posted: DatePosted };
      await api.put(`/position/update/date_posted`, payload);
      toast.success('Date posted updated successfully.');
      setEditDatePosted(false);
      setUpdated(!updated);
    } catch (error) {
      toast.error('Error updating title.');
      console.error('Error updating title:', error);
    }
  };
  // Position Department
  const handleDepartment = async (companyId, positionId) => {
    if (!positionId) return;
    try {
      const payload = { company_id: companyId, position_id: positionId, department: Department };
      await api.put(`/position/update/department`, payload);
      toast.success('Department updated successfully.');
      setEditDepartment(false);
      setUpdated(!updated);
    } catch (error) {
      toast.error('Error updating title.');
      console.error('Error updating title:', error);
    }
  };
  // Position Compensation
  const handleCompensation = async (companyId, positionId) => {
    if (!positionId) return;
    try {
      const payload = {
        company_id: companyId,
        position_id: positionId,
        compensation: Compensation,
      };
      const res = await api.put(`/position/update/compensation`, payload);
      toast.success(`Compensation updated successfully.${res.data.detail}`);
      setEditCompensation(false);
      setUpdated(!updated);
    } catch (error) {
      toast.error('Error updating compensation.');
      console.error('Error updating compensation:', error);
    }
  };
  // Position Accomodation
  const handleAccommodation = async (companyId, positionId) => {
    if (!positionId) return;
    try {
      const payload = {
        company_id: companyId,
        position_id: positionId,
        accomodation: Accommodation,
      };
      console.log('Updating accommodation with payload:', payload);
      await api.put(`/position/update/accommodation`, payload);
      toast.success('Accommodation updated successfully.');
      setEditAccommodation(false);
      setUpdated(!updated);
    } catch (error) {
      toast.error('Error updating accommodation.');
      console.error('Error updating accommodation:', error);
    }
  };
  // Position Status
  const handleStatus = async (companyId, positionId) => {
    if (!positionId) return;
    try {
      const payload = { company_id: companyId, position_id: positionId, status: Status };
      console.log('Updating status with payload:', payload);
      await api.put(`/position/update/status`, payload);
      toast.success('Status updated successfully.');
      setEditStatus(false);
      setUpdated(!updated);
    } catch (error) {
      toast.error('Error updating status.');
      console.error('Error updating status:', error);
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
            <p className="font-semibold">
              # of Positions:{' '}
              <span className="text-amber-500 font-bold">{allPositions.length}</span>
            </p>
            <button
              onClick={() => setAddPosition(true)}
              className="bg-white hover:bg-amber-800 hover:text-white text-gray-800  px-1 rounded-lg shadow-sm shadow-white text-xs md:text-sm"
            >
              Add Position
            </button>
          </div>
          {/* Positions details would go here */}
          <div className="max-h-[900px] overflow-x-auto">
            {allPositions.length > 0 ? (
              allPositions.map((position) => (
                <div
                  key={position.id}
                  className="bg-gray-700 p-4 rounded-lg shadow-md mb-4 flex flex-col"
                >
                  <div className="flex justify-end gap-x-5 my-3">
                    <button
                      onClick={() => handleRemove(position.id, 'title')}
                      className="text-white bg-red-500 rounded-sm px-1 text-xs md:text-sm hover:bg-red-700 hover:text-black duration-75"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => {
                        setRecruiterShow(!recruiterShow);
                        console.log('Recruiter Show:', recruiterShow);
                      }}
                      className="text-white min-w-[54px] bg-amber-800 px-1 hover:text-black hover:bg-amber-500"
                    >
                      Add Recruiter
                    </button>
                  </div>
                  <div className="md:grid md:grid-cols-3 md:gap-x-6">
                    <div className="flex flex-col gap-y-3 mx-auto ">
                      <p className="text-lg md:text-xl font-bold text-amber-500 flex">
                        Title:
                        {editTitle ? (
                          <>
                            <input
                              type="text"
                              placeholder="Edit title"
                              onChange={(e) => setTitle(e.target.value)}
                              className="bg-gray-600 text-xs md:text-sm px-1 text-white ml-1 rounded-sm focus:ring-2 focus:ring-white border-none ring-amber-500"
                            />
                          </>
                        ) : (
                          <>
                            <span className="text-white text-sm md:text-base ml-2 mt-1">
                              {position.title}
                            </span>
                          </>
                        )}
                        <span onClick={() => setEditTitle(!editTitle)}>
                          <GrEdit
                            className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                              editTitle ? 'text-amber-500 hover:w-4 hover:h-4' : 'text-gray-500'
                            } hover:cursor-pointer`}
                          />
                        </span>
                        <span>
                          {editTitle && (
                            <span onClick={() => handleTitle(position.company_id, position.id)}>
                              <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                            </span>
                          )}
                        </span>
                      </p>
                      <p className="text-sm md:text-base text-amber-500 flex">
                        Position Number:
                        {editNumber ? (
                          <>
                            <input
                              type="text"
                              placeholder="Edit title"
                              onChange={(e) => setNumber(e.target.value)}
                              className="bg-gray-600 text-xs md:text-sm px-1 text-white ml-1 rounded-sm focus:ring-2 focus:ring-white border-none ring-amber-500"
                            />
                          </>
                        ) : (
                          <>
                            <span className="text-white text-sm md:text-base ml-2 ">
                              {position.job_number}
                            </span>
                          </>
                        )}
                        <span onClick={() => setEditNumber(!editNumber)}>
                          <GrEdit
                            className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                              editNumber ? 'text-amber-500 hover:w-4 hover:h-4' : 'text-gray-500'
                            } hover:cursor-pointer`}
                          />
                        </span>
                        <span>
                          {editNumber && (
                            <span
                              onClick={() => handlePositionNumber(position.company_id, position.id)}
                            >
                              <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                            </span>
                          )}
                        </span>
                      </p>
                      <p className="text-sm md:text-base text-amber-500 flex ">
                        Experience Level:
                        {editExperienceLevel ? (
                          <div className="ml-2 mb-2">
                            <select
                              onChange={(e) => setExperienceLevel(e.target.value)}
                              className=" bg-gray-600 text-xs md:text-sm  px-1 text-white ml-1 rounded-sm focus:ring-2 focus:ring-white border-none ring-amber-500 "
                            >
                              <option value="NA">NA</option>
                              <option value="full_time">Full Time</option>
                              <option value="part_time">Part Time</option>
                              <option value="internship">Internship</option>
                              <option value="contract">Contract</option>
                              <option value="temporary">Temporary</option>
                            </select>
                          </div>
                        ) : (
                          <>
                            <span className="text-white text-sm md:text-base ml-2 ">
                              {position.experience_level}
                            </span>
                          </>
                        )}
                        <span onClick={() => setEditExperienceLevel(!editExperienceLevel)}>
                          <GrEdit
                            className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                              editExperienceLevel
                                ? 'text-amber-500 hover:w-4 hover:h-4'
                                : 'text-gray-500'
                            } hover:cursor-pointer`}
                          />
                        </span>
                        <span>
                          {editExperienceLevel && (
                            <span
                              onClick={() =>
                                handleExperienceLevel(position.company_id, position.id)
                              }
                            >
                              <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                            </span>
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-3 mt-1 mx-auto items-center justify-center">
                      <p className="text-sm md:text-base text-amber-500 flex">
                        Remote Type:{' '}
                        {editRemoteType ? (
                          <div className="ml-2 ">
                            <select
                              onChange={(e) => setRemoteType(e.target.value)}
                              className=" bg-gray-600 text-xs md:text-sm px-1 text-white ml-1 rounded-sm focus:ring-2 focus:ring-white border-none ring-amber-500"
                            >
                              <option value="NA">NA</option>
                              <option value="on-site">Onsite</option>
                              <option value="hybrid">Hybrid</option>
                              <option value="remote">Remote</option>
                            </select>
                          </div>
                        ) : (
                          <>
                            <span className="text-white text-sm md:text-base ml-2 ">
                              {position.experience_level}
                            </span>
                          </>
                        )}
                        <span onClick={() => setEditRemoteType(!editRemoteType)}>
                          <GrEdit
                            className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                              editRemoteType
                                ? 'text-amber-500 hover:w-4 hover:h-4'
                                : 'text-gray-500'
                            } hover:cursor-pointer`}
                          />
                        </span>
                        <span>
                          {editRemoteType && (
                            <span
                              onClick={() => handleRemoteType(position.company_id, position.id)}
                            >
                              <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                            </span>
                          )}
                        </span>
                      </p>
                      <p className="text-sm md:text-base text-amber-500 flex">
                        Date Posted:{' '}
                        {editDatePosted ? (
                          <>
                            <input
                              type="date"
                              max={today}
                              placeholder="Edit title"
                              onChange={(e) => setDatePosted(e.target.value)}
                              className="bg-gray-600 text-xs md:text-sm px-1 text-white ml-1 rounded-sm focus:ring-2 focus:ring-white border-none ring-amber-500"
                            />
                          </>
                        ) : (
                          <>
                            <span className="text-white text-sm md:text-base ml-2 ">
                              {position.date_posted}
                            </span>
                          </>
                        )}
                        <span onClick={() => setEditDatePosted(!editDatePosted)}>
                          <GrEdit
                            className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                              editDatePosted
                                ? 'text-amber-500 hover:w-4 hover:h-4'
                                : 'text-gray-500'
                            } hover:cursor-pointer`}
                          />
                        </span>
                        <span>
                          {editDatePosted && (
                            <span
                              onClick={() => handleDatePosted(position.company_id, position.id)}
                            >
                              <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                            </span>
                          )}
                        </span>
                      </p>
                      <p className="text-sm md:text-base text-amber-500 flex">
                        Department:{' '}
                        {editDepartment ? (
                          <>
                            <input
                              type="text"
                              placeholder="Edit title"
                              onChange={(e) => setDepartment(e.target.value)}
                              className="bg-gray-600 text-xs md:text-sm px-1 text-white ml-1 rounded-sm focus:ring-2 focus:ring-white border-none ring-amber-500"
                            />
                          </>
                        ) : (
                          <>
                            <span className="text-white text-sm md:text-base ml-2 ">
                              {position.department || 'N/A'}
                            </span>
                          </>
                        )}
                        <span onClick={() => setEditDepartment(!editDepartment)}>
                          <GrEdit
                            className={`w-3 h-3 text-center align-middle mt-2  ml-2 ${
                              editDepartment
                                ? 'text-amber-500 hover:w-4 hover:h-4 '
                                : 'text-gray-500'
                            } hover:cursor-pointer`}
                          />
                        </span>
                        <span>
                          {editDepartment && (
                            <span
                              onClick={() => handleDepartment(position.company_id, position.id)}
                            >
                              <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                            </span>
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-3 mt-1 mx-auto">
                      <p className="text-sm md:text-base text-amber-500 flex">
                        Compensation:
                        {editCompensation ? (
                          <>
                            <input
                              type="number"
                              inputMode="decimal"
                              min={0}
                              step={0.01}
                              placeholder="Edit Compensation"
                              onChange={(e) => setCompensation(e.target.value)}
                              className="bg-gray-600 text-xs md:text-sm px-1 text-white ml-1 rounded-sm focus:ring-2 focus:ring-white border-none ring-amber-500"
                            />
                          </>
                        ) : (
                          <>
                            <span className="text-white text-sm md:text-base ml-2 ">
                              {position.compensation || 'Not provided'}
                            </span>
                          </>
                        )}
                        <span onClick={() => setEditCompensation(!editCompensation)}>
                          <GrEdit
                            className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                              editCompensation
                                ? 'text-amber-500 hover:w-4 hover:h-4'
                                : 'text-gray-500'
                            } hover:cursor-pointer`}
                          />
                        </span>
                        <span>
                          {editCompensation && (
                            <span
                              onClick={() => handleCompensation(position.company_id, position.id)}
                            >
                              <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                            </span>
                          )}
                        </span>
                      </p>

                      <p className="text-sm md:text-base text-amber-500 flex ">
                        Accommodation:{' '}
                        {editAccommodation ? (
                          <div className="ml-2 ">
                            <select
                              onChange={(e) => setAccommodation(e.target.value)}
                              className=" bg-gray-600 text-xs md:text-sm px-1 text-white ml-1 rounded-sm focus:ring-2 focus:ring-white border-none ring-amber-500"
                            >
                              <option value="NA">NA</option>
                              <option value="provided">Provided</option>
                              <option value="not provided">Required</option>
                            </select>
                          </div>
                        ) : (
                          <>
                            <span className="text-white text-sm md:text-base ml-2 ">
                              {position.accommodation}
                            </span>
                          </>
                        )}
                        <span onClick={() => setEditAccommodation(!editAccommodation)}>
                          <GrEdit
                            className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                              editAccommodation
                                ? 'text-amber-500 hover:w-4 hover:h-4'
                                : 'text-gray-500'
                            } hover:cursor-pointer`}
                          />
                        </span>
                        <span>
                          {editAccommodation && (
                            <span
                              onClick={() => handleAccommodation(position.company_id, position.id)}
                            >
                              <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                            </span>
                          )}
                        </span>
                      </p>
                      <p className="text-sm md:text-base text-amber-500 flex">
                        Status:{' '}
                        {editStatus ? (
                          <div className="ml-2 ">
                            <select
                              onChange={(e) => setStatus(e.target.value)}
                              required
                              name="Status"
                              id=""
                              className=" rounded bg-gray-700 text-white"
                            >
                              <option value="Have not decided">Have not decided</option>
                              <option value="submitted">Applied</option>
                              <option value="interviewing">Interviewing</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        ) : (
                          <>
                            <span className="text-white text-sm md:text-base ml-2 ">
                              {position.status}
                            </span>
                          </>
                        )}
                        <span onClick={() => setEditStatus(!editStatus)}>
                          <GrEdit
                            className={`w-3 h-3 text-center align-middle mt-3 ml-2 ${
                              editStatus ? 'text-amber-500 hover:w-4 hover:h-4' : 'text-gray-500'
                            } hover:cursor-pointer`}
                          />
                        </span>
                        <span>
                          {editStatus && (
                            <span onClick={() => handleStatus(position.company_id, position.id)}>
                              <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-3" />
                            </span>
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
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
                  <option value="default">NA</option>
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
                  <option value="default">NA</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote</option>
                </select>
                {/* Position Date Posted */}
                <p className="text-red-500 -mb-2 ">
                  * <span className="text-sm text-white">Date Posted</span>
                </p>

                <input
                  type="date"
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
                  <option value="default">NA</option>
                  <option value="provided">Provided</option>
                  <option value="required">Not provided</option>
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
                  <option value="default">NA</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interviewing</option>
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
      {recruiterShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-75">
          <div className="max-w-3xl mx-auto bg-black min-w-[60%] flex flex-col justify-center items-center  px-4">
            <Recruiter />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
