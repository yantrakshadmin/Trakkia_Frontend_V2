import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Select, Card} from 'antd';
import {employeeFormFields} from 'common/formFields/employeeProfile.formFields';
import {useHandleForm} from 'hooks/form';
import {editEmployeeProfile} from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';
import { useAPI } from 'common/hooks/api';
import _ from 'lodash';

const EmployeeForm = ({id, onCancel, onDone}) => {

  const [formData] = Form.useForm();
  const retrieveURL = 'emp-profile'
  const {data: userData} = useAPI(`/${retrieveURL}/${id}`)

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
    formData.setFieldsValue(userData)
  }, [userData])

  const handleFieldsChange = (data) => {};

  const preProcess = (data) => {

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
        </Row>

        <br />

        {/* <Row style={{justifyContent: 'left'}}>
          {clientFormFields.slice(5, 8).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {clientFormFields.slice(8, 12).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {clientFormFields.slice(12, 16).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {clientFormFields.slice(16, 20).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {clientFormFields.slice(21, 22).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row align="center">
          {formItem({
            ...clientFormFields[20],
            kwargs: {
              onChange(info) {
                const {status} = info.file;
                if (status !== 'uploading') {
                  console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                  setFile(info.file);
                  message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              },
            },
          })}
        </Row> */}

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

export default EmployeeForm;
