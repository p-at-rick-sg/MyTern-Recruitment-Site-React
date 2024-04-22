import {useEffect, Fragment} from 'react';
import {Route, Routes, Navigate, NavLink} from 'react-router-dom';

///Component Imports
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import UserSignup from './components/SignupForms/UserSignup';
import CompanySignupStepper from './components/SignupForms/CompanySignupStepper';
import Signin from './components/Signin';
import SripeSuccess from './components/StripeSuccess';
import StripeCancel from './components/StripeCancel';
import ProfileManager from './components/ProfileManager';
import StripePayment from './components/StripePayment';
import AdminPage from './pages/AdminPage';
import CorpNav from './components/Navbar/CorpNav';
import LandingPage from './pages/LandingPage';
import OauthSuccess from './components/OauthSuccess';

//Context Imports (may need to set the theme here if we want light/dark mode setup)
import {useUser} from './hooks/useUser';
//MUI Stuff
//Create the theme and apply it around the whole app
import {createTheme, ThemeProvider} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

const userTheme = createTheme({
  palette: {
    primary: {
      main: '#2979FF',
    },
    secondary: {
      main: '#0def3e',
    },
    footer: {
      main: '#64B5F6',
      text: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 16,
          fonrWeight: 700,
          '&:hover': {
            backgroundColor: '#64B5F6',
            color: 'white',
          },
          margin: '2px',
        },
      },
    },
  },
});

function App() {
  const {user, checkSession} = useUser();

  useEffect(() => {
    checkSession();
  }, []);

  if (user.role === 'contributor') {
    return (
      <ThemeProvider theme={userTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Fragment>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/member" element={<MemberPage />} />
              <Route path="/member/add" element={<AddProject />} />
              <Route path="/checkout/:projectID" element={<Checkout />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/profile" element={<ProfileManager />} />
              <Route path="/success" element={<StripeSuccess />} />
              <Route path="/cancel" element={<StripeCancel />} />
            </Routes>
            <Footer />
          </Fragment>
        </LocalizationProvider>
      </ThemeProvider>
    );
  } else if (user.role === 'user') {
    return (
      <ThemeProvider theme={userTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Fragment>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="/profile" element={<ProfileManager />} />
              <Route path="/checkout/:projectID" element={<Checkout />} />
              <Route path="checkout/stripe" element={<StripePayment />} />
              <Route path="/success" element={<StripeSuccess />} />
              <Route path="/cancel" element={<StripeCancel />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </Fragment>
        </LocalizationProvider>
      </ThemeProvider>
    );
  } else if (user.role === 'admin') {
    return (
      <ThemeProvider theme={userTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Fragment>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="home" />} />

              <Route path="*" element={<NotFoundPage />} />
              <Route path="/success" element={<StripeSuccess />} />
              <Route path="/cancel" element={<StripeCancel />} />
              <Route path="/admin/dashboard" element={<AdminPage />} />
            </Routes>
            <Footer />
          </Fragment>
        </LocalizationProvider>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={userTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Fragment>
            <NavBar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/newnav" element={<CorpNav />} />
              <Route path="signup" element={<UserSignup />} />
              <Route path="company-signup" element={<CompanySignupStepper />} />
              <Route path="signin" element={<Signin />} />
              <Route path="oauth-success" element={<OauthSuccess />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </Fragment>
        </LocalizationProvider>
      </ThemeProvider>
    );
  }
}

export default App;
