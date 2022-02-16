import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import {useAPI} from 'common/hooks/api';
import {Row, Col, Form, Button} from 'antd';
import {retrieveAllotmentReport, retrieveAllotmentsDockets, retrieveClients} from 'common/api/auth';
import allotmentColumns from 'common/columns/AllotmentReport.column';
import {AllotFlowTable} from 'components/AllotFlowExp';
import TableWithTabHoc from 'hocs/TableWithTab.hoc';
import {FORM_ELEMENT_TYPES} from '../../constants/formFields.constant';

import formItem from '../../hocs/formItem.hoc';
import { loadAPI } from 'common/helpers/api';
import { CSVLink } from 'react-csv';
import Chart from "react-apexcharts";

const ReportBeta = ({currentPage}) => {
  const [all, setAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [reqAllotments, setReqAllotments] = useState(null);
  const [clientName, setClientName] = useState(null);
  const [columnOptions, setColumnOptions] = useState([]);
  const [selectAllClients, setSelectAllClients] = useState(false);
  const [form] = Form.useForm();

  const {data: clients} = useAPI('/senderclients/', {}, false, true);

  const onSubmit = async (data) => {

    data.to = moment(data.to).endOf('date').format('YYYY-MM-DD HH:MM');
    data.from = moment(data.from).startOf('date').format('YYYY-MM-DD HH:MM');
    if(selectAllClients) data.cname = ['all']
    const {data: reportAl} = await loadAPI(`/allotment-report-beta/?cname=${data.cname}&columns=${data.column}&to=${data.to}&from=${data.from}`)
    console.log(reportAl)
    return

    setLoading(true);
    let reqC = null;
    clients.forEach((c) => {
      if (c.id === data.cname) reqC = c.name;
    });
    setClientName(reqC);
    data.to = moment(data.to).endOf('date').format('YYYY-MM-DD HH:MM');
    data.from = moment(data.from).startOf('date').format('YYYY-MM-DD HH:MM');

    const {data: csvD} = await loadAPI(`/allotment-reportsdownload/?cname=${data.cname}&to=${data.to}&from=${data.from}`)
    setCsvData(csvD)

    const {data: report} = await retrieveAllotmentReport(data);
    if (report) {
      setLoading(false);
      setReportData(report);
    }
  };

  useEffect(() => {
    if (reportData) {
      const reqD = reportData.map((alt) => ({
        transaction_no: alt.transaction_no,
        dispatch_date: alt.dispatch_date,
        warehouse_name: alt.send_from_warehouse,
        transport_by: alt.transport_by,
        is_delivered: alt.is_delivered,
      }));
      setReqAllotments(reqD);
      console.log(reqAllotments)
    }
  }, [reportData]);

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => {
        console.log(text, record)
        return index + 1
      }
    },
    ...allotmentColumns,
  ];

  const tabs = [
    {
      name: 'Allotment Dockets',
      key: 'Allotment Dockets',
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

  const handleFieldsChange = useCallback(
    (data) => {
      if (data) {
        if (data[0]) {
          if (data[0].name[0] === 'module') {
            if(form.getFieldValue('module') == 'Allotment') setColumnOptions(['id', 'flows', 'send_from_warehouse', 'transport_by', 'transaction_no', 'dispatch_date', 'is_delivered', 'document_available', 'model', 'driver_name', 'driver_number', 'lr_number', 'vehicle_number', 'freight_charges', 'vehicle_type', 'expected_delivery', 'remarks', 'sales_order', 'owner'])
            else if(form.getFieldValue('module') == 'Return') setColumnOptions(['transaction_no',	'is_delivered',	'flow',	'transaction_date',	'receiver_client',	'warehouse',	'kit_name',	'kit_type',	'quantity',	'id',	'kit_info',	'transport_by',	'product1',	'quantity1',	'product2',	'quantity2',	'product3',	'quantity3',	'product4',	'quantity4',	'product5',	'quantity5',	'product6',	'quantity6',	'POD'])
            else setColumnOptions([])
          }
        }
      }
    },
    [],
  );

  return (
    <>
      <Form onFinish={onSubmit} onFieldsChange={handleFieldsChange} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row>
          <Col offset={1} span={10}>
            {formItem({
              key: 'module',
              kwargs: {
                placeholder: 'Select',
              },
              others: {
                selectOptions: ['Allotment', 'Return']
              },
              type: FORM_ELEMENT_TYPES.SELECT,
              customLabel: 'Module',
            })}
          </Col>
          <Col offset={1} span={2}>
            {formItem({
              key: 'select_all_clients',
              kwargs: {
                onChange: (val) => {
                  setSelectAllClients(val);
                },
              },
              type: FORM_ELEMENT_TYPES.SWITCH,
              customLabel: 'All Clients',
            })}
          </Col>
          <Col offset={1} span={9}>
            {formItem({
              key: 'cname',
              kwargs: {
                placeholder: 'Select',
                mode: 'multiple',
                disabled: selectAllClients,
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
          <Col offset={1} span={22}>
            {formItem({
              key: 'column',
              kwargs: {
                placeholder: 'Select',
                mode:'multiple',
              },
              others: {
                selectOptions: columnOptions || []
              },
              type: FORM_ELEMENT_TYPES.SELECT,
              customLabel: 'Columns',
            })}
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={4}>
            {formItem({
              key: 'from',
              rules: [{required: true, message: 'Please select From date!'}],
              kwargs: {
                placeholder: 'Select',
                type: 'number',
              },
              type: FORM_ELEMENT_TYPES.DATE,
              others: null,
              customLabel: 'From',
            })}
          </Col>
          <Col offset={4} span={4}>
            {formItem({
              key: 'to',
              rules: [{required: true, message: 'Please select To date!'}],
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
        <Row align='center'>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form>
      <br />
      <TableWithTabHoc
        rowKey={(record) => record.id}
        tabs={tabs}
        size="middle"
        title="Allotment Dockets"
        hideRightButton
        ExtraButtonNextToTitle={csvData && DownloadCSVButton}
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

export default ReportBeta;
