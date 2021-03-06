import React, {useState} from 'react';
import {Form, Button, Input, Checkbox, notification, Row, Col} from 'antd';
import {ACCESS_TOKEN, REFRESH_TOKEN} from 'common/constants/storage';
import {getJWTTokens} from 'common/api/auth';
import {getUserMeta} from 'common/helpers/auth';
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {Link, navigate} from '@reach/router';

import './sign-in.styles.scss';

const SignIn = ({user}) => {
  const dispatch = useDispatch();
  const [signIn, setSignIn] = useState(false);
  console.log(user, "sign in user");

  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 9,
      span: 14,
    },
  };

  const onFinish = async ({username, password}) => {
    try {
      // setLoading(true);
      const {data: tokens} = await getJWTTokens({username, password});

      const {access, refresh} = tokens;
      await window.storage.set(ACCESS_TOKEN, access);
      await window.storage.set(REFRESH_TOKEN, refresh);

      console.log(access);
      await getUserMeta(dispatch);
    } catch (e) {
      notification.error({
        message: `Can't Sign In user: ${username} - Invalid Credentials.`,
      });
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onSignIn = () => {
    setSignIn(true);
  };

  if (signIn) {
    return (
      <div className="sign-in">
        <Form
          form={form}
          {...layout}
          name="basic"
          hideRequiredMark
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
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
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
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
        <Row align="middle" justify="center">
            <Col span={8}>
            <Button type="link" onClick={() => {navigate('/forgot-password');}}>
              Forgot Password?
            </Button>
            </Col>
        </Row>
      </div>
    );
  }
  return (
    <div className="intro">
      <h1>Welcome to the world of organized returnable transport items management</h1>
      <br />
      <div className="content">
        TRAKKIA helps you track and manage returnable transport items in Industrial/Manufacturing supply chains efficiently and effectively. Use Trakkia to reduce asset loss and optimise asset utilisation to boost profitability.
      </div>
      <br /> <br />
      <Button size="middle" type="primary" onClick={() => onSignIn()}>
        Sign In
      </Button>
      <br/>
      <Button style={{marginTop: "20px"}} size="middle" type="primary">
        <Link to='/sign-up/' >Create Company</Link>
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {user: state.user.userMeta};
};

export default connect(mapStateToProps)(SignIn);
