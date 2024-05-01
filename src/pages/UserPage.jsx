//React imports
import {useState, useEffect} from 'react';
import {useUser} from '../hooks/useUser';
//MUI Imports
import {Container} from '@mui/material';

//Component Imports
import CreateSkillProfile from '../components/CreateSkillProfile';

const UserPage = () => {
  const {user} = useUser();
  const [showSetup, setShowSetup] = useState(true);
  const [basicInfo, setBasicInfo] = useState({});

  const getBasicDetails = async () => {
    console.log('func for basic');
    const result = await fetch(import.meta.env.VITE_SERVER + '/api/talent/basic', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
    });
    console.log('after the fetch');
    console.log(result.status);
    if (result.status == 200) {
      const data = await result.json();
      console.log('basic user info: ', data);
      setBasicInfo(data);
    }
  };

  useEffect(() => {
    getBasicDetails();
  }, [user]);

  useEffect(() => {
    if (basicInfo.summary === null || basicInfo.summary === '') {
      setShowSetup(true);
    }
  }, [basicInfo]);

  if (showSetup) {
    return (
      <Container component="main" maxWidth="md" sx={{mt: 3}}>
        <CreateSkillProfile />
      </Container>
    );
  } else {
    return (
      <Container maxWidth="lg" sx={{border: 1}}>
        here is some text
      </Container>
    );
  }
};

export default UserPage;
