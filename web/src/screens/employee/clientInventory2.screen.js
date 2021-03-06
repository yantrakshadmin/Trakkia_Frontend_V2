import React, {useState, useCallback} from 'react';
import {useAPI} from 'common/hooks/api';
import {Button, Col, Form, Input, Popconfirm, Row} from 'antd';
import formItem from 'hocs/formItem.hoc';
import {FORM_ELEMENT_TYPES} from 'constants/formFields.constant';
import {MasterHOC} from 'hocs/Master.hoc';
import {createSC2TestInv, deleteSC2TestInv, retrieveSC2TestInv} from 'common/api/auth';
import {loadAPI} from 'common/helpers/api';
import {TestSC2InventoryDetailColumn} from 'common/columns/testInventoryDetail.column';
import {useHandleForm} from '../../hooks/form';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import {useTableSearch} from '../../hooks/useTableSearch';
import {CSVLink} from 'react-csv';
import {ifNotStrReturnA} from 'common/helpers/mrHelper';
import {GetUniqueValueNested} from 'common/helpers/getUniqueValues';

const {Search} = Input;

const TestInventoryScreen = () => {
  const {data: products} = useAPI('/products/', {});
  const {data: sClients} = useAPI('/senderclients/', {}, false, true);
  const [details, setDetails] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [clientLoading, setClientLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({short_code: '', client: ''});
  const [searchVal, setSearchVal] = useState(null);

  const {filteredData: invData, loading: invLoading, reload} = useTableSearch({
    searchVal,
    retrieve: retrieveSC2TestInv,
  });

  const generateCSVData = useCallback(() => {
    if (!invLoading) {
      const temp = invData.map((i) => {
        return {
          client: i.client.client_name,
          quantity: i.quantity,
          product: i.product.short_code,
        };
      });
      return {
        headers: [
          {label: 'Client', key: 'client'},
          {label: 'Product', key: 'product'},
          {label: 'Quantity', key: 'quantity'},
        ],
        data: temp,
      };
    }
    return {
      headers: [],
      data: [],
    };
  }, [invData, invLoading]);

  const DownloadCSVButton = useCallback(() => {
    const t = generateCSVData();
    return (
      <Row style={{display: 'inline-flex', width: '100%'}}>
        <Col span={12}>
          <Button>
            <CSVLink filename={'client-inventory.csv'} data={t.data} headers={t.headers}>
              Download CSV
            </CSVLink>
          </Button>
        </Col>
        <Col span={24} style={{marginTop: '10px'}}>
          {formItem({
            key: 'senderclients',
            kwargs: {
              placeholder: 'Select',
              onChange: async (val) => {
                const {data} = await loadAPI(`/client-inv-items/?id=${val}`)
                setClientData(data)
                setClientLoading(false)
              },
            },
            others: {
              selectOptions: sClients || [],
              key: 'id',
              customTitle: 'name',
              dataKeys: ['address'],
            },
            type: FORM_ELEMENT_TYPES.SELECT,
            customLabel: 'Sender Clients',
          })}
        </Col>
      </Row>
    );
  }, [sClients, generateCSVData]);

  console.log(invData, 'Ggg');
  const {form, submit, loading} = useHandleForm({
    create: createSC2TestInv,
    success: 'Inventory created/edited successfully.',
    failure: 'Error in creating/editing Inventory.',
    done: () => {
      form.setFieldsValue({
        client: null,
        product: null,
        quantity: null,
      });
      reload();
    },
    close: () => null,
  });

  const column = [
    // {
    //   title: 'Client',
    //   key: 'client',
    //   dataIndex: 'client',
    //   render: (text, record) => record.client.client_name,
    //   filters: GetUniqueValueNested(invData || [], 'client', 'client_name'),
    //   onFilter: (value, record) => record.client.client_name === value,
    // },
    {
      title: 'Product',
      key: 'product',
      dataIndex: 'product',
      render: (text, record) => record.product.short_code,
      sorter: (a, b) =>
        ifNotStrReturnA(a.product.short_code).localeCompare(ifNotStrReturnA(b.product.short_code)),
      showSorterTooltip: false,
    },
    {
      title: 'Product Info',
      key: 'description',
      dataIndex: 'description',
      render: (text, record) => record.product.description,
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      showSorterTooltip: false,
    },
    {
      title: 'Action',
      key: 'operation',
      width: '9vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          <Button
            type="primary"
            onClick={async (e) => {
              setSelectedProduct({
                short_code: record.product.short_code,
                client: record.client.client_name,
              });
              setDetailsLoading(true);
              const {data} = await loadAPI(
                `/sc-ledger-items/?id=${
                  record.product.short_code
                }&cname=${record.client.client_name.replaceAll('&', '%26')}`,
                {
                  method: 'GET',
                },
              );
              setDetails(data);
              setDetailsLoading(false);
              e.stopPropagation();
            }}>
            Details
          </Button>
          {/* <Popconfirm
            title="Confirm Delete"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteSC2TestInv,
              success: 'Deleted Inventory Successfully',
              failure: 'Error in deleting Inventory',
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

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      {/* <Form onFinish={submit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row align="middle" gutter={10}>
          <Col span={8}>
            {formItem({
              key: 'client',
              kwargs: {
                placeholder: 'Select',
                showSearch: true,
                filterOption: (input, option) =>
                  option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
              },
              others: {
                selectOptions: sClients || [],
                key: 'user',
                dataKeys: ['client_city'],
                customTitle: 'client_name',
              },
              type: FORM_ELEMENT_TYPES.SELECT,
              customLabel: 'Client',
            })}
          </Col>
          <Col span={8}>
            {formItem({
              key: 'product',
              kwargs: {
                placeholder: 'Select',
                showSearch: true,
                filterOption: (input, option) =>
                  option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
              },
              others: {
                selectOptions: products || [],
                key: 'id',
                dataKeys: ['name', 'description', 'category'],
                customTitle: 'short_code',
              },
              type: FORM_ELEMENT_TYPES.SELECT,
              customLabel: 'Product',
            })}
          </Col>
          <Col span={4}>
            {formItem({
              key: 'quantity',
              kwargs: {
                placeholder: 'Quantity',
              },
              type: FORM_ELEMENT_TYPES.INPUT,
              customLabel: 'Quantity',
            })}
          </Col>
          <Col span={4}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form> */}

      <Row gutter={10}>
        <Col lg={12}>
          <MasterHOC
            refresh={reload}
            size="small"
            data={clientData}
            columns={column}
            title="Inventory"
            ExtraButtonNextToTitle={DownloadCSVButton}
            hideRightButton
            loading={clientLoading}
          />
        </Col>
        <Col lg={12}>
          <MasterHOC
            size="small"
            data={details}
            title={`${selectedProduct.short_code} - ${selectedProduct.client}`}
            hideRightButton
            loading={detailsLoading}
            columns={TestSC2InventoryDetailColumn}
          />
        </Col>
      </Row>
    </div>
  );
};
export default TestInventoryScreen;
