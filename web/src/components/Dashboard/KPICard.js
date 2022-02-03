import { Card, Row } from 'antd';
import React from 'react';
import { Typography } from 'antd';
import './KPICard.scss'

const { Title, Text } = Typography;

const KPICard = ({title, count, change, icon, color}) => (
    <Card className='data-card'>
        <div className='icon-card' style={{background: color}}>
            <i className={icon} style={{fontSize: 15}} />
        </div>
        <Text type="secondary">{title}</Text>
        <Title style={{marginTop: '5px', marginBottom: '20px', fontWeight: '700'}} level={4}>{count}</Title>
        <hr className='line' />
        <Row>
            {change >= 0 
            ? 
            <Text style={{marginRight: '5px', fontWeight: '700'}} type="success">+{change}%</Text> :
            <Text style={{marginRight: '5px', fontWeight: '700'}} type="success">-{-change}%</Text>
            }
            <Text type="secondary">than last month</Text>
        </Row>
    </Card>
);

export default KPICard;
