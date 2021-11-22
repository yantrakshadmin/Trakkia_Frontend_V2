// import {ifNotStrReturnA} from '../helpers/mrHelper';

export default [
  {
    title: 'First Name',
    key: 'first_name',
    dataIndex: 'first_name',
    width: '16vw',
    // sorter: (a, b) => ifNotStrReturnA(a.name).localeCompare(ifNotStrReturnA(b.name)),
    // showSorterTooltip: false,
  },
  {
    title: 'Last Name',
    key: 'last_name',
    dataIndex: 'last_name',
    width: '16vw',
    // sorter: (a, b) => ifNotStrReturnA(a.name).localeCompare(ifNotStrReturnA(b.name)),
    // showSorterTooltip: false,
  },
  {
    title: 'Email',
    key: 'email',
    width: '16vw',
    dataIndex: 'email',
  },
  {
    title: 'Username',
    key: 'username',
    width: '16vw',
    dataIndex: 'username',
  },
];
