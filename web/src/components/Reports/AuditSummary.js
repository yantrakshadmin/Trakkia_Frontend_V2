import React, { useEffect, useState, ReactN } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DEFAULT_BASE_URL } from 'common/constants/enviroment';
import { useAPI } from 'common/hooks/api';
import { loadAPI } from 'common/helpers/api';

import { Row, Col, Form, Button, Typography, Select, TreeSelect } from 'antd';
import { FORM_ELEMENT_TYPES } from '../../constants/formFields.constant';
import _ from 'lodash';
import formItem from '../../hocs/formItem.hoc';

const { Title } = Typography;
const { Option } = Select;

const ReportsWarhoue = [
    { id: 1, name: 'Audit Summary Report', val: 'AS' },
    { id: 2, name: 'Asset Health Report', val: 'AH' },
    { id: 3, name: 'Missing Tags', val: 'MT' },
    { id: 4, name: '3 Day Triangulation Report', val: '3DT' },
    { id: 5, name: 'Dump Data', val: 'DD' },
    { id: 6, name: 'Individual Scan Report', val: 'IS' },
    { id: 7, name: 'Location Mismatch Report', val: 'LM' },
    { id: 8, name: 'Missing Audit Report', val: 'MA' },
    { id: 9, name: 'Audit Summary Report', val: 'AS' },
];


const AuditSummary = ({ currentPage }) => {
    const [client, setClient] = useState('');
    const [toDate, setToDate] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [warehouse, setwarehouse] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState([]);
    const [selectedReportWarehouse, setSelectedReportWarehouse] = useState([])
    const [selectedValues, setSelectedValues] = useState([]);
    const [form] = Form.useForm();


    React.useEffect(() => {
        handelWarehouse();
    }, [selectedWarehouse]);


    const onChange = async () => {
        const tempFrom = moment(form.getFieldValue('dateFrom'))
            .startOf('date')
            .format('YYYY-MM-DD+HH:MM');
        const tempTo = moment(form.getFieldValue('dateTo')).endOf('date').format('YYYY-MM-DD+HH:MM');
        setToDate(tempTo);
        setFromDate(tempFrom);
        setClient(form.getFieldValue('cname'));
    };


    const handelWarehouse = async () => {
        const { data: auditUp } = await loadAPI(`/warehouse-up/?company=${52}&view=${'Pool Operator'}`, {});
        setwarehouse(auditUp);
    };
    const handleWarehouseChange = (value) => {

        if (value.includes('allwar')) {
            console.log("working");
            form.setFieldsValue({ warehouse: (warehouse || []).map((e) => e.id) })
            let res  = form.getFieldsValue(warehouse)
            // console.log(res);

        } else {
            console.log(value);
        }
    };
    const handleReportChange = (value) => {
        if (value.includes('all')) {
            console.log("working");
            form.setFieldsValue({ reports: (ReportsWarhoue || []).map((e) => e.val) })
            console.log(value);


        } else {
            console.log(value);
        }
    };


    return (
        <>
            <Title level={3}>Audit Summary</Title>
            <Form
                onFieldsChange={onChange}
                form={form}
                layout="vertical"
                hideRequiredMark
                autoComplete="off">
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name="warehouse" label="Warehouse">
                            <Select

                                mode='multiple'
                                placeholder="Select Warehouse"
                                allowClear
                                maxTagCount={2}
                                onChange={handleWarehouseChange}
                            >
                                <Option key="allwar" value="allwar">---SELECT ALL---</Option>

                                {(warehouse || []).map((v, i) => (
                                    <Option key={v.id} value={v.id}>{v.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name="reports" label="Reports">

                            <Select
                                mode='multiple'
                                placeholder="Select Warehouse"
                                allowClear
                                maxTagCount={2}
                                onChange={handleReportChange}
                            >
                                {/* <Option key="all" value="all">---SELECT ALL---</Option>
                                <Option key="1" value="AS">Audit Summary Report</Option>
                                <Option key="1" value="AH">Asset Health Report</Option>
                                <Option key="1" value="MT">Missing Tags</Option>
                                <Option key="1" value="3DT">3 Day Triangulation Report</Option>
                                <Option key="1" value="DD">Dump Data</Option>
                                <Option key="1" value="IS">Individual Scan Report</Option>
                                <Option key="1" value="LM">Location Mismatch Report</Option>
                                <Option key="1" value="MA">Missing Audit Report</Option>
                                <Option key="1" value="AS">Audit Summary Report</Option> */}

                                <Option key="all" value="all">---SELECT ALL---</Option>
                                {(ReportsWarhoue || []).map((v) => (
                                    <Option key={v?.id} value={v.val}>{v?.name}</Option>
                                ))}

                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={10}>
                    <Col span={4}>
                        {formItem({
                            key: 'dateFrom',
                            rules: [{ required: true, message: 'Please select From date!' }],
                            kwargs: {
                                placeholder: 'Select',
                                type: 'number',
                            },
                            type: FORM_ELEMENT_TYPES.DATE,
                            others: null,
                            customLabel: 'From',
                        })}
                    </Col>
                    <Col span={4}>
                        {formItem({
                            key: 'dateTo',
                            rules: [{ required: true, message: 'Please select To date!' }],
                            kwargs: {
                                placeholder: 'Select',
                                type: 'number',
                            },
                            type: FORM_ELEMENT_TYPES.DATE,
                            others: null,
                            customLabel: 'To',
                        })}
                    </Col>
                </Row>
                <Row>
                    <Button
                        // href={`${DEFAULT_BASE_URL}/outward-report/?to=${toDate}&from=${fromDate}&cname=${client}`}
                        rel="noopener noreferrer"
                        target="blank">
                        Download
                    </Button>
                </Row>
            </Form>
            <br />
        </>
    );
};

const mapStateToProps = (state) => {
    return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(AuditSummary);
