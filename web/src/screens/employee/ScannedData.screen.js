import React, { useState, useEffect, useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { useAPI } from 'common/hooks/api';
import scannedDataColumn from 'common/columns/ScannedData.column';
import TableWithTabHoc from 'hocs/TableWithTab.hoc';
import ExpandTable from "../../components/ScannedExpandTable";
import { Form, Button, Row, Col } from 'antd';
import formItem from "../../hocs/formItem.hoc";
import { FORM_ELEMENT_TYPES } from '../../constants/formFields.constant';
import moment from 'moment';
import { loadAPI } from 'common/helpers/api';
import Download from 'icons/Download';
import { CSVLink } from 'react-csv';
import { useTableSearch } from 'hooks/useTableSearch';
import { retrieveScannedData } from 'common/api/auth';




const ScannedData = ({ currentPage }) => {
    const [all, setAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [csvData, setCsvData] = useState(null);
    const [reportData, setReportData] = useState(null);
    // const [reqAllotments, setReqAllotments] = useState([]);
    const [clientName, setClientName] = useState(null);
    const [form] = Form.useForm();

    // const { data: scannedData } = useAPI(`/rfid-dump/`, {}, false, false);
    // console.log(csvData, "csvData dataaaa++++++++++++++++++++");


    const { user } = useSelector(s => s);
    const { userMeta } = user;
    const { companyId } = userMeta;

    const { filteredData, reload, paginationData } = useTableSearch({
        retrieve: retrieveScannedData,
        usePaginated: true,
    });

  
    const onSubmit = async (data) => {
        setLoading(true)
        data.to = moment(data.to).endOf('date').format('YYYY-MM-DD HH:MM');
        data.from = moment(data.from).startOf('date').format('YYYY-MM-DD HH:MM');
        const { data: csvD } = await loadAPI(`/rfid-dumpdownload/?company_id=${companyId}&to=${data.to}&from=${data.from}`)
        setCsvData(csvD)
        setLoading(false)
    };

    const columns = [
        {
            title: 'Sr. No.',
            key: 'srno',
            render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
        },
        ...scannedDataColumn,
        {
            title: 'Download',
            key: 'download',
            render: (text, record) => {
                return (
                    <div className='row justify-center'>
                        <a href={'nn'} target='_blank' rel='noreferrer'>
                            <Download />
                        </a>
                    </div>
                );
            },
        },
    ];

    const tabs = [
        {
            name: 'Scanned Data',
            key: 'Scanned data',
            data: filteredData || [],
            columns,
            loading,
        },
    ];

    const DownloadCSVButton = useCallback(() => {
        return (
            <Button>
                <CSVLink
                    data={csvData}
                    filename={'Scanned Data' +'.xlsx'}
                    className='btn btn-primary'>
                    Download
                </CSVLink>
            </Button>
        );
    }, [csvData]);

    return (
        <>
            <Form onFinish={onSubmit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
                <Row>
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
                </Row>
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
                refresh={reload}
                size="middle"
                title="Scanned Data"
                hideRightButton
                ExtraButtonNextToTitle={csvData && DownloadCSVButton}
                // ExtraButtonNextToTitle={csvData && DownloadCSVButton}
                ExpandBody={ExpandTable}
                totalRows={paginationData?.count}
            />
        </>
    );
}

const mapStateToProps = (state) => {
    return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(ScannedData);
