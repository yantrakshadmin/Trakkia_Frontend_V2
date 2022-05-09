import React, { useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin, message } from 'antd';
import { productFormFields } from 'common/formFields/product.formFields';
import { categoryOptions } from 'common/formFields/categoryOptions';

import { useHandleForm } from 'hooks/form';
import { createProduct, retrieveProduct, editProduct, createGRNform, editGRN } from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';

export const ProductForm = ({ id, onCancel, onDone, isGRNForm, grnId }) => {
  const [reqFile, setFile] = useState(null);

  const { form, submit, loading } = useHandleForm({
    ...(isGRNForm ? {
      create: createGRNform,
      edit: () => { },
      retrieve: () => { },

    } : {
      create: createProduct,
      edit: editProduct,
    }),
    retrieve: retrieveProduct,
    success: 'Product created/edited successfully.',
    failure: 'Error in creating/editing product.',
    done: onDone,
    close: onCancel,
    id,
    document: true,
    useViewTypeAndCompanyId: true
  });

  const preProcess = (data) => {
    console.log(reqFile, data, '-----')
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
          req.set('no_of_fileA_files', c);
        }
      } else {
        req.append(key.toString(), data[key]);
      }
    }
    if (isGRNForm) {
      req.append('grn', grnId);
    }
    submit(req);
  };

  const others = { selectOptions: categoryOptions };
  return (
    <Spin spinning={loading}>
      <Divider orientation="left">{isGRNForm ? "Upload RFID Serials" : "Product Details"}</Divider>
      <Form
        initialValues={{ active: true }}
        onFinish={preProcess}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off">
        {!isGRNForm && <>
          <Row style={{ justifyContent: 'left' }}>
            {productFormFields.slice(0, 3).map((item, idx) => (
              <Col span={8}>
                <div key={idx} className="p-2">
                  {formItem(item)}
                </div>
              </Col>
            ))}
          </Row>
          <Row style={{ justifyContent: 'left' }}>
            {productFormFields.slice(3, 6).map((item, idx) => (
              <Col span={8}>
                <div key={idx} className="p-2">
                  {formItem({ ...item, others })}
                </div>
              </Col>
            ))}
          </Row>
          <Row style={{ justifyContent: 'space-between' }}>
            {productFormFields.slice(6, 10).map((item, idx) => (
              <Col span={6}>
                <div key={idx} className="p-2">
                  {formItem(item)}
                </div>
              </Col>
            ))}
          </Row>
          <Row style={{ justifyContent: 'space-between' }}>
            {productFormFields.slice(10, 14).map((item, idx) => (
              <Col span={6}>
                <div key={idx} className="p-2">
                  {formItem(item)}
                </div>
              </Col>
            ))}
            <Col span={6} />
          </Row>
        </>}
        {isGRNForm && <Row style={{ justifyContent: 'space-between' }}>
          {productFormFields.slice(14, 15).map((item, idx) => (
            <Col span={12}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>}
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
};
