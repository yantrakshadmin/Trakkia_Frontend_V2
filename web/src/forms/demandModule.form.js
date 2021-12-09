import React, {useState, useCallback, useEffect} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Space, Card} from 'antd';
import {
  demandModuleFormFields,
  demandModuleFlowFormFields,
} from 'common/formFields/demandModule.formFields';
import {useAPI} from 'common/hooks/api';
import {loadAPI} from 'common/helpers/api';
import {useHandleForm} from 'hooks/form';
import {createDm, editDm, retrieveDm} from 'common/api/auth';
import {PlusOutlined, CloseOutlined} from '@ant-design/icons';
import {useControlledSelect} from '../hooks/useControlledSelect';
import formItem from '../hocs/formItem.hoc';

import moment from 'moment';
import DmCalModal from './demandModuleCalModal.form';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';
import { useSelector } from 'react-redux';
import { FORM_ELEMENT_TYPES } from 'constants/formFields.constant';

export const CreateDemandModuleForm = ({id, onCancel, onDone}) => {

  const {companyId} = useSelector((s) => s.user.userMeta);

  const [kits, setKits] = useState([]);
  const [flowId, setFlowId] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);


  const {data: flows} = useAPI(`/demand-flows/?id=${selectedClient}&sc=${companyId}`);
  const {data: clients} = useAPI('/company-list/');
  if(clients) clients.results = clients.results.filter((client) => client.id !== companyId)

  // const {data: kits} = useControlledSelect(flowId);
  // const {data: kits} = useAPI(`/outward-receivers/?id=${companyId}`);

  const {form, submit, loading} = useHandleForm({
    create: createDm,
    edit: editDm,
    retrieve: retrieveDm,
    success: 'Demand created/edited successfully.',
    failure: 'Error in creating/editing Demand.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['delivery_month'],
  });

  const [kitQuantities, setKitQuantities] = useState([]);

  useEffect(() => {
    console.log(kitQuantities);
  }, [kitQuantities]);

  const [dmTouched, setDMTouched] = useState(false);

  useEffect(() => {
    if (id && !loading) {
      setDMTouched(true);
      const demand_flows = form.getFieldValue('demand_flows');
      if (demand_flows) {
        var temp = [];

        demand_flows.forEach((i, idx) => {
          temp[idx] = i.quantities.map((ev) => ({
            ...ev,
            date: moment(ev.date),
          }));
        });
        setKitQuantities(temp);
      }
    }
  }, [id, loading]);

  const preProcess = (data) => {
    const {demand_flows} = data;
    console.log(demand_flows);
    const newFlows = demand_flows.map((flo) => ({
      flow: Number(flo.flow),
      kit: Number(flo.kit),
      monthly_quantity: flo.monthly_quantity,
      quantities: flo.quantities ? flo.quantities : [],
      part_number: flo.part_number ? flo.part_number : '',
      receiver_client_name: flo.receiver_client_name ? flo.receiver_client_name : '',
      receiver_client_city: flo.receiver_client_city ? flo.receiver_client_city : '',
      flow_days: flo.flow_days ? flo.flow_days : '',
      kit_name: flo.kit_name ? flo.kit_name : '',
      kit_type: flo.kit_type ? flo.kit_type : '',
      components_per_kit: flo.components_per_kit ? flo.components_per_kit : '',
    }));
    data.demand_flows = newFlows;
    console.log(data);
    submit(data);
  };

  const handleFieldsChange = useCallback(
    (data) => {
      if(form.getFieldValue('delivery_month')) setDMTouched(true);
      try {
        if (data[0]) {
          if (data[0].name[0] === 'client_id') {
            const sc = _.find(clients?.results, (item) => item.id === data[0].value);
            setSelectedClient(sc.id);
          }
        }

        if (data[0].name[0] === 'demand_flows') {
          const fieldKey = data[0].name[1];
          const flowsX = form.getFieldValue('demand_flows');
          console.log(flowsX[fieldKey].flow, flowsX[fieldKey].kit)
          const thisFlow = _.find(flows, (o) => o.id === flowsX[fieldKey].flow);
          setKits(thisFlow.kits)
          const thisKit = _.find(kits, (o) => o.kit.id === flowsX[fieldKey].kit).kit;
          console.log(kits, thisKit)
          Object.assign(flowsX[fieldKey], {
            part_number: thisKit.part_number,
            receiver_client_name: thisFlow.receiver_client.name,
            receiver_client_city: thisFlow.receiver_client.city,
            flow_days: thisFlow.flow_days,
            kit_type: thisKit.kit_type,
            kit_name: thisKit.kit_name,
            components_per_kit: thisKit.components_per_kit,
          });
          form.setFieldsValue({demand_flows: flowsX});
        }
      } catch (err) {}
    },
    [kits, flows, form, dmTouched],
  );

  const customRemove = useCallback(
    (remove, fieldName) => {
      var temp = [...kitQuantities];
      temp.splice(fieldName, 1);
      setKitQuantities(temp);
      remove(fieldName);
    },
    [kitQuantities],
  );

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Volume Plan Details</Divider>
      <Form
        onFinish={preProcess}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {demandModuleFormFields.slice(0, 1).map((item, idx) => (
            <Col span={12}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          <Col span={12}>
            {formItem({
              key: 'client_id',
              kwargs: {
                disabled: !dmTouched,
                showSearch: true,
                placeholder: 'Select',
                filterOption: (input, option) =>
                  option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
              },
              others: {
                // selectOptions: filterActive(_, clients) || [],
                selectOptions: (clients?.results || []).filter(item => item.type.map(t => t.company_type).includes('Pool Operator')) ,
                key: 'id',
                customTitle: 'name',
                dataKeys: ['phone' , 'email'],
              },
              type: FORM_ELEMENT_TYPES.SELECT,
              customLabel: 'Client',
            })}
          </Col>
        </Row>

        <Divider orientation="left">Flow and Kit Details</Divider>

        <Form.List name="demand_flows">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Card>
                    <Row gutter={8}>
                      <Col span={16}>
                        {demandModuleFlowFormFields.slice(0, 1).map((item) => (
                          <>
                            {formItem({
                              ...item,
                              kwargs: {
                                onChange: (val) => {
                                  setFlowId(val);
                                },
                                placeholder: 'Select Flow',
                                showSearch: true,
                                filterOption: (input, option) =>
                                  option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                              },
                              others: {
                                selectOptions: filterActive(_, flows) || [],
                                key: 'id',
                                dataKeys: ['flow_name', 'flow_info', 'flow_type'],
                                customTitle: 'flow_name',
                                searchKeys: ['flow_info'],
                                formOptions: {
                                  ...field,
                                  name: [field.name, item.key],
                                  fieldKey: [field.fieldKey, item.key],
                                },
                              },
                            })}
                          </>
                        ))}
                      </Col>
                      <Col span={8}>
                        {demandModuleFlowFormFields.slice(1, 2).map((item) => (
                          <>
                            {formItem({
                              ...item,
                              kwargs: {
                                placeholder: 'Select Part Name',
                                showSearch: true,
                                filterOption: (input, option) =>
                                  option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                                onFocus: () => {
                                  const data = form.getFieldValue([
                                    'demand_flows',
                                    field.name,
                                    'flow',
                                  ]);
                                  if (data) {
                                    console.log(data);
                                    setFlowId(data);
                                  }
                                },
                              },
                              others: {
                                selectOptions: filterActive(_, kits.map(kit => kit.kit)) || [],
                                key: 'id',
                                customTitle: 'part_name',
                                //dataKeys: ['kit_name', 'kit_info', 'components_per_kit'],
                                formOptions: {
                                  ...field,
                                  name: [field.name, item.key],
                                  fieldKey: [field.fieldKey, item.key],
                                },
                              },
                            })}
                          </>
                        ))}
                      </Col>
                    </Row>

                    <Space key={field.fieldKey}>
                      {demandModuleFlowFormFields.slice(2).map((item) => (
                        <>
                          {formItem({
                            ...item,
                            others: {
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                          })}
                        </>
                      ))}
                      <Form.Item label="Cal">
                        <DmCalModal
                          form={form}
                          field={field}
                          fieldName={field.name}
                          kitQuantities={kitQuantities}
                          setKitQuantities={setKitQuantities}
                          deliveryMonth={form.getFieldValue('delivery_month')}
                          letEdit={true}
                        />
                      </Form.Item>

                      <Form.Item label="Action">
                        <Button
                          type="danger"
                          title="Delete"
                          onClick={() => {
                            customRemove(remove, field.name);
                          }}>
                          <CloseOutlined />
                        </Button>
                      </Form.Item>
                    </Space>
                  </Card>
                ))}
                <br />
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                    disabled={dmTouched ? false : true}>
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
          <Button type="primary" onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

// useEffect(() => {
//   if (id && !loading) {
//     const demand_flows = form.getFieldValue('demand_flows');
//     if (demand_flows) {
//       const DF = demand_flows.map((i, idx) => {
//         try {
//           const {data: thisFlow} = loadAPI(`/demand-flows/?id=${demand_flows[idx].flow}`);
//           const {data: thisKit} = loadAPI(`/demand-kits/?id=${demand_flows[idx].kit}`);
//           return {
//             ...i,
//             part_number: thisKit.part_number,
//             // receiver_client_name: thisFlow.receiver_client.name,
//             // receiver_client_city: thisFlow.receiver_client.city,
//             // flow_days: thisFlow.flow_days,
//             kit_type: thisKit.kit_type,
//             kit_id: thisKit.kit_name,
//             components_per_kit: thisKit.components_per_kit,
//           };
//         } catch (err) {
//           console.log(err);
//           return null;
//         }
//       });

//       console.log(DF);
//       form.setFieldsValue({demand_flows: DF});
//     }
//   }
// }, [id, loading]);

// const handleFieldsChange = useCallback(
//   (data) => {
//     if (data[0]) {
//       if (data[0].name) {
//         if (data[0].name[0] === 'demand_flows') {
//           const fields = form.getFieldsValue();

//           if ('demand_flows' in fields) {
//             const fieldKey = data[0].name[1];
//             const flowsX = fields['demand_flows'];
//             if (fieldKey in flowsX) {
//               if ('flow' in flowsX[fieldKey]) {
//                 const thisFlow = _.find(flows, (o) => o.id === flowsX[fieldKey].flow);
//                 if ('kit' in flowsX[fieldKey]) {
//                   const thisKit = _.find(kits, (o) => o.id === flowsX[fieldKey].kit);
//                   if (thisFlow && thisKit) {
//                     Object.assign(flowsX[fieldKey], {
//                       part_number: thisKit.part_number,
//                       receiver_client_name: thisFlow.receiver_client.name,
//                       receiver_client_city: thisFlow.receiver_client.city,
//                       flow_days: thisFlow.flow_days,
//                       kit_type: thisKit.kit_type,
//                       kit_id: thisKit.kit_name,
//                       components_per_kit: thisKit.components_per_kit,
//                     });
//                   }
//                 }
//                 form.setFieldsValue({demand_flows: flowsX});
//                 console.log(flowsX);
//               }
//             }
//           }
//         }
//       }
//     }
//   },
//   [kits, flows, form],
// );
// const renderDFTable = useCallback(
//   (fieldKey) => {
//     try {
//       const flowsX = form.getFieldsValue('demand_flows');
//       const thisFlow = _.find(flows, (o) => o.id === flowsX[fieldKey].flow);
//       const thisKit = _.find(kits, (o) => o.id === flowsX[fieldKey].kit);
//       const dataSource = [
//         {
//           part_number: thisKit.part_number,
//           receiver_client_name: thisFlow.receiver_client.name,
//           receiver_client_city: thisFlow.receiver_client.city,
//           flow_days: thisFlow.flow_days,
//           kit_type: thisKit.kit_type,
//           kit_id: thisKit.kit_name,
//           components_per_kit: thisKit.components_per_kit,
//         },
//       ];
//       return <Table columns={demandFlowsCols} dataSource={dataSource} size="small" />;
//     } catch (err) {
//       console.log(err);
//       const dataSource = [
//         {
//           part_number: '-',
//           receiver_client_name: '-',
//           receiver_client_city: '-',
//           flow_days: '-',
//           kit_type: '-',
//           kit_id: '-',
//           components_per_kit: '-',
//         },
//       ];
//       return <Table columns={demandFlowsCols} dataSource={dataSource} size="small" />;
//     }
//   },
//   [flowId, kits, flows, form],
// );
