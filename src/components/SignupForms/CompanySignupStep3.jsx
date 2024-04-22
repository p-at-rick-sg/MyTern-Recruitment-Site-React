import {Fragment} from 'react';

//MUI Imports
import {Divider} from '@mui/material';
import CompanyUsersFormComponents from '../FormComponents/CompanyUsersFormComponents';

const CompanySignupStep3 = ({inputFields, handleChange, error, submitting}) => {
  return (
    <Fragment>
      <Divider flexItem={true} sx={{mt: '15px', mb: '15px', color: 'grey'}} textAlign="center">
        Need to Add Some Colleagues?
      </Divider>
      <CompanyUsersFormComponents
        inputFields={inputFields}
        handleChange={handleChange}
        error={error}
        submitting={submitting}
      />

      <Divider flexItem={true} sx={{mt: '15px', mb: '15px', color: 'grey'}} textAlign="center">
        Registered Address
      </Divider>
    </Fragment>
  );
};

export default CompanySignupStep3;
