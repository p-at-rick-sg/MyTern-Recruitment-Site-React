import * as React from 'react';
import {Link} from 'react-router-dom';

//MUI IMPORTS
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {blue} from '@mui/material/colors';

const LandingCard = ({custom}) => {
  return (
    <Link to={custom.link}>
      <Card
        raised={true}
        sx={{
          maxWidth: 350,
          maxHeight: 500,
          minHeight: 500,
          borderRadius: 7,
          '&:hover': {bgcolor: blue[100]},
        }}>
        <CardMedia component="img" alt="green iguana" height="140" image={custom.image} />
        <CardContent sx={{minHeight: '190px', justifyContent: 'center'}}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{color: blue[600], textAlign: 'center'}}>
            {custom.title}
          </Typography>
          <Typography variant="body" color="text.secondary">
            {custom.text}
          </Typography>
        </CardContent>
        <CardActions sx={{justifyContent: 'center'}}>
          <Typography variant="h5" sx={{color: blue[600]}}>
            {custom.buttonTextOne}
          </Typography>
        </CardActions>
      </Card>
    </Link>
  );
};
export default LandingCard;
