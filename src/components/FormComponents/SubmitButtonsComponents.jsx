//MUI Imports
import {Button, Grid, Typography} from '@mui/material';

const SubmitButtonsComponents = ({handleSubmit}) => {
  return (
    <Grid container spacing={2} sx={{mt: '15px'}}>
      <Grid item sm={12} md={6}></Grid>
      <Grid item sm={6} md={3} justifyItems="flex-end">
        <Button variant="outlined" sx={{width: '90%'}}>
          Cancel
        </Button>
      </Grid>
      <Grid item sm={6} md={3} justifyItems="flex-end">
        <Button type="submit" variant="contained" sx={{width: '90%'}}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default SubmitButtonsComponents;
