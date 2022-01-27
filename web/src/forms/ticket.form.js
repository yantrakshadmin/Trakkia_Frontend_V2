import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Form, Col, Row, Button, Divider, Spin, message, Alert } from 'antd';
import { ticketFormFields, ticketFlowFormFields } from 'common/formFields/ticket.formFields';
import { useAPI } from 'common/hooks/api';
import { useHandleForm } from 'hooks/form';
import { createDEPS, createExpense, editExpenseTest, retrieveAllotmentsDockets, retrieveExpense } from 'common/api/auth';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { ifNanReturnZero , filterActive } from 'common/helpers/mrHelper';
import { getUniqueObject } from 'common/helpers/getUniqueValues';

import moment from 'moment';

import _ from 'lodash';

import formItem from '../hocs/formItem.hoc';
import { useControlledSelect } from '../hooks/useControlledSelect';

export const TicketForm = ({ id, onCancel, onDone, isEmployee }) => {
  const [ticketData, setTicketData] = useState([]);
  const [transactionType, setTransactionType] = useState([]);
  const [title, setTitle] = useState('id');
  const [dataKeys, setDataKeys] = useState([]);

  // const {data: flows} = useAPI('/myflows/', {});
  // const {data: kits} = useControlledSelect(flowId);


  const {user} = useSelector((s) => s);
  const {userMeta} = user;
  const {companyId} = userMeta;


  const { data: users } = useAPI(`/company-list`);
  const { data: allotExp } = useAPI(`/allot-exp/?id=${companyId}`);
  const { data: grnExp } = useAPI(`/grn-exp/?id=${companyId}`);
  const { data: returnExp } = useAPI(`/return-exp/?id=${companyId}`);

  const [refreshTransactionNumber,setRefreshTransactionNumber] = useState(0)
  const { form, submit, loading } = useHandleForm({
    create: createDEPS,
    edit: editExpenseTest,
    retrieve: retrieveExpense,
    success: 'Ticket created/edited successfully',
    failure: 'Error in creating/editing Ticket.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['invoice_date'],
  });


  useEffect(() => {
    console.log(allotExp, 'allot')
    const setData = async () => {

      const {data: products} = await retrieveAllotmentsDockets(4)
      setTicketData(getUniqueObject(
        products.flows.map((flow) => flow.items.map((item) => item.product)),
        'id',
      )[0])

    }
    if(transactionType == 'Allotment' && allotExp) {
      setTitle('name')
      setDataKeys(['short_code'])
      setData()
      
    }
    if(transactionType == 'Return' && returnExp) {
      setTitle('transaction_no')
      setDataKeys(['transaction_date'])
      setTicketData(returnExp)
    }
    if(transactionType == 'GRN' && grnExp) {
      setTitle('invoice_no')
      setDataKeys(['inward_date'])
      setTicketData(grnExp)
    }
  }, [transactionType])

  useEffect(() => {
    if (id && !loading) {
      const transactions = form.getFieldValue('transactions');
      const newT = transactions.map((t) => ({
        ...t,
        t_no: t.a_t_no || t.r_t_no || t.g_t_no,
      }));
      form.setFieldsValue({ transactions: newT });
    }
  }, [loading]);

  const renderAlert = useCallback(() => {
    if (id && !loading) {
      return (
        <Alert message='Your previous bill documents will be replaced!' type='warning' closable />
      );
    }
  }, [loading]);

  const toFormData = useCallback((data) => {
    const req = new FormData();
    for (const key in data) {
      if (key === 'transactions') {
        req.append('items', JSON.stringify(data.transactions));
      } else if (key === 'invoice_date') {
        req.append(key.toString(), data[key].format());
      } else if (key === 'bill') {
      } else {
        req.append(key.toString(), data[key]);
      }
    }
    return req;
  }, []);

  const preProcess = (data) => {

    const finalData = toFormData(data)
    submit(finalData);

  };

  const getTranastionSelectOptions = useCallback((index) => {
    const transactions = form.getFieldValue('transactions');
    const tt = transactions[index]?.transaction_type;
    if (tt === 'Allot') {
      if (allotExp)
        return allotExp.map((i) => ({ ...i, dispatch_date: moment(i.dispatch_date).format('L') }));
    } else if (tt === 'Return') {
      if (returnExp)
        return returnExp.map((i) => ({
          ...i,
          transaction_date: moment(i.transaction_date).format('L'),
        }));
    } else if(tt === 'GRN'){
      if (grnExp){return grnExp.map((i) => ({
        ...i,
        inward_date: moment(i.inward_date).format('L'),
      }));}
    }
    return [];
  }, [form, allotExp, returnExp, grnExp, refreshTransactionNumber]);

  const getDataKeys = useCallback((index) => {
    const transactions = form.getFieldValue('transactions');
    const tt = transactions[index]?.transaction_type;
    if (tt === 'Allot') {
      return ['dispatch_date'];
    }
    if (tt === 'Return') {
      return ['transaction_date'];
    }
    if(tt ==='GRN') {
       return ['inward_date']
    }


    return [];
  }, [form, refreshTransactionNumber]);

  const getCustomTitleKeys = useCallback((index) => {
    const transactions = form.getFieldValue('transactions');
    const tt = transactions[index]?.transaction_type;
    if (tt === 'Allot' || tt === 'Return' ) {
      return ['transaction_no'];
    }
    if(tt ==='GRN') {
       return ['invoice_no']
    }


    return [];
  }, [form, refreshTransactionNumber]);

  // const [ttTouched, setTTTouched] = useState(false);

  useEffect(() => {
    if (id && !loading) {
      try {
        const tr = form.getFieldValue('transactions');
        const newTr = tr.map((t) => {
          const s =
            ifNanReturnZero(t.f_mile) +
            ifNanReturnZero(t.long_haul) +
            ifNanReturnZero(t.l_mile) +
            ifNanReturnZero(t.labour) +
            ifNanReturnZero(t.others);
          return {
            ...t,
            total_cost: s,
          };
        });
        form.setFieldsValue({ transactions: newTr });
      } catch (err) {}
    }
  }, [loading]);

  const handleFieldsChange = useCallback(
    (data) => {
      if (data[0]) {
        if (data[0].name) {
          const thisField = data[0].name[0];
          console.log(form.getFieldValue(thisField), thisField);
          setTransactionType(form.getFieldValue(thisField))
        }
      }
    },
    [],
  );

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Expense Details</Divider>
      {renderAlert()}
      <Form
        onFinish={preProcess}
        initialValues={{ status: 'Hold', gst: 0 }}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
        onFieldsChange={handleFieldsChange}>
        <Row style={{ justifyContent: 'left' }}>
          {ticketFormFields.slice(0, 2).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className='p-2'>
                {formItem({...item,})}
              </div>
            </Col>
          ))}
          {ticketFormFields.slice(2, 3).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className='p-2'>
                {formItem({
                  ...item,
                  others: {
                    selectOptions: users?.results || [],
                    key: 'id',
                    dataKeys: ['address'],
                    customTitle: 'name',
                  },
                })}
              </div>
            </Col>
          ))}
          {ticketFormFields.slice(3, 4).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className='p-2'>
                {formItem({
                  ...item,
                  others: {
                    selectOptions: allotExp || [],
                    key: 'id',
                    dataKeys: ['transaction_no'],
                    customTitle: 'despatch_date',
                  },
                })}
              </div>
            </Col>
          ))}
          {ticketFormFields.slice(4).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation='left'>Transaction Details</Divider>

        <Form.List name='transactions'>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align='middle'>
                    {/* {ticketFlowFormFields.slice(0, 1).map((item, idx) => (
                      <Col key={idx} span={item.colSpan}>
                        <div className='p-2'>
                          {formItem({ ...item,
                            noLabel: index != 0,
                            kwargs: {
                              ...item.kwargs,
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search
                                  ?.toString()
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0,
                            },
                            others: {
                              ...item.others,
                              key: 'id',
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                                getValueFromEvent:(r)=>{
                                  setRefreshTransactionNumber(prev => prev +1)
                                  return r
                                },
                              },
                            },
                          })}
                        </div>
                      </Col>
                    ))} */}
                    {ticketFlowFormFields.slice(1, 2).map((item, idx) => (
                      <Col key={idx} span={item.colSpan}>
                        <div className='p-2'>
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              ...item.kwargs,
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search
                                  ?.toString()
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0,
                            },
                            others: {
                              selectOptions: ticketData || [],
                              key: 'id',
                              customTitle: title,
                              dataKeys: dataKeys,
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                          })}
                        </div>
                      </Col>
                    ))}
                    {ticketFlowFormFields.slice(2,3).map((item, idx) => (
                      <Col key={idx} span={item.colSpan}>
                        <div className='p-2'>
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            others: {
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                          })}
                        </div>
                      </Col>
                    ))}
                    {ticketFlowFormFields.slice(3, 4).map((item, idx) => (
                      <Col key={idx} span={item.colSpan}>
                        <div className='p-2'>
                          {formItem({ ...item,
                            noLabel: index != 0,
                            others: {
                              ...item.others,
                              key: 'id',
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                          })}
                        </div>
                      </Col>
                    ))}
                    <Col span={1}>
                      <Button
                        // style={{ width: '9vw' }}
                        style={index != 0 ? { top: '-2vh' } : null}
                        type='danger'
                        onClick={() => {
                          remove(field.name);
                        }}>
                        <MinusCircleOutlined />
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type='dashed'
                    onClick={() => {
                      add();
                    }}
                    block
                    // disabled={!ttTouched}
                  >
                    <PlusOutlined />
                    {' '}
                    Add Item
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Row>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
          <div className='p-2' />
          <Button type='primary' onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

