import {useState, useEffect} from 'react';
//Component Imports
import UploadResume from './UploadResume';
import SkillsList from './SkillsList';

//MUI Imports
import {Grid, Typography, CircularProgress, TextField, Button} from '@mui/material';
import SkillsModal from './UserComponents/SkillsModal';

const CreateSkillProfile = () => {
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [importResult, setImportResult] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [analysing, setAnalysing] = useState(false);
  const [inputFields, setInputFields] = useState({
    summary: '',
    active: true,
  });
  const [skillsFields, setSkillsFields] = useState([]);
  const [toDelete, setToDelete] = useState([]);
  const [error, setError] = useState({
    summary: false,
  });

  const getBasic = async () => {
    const basicResult = await fetch(import.meta.env.VITE_SERVER + '/api/talent/basic', {
      method: 'GET',
      credentials: 'include',
    });
    if (basicResult.status == 200) {
      console.log(basicResult);
      const data = await basicResult.json();
      console.log('basic user info: ', data);
      setInputFields({...inputFields, summary: data.summary, active: data.active});
    }
    return true;
  };

  const getSkills = async () => {
    const skillsResult = await fetch(import.meta.env.VITE_SERVER + '/api/talent/skills', {
      method: 'GET',
      credentials: 'include',
    });
    if (skillsResult.status === 200) {
      const data = await skillsResult.json();
      console.group('skills result is: ', data);
      console.log('adding the skills items to the state Array');
      setSkillsFields(data);
    }
  };

  useEffect(() => {
    if (!importResult) {
      console.log('running useEffect for updated object');
      getBasic();
      getSkills();
    }
  }, []); //add import result back after testing

  const deleteSkills = async () => {
    if (toDelete.length === 0) {
      console.log('no skills to be removed');
      return true;
    } else {
      try {
        const deleteResponse = await fetch(
          import.meta.env.VITE_SERVER + '/api/talent/delete-skills',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(toDelete),
            withCredentials: true,
            credentials: 'include',
          }
        );
        const data = await deleteResponse.json();
        if (data.status === 'ok') {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    }
  };

  const updateSkills = async () => {
    const toUpdate = skillsFields.filter(skill => skill.changed === true);
    if (toUpdate.length !== 0) {
      let updateArr = [];
      for (const skillObj of toUpdate) {
        const tmpObj = {
          skillId: skillObj.skill_id,
          level: skillObj.level,
          experience: skillObj.experience,
        };
        updateArr.push(tmpObj);
      }
      try {
        const updateResponse = await fetch(
          import.meta.env.VITE_SERVER + '/api/talent/update-skills',
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateArr),
            withCredentials: true,
            credentials: 'include',
          }
        );
        const data = await updateResponse.json();
        if (data.status === 'ok') {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    }
  };

  const updateBasic = async () => {
    console.log('the basic object we have is: ', inputFields);
    const basicResponse = await fetch(import.meta.env.VITE_SERVER + '/api/talent/update-basic', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputFields),
      credentials: 'include',
    });
    const data = await basicResponse.json();
    if (data.status === 200) {
      return true;
    } else return false;
  };

  const handleSubmit = e => {
    setSubmitting(true);
    const deleteOK = deleteSkills();
    if (deleteOK) {
      console.log('delete confirmed');
      setToDelete([]);
      const updateOK = updateSkills();
      if (updateOK) {
        console.log('updated skills');
        const basicOK = updateBasic();
        if (basicOK) {
          console.log('all updates successful');
        }
      } else {
        console.error('failed to update skills');
      }
    }
    console.log('update completed successfully');
  };

  const handleChange = e => {
    e.preventDefault();
    if (e.target.name === 'summary') {
      setInputFields({...inputFields, [e.target.name]: e.target.value, changed: true});
    }
  };

  const handleCancel = async () => {
    console.log('refreshing the page after pulling data again');
    getBasic();
    getSkills();
    setSubmitting(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{border: 1, color: 'purple'}}>
          <Typography variant="h3" sx={{textAlign: 'center'}}>
            Build your Search Profile
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{border: 1, color: 'red'}}>
          <UploadResume
            setImportResult={setImportResult}
            analysing={analysing}
            setAnalysing={setAnalysing}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{border: 1, color: 'red', textAlign: 'center'}}>
          {!analysing ? (
            <TextField
              autoComplete="summary"
              name="summary"
              required
              fullWidth
              multiline
              rows={5}
              id="summary"
              label="Professional Summary"
              value={inputFields.summary}
              onChange={handleChange}
              autoFocus
              error={error.summary}
              helperText={error.summary}
              disabled={submitting ? true : false}
            />
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={10} sx={{border: 1, color: 'purple', borderStyle: 'dashed', mt: 3}}>
          <SkillsList
            setSkillsFields={setSkillsFields}
            skillsFields={skillsFields}
            setShowSkillsModal={setShowSkillsModal}
            setToDelete={setToDelete}
            toDelete={toDelete}
          />
        </Grid>
        <Grid item xs={2} sx={{border: 1, color: 'pink', borderStyle: 'dotted'}}>
          <Button variant="outlined" onClick={handleCancel} sx={{margin: 1}}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" sx={{margin: 1}}>
            Submit
          </Button>
        </Grid>
      </Grid>

      {showSkillsModal && <SkillsModal setShowSkillsModal={setShowSkillsModal} />}
    </>
  );
};

export default CreateSkillProfile;
