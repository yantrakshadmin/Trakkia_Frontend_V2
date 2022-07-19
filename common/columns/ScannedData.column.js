import moment from 'moment';

export default [
  {
    title: 'Date',
    key: 'date',
    sorter: (a, b) => moment(a.dispatch_date).unix() - moment(b.dispatch_date).unix(),
    render: (text, record) => {
      return moment(record.date).format('DD/MM/YYYY');
    },
  },
  {
    title: 'Warehouse',
    key: 'warehouse',
    render: (text, record) => {
      return record.warehouse;
    },
  },
];
