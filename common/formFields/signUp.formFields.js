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
    key: 'username',
    rules: [{ required: true, message: 'Please enter Username!' }],
    kwargs: {
      placeholder: 'User Name',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'User Name',
  },
  {
    key: 'password',
    rules: [{ required: true, message: 'Please enter password!' }],
    kwargs: {
      placeholder: 'Password',
      type:'password'
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Password',
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
    key: 'email',
    rules: [
      {
        required: true,
        message: 'Please input your email!',
      },
      {
        type: 'email',
        message: 'Please enter a valid email',
      },
    ],
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
    rules: [{required: true, message: 'Please input your Phone No.!'}],
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
