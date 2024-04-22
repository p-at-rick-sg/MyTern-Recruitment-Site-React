import {useState} from 'react';
//MUI Imports
import {
  List,
  ListItem,
  ListItemText,
  Box,
  TextField,
  Grid,
  LinearProgress,
  Button,
  IconButton,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';

const CompanyUsersFormComponents = ({inputFields, handleChange, error, submitting}) => {
  const [userList, setUserList] = useState([]);

  const addUserToList = () => {};

  const removeUserFromList = () => {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
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
          inputProps={{pattern: '^@[A-Za-z ]+'}}
          helperText="Enter Domain starting with @"
          disabled={submitting ? true : false}
        />
      </Grid>
      <Grid item>
        <List dense={true}>
          {userList.map((image, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" id={index} onClick={removeUserFromList}>
                  <DeleteIcon />
                </IconButton>
              }>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={image.name} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Button variant="contained" color="primary" component="span" onClick={addUserToList}>
        Add Users
      </Button>
    </Grid>
  );
};

export default CompanyUsersFormComponents;
