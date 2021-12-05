import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Col, Row, Button, Divider, Spin, Input } from 'antd';
import moment from 'moment';
import {
  allotmentFormFields,
  allotmentProductFormFields,
} from 'common/formFields/allotment.formFields';
import { useAPI } from 'common/hooks/api';
import { useHandleForm } from 'hooks/form';
import { createAllotment } from 'common/api/auth';
import { navigate } from '@reach/router';
import formItem from '../hocs/formItem.hoc';

const AllotmentForm = ({ location }) => {
  const [flows, setFlows] = useState([]);
  const [kits, setKits] = useState([]);
  const [flowProducts, setFlowProduct] = useState({});
  const { user, page } = useSelector((s) => s);
  const { userMeta } = user;
  const { companyId } = userMeta;

  const { data: flowFetched } = useAPI(`/mr-table-altform/?id=${location.state.id || ''}`, {}, false, false);
  const { data: warehouses } = useAPI(`/company-warehouse/?id=${companyId}`, {}, false, false);
  const { data: vendors } = useAPI(`/company-vendor/?id=${companyId}`, {}, false, false);
  const { data: products } = useAPI(`/company-products/?id=${companyId}`, {}, false, false);

  const onDone = () => {
    navigate('./material-request/');
  };

  const { form, submit, loading } = useHandleForm({
    create: createAllotment,
    success: 'Allotment created/edited successfully.',
    failure: 'Error in creating/editing allotment.',
    done: onDone,
    close: () => null,
  });

  useEffect(() => {
    const fetchFlows = async () => {
      if (location.state.id && flowFetched && flowFetched[0] && form) {
        const tempKits = [];
        const tempFlows = [];
        const reqFlows = ((flowFetched && flowFetched[0]?.flows) || []).map(item => {
          tempFlows.push(item.flow);
          tempKits.push(item.kit);
          return {
            flow: item.id,
            kit: item.kit.id,
            asked_quantity: item.quantity,
          };
        });
        const finalFlows = {
          flows: reqFlows,
        };
        setFlows(tempFlows);
        setKits(tempKits);
        form.setFieldsValue({
          ...finalFlows,
          model: 'Rent',
          vehicle_type: 'Part Load',
          sales_order: location.state.id,
          dispatch_date: moment(flowFetched[0].delivery_required_on),
          expected_delivery: moment(flowFetched[0].delivery_required_on),
        });
      }
    };
    fetchFlows();
  }, [location.state.id, flowFetched, form]);

  const preProcess = (data) => {
    submit(data);
  };

  const findById = (id, arr) =>{
    console.log(id, arr,kits,'---')
    return (arr||[]).filter(item => (item.id === id))[0]

  }

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Allotment Details</Divider>
      <Form onFinish={preProcess} form={form} layout='vertical' hideRequiredMark autoComplete='off'>
        <Row style={{ justifyContent: 'left' }}>
          {allotmentFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {allotmentFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col span={6}>
            <div key={9} className='p-2'>
              {formItem({
                ...allotmentFormFields[8],
                others: {
                  selectOptions: warehouses || [],
                  key: 'id',
                  customTitle: 'name',
                  dataKeys: ['address', 'email'],
                },
              })}
            </div>
          </Col>
          <Col span={6}>
            <div className='p-2'>
              {formItem({
                ...allotmentFormFields[9],
                others: {
                  selectOptions: vendors
                    ? vendors.filter((vendor) => vendor.type === 'Transporter')
                    : [],
                  key: 'id',
                  customTitle: 'name',
                  dataKeys: ['city', 'pincode'],
                },
              })}
            </div>
          </Col>
          <Col span={6}>
            <div key={10} className='p-2'>
              {formItem(allotmentFormFields[10])}
            </div>
          </Col>
        </Row>
        <Row>
          {allotmentFormFields.slice(11, 13).map((item, idx) => (
            <Col span={4}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation='left'>Kit Details</Divider>

        <Form.List name='flows'>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row>
                    <Col span={4}>
                      <div className='p-2'>
                        {formItem({
                          ...allotmentProductFormFields[0],
                          noLabel: index != 0,
                          others: {
                            selectOptions: flows || [],
                            customTitle: 'flow_name',
                            key: 'id',
                            formOptions: {
                              ...field,
                              name: [field.name, 'flow'],
                              fieldKey: [field.fieldKey, 'flow'],
                            },
                          },
                        })}
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className='p-2'>
                        {formItem({
                          ...allotmentProductFormFields[1],
                          noLabel: index != 0,
                          others: {
                            selectOptions: kits || [],
                            customTitle: 'kit_name',
                            key: 'id',
                            formOptions: {
                              ...field,
                              name: [field.name, 'kit'],
                              fieldKey: [field.fieldKey, 'kit'],
                            },
                          },
                        })}
                      </div>
                    </Col>
                    {allotmentProductFormFields.slice(2, 4).map((item, idx) => (
                      <Col span={3}>
                        <div key={idx} className='p-2'>
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
                    <Col span={10}>
                    <div className='p-2'>
                        <Row>
                          <Col span={12}>Product</Col>
                          <Col span={12}>Short Code</Col>
                        </Row>
                        {(kits[index]?.products || []).map((i, idx) => {
                          console.group(i, i.product,'group')
                          return (
                            <div className={'py-2'}>
                              <Input.Group compact>
                                <Input
                                  style={{ width: '50%' }}
                                  value={i.product?.name||''}
                                  disabled
                                />
                                <Input
                                  style={{ width: '50%' }}
                                  value={i.product?.short_code||''}
                                  disabled
                            />
                              </Input.Group>
                            </div>
                          );
                        })}
                        </div>
                    </Col>
                  </Row>
                ))}
              </div>
            );
          }}
        </Form.List>
        <Row>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
          <div className='p-2' />
          <Button type='primary' onClick={onDone}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default AllotmentForm;
