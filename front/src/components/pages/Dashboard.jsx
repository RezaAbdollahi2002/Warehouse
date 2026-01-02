import api from '../../api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const access_token = localStorage.getItem('token');

  useEffect(() => {
    const get_companies = async () => {
      try {
        const response = await api.get('/company/all');
        setCompanies(response.data);
      } catch (error) {
        setError('No companies found.');
        console.error('Error fetching companies:', error);
      }
    };
    get_companies();
  }, [access_token]);

  const handleClick = async (companyId) => {
    console.log('Company clicked:', companyId);
    // Additional logic can be added here
    console.log('Navigating to company details page for company ID:', companyId);
    navigate('/dashboard/company_details', { state: { companyId } });
  }

  return (
    <div className="max-h-screen h-screen w-full inset-0 bg-[#040B17] text-white">
      <div className="max-w-[1200px] mx-auto bg-gray-800 h-screen px-12 shadow-xl shadow-white">
        {/* Welcome message */}
        <div>
          <h1 className="text-center py-5 text-lg md:text-xl xl:text-2xl font-bold text-amber-200">
            Welcome back to your Dashboard!
          </h1>
        </div>
        {/* Content area */}
        <div>
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map((company) => (
                <div 
                onClick={() => handleClick(company.id)}
                key={company.id} className="bg-gray-700 p-4 rounded-lg shadow-md hover:scale-105 duration-300 hover:shadow-white hover:cursor-pointer transition-transform  ">
                  {company.logo ? (
                    <img src={company.logo} alt={`${company.name} Logo`} className="h-16 mb-4" />
                  ) : (
                    <div className="h-16 mb-4 flex items-center justify-center bg-gray-600 text-white font-bold">
                      No Logo
                    </div>
                  )}
                  <div className='flex flex-col gap-y-2 text-white text-sm md:text-lg ld:text-xl'>
                    <h2 className="font-bold text-base md:text-lg lg:text-xl text-amber-500 ">Name: <span className='text-sm md:text-base text-white'>{company.name}</span></h2>
                    <p className='font-bold text-base md:text-lg lg:text-xl text-amber-500'>address: <span className='text-sm md:text-base text-white'>{company.address}</span></p>
                    <p className='font-bold text-base md:text-lg lg:text-xl text-amber-500'>url: <a href={company.url} target="_blank" rel="noopener noreferrer"><span className='text-sm md:text-base text-blue-600 underline '>{company.url}</span></a></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
