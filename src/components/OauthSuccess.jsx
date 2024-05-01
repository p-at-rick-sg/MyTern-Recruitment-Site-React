import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
//Context
import {useUser} from '../hooks/useUser';

const OauthSuccess = () => {
  const {updateUser, user} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    whoAmI();
  }, []);

  // const testProtected = async () => {
  //   const result = await fetch(import.meta.env.VITE_SERVER + '/api/talent/test', {
  //     method: 'GET',
  //     withCredentials: true,
  //     credentials: 'include',
  //   });
  //   const data = await result.json();
  //   console.log('the result is: ', data);
  // };

  const whoAmI = async () => {
    console.log('trying to see who i am!');
    const result = await fetch(import.meta.env.VITE_SERVER + '/api/sec/whoami', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
    });
    if (result.status == 200) {
      const data = await result.json();
      await updateUser(data);
      //Set local session data for ease of navigation
      console.log('setting session storage');
      const userStr = JSON.stringify(data);
      sessionStorage.setItem('user', userStr);
    } else {
      console.log('failed to find who i am');
    }
  };

  useEffect(() => {
    if (user.type === 'user') {
      navigate('/');
    }
    if (user.type === 'corp') {
      navigate('/');
    }
  }, [user]);

  return <div>Oauth Signin Success</div>;
};

export default OauthSuccess;
