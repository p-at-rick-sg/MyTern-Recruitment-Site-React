import {useState, useEffect} from 'react';
import {useUser} from '../hooks/useUser';
import AddressFormItems from '../components/FormComponents/AddressFormComponents';
import UserSignup from '../components/SignupForms/UserSignup';

const LandingPage = () => {
  const overrideStyle = {
    margin: '10px',
  };
  return (
    <>
      <UserSignup />
    </>
  );
};

export default LandingPage;
