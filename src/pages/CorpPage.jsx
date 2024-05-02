import RolesTable from '../components/FormComponents/RolesTable';
import {useUser} from '../hooks/useUser';

//MUI Imports
import {Grid, Typography, Button, Box, Container} from '@mui/material';

const CorpPage = () => {
  const {user} = useUser();

  return (
    <Container maxWidth="lg" sx={{border: 1, borderColor: 'red', mt: 4}}>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: 2,
          borderColor: 'green',
          mt: 5,
        }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Welcome back {user.firstName}</Typography>
          </Grid>
          <Grid item xs={10}>
            <RolesTable />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CorpPage;
