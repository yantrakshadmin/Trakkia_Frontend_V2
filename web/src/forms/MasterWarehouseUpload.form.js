import React from 'react';
import { Form, Col, Row, Button, Divider, Spin, message } from 'antd';

import { useHandleForm } from 'hooks/form';
import { uploadMasterWarehouse } from 'common/api/auth';
import { FORM_ELEMENT_TYPES } from 'constants/formFields.constant';
import formItem from '../hocs/formItem.hoc';


import _ from 'lodash';

export const MasterWarehouseUploadForm = ({ id, onCancel, onDone, warId }) => {



    const { form, submit, loading } = useHandleForm({
        create: (data) => uploadMasterWarehouse( warId,data),
        // edit: editRelocation,
        // retrieve: retrieveRelocation,
        success: 'Discarded Tags created/edited successfully',
        failure: 'Error in creating/editing Upload Discarded Tags .',
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
            <Divider orientation="left"> Pillar Tags</Divider>
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
