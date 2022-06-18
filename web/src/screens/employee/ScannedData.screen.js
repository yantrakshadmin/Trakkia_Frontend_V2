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
import { DEFAULT_BASE_URL } from 'common/constants/enviroment';




const ScannedData = ({ currentPage }) => {
    const [all, setAll] = useState(false);
    const [loading, setLoading] = useState(false);



    const [form] = Form.useForm();
    const { user } = useSelector(s => s);
    const { userMeta } = user;
    const { companyId } = userMeta;

    const { filteredData, reload, paginationData } = useTableSearch({
        retrieve: retrieveScannedData,
        usePaginated: true,
    });

    const onDownloadBtn = () => {
        const data = form.getFieldsValue()
        const today = new Date().toISOString();
        const tempTo = moment(data.to || today).endOf('date').format('YYYY-MM-DD HH:MM');
        const tempFrom = moment(data.from || today).startOf('date').format('YYYY-MM-DD HH:MM');
        
        console.log(data, "dataaaaaaaaaaaa");
        return (`${DEFAULT_BASE_URL}rfid-dumpdownload/?company_id=${companyId}&to=${tempTo}&from=${tempFrom}`)
    }

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

    const DownloadCSVButton = () => {
        return (
            <Button
                onClick={() => {
                    window.open(onDownloadBtn())
                }  
            }>
                    Download
            </Button>
        );
    }

    return (
        <>
            <Form  form={form} layout="inline" hideRequiredMark autoComplete="off">
                <Row>
                    <Col span={10}>
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
                    <Col span={10}>
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
                ExtraButtonNextToTitle={  DownloadCSVButton}
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
