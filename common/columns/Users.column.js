// import {ifNotStrReturnA} from '../helpers/mrHelper';

export default [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    width: '8vw',
    // sorter: (a, b) => ifNotStrReturnA(a.name).localeCompare(ifNotStrReturnA(b.name)),
    // showSorterTooltip: false,
  },
  {
    title: 'Email',
    key: 'email',
    width: '8vw',
    dataIndex: 'email',
  },
  {
    title: 'Phone',
    key: 'phone',
    width: '8vw',
    dataIndex: 'phone',
  },
  {
    title: 'City',
    key: 'city',
    width: '8vw',
    dataIndex: 'city',
  },
  {
    title: 'Role',
    key: 'role',
    width: '8vw',
    dataIndex: 'role',
  },
];
