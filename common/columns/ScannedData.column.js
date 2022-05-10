import moment from 'moment';

export default [
    // {
    //   title: 'Owner',
    //   key: 'owner',
    //   dataIndex: 'owner',
    // },
    // {
    //   title: 'Material Request ID',
    //   key: 'material_request_id',
    //   dataIndex: 'material_request_id',
    // },
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
   
    // {
    //     title: 'Transaction No.',
    //     key: 'transaction_no',
    //     dataIndex: 'transaction_no',
    // },
    // {
    //     title: 'Dispatch Date',
    //     key: 'dispatch_date',
    //     sorter: (a, b) => moment(a.dispatch_date).unix() - moment(b.dispatch_date).unix(),
    //     render: (text, record) => {
    //         return moment(record.dispatch_date).format('DD/MM/YYYY');
    //     },
    // },
    // {
    //     title: 'Warehouse',
    //     key: 'warehouse_name',
    //     dataIndex: 'warehouse_name',
    // },
    // {
    //   title: 'Vehicle Number',
    //   key: 'vehicle_number',
    //   dataIndex: 'vehicle_number',
    // },
    // {
    //   title: 'Vehicle Type',
    //   key: 'vehicle_type',
    //   dataIndex: 'vehicle_type',
    // },
    // {
    //   title: 'Transporter Name',
    //   key: 'transport_by',
    //   dataIndex: 'transport_by',
    // },
];
