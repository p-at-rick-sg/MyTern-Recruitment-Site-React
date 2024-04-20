import {useState, useEffect} from 'react';
import {useNavigate, NavLink} from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import {jwtDecode} from 'jwt-decode';
// Context Stuff
import {useUser} from '../hooks/useUser'; //import the hgook here to be able to easily import the reqwuired items below from it
//MUI Imports
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Component Imports

const Signin = () => {
  const fetchData = useFetch();
  const {user, setUser} = useUser(); // comes from user context
  const [credentials, setCredentials] = useState({email: '', password: ''});
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  //check logged in session data and bypass login if exists
  const checkSession = () => {
    console.log('checking session');
    if (sessionStorage.getItem('access') !== null) {
      console.log('data in session storage, bypassing login');
      const sessionAccess = sessionStorage.getItem('access');
      const type = sessionStorage.getItem('type');
      setUser({...user, accessToken: sessionAccess, type: type});
      if (type !== 'user') {
        navigate('/member');
      } else {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleSignin = async e => {
    e.preventDefault();
    setSubmitting(true); //we can use this variable for the spinner
    const result = await fetchData('/auth/signin', 'POST', {
      email: credentials.email,
      password: credentials.password,
    });
    console.log('here is what the API returns: ', result);
    if (result.ok) {
      localStorage.setItem('refresh', result.data.refresh); //set the refresh in local storage
      const decodedClaims = jwtDecode(result.data.access); //decode the access token
      setUser({
        ...user,
        type: decodedClaims.type,
        accessToken: result.data.access,
        id: result.data.id,
      });
      sessionStorage.setItem('access', result.data.access);
      sessionStorage.setItem('type', decodedClaims.type);
      sessionStorage.setItem('id', decodedClaims.id);
      setSubmitting(false);
      if (decodedClaims.role === 'contributor') {
        navigate('/member');
      } else {
        navigate('/');
      }
    } else {
      //login has failed for some reason
      console.error('failed login attempt');
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
      }, 3000);
      setCredentials({...credentials, password: ''});
      setSubmitting(false);
    }
  };

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  const handleGoogleSignin = async () => {
    const response = await fetch('http://localhost:7001/auth/google', {
      method: 'POST',
    });
    const data = await response.json();
    window.location.href = data.url;
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        {user.role}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
            <LockOutlinedIcon sx={{color: 'inherit'}} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSignin} sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {!failed && (
              <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                Sign In
              </Button>
            )}
            {failed && (
              <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}} disabled>
                Signin Failed
              </Button>
            )}
            <Button onClick={handleGoogleSignin} fullWidth variant="outlined" sx={{mt: 3, mb: 2}}>
              Google Signin
            </Button>
            <Grid container>
              <Grid item xs>
                <Link>Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link variant="body2">
                  <NavLink to="/signup">{"Don't have an account? Sign Up"}</NavLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Signin;
