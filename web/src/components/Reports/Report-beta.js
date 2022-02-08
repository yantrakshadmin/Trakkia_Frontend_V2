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
  const [categories, setCategories] = useState(null);
  const [seriesData, setSeriesData] = useState(null);
  const [form] = Form.useForm();

  const {data: clients} = useAPI('/senderclients/', {}, false, true);

  const onSubmit = async (data) => {

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

  console.log(reqAllotments)

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

  useEffect(() => {
    if(reqAllotments){
      let temp = reqAllotments.map((d) => d.dispatch_date)
      temp.sort(function(a, b) { 
        return new Date(a) - new Date(b);  
      })
      temp = temp.filter((v, i, a) => a.indexOf(v) === i);
      setCategories(temp.map((t) => moment(t).format('DD-MM-YY')))

      let arr = []
      for(let i = 0; i < temp.length; i++){

        let cnt = 0;
        reqAllotments.forEach((x) => {
          if(x.dispatch_date == temp[i]) cnt++
        });

        arr.push(cnt)

      }

      console.log(arr)

      setSeriesData(arr)

    }
  }, [reqAllotments])

  const chartData = {
    height: 250,
    type: 'bar',
    options: {
      title: {
        text: 'Allotment Stats',
        align: 'left',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        },
       },
        chart: {
            id: 'bar-chart',
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%'
            }
        },
        xaxis: {
            type: 'category',
            categories: categories || [moment().format('DD-MM-YY')],
            tickAmount: 20,
            labels: {
              show: true,
              rotate: 0
            },
        },
        legend: {
            show: true,
            fontSize: '12px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5,
                fillColors: ['#1565C0'],
            },
            itemMargin: {
                horizontal: 10,
                vertical: 2
            }
        },
        fill: {
          colors: ['#1565C0'],
          type: 'solid'
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: true
        }
    },
    series: [
        {
            name: 'Allotments',
            data: seriesData || []
        }
    ]
  };

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
      <Chart
        options={chartData.options}
        series={chartData.series}
        type={chartData.type}
        height={chartData.height}
      />
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
