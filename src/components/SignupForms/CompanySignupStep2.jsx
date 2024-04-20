import {Fragment} from 'react';

//MUI Imports
import {Divider} from '@mui/material';
import AddressFormComponents from '../FormComponents/AddressFormComponents';
import CompanyInfoComponents from '../FormComponents/CompanyInfoComponents';

const CompanySignupStep2 = ({inputFields, handleChange, error, submitting}) => {
  return (
    <Fragment>
      <Divider flexItem={true} sx={{mt: '15px', mb: '15px', color: 'grey'}} textAlign="center">
        About Your Company
      </Divider>
      <CompanyInfoComponents
        inputFields={inputFields}
        handleChange={handleChange}
        error={error}
        submitting={submitting}
      />

      <Divider flexItem={true} sx={{mt: '15px', mb: '15px', color: 'grey'}} textAlign="center">
        Registered Address
      </Divider>
      <AddressFormComponents
        inputFields={inputFields}
        handleChange={handleChange}
        error={error}
        submitting={submitting}
      />
    </Fragment>
  );
};

export default CompanySignupStep2;
