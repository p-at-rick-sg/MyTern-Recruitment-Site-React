import {TextField, Grid, Typography} from '@mui/material';

const EmailComponents = ({inputFields, handleChange, error, submitting}) => {
  return (
    <Grid container spacing={2} sx={{mt: '8px'}}>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          name="email"
          label="Email"
          type="email"
          id="email"
          value={inputFields.email}
          onChange={handleChange}
          autoComplete="email"
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          name="emailCheck"
          label="Validate Email"
          type="email"
          id="emailCheck"
          value={inputFields.emailCheck}
          onChange={handleChange}
          disabled={submitting ? true : false}
        />
      </Grid>
    </Grid>
  );
};

export default EmailComponents;
