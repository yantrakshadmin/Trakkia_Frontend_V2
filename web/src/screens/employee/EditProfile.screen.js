import React from 'react';
import {connect} from 'react-redux';
import EmployeeForm from '../../forms/employee.form';
import ClientForm from '../../forms/client.form';
import {navigate} from '@reach/router';
import {getUserMeta} from 'common/helpers/auth';
import {useDispatch} from 'react-redux';

const EditProfile = ({user}) => {

  const dispatch = useDispatch()

  const onFinish = async () => {
    
    await getUserMeta(dispatch);
    navigate('/');
  };

  if (user && user.isAdmin) return <ClientForm id={user.userId} onCancel={() => null} onDone={onFinish} />;
  else if(user) return <EmployeeForm id={user.userId} onCancel={() => null} onDone={onFinish} />
  return null;
};

const mapStateToProps = (state) => {
  return {user: state.user.userMeta};
};

export default connect(mapStateToProps)(EditProfile);
