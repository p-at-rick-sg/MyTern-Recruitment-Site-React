import {TextField, Grid, Typography} from '@mui/material';

const PasswordComponents = ({inputFields, handleChange, error, submitting, handleMatch}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={inputFields.password}
          onChange={handleChange}
          onBlur={handleMatch}
          autoComplete="new-password"
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          name="passwordCheck"
          label="PasswordCheck"
          type="password"
          id="passwordCheck"
          value={inputFields.passwordCheck}
          onChange={handleChange}
          onBlur={handleMatch}
          autoComplete="new-password"
          disabled={submitting ? true : false}
        />
      </Grid>
    </Grid>
  );
};

export default PasswordComponents;
