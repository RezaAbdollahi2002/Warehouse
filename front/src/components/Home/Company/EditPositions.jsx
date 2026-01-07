import { useState, useEfect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import { FaCheckCircle } from 'react-icons/fa';
import {
  handleRecruiters,
  handleRemove,
  handleTitle,
  handlePositionNumber,
  handleExperienceLevel,
  handleRemoteType,
  handleDatePosted,
  handleDepartment,
  handleCompensation,
  handleAccommodation,
  handleStatus,
} from '../Company/CompanyHandleHelper';

const EditPositions = ({
  allPositions,
  setAllPositions,
  setUpdated,
  updated,
  setPositionIdForRecruiters,
  setAllRecruiters,
  setRecruiterShow,
  setRecruiterAdd,
  setPositionIdToAddRecruiter = { setPositionIdToAddRecruiter },
  recruiterAdd,
}) => {
  const [positionIdToBeEdited, setPositionIdToBeEdited] = useState(null);
  const [editTitle, setEditTitle] = useState(false);
  const [editNumber, setEditNumber] = useState(false);
  const [editExperienceLevel, setEditExperienceLevel] = useState(false);
  const [editRemoteType, setEditRemoteType] = useState(false);
  const [editDatePosted, setEditDatePosted] = useState(false);
  const [editDepartment, setEditDepartment] = useState(false);
  const [editCompensation, setEditCompensation] = useState(false);
  const [editAccommodation, setEditAccommodation] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
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

  return (
    <div>
      {allPositions.length > 0 ? (
        allPositions.map((position) => (
          <div
            key={position.id}
            className="bg-gray-700 p-4 rounded-lg shadow-md mb-4 flex flex-col gap-y-3"
          >
            <div className="flex justify-between gap-x-5 my-3">
              <div>
                <button
                  onClick={() =>
                    handleRecruiters(
                      position.id,
                      setRecruiterShow,
                      setPositionIdForRecruiters,
                      setAllRecruiters
                    )
                  }
                  className="text-md  rounded-sm bg-amber-700 px-1 font-semibold text-gray-800 hover:bg-amber-900 hover:text-white"
                >
                  Show Recruiters
                </button>
              </div>
              <div className="flex gap-x-3">
                <button
                  onClick={() => handleRemove(position.id, setAllPositions, allPositions)}
                  className="text-gray-800 bg-red-600 rounded-sm px-1 text-xs md:text-sm hover:bg-red-900 hover:text-white duration-75 font-semibold"
                >
                  Remove
                </button>
                <button
                  onClick={() => {
                    setRecruiterAdd(!recruiterAdd);
                    setPositionIdToAddRecruiter(position.id);
                    setRecruiterShow(false);
                    console.log('Recruiter Show:', recruiterAdd);
                  }}
                  className="min-w-[54px] bg-amber-700 px-1 hover:text-white hover:bg-amber-900 font-semibold text-gray-800"
                >
                  Add Recruiter
                </button>
              </div>
            </div>
            <div className="flex flex-col  lg:grid lg:grid-cols-3 lg:mx-auto lg:gap-x-6 gap-y-3">
              <div className="flex flex-col gap-y-3 justify-around ">
                <p className="text-lg md:text-xl ldfont-bold text-amber-500 flex">
                  Title:
                  {editTitle && positionIdToBeEdited === position.id ? (
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
                  <span
                    onClick={() => {
                      setEditTitle(!editTitle);
                      setPositionIdToBeEdited(position.id);
                    }}
                  >
                    <GrEdit
                      className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                        editTitle && positionIdToBeEdited === position.id
                          ? 'text-amber-500 hover:w-4 hover:h-4'
                          : 'text-gray-500'
                      } hover:cursor-pointer`}
                    />
                  </span>
                  <span>
                    {editTitle && positionIdToBeEdited === position.id && (
                      <span
                        onClick={() =>
                          handleTitle(
                            position.company_id,
                            position.id,
                            Title,
                            setEditTitle,
                            setUpdated,
                            updated
                          )
                        }
                      >
                        <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                      </span>
                    )}
                  </span>
                </p>
                <p className="text-sm md:text-base text-amber-500 flex">
                  Position Number:
                  {editNumber && positionIdToBeEdited === position.id ? (
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
                  <span onClick={() => {setEditNumber(!editNumber);setPositionIdToBeEdited(position.id);}}>
                    <GrEdit
                      className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                        editNumber && positionIdToBeEdited === position.id
                          ? 'text-amber-500 hover:w-4 hover:h-4'
                          : 'text-gray-500'
                      } hover:cursor-pointer`}
                    />
                  </span>
                  <span>
                    {editNumber && positionIdToBeEdited === position.id && (
                      <span
                        onClick={() =>
                          handlePositionNumber(
                            position.company_id,
                            position.id,
                            Number,
                            setEditNumber,
                            setUpdated,
                            updated
                          )
                        }
                      >
                        <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                      </span>
                    )}
                  </span>
                </p>
                <p className="text-sm md:text-base text-amber-500 flex ">
                  Experience Level:
                  {editExperienceLevel && positionIdToBeEdited === position.id ? (
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
                  <span onClick={() => {setEditExperienceLevel(!editExperienceLevel);setPositionIdToBeEdited(position.id);}}>
                    <GrEdit
                      className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                        editExperienceLevel && positionIdToBeEdited === position.id
                          ? 'text-amber-500 hover:w-4 hover:h-4'
                          : 'text-gray-500'
                      } hover:cursor-pointer`}
                    />
                  </span>
                  <span>
                    {editExperienceLevel && positionIdToBeEdited === position.id && (
                      <span
                        onClick={() =>
                          handleExperienceLevel(
                            position.company_id,
                            position.id,
                            ExperienceLevel,
                            setEditExperienceLevel,
                            setUpdated,
                            updated
                          )
                        }
                      >
                        <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                      </span>
                    )}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-y-3 ">
                <p className="text-sm md:text-base text-amber-500 flex">
                  Remote Type:{' '}
                  {editRemoteType && positionIdToBeEdited === position.id ? (
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
                        {position.remote_type}
                      </span>
                    </>
                  )}
                  <span onClick={() => {setEditRemoteType(!editRemoteType);setPositionIdToBeEdited(position.id);}}>
                    <GrEdit
                      className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                        editRemoteType && positionIdToBeEdited === position.id
                          ? 'text-amber-500 hover:w-4 hover:h-4'
                          : 'text-gray-500'
                      } hover:cursor-pointer`}
                    />
                  </span>
                  <span>
                    {editRemoteType && positionIdToBeEdited === position.id && (
                      <span
                        onClick={() =>
                          handleRemoteType(
                            position.company_id,
                            position.id,
                            RemoteType,
                            setEditRemoteType,
                            setUpdated,
                            updated
                          )
                        }
                      >
                        <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                      </span>
                    )}
                  </span>
                </p>
                <p className="text-sm md:text-base text-amber-500 flex">
                  Date Posted:{' '}
                  {editDatePosted && positionIdToBeEdited === position.id ? (
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
                  <span onClick={() => {setEditDatePosted(!editDatePosted);setPositionIdToBeEdited(position.id);}}>
                    <GrEdit
                      className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                        editDatePosted && positionIdToBeEdited === position.id
                          ? 'text-amber-500 hover:w-4 hover:h-4'
                          : 'text-gray-500'
                      } hover:cursor-pointer`}
                    />
                  </span>
                  <span>
                    {editDatePosted && positionIdToBeEdited === position.id && (
                      <span
                        onClick={() =>
                          handleDatePosted(
                            position.company_id,
                            position.id,
                            DatePosted,
                            setEditDatePosted,
                            setUpdated,
                            updated
                          )
                        }
                      >
                        <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                      </span>
                    )}
                  </span>
                </p>
                <p className="text-sm md:text-base text-amber-500 flex">
                  Department:{' '}
                  {editDepartment && positionIdToBeEdited === position.id ? (
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
                  <span onClick={() => {setEditDepartment(!editDepartment);setPositionIdToBeEdited(position.id);}}>
                    <GrEdit
                      className={`w-3 h-3 text-center align-middle mt-2  ml-2 ${
                        editDepartment && positionIdToBeEdited === position.id
                          ? 'text-amber-500 hover:w-4 hover:h-4 '
                          : 'text-gray-500'
                      } hover:cursor-pointer`}
                    />
                  </span>
                  <span>
                    {editDepartment && positionIdToBeEdited === position.id && (
                      <span
                        onClick={() =>
                          handleDepartment(
                            position.company_id,
                            position.id,
                            Department,
                            setEditDepartment,
                            setUpdated,
                            updated
                          )
                        }
                      >
                        <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                      </span>
                    )}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-y-3 ">
                <p className="text-sm md:text-base text-amber-500 flex">
                  Compensation:
                  {editCompensation && positionIdToBeEdited === position.id ? (
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
                  <span onClick={() => {setEditCompensation(!editCompensation);setPositionIdToBeEdited(position.id);}}>
                    <GrEdit
                      className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                        editCompensation && positionIdToBeEdited === position.id
                          ? 'text-amber-500 hover:w-4 hover:h-4'
                          : 'text-gray-500'
                      } hover:cursor-pointer`}
                    />
                  </span>
                  <span>
                    {editCompensation && positionIdToBeEdited === position.id && (
                      <span
                        onClick={() =>
                          handleCompensation(
                            position.company_id,
                            position.id,
                            Compensation,
                            setEditCompensation,
                            setUpdated,
                            updated
                          )
                        }
                      >
                        <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                      </span>
                    )}
                  </span>
                </p>

                <p className="text-sm md:text-base text-amber-500 flex ">
                  Accommodation:{' '}
                  {editAccommodation && positionIdToBeEdited === position.id ? (
                    <div className="ml-2">
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
                  <span onClick={() => {setEditAccommodation(!editAccommodation);setPositionIdToBeEdited(position.id);}}>
                    <GrEdit
                      className={`w-3 h-3 text-center align-middle mt-2 ml-2 ${
                        editAccommodation && positionIdToBeEdited === position.id
                          ? 'text-amber-500 hover:w-4 hover:h-4'
                          : 'text-gray-500'
                      } hover:cursor-pointer`}
                    />
                  </span>
                  <span>
                    {editAccommodation && positionIdToBeEdited === position.id && (
                      <span
                        onClick={() =>
                          handleAccommodation(
                            position.company_id,
                            position.id,
                            Accommodation,
                            setEditAccommodation,
                            setUpdated,
                            updated
                          )
                        }
                      >
                        <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-2" />
                      </span>
                    )}
                  </span>
                </p>
                <p className="text-sm md:text-base text-amber-500 flex">
                  Status:{' '}
                  {editStatus && positionIdToBeEdited === position.id ? (
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
                  <span onClick={() => {setEditStatus(!editStatus);setPositionIdToBeEdited(position.id);}}>
                    <GrEdit
                      className={`w-3 h-3 text-center align-middle mt-1 ml-2 ${
                        editStatus && positionIdToBeEdited === position.id
                          ? 'text-amber-500 hover:w-4 hover:h-4'
                          : 'text-gray-500'
                      } hover:cursor-pointer`}
                    />
                  </span>
                  <span>
                    {editStatus && positionIdToBeEdited === position.id && (
                      <span
                        onClick={() =>
                          handleStatus(
                            position.company_id,
                            position.id,
                            Status,
                            setEditStatus,
                            setUpdated,
                            updated
                          )
                        }
                      >
                        <FaCheckCircle className="w-4 h-4 text-green-500 hover:cursor-pointer ml-2 mt-1" />
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
  );
};

export default EditPositions;
