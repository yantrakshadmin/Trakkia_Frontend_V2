
  
import moment from 'moment';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';

import Edit from 'icons/Edit';
import Print from 'icons/Print';
import { GRNForm } from 'forms/GRN.form';
import { useAPI } from 'common/hooks/api';
import { useTableSearch } from 'hooks/useTableSearch';
import { GetUniqueValue } from 'common/helpers/getUniqueValues';
import NoPermissionAlert from 'components/NoPermissionAlert';
import ExpandTable from 'components/PurchaseOrderExpandTable';
import { PurchaseOrderForm } from '../../forms/PurchaseOrderForms';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';

const { Search } = Input;

const PurchaseOrderScreen = () => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [reqData, setReqData] = useState(null);
  const [createGrn, setCreateGrn] = useState(null);
  const [currentPurchaseOrder,setCurrentPurchaseOrder] = useState(null)

  const { data: pos, loading, reload, status } = useAPI('/purchaseorders/', {}, false , true);

  const { filteredData } = useTableSearch({
    searchVal,
    reqData,
    usePaginated : false,
    useCompanyIdAndViewType : true,
  });

  useEffect(() => {
    if (pos) {
      const fetchData = async () => {
        const newData = pos.map((po) => ({
          id: po.id,
          delivered_to: po.delivered_to.name,
          material_vendor: po.material_vendor.name,
          material_vendor_item : po.material_vendor,
          expected_delivery: po.expected_delivery,
          payment_terms: po.payment_terms,
          po_number: po.po_number,
          billing_gst: po.billing_gst,
          amount: po.amount,
          gst: po.gst,
          warehouse:po.delivered_to.id,
          items: po.items
        }));
        setReqData(newData);
      };
      fetchData();
    }
  }, [pos]);

  const cancelEditing = () => {
    setEditingId(null);
    setCreateGrn(false);
    setCurrentPurchaseOrder(null)
  };

  const columns = [
    {
      title: 'PO ID',
      key: 'id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Material Vendor',
      key: 'material_vendor',
      dataIndex: 'material_vendor',
    },
    {
      title: 'Delivered to',
      key: 'delivered_to',
      dataIndex: 'delivered_to',
      filters: GetUniqueValue(filteredData || [], 'delivered_to'),
      onFilter: (value, record) => record.warehouse === value,
    },
    {
      title: 'Expected Delivery',
      key: 'expected_delivery',
      sorter: (a, b) => moment(a.expected_delivery).unix() - moment(b.expected_delivery).unix(),
      render: (text, record) => {
        return moment(record.expected_delivery).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Payment Terms',
      key: 'payment_terms',
      dataIndex: 'payment_terms',
    },
    {
      title: 'PO Number',
      key: 'po_number',
      dataIndex: 'po_number',
    },
    {
      title: 'Billing GST',
      key: 'billing_gst',
      dataIndex: 'billing_gst',
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'GST',
      key: 'gst',
      dataIndex: 'gst',
    },
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
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
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          <a
            href={`../purchase-order/${record.id}`}
            target='_blank'
            rel='noopener noreferrer'>
            <Button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '1px',
              }}
              onClick={(e) => e.stopPropagation()}>
              <Print />
            </Button>
          </a>
          <Button
            type='primary'
            shape='rectangle'
            style={{
              fontSize: '12px'
            }}
            onClick={(e) => {
              setEditingId(record.id);
              setCreateGrn(true);
              setCurrentPurchaseOrder(record);
              e.stopPropagation();
            }}>
            GRN
          </Button>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Purchase Orders',
      key: 'allGRNs',
      data: filteredData,
      columns,
      loading,
    },
  ];

  return (
    <NoPermissionAlert hasPermission={status !== 403}>
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
        title='Purchase Orders'
        modelTitle={createGrn ?"Add GRN":"Add Purchase Orders"}
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={createGrn ? GRNForm : PurchaseOrderForm}
        modalWidth={60}
        formParams={{ noEdit:true, createGrnWithPO: createGrn, purchaseOrder:currentPurchaseOrder }}
        ExpandBody={ExpandTable}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(PurchaseOrderScreen);
