//React imports
import {useUser} from '../hooks/useUser';
//MUI Imports
import {Container} from '@mui/material';

//Component Imports
import CreateSkillProfile from '../components/CreateSkillProfile';
import UserHome from '../components/UserComponents/UserHome';

const UserPage = () => {
  const {updateUser, user} = useUser();
  console.log('user in stateis: ', user);

  return (
    <Container maxWidth="lg" sx={{border: 1}}>
      <UserHome user={user} />
    </Container>
  );
};

export default UserPage;
