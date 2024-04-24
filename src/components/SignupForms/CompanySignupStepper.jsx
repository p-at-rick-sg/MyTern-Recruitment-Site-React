import {useState, Fragment} from 'react';
import {useUser} from '../../hooks/useUser';

//Componenet Imports
import CompanySignupStep1 from './CompanySignupStep1';

//MUI Imports
import {Box, Divider} from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CompanySignupStep2 from './CompanySignupStep2';
import CompanySignupStep3 from './CompanySignupStep3';

const steps = ['Your Details', 'Company Details', 'Create Users'];

export default function CompanySignupStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [activeStepName, setActiveStepName] = useState([
    'Your Details',
    'Company Details',
    'Add Users',
  ]);
  const {setUser, user} = useUser(); // comes from user context
  const [submitting, setSubmitting] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    useCase: false,
    position: false,
    address1: false,
    address2: false,
    city: false,
    country: false,
    postcode: false,
    email: false,
    emailMismatch: false,
    emailExists: false,
    password: false,
    passwordMismatch: false,
  });

  const [inputFields, SetInputFields] = useState({
    firstName: '',
    lastName: '',
    useCase: '',
    position: '',
    email: '',
    emailCheck: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    postcode: '',
    telephone: '',
    role: 'user',
    password: '',
    passwordCheck: '',
    companyName: '',
    companyNumber: '',
    companySector: '',
    totalEmployees: 10,
    primaryDomain: '',
    emailPrefix: '',
    emailList: [],
  });

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

  const handleChange = e => {
    console.log(e.target.name);
    //handles the sector and counry as they don;t have a .valid attribute
    if (e.target.name === 'companySector' || e.target.name === 'country') {
      SetInputFields(prevState => ({...prevState, [e.target.name]: e.target.value}));
    } else {
      SetInputFields(prevState => ({...prevState, [e.target.name]: e.target.value}));
      console.log(`setting ${e.target.name} to ${e.target.value}`); //troubleshooting
      //checks all other fileds for valid input based on the input prop regex
      if (!e.target.validity.valid) {
        console.log(`setting ${e.target.name} error to true`);
        setError(prevState => ({...prevState, [e.target.name]: true}));
      } else {
        console.log(`setting ${e.target.name} error to false`);
        setError(prevState => ({...prevState, [e.target.name]: false}));
      }
    }
  };

  const checkErrors = obj => {
    const testResult = Object.values(obj);
    if (true in testResult) {
      return true;
    } else return false;
  };

  const handleSignup = async () => {
    if (checkErrors(error)) {
      setSubmitting(true);
      const newCompany = {
        firstName: inputFields.firstName,
        lastName: inputFields.lastName,
        position: inputFields.position,
        useCase: inputFields.useCase,
        email: inputFields.email,
        password: inputFields.password,
        address1: inputFields.address1,
        city: inputFields.city,
        country: inputFields.country, //this is now an object with name, id to save alookpu on the backend
        postcode: inputFields.postcode,
        companySector: inputFields.companySector,
        companyName: inputFields.companyName,
        companyNumber: inputFields.companyNumber,
        totalEmployees: inputFields.totalEmployees,
        primaryDomain: inputFields.primaryDomain,
        emailList: emailList,
      };
      if (inputFields.address2) newUser.address2 = inputFields.address2;
      if (inputFields.telephone) newUser.telephone = inputFields.telephone;
      //call the function to handle the data part
      const result = await postNewCompany(newCompany);
      if (result) setSubmitting(false);
      navigate('/signin');
    } else {
      console.error('errors on form - cannot submit now');
      setSubmitting(false);
    }
  };

  const postNewCompany = async userObj => {
    const signupResult = await fetchData('/auth/signup', 'PUT', userObj, undefined);
    console.log(signupResult);
    navigate('/signin');
  };

  const isStepOptional = step => {
    return step === 2;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSignup();
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
      if (activeStep === steps.length - 1) {
        console.log('submit function firing OK');
      }
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    // we only allow skip of last page here
    if (activeStep === steps.length - 1) {
      handleSignup();
    }
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{width: '80%', margin: 'auto'}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{mt: 2, mb: 1}}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Box sx={{flex: '1 1 auto'}} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <Typography sx={{mt: 2, mb: 1}}>
            Step {activeStep + 1}: {activeStepName[activeStep]}
          </Typography>
          {/* Add the content of the step here using new components */}
          {activeStep === 0 && (
            <Fragment>
              <CompanySignupStep1
                inputFields={inputFields}
                handleChange={handleChange}
                error={error}
                submitting={submitting}
                handleEmailMatch={handleEmailMatch}
                handlePasswordMatch={handlePasswordMatch}
              />
            </Fragment>
          )}
          {activeStep === 1 && (
            <Fragment>
              <CompanySignupStep2
                inputFields={inputFields}
                handleChange={handleChange}
                error={error}
                submitting={submitting}
              />
            </Fragment>
          )}
          {activeStep === 2 && (
            <Fragment>
              <CompanySignupStep3
                inputFields={inputFields}
                handleChange={handleChange}
                error={error}
                submitting={submitting}
                emailList={emailList}
                setEmailList={setEmailList}
              />
            </Fragment>
          )}
          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{mr: 1}}>
              Back
            </Button>
            <Box sx={{flex: '1 1 auto'}} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Fragment>
      )}
    </Box>
  );
}
