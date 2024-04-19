//MUI Imports
import {TextField, Grid, Select, InputLabel, MenuItem} from '@mui/material';

const PositionFormComponents = ({inputFields, handleChange, error, submitting}) => {
  const useCases = ['Hiring Manager', 'Internal Recruiter', 'Recruitment Agency', 'HR Executive'];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="position"
          name="position"
          required
          fullWidth
          id="position"
          label="Position/Role in Company"
          value={inputFields.position}
          onChange={handleChange}
          autoFocus
          error={error.position}
          inputProps={{pattern: '[A-Za-z]+'}}
          helperText={error.position}
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="useCase"
          select
          label="Your Use Case"
          fullWidth
          defaultValue={useCases[0]}
          helperText="How will you use Mytern?">
          {useCases.map((item, idx) => (
            <MenuItem key={idx} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default PositionFormComponents;
