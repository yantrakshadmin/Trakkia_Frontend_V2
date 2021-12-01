import {ifNotStrReturnA} from '../helpers/mrHelper';

export default [
  {
    title: 'Client Name',
    key: 'name',
    width: '12vw',
    dataIndex: 'name',
    sorter: (a, b) => ifNotStrReturnA(a.name).localeCompare(ifNotStrReturnA(b.name)),
    showSorterTooltip: false,
  },
  {
    title: 'Client Shipping Address',
    width: '20vw',
    key: 'address',
    dataIndex: 'address',
  },
  // {
  //   title: 'Client Shipping City',
  //   key: 'client_shipping_city',
  //   dataIndex: 'client_shipping_city',
  //   width: '10vw',
  //   sorter: (a, b) =>
  //     ifNotStrReturnA(a.client_shipping_city).localeCompare(
  //       ifNotStrReturnA(b.client_shipping_city),
  //     ),
  //   showSorterTooltip: false,
  // },
  // {
  //   title: 'Client Shipping Pincode',
  //   key: 'client_shipping_pincode',
  //   dataIndex: 'client_shipping_pincode',
  //   width: '10vw',
  // },
  {
    title: 'Client Email',
    key: 'email',
    dataIndex: 'email',
    width: '20vw',
  },
  {
    title: 'Client Contact Number',
    key: 'phone',
    dataIndex: 'phone',
    width: '12vw',
  },
  // {
  //   title: 'Client Contact Person',
  //   key: 'client_contact_person',
  //   dataIndex: 'client_contact_person',
  //   width: '15vw',
  //   sorter: (a, b) =>
  //     ifNotStrReturnA(a.client_contact_person).localeCompare(
  //       ifNotStrReturnA(b.client_contact_person),
  //     ),
  //   showSorterTooltip: false,
  // },
  // {
  //   title: 'Client Billing Address',
  //   key: 'client_billing_address',
  //   dataIndex: 'client_billing_address',
  // },
  // {
  //   title: 'Client City',
  //   key: 'client_city',
  //   dataIndex: 'client_city',
  //   width: '8vw',
  //   sorter: (a, b) => ifNotStrReturnA(a.client_city).localeCompare(ifNotStrReturnA(b.client_city)),
  //   showSorterTooltip: false,
  // },
  // {
  //   title: 'Client Pincode',
  //   key: 'client_pincode',
  //   dataIndex: 'client_pincode',
  //   width: '7vw',
  // },
];
