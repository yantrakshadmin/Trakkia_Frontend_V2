import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const cols = [
  {
    title: 'Item Name',
    key: 'item',
    dataIndex: 'item',
  },
  {
    title: 'Item Quantity',
    key: 'item_quantity',
    dataIndex: 'item_quantity',
  },
  {
    title: 'Item Price',
    key: 'item_price',
    dataIndex: 'item_price',
  },
];

const ExpandTable = (props) => {

  const {data, loading} = useAPI(`purchaseorders-exp/?id=${props.id}`)

  if (loading) {
    return <Spin spinning={true} />;
  } else {
    return (
      <Row align="center" gutter={20} style={{margin: '3vh'}}>
        <Col span={21}>
          <Table
            dataSource={data[0]?.items || []}
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
