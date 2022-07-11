import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Select, Card} from 'antd';
import {employeeFormFields} from 'common/formFields/employeeProfile.formFields';
import {useHandleForm} from 'hooks/form';
import {editCompanyProfile, editEmployeeProfile, retrieveEmployeeProfile} from 'common/api/auth';
import formItem from '../../hocs/formItem.hoc';
import { useAPI } from 'common/hooks/api';
import { loadAPI } from 'common/helpers/api';
import { useSelector } from 'react-redux';
import { getUniqueObject } from 'common/helpers/getUniqueValues';

const { Option } = Select

export const EditUserForm = ({id, onCancel, onDone}) => {

  const {companyType, companyId, viewType} = useSelector((state) => state.user.userMeta);

  const { data: warehouses } = useAPI(`/company-warehouse/?id=${companyId}`);
  const { data: sender_clients } = useAPI(`/senderclients/?company=${companyId}&view=${viewType}`, {});
  const { data: receiver_clients } = useAPI(`/receiverclients/?company=${companyId}&view=${viewType}`, {});

  const [form] = Form.useForm();
  const [clients, setClients] = useState([]);
  const {data: userData} = useAPI(`/emp-profile/${id}`)

  const {submit, loading} = useHandleForm({
    create: null,
    edit: editEmployeeProfile,
    success: 'Employee created/edited successfully.',
    failure: 'Error in creating/editing Employee.',
    done: onDone,
    close: onCancel,
    id,
  });

  useEffect(() => {
    
    if(sender_clients && receiver_clients){

      setClients(getUniqueObject([...sender_clients, ...receiver_clients], 'id'))

    }

  }, [sender_clients, receiver_clients])

  useEffect(() => {
    if(userData) {
      userData.type = userData.type.map(d => d.emp_type)
      userData.clients = userData.clients.map(d => d.pk)
      if(viewType === 'Pool Operator') userData.warehouse = userData.warehouse.map(d => d.pk)
    }
    form.setFieldsValue(userData)
  }, [userData])

  const handleFieldsChange = (data) => {};

  const preProcess = (data) => {

    data.type = data.type.map(type => ({emp_type: type}))
    data.clients = data.clients.map(item => ({pk: item}))
    if(viewType === 'Pool Operator') data.warehouse = data.warehouse.map(item => ({pk: item}))

    submit(data);

  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">User Details gg</Divider>
      <Form
        onFinish={preProcess}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {employeeFormFields.slice(0,5).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {employeeFormFields.slice(5,6).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem({...item,
                  others: {
                    selectOptions: companyType.map((type => ({ value:type,label:type })))
                  },
                })}
              </div>
            </Col>
          ))}
          {viewType === 'Pool Operator' && employeeFormFields.slice(6, 7).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  others: {
                    ...item.others,
                    selectOptions: warehouses || [],
                    key: 'id',
                    dataKeys: ['city'],
                    customTitle: 'name',
                  },
                })}
              </div>
            </Col>
          ))}
          {employeeFormFields.slice(7, 8).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  others: {
                    ...item.others,
                    selectOptions: clients || [],
                    key: 'id',
                    dataKeys: ['email'],
                    customTitle: 'name',
                  },
                })}
              </div>
            </Col>
          ))}
        </Row>

        <Row>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <div className="p-2" />
          <Button type="primary" onClick={onDone}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};
