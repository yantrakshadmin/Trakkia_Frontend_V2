import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import { Table } from 'react-bootstrap';


import moment from 'moment';

import { retrieveOutwardDocketEmp } from 'common/api/auth';

import '../Docket/docket.styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from '@reach/router';

const {Title} = Typography;

const OutwardDocket = ({location, match}) => {
  const [allotment, setAllotment] = useState(null);
  const [total, setTotal] = useState(0);
  const param = useParams();
  console.log(param, "ggggg") ;

  useEffect(() => {
    const fetchAllotment = async () => {
      if (location.state) {
      
        if (location.state.id) {
          const {data} = await retrieveOutwardDocketEmp(location.state.id) ;
          console.log(data, 'ye wala');
          if (data) setAllotment(data);
        }
      }
      else{
        const {data} = await retrieveOutwardDocketEmp(param.id) ;
          console.log(data, 'ye wala');
          if (data) setAllotment(data);
        
      }
    };
    fetchAllotment();
  }, [location]);


  useEffect(() => {
    const calcTotal = () => {
      let tot = 0;
      if (allotment) {
        allotment.flows.map((flow) => {
          const alloted = flow.alloted_quantity;
          flow.kit.products.map((prod) => {
            tot += alloted * prod.quantity * prod.product.priceperunit;
            return null;
          });
          return null;
        });
      }
      setTotal(tot);
    };
    // calcTotal();
  }, [allotment]);

  const a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen ',
  ];
  const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = `000000000${num}`.substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = '';
    str += n[1] != 0 ? `${a[Number(n[1])] || `${b[n[1][0]]} ${a[n[1][1]]}`}crore ` : '';
    str += n[2] != 0 ? `${a[Number(n[2])] || `${b[n[2][0]]} ${a[n[2][1]]}`}lakh ` : '';
    str += n[3] != 0 ? `${a[Number(n[3])] || `${b[n[3][0]]} ${a[n[3][1]]}`}thousand ` : '';
    str += n[4] != 0 ? `${a[Number(n[4])] || `${b[n[4][0]]} ${a[n[4][1]]}`}hundred ` : '';
    str +=
      n[5] != 0
        ? `${(str != '' ? 'and ' : '') + (a[Number(n[5])] || `${b[n[5][0]]} ${a[n[5][1]]}`)}only `
        : '';
    return str;
  }

  if (allotment) {
    console.log(allotment, 'allotment');
    return (
      <div className="container-docket">
        <div className="header-docket">
          <div className="logo-docket">
            <img src={`${process.env.PUBLIC_URL}/home-logo.png`} alt="Yantraksh" />
          </div>
          <div className="heading-docket">
            <Title level={2} style={{fontWeight: 'bold'}}>
              DELIVERY CHALLAN
            </Title>
          </div>
        </div>
        <hr />
        <Row className="meta-docket">
          <Col span={17} className="left">
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transaction No. : </p>
                <p style={{display: 'inline'}}>{allotment.transaction_no}</p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transaction Date : </p>
                <p style={{display: 'inline'}}>
                  {allotment.transaction_date
                    ? moment(allotment.transaction_date).format('DD/MM/YYYY')
                    : 0}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Dispatch Date : </p>
                <p style={{display: 'inline'}}>
                  {allotment.dispatch_date
                    ? moment(allotment.dispatch_date).format('DD/MM/YYYY')
                    : 0}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transaction Type : Outward</p>
              </Col>
            </Row>
            <Row>
              {/* <Col span={22}> */}
              {/*  <p style={{ display: 'inline', fontWeight: 'bold' }}> */}
              {/*    KIT ID : &nbsp; */}
              {/*    {allotment.flows.map((flow, idx) => { */}
              {/*      if (idx === allotment.flows.length - 1) return flow.kit.kit_name.slice(3); */}
              {/*      return `${flow.kit.kit_name.slice(3)  }/`; */}
              {/*    })} */}
              {/*  </p> */}
              {/* </Col> */}
            </Row>
          </Col>
          <Col
            span={7}
            className="right"
            style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
            }}>
            <p>
              [ &nbsp;] Original for Consignee <br /> [ &nbsp;] Duplicate for Transporter <br />[
              &nbsp;] Triplicate for Consignor
            </p>
          </Col>
        </Row>
        <div className="main-data-docket">
          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Sender's Name : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {allotment.owner.company.name}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Receiver's Name : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {allotment.sending_location.name}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Sender's Address : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {`${allotment.owner.company.address}`}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Receiver's Address : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {`${allotment.sending_location.address}`}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>GST : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {allotment.owner.company.gstin}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>GST : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {allotment.sending_location.gstin}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Row className="table-docket">
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Kit ID</th>
                <th>Kit Name</th>
                <th>Kit Quantity</th>
                <th>Quantity Parts</th>
                <th>Kit Info</th>
                <th>Kit Type</th>
                <th>Product Name</th>
                <th>Product Code</th>
                <th>Product Quantity</th>
              </tr>
            </thead>
            <tbody>
              {[...allotment.kits].map((kit) => {
                return (
                  <tr>
                    <td>{kit.kit.id}</td>
                    <td>{kit.kit.kit_name}</td>
                    <td>{kit.quantity_kit}</td>
                    <td>{kit.quantity_parts}</td>
                    <td>{kit.kit.kit_info}</td>
                    <td>{kit.kit.kit_type}</td>
                    <td>
                      {kit.kit.products.map((prod) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <p>{prod.product.name}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {kit.kit.products.map((prod) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <p>{prod.product.short_code}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {kit.kit.products.map((prod) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <p>{prod.quantity * kit.quantity_kit}</p>
                        </div>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
        <Row className="final-docket">
          <Col span={12}>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Invoice Number : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>
                  {allotment.invoice_number}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transporter Name : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>
                  {allotment.transporter_name?.name}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Driver Name : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>{allotment.driver_name}</p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Driver No. : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>{allotment.driver_number}</p>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Vehicle No. : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>
                  {allotment.vehicle_number}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <table style={{pageBreakInside: 'avoid'}}>
          <div className="declaration">
            <p style={{fontWeight: 'bold', display: 'inline'}}>Declaration : </p>
            <p style={{display: 'inline'}}>
              The packaging products given on hire shall always remain the property of Yantraksh
              Logistics Private Limited and shall not be used for the purpose otherwise agreed upon.
              The same shall be returned at the address notified by Yantraksh Logistics Private
              Limited.
            </p>
            <br />
            <p style={{fontWeight: 'bold', display: 'inline'}}>Note : </p>
            <p style={{display: 'inline'}}>
              {' '}
              No E-Way Bill is required for Empty Cargo Containers. Refer, Rule 14 of Central Goods
              and Services Tax (Second Amendment) Rules, 2018.
            </p>
            {allotment.remarks ? (
              <>
                <br />
                <p style={{fontWeight: 'bold', display: 'inline'}}>Remarks : </p>
                <p style={{display: 'inline'}}>{allotment.remarks}</p>
              </>
            ) : null}
          </div>
        </table>

        <hr />
        <table style={{pageBreakInside: 'avoid', width: '90vw'}}>
          <div className="footer">
            <Row>
              <Col span={1} />
              <Col span={11} style={{fontWeight: 'bold'}}>
                For Sending Location :
              </Col>
              <Col span={6} />
              <Col span={6} style={{fontWeight: 'bold'}}>
                For Receiving Location :
              </Col>
            </Row>
            <br /> <br />
            <br />
            <Row>
              <Col span={1} />
              <Col span={11} style={{fontWeight: 'bold'}}>
                Authorized Signature
              </Col>
              <Col span={6} />
              <Col span={6} style={{fontWeight: 'bold'}}>
                Authorized Signature
              </Col>
            </Row>
            <Row>
              <Col span={1} />
              <Col span={11}>(Company Seal & Signature)</Col>
              <Col span={6} />
              <Col span={6}>(Company Seal & Signature)</Col>
            </Row>
            <br /> <br />
            <div
              style={{
                display: 'flex',
                justifyContent: 'Center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '0',
                margin: '0',
              }}>
              <p style={{fontSize: '26px', color: '#034efc'}}>
                Yantraksh Logistics Private Limited
              </p>
              <p>CIN No: U74999GJ2018PTC105552</p>
            </div>
          </div>
        </table>
      </div>
    );
  }
  return <Spin spinning style={{position: 'absolute', marginLeft: '49vw', marginTop: '49vh'}} />;
};

export default OutwardDocket;
