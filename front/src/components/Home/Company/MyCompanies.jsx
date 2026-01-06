import { useState, useEffect, useMemo } from 'react';
import { Box, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FaTruckLoading } from 'react-icons/fa';
import api from '../../../api';

const MyCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        setLoading(true);
        console.log('Fetching companies...');
        const response = await api.get('/company/all');
        setCompanies(response.data);
        console.log('Fetched companies:', response.data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error('Error fetching companies:', e);
      }
    };
    getAllCompanies();
  }, []);
  //   filter by name (case-insensitive)
  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => (c.name ?? '').toLowerCase().includes(q));
  }, [companies, query]);

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Name', minWidth: 200, flex: 1 },
      { field: 'address', headerName: 'Address', minWidth: 200, flex: 1 },
      {
        field: 'url',
        headerName: 'Website',
        minWidth: 200,
        flex: 1,
        renderCell: (params) => {
          const href = params.value;
          if (!href) return '-';
          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {href}
            </a>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="min-h-screen w-full bg-black flex flex-col">
      {error && (
        <div className="flex justify-center items-center">
          <p className="text-red-500 font-semibold">{error.message}</p>
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center ">
          <FaTruckLoading className="text-3xl text-center text-amber-500 w-12 h-12 animate-pulse" />
        </div>
      )}
      {/* content */}
      <div className="max-w-[1200px] mx-auto bg-gray-200 px-6 py-6 w-full h-full text-white flex-1">
        <Box sx={{ width: '100%' }}>
          <TextField
            label="Search company name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
            sx={{
              my: 2,
              width: 360,
              maxWidth: '100%',
              backgroundColor: 'white',
              borderRadius: 4,
              textAlign: 'left',
            }}
          />

          <Box sx={{ height: 520, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              getRowId={(row) => row.url} // safe even if backend changes
              pageSizeOptions={[10]}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 10 } },
              }}
              disableRowSelectionOnClick
              sx={{
              maxWidth: '100%',
              backgroundColor: 'white',
              borderRadius: 8,
              borderBlockColor: 'black',
            }}
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default MyCompanies;
