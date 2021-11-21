import React, { useEffect } from 'react';
import { Button, Form, Card, Typography, Divider,Col,Row  } from 'antd';
import { connect } from 'react-redux';
import { signUpCompany } from 'common/actions/signUp';
import { redirectTo } from '@reach/router';
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
    done: ()=>{},
    close: ()=>{},
  });
  
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
            onFinish={submit}
            hideRequiredMark>
            <Row justify='start'>
              {
                signUpFormFields.map((item,idx) => (
                  <Col span={24} key={idx.toString()}>
                    <div className='p-2'>
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
