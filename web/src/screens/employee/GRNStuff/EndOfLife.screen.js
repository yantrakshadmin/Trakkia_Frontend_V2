import React, { useState, } from 'react';
import { DEFAULT_BASE_URL } from 'common/constants/enviroment';
import { Button, Input, Modal } from 'antd';
import { connect } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import { useAPI } from 'common/hooks/api';
import Document from 'icons/Document';


import { retrieveEndOfLife } from 'common/api/auth';
import { ProductTable } from '../../../components/GRNProductsTable';
import TableWithTabHOC from '../../../hocs/TableWithTab.hoc';
import { GRNForm } from '../../../forms/RegenerateGRN.form';
import { EndOfLifeUploadForm } from '../../../forms/EndOfLifeUpload.form'

import moment from 'moment';

import NoPermissionAlert from 'components/NoPermissionAlert';


const { Search } = Input;

const EndOfLife = ({ currentPage }) => {
    const [searchVal, setSearchVal] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [uploadModal, setUploadModal] = useState(Boolean);


    const { data: eolList, loading, reload, status } = useAPI('/eol-list/', {});

    const { filteredData } = useTableSearch({

        retrieve: retrieveEndOfLife,
        searchVal,
        usePaginated: false
    });





    const cancelEditing = () => {
        setEditingId(null);
    };

    const columns = [
        {
            title: 'Date',
            key: 'date',
            sorter: (a, b) => moment(a.inward_date).unix() - moment(b.inward_date).unix(),
            render: (text, record) => {
                return moment(record.inward_date).format('DD/MM/YYYY');
            },
        },
        {
            title: 'Time',
            key: 'time',
            render: (text, record) => {
                return moment(record.date).format("hh:mm a")
            },
        },
        {
            title: 'User',
            key: 'user',
            render: (record) => {
                return record.owner.first_name
            }
        },
        {
            title: 'File',
            key: 'file',
            width: '7vw',
            render: (text, record) => (
                <div className="row justify-evenly">
                    <a href={record.file} target="_blank" rel="noopener noreferrer">
                        <Button
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                                padding: '1px',
                            }}
                            // disabled={!record.document}
                            onClick={(e) => e.stopPropagation()}>
                            <Document />
                        </Button>
                    </a>


                </div>
            ),
        },
    ];

    const tabs = [
        {
            name: 'End of life',
            key: 'allGRNs',
            data: filteredData,
            columns,
            loading,
        },
    ];

    return (
        <NoPermissionAlert hasPermission={status === 403 ? false : true}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '15vw', display: 'flex', alignItems: 'flex-end' }}>
                    <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ width: '12.6vw', display: 'flex', alignItems: 'flex-end' }}>
                    <Button type='primary'
                        onClick={(e) => {
                            setUploadModal(true)
                            e.stopPropagation();

                        }}
                    > Upload Discarded Tags </Button>
                </div>
            </div>
            <br />

            <Modal
                maskClosable={false}
                visible={uploadModal}
                destroyOnClose
                style={{ minWidth: `80vw` }}
                title={'Upload Discarded Tags'}
                onCancel={() => { setUploadModal(false) }}
                footer={null}>
                <EndOfLifeUploadForm onCancel={() => { setUploadModal(false) }} onDone={() => { setUploadModal(false) }} />
            </Modal>


            <TableWithTabHOC
                rowKey={(record) => record.id}
                refresh={reload}
                tabs={tabs}
                size="middle"
                title="End Of Life"
                editingId={editingId}
                cancelEditing={cancelEditing}
                modalBody={GRNForm}
                modalWidth={60}
                expandHandleKey="products"
                expandParams={{ loading }}
                ExpandBody={ProductTable}
                hideRightButton
            />
        </NoPermissionAlert>
    );
};

const mapStateToProps = (state) => {
    return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(EndOfLife);
