import {Fragment} from 'react';

//MUI Imports
import {Divider} from '@mui/material';
import CompanyUsersFormComponents from '../FormComponents/CompanyUsersFormComponents';

const CompanySignupStep3 = ({
  inputFields,
  handleChange,
  error,
  submitting,
  emailList,
  setEmailList,
}) => {
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
        emailList={emailList}
        setEmailList={setEmailList}
      />

      <Divider flexItem={true} sx={{mt: '15px', mb: '15px', color: 'grey'}} textAlign="center">
        Click Finish when you are done adding users. You can also add/remove users in account
        settings.
      </Divider>
    </Fragment>
  );
};

export default CompanySignupStep3;
