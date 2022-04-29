import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Modal,
  Space,
  Popconfirm,
  Input,
  Typography,
  Button,
  Popover,
  notification,
} from 'antd';
import { faTruckLoading, faBarcode, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import allotmentColumns from 'common/columns/Allotment.column';
import { DeliveredForm } from 'forms/delivered.form';
import { AllotmentMainForm } from 'forms/allotmentMain.form';
import AllotmentForm from 'forms/allotment.form';
import { connect } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import { deleteAllotment } from 'common/api/auth';
import { loadAPI } from 'common/helpers/api';
import { DEFAULT_BASE_URL } from 'common/constants/enviroment';
import { useAPI } from 'common/hooks/api';
import { Link, useNavigate } from '@reach/router';
import Delete from 'icons/Delete';
import Edit from 'icons/Edit';
import Download from 'icons/Download';
import Delivery from 'icons/Delivery';
import Document from 'icons/Document';
import { BarcodeAllotmentDocket } from 'components/barcodeAllotmentDocket';
import { GetUniqueValue } from 'common/helpers/getUniqueValues';
import { DEFAULT_PASSWORD } from 'common/constants/passwords';
import NoPermissionAlert from 'components/NoPermissionAlert';
import FilesViewModal from '../../components/FilesViewModal';

import ExpandTable from '../../components/AllotmentsExpandTable';

import { deleteHOC } from '../../hocs/deleteHoc';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import { LineGraph } from '../../components/graphComponent/lineGraph';
import DeleteWithPassword from '../../components/DeleteWithPassword';
import { yantraColors } from '../../helpers/yantraColors';
import KPICard from '../../components/Dashboard/KPICard'
import moment from 'moment';


const { Search } = Input;
const { Title } = Typography;
const AllotmentDocketsScreen = ({ currentPage }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);
  const [reqData, setReqData] = useState([]);
  const [TN, setTN] = useState(null);
  const [visible, setVisible] = useState(false);
  const { data: allotments, loading, reload: reloadFull, status } = useAPI('/allotments-table/');
  // const { data: count } = useAPI('/mr-count/', {});
  const [altId, setAltId] = useState(null);
  const { filteredData, reload } = useTableSearch({
    searchVal,
    reqData,
    usePaginated: false
  });

  useEffect(() => {
    if (allotments) {
      const reqD = (allotments.results || []).map((alt) => ({
        id: alt.id,
        transaction_no: alt.transaction_no,
        parent_name: alt.sales_order.owner,
        parent_id: alt.sales_order.pk,
        dispatch_date: alt.dispatch_date,
        warehouse_name: alt.send_from_warehouse,
        model: alt.model,
        vehicle_number: alt.vehicle_number,
        transport_by: alt.transport_by,
        is_delivered: alt.is_delivered,
        document_available: alt.document_available,
      }));
      setReqData(reqD);
    }
  }, [allotments]);
  console.log(allotments, "allotmentss");

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: 'Transaction No.',
      key: 'transaction_no',
      dataIndex: 'transaction_no',
      sorter: (a, b) => a.transaction_no - b.transaction_no,
    },
    ...allotmentColumns,
    {
      title: 'Parent Company',
      key: 'parent_name',
      dataIndex: 'parent_name',
      filters: GetUniqueValue(filteredData || [], 'parent_name'),
      onFilter: (value, record) => record.parent_name === value,
    },
    {
      title: 'Docket',
      key: 'docket',
      render: (text, record) => {
        return (
          <div className='row align-center justify-evenly'>
            <a href={`../docket/${record.id}`} target='_blank' rel='noreferrer'>
              <Download />
            </a>
            <FontAwesomeIcon
              className='mx-2 icon-bg'
              icon={faBarcode}
              onClick={(e) => {
                e.stopPropagation();
                setTN(record.transaction_no);
                setAltId(record.id);
                setVisible(true);
              }}
              style={{ fontSize: 15, margin:'auto 5px' }}
            />
          </div>
        );
      },
    },
    {
      title: 'Action',
      key: 'operation',
      width: '9vw',
      render: (text, record) => (
        <div className='row justify-evenly'>
          {/* <a */}
          {/*  href={`${DEFAULT_BASE_URL  }/delivered-docket/?pk=${record.id}`} */}
          {/*  target='_blank' */}
          {/*  rel='noopener noreferrer' */}
          {/* > */}
          <FilesViewModal
            documentAvail={!!record.document_available}
            getDocuments={async () => {
              const { data: req } = await loadAPI(
                `/delivered-docket/?pk=${record.id}`,
                {},
              );
              if (req)
                if (req.document) {
                  return [{ document: req.document, span: 24 }];
                }
              try {
                if (req.pod.length > 0) {
                  const d = [];
                  req.pod.forEach((f) => {
                    d.push({ document: f.document, span: req.pod.length > 1 ? 12 : 24 });
                  });
                  return d;
                }
              } catch (err) {}
            }}
          />
          {/* <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            // disabled={!record.document}
            onClick={async (e) => {
              e.stopPropagation();
              const {data: req} = await loadAPI(
                `${DEFAULT_BASE_URL}/delivered-docket/?pk=${record.id}`,
                {},
              );
              if (req)
                if (req.document) {
                  window.open(req.document);
                }
              try {
                if (req.pod.length > 0) {
                  req.pod.forEach((f) => {
                    window.open(f.document);
                  });
                }
              } catch (err) {}
            }}>
            <FontAwesomeIcon
              icon={record.is_delivered ? faEye : faEyeSlash}
              style={{fontSize: 20, color: yantraColors['primary']}}
            />
          </Button> */}
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setTN(record.transaction_no);
              setDeliveryId(record.id);
              e.stopPropagation();
            }}
            disabled={!!(record.is_delivered)}>
            <Delivery color={record.is_delivered ? '#7CFC00' : null} />
          </Button>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              // setEditingId(record.id);
              e.stopPropagation();
            }}>
            <Link to='../edit-allotment/' state={{ id: record.parent_id, editId: record.id }} key={record.id}>
              <Edit />
            </Link>
          </Button>
          {/* <Popconfirm
            title="Confirm Delete"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteAllotment,
              success: 'Deleted Allotment Successfully',
              failure: 'Error in deleting Allotment',
            })}>
            <Button
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '1px',
              }}
              onClick={(e) => e.stopPropagation()}>
              <Delete />
            </Button>
          </Popconfirm> */}
          <DeleteWithPassword
            password={DEFAULT_PASSWORD}
            deleteHOC={deleteHOC({
              record,
              reloadFull,
              api: deleteAllotment,
              success: 'Deleted Allotment successfully',
              failure: 'Error in deleting Allotment',
            })}
          />
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Allotment Dockets',
      key: 'allAllotmentDockets',
      data: filteredData,
      columns,
      loading,
    },
  ];

  const cancelEditing = () => {
    setEditingId(null);
    setDeliveryId(null);
  };

  const [KPIData, setKPIData] = useState({
    materialRequest: {
      title: 'Material Request',
      graphData: [0,0,0,0,0,0,0,0,0,0,0,0],
      count: 0,
      change: 3,
      icon: 'fas fa-notes-medical',
      color: '#1E88E5'
    },
    totalOrders: {
      title: 'Total Orders',
      graphData: [0,0,0,0,0,0,0,0,0,0,0,0],
      count: 0,
      change: 3,
      icon: 'fas fa-user',
      color: '#C62828'
    },
    deliveredOrders: {
      title: 'Delivered Orders',
      graphData: [0,0,0,0,0,0,0,0,0,0,0,0],
      count: 0,
      change: 3,
      icon: 'fas fa-home',
      color: '#00C853'
    },
    pendingOrders: {
      title: 'Pending Orders',
      graphData: [0,0,0,0,0,0,0,0,0,0,0,0],
      count: 0,
      change: 3,
      icon: 'fas fa-user-plus',
      color: '#212121'
    }
  });

  useEffect(() => {

    let delivered = 0, pending = 0

    console.log(reqData)

    let totalGraph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let deliveredGraph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let pendingGraph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    (reqData.results || []).forEach((d) => {
      if(moment(d.dispatch_date).year() === moment().year()) { 
        totalGraph[moment(d.dispatch_date).month()]++
        if(d.is_delivered){
          delivered++
          deliveredGraph[moment(d.dispatch_date).month()]++
        } else {
          pending++
          pendingGraph[moment(d.dispatch_date).month()]++
        }
      }
    })

    setKPIData({...KPIData, totalOrders: {...KPIData.totalOrders, count: delivered+pending, graphData: totalGraph}, deliveredOrders: {...KPIData.deliveredOrders, count: delivered, graphData: deliveredGraph}, pendingOrders: {...KPIData.pendingOrders, count: pending, graphData: pendingGraph}})

  }, [reqData])

  return (
    <NoPermissionAlert hasPermission={status !== 403}>

      <Row gutter={10} style={{ margin: '5px', marginTop: '20px' }}>
         <Col span={6}>
          <KPICard {...KPIData.materialRequest} />
        </Col>
        <Col span={6}>
          <KPICard {...KPIData.totalOrders} />
        </Col>
        <Col span={6}>
          <KPICard {...KPIData.deliveredOrders} />
        </Col>
        <Col span={6}>
          <KPICard {...KPIData.pendingOrders} />
        </Col>
      </Row>
      <br />
      <Modal
        maskClosable={false}
        visible={visible}
        destroyOnClose
        style={{ minWidth: `80vw` }}
        title={TN}
        onCancel={(e) => {
          setTN(null);
          setDeliveryId(null);
          setVisible(false);
          e.stopPropagation();
        }}
        footer={null}>
        {visible ? (
          <BarcodeAllotmentDocket transaction={TN} allot={altId} setVisible={setVisible} />
        ) : null}
      </Modal>
      <Row>
        <Col span={19}>
          <Title level={3}>Allotment Dockets</Title>
        </Col>
        <Col span={5}>
          <div style={{ width: '15vw', display: 'flex', alignItems: 'flex-end' }}>
            <Search
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder='Search'
              enterButton
            />
          </div>
        </Col>
      </Row>

      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reloadFull}
        tabs={tabs}
        size='middle'
        title=''
        modalBody={deliveryId ? DeliveredForm : AllotmentForm}
        modalWidth={60}
        ExpandBody={ExpandTable}
        editingId={editingId || deliveryId}
        formParams={{ transaction_no: TN }}
        cancelEditing={cancelEditing}
        hideRightButton
        totalRows={allotments?.count}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(AllotmentDocketsScreen);
