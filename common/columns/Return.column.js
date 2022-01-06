import moment from 'moment';

export default [
  {
    title: 'Delivery Status',
    key: 'is_delivered',
    render: (text, record) => {
      if (record.is_delivered) return 'Delivered';
      return 'Pending';
    },
  },
  {
    title: 'Transaction No.',
    key: 'transaction_no',
    dataIndex: 'transaction_no',
  },
  {
    title: 'Warehouse',
    key: 'warehouse',
    dataIndex: 'warehouse',
  },
  {
    title: 'Client',
    key: 'receiver_client',
    dataIndex: 'receiver_client',
  },
  {
    title: 'Transaction Date',
    key: 'transaction_date',
    sorter: (a, b) => moment(a.transaction_date).unix() - moment(b.transaction_date).unix(),
    render: (text, record) => {
      return moment(record.transaction_date).format('DD/MM/YYYY');
      // return moment(record.transaction_date).format('MMMM Do YYYY, h:mm:ss a');
    },
  },
  {
    title: 'Transport By',
    key: 'transport_by',
    dataIndex: 'transport_by',
  },
];
