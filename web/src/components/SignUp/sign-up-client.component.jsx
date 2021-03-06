import React, {useEffect} from 'react';
import {Button, Form, Card, Typography, Divider, Checkbox, Input} from 'antd';
import {connect} from 'react-redux';
import {signUpClientStartAsync} from 'common/actions/signUp';
import {redirectTo} from '@reach/router';


const {Text} = Typography;

const SignUp = ({user, signUpClientStartAsync}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user.first_name) redirectTo('/');
  }, [user]);

  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 9,
      span: 14,
    },
  };

  const onFinish = ({email, username, password, firstname: first_name, lastname: last_name}) => {
    // console.log('Success:', values);
    signUpClientStartAsync({username, email, password, first_name, last_name});
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="">
        <Typography>
          <Text strong style={{fontSize: '25px'}}>
            Register as a Client
          </Text>
        </Typography>
          <Divider />
          <Form
            className="signin"
            form={form}
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            hideRequiredMark
            onFinishFailed={onFinishFailed}>
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: 'Please input your First Name!',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: 'Please input your Last Name!',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
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
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({getFieldValue}) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {user: state.user.userMeta};
};

export default connect(mapStateToProps, {signUpClientStartAsync})(SignUp);
