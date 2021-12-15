import React from 'react';
import {connect} from 'react-redux';
import EmployeeForm from '../../forms/employee.form';
import {navigate} from '@reach/router';

const EditProfile = ({user}) => {

  const onFinish = () => {
    navigate('/');
  };

  if (user) return <EmployeeForm companyType={user.companyType} id={user.companyId} isAdmin={user.isAdmin} onCancel={() => null} onDone={onFinish} />;
  return null;
};

const mapStateToProps = (state) => {
  return {user: state.user.userMeta};
};

export default connect(mapStateToProps)(EditProfile);
