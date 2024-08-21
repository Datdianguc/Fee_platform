import React, { useState, useEffect } from 'react';
import { Table, Tag, Input, Button } from 'antd';
import "../css/fee-list.css"
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const { Search } = Input;

const FeeManagement = (props) => {
    const { radio, feeName, paycheck, activeStatus, price, feeCatergories } = props;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const handleDelete = async (item) => {
        try {
            await axios.delete(`http://192.168.1.15:8081/api/fees/${item.id}`)
            setData(prevState => prevState.filter(i => i.id !== item.id));
        } catch(error) {
            console.log("Không thể xóa dữ liệu:", error)
        }
    };

    const onSearch = (value, _e, info) => console.log(info?.source, value);


    const columns = [
        {
            title: 'Tên phí',
            dataIndex: feeName,
        },
        {
            title: 'Đối tượng áp dụng',
            dataIndex: radio,
        },
        {
            title: 'Giá trị phí',
            dataIndex: price
        },
        {
            title: 'Loại phí',
            dataIndex: feeCatergories,
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
            dataIndex: paycheck,

        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: activeStatus,
            render: (status) => (
                <Tag style={{ width: "8rem", textAlign: 'center' }} color={status === 'Hoạt động' ? '#5AB98D' : '#F3BF1B'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: <PlusOutlined />,
            dataIndex: 'delete',
            delete: <button className='delete' onClick={() => handleDelete(data)}><DeleteOutlined /></button>
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://192.168.1.15:8081/api/fees");
            if (res.data.status) {
                setData(res.data.data);
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
    })

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
                    pagination={tableParams.pagination}
                    loading={loading}
                />
            </div>
        </main>
    );
};

export default FeeManagement;
