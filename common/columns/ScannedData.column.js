import moment from 'moment';

export default [
  {
    title: 'Reference Number',
    key: 'reference_number',
    // sorter: (a, b) => moment(a.dispatch_date).unix() - moment(b.dispatch_date).unix(),
    render: (text, record) => {
      return record.reference_number
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
    title: 'Time',
    key: 'time',
    
    render: (text, record) => {
      return moment(record.date).format("hh:mm a")
    },
  },
  {
    title: 'Warehouse',
    key: 'warehouse',
    render: (text, record) => {
      return record.warehouse;
    },
  },
  {
    title: 'User',
    key: 'owner',
    render: (text, record) => {
      return record.owner;
    },
  },
 
];
