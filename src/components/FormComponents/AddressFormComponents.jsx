//MUI Imports
import {TextField, Grid, Typography} from '@mui/material';

const AddressFormComponents = ({inputFields, handleChange, error, submitting}) => {
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
          inputProps={{pattern: '[A-Za-z]+'}}
          error={error.city}
          helperText={error.city ? 'Please enter Letters Only' : ''}
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="country"
          name="country"
          required
          fullWidth
          id="country"
          label="Country"
          value={inputFields.country}
          inputProps={{pattern: '[A-Za-z]+'}}
          error={error.country}
          helperText={error.country ? 'Please enter Letters Only' : ''}
          onChange={handleChange}
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="postcode"
          label="Postcode/Zip Code"
          name="postcode"
          inputProps={{pattern: '[A-Za-z0-9]+'}}
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
