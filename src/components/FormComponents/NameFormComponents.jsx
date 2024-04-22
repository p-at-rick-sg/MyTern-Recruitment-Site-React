//MUI Imports
import {TextField, Grid, Typography} from '@mui/material';

const NameFormComponents = ({inputFields, handleChange, error, submitting}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="given-name"
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="First Name"
          value={inputFields.firstName}
          onChange={handleChange}
          autoFocus
          error={error.firstName}
          inputProps={{pattern: '[A-Za-z ]+'}}
          helperText="Invalid Input - Use Characters a-z or A-Z only"
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          value={inputFields.lastName}
          onChange={handleChange}
          inputProps={{pattern: '[A-Za-z ]+'}}
          error={error.lastName}
          helperText="Invalid Input - Use Characters a-z or A-Z only"
          autoComplete="family-name"
          disabled={submitting ? true : false}
        />
      </Grid>
    </Grid>
  );
};

export default NameFormComponents;
