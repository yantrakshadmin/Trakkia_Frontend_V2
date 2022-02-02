import { Card, Row } from 'antd';
import React from 'react';
import { Typography } from 'antd';
import './DataCard.scss'

const { Title, Text } = Typography;

const DataCard = () => (
    <Card className='data-card'>
        <div className='icon-card'>
            <i className="fas fa-user-plus" style={{fontSize: 15}} />
        </div>
        <Text type="secondary">Today's user</Text>
        <Title style={{marginTop: '5px', marginBottom: '20px', fontWeight: '700'}} level={4}>2300</Title>
        <hr className='line' />
        <Row>
            <Text style={{marginRight: '5px', fontWeight: '700'}} type="success">+3%</Text>
            <Text type="secondary">than last month</Text>
        </Row>
    </Card>
);

export default DataCard;
