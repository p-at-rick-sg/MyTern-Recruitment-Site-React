import {useState, useEffect} from 'react';
//MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import {InputLabel, Select, MenuItem, Box, Checkbox} from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

//context
import {useUser} from '../../hooks/useUser';

const AddRoleForm = () => {
  const {user} = useUser();
  const [inputFields, SetInputFields] = useState({
    company: '',
    jobTitle: '',
    jobDescription: '',
    postedDate: '',
    location: '',
    recruiterEmail: '', //later will prop this in from recUser but free form for now
    status: 'draft',
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    SetInputFields({...inputFields, [e.target.name]: e.target.value});
  };

  const validateValues = inputValues => {
    let tmpErrors = {};
    if (inputValues.email.length < 5) {
      tmpErrors.email = 'Email is too short';
    }
    if (inputValues.password.length < 8) {
      tmpErrors.passwordLength = 'Password is too short';
    }
    if (inputValues.passwordCheck !== inputValues.password) {
      tmpErrors.passwordMatch = 'Passwords Do Not Match';
    }
    return tmpErrors;
  };

  const handleSubmit = async e => {
    console.log('submit fired'); //also diable the form once we are OK with the fields
    e.preventDefault();
    //create fs date
    const createdAt = serverTimestamp();
    await addDoc(collection(db, 'jobs'), {
      company: inputFields.company,
      jobTitle: inputFields.jobTitle,
      jobDescription: inputFields.jobDescription,
      postedDate: createdAt,
      location: inputFields.location,
      recruiterEmail: inputFields.recruiterEmail,
      status: inputFields.status,
    });
    SetInputFields({
      company: '',
      jobTitle: '',
      jobDescription: '',
      postedDate: '',
      location: '',
      recruiterEmail: '', //later will prop this in from recUser but free form for now
      status: 'draft',
    });
  };

  return (
    <div>
      <ThemeProvider theme={recruiterTheme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Typography component="h1" variant="h5">
              Add a New Job
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="company"
                    required
                    fullWidth
                    id="company"
                    label="Company Name"
                    value={inputFields.company} //this will be pulled from rhe recUser object later
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="jobTitle"
                    label="Job Title"
                    name="jobTitle"
                    value={inputFields.jobTitle}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={50}
                    id="jobDescription"
                    label="Job Description"
                    name="jobDescription"
                    value={inputFields.jobDescription}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="location"
                    label="Role Location"
                    type="text"
                    id="location"
                    value={inputFields.location}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    required
                    fullWidth
                    name="recruiterEmail"
                    label="Recruiters Email"
                    type="text"
                    id="recruiterEmail"
                    value={inputFields.recruiterEmail}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    fullWidth
                    labelId="status-label"
                    id="status"
                    name={'status'}
                    value={inputFields.status}
                    label="Job Status"
                    onChange={handleChange}>
                    <MenuItem value={'draft'}>Draft</MenuItem>
                    <MenuItem value={'live'}>Live</MenuItem>
                    <MenuItem value={'retired'}>Retired</MenuItem>
                    <MenuItem value={'template'}>Template</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <FormControlLabel
                    control={<Checkbox value="highPriority" color="primary" />}
                    label="Mark Job as high priority."
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button type="submit" variant="contained" sx={{mt: 3, mb: 2}}>
                    Add Job
                  </Button>
                  <Button type="cancel" variant="outlined" sx={{mt: 3, mb: 2}}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default AddRoleForm;
