import React from 'react';
import { Card, Row, Typography } from 'antd';
import './KPICard.scss';
import { LineChart, Line } from 'recharts';

const { Title, Text } = Typography;

const KPICard = ({ title, count, change, icon, color, width, height }) => {

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
            <Title style={{ marginTop: '5px', marginBottom: '20px', fontWeight: '700' }} level={4}>{count}</Title>
            <hr className='line' />
            <div className='chart-position'>
                <LineChart width={width || 200} height={height || 80} data={data}>
                    <Line type='monotone' dataKey={"uv"} stroke='#a8ddec' strokeWidth={4} />
                </LineChart>
              
            </div>
            <Row>
                {change >= 0
                    ?
                    <Text style={{ marginRight: '5px', fontWeight: '700' }} type="success">+{change}%</Text> :
                    <Text style={{ marginRight: '5px', fontWeight: '700' }} type="success">-{-change}%</Text>
                }
                <Text type="secondary">than last month</Text>
            </Row>
        </Card>
    );
}

export default KPICard;
