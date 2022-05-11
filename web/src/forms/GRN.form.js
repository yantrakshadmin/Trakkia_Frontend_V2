import React, { useState } from 'react';
import _ from 'lodash';
import { Form, Col, Row, Button, Divider, Spin, message } from 'antd';
import { GRNFormFields, GRNItemFormFields, PoGRNFields } from 'common/formFields/GRN.formFields';
import { useAPI } from 'common/hooks/api';
import { useHandleForm } from 'hooks/form';
import { createGRN, editGRN, retrievePurchaseOrder, retrieveGRN } from 'common/api/auth';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { filterActive } from 'common/helpers/mrHelper';
import formItem from '../hocs/formItem.hoc';

export const GRNForm = ({ id, onCancel, onDone, noEdit, createGrnWithPO, purchaseOrder }) => {
  console.log(createGrnWithPO)
  const [reqFile, setFile] = useState(null);

  const { user } = useSelector((s) => s);
  const { userMeta } = user;
  const { companyId } = userMeta;

  const { data: vendors } = useAPI(`/company-vendor/?id=${companyId}`);
  const { data: warehouses } = useAPI(`/company-warehouse/?id=${companyId}`);
  const { data: products } = useAPI(`/products/`, {}, false, true);

  const handleGrnWithPO = () => {
    const data = purchaseOrder;
    let sum = 0;
    sum += (sum * parseInt(data.billing_gst,10)) / 100;
    data.items = (data.items || []).map((i) => {
      sum += i.item_price * i.item_quantity;
      return {
      ...i,
      item: i.item?.id,
      }
    })
    data.invoice_amount = sum;
    return data;
  };

  const { form, submit, loading } = useHandleForm({
    create: createGRN,
    edit: editGRN,
    retrieve: createGrnWithPO ? retrievePurchaseOrder : retrieveGRN,
    success: 'GRN created/edited successfully.',
    failure: 'Error in creating/editing GRN.',
    done: onDone,
    close: onCancel,
    id: createGrnWithPO ? null : id,
    dates: ['inward_date'],
  });

  React.useEffect(()=>{
    form.setFieldsValue(handleGrnWithPO());
  },[])


  //
  // const preProcess = (data) => {
  //   if (reqFile) {
  //     data.document = reqFile.originFileObj;
  //   } else delete data.document;
  //   const req = new FormData();
  //   for (const key in data) {
  //     console.log(key, typeof data[key]);
  //     if (key === 'inward_date') {
  //       const value = moment(data[key]).format('YYYY-MM-DD HH:mm');
  //       req.append(key.toString(), value.toString());
  //     } else if (typeof data[key] === 'object' && key != 'document') {
  //       // let value = new Blob([JSON.stringify(data[key])], {type: 'application/json'});
  //       req.append(key.toString(), JSON.stringify(data[key]));
  //     } else req.append(key.toString(), data[key]);
  //   }
  //   submit(req);
  // };

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>GRN Details</Divider>
      <Form onFinish={submit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row>
          {PoGRNFields.slice(0, 2).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation="left"></Divider>

        <Row style={{ justifyContent: 'left' }}>
          {GRNFormFields.slice(0, 1).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    placeholder: 'Select',
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                  },
                  others: {
                    selectOptions: filterActive(_, warehouses || []),
                    key: 'id',
                    customTitle: 'name',
                    dataKeys: ['address', 'city'],
                    showSearch: true,
                  },
                })}
              </div>
            </Col>
          ))}
          {GRNFormFields.slice(1, 2).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    placeholder: 'Select',
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                  },
                  others: {
                    key: 'id',
                    selectOptions: vendors
                      ? filterActive(_, vendors || []).filter(
                        (vendor) => vendor.type === 'Material',
                      )
                      : [],
                    customTitle: 'name',
                    dataKeys: ['street', 'city'],
                  },
                })}
              </div>
            </Col>
          ))}
          {GRNFormFields.slice(2, 3).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    placeholder: 'Select',
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                  },
                  others: {
                    key: 'id',
                    selectOptions: vendors
                      ? filterActive(_, vendors || []).filter(
                        (vendor) => vendor.type === 'Transporter',
                      )
                      : [],
                    customTitle: 'name',
                    dataKeys: ['street', 'city'],
                  },
                })}
              </div>
            </Col>
          ))}
          {GRNFormFields.slice(3, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {GRNFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({ ...item })}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {GRNFormFields.slice(8, 12).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({ ...item })}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {GRNFormFields.slice(12, 13).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({ ...item })}
              </div>
            </Col>
          ))}
          {GRNFormFields.slice(13, 14).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({ ...item })}
              </div>
            </Col>
          ))}
          {GRNFormFields.slice(14, 15).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    onChange(info) {
                      const { status } = info.file;
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
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation="left">Product Details</Divider>
        <Form.List name="items">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align="middle">
                    {GRNItemFormFields.slice(0, 1).map((item) => (
                      <Col span={5}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Select',
                              type: 'number',
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                            },
                            others: {
                              selectOptions: filterActive(_, products?.results || []),
                              key: 'id',
                              dataKeys: ['name', 'description', 'category'],
                              customTitle: 'short_code',
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                          })}
                        </div>
                      </Col>
                    ))}
                    {GRNItemFormFields.slice(1, 4).map((item) => (
                      <Col span={5}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            others: {
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                          })}
                        </div>
                      </Col>
                    ))}
                    <Button
                      type="danger"
                      style={index != 0 ? { top: '-2vh' } : null}
                      onClick={() => {
                        remove(field.name);
                      }}>
                      <MinusCircleOutlined /> Delete
                    </Button>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block>
                    <PlusOutlined /> Add Item
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Row>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <div className="p-2" />
          <Button type='primary' onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};
