import { CHANGE_PAGE,PAGE_SIZE_CHANGE } from '../actions/index';

const INITIAL_STATE = {
  currentPage: 1,
  pageSize: 10,
};

export const Page = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, currentPage: action.payload };
    case PAGE_SIZE_CHANGE:
      return { ...state, pageSize:action.pageSize };
    default:
      return state;
  }
};
