import React, { useState } from 'react';
import leadColumns from 'common/columns/Leads.colums';
import { Popconfirm, Button, Input } from 'antd';
import { connect  } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import {  deleteEmployee,retrieveEmployeeList } from 'common/api/auth';
import Delete from 'icons/Delete';
import { deleteHOC } from 'hocs/deleteHoc';
import Edit from 'icons/Edit';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import {AddUserForm}  from 'forms/SuperUser/addUser.form';
import NoPermissionAlert from 'components/NoPermissionAlert';

const { Search } = Input;

const WarehouseEmployeeScreen = ({ currentPage, user }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const { filteredData, loading, reload, hasPermission } = useTableSearch({
    searchVal,
    retrieve: ()=>[],
  });


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
      name: 'All Users',
      key: 'allUsers',
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
        title='Users'
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={AddUserForm}
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

export default connect(mapStateToProps)(WarehouseEmployeeScreen);
