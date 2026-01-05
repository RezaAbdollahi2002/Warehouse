import { useState, useEffect } from 'react';
import api from '../../../api';
import { toast } from 'react-toastify';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import {
  handleEditRecruiterEmail,
  handleEditRecruiterPhone,
  normalizePhoneNumber,
  handleEditRecruiterFirstName,
  handleEditRecruiterLastName,
} from '../Company/CompanyHandleHelper';

const EditRecruiter = ({ allRecruiters, setUpdated, updated, setAllRecruiters }) => {
  // Recruiter Edit
  const [recruiterEditShow, setRecruiterEditShow] = useState(false);
  const [recruiterEditNameShow, setRecruiterEditNameShow] = useState(false);
  const [recruiterFirstNameEdit, setRecruiterFirstNameEdit] = useState('');
  const [recruiterLastNameEdit, setRecruiterLastNameEdit] = useState('');
  const [recruiterEditEmailShow, setRecruiterEditEmailShow] = useState(false);
  const [recruiterEmailEdit, setRecruiterEmailEdit] = useState('');
  const [recruiterPhoneNumberEdit, setRecruiterPhoneNumberEdit] = useState('');
  const [recruiterEditPhoneNumberShow, setRecruiterEditPhoneNumberShow] = useState(false);
  const [recruiterIdToBeEdited, setRecruiterIdToBeEdited] = useState(null);

  const removeRecruiter = async (recruiterId) => {
    if (!recruiterId) return;
    const confirmed = window.confirm('Are you sure you want to remove this recruiter?');
    if (!confirmed) return;
    try {
      await api.delete(`/recruiter/remove/recruiter`, { data: { recruiter_id: recruiterId } });
      setAllRecruiters(allRecruiters.filter((rec) => rec.id !== recruiterId));
      toast.success('Recruiter removed successfully.');
    } catch (error) {
      console.error('Error removing recruiter:', error);
      toast.error('Error removing recruiter.');
    }
  };

  return (
    <div>
      {allRecruiters.map((recruiter) => (
        <div key={recruiter.id} className="mb-3 max-h-[600px] overflow-y-auto">
          <div className="bg-gray-900 px-2 py-2 rounded-sm flex flex-col gap-y-1 justify-center items-center">
            <div className="flex gap-x-2">
              <h1 className="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl">
                {recruiter.position_title}
              </h1>
              <button onClick={() => removeRecruiter(recruiter.id)} className="text-left ">
                <MdDelete className="text-red-500 w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-x-2 justify-center items-center">
              <p className="font-bold  text-base lg:text-base">
                <span className="text-white text-base">
                  <span className="text-amber-500">Name:</span>{' '}
                  {recruiterEditNameShow && recruiterIdToBeEdited === recruiter.id ? (
                    <>
                      <div className="flex flex-col gap-y-3 my-1">
                        <div className="flex gap-x-3">
                          <p className="text-sm text-white">First Name</p>
                          <button
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault(); // avoids scrolling on Space
                                handleEditRecruiterFirstName(
                                  recruiter.id,
                                  recruiterFirstNameEdit,
                                  setRecruiterFirstNameEdit,
                                  setUpdated,
                                  updated,
                                  setRecruiterEditNameShow
                                );
                              }
                            }}
                            onClick={() =>
                              handleEditRecruiterFirstName(
                                recruiter.id,
                                recruiterFirstNameEdit,
                                setRecruiterFirstNameEdit,
                                setUpdated,
                                updated,
                                setRecruiterEditNameShow
                              )
                            }
                          >
                            <FaCheck className="text-green-500 hover:cursor-pointer " />
                          </button>
                          <input
                            type="text"
                            placeholder="First Name"
                            required
                            pattern=".*\S.*"
                            onChange={(e) => setRecruiterFirstNameEdit(e.target.value)}
                            value={recruiterFirstNameEdit}
                            className="text-xs px-1   md:text-md bg-gray-700 rounded-sm  focus:ring-4 focus:ring-blue-700 focus:outline-none"
                          />
                        </div>
                        <div className="flex gap-x-3">
                          <p className="text-sm text-white">Last Name</p>
                          <button
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault(); // avoids scrolling on Space
                                handleEditRecruiterLastName(
                                  recruiter.id,
                                  recruiterLastNameEdit,
                                  setRecruiterLastNameEdit,
                                  setUpdated,
                                  updated,
                                  setRecruiterEditNameShow
                                );
                              }
                            }}
                            onClick={() =>
                              handleEditRecruiterLastName(
                                recruiter.id,
                                recruiterLastNameEdit,
                                setRecruiterLastNameEdit,
                                setUpdated,
                                updated,
                                setRecruiterEditNameShow
                              )
                            }
                          >
                            <FaCheck className="text-green-500 hover:cursor-pointer " />
                          </button>
                          <input
                            type="text"
                            placeholder="Last Name"
                            required
                            pattern=".*\S.*"
                            onChange={(e) => setRecruiterLastNameEdit(e.target.value)}
                            value={recruiterLastNameEdit}
                            className="text-xs px-1 md:text-md bg-gray-700 rounded-sm focus:ring-4 focus:ring-blue-700 focus:outline-none "
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    `${recruiter.first_name} ${recruiter.last_name}`
                  )}{' '}
                </span>
              </p>
              <button
                // work
                onClick={() => {
                  setRecruiterEditNameShow(!recruiterEditNameShow);
                  setRecruiterIdToBeEdited(recruiter.id);
                }}
              >
                <FaEdit
                  className={`${
                    recruiterEditNameShow && recruiterIdToBeEdited === recruiter.id
                      ? 'text-white mb-4'
                      : 'text-amber-500'
                  } hover:cursor-pointer`}
                />
              </button>
            </div>
            <div className="flex gap-x-2 justify-center items-center ">
              <p>
                Email:{' '}
                <span className="text-white">
                  {recruiterEditEmailShow && recruiterIdToBeEdited === recruiter.id ? (
                    <input
                      type="email"
                      onChange={(e) => setRecruiterEmailEdit(e.target.value)}
                      value={recruiterEmailEdit}
                      className="text-xs md:text-sm  rounded-sm bg-gray-700 text-amber-300 px-2 text-wrap focus:ring-4 focus:ring-blue-700 focus:outline-none mx-1"
                    />
                  ) : (
                    <span>{recruiter.email}</span>
                  )}
                </span>
              </p>
              <button
                // work
                onClick={() => {
                  setRecruiterEditEmailShow(!recruiterEditEmailShow);
                  setRecruiterIdToBeEdited(recruiter.id);
                }}
              >
                <FaEdit
                  className={`${
                    recruiterEditEmailShow && recruiterIdToBeEdited === recruiter.id
                      ? 'text-white'
                      : 'text-amber-500'
                  } hover:cursor-pointer`}
                />
              </button>
              {recruiterEditEmailShow && recruiterIdToBeEdited === recruiter.id && (
                <button
                  onClick={() =>
                    handleEditRecruiterEmail(
                      recruiter.id,
                      recruiterEmailEdit,
                      setRecruiterEmailEdit,
                      setUpdated,
                      updated,
                      setRecruiterEditEmailShow
                    )
                  }
                >
                  <FaCheck className="text-green-500 hover:cursor-pointer" />
                </button>
              )}
            </div>
            <div className="flex gap-x-2 justify-center items-center ">
              <p>
                Phone Number:{' '}
                <span className="text-white">
                  {recruiterEditPhoneNumberShow && recruiterIdToBeEdited === recruiter.id ? (
                    <input
                      type="tel"
                      min={10}
                      max={10}
                      onChange={(e) => setRecruiterPhoneNumberEdit(e.target.value)}
                      value={recruiterPhoneNumberEdit}
                      className="text-xs md:text-sm  rounded-sm bg-gray-700 text-amber-300 px-2 text-wrap focus:ring-4 focus:ring-blue-700 focus:outline-none mx-1"
                    />
                  ) : (
                    <span>{normalizePhoneNumber(recruiter.phone_number) || 'N/A'}</span>
                  )}
                </span>
              </p>
              <button
                // work
                onClick={() => {
                  setRecruiterEditPhoneNumberShow(!recruiterEditPhoneNumberShow);
                  setRecruiterIdToBeEdited(recruiter.id);
                }}
              >
                <FaEdit
                  className={`${
                    recruiterEditPhoneNumberShow && recruiterIdToBeEdited === recruiter.id
                      ? 'text-white'
                      : 'text-amber-500'
                  } hover:cursor-pointer`}
                />
              </button>
              {recruiterEditPhoneNumberShow && recruiterIdToBeEdited === recruiter.id && (
                <button
                  onClick={() =>
                    handleEditRecruiterPhone(
                      recruiter.id,
                      recruiterPhoneNumberEdit,
                      setRecruiterPhoneNumberEdit,
                      setUpdated,
                      updated,
                      setRecruiterEditPhoneNumberShow
                    )
                  }
                >
                  <FaCheck className="text-green-500 hover:cursor-pointer" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditRecruiter;
