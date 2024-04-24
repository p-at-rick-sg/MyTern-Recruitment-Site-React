import {useState, useEffect} from 'react';
import useFetch from '../../hooks/useFetch';
//MUI Imports
import {TextField, Grid, Select, MenuItem, InputLabel} from '@mui/material';

const CompanyInfoComponents = ({inputFields, handleChange, error, submitting}) => {
  const fetchData = useFetch();
  const [sectors, setSectors] = useState();

  //get the sectors from the database need a new API

  useEffect(() => {
    const innerFunc = async () => {
      try {
        console.log('fetching sectors');
        const response = await fetchData('/api/sectors', 'get');
        console.log('here is the response for sector: ', response);
        setSectors(response.data);
        if (!response.ok) {
          throw new Error('Failed to fetch sectors');
        }
      } catch (error) {
        console.error('Error fetching sectors:', error);
      }
    };
    innerFunc();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="company-name"
          name="companyName"
          required
          fullWidth
          id="companyName"
          label="Company Name"
          value={inputFields.companyName}
          onChange={handleChange}
          autoFocus
          error={error.firstName}
          inputProps={{pattern: '[A-Za-z ]+'}}
          helperText={error.companyName}
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="companyNumber"
          label="Company Numner/Tax ID"
          name="companyNumber"
          value={inputFields.companyNumber}
          onChange={handleChange}
          inputProps={{pattern: '[A-Za-z0-9- ]+'}}
          error={error.companyNumber}
          helperText={error.companyNumber}
          autoComplete="family-name"
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name="totalEmployees"
          type="number"
          required
          fullWidth
          id="totalEmployees"
          label="Approx Total Employees"
          value={inputFields.totalEmployees}
          onChange={handleChange}
          autoFocus
          error={error.totalEmployees}
          inputProps={{pattern: '[0-9]+'}}
          helperText={error.totalEmployees}
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel id="companySectorLbl">Company Sector/Primary Activity</InputLabel>
        <Select
          required
          fullWidth
          id="companySector"
          name="companySector"
          value={inputFields.companySector}
          onChange={handleChange}
          disabled={submitting ? true : false}>
          {sectors &&
            sectors.map(sector => (
              <MenuItem key={sector.id} value={sector}>
                {sector.sector}
              </MenuItem>
            ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default CompanyInfoComponents;
