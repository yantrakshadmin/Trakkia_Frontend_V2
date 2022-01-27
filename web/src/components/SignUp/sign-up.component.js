import React, { useEffect } from 'react';
import { Button, Form, Card, Typography, Divider,Col,Row, Input  } from 'antd';
import { connect } from 'react-redux';
import { signUpCompany } from 'common/actions/signUp';
import { navigate, redirectTo } from '@reach/router';
import { useHandleForm } from 'hooks/form';
import { signUpFormFields } from 'common/formFields/signUp.formFields'
import formItem from 'hocs/formItem.hoc';

import './sign-up.styles.scss';

const { Text } = Typography;

const SignUp = ({ user,signUpCompany:signUp }) => {

  const { form, submit } = useHandleForm({
    create: signUp,
    edit: ()=>{},
    retrieve: ()=>{},
    success: 'Vendor created/edited successfully.',
    failure: 'Error in creating/editing vendor.',
    done: ()=>{navigate('/');},
    close: ()=>{},
  });

  const preProcess = async (data) => {

    data.first_name = data.name.split(' ')[0]
    data.last_name = data.name.split(' ').slice(1,).join(' ')

    await submit(data)

  }
  
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
      span: 14,
      offset: 9,
    },
  };

  return (
    <div className='container'>
      <Card style={{ boxShadow: '2px 2px 2px grey', borderRadius: '5px' }}>
        <Typography>
          <Text strong style={{ fontSize: '25px' }}>
            Sign Up
          </Text>
          <Divider />
          <Form
            className='signin'
            form={form}
            {...layout}
            name='basic'
            initialValues={{
              remember: true,
            }}
            onFinish={preProcess}
            hideRequiredMark>
            <Row justify='start'>
              {
                signUpFormFields.slice(0,3).map((item,idx) => (
                  <Col span={24} key={idx.toString()}>
                    <div>
                      {formItem(item)}
                    </div>
                  </Col>
                ))
              }
              <Col span={24} key="8">
                <div>
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
                </div>
              </Col>
              {
                signUpFormFields.slice(3,7).map((item,idx) => (
                  <Col span={24} key={idx.toString()}>
                    <div>
                      {formItem(item)}
                    </div>
                  </Col>
                ))
              }
            </Row>
            <Form.Item {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Typography>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.userMeta };
};

export default connect(mapStateToProps, { signUpCompany })(SignUp);
