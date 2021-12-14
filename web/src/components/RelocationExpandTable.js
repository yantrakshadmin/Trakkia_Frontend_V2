import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const cols1 = [
  {
    title: 'Kit Name',
    key: 'kit',
    dataIndex: 'kit',
  },
  {
    title: 'Quantity',
    key: 'quantity',
    dataIndex: 'quantity',
  },
];

const cols2 = [
    {
      title: 'Product Name',
      key: 'product',
      dataIndex: 'product',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },
  ];

const ExpandTable = (props) => {

  const {data, loading} = useAPI(`relocations-exp/?id=${props.id}`)

  if (loading) {
    return <Spin spinning={true} />;
  } else {
    return (
      <Row align="center" gutter={20} style={{margin: '3vh'}}>
        <Col span={21}>
            {data[0].items.length === 0 ? 
            
                <Table
                    dataSource={data[0]?.items_kits || []}
                    columns={cols1}
                    size="small"
                    pagination={false}
                />
                :
                <Table
                    dataSource={data[0]?.items || []}
                    columns={cols2}
                    size="small"
                    pagination={false}
                />
            }
        </Col>
      </Row>
    );
  }
};

export default ExpandTable;
