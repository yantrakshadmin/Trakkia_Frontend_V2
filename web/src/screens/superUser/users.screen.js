import React, { useState } from 'react';
import userColumns from 'common/columns/Users.column';
import { Popconfirm, Button, Input, Modal } from 'antd';
import { connect } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import { deleteEmployee, retrieveEmployeeList } from 'common/api/auth';
import Delete from 'icons/Delete';
import { deleteHOC } from 'hocs/deleteHoc';
import Edit from 'icons/Edit';
import Upload from 'icons/Upload';

import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import { AddUserForm } from 'forms/SuperUser/addUser.form';
import { EditUserForm } from 'forms/SuperUser/editUser.form';
import NoPermissionAlert from 'components/NoPermissionAlert';
import { UsersUploadForm } from "../../forms/UsersUpload.form"


const { Search } = Input;

const WarehouseEmployeeScreen = ({ currentPage, user }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [uploadModal, setUploadModal] = useState(Boolean);
  const [employeeId, setEmployeeId] = useState(null);


  const { filteredData, loading, reload, hasPermission } = useTableSearch({
    searchVal,
    retrieve: retrieveEmployeeList,
    useCompanyIdAndViewType: true
  });


  const columns = [
    ...userColumns,
    {
      title: 'Assign Tags',
      key: 'assign-tags',
      width: '8vw',
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
              setUploadModal(true)
              setEmployeeId(record.user);
              // console.log(record, record.user, "Onclickkkkk")
              // e.stopPropagation();
            }}>
            <Upload />
          </Button>

        </div>
      ),

    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '8vw',
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
              setEditingId(record.user);
              console.log(record, record.user)
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
      data: filteredData || [],
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

      <Modal
        maskClosable={false}
        visible={uploadModal}
        destroyOnClose
        style={{ minWidth: `80vw` }}
        title={'Upload Users'}
        onCancel={() => { setUploadModal(false) }}
        footer={null}>
        <UsersUploadForm employeeId={employeeId} onCancel={() => { setUploadModal(false) }} onDone={() => { setUploadModal(false) }} />
      </Modal>
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size='middle'
        title='Users'
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={editingId ? EditUserForm : AddUserForm}
        modalWidth={60}
        scroll={{ x: 1200 }}
        formParams={{ companyId: user.companyId, }}
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
