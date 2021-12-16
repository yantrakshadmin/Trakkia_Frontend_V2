import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const clientFormFields = [
  {
    key: 'name',
    rules: [{required: true, message: 'Please enter name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Name',
  },
  {
    key: 'email',
    rules: [{required: true, message: 'Please enter email!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Email Address',
  },
  {
    key: 'phone',
    rules: [{required: true, message: 'Please enter phone!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Phone No.',
  },
  {
    key: 'address',
    rules: [{required: true, message: 'Please enter Address!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Address',
  },
  {
    key: 'type',
    rules: [{ required: true, message: 'Select Type!' }],
    kwargs: {
      placeholder: 'Select',
      mode:'multiple',

    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: [{ value:'Pool Operator',label:'Pool Operator' },
        { value:'Consignor',label:'Consignor' },
        { value:'Consignee',label:'Consignee' }]
      ,
      style: { width: '100%' },
    },
    customLabel: 'Type',
  },
  {
    key: 'gstin',
    rules: [{ required: true, message: 'Please select GST IN!' }],
    kwargs: {
      placeholder: 'GST IN',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'GST IN',
  },
];

// export const mailingListFormFields = [
//   {
//     key: 'mailing_list',
//     kwargs: {
//       placeholder: 'Mailing List',
//     },
//     type: FORM_ELEMENT_TYPES.INPUT,
//     customLabel: 'Mailing List',
//   },
// ];

export const employeeFormFields = [
  {
    key: 'name',
    rules: [{required: true, message: 'Please enter name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Name',
  },
  {
    key: 'email',
    rules: [{required: true, message: 'Please enter email!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Email Address',
  },
  {
    key: 'phone',
    rules: [{required: true, message: 'Please enter phone!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Phone No.',
  },
  {
    key: 'city',
    rules: [{required: true, message: 'Please enter City!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'City',
  },
  {
    key: 'role',
    rules: [{ required: true, message: 'Select Role!' }],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      style: { width: '100%' },
      selectOptions: [
        'View',
        'CRUD'
      ],
    },
    customLabel: 'Role',
  },
  {
    key: 'type',
    rules: [{ required: true, message: 'Select Type!' }],
    kwargs: {
      placeholder: 'Select',
      mode:'multiple',

    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      style: { width: '100%' },
    },
    customLabel: 'Type',
  },
  {
    key: 'warehouse',
    rules: [{ required: true, message: 'Please select WareHouse!' }],
    kwargs: {
      placeholder: 'Select',
      mode:'multiple',
      showSearch: true,
      filterOption: (input, option) =>
        option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Warehouses',
    colSpan: 12,
  },
  {
    key: 'clients',
    rules: [{ required: true, message: 'Please select client!' }],
    kwargs: {
      placeholder: 'Select',
      mode:'multiple',
      showSearch: true,
      filterOption: (input, option) =>
        option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Clients',
    colSpan: 12,
  },
];

export const userPoolOperatorChoices = {
  'Sales': 'sales',
  'Masters': 'masters',
  'Volume Plan': 'volume_plan',
  'Material Request': 'material_request',
  'Allotment Dockets': 'allotment_docket',
  'Return Dockets': 'return_docket',
  'Relocation Dockets': 'relocation_docket',
  'Outwards Dockets': 'outward_docket',
  'GRN': 'grn',
  'Inventory': 'inventory',
  'Expense': 'expense',
};

export const userConsignorChoices = {
  'Masters': 'masters',
  'Volume Plan': 'volume_plan',
  'Material Request': 'material_request',
  'Return Dockets': 'return_docket',
  'Outwards Dockets': 'outward_docket',
  'GRN': 'grn',
  'Inventory': 'inventory',
};

export const userConsigneeChoices = {
  'Return Dockets': 'return_docket',
  'Outwards Dockets': 'outward_docket',
  'Inventory': 'inventory',
};