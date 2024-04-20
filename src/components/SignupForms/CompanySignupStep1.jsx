import {Fragment} from 'react';
import NameFormComponents from '../FormComponents/NameFormComponents';
import PositionFormComponents from '../FormComponents/PositionFormComponents';
import EmailComponents from '../FormComponents/EmailComponents';

//MUI Imports
import {Divider} from '@mui/material';

const CompanySignupStep1 = ({inputFields, handleChange, error, submitting}) => {
  return (
    <Fragment>
      <Divider flexItem={true} sx={{mt: '15px', mb: '15px', color: 'grey'}} textAlign="center">
        About You
      </Divider>
      <NameFormComponents
        inputFields={inputFields}
        handleChange={handleChange}
        error={error}
        submitting={submitting}
      />
      <Divider flexItem={true} sx={{mt: '15px', mb: '15px', color: 'grey'}} textAlign="center">
        About Your Role
      </Divider>
      <PositionFormComponents
        inputFields={inputFields}
        handleChange={handleChange}
        error={error}
        submitting={submitting}
      />
      <Divider flexItem={true} sx={{mt: '15px', mb: '15px', color: 'grey'}} textAlign="center">
        Your Work Email / Master User ID
      </Divider>
      <EmailComponents
        inputFields={inputFields}
        handleChange={handleChange}
        error={error}
        submitting={submitting}
      />
    </Fragment>
  );
};

export default CompanySignupStep1;
