import { useState, useEffect } from 'react';
import { TextField, Box, Pagination } from '@mui/material';
import CustomDataTable from './components/table';
import { companyData } from './companyData';

const initialFilters = {
  name: '',
  location: '',
  serviceType: '',
};

const ITEMS_PER_PAGE = 10; 

function App() {
  const [filters, setFilters] = useState(initialFilters);
  const [filteredData, setFilteredData] = useState(companyData);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value.toLowerCase(),
    }));
    setCurrentPage(1); 
  };

  useEffect(() => {
    const applyFilters = () => {
      let currentData = companyData;
      
      const { name, location, serviceType } = filters;

      const newFilteredData = currentData.filter(item => {
        const matchesName = item.name.toLowerCase().includes(name);
        const matchesLocation = item.location.toLowerCase().includes(location);
        const matchesServiceType = item.serviceType.toLowerCase().includes(serviceType);

        return matchesName && matchesLocation && matchesServiceType;
      });

      setFilteredData(newFilteredData);
    };

    applyFilters();
  }, [filters]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  function handlePageChange(_event: React.ChangeEvent<unknown>, page: number) {
    setCurrentPage(page);
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      boxSizing: 'border-box'
    }}>
      <h2 style={{color:'black'}}>Companies Directory</h2>

     
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 3, 
          p: 2, 
          backgroundColor: 'white',
          border: '1px solid #ccc', 
          borderRadius: '4px',
          width: '90%',
        }}
      >
        <TextField
          label="Filter by Name"
          name="name"
          variant="outlined"
          size="small"
          onChange={handleFilterChange}
          value={filters.name}
          fullWidth
        />
        <TextField
          label="Filter by Location"
          name="location"
          variant="outlined"
          size="small"
          onChange={handleFilterChange}
          value={filters.location}
          fullWidth
        />
        <TextField
          label="Filter by Service Type"
          name="serviceType"
          variant="outlined"
          size="small"
          onChange={handleFilterChange}
          value={filters.serviceType}
          fullWidth
        />
      </Box>

      <Box sx={{ mb: 2, fontSize: '14px', color: '#666' }}>
        Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} companies
      </Box>

      <Box sx={{ width: '100%', maxWidth: '1000px', mb: 3 }}>
        <CustomDataTable data={paginatedData} />
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </div>
  );
}

export default App;