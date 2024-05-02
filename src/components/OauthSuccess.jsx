import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
//Context
import {useUser} from '../hooks/useUser';

const OauthSuccess = () => {
  const {updateUser, user} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('in the effect: ', user.type);
    if (user.type === null || user.type === undefined) {
      console.log('doing the user details pull');
      whoAmI();
    } else if (user.type === 'user') {
      navigate('/user');
    } else if (user.type === 'corp') {
      navigate('/corp');
    }
  });

  const whoAmI = async () => {
    const result = await fetch(import.meta.env.VITE_SERVER + '/api/sec/whoami', {
      method: 'GET',
      credentials: 'include',
    });
    console.log(result.status);
    if (result.status === 200) {
      const userData = await result.json();
      console.log(userData);
      const userUpdated = await updateUser(userData);
      if (userUpdated) {
        console.log('setting the local session storage');
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
    }
  };

  return <div>Signin Success Page</div>;
};

export default OauthSuccess;
