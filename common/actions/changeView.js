import {CHANGE_USER_VIEW} from './index';

export const changeView = (view) => {
  return {
    type: CHANGE_USER_VIEW,
    payload: view,
  };
};
