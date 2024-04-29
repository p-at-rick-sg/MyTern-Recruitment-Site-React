import {useState, useEffect} from 'react';
//Component Imports
import UploadResume from './UploadResume';
import SkillsList from './SkillsList';

//MUI Imports
import {Grid, Typography, CircularProgress, TextField, List} from '@mui/material';
import SkillsModal from './UserComponents/SkillsModal';

const CreateSkillProfile = () => {
  //TEMP RETURN OBJECT
  const tmpResumeObj = {
    summary: 'I am an accomplished IT professional with over 20 years industry experience.',
    skills: [
      {
        name: 'it systems management',
        level: 0,
        yearsExp: 0,
        validated: false,
      },
      {
        name: 'team management and development',
        level: 0,
        yearsExp: 0,
        validated: false,
      },
      {
        name: 'vendor and contract management',
        level: 0,
        yearsExp: 0,
        validated: false,
      },
      {
        name: 'service delivery, incident management and change control',
        level: 0,
        yearsExp: 0,
        validated: false,
      },
      {
        name: 'global it support and environment management',
        level: 0,
        yearsExp: 0,
        validated: false,
      },
      {
        name: 'backup and disaster recovery solutions',
        level: 0,
        yearsExp: 0,
        validated: false,
      },
      {
        name: 'microsoft technologies',
        level: 0,
        yearsExp: 0,
        validated: false,
      },
      {
        name: 'network architecture lan/wan',
        level: 0,
        yearsExp: 0,
        validated: false,
      },
      {
        name: 'networking and telephony technology',
        level: 0,
        yearsExp: 0,
        validated: false,
      },
      {
        name: 'virtualisation technology',
        level: 0,
        yearsExp: 0,
        validated: false,
      },
      {
        name: 'cloud technologies',
        level: 0,
        yearsExp: 0,
        validated: false,
      },
    ],
    education: [
      {
        qualification: 'bsc (hons) information technology (grade - 2:1)',
        institution: '',
        endYear: null,
      },
      {
        qualification: 'advanced gnvq information technology (grade - merit)',
        institution: '',
        endYear: null,
      },
      {
        qualification: 'itil foundation',
        institution: '',
        endYear: null,
      },
    ],
    certifications: [],
    experience: [
      {
        title: 'group it manager',
        company: 'corex group',
        startDate: {
          year: 2019,
          month: 10,
        },
        endDate: {
          year: 2024,
          month: 4,
        },
        details:
          'Overall IT Budget management\nResponsibility for all IT systems\nAll support and change management\nVendors and contracts, including 3rd party support relationships\nKey projects undertaken:\nMigration of on premise to Microsoft 365\nMigration of on premise data centre to Microsoft Azure\nCompany mergers and integrations',
      },
      {
        title: 'regional it systems manager',
        company: 'npac holdings',
        startDate: {
          year: 2016,
          month: 2,
        },
        endDate: {
          year: 2019,
          month: 10,
        },
        details:
          'Delegation and management of support calls\nProvide 3rd line support when required to aid problem resolution\nBackup and disaster recovery management\nIT hardware and systems maintenance\nVendor management for purchasing and support\nContinuous improvement planning\nProject management\nKey projects undertaken:\nMigration of 13 sites to NPACs systems after an acquisition\nImplementation of Meraki LAN and WiFi solution to all locations\nMigration to Skype for Business full voice solution\nActive Directory and Exchange migration for over 600 users\nProvide infrastructure support to a global SAP implementation',
      },
      {
        title: 'it infrastructure manager',
        company: 'whitecroft lighting ltd',
        startDate: {
          year: 2015,
          month: 4,
        },
        endDate: {
          year: 2016,
          month: 2,
        },
        details:
          'Contract and vendor management\nChange implementation for new IT systems\nDelegation and management of support calls\nProvide 3rd line support when required to aid problem resolution\nBackup and disaster recovery management\nIT hardware and systems maintenance',
      },
      {
        title: 'infrastructure manager',
        company: 'api group plc',
        startDate: {
          year: 2012,
          month: null,
        },
        endDate: {
          year: 2015,
          month: 3,
        },
        details:
          'Delegation and management of support calls\nProvide 3rd line support when required to aid problem resolution\nBackup and disaster recovery management\nIT hardware and systems maintenance\nVendor management for purchasing and support\nContinuous improvement planning\nProject management\nKey projects undertaken:\nMigration of global WAN to a new supplier\nImplementation of a Cisco IP telephony and unified communications platform\nImplementation of highly available Hyper-V clusters in multiple locations\nDevelop backup and disaster recovery strategy to ensure continuous IT services\nUpgrade of global infrastructure to meet the requirements of a new ERP system\nDevelop a strategy and budget for rolling hardware improvements',
      },
      {
        title: 'systems administrator',
        company: 'api group plc',
        startDate: {
          year: 2004,
          month: 10,
        },
        endDate: {
          year: 2012,
          month: null,
        },
        details:
          'Day-to-day management of systems (email, internet, security and file and print services)\nDesktop and infrastructure support. 2nd and 3rd line\nRoutine maintenance\nTroubleshoot problems with software, hardware and networks\nCo-ordinate backups and data archiving\nData management\nUpgrades of hardware and software on desktops and servers\nImplementation of new technologies',
      },
    ],
  };
  // END OF TEMP OBJECT
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [updateRow, setUpdateRow] = useState({});
  const [resumeObj, setResumeObj] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [analysing, setAnalysing] = useState(false);

  const [inputFields, setInputFields] = useState({
    summary: '',
  });

  useEffect(() => {
    //temp setting from them object
    setResumeObj(tmpResumeObj);
  }, [tmpResumeObj]);

  useEffect(() => {
    if (resumeObj) {
      setInputFields({...inputFields, summary: resumeObj.summary});
    }
  }, [resumeObj]);

  const [error, setError] = useState({
    summary: false,
  });

  const handleSubmit = e => {
    console.log(submitting);
  };

  const handleChange = e => {};

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
            setResumeObj={setResumeObj}
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
        <Grid item xs={11} sx={{border: 1, color: 'purple', borderStyle: 'dashed', mt: 3}}>
          <SkillsList
            resumeObj={resumeObj}
            setInputFields={setInputFields}
            setShowSkillsModal={setShowSkillsModal}
          />
        </Grid>
      </Grid>
      const [updateRow, setupdateRow] = useState({})
      {showSkillsModal && (
        <SkillsModal
          setShowSkillsModal={setShowSkillsModal}
          updateRow={updateRow}
          setUpdateRow={setUpdateRow}
        />
      )}
    </>
  );
};

export default CreateSkillProfile;
