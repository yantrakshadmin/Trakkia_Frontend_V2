import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const cols = [
  {
    title: 'Kit Name',
    key: 'kit',
    dataIndex: 'kit',
  },
  {
    title: 'Kit Quantity',
    key: 'quantity_kit',
    dataIndex: 'quantity_kit',
  },
  {
    title: 'Parts Quantity',
    key: 'quantity_parts',
    dataIndex: 'quantity_kit',
  },
];

const ExpandTable = (props) => {

  const {data, loading} = useAPI(`outwards-exp/?id=${props.id}`)

  if (loading) {
    return <Spin spinning={true} />;
  } else {
    return (
      <Row align="center" gutter={20} style={{margin: '3vh'}}>
        <Col span={21}>
          <Table
            dataSource={data[0]?.kits || []}
            columns={cols}
            size="small"
            pagination={false}
          />
        </Col>
      </Row>
    );
  }
};

export default ExpandTable;
