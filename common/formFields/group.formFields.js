import { FORM_ELEMENT_TYPES } from '../../web/src/constants/formFields.constant';

export const groupModelChoices = [
  'Demand',
  'Material Request',
  'Allotment',
  'Delivered',
  'Return',
  'Received',
  'Outward',
  'Inward',
  'Expense',
  'GRN',
  'Inventory',
  'Inventory Ledger',
  'Inventory Adjustments - Warehouse',
  'Sender Client Inventory',
  'Sender Client Inventory Ledger',
  'Sender Client Inventory Adjustments',
  'Receiver Client Inventory',
  'Receiver Client Inventory Ledger',
  'Receiver Client Inventory Adjustments',
  'Product',
  'Kit',
  'Flow',
  'Vendor',
  'Warehouse',
  'Receiver Client',
  'Leads',
  'PFEP',
  'Commercial Proposal',
];

export const groupModelChoicesGrouped = {
  Demand: ['Demand'],
  Expense: ['Expense'],
  GRN: ['GRN'],
  Leads: ['Leads'],
  PFEP: ['PFEP'],
  'Commercial Proposal': ['Commercial Proposal'],
  'Technical Proposal': ['Technical Proposal'],
  Allotment: ['Material Request', 'Allotment', 'Delivered'],
  Return: ['Return', 'Received'],
  Outward: ['Outward', 'Inward'],
  Relocation: ['Relocation'],
  'Purchase Order': ['Purchase Order'],
  'Warehouse Inventory': ['Inventory', 'Inventory Ledger', 'Inventory Adjustments - Warehouse'],
  'Sender Inventory': [
    'Sender Client Inventory',
    'Sender Client Inventory Ledger',
    'Sender Client Inventory Adjustments',
  ],
  'Receiver Inventory': [
    'Receiver Client Inventory',
    'Receiver Client Inventory Ledger',
    'Receiver Client Inventory Adjustments',
  ],
  Masters: ['Product', 'Kit', 'Flow', 'Vendor'],
};

export const groupFormFields = [
  {
    key: 'name',
    rules: [{ required: true, message: 'Please enter Group Name!' }],
    kwargs: {
      placeholder: 'Name',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Group Name',
    colSpan: 6,
  },
  {
    key: 'employees',
    rules: [{ required: true, message: 'Please select emp!' }],
    kwargs: {
      placeholder: 'Select',
      mode:'multiple',
      showSearch: true,
      filterOption: (input, option) =>
        option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Employee',
    colSpan: 6,
  },
  {
    key: 'description',
    rules: [{ required: true, message: 'Please enter Group Description!' }],
    kwargs: {
      placeholder: 'Description',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Group Description',
    colSpan: 12,
  },
  {
    // key: 'solution_palletized_box',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue: false,
      formOptions: { noStyle: true },
    },
    customLabel: 'Palletized Box Solution',
    colSpan: 4,
  },
];
