import React from 'react';
import { Card, Row, Typography } from 'antd';
import './KPICard.scss';
import { LineChart, Line } from 'recharts';
import Chart from "react-apexcharts";

const { Title, Text } = Typography;

const KPICard = ({ title, count, change, icon, color, graphData }) => {

    const series = [
        {
          name: title,
          data: graphData || [1,5,7,3,3,8,3,22,13,4,11,2]
        }
      ];
      const options = {
        chart: {
          height: 350,
          type: "line",
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false,
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2,
          curve: "smooth"
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          }
         },  
         yaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          }
         },
         grid: {
           show: false,
         },
         tooltip: {
          enabled: true,
          style: {
            fontSize: '10px',
          },
         },
        colors: [color],
      };

    const data = [
        { name: 'Page A', uv: 300, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 450, pv: 2400, amt: 2400 },
        { name: 'Page C', uv: 400, pv: 2400, amt: 2400 },
        { name: 'Page D', uv: 300, pv: 2400, amt: 2400 },
        { name: 'Page D', uv: 325, pv: 2400, amt: 2400 },
        { name: 'Page D', uv: 350, pv: 2400, amt: 2400 },
        { name: 'Page D', uv: 400, pv: 2400, amt: 2400 },
        { name: 'Page D', uv: 350, pv: 2400, amt: 2400 },
        { name: 'Page D', uv: 450, pv: 2400, amt: 2400 },
        { name: 'Page D', uv: 400, pv: 2400, amt: 2400 },
        { name: 'Page D', uv: 500, pv: 2400, amt: 2400 },
    ];
    return (


        <Card className='data-card'>
            <div className='icon-card' style={{ background: color }}>
                <i className={icon} style={{ fontSize: 15 }} />
            </div>
            <Text type="secondary">{title}</Text>
            <Title style={{ marginTop: '5px', marginBottom: '0', fontWeight: '700' }} level={4}>{count}</Title>
            
            <Chart options={options} series={series} type="line" height={80} style={{margin: '-25px'}} />

            <hr className='line' />
            <Row>
                {/* {change >= 0
                    ?
                    <Text style={{ marginRight: '5px', fontWeight: '700' }} type="success">+{change}%</Text> :
                    <Text style={{ marginRight: '5px', fontWeight: '700' }} type="success">-{-change}%</Text>
                }
                <Text type="secondary">than last month</Text> */}
            </Row>
        </Card>
    );
}

export default KPICard;
