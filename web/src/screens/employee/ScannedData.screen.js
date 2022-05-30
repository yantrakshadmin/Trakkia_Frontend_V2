import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DEFAULT_BASE_URL } from 'common/constants/enviroment';
import { useAPI } from 'common/hooks/api';
import { Row, Col, Form, Button } from 'antd';
import { retrieveAllotmentReport, retrieveClients } from 'common/api/auth';
import scannedDataColumn from 'common/columns/ScannedData.column';
import { AllotFlowTable } from 'components/AllotFlowExp';
import TableWithTabHoc from 'hocs/TableWithTab.hoc';
import { FORM_ELEMENT_TYPES } from '../../constants/formFields.constant';
import ExpandTable from "../../components/ScannedExpandTable";

import formItem from '../../hocs/formItem.hoc';
import { loadAPI } from 'common/helpers/api';
import { CSVLink } from 'react-csv';

const ScannedData = ({ currentPage }) => {
    const [all, setAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [csvData, setCsvData] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [reqAllotments, setReqAllotments] = useState([]);
    const [clientName, setClientName] = useState(null);
    const [form] = Form.useForm();
    const [warehouseName, setWarehouseName] = useState('')

    const { data: scannedData } = useAPI(`/rfid-dump/`, {}, false, false);
    const { data: serialName } = useAPI(`/grnserial-conversion/?company=${52}/`, {}, false, false);

    // const { data: warehouse } = useAPI(`/warehouse/?company=${companyId}&view=${viewType}&page=${page}&pageSize=${pageSize}`)
    console.log(scannedData, "dataaaa++++++++++++++++++++")
    console.log(serialName,"serialName");
    
    // useEffect(() => {
    //     setReqAllotments(scannedData);


    // }, [scannedData])

    const onSubmit = async (data) => {

        if (scannedData) {
            // const reqD = scannedData.map((alt) => ({
            //     // reference_number: alt.reference_number,
            //     // date: alt.date,
            //     // warehouse: alt.warehouse,
            //     // serials: alt.serials
            //     // transport_by: alt.transport_by,
            //     // is_delivered: alt.is_delivered
            // }));
            setReqAllotments(scannedData);
            // setWarehouseName(warehouse)
            console.log(scannedData, "scannedddddddddd");
            // console.log(reqD, "alottttttttttt");
        }
      
        
       

        // setLoading(true);
        // let reqC = null;
        // scannedData.forEach((c) => {
        //     if (c.id === data.cname) reqC = c.name;
        // });
        // setClientName(reqC);
        // data.to = moment(data.to).endOf('date').format('YYYY-MM-DD HH:MM');
        // data.from = moment(data.from).startOf('date').format('YYYY-MM-DD HH:MM');

        // const { data: csvD } = await loadAPI(`
        // /allotment-reportsdownload/?cname=${data.cname}&to=${data.to}&from=${data.from}`)
        // const { data: csvD } = await loadAPI(`/rfid-dump/`)
        // setCsvData(csvD)

        // const { data: report } = await retrieveAllotmentReport(data);
        // if (report) {
        //     setLoading(false);
        //     setReportData(report);
        // }
    };

    // useEffect(() => {
    // //     if (reportData) {
    // //         const reqD = reportData.map((alt) => ({
    // //             transaction_no: alt.transaction_no,
    // //             dispatch_date: alt.dispatch_date,
    // //             warehouse_name: alt.send_from_warehouse,
    // //             transport_by: alt.transport_by,
    // //             is_delivered: alt.is_delivered,
    // //         }));
    // //         setReqAllotments(reqD);
    // //         console.log(reqAllotments)
    // //     }
    // // }, [reportData]);
    //     if (scannedData) {
    //         const reqD = scannedData.map((alt) => ({
    //         reference_number: alt.reference_number,
    //         date: alt.date,
    //         warehouse: alt.warehouse,
    //         // transport_by: alt.transport_by,
    //         // is_delivered: alt.is_delivered,
    //     }));
    //     setReqAllotments(reqD);
    //     console.log(reqAllotments, "reqdataataat")
    // }
    // }, [scannedData]);

    const columns = [
        {
            title: 'Sr. No.',
            key: 'srno',
            render: (text, record, index) => {
                console.log(text, record);
                return index + 1
            }
        },
        ...scannedDataColumn,
    ];

    console.log(reqAllotments,"reqAllotments")

    const tabs = [
        {
            name: 'Scanned Data',
            key: 'Scanned data',
            data: reqAllotments || [],
            columns,
            loading,
        },
    ];

    const DownloadCSVButton = useCallback(() => {
        return (
            <Button>
                <CSVLink
                    data={csvData}
                    filename={'Allotments' + clientName + '.csv'}
                    className='btn btn-primary'>
                    Download
                </CSVLink>
            </Button>
        );
    }, [csvData]);

    return (
        <>
            <Form onFinish={onSubmit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
                {/* <Row>
                    <Col span={10}>
                        {formItem({
                            key: 'cname',
                            kwargs: {
                                placeholder: 'Select',
                            },
                            others: {
                                selectOptions: clients || [],
                                key: 'id',
                                customTitle: 'name',
                                dataKeys: ['address'],
                            },
                            type: FORM_ELEMENT_TYPES.SELECT,
                            customLabel: 'Client',
                        })}
                    </Col>
                </Row> */}
                {/* <Row>
                    <Col span={3}>
                        {formItem({
                            key: 'from',
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
                    <Col span={4} />
                    <Col span={3}>
                        {formItem({
                            key: 'to',
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
                </Row> */}
                <Row>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Row>
            </Form>
            <br />
            <TableWithTabHoc
                expandHandleKey={'serials'}
                rowKey={(record) => record.id}
                tabs={tabs}
                size="middle"
                title="Scanned Data"
                hideRightButton
                ExtraButtonNextToTitle={csvData && DownloadCSVButton}
                ExpandBody={ExpandTable}

            // downloadLinkButtonTitle="Download"
            // downloadLink={`${DEFAULT_BASE_URL}allotment-reportsdownload/?cname=${client}&to=${to}&from=${from}`}
            // downloadLink2={`${DEFAULT_BASE_URL}/billing-annexure/?id=${client}&to=${to}&from=${from}`}
            // expandHandleKey="flows"
            // ExpandBody={AllotFlowTable}
            // expandParams={{loading}}
            // csvdata={csvData}
            // csvname={'Allotments' + clientName + '.csv'}
            />
        </>
    );
};

const mapStateToProps = (state) => {
    return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(ScannedData);
