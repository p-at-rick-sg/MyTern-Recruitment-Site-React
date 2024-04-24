import {Fragment} from 'react';
import NameFormComponents from '../FormComponents/NameFormComponents';
import PositionFormComponents from '../FormComponents/PositionFormComponents';
import EmailComponents from '../FormComponents/EmailComponents';
import PasswordComponents from '../FormComponents/PasswordComponents';

//MUI Imports
import {Divider} from '@mui/material';

const CompanySignupStep1 = ({
  inputFields,
  handleChange,
  error,
  submitting,
  handleEmailMatch,
  handlePasswordMatch,
}) => {
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
        handleMatch={handleEmailMatch}
      />

      {error.passwordMismatch && error.passwordMismatch ? (
        <Divider flexItem={true} sx={{mt: '15px', mb: '15px', color: 'red'}} textAlign="center">
          Password's Don't Match
        </Divider>
      ) : (
        <Divider flexItem={true} sx={{mt: '15px', mb: '15px', color: 'grey'}} textAlign="center">
          Choose a Complex Password
        </Divider>
      )}

      <PasswordComponents
        inputFields={inputFields}
        handleChange={handleChange}
        error={error}
        submitting={submitting}
        handleMatch={handlePasswordMatch}
      />
    </Fragment>
  );
};

export default CompanySignupStep1;
