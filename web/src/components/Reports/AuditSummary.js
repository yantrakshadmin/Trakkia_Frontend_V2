import React, { useEffect, useState, ReactN } from 'react';
import { connect, useSelector } from 'react-redux';
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
    { id: 2, name: 'Last Seen for Missing Tags Report', val: 'AH' },
    { id: 3, name: 'Missing Scans Report', val: 'MS' },
    { id: 4, name: 'Missing Assets Report', val: 'MAS' },
    { id: 8, name: 'Missing Audit Report', val: 'MAU' },
    { id: 5, name: 'Dump Data Reports', val: 'DD' },
    { id: 6, name: 'Individual Scan Report', val: 'IS' },
    { id: 7, name: 'Location Mismatch Report', val: 'LM' },
];


const AuditSummary = ({ currentPage }) => {
    const [toDate, setToDate] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [warehouse, setwarehouse] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState([]);
    const [selectedReport, setSelectedReport] = useState([])
    const [selectedValues, setSelectedValues] = useState([]);
    const [form] = Form.useForm();
    const { user } = useSelector(s => s);
    const { userMeta } = user;
    const { companyId, viewType } = userMeta;


    React.useEffect(() => {
        handelWarehouse();
    }, [selectedWarehouse]);

    const handelWarehouse = async () => {
        const { data: auditUp } = await loadAPI(`/warehouse-up/?company=${companyId}&view=${viewType}`, {});
        setwarehouse(auditUp);
    };
    const handleWarehouseChange = (value) => {

        if (value.includes('allwar')) {

            form.setFieldsValue({ warehouse: (warehouse || []).map((e) => e.id) })
            setSelectedWarehouse(form.getFieldValue('warehouse'))
        }
        setSelectedWarehouse(form.getFieldValue('warehouse'))
    };
    const handleReportChange = (value) => {
        if (value.includes('all')) {
            form.setFieldsValue({ reports: (ReportsWarhoue || []).map((e) => e.val) })
            setSelectedReport(form.getFieldValue('reports'))
        }
        setSelectedReport(form.getFieldValue('reports'))
    };
    const onChange = async () => {
        const tempFrom = moment(form.getFieldValue('dateFrom')).startOf('date').format('YYYY-MM-DD HH:MM');
        const tempTo = moment(form.getFieldValue('dateTo')).endOf('date').format('YYYY-MM-DD HH:MM');
        setToDate(tempTo);
        setFromDate(tempFrom);
    };

    const onDownloadBtn = () => {
        const data = form.getFieldsValue()
        // const today = new Date().toISOString();
        // const tempTo = moment(data.to).endOf('date').format('YYYY-MM-DD HH:MM');
        // const tempFrom = moment(data.from).startOf('date').format('YYYY-MM-DD HH:MM');
        console.log(data, "dataaaaaaaaaaaa");
        return (`${DEFAULT_BASE_URL}rfid-dumpdownload/?company_id=${companyId}&warehouse=${[data.warehouse]}&reports=${data.reports}&from=${fromDate}&to=${toDate}`)
    }





    return (
        <>
            <Title level={3}>Consolidated Reports</Title>
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
                        onClick={() => {
                            window.open(onDownloadBtn())
                        }

                        }
                    >
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
