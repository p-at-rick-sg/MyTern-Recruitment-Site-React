import {useState, useEffect} from 'react';

//Context
import {useUser} from '../hooks/useUser';

const OauthSuccess = () => {
  const {user, setUser} = useUser;

  //Page to accept the header tokens and set the context to render the pages we need - changed security options on BE to make this work for now

  useEffect(() => {
    testProtected();
  }, []);

  const testProtected = async () => {
    const result = await fetch(import.meta.env.VITE_SERVER + '/api/talent/test', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
    });
    const data = await result.json();
    console.log('the result is: ', data);
  };

  return <div>Oauth Signin Success</div>;
};

export default OauthSuccess;
