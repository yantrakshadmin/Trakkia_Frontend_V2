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

const GroupExpandTable = ({loading, modules, employees, accessible_companies}) => {

  const { companyId } = useSelector(s => s.user.userMeta)

  const [employeeData, setEmployeeData] = useState([])
  const [companyData, setCompanyData] = useState([])

  useEffect(() => {

    const fetchEmployee = async () => {
      
      const { data } = await loadAPI(`/employees/${companyId}/`)

      setEmployeeData(employees.map(employee => data.results.find(emp => emp.user === employee)))

    }

    const fetchCompany = async () => {
      
      const { data } = await loadAPI('/company-list/')

      setCompanyData(accessible_companies.map(company => data.results.find(comp => comp.id === company)))

    }

    fetchEmployee()
    fetchCompany()

  }, [])

  return (
    <Spin spinning={loading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={8}>
          <Table dataSource={modules} columns={cols} size="small" pagination={false} />
        </Col>
        <Col span={8}>
          <Table dataSource={employeeData} columns={cols2} size="small" pagination={false} />
        </Col>
        <Col span={8}>
          <Table dataSource={companyData} columns={cols2} size="small" pagination={false} />
        </Col>
      </Row>
    </Spin>
  );
};

export default GroupExpandTable;
