import React, { useState, useEffect } from 'react';
import leadColumns from 'common/columns/Leads.colums';
import { Popconfirm, Button, Input } from 'antd';
import { connect  } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import {  deleteLead } from 'common/api/auth';
import Delete from 'icons/Delete';
import { DiffOutlined, ToTopOutlined } from '@ant-design/icons';
import { deleteHOC } from 'hocs/deleteHoc';
import Edit from 'icons/Edit';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import {AddUserForm}  from 'forms/SuperUser/addUser.form';
import { ActionsPopover } from 'components/ActionsPopover';
import NoPermissionAlert from 'components/NoPermissionAlert';

const { Search } = Input;

const WarehouseEmployeeScreen = ({ currentPage, user }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleSCS, setVisibleSCS] = useState(false);
  const [visibleUpload, setVisibleUpload] = useState(false);
  const [lead, setLead] = useState(null);
  const [leadID, setLeadID] = useState(null);
  const [popover, setPopover] = useState(false);

  const { filteredData, loading, reload, hasPermission } = useTableSearch({
    searchVal,
    retrieve: ()=>[],
  });

  useEffect(() => {
    if (filteredData) {
      const csvd = [];
      filteredData.forEach((d) => {
        delete d.owner;
        csvd.push(d);
      });
      setCsvData(csvd);
    }
  }, [filteredData]);

  const columns = [
    ...leadColumns,
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '12vw',
      render: (text, record) => (
        <div className='row align-center justify-evenly'>
          <ActionsPopover
            popover={popover}
            setPopover={setPopover}
            triggerTitle='Options'
            buttonList={[
              {
                Icon: DiffOutlined,
                title: 'Create SCS',
                onClick: (e) => {
                  setPopover(false);
                  setLead(record.lead_no);
                  setLeadID(record.id);
                  setVisibleSCS(true);
                  e.stopPropagation();
                },
              },
              // {
              //   Icon: DiffOutlined,
              //   title: 'Create PFEP',
              //   onClick: (e) => {
              //     setPopover(false);
              //     setLead(record.lead_no);
              //     setVisible(true);
              //     e.stopPropagation();
              //   },
              // },
              {
                Icon: ToTopOutlined,
                title: 'Upload SCS',
                onClick: (e) => {
                  setPopover(false);
                  setLead(record.lead_no);
                  setLeadID(record.id);
                  setVisibleUpload(true);
                  e.stopPropagation();
                },
              },
            ]}
          />
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
              api: deleteLead,
              success: 'Deleted Lead successfully',
              failure: 'Error in deleting Lead',
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
      data: filteredData,
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
        csvdata={csvData}
        csvname={`Leads${searchVal}.csv`}
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
