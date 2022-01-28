import React, {useState} from 'react';
import ticketColumns from 'common/columns/ticket.column';
import {Popconfirm, Button, Input, Popover} from 'antd';
import {deleteExpense, retrieveDEPS} from 'common/api/auth';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';
import {mergeArray, statusCheck} from 'common/helpers/mrHelper';
import {TicketForm} from 'forms/ticket.form';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import ExpandTable from 'components/ExpenseExpandTable';
import {deleteHOC} from 'hocs/deleteHoc';
import Delete from 'icons/Delete';
import Edit from 'icons/Edit';
import {yantraColors} from '../../helpers/yantraColors';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FilesViewModal from '../../components/FilesViewModal';
import DeleteWithPassword from '../../components/DeleteWithPassword';
import {DEFAULT_PASSWORD} from 'common/constants/passwords';
import NoPermissionAlert from 'components/NoPermissionAlert';

import _ from 'lodash';

const {Search} = Input;

const TicketsEmployeeScreen = ({currentPage, isEmployee}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const {filteredData, loading, reload, hasPermission} = useTableSearch({
    searchVal,
    retrieve: retrieveDEPS,
    usePaginated : false
  });
  //const {data: mrStatusData} = useAPI('list-mrstatus/');
  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    ...ticketColumns,
    {
      title: 'Criticality',
      key: 'criticality',
      className: 'align-center',
      render: (text, record) => {
        if (record.criticality == 'Normal')
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
              Normal
            </Button>
          );
        if (record.criticality == 'Urgent') {
          return (
            <Button
              type='primary'
              style={{
                backgroundColor: '#ad4e00',
                outline: 'none',
                border: 'none',
                borderRadius: '7%',
                color: 'rgba(255,255,255,0.9)',
              }}
              onClick={(e) => e.stopPropagation()}>
              Urgent
              {'  '}
            </Button>
          );
        }
        if (record.criticality == 'Critical') {
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
              Critical
              {'  '}
            </Button>
          );
        }
        return <div />;
      },
    },
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          {/* <FilesViewModal
            documentAvail={record.bill ? (record.bill.length > 0 ? true : false) : false}
            getDocuments={() => record.bill}
          /> */}
          {/* <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={async (e) => {
              e.stopPropagation();
              try {
                if (record.bill.length > 0) {
                  record.bill.forEach((f) => {
                    window.open(f.document);
                  });
                }
              } catch (err) {}
            }}>
            <FontAwesomeIcon
              icon={record.bill ? (record.bill.length > 0 ? faEye : faEyeSlash) : faEyeSlash}
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
              setEditingId(record.id);
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          <DeleteWithPassword
            password={DEFAULT_PASSWORD}
            deleteHOC={deleteHOC({
              record,
              reload,
              api: deleteExpense,
              success: 'Deleted Expense successfully',
              failure: 'Error in deleting Expense',
            })}
          />
          {/* <Popconfirm
            title="Confirm Delete"
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteExpense,
              success: 'Deleted Material Request successfully',
              failure: 'Error in deleting Material request',
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
      name: 'All Tickets',
      key: 'allTickets',
      data: filteredData || [],
      columns,
      loading,
    },
  ];

  return (
    <NoPermissionAlert hasPermission={hasPermission}>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      <br />
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size="middle"
        title="Tickets"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={TicketForm}
        modalWidth={80}
        formParams={{isEmployee}}
        //expandHandleKey="transactions"
        //expandParams={{loading}}
        // ExpandBody={ExpandTable}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(TicketsEmployeeScreen);
