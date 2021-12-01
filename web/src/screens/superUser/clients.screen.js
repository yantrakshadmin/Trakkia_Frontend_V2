import React, { useState } from 'react';
import leadColumns from 'common/columns/Leads.colums';
import companyColumns from 'common/columns/Company.columns';
import { Popconfirm, Button, Input } from 'antd';
import { connect  } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import {  deleteEmployee,retrieveCompanyList,retrieveEmployeeList } from 'common/api/auth';
import Delete from 'icons/Delete';
import { deleteHOC } from 'hocs/deleteHoc';
import Edit from 'icons/Edit';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import {AddCompanyForm}  from 'forms/SuperUser/addCompany.form';
import NoPermissionAlert from 'components/NoPermissionAlert';
import {useAPI} from 'common/hooks/api';
import receiverColumns from 'common/columns/Receiver.column';
import clientColumns from 'common/columns/Clients.column';
import { ifNotStrReturnA } from 'common/helpers/mrHelper';
import { GetUniqueValue, GetUniqueValueNested } from 'common/helpers/getUniqueValues';



const { Search } = Input;

const ClientsScreen = ({ currentPage, user }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // const { user } = useSelector(s => s);
  console.log(user)
  const { viewType,companyId } = user

  const {data: sender_clients} = useAPI(`/senderclients/?company=${companyId}&view=${viewType}`, {});
  const {data: receiver_clients} = useAPI(`/receiverclients/?company=${companyId}&view=${viewType}`, {});

  console.log(sender_clients)

  const { filteredData, loading, reload, hasPermission } = useTableSearch({
    searchVal,
    retrieve: retrieveCompanyList,
    usePaginated:true,
  });

  const columns1 = [

    ...companyColumns,
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '12vw',
      // render: (text, record) => (
      //   <div className='row align-center justify-evenly'>
      //     <Button
      //       style={{
      //         backgroundColor: 'transparent',
      //         border: 'none',
      //         boxShadow: 'none',
      //         padding: '1px',
      //       }}
      //       onClick={(e) => {
      //         setEditingId(record.id);
      //         e.stopPropagation();
      //       }}>
      //       <Edit />
      //     </Button>
      //     <Popconfirm
      //       title='Confirm Delete'
      //       onCancel={(e) => e.stopPropagation()}
      //       onConfirm={deleteHOC({
      //         record,
      //         reload,
      //         api: deleteEmployee,
      //         success: 'Deleted User successfully',
      //         failure: 'Error in deleting Employee',
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
      //     </Popconfirm>
      //   </div>
      // ),
    },

  ]

  const columns2 = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      sorter: (a, b) => ifNotStrReturnA(a.name).localeCompare(ifNotStrReturnA(b.name)),
      showSorterTooltip: false,
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      filters: GetUniqueValue(receiver_clients || [], 'email'),
      onFilter: (value, record) => record.email === value,
    },
    ...receiverColumns,
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className="row align-center justify-evenly">
          <Button
            // disabled
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setEditingId(record.id);
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          {/* <Popconfirm
            // disabled
            title='Confirm Delete'
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteReceiverClient,
              success: 'Deleted Receiver Client successfully',
              failure: 'Error in deleting receiver client',
            })}>
            <Button
              // disabled
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

  const columns3 = [
    {
      title: 'Sr. No.',
      key: 'srno',
      width: '5vw',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    ...clientColumns,
    // {
    //   title: 'Client State',
    //   key: 'client_state',
    //   dataIndex: 'client_state',
    //   width: '8vw',
    //   filters: GetUniqueValue(filteredData || [], 'client_state'),
    //   onFilter: (value, record) => record.client_state === value,
    // },
    // {
    //   title: 'Client Region',
    //   key: 'client_region',
    //   dataIndex: 'client_region',
    //   width: '8vw',
    //   filters: GetUniqueValue(filteredData || [], 'client_region'),
    //   onFilter: (value, record) => record.client_region === value,
    // },
    // {
    //   title: 'Client Payment Terms',
    //   key: 'client_payment_terms',
    //   dataIndex: 'client_payment_terms',
    // },
    // {
    //   title: 'Client Category',
    //   key: 'client_category',
    //   dataIndex: 'client_category',
    //   width: '8vw',
    //   filters: GetUniqueValue(filteredData || [], 'client_category'),
    //   onFilter: (value, record) => record.client_category === value,
    // },
    // {
    //   title: 'Client Product User Type',
    //   key: 'client_product_user_type',
    //   dataIndex: 'client_product_user_type',
    // },
    // {
    //   title: 'Client PAN',
    //   key: 'client_pan',
    //   dataIndex: 'client_pan',
    // },
    // {
    //   title: 'Client Code',
    //   key: 'client_code',
    //   dataIndex: 'client_code',
    // },
    // {
    //   title: 'Is GST Registered?',
    //   key: 'client_is_gst_registered',
    //   dataIndex: 'client_is_gst_registered',
    // },
    // {
    //   title: 'Client GST',
    //   key: 'client_gst',
    //   dataIndex: 'client_gst',
    // },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '7vw',
    //   render: (text, record) => (
    //     <div className="row align-center justify-evenly">
    //       <a href={record.annexure} target="_blank" rel="noreferrer">
    //         <Button
    //           style={{
    //             backgroundColor: 'transparent',
    //             border: 'none',
    //             boxShadow: 'none',
    //             padding: '1px',
    //           }}
    //           disabled={!record.annexure}
    //           onClick={(e) => e.stopPropagation()}>
    //           <Document color={record.annexure ? '#7CFC00' : null} />
    //         </Button>
    //       </a>
    //       <Button
    //         // disabled
    //         style={{
    //           backgroundColor: 'transparent',
    //           border: 'none',
    //           boxShadow: 'none',
    //           padding: '1px',
    //         }}
    //         onClick={(e) => {
    //           setEditingId(record.user);
    //           e.stopPropagation();
    //         }}>
    //         <Edit />
    //       </Button>
    //     </div>
    //   ),
    },
  ];


  const tabs = (viewType === 'Pool Operator') ? [
    {
      name: 'Company',
      key: 'company',
      data: filteredData || [],
      columns: columns1,
      loading,
    },
    {
      name: 'Sender Client',
      key: 'sender_client',
			data: sender_clients || [],
			columns: columns3,
      loading,
    },
    {
      name: 'Receiver Client',
      key: 'receiver_client',
      data: receiver_clients || [],
      columns: columns2,
      loading,
    },
  ] : 
  [
    {
      name: 'Company',
      key: 'company',
      data: filteredData || [],
      columns: columns1,
      loading,
    },
  ]

  const cancelEditing = () => setEditingId(null);

  return (
    <NoPermissionAlert hasPermission={hasPermission}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: '15vw', display: 'flex', alignItems: 'flex-end' }}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder='Search' enterButton />
        </div>
      </div>
      <br />
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size='middle'
        title='Clients'
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={AddCompanyForm}
        modalWidth={60}
        scroll={{ x: 1200 }}
        formParams={{companyId: user.companyId}}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return { 
    currentPage: state.page.currentPage,
    user: state.user.userMeta 
   };
};

export default connect(mapStateToProps)(ClientsScreen);
