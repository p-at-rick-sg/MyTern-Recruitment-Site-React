import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import {useUser} from '../../hooks/useUser';

//Component Imports
import AddressFormItems from '../FormComponents/AddressFormComponents';
import NameFormComponents from '../FormComponents/NameFormComponents';
import PasswordComponents from '../FormComponents/PasswordComponents';

//MUI Imports
import {Box, Button, Container, Divider, Link, Typography} from '@mui/material';
import SubmitButtonsComponents from '../FormComponents/SubmitButtonsComponents';

const UserSignup = () => {
  const fetchData = useFetch();
  const {setUser, user} = useUser(); // comes from user context
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    address1: false,
    address2: false,
    city: false,
    country: false,
    postcode: false,
    email: false,
    emailExists: false,
    password: false,
    passwordMismatch: false,
  });

  const [inputFields, SetInputFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    country: 'Singapore',
    postcode: '',
    telephone: '',
    role: 'user',
    password: '',
    passwordCheck: '',
  });

  const handleChange = e => {
    if (!e.target.validity.valid) {
      setError({...error, [e.target.name]: true});
    } else {
      setError({...error, [e.target.name]: false});
    }
    SetInputFields({...inputFields, [e.target.name]: e.target.value});
    if (inputFields.password !== inputFields.passwordCheck) {
      setPasswordErrorText('Password Mismatch');
    }
  };

  const handleSignup = async e => {
    e.preventDefault();
    setSubmitting(true); //we can use this variable for the spinner
    const newUser = {
      firstName: inputFields.firstName,
      lastName: inputFields.lastName,
      email: inputFields.email,
      password: inputFields.password,
      address1: inputFields.address1,
      town: inputFields.town,
      country: inputFields.country,
      postcode: inputFields.postcode,
    };
    if (inputFields.address2) newUser.address2 = inputFields.address2;
    if (inputFields.telephone) newUser.telephone = inputFields.telephone;
    //call the function to handle the data part
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Divider flexItem={true} sx={{mb: '-5px', color: 'grey'}} textAlign="center">
          Name
        </Divider>
        <Box component="form" onSubmit={handleSignup} sx={{mt: 3}}>
          <NameFormComponents
            inputFields={inputFields}
            handleChange={handleChange}
            error={error}
            submitting={submitting}
          />
          <Divider flexItem={true} sx={{mt: '10px', mb: '15px', color: 'grey'}} textAlign="center">
            Address
          </Divider>
          <AddressFormItems
            inputFields={inputFields}
            handleChange={handleChange}
            error={error}
            submitting={submitting}
          />
          <Divider flexItem={true} sx={{mt: '15px', color: 'grey'}} textAlign="center">
            Set Password
          </Divider>
          <PasswordComponents
            inputFields={inputFields}
            handleChange={handleChange}
            error={error}
            submitting={submitting}
          />
          <Divider flexItem={true} sx={{mt: '15px', mb: '10px', color: 'grey'}} textAlign="center">
            Submit When Ready
          </Divider>
          <SubmitButtonsComponents handleSubmit={handleSignup} />
          <Typography variant="button" display="block" sx={{color: '#64B5F6'}}>
            <NavLink to="/signin">Already have an account: Sign In</NavLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default UserSignup;
