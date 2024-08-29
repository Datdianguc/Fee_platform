import React, { useState, useEffect } from 'react';
import { Table, Tag, Input, Button } from 'antd';
import "../css/fee-list.css"
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import api from './baseURL';

const { Search } = Input;

const FeeManagement = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const navigate = useNavigate();

    const handleDelete = async (item) => {
        try {
            await api.delete(`/fees/delete/${item.id}`)
            setData(prevData => prevData.filter(i => i.id !== item.id));
        } catch (error) {
            console.log("Không thể xóa dữ liệu:", error)
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get("/fees/");
            if (res.status === 200) {
                const mappedItem = res.data.map((item) => ({
                    key: item.id, // Ensure unique key for each row
                    feeName: item.feeName,
                    radio: item.radio,
                    price: {
                        number: item.price.number,
                        currency: item.price.currency,
                    },
                    feeCategories: item.feeCategories,
                    cycle: item.cycle,
                    paycheck: item.paycheck,
                    activeStatus: item.activeStatus,
                }));
                setData(mappedItem);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res.data.totalCount,
                    },
                });
            } else {
                console.log("Lấy thông tin thất bại: ", res.data.message);
            }
        } catch (error) {
            console.error("Không thể lấy thông tin:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = (record) => {
        navigate(`/dashboard/create-fee`, {state: {...record} })
    };

    const columns = [
        {
            title: 'Tên phí',
            dataIndex: 'feeName',
        },
        {
            title: 'Đối tượng áp dụng',
            dataIndex: 'radio',
        },
        {
            title: 'Giá trị phí',
            dataIndex: 'price',
            render: (price) => `${price.number} ${price.currency}`
        },
        {
            title: 'Loại phí',
            dataIndex: 'feeCatergories',
            filter: [
                {
                    text: 'Phí cố định',
                    value: 'Phí cố định'
                },
                {
                    text: 'Phí định kỳ',
                    value: 'Phí định kỳ',
                },
                {
                    text: 'Phân tầng',
                    value: 'Phân tầng',
                },
                {
                    text: 'Phân chia doanh thu',
                    value: 'Phân chia doanh thu',
                }
            ]

        },
        {
            title: 'Chu kỳ áp dụng',
            dataIndex: 'cycle',
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paycheck',

        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'activeStatus',
            render: (status) => (
                <Tag style={{ width: "8rem", textAlign: 'center' }} color={status === 'Hoạt động' ? '#5AB98D' : '#F3BF1B'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleUpdate(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
                </>
            ),
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
                    onSearch={value => console.log(value)}
                    style={{ width: 350, padding: "16px" }}
                />
            </div>
            <div className='table-feelist-container'>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={(pagination) => setTableParams({ pagination })}
                />
            </div>
        </main >
    );
};
export default FeeManagement;
