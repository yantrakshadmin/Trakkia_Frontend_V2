import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import { ticketFormFields, ticketFlowFormFields } from 'common/formFields/ticket.formFields';
import { useAPI } from 'common/hooks/api';
import { useHandleForm } from 'hooks/form';
import { createDEPS, editExpenseTest, retrieveAllotmentsDockets, retrieveDEPS, retrieveGRNs, retrieveReturnDocket } from 'common/api/auth';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { getUniqueObject } from 'common/helpers/getUniqueValues';

import _ from 'lodash';

import formItem from '../hocs/formItem.hoc';

export const TicketForm = ({ id, onCancel, onDone, isEmployee }) => {
  const [ticketData, setTicketData] = useState([]);
  const [transactionType, setTransactionType] = useState([]);
  const [transactionId, setTransactionId] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const [title, setTitle] = useState('id');
  const [dataKeys, setDataKeys] = useState([]);

  const {user} = useSelector((s) => s);
  const {userMeta} = user;
  const {companyId} = userMeta;


  const { data: users } = useAPI(`/company-list`);
  const { data: allotExp } = useAPI(`/allot-exp/?id=${companyId}`);
  const { data: grnExp } = useAPI(`/grn-exp/?id=${companyId}`);
  const { data: returnExp } = useAPI(`/return-exp/?id=${companyId}`);

  const { form, submit, loading } = useHandleForm({
    create: createDEPS,
    edit: editExpenseTest,
    retrieve: retrieveDEPS,
    success: 'Ticket created/edited successfully',
    failure: 'Error in creating/editing Ticket.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['invoice_date'],
  });


  useEffect(() => {

    const setData = async () => {

      if(transactionType == 'Allotment' && allotExp) {
        setTitle('transaction_no')
        setDataKeys(['dispatch_date'])
        setTransactionData(allotExp)
      } else if(transactionType == 'Return' && returnExp) {
        setTitle('transaction_no')
        setDataKeys(['transaction_date'])
        setTransactionData(returnExp)
      } else if(transactionType == 'GRN' && grnExp) {
        setTitle('invoice_no')
        setDataKeys(['inward_date'])
        setTransactionData(grnExp)
      }
      
    }

    setData()
    
  }, [transactionType])

  useEffect(() => {

    const setData = async () => {

      if(transactionType == 'Allotment' && allotExp) {
        const {data: products} = await retrieveAllotmentsDockets(transactionId)
        setTicketData(getUniqueObject(
          products.flows.map((flow) => flow.items.map((item) => item.product)),
          'id',
        )[0])
      } else if(transactionType == 'Return' && returnExp) {
        const {data: products} = await retrieveReturnDocket(transactionId)
        setTicketData(getUniqueObject(
          products.kits.map((kit) => kit.items.map((item) => item.product)),
          'id',
        )[0])
      } else if(transactionType == 'GRN' && grnExp) {
        const {data: products} = await retrieveGRNs()
        console.log(transactionId)
        setTicketData(getUniqueObject(
          products.filter(product => product.id == transactionId)[0].items.map((item) => item.item),
          'id',
        ))
        console.log(products.filter(product => product.id == transactionId), products.filter(product => product.id == transactionId)[0].items.map((item) => item.item))
        console.log(getUniqueObject(
          products.filter(product => product.id == transactionId)[0].items.map((item) => item.item),
          'id',
        ))
      }
      
    }

    setData()

  }, [transactionId])

  const preProcess = (data) => {

    if(transactionType == 'allotment'){
      data.a_t_no = data.t_no
    } else if(transactionType == 'Return') {
      data.r_t_no = data.t_no
    } else if(transactionType == 'GRN') {
      data.g_t_no = data.t_no
    }

    delete data.t_no
    submit(data);

  };

  const handleFieldsChange = useCallback(
    (data) => {
      if (data[0]) {
        if (data[0].name) {
          const thisField = data[0].name[0];
          console.log(form.getFieldValue(thisField), thisField);
          if(thisField == 'transaction_type') setTransactionType(form.getFieldValue(thisField))
          if(thisField == 't_no') setTransactionId(form.getFieldValue(thisField))
        }
      }
    },
    [],
  );

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Ticket Details</Divider>
      <Form
        onFinish={preProcess}
        initialValues={{ status: 'Hold', criticality: 'Normal' }}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
        onFieldsChange={handleFieldsChange}>
        <Row style={{ justifyContent: 'left' }}>
          {ticketFormFields.slice(0, 1).map((item, idx) => (
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
          {ticketFormFields.slice(1, 2).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
          {ticketFormFields.slice(2, 3).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className='p-2'>
                {formItem({
                  ...item,
                  others: {
                    selectOptions: transactionData || [],
                    key: 'id',
                    dataKeys: dataKeys,
                    customTitle: title,
                  },
                })}
              </div>
            </Col>
          ))}
          {ticketFormFields.slice(3).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation='left'>Transaction Details</Divider>

        <Form.List name='items'>
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
                              customTitle: 'name',
                              dataKeys: ['short_code'],
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

