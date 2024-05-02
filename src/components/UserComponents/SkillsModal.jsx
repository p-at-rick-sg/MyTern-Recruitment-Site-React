import {useEffect, useState} from 'react';

//CSS Imports
import './SkillsModal.css';

//MUI Imports
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import {Unstable_NumberInput as NumberInput} from '@mui/base/Unstable_NumberInput';

const SkillsModal = ({setAddSkillModal, skillArr}) => {
  const [inputFields, setInputFields] = useState({});
  const [filteredSkillsArr, setFilteredSkillsArr] = useState();
  const [selectedId, setSelectedId] = useState();
  const [submitting, setSubmitting] = useState(false);

  const handleFilter = e => {
    const filter = e.target.value;
    const filteredSkills = skillArr.filter(skill => skill.skill_name.includes(filter));
    setFilteredSkillsArr(filteredSkills);
    console.log(filteredSkillsArr);
  };

  const handleListItemClick = (event, id) => {
    setSelectedId(id);
    console.log('Selected Id is: ', selectedId);
  };

  const handleChange = e => {
    console.log(e.target.value);
    setInputFields({...inputFields, [e.target.name]: e.target.value});
  };

  const addSkillDb = async skillObj => {
    if (Object.keys(skillObj).length === 3) {
      try {
        const skillsResult = await fetch(import.meta.env.VITE_SERVER + '/api/talent/add-skill', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(skillObj),
          credentials: 'include',
        });
        if (skillsResult.status === 200) {
          console.log('skill updated ok');
          setAddSkillModal(false);
        }
      } catch (err) {
        console.error('failed to update db');
        return false;
      }
    }
  };

  const handleAdd = e => {
    console.log('adding a skill item to the database');
    //check the values re valie
    if (selectedId !== undefined) {
      setSubmitting(true);
      const toUpdate = {
        skillId: selectedId,
        level: inputFields.level,
        yearsExp: inputFields.yearsExp,
      };
      console.log(toUpdate);
      //run the db update
      addSkillDb(toUpdate);
    }
  };

  return (
    <div className="modal-container">
      <Container component="main" maxWidth="md" className="modal">
        <FormControl>
          <Grid item md={9}>
            <Typography variant="h6"></Typography>
          </Grid>
          <Grid item md={3}>
            <TextField label="filter skills" onChange={handleFilter} />
          </Grid>
          <Grid item md={4}>
            <List>
              {filteredSkillsArr &&
                filteredSkillsArr.slice(0, 5).map(filteredSkill => (
                  <ListItemButton
                    selected={filteredSkill.skill_id}
                    onClick={e => handleListItemClick(e, filteredSkill.skill_id)}>
                    <ListItemText>{filteredSkill.skill_name}</ListItemText>
                  </ListItemButton>
                ))}
            </List>
          </Grid>
          <Grid item md={3}>
            <TextField
              label="Level"
              type="number"
              fullWidth
              id="level"
              name="level"
              InputProps={{inputProps: {min: 1, max: 5}}}
              value={inputFields.level}
              onChange={handleChange}></TextField>
          </Grid>
          <Grid item md={3}>
            <TextField
              label="Years Experience"
              type="number"
              fullWidth
              id="yearsExp"
              name="yearsExp"
              InputProps={{inputProps: {min: 1, max: 50}}}
              value={inputFields.yearsExp}
              onChange={handleChange}
              autoFocus></TextField>
          </Grid>
          <Grid item md={3}>
            <Button onClick={handleAdd}>Add</Button>
          </Grid>
          <Grid item md={3}>
            <Button type="Cancel" onClick={() => setAddSkillModal(false)}>
              Cancel
            </Button>
          </Grid>
        </FormControl>
      </Container>
    </div>
  );
};

export default SkillsModal;
