//CSS Imports
import './SkillsModal.css';

//MUI Imports
import {Box, Button, Container, FormControl, Grid, TextField, Typography} from '@mui/material';

const SkillsModal = ({setShowSkillsModal}) => {
  return (
    <div className="modal-container">
      <Container component="main" maxWidth="md" className="modal">
        <FormControl>
          <Grid item md={6}>
            <Typography variant="h6">prop in the skill title later</Typography>
          </Grid>
          <Grid item md={3}>
            <TextField defaultValue="Level"></TextField>
          </Grid>
          <Grid item md={3}>
            <TextField defaultValue="experience"></TextField>
          </Grid>
          <Grid item md={3}>
            <Button type="submit">Update</Button>
          </Grid>
          <Grid item md={3}>
            <Button type="Cancel" onClick={() => setShowSkillsModal(false)}>
              Cancel
            </Button>
          </Grid>
        </FormControl>
      </Container>
    </div>
  );
};

export default SkillsModal;
