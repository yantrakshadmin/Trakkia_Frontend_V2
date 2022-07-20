import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin, Card } from 'antd';
import { clientFormFields, userConsigneeChoices, userConsignorChoices, userPoolOperatorChoices } from "common/formFields/employeeProfile.formFields";
import { useHandleForm } from 'hooks/form';
import { editCompanyProfile, manageCompanyProfile } from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';
import { useAPI } from 'common/hooks/api';
import _ from 'lodash';
import { FORM_ELEMENT_TYPES } from 'constants/formFields.constant';
// import { usePArams } from "suggestions"
import { type } from 'jquery';
// import { useParams } from '@reach/router';
// import { Routes, Route, useParams } from 'react-router-dom';
import { useLocation } from "@reach/router"

const ClientForm = ({ id, onCancel, onDone, }) => {
    // const rowId = useParams()
    const useloData = useLocation()
    // const { state.rowId } = uselocationData;

    const [formData] = Form.useForm();
    // const retrieveURL = `emp-profile`
    const { data: userData } = useAPI(`/emp-profile/${useloData.state?.rowId}`)
    const [selectedModels, setSelectedModels] = useState([]);
    const [companyType, setCompanyType] = useState([]);

    const { submit, loading } = useHandleForm({
        create: null,
        edit:  manageCompanyProfile,
        success: 'Employee created/edited successfully.',
        failure: 'Error in creating/editing Employee.',
        done: onDone,
        close: onCancel,
        id: useloData.state?.rowId,
        
        
    });
    // console.log(,"editingId");
    useEffect(() => {
        if (userData) {

            userData.type = userData.type.map(d => d.emp_type)

            setCompanyType(userData.type)

            var selectedModel = []
            // _.keys(userPoolOperatorChoices).map(e => console.log(e ,'---userData log')) 


            _.keys(userPoolOperatorChoices).map((modelName) => {
                // console.log([userPoolOperatorChoices[modelName]],"userData[userPoolOperatorChoices[modelName]]");

                if (userData[userPoolOperatorChoices[modelName]]) {
                    userData[modelName] = true
                    selectedModel.push(modelName)
                }

                delete userData[userPoolOperatorChoices[modelName]]
            })

            setSelectedModels(selectedModel)
        }


        formData.setFieldsValue(userData)
        // preProcess();
    }, [userData])

    const handleFieldsChange = (data) => {
        if (data[0].name[0] == 'type') {

            let types = formData.getFieldValue('type')

            setCompanyType(types)

            if (types.includes('Pool Operator') == false) {

                if (types.includes('Consignor')) {

                    let choices = _.keys(userConsignorChoices).map((modelName) => {

                        if (selectedModels.includes(modelName)) return modelName

                    }).filter((i) => i)

                    _.keys(userPoolOperatorChoices).map((modelName) => {

                        if (selectedModels.includes(modelName)) formData.setFieldsValue({ [modelName]: true })
                        else formData.setFieldsValue({ [modelName]: false })

                    })

                    setSelectedModels(choices)

                } else if (types.includes('Consignee')) {

                    let choices = _.keys(userConsigneeChoices).map((modelName) => {

                        if (selectedModels.includes(modelName)) return modelName

                    }).filter((i) => i)

                    _.keys(userPoolOperatorChoices).map((modelName) => {

                        if (selectedModels.includes(modelName)) formData.setFieldsValue({ [modelName]: true })
                        else formData.setFieldsValue({ [modelName]: false })

                    })

                    setSelectedModels(choices)

                } else {

                    _.keys(userPoolOperatorChoices).map((modelName) => {

                        formData.setFieldsValue({ [modelName]: false })

                    })

                    setSelectedModels([])

                }

            }

        }
    };



    const preProcess = (data) => {

        data.type = data.type.map(type => ({ company_type: type }))

        _.keys(userPoolOperatorChoices).map((modelName) => {

            if (selectedModels.includes(modelName)) {
                data[userPoolOperatorChoices[modelName]] = true
            } else {
                data[userPoolOperatorChoices[modelName]] = false
            }

        })

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
                <Row style={{ justifyContent: 'left' }}>
                    {clientFormFields.slice(0, 3).map((item, idx) => (
                        <Col span={8}>
                            <div key={idx} className="p-2">
                                {formItem(item)}
                            </div>
                        </Col>
                    ))}
                    {clientFormFields.slice(4, 5).map((item, idx) => (
                        <Col span={8}>
                            <div key={idx} className="p-2">
                                {formItem(item)}
                            </div>
                        </Col>
                    ))}
                    {clientFormFields.slice(6, 7).map((item, idx) => (
                        <Col span={8}>
                            <div key={idx} className="p-2">
                                {formItem({
                                    ...item,
                                    others: {
                                        selectOptions: companyType.map((type => ({ value: type, label: type })))
                                    },
                                })}
                            </div>
                        </Col>
                    ))}
                </Row>

                <br />

                <Row style={{ justifyContent: 'left' }}>
                    {
                        companyType.includes('Pool Operator')
                            ? (
                                <div>
                                    <Row> {
                                        _.keys(userPoolOperatorChoices).slice(0, 18).map((modelName, modelIdx) => (
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
                                                                    formOptions: { noStyle: true },
                                                                },
                                                                customLabel: modelName,
                                                            })}
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        )
                                        )
                                    }</Row>
                                    <Divider style={{ paddingTop: "50px", paddingBottom: '10px' }} orientation="left">Reports</Divider>


                                    <Row>
                                        {
                                            _.keys(userPoolOperatorChoices).slice(18, 29).map((modelName, modelIdx) => (
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
                                                                        formOptions: { noStyle: true },
                                                                    },
                                                                    customLabel: modelName,
                                                                })}
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Col>
                                            )
                                            )}</Row>

                                </div>
                                //   (_.keys(userPoolOperatorChoices).slice(0, 12).map((modelName, modelIdx) => (
                                //     <Col span={8} key={modelIdx}>
                                //       <Card>
                                //         <Row gutter={10}>
                                //           <Col span={18}>{modelName}</Col>
                                //           <Col span={6}>
                                //             {formItem({
                                //               key: modelName,
                                //               type: FORM_ELEMENT_TYPES.SWITCH,
                                //               kwargs: {
                                //                 onChange: (val) => {
                                //                   if (val) {
                                //                     setSelectedModels(_.concat(selectedModels, [modelName]));
                                //                   } else {
                                //                     setSelectedModels(_.remove(selectedModels, (i) => i !== modelName));
                                //                   }
                                //                 },
                                //               },
                                //               others: {
                                //                 defaultValue: false,
                                //                 formOptions: { noStyle: true },
                                //               },
                                //               customLabel: modelName,
                                //             })}
                                //           </Col>
                                //         </Row>
                                //       </Card>
                                //     </Col>
                                //   )
                                //   )
                                //   )
                                //   ,
                                //   (_.keys(userPoolOperatorChoices).slice(12, 23).map((modelName, modelIdx) => (
                                //     <Col span={8} key={modelIdx}>
                                //       <Card>
                                //         <Row gutter={10}>
                                //           <Col span={18}>{modelName}</Col>
                                //           <Col span={6}>
                                //             {formItem({
                                //               key: modelName,
                                //               type: FORM_ELEMENT_TYPES.SWITCH,
                                //               kwargs: {
                                //                 onChange: (val) => {
                                //                   if (val) {
                                //                     setSelectedModels(_.concat(selectedModels, [modelName]));
                                //                   } else {
                                //                     setSelectedModels(_.remove(selectedModels, (i) => i !== modelName));
                                //                   }
                                //                 },
                                //               },
                                //               others: {
                                //                 defaultValue: false,
                                //                 formOptions: { noStyle: true },
                                //               },
                                //               customLabel: modelName,
                                //             })}
                                //           </Col>
                                //         </Row>
                                //       </Card>
                                //     </Col>
                                //   )
                                //   )
                                //   )
                                // )
                            )
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
                                                            formOptions: { noStyle: true },
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
                                                            formOptions: { noStyle: true },
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

export default ClientForm;
