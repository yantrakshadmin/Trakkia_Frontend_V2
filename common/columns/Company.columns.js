import {ifNotStrReturnA} from '../helpers/mrHelper';

export default [
  {
    title: 'Company Name',
    key: 'name',
    width: '12vw',
    dataIndex: 'name',
    sorter: (a, b) => ifNotStrReturnA(a.Company_name).localeCompare(ifNotStrReturnA(b.Company_name)),
    showSorterTooltip: false,
  },
  {
    title: 'Company Address',
    width: '20vw',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: 'Company GSTIN',
    key: 'gstin',
    dataIndex: 'gstin',
    width: '10vw',
    sorter: (a, b) =>
      ifNotStrReturnA(a.Company_shipping_city).localeCompare(
        ifNotStrReturnA(b.Company_shipping_city),
      ),
    showSorterTooltip: false,
  },
  {
    title: 'Company Phone',
    key: 'phone',
    dataIndex: 'phone',
    width: '10vw',
  },
  {
    title: 'Company Email',
    key: 'email',
    dataIndex: 'email',
    width: '20vw',
  },
  // {
  //   title: 'Company Contact Number',
  //   key: 'Company_contact_no',
  //   dataIndex: 'Company_contact_no',
  //   width: '12vw',
  // },
  // {
  //   title: 'Company Contact Person',
  //   key: 'Company_contact_person',
  //   dataIndex: 'Company_contact_person',
  //   width: '15vw',
  //   sorter: (a, b) =>
  //     ifNotStrReturnA(a.Company_contact_person).localeCompare(
  //       ifNotStrReturnA(b.Company_contact_person),
  //     ),
  //   showSorterTooltip: false,
  // },
  // {
  //   title: 'Company Billing Address',
  //   key: 'Company_billing_address',
  //   dataIndex: 'Company_billing_address',
  // },
  // {
  //   title: 'Company City',
  //   key: 'Company_city',
  //   dataIndex: 'Company_city',
  //   width: '8vw',
  //   sorter: (a, b) => ifNotStrReturnA(a.Company_city).localeCompare(ifNotStrReturnA(b.Company_city)),
  //   showSorterTooltip: false,
  // },
  // {
  //   title: 'Company Pincode',
  //   key: 'Company_pincode',
  //   dataIndex: 'Company_pincode',
  //   width: '7vw',
  // },
];