import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import {useAPI} from 'common/hooks/api';
import {Row, Col, Form, Button} from 'antd';
import {retrieveReturnReport} from 'common/api/auth';
import returnColumns from 'common/columns/Return.column';
import TableWithTabHoc from 'hocs/TableWithTab.hoc';
import {FORM_ELEMENT_TYPES} from '../../constants/formFields.constant';
import {RetKitTable} from '../RetKitExp';

import formItem from '../../hocs/formItem.hoc';
import { CSVLink } from 'react-csv';
import { loadAPI } from 'common/helpers/api';

const AllotmentReport = ({currentPage}) => {
  const [all, setAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [reqReturns, setReqAllotments] = useState(null);
  const [clientName, setClientName] = useState(null);
  const [form] = Form.useForm();

  const [client, setClient] = useState('');

  const {data: clients} = useAPI('/receiverclients/', {}, false, true);

  const onSubmit = async (data) => {
    setLoading(true);

    let reqC = null;
    clients.forEach((c) => {
      if (c.id === data.cname) reqC = c.name;
    });
    setClientName(reqC);

    data.to = moment(data.to).endOf('date').format('YYYY-MM-DD HH:MM');
    data.from = moment(data.from).startOf('date').format('YYYY-MM-DD HH:MM');

    const {data: csvD} = await loadAPI(`/return-reportsdownload/?cname=${data.cname}&to=${data.to}&from=${data.from}`)
    setCsvData(csvD)

    const {data: report} = await retrieveReturnReport(data);
    if (report) {
      setLoading(false);
      setReportData(report);
    }
  };

  useEffect(() => {
    if (reportData) {
      const reqD = reportData.map((alt) => ({
        transaction_no: alt.transaction_no,
        transaction_date: alt.transaction_date,
        warehouse: alt.warehouse,
        transport_by: alt.transport_by,
        is_delivered: alt.is_delivered,
        receiver_client: alt.receiver_client,
      }));
      setReqAllotments(reqD);
    }
  }, [reportData]);

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => index + 1,
    },
    ...returnColumns,
  ];

  const tabs = [
    {
      name: 'Return Dockets',
      key: 'Return Dockets',
      data: reqReturns || [],
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
        <Row>
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
        </Row>
        <Row>
          <Col span={3}>
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
          <Col span={4} />
          <Col span={3}>
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
        <Row>
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
        title="Return Dockets"
        hideRightButton
        ExtraButtonNextToTitle={csvData && DownloadCSVButton}
        // expandHandleKey="kits"
        // ExpandBody={RetKitTable}
        // expandParams={{loading}}
        // csvdata={csvData}
        // csvname={'Allotments' + clientName + '.csv'}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(AllotmentReport);
