import {SIGN_UP_START, SIGN_UP_FAILURE, SIGN_UP_SUCCESS} from './index';
import {createEmployee, createClient, createCompany} from '../api/auth';

export const signUpStart = () => ({
  type: SIGN_UP_START,
});

export const signUpFailure = () => ({
  type: SIGN_UP_FAILURE,
});

export const signUpSuccess = (user) => ({
  payload: {...user, type: 'public'},
  type: SIGN_UP_SUCCESS,
});

export const signUpEmployeeStartAsync = ({
  username,
  email,
  password,
  first_name,
  last_name,
}) => async (dispatch) => {
  dispatch(signUpStart());
  console.log({username, email, password, first_name, last_name});
  const res = await createEmployee({
    username,
    email,
    password,
    first_name,
    last_name,
  });
  const {data, error, loading} = res;
  if (data) {
    console.log(data);
    return dispatch(signUpSuccess(data));
  }

  console.log(error);
  dispatch(signUpFailure(error));
};

export const signUpClientStartAsync = ({
  username,
  email,
  password,
  first_name,
  last_name,
}) => async (dispatch) => {
  dispatch(signUpStart());
  const res = await createClient({
    username,
    email,
    password,
    first_name,
    last_name,
  });
  const {data, error, loading} = res;
  if (data) {
    console.log(data);
    return dispatch(signUpSuccess(data));
  }
  console.log(error);
  dispatch(signUpFailure(error));
};


export const signUpCompany = (company) => async (dispatch) => {
  dispatch(signUpStart());
  const res = await createCompany(company);
  const {data, error } = res;
  if (data) {
    return dispatch(signUpSuccess(data));
  }
  dispatch(signUpFailure(error));
};
