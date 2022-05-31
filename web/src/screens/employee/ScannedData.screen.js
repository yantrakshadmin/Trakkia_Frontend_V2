import React, { useState, useEffect,} from 'react';
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


const ScannedData = ({ currentPage }) => {
    const [all, setAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [csvData, setCsvData] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [reqAllotments, setReqAllotments] = useState([]);
    const [clientName, setClientName] = useState(null);
    const [form] = Form.useForm();

    const { data: scannedData } = useAPI(`/rfid-dump/`, {}, false, false);
    console.log(scannedData, "dataaaa++++++++++++++++++++");


    const { user } = useSelector(s => s);
    const { userMeta } = user;
    const {  companyId } = userMeta;

    useEffect(() => {
        setReqAllotments(scannedData)

    }, [scannedData])
    

    const onSubmit = async (data) => {
        data.to = moment(data.to).endOf('date').format('YYYY-MM-DD HH:MM');
        data.from = moment(data.from).startOf('date').format('YYYY-MM-DD HH:MM');
        await loadAPI(`/rfid-dumpdownload/?company_id=${companyId}&to=${data.to}&from=${data.from}`);

        // if (scannedData) {

        //     console.log(scannedData, "scannedddddddddd");
        // }
    };

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

    console.log(reqAllotments, "reqAllotments")

    const tabs = [
        {
            name: 'Scanned Data',
            key: 'Scanned data',
            data: reqAllotments || [],
            columns,
            loading,
        },
    ];



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
                size="middle"
                title="Scanned Data"
                hideRightButton
                // ExtraButtonNextToTitle={csvData && DownloadCSVButton}
                ExpandBody={ExpandTable}
            />
        </>
    );
}

const mapStateToProps = (state) => {
    return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(ScannedData);
