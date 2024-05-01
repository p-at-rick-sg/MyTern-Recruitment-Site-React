//MUI Imports
import {Button, Grid, Typography} from '@mui/material';

const UserHome = ({user}) => {
  return (
    <Grid container direction="row" sx={{marginTop: 2}}>
      <Grid item md={12}>
        <Typography variant="h5">Welcome Back {user.firstName}</Typography>
      </Grid>
      <Grid item md={6}>
        <Typography variant="h6">Looks Like you're New Here?</Typography>
      </Grid>
      <Grid item md={6}>
        <Button>Create My Profile</Button>
      </Grid>
    </Grid>
  );
};

export default UserHome;
