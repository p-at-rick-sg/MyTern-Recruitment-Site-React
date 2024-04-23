import {useState} from 'react';
import validator from 'email-validator';

//MUI Imports
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Grid,
  LinearProgress,
  Button,
  IconButton,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const CompanyUsersFormComponents = ({
  inputFields,
  handleChange,
  error,
  submitting,
  userList,
  setUserList,
}) => {
  // const prefix = /^[a-zA-Z0-9\-\.]+$/;
  // const suffix = /^@[a-zA-Z0-9\-\.]+$/; these don;t work in node but they do in regex101!
  const addEmailToList = () => {
    const newEmail = `${inputFields.emailPrefix}@${inputFields.primaryDomain}`;
    console.log(newEmail);
    if (validator.validate(newEmail)) {
      //check if already in the list
      if (userList.includes(newEmail)) {
        console.log('already in the list');
        pass;
      } else {
        //add email to the list array
        setUserList([...userList, newEmail]);
        inputFields.emailPrefix = '';
      }
    }
  };

  const removeEmailFromList = () => {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="domain"
          name="emailPrefix"
          required
          fullWidth
          id="emailPrefix"
          label="Email Prefix"
          value={inputFields.emailPrefix}
          onChange={handleChange}
          autoFocus
          error={error.emailPrefix}
          inputProps={{pattern: '[A-Za-z.-]+'}}
          helperText="Enter Users Email Prefix"
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item>
        <Typography variant="h5">@</Typography>
      </Grid>
      <Grid item xs={12} sm={5}>
        <TextField
          autoComplete="domain"
          name="primaryDomain"
          required
          fullWidth
          id="primaryDomain"
          label="Primary Email Domain"
          value={inputFields.primaryDomain}
          onChange={handleChange}
          autoFocus
          error={error.primaryDomain}
          inputProps={{pattern: '[A-Za-z.-]+'}}
          helperText="Enter Domain exluding the @ - must be the same for all users added"
          disabled={submitting || userList.length > 0 ? true : false}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <List dense={true}>
          {userList.map((email, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" id={index} onClick={removeEmailFromList}>
                  <PersonRemoveIcon />
                </IconButton>
              }>
              <ListItemAvatar>
                <Avatar>
                  <PersonAddAltIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={addEmailToList}>
          Add User To List
        </Button>
      </Grid>
    </Grid>
  );
};

export default CompanyUsersFormComponents;
