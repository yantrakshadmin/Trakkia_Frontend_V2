import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Form, Col, Row, Button, Divider, Spin, Input } from 'antd';
import moment from 'moment';
import {
  allotmentFormFields,
  allotmentProductFormFields,
} from 'common/formFields/allotment.formFields';
import { useAPI } from 'common/hooks/api';
import { useHandleForm } from 'hooks/form';
import { createAllotment, editAllotment, retrieveAllotment } from 'common/api/auth';
import { navigate } from '@reach/router';
import _ from 'lodash';
import { f } from 'react-select/dist/index-4bd03571.esm';
import formItem from '../hocs/formItem.hoc';

const AllotmentForm = ({ location }) => {

  const [flows, setFlows] = useState([]);
  const [kits, setKits] = useState([]);
  const [form] = Form.useForm();

  const { companyId } = useSelector((s) => s.user.userMeta);

  const { data: flowFetched } = useAPI(`/mr-table-altform/?id=${location.state.id || ''}`);
  const { data: warehouses } = useAPI(`/company-warehouse/?id=${companyId}`);
  const { data: vendors } = useAPI(`/company-vendor/?id=${companyId}`);

  const onDone = () => {
    if(location.state.editId) navigate('./allotment-dockets/');
    else navigate('./material-request/');
  };

  const { submit, loading } = useHandleForm({
    create: createAllotment,
    edit: editAllotment,
    success: 'Allotment created/edited successfully.',
    failure: 'Error in creating/editing allotment.',
    done: onDone,
    close: () => null,
    id: location.state.editId
  });

  useEffect(() => {

    const fetchData = async (id) => {

      const {data} = await retrieveAllotment(id)
      console.log(data, 'data')
      data.dispatch_date = moment(data.dispatch_date)
      data.expected_delivery = moment(data.expected_delivery)
      form.setFieldsValue(data)
    }

    console.log(location)

    if(location.state.editId){
      fetchData(location.state.editId)
    }

  }, [location])

  useEffect(() => {
    const fetchFlows = async () => {
      if (location.state.id && flowFetched && flowFetched[0] && form) {
        const tempKits = [];
        const tempFlows = [];
        const reqFlows = ((flowFetched && flowFetched[0]?.flows) || []).map((item, idx) => {
          if(form && location.state.editId){
            let foundFlow = form.getFieldValue('flows').find(flow => flow.flow === item.flow.id)
            console.log(item, form.getFieldValue('flows').find(flow => flow.flow === item.flow.id))
            item.kit.products = (item.kit.products || []).map(product => {
              product.quantity = (foundFlow.items || []).find((item) => item.product === product.product.id).quantity
              return product
            })
            console.log(item.kit.products,"itemmss kitt");
          }
          tempFlows.push(item);
          tempKits.push(item.kit);
          return {
            flow: item.flow.id,
            kit: item.kit.id,
            asked_quantity: item.quantity,
            ...(location.state.editId && {alloted_quantity : form.getFieldValue('flows')[0].alloted_quantity})
          };
        });


        console.log(reqFlows, tempFlows)
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
  }, [location, flowFetched, form]);

  const preProcess = (data) => {
    data.flows = (data.flows || []).map((f,ind) => ({
      ...f,
      items: (flows[ind]?.kit.products || []).map((pro)=>({ product:pro.product.id, quantity:pro.quantity }))
    }));
    console.log(data,'this... ');
    submit(data);
  };

  const onChange = useCallback(
    (data) => {
      if(data[0].name[0] === 'flows' && data[0].name[2] === 'alloted_quantity'){
        const thisFlow = flows[data[0].name[1]];
        const thisFlowFromFetchedFlows = (flowFetched[0].flows||[]).filter(f => f.id === thisFlow.id)[0];
        if(thisFlowFromFetchedFlows){
          const tempFlows = [...flows]
          tempFlows[data[0].name[1]] = { ...thisFlow, 
            kit: { ...(thisFlow?.kit || {}), 
              products: (thisFlow?.kit.products||[]).map((p) => 
                ({ ...p, quantity: (thisFlowFromFetchedFlows.quantity || 0) * parseInt(data[0].value,10) })) } 
          }
          setFlows(tempFlows)
        }
      }
    },
    [form, kits],
  );



  const onProductQuantityChange = (e,flowIndex, productIndex) => {
    const tempFlows = [...flows]
    tempFlows[flowIndex] = { ...tempFlows[flowIndex], 
      kit: { ...(tempFlows[flowIndex]?.kit || {}), 
        products: (tempFlows[flowIndex]?.kit.products||[])
          .map((p,ind2) => (ind2 === productIndex ? 
            { ...p, quantity:e.target.value||'' }: p)) } 
    }
    setFlows(tempFlows)
  }

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Allotment Details</Divider>
      <Form 
        onFinish={preProcess} 
        form={form}
        layout='vertical'
        hideRequiredMark 
        autoComplete='off'
        onFieldsChange={onChange}>

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
            console.log(flows,flows[0]?.kit?.products)
            return (
              <div>
                {fields.map((field, index) => (
                  <Row>
                    {console.log(field)}
                    <Col span={4}>
                      <div className='p-2'>
                        {formItem({
                          ...allotmentProductFormFields[0],
                          noLabel: index != 0,
                          others: {
                            selectOptions: flows.map(flow => flow.flow) || [],
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
                          <Col span={12}>Short Code</Col>
                          <Col span={12}>Quantity</Col>
                        </Row>
                        {(flows[index]?.kit?.products|| []).map((i, proIndex) => 
                          (
                            <div className='py-2'>
                              <Input.Group compact>
                                <Input
                                  style={{ width: '50%' }}
                                  value={i.product?.short_code||''}
                                  disabled
                                  />
                                <Input
                                  style={{ width: '50%' }}
                                  value={i.quantity||0}
                                  type='number'
                                  onChange={(ev) => onProductQuantityChange(ev,index, proIndex)}
                                    />
                              </Input.Group>
                            </div>
                          ))}
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
