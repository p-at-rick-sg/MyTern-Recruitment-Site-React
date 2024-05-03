import {useState} from 'react';
import {useUser} from '../hooks/useUser';

//MUI Imports
import {Box, TextField, Grid, LinearProgress, Button} from '@mui/material';

const UploadResume = ({analysing, setAnalysing, setImportResult}) => {
  const {user} = useUser();
  const [resume, setResume] = useState(null);
  const [inputKey, setInputKey] = useState('key');
  const [fileError, setFileError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFile = e => {
    setFileError(false);
    const allowedFileTypes = ['pdf', 'docx'];
    const fileSuffix = e.target.files[0].name.split('.').pop();
    if (allowedFileTypes.includes(fileSuffix)) {
      setResume({...resume, file: e.target.files[0], name: e.target.files[0].name});
    } else {
      setFileError(true);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (resume !== null) {
      setSubmitting(true);
      const uploadedResponse = await uploadResume(resume);
      console.log('uploaded response is: ', uploadedResponse);
      if (uploadedResponse) {
        setSubmitting(false);
        setResume(null);
        setInputKey(inputKey + 'x');
        //pass for analysis
        setAnalysing(true);
        console.log(uploadedResponse);
        const analysisResult = await analyseResume(uploadedResponse, user.id);
        console.log('Anaysis Returned Obj: ', analysisResult);
        if (analysisResult) {
          setFileError(false);
          setAnalysing(false);
          setImportResult(true);
        }
      } else {
        console.error('the file attribute was null');
        setFileError(true);
        setAnalysing(false);
      }
    }
  };

  const analyseResume = async (uploadedFileName, userId) => {
    console.log('resume filename: ', uploadedFileName);
    console.log('userId: ', userId);
    const body = JSON.stringify({
      fileName: uploadedFileName,
      userId: userId,
    });
    try {
      console.log('trying the fetch to the scan endpoint');
      const response = await fetch(import.meta.env.VITE_SERVER + '/api/talent/ai-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: body,
      });
      console.log('completed the fetch');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error('failed to analyse the data');
    }
  };

  const uploadResume = async imageObj => {
    try {
      const formdata = new FormData();
      formdata.append('resume', resume.file, resume.name);
      const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: formdata,
        redirect: 'follow',
      };
      const result = await fetch('http://localhost:7001/api/talent/upload/', requestOptions);
      const data = await result.json();
      const fileName = data.fileName;
      console.log(fileName);
      return fileName;
    } catch (err) {
      console.error('failed to upload resume with error: ', err);
      return false;
    }
  };

  return (
    <Box component="form" maxWidth={300} onSubmit={handleSubmit} sx={{m: 5}}>
      <Grid container spacing={2}>
        <TextField key={inputKey} type="file" id="image" name="images" onChange={handleFile} />
      </Grid>
      <Grid container spacing={2} sx={{mt: '10px', alignItems: 'center', justifyContent: 'center'}}>
        <Button
          disabled={resume ? false : true}
          variant="contained"
          color="primary"
          onClick={handleSubmit}>
          Upload Resume
        </Button>
      </Grid>
      <Grid mt={5}>{submitting && <LinearProgress />}</Grid>
    </Box>
  );
};

export default UploadResume;
