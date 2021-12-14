import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Select} from 'antd';
import {employeeFormFields} from 'common/formFields/employeeProfile.formFields';
import {useHandleForm} from 'hooks/form';
import {editCompanyProfile, editEmployeeProfile, retrieveEmployeeProfile} from 'common/api/auth';
import formItem from '../../hocs/formItem.hoc';
import { useAPI } from 'common/hooks/api';
import { loadAPI } from 'common/helpers/api';
import { useSelector } from 'react-redux';

const { Option } = Select

export const EditUserForm = ({id, onCancel, onDone}) => {

  const {companyType} = useSelector((state) => state.user.userMeta);

  const [formData, setFormData] = Form.useForm();
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
    if(userData) userData.type = userData.type.map(d => d.emp_type)
    formData.setFieldsValue(userData)
  }, [userData])

  const handleFieldsChange = (data) => {};

  const preProcess = (data) => {

    data.type = data.type.map(type => ({emp_type: type}))

    submit(data);

  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">User Details</Divider>
      <Form
        onFinish={preProcess}
        form={formData}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {employeeFormFields.slice(0,4).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {employeeFormFields.slice(4,5).map((item, idx) => (
            <Col span={16}>
              <div key={idx} className="p-2">
                {formItem({...item,
                  others: {
                    selectOptions: companyType.map((type => ({ value:type,label:type })))
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
