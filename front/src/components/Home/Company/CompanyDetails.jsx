import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Recruiter from './Recruiter';
import AddPosition from './AddPosition';
import { IoMdCloseCircle } from 'react-icons/io';
import { fetchCompanyDetails, fetchPositions } from './CompanyHandleHelper';
import EditRecruiter from './EditRecruiter';
import EditPositions from './EditPositions';
import { handleRecruiters } from './CompanyHandleHelper';

const CompanyDetails = () => {
  const { state } = useLocation();
  const companyId = state?.companyId;
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [newPosition, setNewPosition] = useState({});
  const [generalInfo, setGeneralInfo] = useState(null);
  const [addPosition, setAddPosition] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allPositions, setAllPositions] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [recruiterAdd, setRecruiterAdd] = useState(false);
  const [recruiterShow, setRecruiterShow] = useState(false);
  const [positionIdToAddRecruiter, setPositionIdToAddRecruiter] = useState(null);
  const [allRecruiters, setAllRecruiters] = useState([]);
  const [positionIdForRecruiters, setPositionIdForRecruiters] = useState(null);

  //   Fetch company details using companyId
  useEffect(() => {
    console.log('Received companyId:', companyId);
    if (!companyId) {
      setError('No company ID provided.');
      return;
    }
    // Fetch company details logic here
    console.log('Fetching details for company ID:', companyId);
    fetchCompanyDetails(companyId, setGeneralInfo, setLoading, setError);
  }, [companyId, newPosition]);

  // get all positions for the company
  useEffect(() => {
    fetchPositions(companyId, setAllPositions);
  }, [companyId, newPosition, updated]);

  useEffect(() => {
    handleRecruiters(positionIdForRecruiters);
  }, [updated]);

  return (
    <div className="w-full min-h-screen h-full  items-center bg-black text-white ">
      {loading && (
        <>
          <div className="flex items-center justify-center h-screen">
            <AiOutlineLoading3Quarters className="animate-spin text-amber-500 text-4xl" />
          </div>
        </>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-[1200px] mx-auto bg-gray-800 text-white p-6 shadow-xl shadow-white min-h-screen flex flex-col gap-y-5">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-white text-center">
          Company Details
        </h1>
        <div>
          <h1 className="text-lg md:text-xl font-bold mb-2 text-amber-500">Company Information</h1>
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
        <div className="flex flex-col gap-y-4 h-full w-full">
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
          <div className=" w-full h-full">
            {allPositions.length > 0 ? (
              <div>
                <EditPositions
                  allPositions={allPositions}
                  setAllPositions={setAllPositions}
                  setUpdated={setUpdated}
                  updated={updated}
                  setPositionIdForRecruiters={setPositionIdForRecruiters}
                  setAllRecruiters={setAllRecruiters}
                  setRecruiterShow={setRecruiterShow}
                  setRecruiterAdd={setRecruiterAdd}
                  setPositionIdToAddRecruiter={setPositionIdToAddRecruiter}
                  recruiterAdd={recruiterAdd}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {addPosition && (
          <AddPosition
            setAddPosition={setAddPosition}
            companyId={companyId}
            setNewPosition={setNewPosition}
          />
        )}
        <div className=" min-h-screen max-h-[1000px] overflow-y-auto">
          {
            // Show Recruiters
            recruiterShow && (
              <div className="w-full bg-gray-800 text-amber-500 rounded-md  pb-4 my-4  h-full min-h-[150px]  max-h-[700px] overflow-y-auto">
                <div className="sticky z-40  top-0 bg-amber-600 min-h-[60px] p-2 rounded-t-md flex justify-between items-center w-full">
                  <button onClick={() => setRecruiterShow(false)}>
                    <IoMdCloseCircle className="w-6 h-6 text-red-800 hover:text-black" />
                  </button>
                  <h1 className="text-center text-white font-bold">
                    {allRecruiters.length} Recruiter(s)
                  </h1>
                  <hr className="text-black my-3" />
                </div>

                {allRecruiters.length > 0 ? (
                  <div className="">
                    <EditRecruiter
                      allRecruiters={allRecruiters}
                      setUpdated={setUpdated}
                      updated={updated}
                      setAllRecruiters={setAllRecruiters}
                    />
                  </div>
                ) : (
                  <p className="text-center">No recruiters available for this position.</p>
                )}
              </div>
            )
          }
        </div>
      </div>
      {recruiterAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-90">
          <div className="max-w-3xl mx-auto bg-gray-800 min-w-[40%] flex flex-col justify-center items-center  px-4 rounded-lg">
            <button
              onClick={() => setRecruiterAdd(false)}
              className="self-end text-white hover:text-gray-300 "
            >
              <IoMdCloseCircle className="text-red-500 w-6 h-6 mt-3 hover:text-amber-500" />
            </button>
            <Recruiter
              setRecruiterAss={setRecruiterAdd}
              positionIdToAddRecruiter={positionIdToAddRecruiter}
              setUpdated={setUpdated}
              updated={updated}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
