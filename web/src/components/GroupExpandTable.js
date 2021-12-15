import React, { useEffect, useState } from 'react';
import {Table, Row, Col, Spin} from 'antd';
import { retrieveEmployeeList } from 'common/api/auth';
import { useSelector } from 'react-redux';
import {loadAPI} from 'common/helpers/api';

const cols = [
  {
    title: 'Sr. No.',
    key: 'no.',
    render: (record, text, index) => index + 1,
  },
  {
    title: 'Model',
    key: 'model',
    dataIndex: 'model',
  },
];

const cols2 = [
  {
    title: 'Sr. No.',
    key: 'no.',
    render: (record, text, index) => {
      console.log(record)
      return index + 1
    },
  },
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
];

const GroupExpandTable = ({loading, modules, employees}) => {

  const { companyId } = useSelector(s => s.user.userMeta)

  const [employeeData, setEmployeeData] = useState([])

  useEffect(() => {

    const fetchEmployee = async () => {
      
      const { data } = await loadAPI(`/employees/${companyId}/`)

      setEmployeeData(employees.map(employee => data.results.find(emp => emp.user === employee)))

    }

    fetchEmployee()

  }, [])

  return (
    <Spin spinning={loading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={14}>
          <Table dataSource={modules} columns={cols} size="small" pagination={false} />
        </Col>
        <Col span={10}>
          <Table dataSource={employeeData} columns={cols2} size="small" pagination={false} />
        </Col>
      </Row>
    </Spin>
  );
};

export default GroupExpandTable;
