import React, { useState } from 'react';
import { Table, Tag, Input, Button } from 'antd';
import "../css/fee-list.css"
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { NavLink, Outlet } from 'react-router-dom';

const { Search } = Input;

const FeeManagement = () => {
    const [list, setList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const handleDelete = (item) => {
        const newsId = item.id;
        setList(prevState => prevState.filter(i => i.id !== newsId));
    };
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const data = [
        {
            key: '1',
            name: 'Phí vận chuyển',
            target: 'Nhà cung cấp',
            value: '10%',
            type: 'Cố định',
            cycle: 'Hàng tháng',
            paymentMethod: 'Online',
            status: 'Hoạt động',
            delete: <button className='delete' onClick={() => handleDelete(list)}><DeleteOutlined /></button>
        },
        {
            key: '2',
            name: 'Phí vận chuyển',
            target: 'Khách hàng',
            value: '10%',
            type: 'Cố định',
            cycle: 'Hàng tháng',
            paymentMethod: 'Online',
            status: 'Không hoạt động',
            delete: <DeleteOutlined />
        },
        {
            key: '3',
            name: 'Phí giao dịch',
            target: 'Khách hàng',
            value: '10%',
            type: 'Cố định',
            cycle: 'Hàng tháng',
            paymentMethod: 'Online',
            status: 'Hoạt động',
            delete: <DeleteOutlined />
        },
        {
            key: '4',
            name: 'Phí giao dịch',
            target: 'Khách hàng',
            value: '10%',
            type: 'Cố định',
            cycle: 'Hàng tháng',
            paymentMethod: 'Online',
            status: 'Hoạt động',
            delete: <DeleteOutlined />
        },
        {
            key: '5',
            name: 'Phí giao dịch',
            target: 'Khách hàng',
            value: '10%',
            type: 'Cố định',
            cycle: 'Hàng tháng',
            paymentMethod: 'Online',
            status: 'Không hoạt động',
            delete: <DeleteOutlined />
        },
        {
            key: '6',
            name: 'Phí giao dịch',
            target: 'Khách hàng',
            value: '10%',
            type: 'Cố định',
            cycle: 'Hàng tháng',
            paymentMethod: 'Offline',
            status: 'Hoạt động',
            delete: <DeleteOutlined />
        },
        {
            key: '7',
            name: 'Phí giao dịch',
            target: 'Khách hàng',
            value: '10%',
            type: 'Cố định',
            cycle: 'Hàng tháng',
            paymentMethod: 'Online',
            status: 'Không hoạt động',
            delete: <DeleteOutlined />
        },
        {
            key: '8',
            name: 'Phí giao dịch',
            target: 'Khách hàng',
            value: '10%',
            type: 'Cố định',
            cycle: 'Hàng tháng',
            paymentMethod: 'Online',
            status: 'Hoạt động',
            delete: <DeleteOutlined />
        }
    ];

    const columns = [
        {
            title: 'Tên phí',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Đối tượng áp dụng',
            dataIndex: 'target',
            key: 'target',
        },
        {
            title: 'Giá trị phí',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Loại phí',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Chu kỳ áp dụng',
            dataIndex: 'cycle',
            key: 'cycle',
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Trạng thái hoạt động',
            key: 'status',
            dataIndex: 'status',
            render: (status) => (
                <Tag style={{ width: "8rem", textAlign: 'center' }} color={status === 'Hoạt động' ? '#5AB98D' : '#F3BF1B'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: <PlusOutlined />,
            dataIndex: 'delete',
            key: 'delete',
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    return (
        <main className="content-container-feelist">
            <div className="search-title-feelist-container">
                <span className="title-feelist">DANH SÁCH PHÍ</span>
                <NavLink to="/dashboard/create-fee" >
                    <Button className='add-fee'>Tạo phí<PlusOutlined /></Button>
                </NavLink>
                <Search
                    placeholder="Tìm kiếm"
                    allowClear
                    size="large"
                    onSearch={onSearch}
                    style={{ width: 350, padding: "16px" }}
                />
            </div>
            <div className='table-feelist-container'>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                />
            </div>
            <Outlet />
        </main>
    );
};

export default FeeManagement;
