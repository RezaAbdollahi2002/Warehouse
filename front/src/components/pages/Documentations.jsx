import { useState, useEffect, use } from 'react';
import api from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import { TbTruckLoading } from 'react-icons/tb';
import { IoMdCloseCircle } from 'react-icons/io';
import PrimaryResume from '../Home/Documentations/PrimaryResume';
import SecondaryResume from '../Home/Documentations/SecondaryResume';
import PrimaryCoverLetter from '../Home/Documentations/PrimaryCoverLetter';
import SecondaryCoverLetter from '../Home/Documentations/SecondaryCoverLetter';

const Documentations = () => {
  const [show, setShow] = useState(false);
  const [documentations, setDocumentations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateState, setUpdateState] = useState(false);
  const [documentationId, setDocumentationId] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    const createDocumentation = async () => {
      const documentationStatus = localStorage.getItem('documentation_status');
      console.log('Documentation status' + documentationStatus);
      if (documentationStatus === 'created') {
        return;
      }
      try {
        setLoading(true);
        const res = await api.post('/documentation');
        localStorage.setItem('documentation_status', 'created');
      } catch (err) {
        setError('Failed to create documentations');
      } finally {
        setLoading(false);
      }
    };

    createDocumentation();
  }, [loading, updateState, error]);

  useEffect(() => {
    const getDocumentations = async () => {
      try {
        setLoading(true);
        // Simulate API call
        const res = await api.get('/documentation/get/all');
        console.log('Fetched documentations:', res.data);
        setDocumentationId(res.data.id);
        setDocumentations(res.data);
      } catch (err) {
        setError('No documentations found. Go ahead and create one!');
      } finally {
        setLoading(false);
      }
    };
    getDocumentations();
  }, [updateState]);

  // Function to remove all documentations
  const removeAllDocumentations = async () => {
    console.log('Removing all documentations');
    try {
      setLoading(true);
      const confirem = window.confirm(
        'Are you sure you want to remove all documentations? This action cannot be undone.'
      );
      if (!confirem) {
        setLoading(false);
        return;
      }
      await api.delete('/documentation/remove/all');
      const documentation_status = localStorage.getItem('documentation_status');
      if (documentation_status) {
        localStorage.removeItem('documentation_status');
      }
      setDocumentations([]);
      toast.success('All documentations removed successfully');
    } catch (err) {
      setError('Failed to remove documentations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen ">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <TbTruckLoading className="animate-spin text-amber-500 text-4xl" />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center mx-auto z-50 fixed inset-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center">
          <button>
            <IoMdCloseCircle
              className="text-red-500 text-4xl absolute top-5 right-5 hover:cursor-pointer"
              onClick={() => setError(null)}
            />
          </button>
          <p className="text-red-500 py-auto px-auto text-xl md:text-3xl text-center">{error}</p>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className=" bg-gray-800 flex-1 flex flex-col  max-w-[1200px] mx-auto  py-3 px-4 shadow-xl shadow-white min-h-screen text-white">
        {/* Header */}
        <div className="w-full shrink-0 flex justify-center items-center ">
          <h1 className="text-amber-500 text-2xl md:text-5xl font-bold p-5">Documentations Page</h1>
          {documentations.length > 0 && documentations.profile_picture && (
            <img
              src={documentations.profile_picture}
              className="w-12 h-12 rounded-full bg-transparent"
            />
          )}
        </div>
        {/* Content */}
        <div className="text-center my-2">
          <button
            onClick={() => removeAllDocumentations()}
            className="text-white border-4 border-black px-2 rounded-md bg-red-600  shadow-md shadow-black hover:text-red-500 hover:bg-black duration-700"
          >
            Remove All Documentations
          </button>
        </div>
        <div className="flex flex-col md:grid-3 md:grid-cols-3 gap-6">
          <div className="w-full">
            {/* Primary Resume */}
            <PrimaryResume
              primaryResume={documentations.primary_resume}
              setUpdateState={setUpdateState}
              updateState={updateState}
              documentationId={documentationId}
            />
          </div>
          <div>
            {/* Secondary Resume */}
            <SecondaryResume
              secondaryResume={documentations.secondary_resume}
              setUpdateState={setUpdateState}
              updateState={updateState}
              documentationId={documentationId}
            />
          </div>
          <div>
            {/* Primary Cover Letter */}
            <PrimaryCoverLetter
              primaryCoverLetter={documentations.primary_cover_letter}
              setUpdateState={setUpdateState}
              updateState={updateState}
              documentationId={documentationId}
            />
          </div>
          <div>
            {/* Secondary Cover Letter */}
            <SecondaryCoverLetter
              secondaryCoverLetter={documentations.secondary_cover_letter}
              setUpdateState={setUpdateState}
              updateState={updateState}
              documentationId={documentationId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentations;
