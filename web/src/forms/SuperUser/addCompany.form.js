import React, {useCallback}  from 'react';
import { Form, Col, Row, Button, Divider, Spin,Input, Select } from 'antd';
import { useHandleForm } from 'hooks/form';
import { createCompanyInt, editUser, retrieveUser } from 'common/api/auth';

const {Option} = Select

export const AddCompanyForm = ({ id, onCancel, onDone, companyId }) => {

  const { form, submit, loading } = useHandleForm({
    create: (data)=> createCompanyInt({ ...data }),
    edit: (data)=> editUser(id, { ...data, company:companyId, groups:[], user_permissions : [] }),
    retrieve: retrieveUser,
    success: 'Company created/edited successfully.',
    failure: 'Error in creating/editing company.',
    done: onDone,
    close: onCancel,
    id,
  });

  const preProcess = useCallback(
    (data) => {
      const { type } = data;
      const newType = type.map((t) => ({
        company_type: t,
      }));
      data.type = newType;
      submit(data);
    },
    [submit],
  );

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>User Details</Divider>
      <Form
        onFinish={preProcess}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
      >
        <Col>
          <Form.Item
            label='First Name'
            name='first_name'
            rules={[
              {
                required: true,
                message: 'Please input your First Name!',
              },
            ]}>
            <Input       
              placeholder='First Name'
/>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label='Last Name'
            name='last_name'
            rules={[
              {
                required: true,
                message: 'Please input your Last Name!',
              },
            ]}>
            <Input
              placeholder='Last Name'
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
            <Input 
        
              placeholder='Username'
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
            ]}>
            <Input
              placeholder='Email'
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label='type'
            name='type'
            rules={[
              {
                required: true,
                message: 'Please select Company type!',
              },
            ]}>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select company type"
                    defaultValue={['Pool Operator']}
                >
                    <Option key='Pool Operator'>Pool Operator</Option>
                    <Option key='Consignor'>Consignor</Option>
                    <Option key='Consignee'>Consignee</Option>
                </Select>
          </Form.Item>
        </Col>
        <Col>

          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback>
            <Input.Password 
              placeholder='Password'
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name='confirm'
            label='Confirm Password'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}>
            <Input.Password 
              placeholder='Confirm Password'
            />
          </Form.Item>
        </Col>
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
