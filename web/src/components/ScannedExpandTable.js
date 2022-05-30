/* eslint-disable object-curly-spacing */
import React from 'react';
import { Table, Row, Col, } from 'antd';
import { useAPI } from 'common/hooks/api';
import _ from 'lodash';
const cols = [
    {
        title: 'Serials',
        key: 'serials',
        render: (text, record) => {
            console.log(record)
            return  record.serial
            
            
        },
    },
  
];

const ExpandTable = (props) => {
    console.log(props, "propssssssssssssssss")
    const   {serials = [] } = props

    // const { data:serials ,loading } = useAPI(`/rfid-dump/?id=${props.id}`);

        return (
            <Row align="start" gutter={24} >
                <Col span={12}>
                    <Table
                        dataSource={serials }
                        columns={cols}
                        size="small"
                        pagination={false}
                    />
                </Col>
              
            </Row>
        );
    // }
};

export default ExpandTable;
