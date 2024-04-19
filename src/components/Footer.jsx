//MUI Imports
import {Container, Box, Typography, Link} from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/p-at-rick-sg">
        Patrick Kittle
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          py: 2,
          mt: 5,
          color: theme =>
            theme.palette.mode === 'light' ? theme.palette.footer.text : theme.palette.footer.text,
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.footer.main : theme.palette.footer.main,
        }}>
        <Container align="center">
          <Typography variant="h6">Proud to be a mytern Group Company</Typography>
          <Copyright />
        </Container>
      </Box>
    </>
  );
};

export default Footer;
