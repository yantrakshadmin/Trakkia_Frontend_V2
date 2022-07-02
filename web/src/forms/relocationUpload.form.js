import React from 'react';
import { Form, Col, Row, Button, Divider, Spin, Input, Alert, message } from 'antd';

import { useHandleForm } from 'hooks/form';
import { createRelocation, editRelocation, retrieveRelocation, uploadRelocation } from 'common/api/auth';
import { FORM_ELEMENT_TYPES } from 'constants/formFields.constant';
import formItem from '../hocs/formItem.hoc';


import _ from 'lodash';

export const RelocationUploadForm = ({ id, onCancel, onDone, isEmployee }) => {



    const { form, submit, loading } = useHandleForm({
        create: uploadRelocation,
        edit: editRelocation,
        retrieve: retrieveRelocation,
        success: 'Relocation created/edited successfully',
        failure: 'Error in creating/editing Relocation.',
        done: onDone,
        close: onCancel,
        id,
        dates: ['transaction_date'],
    });


    const preProcess = (data) => {
        const req = new FormData();
        for (const key in data) {
            if (key === 'document') {
                if (data[key]) {
                    const newFileList = data[key].fileList.map((f) => {
                        if (f.status !== 'done') {
                            message.error(`${f.name} has not been uploaded yet!`);
                        } else {
                            return f.originFileObj;
                        }
                    });
                    data[key] = newFileList;
                    let c = 0;
                    data[key].forEach((el) => {
                        req.append(`document`, el);
                        c = c + 1;
                    });
                    // req.set('no_of_fileA_files', c);
                }
            } else {
                req.append(key.toString(), data[key] || 0);
            }
        }


        submit(req);
    };

    return (
        <Spin spinning={loading}>
            <Divider orientation="left">Relocation Details</Divider>
            <Form
                onFinish={preProcess}
                form={form}
                initialValues={{ productORkits: 'Products' }}
                layout="vertical"
                hideRequiredMark
                autoComplete="off"
            // onFieldsChange={handleFieldsChange}
            >

                <Row style={{ justifyContent: 'space-between' }}>
                    <Col span={12}>
                        <div className="p-2">
                            {formItem({
                                key: 'document',
                                type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
                                kwargs: {
                                    placeholder: 'Attach',
                                },
                                label: 'Document',
                            })}
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <div className="p-2" />
                    <Button type="primary" onClick={onCancel}>
                        Cancel
                    </Button>
                </Row>
            </Form>
        </Spin>
    );
}
