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
import {randomCompanyName} from '@mui/x-data-grid-generator';

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
    country: 'Singapore',
    postcode: '',
    telephone: '',
    role: 'user',
    password: '',
    passwordCheck: '',
    companyName: '',
    companyNumber: '',
    companySector: '',
    totalEmployees: 10,
  });

  const validateEmailMatch = () => {
    setError(prevState => {
      const updatedState = {...prevState}; // Make a copy of the previous state

      // Check if emails match
      if (inputFields.email !== inputFields.emailCheck) {
        updatedState.emailMismatch = true;
        updatedState.email = true;
        updatedState.emailCheck = true;
      } else {
        updatedState.emailMismatch = false;
        updatedState.email = false;
        updatedState.emailCheck = false;
      }
      return updatedState; // Return the updated state
    });
  };

  const validatePWMatch = () => {
    setError(prevState => {
      const updatedState = {...prevState}; // Make a copy of the previous state

      // Check if passwords match
      if (inputFields.password !== inputFields.passwordCheck) {
        updatedState.passwordMismatch = true;
        updatedState.password = true;
        updatedState.passwordCheck = true;
      } else {
        updatedState.passwordMismatch = false;
        updatedState.password = false;
        updatedState.passwordCheck = false;
      }

      return updatedState; // Return the updated state
    });
  };

  const handleChange = e => {
    console.log(e.target.name);
    //handles the comapy sector field only
    if (e.target.name === 'companySector') {
      SetInputFields(prevState => ({...prevState, [e.target.name]: e.target.value}));
    } else {
      SetInputFields(prevState => ({...prevState, [e.target.name]: e.target.value}));
      console.log(`setting ${e.target.name} to ${e.target.value}`);
      //checks all other fileds for valid input based on the input prop regex
      if (!e.target.validity.valid) {
        console.log(`setting ${e.target.name} error to true`);
        setError(prevState => ({...prevState, [e.target.name]: true}));
      } else {
        console.log(`setting ${e.target.name} error to false`);
        setError(prevState => ({...prevState, [e.target.name]: false}));
      }
      // check the matching passwords
      if (e.target.name === 'passwordCheck') {
        validatePWMatch();
      }
      //check the matching emails
      if (e.target.name === 'emailCheck') {
        validateEmailMatch();
      }
    }
  };

  const handleSignup = async () => {
    setSubmitting(true); //we can use this variable for the spinner
    const newUser = {
      firstName: inputFields.firstName,
      lastName: inputFields.lastName,
      position: inputFields.position,
      useCase: inputFields.useCase,
      email: inputFields.email,
      password: inputFields.password,
      address1: inputFields.address1,
      city: inputFields.city,
      country: inputFields.country,
      postcode: inputFields.postcode,
      companySector: inputFields.companySector,
      companyNumber: inputFields.companyNumber,
      totalEmployees: inputFields.totalEmployees,
    };
    if (inputFields.address2) newUser.address2 = inputFields.address2;
    if (inputFields.telephone) newUser.telephone = inputFields.telephone;
    //call the function to handle the data part
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
