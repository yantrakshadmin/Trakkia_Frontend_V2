import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

const transactionTypeOptions = ['Allotment', 'Return', 'GRN', 'Delivered', 'Received', 'Relocation'];
const criticalityOptions = ['Normal', 'Urgent', 'Critical'];
const statusOptions = ['Hold', 'assigned', 'unassigned', 'Resolved'];

export const ticketFormFields = [
  {
    key: 'invoice_date',
    rules: [{required: true, message: 'Please select invoice date!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
    customLabel: 'Invoice Date',
    colSpan: 6,
  },
  {
    key: 'remarks',
    rules: [{required: true, message: 'Please enter Remarks!'}],
    kwargs: {
      placeholder: 'remarks',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'remarks',
    colSpan: 6,
  },
  {
    key: 'assigned_to',
    rules: [{required: true, message: 'Please select User!'}],
    kwargs: {
      placeholder: 'Select',
      showSearch: true,
      filterOption: (input, option) =>
        option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Assigned To',
    colSpan: 6,
  },
  {
    key: 'status',
    rules: [{required: true, message: 'Please select status!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: statusOptions},
    customLabel: 'Status',
    colSpan: 6,
  },
  {
    key: 'criticality',
    rules: [{required: true, message: 'Please select Criticality!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: criticalityOptions},
    customLabel: 'Criticality',
    colSpan: 6,
  },
  {
    key: 'transaction_type',
    rules: [{required: true, message: 'Please select Transaction Type!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: transactionTypeOptions},
    customLabel: 'Transaction Type',
    colSpan: 6,
  },
];

export const ticketFlowFormFields = [
  {
    key: 'transaction_type',
    rules: [{required: true, message: 'Please select transaction type!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: transactionTypeOptions},
    customLabel: 'Transaction Type',
    colSpan: 3,
  },
  {
    key: 'item',
    rules: [{required: true, message: 'Please select transaction!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Transaction Number',
    colSpan: 3,
  },
  {
    key: 'item_quantity',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Quantity',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity',
    colSpan: 3,
  },
];
