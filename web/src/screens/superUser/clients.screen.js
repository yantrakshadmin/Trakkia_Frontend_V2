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

const { Search } = Input;

const ClientsScreen = ({ currentPage, user }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);

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

  const columns = [
    ...leadColumns,
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '12vw',
      render: (text, record) => (
        <div className='row align-center justify-evenly'>
          <Button
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
          <Popconfirm
            title='Confirm Delete'
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteEmployee,
              success: 'Deleted User successfully',
              failure: 'Error in deleting Employee',
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
          </Popconfirm>
        </div>
      ),
    },
  ];

  const tabs = [
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
			data: [],
			columns,
      loading,
    },
    {
      name: 'Receiver Client',
      key: 'receiver_client',
      data: [],
      columns,
      loading,
    },
  ];

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
