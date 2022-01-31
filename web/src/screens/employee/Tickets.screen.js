import React, {useEffect, useState} from 'react';
import ticketColumns from 'common/columns/ticket.column';
import {Popconfirm, Button, Input, Popover} from 'antd';
import {deleteDEPS, deleteExpense, retrieveAllotmentsDockets, retrieveDEPS, retrieveGRNs, retrieveReturnDocket} from 'common/api/auth';
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
  const [ticketData, setTicketData] = useState(null);
  const [assignedTicketData, setAssignedTicketData] = useState(null);
  const [unassignedTicketData, setUnassignedTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAssigned, setIsAssigned] = useState(false);

  const {filteredData, reload, hasPermission} = useTableSearch({
    searchVal,
    retrieve: retrieveDEPS,
    usePaginated : false
  });
  //const {data: mrStatusData} = useAPI('list-mrstatus/');
  const cancelEditing = () => {
    setEditingId(null);
  };

  useEffect(() => {

    const fetchTN = async () => {

      setTicketData(
        await Promise.all(filteredData.map(async (deps) => {
          if(deps.transaction_type == 'Allotment') {
            const {data: products} = await retrieveAllotmentsDockets(deps.a_t_no)
            return {...deps, transaction_no: products.transaction_no}
          } else if(deps.transaction_type == 'Return') {
            const {data: products} = await retrieveReturnDocket(deps.r_t_no)
            return {...deps, transaction_no: products.transaction_no}
          } else if(deps.transaction_type == 'GRN') {
            const {data: products} = await retrieveGRNs(deps.g_t_no)
            return {...deps, transaction_no: products.transaction_no}
          }
          return deps
        }))
      )

      setTimeout(() => {
        setLoading(false)
      }, 1000)
      
    }
    if(filteredData) fetchTN()

  }, [filteredData])

  useEffect(() => {

    if(ticketData){

      setAssignedTicketData(ticketData.filter((ticket) => ticket.status == 'Assigned'))
      setUnassignedTicketData(ticketData.filter((ticket) => ticket.status == 'Unassigned'))

    }

  }, [ticketData])

  const columns = [
    ...ticketColumns,
    {
      title: 'Option',
      key: 'option',
      width: '7vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          <Button
            type='primary'
            onClick={(e) => {
              e.stopPropagation();
              setIsAssigned(true);
              setEditingId(record.id);
            }}>
              Assigned To
          </Button>
        </div>
      ),
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
              e.stopPropagation();
              setEditingId(record.id);
              setIsAssigned(false);
            }}>
            <Edit />
          </Button>
          {/* <DeleteWithPassword
            password={DEFAULT_PASSWORD}
            deleteHOC={deleteHOC({
              record,
              reload,
              api: deleteDEPS,
              success: 'Deleted Expense successfully',
              failure: 'Error in deleting Expense',
            })}
          /> */}
          <Button
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '1px',
              }}
              onClick={(e) => {
                e.stopPropagation()
                deleteHOC({
                record,
                reload,
                api: deleteDEPS,
                success: 'Deleted Expense successfully',
                failure: 'Error in deleting Expense',
              })()}}>
              <Delete />
          </Button>
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
      data: ticketData || [],
      columns,
      loading: loading,
    },
    {
      name: 'Assigned Tickets',
      key: 'assignedTickets',
      data: assignedTicketData || [],
      columns,
      loading: loading,
    },
    {
      name: 'Unassigned Tickets',
      key: 'unassignedTickets',
      data: unassignedTicketData || [],
      columns,
      loading: loading,
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
        formParams={{isAssigned}}
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
