import React, { useState, useEffect } from 'react';
import materialEmployeecolumns from 'common/columns/materialEmployee.column';
import { Link } from '@reach/router';
import {
  Button,
  Input,
  Modal,
  notification,
  Popover,
  Space,
  Typography,
} from 'antd';
import { connect, useSelector } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import { deleteAddMr, retrieveEmployeeMrsEfficient } from 'common/api/auth';
import moment from 'moment';
import { ALLOTMENT_DOCKET_PASSWORD ,DEFAULT_PASSWORD } from 'common/constants/passwords';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { loadAPI } from 'common/helpers/api';
import { useAPI } from 'common/hooks/api';
import { mergeArray, statusCheck } from 'common/helpers/mrHelper';
import NoPermissionAlert from 'components/NoPermissionAlert';
import ExpandTable from '../../components/MaterialRequestsTable';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import { AddMaterialRequestForm } from '../../forms/addMaterialRequest.form';
import Edit from '../../icons/Edit';
import { deleteHOC } from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import { ActionsPopover } from '../../components/ActionsPopover';
import { MRRejectionForm } from '../../forms/MRRejection.form';
import DeleteWithPassword from '../../components/DeleteWithPassword';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const { Search } = Input;
const { Title } = Typography;

const ReceiverClientEmployeeScreen = ({ currentPage }) => {
   
  const { user } = useSelector(s => s);
  const {userMeta} = user;
  const { viewType } = userMeta

  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [rejectionId, setRejectionId] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [materialReqVisible, setMaterialReqVisible] = useState(false);
  const [rejectionVisible, setRejectionVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverEditVisible, setPopoverEditVisible] = useState(false);
  const { filteredData, loading, reload, hasPermission } = useTableSearch({
    searchVal,
    retrieve: retrieveEmployeeMrsEfficient,
    useCompanyIdAndViewType: true
  });

  const [userData, setUserData] = useState({ password: '' });

  const PasswordPopUp = (
    <Space direction='vertical'>
      <Input.Password
        value={userData.password}
        onChange={(e) => {
          setUserData({ ...userData, password: e.target.value });
        }}
        placeholder='input password'
        iconRender={(show) => (show ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Button
        onClick={() => {
          if (userData.password === ALLOTMENT_DOCKET_PASSWORD) {
            setUserData({ password: '' });
            if (editingId) {
              setPopoverEditVisible(false);
            } else {
              setPopoverVisible(false);
            }
            setMaterialReqVisible(true);
          } else {
            notification.error({
              message: 'Invalid Password',
            });
          }
        }}>
        Proceed
      </Button>
    </Space>
  );
  const getFilterOptions = () => {
    const arr = [...new Set((filteredData || []).map((item) => item.owner))];
    return arr.map((item) => ({ text: item, value: item }));
  };
  useEffect(() => {
    if (filteredData) {
      // const csvd = [];
      // filteredData.forEach((d) => {
      //   const temp = {
      //     ...d,
      //     owner: d.owner.first_name + d.owner.last_name,
      //     delivery_required_on: d.delivery_required_on.slice(0, 10),
      //   };
      //   delete temp.flows;
      //   csvd.push(temp);
      //   d.flows.forEach((flo) => {
      //     csvd.push({
      //       FlowName: flo.flow.flow_name,
      //       KitName: flo.kit.kit_name,
      //       Quantity: flo.quantity,
      //     });
      //   });
      // });
      setFilterOptions(getFilterOptions());
      // setCsvData(csvd);
    }
  }, [filteredData]);

  // const columnDefs = [
  //   { headerName: 'ID', field: "id", filter: true, sortable: true },
  //   { headerName: 'Linked', field: "linked", filter: true, sortable: true },
  //   { headerName: 'Owner', field: "owner", filter: true, sortable: true },
  //   { headerName: 'Raised By', field: "raised_by", filter: true, sortable: true },
  //   { headerName: 'Reason', field: "reason", filter: true, sortable: true },
  //   { headerName: 'Remarks', field: "remarks", filter: true, sortable: true },
  //   { headerName: 'Delivery Required On', field: "delivery_required_on", filter: true, sortable: true },
  //   { 
  //     headerName: 'Action', 
  //     field: "operation", 
  //     cellRenderer: params => 
      
  //     <div className='row justify-evenly'>
  //     <Button
  //       style={{
  //         backgroundColor: 'transparent',
  //         border: 'none',
  //         boxShadow: 'none',
  //         padding: '1px',
  //       }}
  //       onClick={(e) => {
  //         setEditingId(params.data.id);
  //         setPopoverEditVisible(true);
  //         e.stopPropagation();
  //       }}>
  //       <Edit />
  //     </Button>
  //     <DeleteWithPassword
  //       password={DEFAULT_PASSWORD}
  //       deleteHOC={deleteHOC({
  //         record: params.data,
  //         reload,
  //         api: deleteAddMr,
  //         success: 'Deleted MR successfully',
  //         failure: 'Error in deleting MR',
  //       })}
  //     />
  //     {/* <Popconfirm
  //       title="Confirm Delete"
  //       onCancel={(e) => e.stopPropagation()}
  //       onConfirm={deleteHOC({
  //         record,
  //         reload,
  //         api: deleteAddMr,
  //         success: 'Deleted Material Request Successfully',
  //         failure: 'Error in deleting Material Request',
  //       })}>
  //       <Button
  //         style={{
  //           backgroundColor: 'transparent',
  //           boxShadow: 'none',
  //           border: 'none',
  //           padding: '1px',
  //         }}
  //         onClick={(e) => e.stopPropagation()}>
  //         <Delete />
  //       </Button>
  //     </Popconfirm> */}
  //   </div>
  //   },
  // ];  

  // const rowData = [
  //   {make: "Toyota", model: "Celica", price: 35000},
  //   {make: "Ford", model: "Mondeo", price: 32000},
  //   {make: "Porsche", model: "Boxter", price: 72000}
  // ];

  const columns = [
    ...materialEmployeecolumns,
    {
      title: 'Linked',
      key: 'linked',
      filters: filterOptions || [],
      onFilter: (value, record) => record.linked === value,
      render: (text, record) => {
        return record.linked;
      },
    },
    {
      title: 'Owner',
      key: 'owner',
      filters: filterOptions || [],
      onFilter: (value, record) => record.owner === value,
      render: (text, record) => {
        return record.owner;
      },
    },
    {
      title: 'Delivery Required On',
      key: 'delivery_required_on',
      sorter: (a, b) =>
        moment(a.delivery_required_on).unix() - moment(b.delivery_required_on).unix(),
      render: (text, record) => {
        return moment(record.delivery_required_on).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Status',
      key: 'status',
      className: 'align-center',
      filters: [
        {
          text: 'Allocated',
          value: 'Allocated',
        },
        {
          text: 'Pending',
          value: 'Pending',
        },
        {
          text: 'Rejected',
          value: 'Rejected',
        },
      ],
      onFilter: (value, record) => statusCheck(record.is_allocated, record.is_rejected) === value,
      render: (text, record) => {
        if (record.is_allocated && !record.is_rejected)
          return (
            <Button
              type='primary'
              style={{
                backgroundColor: '#00FF00',
                outline: 'none',
                border: 'none',
                borderRadius: '7%',
              }}
              onClick={(e) => e.stopPropagation()}>
              Allocated
            </Button>
          );
        if (!record.is_allocated && !record.is_rejected) {
          return (
            <Button
              type='primary'
              style={{
                backgroundColor: 'red',
                outline: 'none',
                border: 'none',
                borderRadius: '7%',
                color: 'rgba(255,255,255,0.9)',
              }}
              onClick={(e) => e.stopPropagation()}>
              Pending
              {'  '}
            </Button>
          );
        }
        if (!record.is_allocated && record.is_rejected) {
          return (
            <Popover
              content={(
                <div style={{ width: '20rem' }}>
                  <text>
                    <b>Reason : </b>
                    {record.reason}
                  </text>
                  <br />
                  {record.remarks ? (
                    <text>
                      <b>Remarks : </b>
                      {record.remarks}
                    </text>
                  ) : null}
                </div>
              )}>
              <Button type='primary' danger>
                Rejected
              </Button>
            </Popover>
          );
        }
        return <div />;
      },
    },
    {
      title: 'Raised By',
      key: 'raised_by',
      dataIndex: 'raised_by',
    },
    {
      title: 'Created at',
      key: 'created_at',
      sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
      render: (text, record) => {
        return moment(record.created_at).format('DD/MM/YYYY, h:mm:ss a');
      },
    },
    ...(viewType === 'Pool Operator' ? [{
      title: 'Options',
      key: 'options',
      width: '10vw',
      render: (text, record) => (
        <ActionsPopover
          triggerTitle='Options'
          buttonList={[
            {
              Component: () => (
                <Button
                  type='primary'
                  disabled={record.is_allocated || record.is_rejected}
                  onClick={async (e) => {
                    const response = await loadAPI('reate-mrstatus/', {
                      method: 'Post',
                      data: { mr: record.id },
                    });
                    e.stopPropagation();
                  }}>
                  <Link to='../create-allotment/' state={{ id: record.id }} key={record.id}>
                    Create Allotment Docket
                  </Link>
                </Button>
              ),
            },
            {
              Component: () => (
                <Button
                  className='mx-2'
                  type='primary'
                  disabled={record.is_allocated || record.is_rejected}
                  onClick={(e) => {
                    setRejectionId(record.id);
                    setRejectionVisible(true);
                    e.stopPropagation();
                  }}>
                  Reject
                </Button>
              ),
            },
          ]}
        />
      ),
    }] : []),
    //     {
    //       title:'Request Status',
    //       key:'is_rejected',
    //       render:(row)=>(
    //         <div>
    //
    //           {/* eslint-disable-next-line no-nested-ternary */}
    //           {row.is_rejected?(
    //             <Popover content={(
    //               <div style={{ width:'20rem' }}>
    //                 <text>
    //                   <b>Reason : </b>
    //                   {row.reason}
    //                 </text>
    //                 <br />
    //                 {row.remarks?(
    //                   <text>
    //                     <b>Remarks : </b>
    //                     {row.remarks}
    //                   </text>
    //                 ):null}
    //               </div>
    // )}>
    //               <Button type='primary' danger>Rejected</Button>
    //             </Popover>
    //           ):row.is_rejected === undefined?(
    //             <Button>Not Created</Button>
    //           ):<div><Button type='primary'>Approved</Button></div>}
    //         </div>
    //       )
    //     },

    {
      title: 'Action',
      key: 'operation',
      width: '9vw',
      render: (text, record) => (
        <div className='row justify-evenly'>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setEditingId(record.id);
              setPopoverEditVisible(true);
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          <DeleteWithPassword
            password={DEFAULT_PASSWORD}
            deleteHOC={deleteHOC({
              record,
              reload,
              api: deleteAddMr,
              success: 'Deleted MR successfully',
              failure: 'Error in deleting MR',
            })}
          />
          {/* <Popconfirm
            title="Confirm Delete"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteAddMr,
              success: 'Deleted Material Request Successfully',
              failure: 'Error in deleting Material Request',
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
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Material Requests',
      key: 'allMaterialRequests',
      data: mergeArray(filteredData || []),
      columns,
      loading,
    },
  ];

  const cancelEditing = () => {
    setEditingId(null);
    reload();
  };

  return (
    <NoPermissionAlert hasPermission={hasPermission}>
      <Modal
        maskClosable={false}
        visible={rejectionVisible}
        destroyOnClose
        style={{ minWidth: `80vw` }}
        title='Reject Material Request'
        onCancel={(e) => {
          setRejectionVisible(false);
          cancelEditing();
          e.stopPropagation();
        }}
        footer={null}>
        <MRRejectionForm
          mr={rejectionId}
          onDone={() => {
            setRejectionVisible(false);
          }}
          onCancel={() => {
            setRejectionVisible(false);
          }}
        />
      </Modal>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: '15vw', display: 'flex', alignItems: 'flex-end' }}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder='Search' aria-label='search' enterButton />
        </div>
      </div>
      <br />
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size='middle'
        title='Material Requests'
        editingId={editingId}
        cancelEditing={cancelEditing}
        ExpandBody={ExpandTable}
        modalBody={AddMaterialRequestForm}
        modalWidth="80"
        hideRightButton={viewType === 'Consignor' ? false : true}
      />
      {/* <div className="ag-theme-material">
        <AgGridReact
            rowData={filteredData}
            columnDefs={columnDefs}
            domLayout={'autoHeight'}
            // animateRows={true} 
            >
        </AgGridReact>
      </div>       */}
      
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(ReceiverClientEmployeeScreen);
