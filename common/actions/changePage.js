import {CHANGE_PAGE, PAGE_SIZE_CHANGE} from './index';

export const changePage = (currentPage) => {
  return {
    type: CHANGE_PAGE,
    payload: currentPage,
  };
};


export const changePageAction = (currentPage) => async (dispatch) => {
  dispatch(changePage(currentPage));
};


export const changePageSizeAction = (pageSize) => async (dispatch) => {
  dispatch({type:PAGE_SIZE_CHANGE, pageSize});
};
