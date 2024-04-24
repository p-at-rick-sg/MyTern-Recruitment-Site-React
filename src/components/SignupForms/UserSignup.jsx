import {useState, useRef, useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import {useUser} from '../../hooks/useUser';

//Component Imports
import AddressFormComponents from '../FormComponents/AddressFormComponents';
import NameFormComponents from '../FormComponents/NameFormComponents';
import PasswordComponents from '../FormComponents/PasswordComponents';

//MUI Imports
import {Box, Container, Divider, Typography} from '@mui/material';
import SubmitButtonsComponents from '../FormComponents/SubmitButtonsComponents';
import EmailComponents from '../FormComponents/EmailComponents';

const UserSignup = () => {
  const fetchData = useFetch();
  const navigate = useNavigate();
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
    emailMismatch: false,
    emailExists: false,
    password: false,
    passwordCheck: false,
    passwordMismatch: false,
  });

  const [inputFields, SetInputFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    emailCheck: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    countryId: 1,
    postcode: '',
    telephone: '',
    role: 'user',
    password: '',
    passwordCheck: '',
  });

  const handleChange = e => {
    if (e.target.name === 'country') {
      SetInputFields(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
      console.log('country: ', country);
    } else {
      if (!e.target.validity.valid) {
        setError({...error, [e.target.name]: true});
      } else {
        setError({...error, [e.target.name]: false});
      }
      SetInputFields({...inputFields, [e.target.name]: e.target.value});
    }
  };

  const handlePasswordMatch = () => {
    console.log('pw match blur');
    if (inputFields.password !== inputFields.passwordCheck) {
      setError({...error, passwordMismatch: true});
    } else {
      setError({...error, passwordMismatch: false});
    }
  };

  const handleEmailMatch = () => {
    console.log('email match blur');
    if (inputFields.email !== inputFields.emailCheck) {
      setError({...error, emailMismatch: true});
    } else {
      setError({...error, emailMismatch: false});
    }
  };

  const postNewUser = async userObj => {
    const signupResult = await fetchData('/auth/signup', 'PUT', userObj, undefined);
    console.log(signupResult);
    navigate('/signin');
  };

  const checkErrors = obj => {
    const testResult = Object.values(obj);
    if (true in testResult) {
      return true;
    } else return false;
  };

  const handleSignup = async e => {
    console.log('sign-up function');
    e.preventDefault();
    if (!checkErrors(error)) {
      setSubmitting(true); //we can use this variable for the spinner
      const newUser = {
        firstName: inputFields.firstName,
        lastName: inputFields.lastName,
        email: inputFields.email,
        password: inputFields.password,
        address1: inputFields.address1,
        city: inputFields.city,
        country: inputFields.country,
        postcode: inputFields.postcode,
      };
      if (inputFields.address2) newUser.address2 = inputFields.address2;
      if (inputFields.telephone) newUser.telephone = inputFields.telephone;
      console.log(newUser);
      //call the function to handle the data part
      const result = await postNewUser(newUser);
      if (result.ok) {
        setSubmitting(false);
        navigate('/signin');
      } else {
        console.error('tried to submit but retuned an error');
      }
    } else {
      console.error('errors in form');
      setSubmitting(false);
    }
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
          {error.emailMismatch && (
            <Divider flexItem={true} sx={{mt: '10px', mb: '15px', color: 'red'}} textAlign="center">
              Email's Don't Match
            </Divider>
          )}

          <EmailComponents
            inputFields={inputFields}
            handleChange={handleChange}
            handleMatch={handleEmailMatch}
            error={error}
            submitting={submitting}
          />
          <Divider flexItem={true} sx={{mt: '10px', mb: '15px', color: 'grey'}} textAlign="center">
            Address
          </Divider>
          <AddressFormComponents
            inputFields={inputFields}
            handleChange={handleChange}
            error={error}
            submitting={submitting}
          />
          {error.passwordMismatch ? (
            <Divider flexItem={true} sx={{mt: '15px', mb: '10px', color: 'red'}} textAlign="center">
              Password's Don't Match
            </Divider>
          ) : (
            <Divider
              flexItem={true}
              sx={{mt: '15px', mb: '10px', color: 'grey'}}
              textAlign="center">
              Set a Strong Password
            </Divider>
          )}
          <PasswordComponents
            inputFields={inputFields}
            handleChange={handleChange}
            handleMatch={handlePasswordMatch}
            error={error}
            submitting={submitting}
          />
          <SubmitButtonsComponents handleSubmit={handleSignup} />
          <Typography variant="button" display="block" sx={{color: '#64B5F6', mt: '-25px'}}>
            <NavLink to="/signin">Already have an account: Sign In</NavLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default UserSignup;
