import api from '../../api';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [quer, 
    setQuery] = useState('');

  const navigate = useNavigate();

  const filteredCompanies = useMemo(() => {
    const q = quer.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => (c.name ?? '').toLowerCase().includes(q));
  }, [companies, quer]);


  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await api.get('/company/all');

      // supports either: [ ... ] or { data: [ ... ] }
      const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setCompanies(list);

      if (!list.length) setError('No companies found.');
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        'Failed to load companies.';
      setError(msg);
      setCompanies([]);
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Hard gate: if someone tries /dashboard directly
    if (!token) {
      navigate('/entrygate', { replace: true });
      return;
    }

    fetchCompanies();
  }, [navigate, fetchCompanies]);

  const handleClick = (companyId) => {
    navigate('/dashboard/company_details', { state: { companyId } });
  };

  return (
    <div className="min-h-screen w-full bg-[#040B17] text-white">
      <div className="mx-auto min-h-screen  max-w-[1200px] px-4  md:px-10 shadow-white">
        <div className="rounded-xl bg-gray-800 p-6 shadow-lg shadow-black/30 md:p-10">
          <h1 className="text-center text-lg font-bold text-amber-500/80 md:text-xl xl:text-2xl">
            Welcome back to your Dashboard!
          </h1>
          <p className='text-center my-2'>
            <span className='text-blue-500/80 font-bold'># of Companies:</span> {filteredCompanies.length}
          </p>
          <div className='flex justify-center items-center gap-x-1 my-2'>
            <input
              type="text"
              placeholder="Search companies..."
              className="ml-2 rounded border border-gray-600 bg-gray-700 px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={quer}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="mt-8">
            {loading ? (
              <p className="text-center text-gray-300">Loading companies...</p>
            ) : error ? (
              <p className="text-center text-red-400">{error}</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCompanies.map((company) => (
                  <button
                    type="button"
                    key={company.id}
                    onClick={() => handleClick(company.id)}
                    className="group rounded-lg bg-gray-700 p-4 text-left shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  >
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={`${company.name || 'Company'} logo`}
                        className="mb-4 h-16 w-auto rounded bg-gray-600 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="mb-4 flex h-16 items-center justify-center rounded bg-gray-600 text-sm font-bold">
                        No Logo
                      </div>
                    )}

                    <div className="flex flex-col gap-y-2">
                      <div className="text-base font-bold text-amber-500 md:text-lg lg:text-xl">
                        Name:{' '}
                        <span className="font-normal text-white">
                          {company.name || '—'}
                        </span>
                      </div>

                      <div className="text-base font-bold text-amber-500 md:text-lg lg:text-xl">
                        Address:{' '}
                        <span className="font-normal text-white">
                          {company.address || '—'}
                        </span>
                      </div>

                      <div className="text-base font-bold text-amber-500 md:text-lg lg:text-xl">
                        URL:{' '}
                        {company.url ? (
                          <a
                            href={company.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} // don't trigger card navigation
                            className="break-words font-normal text-blue-400 underline hover:text-blue-300"
                          >
                            {company.url}
                          </a>
                        ) : (
                          <span className="font-normal text-white">—</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-300 opacity-80 transition-opacity group-hover:opacity-100">
                      Click to view details →
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {!loading && !error && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={fetchCompanies}
                className="rounded-md bg-amber-500 px-4 py-2 font-semibold text-black transition hover:bg-amber-400"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
