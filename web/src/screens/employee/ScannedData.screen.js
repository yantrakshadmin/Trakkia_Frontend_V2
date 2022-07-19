import * as React from 'react';
import moment from 'moment';
import { Form, Button, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import scannedDataColumn from 'common/columns/ScannedData.column';
import TableWithTabHoc from 'hocs/TableWithTab.hoc';
import { useTableSearch } from 'hooks/useTableSearch';
import { retrieveScannedDataWithoutPagination, retrieveWarehouses } from 'common/api/auth';
import { DEFAULT_BASE_URL } from 'common/constants/enviroment';
import { FORM_ELEMENT_TYPES } from '../../constants/formFields.constant';
import formItem from "../../hocs/formItem.hoc";
import ExpandTable from "../../components/ScannedExpandTable";
import Download from "../../icons/Download";




const ScannedData = () => {
  const [form] = Form.useForm();
  const { user } = useSelector(s => s);
  const { userMeta } = user;
  const { companyId } = userMeta;
  const [currentPage, setCurrentPage] = React.useState(1)

  const {filteredData:masters, } = useTableSearch({
    retrieve: retrieveWarehouses,
    usePaginated: true,
    useCompanyIdAndViewType: true
  });

  const { filteredData, reload, loading } = useTableSearch({
    retrieve: retrieveScannedDataWithoutPagination,
    usePaginated:false
  });

  const onDownloadBtn = () => {
    const data = form.getFieldsValue()
    const today = new Date().toISOString();
    const tempTo = moment(data.to || today).endOf('date').format('YYYY-MM-DD HH:MM');
    const tempFrom = moment(data.from || today).startOf('date').format('YYYY-MM-DD HH:MM');

    // eslint-disable-next-line max-len
    return (`${DEFAULT_BASE_URL}rfid-dumpdownload/?company_id=${companyId}&to=${tempTo}&from=${tempFrom}`)
  }

  const removeDuplications = (arr) => {
    let obj = {};
    const newArr = [];
    (arr || []).map((item)=>{
      const tempDate = moment(item.date).format('DDMMYYYY');
      if (obj[item.warehouse]) {
        if (obj[item.warehouse][tempDate]) {
        } else {
          obj = {
            ...obj,
            [item.warehouse]: {
              ...(obj[item.warehouse] || {}),
              [tempDate]: true
            }
          }
          newArr.push(item);
        }
      } else {
        obj = {
          ...obj,
          [item.warehouse]: {
            ...(obj[item.warehouse] || {}),
            [tempDate]: true
          }
        }
        newArr.push(item);
      }
      return item
    });
    return newArr;
  }

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => {return (currentPage - 1) * 10 + index + 1},
    },
    ...scannedDataColumn,
    {
      title: 'Download',
      key: 'download',
      render: (text, record) => {
        console.log('0000000:',text,': 8888 :', record);
        const warehouse = masters.filter(item => item.name === record.warehouse)[0] || {};
        return (
          <div className='row justify-center'>
            <a href={`${DEFAULT_BASE_URL}rfid-dumpdownload/?company_id=${companyId}&warehouse=${warehouse.id}&reports=AS,AH,MS,MAS,MAU,DD,IS,LM&from=${moment(record.date).startOf('date').format('YYYY-MM-DD HH:MM')}&to=${moment(record.date).startOf('date').format('YYYY-MM-DD HH:MM')}`} target='_blank' rel='noreferrer'>
              <Download />
            </a>
          </div>
        );
      },
    },
  ];

  const tabs = [
    {
      name: 'Audit Summary',
      key: 'Scanned data',
      data: removeDuplications(filteredData || []),
      columns,
      loading
    },
  ];

  React.useEffect(()=>{
    if(filteredData && filteredData?.length>0){
      removeDuplications(filteredData)
    }
  },[filteredData])

  return (
    <>
      <Form form={form} layout='inline' hideRequiredMark autoComplete='off'>
        <Row>
          <Col span={10}>
            {formItem({
              key: 'from',
              rules: [{ required: true, message: 'Please select From date!' }],
              kwargs: {
                placeholder: 'Select',
                type: 'number',
              },
              type: FORM_ELEMENT_TYPES.DATE,
              others: null,
              customLabel: 'From',
            })}
          </Col>
          <Col span={10}>
            {formItem({
              key: 'to',
              rules: [{ required: true, message: 'Please select To date!' }],
              kwargs: {
                placeholder: 'Select',
                type: 'number',
              },
              type: FORM_ELEMENT_TYPES.DATE,
              others: null,
              customLabel: 'To',
            })}
          </Col>
          <Col span={4}>
            <Button
              onClick={() => {
                window.open(onDownloadBtn())
                // onDownloadBtn()
              }}
                    >
              Download
            </Button>
          </Col>
        </Row>
      </Form>
      <br />
      <TableWithTabHoc
        expandHandleKey='serials'
        rowKey={(record) => record.id}
        tabs={tabs}
        refresh={reload}
        size='middle'
        title='Audit Summary'
        hideRightButton
        ExpandBody={ExpandTable}
        onPageChange={(p)=>{
          setCurrentPage(p);
        }}
      />
    </>
  );
}


export default ScannedData;
