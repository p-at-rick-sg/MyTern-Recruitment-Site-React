//React imports

//MUI Imports
import {Container} from '@mui/material';

//Component Imports
import CreateSkillProfile from '../components/CreateSkillProfile';

const UserPage = () => {
  return (
    <Container maxWidth="lg" sx={{border: 1}}>
      <h1>User Page Placeholder Text Top Level </h1>
      <CreateSkillProfile />
    </Container>
  );
};

export default UserPage;
