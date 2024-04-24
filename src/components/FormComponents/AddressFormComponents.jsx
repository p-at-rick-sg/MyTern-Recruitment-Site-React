import {useRef, useEffect, useState} from 'react';
import useFetch from '../../hooks/useFetch';

//MUI Imports
import {TextField, Grid, Select, InputLabel, MenuItem} from '@mui/material';

const AddressFormComponents = ({inputFields, handleChange, error, submitting}) => {
  const fetchData = useFetch();
  const [countries, setCountries] = useState({});

  useEffect(() => {
    const getCountries = async () => {
      console.log('getting countries');
      const result = await fetchData('/api/countries', 'GET');
      await setCountries(result.data);
    };
    getCountries();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="street"
          name="address1"
          required
          fullWidth
          id="address1"
          label="Unit #/Block and Street"
          value={inputFields.address1}
          onChange={handleChange}
          inputProps={{pattern: '[A-Za-z0-9 ]+'}}
          error={error.address1}
          helperText={error.address1 ? 'Please enter Letters and Numbers Only' : ''}
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="address2"
          label="Address Line 2 (Optional)"
          name="address2"
          value={inputFields.address2}
          inputProps={{pattern: '[A-Za-z0-9 ]+'}}
          error={error.address2}
          helperText={error.address2 ? 'Please enter Letters and Numbers Only' : ''}
          onChange={handleChange}
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="city"
          name="city"
          required
          fullWidth
          id="city"
          label="City"
          value={inputFields.city}
          onChange={handleChange}
          inputProps={{pattern: '[A-Za-z ]+'}}
          error={error.city}
          helperText={error.city ? 'Please enter Letters Only' : ''}
          disabled={submitting ? true : false}
        />
      </Grid>
      {/* TODO: Change this to a select driven by country table */}
      <Grid item xs={12} sm={6}>
        <InputLabel id="countriesLbl">Select Your Country</InputLabel>
        <Select
          required
          fullWidth
          id="country"
          name="country"
          value={inputFields.country}
          onChange={handleChange}
          disabled={submitting ? true : false}>
          {countries && countries.length > 0 ? (
            countries.map(country => (
              <MenuItem key={country.id} value={country}>
                {country.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem key="0" value="loading">
              Loading
            </MenuItem>
          )}
        </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="postcode"
          label="Postcode/Zip Code"
          name="postcode"
          inputProps={{pattern: '[A-Za-z0-9 ]+'}}
          error={error.postcode}
          helperText={error.postcode ? 'Please enter Letters and Numbers Only' : ''}
          value={inputFields.postcode}
          onChange={handleChange}
          disabled={submitting ? true : false}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="telephone"
          label="Telephone (Optional)"
          name="telephone"
          value={inputFields.telephone}
          inputProps={{pattern: '[0-9+]+'}}
          onChange={handleChange}
          error={error.telephone}
          helperText={error.telephone ? 'Please enter Numbers and + Only' : ''}
          disabled={submitting ? true : false}
        />
      </Grid>
    </Grid>
  );
};

export default AddressFormComponents;
