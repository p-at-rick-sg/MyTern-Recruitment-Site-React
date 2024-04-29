import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
//Context
import {useUser} from '../hooks/useUser';

const OauthSuccess = () => {
  const {updateUser, user} = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    // TODO: add logic here to check user object for this before calling
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
    // here we always fetch and set for simplicity as this is the first page we hit
    const result = await fetch(import.meta.env.VITE_SERVER + '/api/sec/whoami', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
    });
    const data = await result.json();
    await updateUser(data);
  };

  useEffect(() => {
    console.log(user);
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
