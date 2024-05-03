import {useState, useEffect} from 'react';
//MUI
import {Button, List, ListItemButton, ListItemText} from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import {InputLabel, Select, MenuItem, Box, Checkbox} from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

//context
import {useUser} from '../../hooks/useUser';

import {getSkills} from '../functional/sharedModules';

const AddRoleForm = () => {
  const {user} = useUser();
  const [selectedId, setSelectedId] = useState();
  const [skillsArr, setSkillsArr] = useState([]);
  const [filteredSkillsArr, setFilteredSkillsArr] = useState();
  const [addedSkillsArr, setAddedSkillsArr] = useState([]);
  const [inputFields, SetInputFields] = useState({
    manager: '',
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
    return tmpErrors;
  };

  const populateSkills = async () => {
    const skillArr = await getSkills();
    setSkillsArr(skillArr);
  };

  useEffect(() => {
    populateSkills();
  }, []);

  const handleSubmit = async e => {
    console.log('submit fired'); //also diable the form once we are OK with the fields
    e.preventDefault();

    SetInputFields({
      jobTitle: '',
      jobDescription: '',
      postedDate: '',
      location: '',
      recruiterEmail: '', //later will prop this in from recUser but free form for now
      status: 'draft',
    });
  };

  const handleFilter = e => {
    console.log('updating filter');
    const filter = e.target.value;
    const filteredSkills = skillsArr.filter(skill => skill.skill_name.includes(filter));
    setFilteredSkillsArr(filteredSkills);
  };

  const handleListItemAdd = (e, skillObj) => {
    //add to the added array
    setAddedSkillsArr([...addedSkillsArr, skillObj]);
    //remove from the main array
    const tmpArr = skillsArr.filter(skill => skill !== skillObj);
    setSkillsArr(tmpArr);
  };

  const handleListItemRemove = (e, skillObj) => {
    //find the skill and remove
    const tmpArr = addedSkillsArr.filter(skill => skill !== skillObj);
    setAddedSkillsArr(tmpArr);
    //add back to the main list array
    setSkillsArr([...skillsArr, skillObj]);
    //how to force a refresh of the filtered list?
  };

  return (
    <div>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography component="h1" variant="h5">
            Add a New Role
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  name="manager"
                  required
                  fullWidth
                  id="manager"
                  label="Hiring Manager"
                  value={inputFields.manager} //this will be pulled from rhe recUser object later
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
              <Grid item md={3}>
                <TextField label="filter skills" onChange={handleFilter} fullWidth />
              </Grid>
              <Grid item md={3}>
                <List>
                  {filteredSkillsArr &&
                    filteredSkillsArr.slice(0, 5).map(filteredSkill => (
                      <ListItemButton
                        dense="true"
                        divider="true"
                        key={filteredSkill.skill_id}
                        selected={filteredSkill.skill_id}
                        onClick={e => handleListItemAdd(e, filteredSkill)}>
                        <ListItemText sx={{typography: 'caption'}}>
                          {filteredSkill.skill_name}
                        </ListItemText>
                      </ListItemButton>
                    ))}
                </List>
              </Grid>
              <Grid></Grid>
              <Grid item md={3}>
                <List sx={{maxHeight: '250px', overflowY: 'auto'}}>
                  {addedSkillsArr &&
                    addedSkillsArr.slice(0, 5).map(addedSkill => (
                      <ListItemButton
                        dense="true"
                        divider="true"
                        key={addedSkill.skill_id}
                        selected={addedSkill.skill_id}
                        onClick={e => handleListItemRemove(e, addedSkill)}>
                        <ListItemText sx={{typography: 'caption'}}>
                          {addedSkill.skill_name}
                        </ListItemText>
                      </ListItemButton>
                    ))}
                </List>
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
    </div>
  );
};

export default AddRoleForm;
