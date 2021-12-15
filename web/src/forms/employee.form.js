import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Select, Card} from 'antd';
import {clientFormFields, userConsigneeChoices, userConsignorChoices, userPoolOperatorChoices} from 'common/formFields/employeeProfile.formFields';
import {useHandleForm} from 'hooks/form';
import {editCompanyProfile, editEmployeeProfile, retrieveEmployeeProfile} from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';
import { useAPI } from 'common/hooks/api';
import { loadAPI } from 'common/helpers/api';
import _ from 'lodash';
import { FORM_ELEMENT_TYPES } from 'constants/formFields.constant';

const { Option } = Select

const EmployeeForm = ({id, companyType, isAdmin, onCancel, onDone}) => {

  const [formData, setFormData] = Form.useForm();
  const retrieveURL = isAdmin ? 'company-profile' : 'emp-profile'
  const {data: userData} = useAPI(`/${retrieveURL}/${id}`)
  const [selectedModels, setSelectedModels] = useState([]);

  const {submit, loading} = useHandleForm({
    create: null,
    edit: isAdmin ? editCompanyProfile : editEmployeeProfile,
    success: 'Employee created/edited successfully.',
    failure: 'Error in creating/editing Employee.',
    done: onDone,
    close: onCancel,
    id,
  });

  useEffect(() => {
    if(userData) {
      userData.type = userData.type.map(d => d.company_type)

      var selectedModel = []

      _.keys(userPoolOperatorChoices).map((modelName) => {

        if(userData[userPoolOperatorChoices[modelName]]){
          userData[modelName] = true
          selectedModel.push(modelName)
        }

        delete userData[userPoolOperatorChoices[modelName]]
      })

      setSelectedModels(selectedModel)
    }
    formData.setFieldsValue(userData)
  }, [userData])

  const handleFieldsChange = (data) => {};

  const preProcess = (data) => {

    data.type = data.type.map(type => ({company_type: type}))

    selectedModels.forEach((i) => {
      data[userPoolOperatorChoices[i]] = true
    });

    _.keys(userPoolOperatorChoices).map((modelName) => {
      delete data[modelName]
    })

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
          {clientFormFields.map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>

        <br />

        <Row style={{justifyContent: 'left'}}>
        {
          companyType.includes('Pool Operator') 
          ? 
          _.keys(userPoolOperatorChoices).map((modelName, modelIdx) => (
            <Col span={8} key={modelIdx}>
              <Card>
                <Row gutter={10}>
                  <Col span={18}>{modelName}</Col>
                  <Col span={6}>
                    {formItem({
                      key: modelName,
                      type: FORM_ELEMENT_TYPES.SWITCH,
                      kwargs: {
                        onChange: (val) => {
                          if (val) {
                            setSelectedModels(_.concat(selectedModels, [modelName]));
                          } else {
                            setSelectedModels(_.remove(selectedModels, (i) => i !== modelName));
                          }
                        },
                      },
                      others: {
                        defaultValue: false,
                        formOptions: {noStyle: true},
                      },
                      customLabel: modelName,
                    })}
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
          :
          companyType.includes('Consignor')
          ?
          _.keys(userConsignorChoices).map((modelName, modelIdx) => (
            <Col span={8} key={modelIdx}>
              <Card>
                <Row gutter={10}>
                  <Col span={18}>{modelName}</Col>
                  <Col span={6}>
                    {formItem({
                      key: modelName,
                      type: FORM_ELEMENT_TYPES.SWITCH,
                      kwargs: {
                        onChange: (val) => {
                          if (val) {
                            setSelectedModels(_.concat(selectedModels, [modelName]));
                          } else {
                            setSelectedModels(_.remove(selectedModels, (i) => i !== modelName));
                          }
                        },
                      },
                      others: {
                        defaultValue: false,
                        formOptions: {noStyle: true},
                      },
                      customLabel: modelName,
                    })}
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
          :
          _.keys(userConsigneeChoices).map((modelName, modelIdx) => (
            <Col span={8} key={modelIdx}>
              <Card>
                <Row gutter={10}>
                  <Col span={18}>{modelName}</Col>
                  <Col span={6}>
                    {formItem({
                      key: modelName,
                      type: FORM_ELEMENT_TYPES.SWITCH,
                      kwargs: {
                        onChange: (val) => {
                          if (val) {
                            setSelectedModels(_.concat(selectedModels, [modelName]));
                          } else {
                            setSelectedModels(_.remove(selectedModels, (i) => i !== modelName));
                          }
                        },
                      },
                      others: {
                        defaultValue: false,
                        formOptions: {noStyle: true},
                      },
                      customLabel: modelName,
                    })}
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        }
        </Row>

        <br />
        <br />
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
