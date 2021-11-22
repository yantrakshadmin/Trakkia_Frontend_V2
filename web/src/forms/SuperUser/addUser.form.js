import React  from 'react';
import { Form, Col, Row, Button, Divider, Spin,Input  } from 'antd';
import { useHandleForm } from 'hooks/form';
import { createUser, editUser, retrieveUser } from 'common/api/auth';

export const AddUserForm = ({ id, onCancel, onDone, companyId }) => {
  //   const [reqFile, setFile] = useState(null);

  const { form, submit, loading } = useHandleForm({
    create: (data)=> createUser({ ...data, company:companyId, groups:[], user_permissions : [] }),
    edit: (data)=> editUser(id, { ...data, company:companyId, groups:[], user_permissions : [] }),
    retrieve: retrieveUser,
    success: 'User created/edited successfully.',
    failure: 'Error in creating/editing user.',
    done: onDone,
    close: onCancel,
    id,
  });

  //   const preProcess = (data) => {
  //     if (reqFile) {
  //       data.annexure = reqFile.originFileObj;
  //     } else delete data['annexure'];
  //     const req = new FormData();
  //     for (var key in data) {
  //       req.append(key.toString(), data[key]);
  //     }
  //     submit(req);
  //   };

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>User Details</Divider>
      <Form
        onFinish={submit}
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
