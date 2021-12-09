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
