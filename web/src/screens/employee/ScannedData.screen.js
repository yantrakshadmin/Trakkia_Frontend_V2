import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useAPI } from 'common/hooks/api';
import scannedDataColumn from 'common/columns/ScannedData.column';
import TableWithTabHoc from 'hocs/TableWithTab.hoc';
import { DEFAULT_BASE_URL } from "common/constants/enviroment";
import ExpandTable from "../../components/ScannedExpandTable";


const ScannedData = () => {
  const { user } = useSelector((s) => s);
  const { userMeta } = user;
  const { companyId } = userMeta;
  const { data: scannedData, loading } = useAPI(`/rfid-dump/`, {}, false, false);

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => {
        console.log(text, record);
        return index + 1
      }
    },
    ...scannedDataColumn,
  ];

  const tabs = [
    {
      name: 'Scanned Data',
      key: 'Scanned data',
      data: scannedData || [],
      columns,
      loading,
    },
  ];

  return (
    <>
      <TableWithTabHoc
        expandHandleKey='serials'
        rowKey={(record) => record.id}
        tabs={tabs}
        size='middle'
        title='Scanned Data'
        hideRightButton
        ExpandBody={ExpandTable}
        downloadLinkButtonTitle='Download'
        downloadLink={`${DEFAULT_BASE_URL}rfid-dumpdownload/?company_id=${companyId}`}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(ScannedData);
