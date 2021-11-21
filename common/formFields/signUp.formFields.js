import { FORM_ELEMENT_TYPES } from '../../web/src/constants/formFields.constant';

export const signUpFormFields = [
  {
    key: 'name',
    rules: [{ required: true, message: 'Please enter Name!' }],
    kwargs: {
      placeholder: 'Name',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Name',
  },
  {
    key: 'type',
    rules: [{ required: true, message: 'Select Type!' }],
    kwargs: {
      placeholder: 'Select',
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
    key: 'email',
    // rules: [{required: true, message: 'Please upload bill!'}],
    kwargs: {
      type:'email',
      placeholder: 'Email',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
    },
    customLabel: 'Email',
  },
  {
    key: 'phone',
    // rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Phone',
    },
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    customLabel: 'Phone',
    others: {
        style: { width: '100%' }
    },
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
  {
    key: 'address',
    kwargs: {
      placeholder: 'Address',
    },
    type: FORM_ELEMENT_TYPES.TEXTAREA,
    customLabel: 'Address',
  },
];
