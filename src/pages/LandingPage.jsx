import {useState, useEffect} from 'react';
import {useUser} from '../hooks/useUser';
import LandingCSS from './styles.module.css';
//MUI IMPORTS
import {Grid, Typography} from '@mui/material';
import {blue} from '@mui/material/colors';

//Component Imports
import LandingCard from '../components/LandingComponents/LandingCard';

const LandingPage = () => {
  // TODO Add logic to check for login or can I do this in the app bar as it's always called and reduces code?
  const {user, checkLocalUser} = useUser();

  useEffect(() => {
    checkLocalUser();
  });

  const cardOne = {
    image: '/office_workers.jpeg',
    title: 'Find Your Perfect Role',
    text: 'MyTern are the only service matching top talent with great employers without bias or prejudice. Signup today to get matched to great roles',
    buttonTextOne: 'CLICK FOR MORE INFO',
    link: '/signup',
  };

  const cardTwo = {
    image: '/hiring_image.jpeg',
    title: 'Recruit Top Talent Today',
    text: 'Our Job Service is currently 100% free with no added costs - join the revolution and start hiring top talent based on skills and aptitude no more `gut feeling`',
    buttonTextOne: 'CLICK FOR MORE INFO',
    link: '/company-signup',
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{minHeight: '85vh'}}>
        <Grid item xs={3}>
          <LandingCard custom={cardOne} />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <LandingCard custom={cardTwo} sx={{}} />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h4" sx={{textAlign: 'center', mt: '-10px', color: blue[500]}}>
            Experience the future of talent management today. Join MyTern on our journey to match
            the best talent with the best employers, focussing only on talent, skill, results and
            experience
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default LandingPage;
