import moment from 'moment';

export default [
  {
    title: 'Warehouse',
    key: 'warehouse',
    render: (text, record) => {
      return record.warehouse;
    },
  },
  {
    title: 'Date',
    key: 'date',
    sorter: (a, b) => moment(a.dispatch_date).unix() - moment(b.dispatch_date).unix(),
    render: (text, record) => {
      return moment(record.date).format('DD/MM/YYYY');
    },
  },
  {
    title: 'Reference Number',
    key: 'reference_number',
    // sorter: (a, b) => moment(a.dispatch_date).unix() - moment(b.dispatch_date).unix(),
    render: (text, record) => {
      return record.reference_number
    },
  },
];
