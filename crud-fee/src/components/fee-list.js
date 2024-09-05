import React, { useState, useEffect } from 'react';
import { Table, Tag, Input, Button } from 'antd';
import "../css/fee-list.css"
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Route, useNavigate } from 'react-router-dom';
import api from './baseURL';
import CreateFee from './create-fee';

const { Search } = Input;

const FeeManagement = (props) => {
    const { radio,
        feeName,
        paycheck,
        feeCode,
        feeCategories,
        activeStatus,
    } = props;
    const navigate = useNavigate();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get("/fees/");
            if (res.status === 200) {
                const mappedItem = res.data.map((item, index) => ({
                    ...item,
                    key: item.id || index
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

    const addNewFee = (newFee) => {
        setData(prevData => [...prevData, newFee]);
    };

    const handleDelete = async (key) => {
        try {
            await api.delete(`/fees/delete/${key}`)
            const newData = data.filter((item) => item.key !== key)
            setData(newData)
        } catch (error) {
            console.log("Không thể xóa dữ liệu:", error)
        }
    };

    const handleUpdate = async (updatedItem) => {
        navigate(`/dashboard/create-fee`, { state: { ...updatedItem } });
        try {
            const res = await api.patch(`/fees/update/${updatedItem.key}`, updatedItem);

            if (res.status === 200) {
                setData((prevData) =>
                    prevData.map(item => item.key === updatedItem.key ? { ...updatedItem, ...res.data } : item)
                );
            }
        } catch (error) {
            console.error('Cập nhật thất bại', error);
        }
    };

    const columns = [
        {
            title: 'Tên phí',
            dataIndex: 'feeName',
            render: () => (feeName)
        },
        {
            title: 'Đối tượng áp dụng',
            dataIndex: 'radio',
            render: () => (radio === 1 ? "Nhà cung cấp dịch vụ" : "Khách hàng")
        },
        {
            title: 'Giá trị phí',
            dataIndex: 'price',
            render: (price) => `${price.number} ${price.currency}`
        },
        {
            title: 'Loại phí',
            dataIndex: 'feeCategories',
            render: () => {
                switch (feeCategories) {
                    case 1:
                        return 'Phí cố định';
                    case 2:
                        return 'Phí định kỳ';
                    case 3:
                        return 'Phân tầng';
                    case 4:
                        return 'Phân chia doanh thu';
                    default:
                        return 'Unknown';
                }
            }
        },
        {
            title: 'Mã phí',
            dataIndex: `feeCode`,
            render: () => (feeCode)
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paycheck',
            render: () => {
                switch (paycheck) {
                    case 1:
                        return 'Chuyển khoản';
                    case 2:
                        return 'Thanh toán qua thẻ tín dụng';
                    case 3:
                        return 'Ví điện tử';
                    default:
                        return 'unknown';
                }
            }
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'activeStatus',
            render: () => (
                <Tag style={{ width: "8rem", height: "2rem", textAlign: 'center' }} color={activeStatus === 'Hoạt động' ? '#5AB98D' : '#F3BF1B'}>
                    {activeStatus}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleUpdate(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
                </>
            ),
        }
    ];

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],

    };

    return (
        <main className="content-container-feelist">
            <div className="search-title-feelist-container">
                <span className="title-feelist">DANH SÁCH PHÍ</span>
                <Route path="/dashboard/create-fee" element={<CreateFee addNewFee={addNewFee} />}>
                    <Button className='add-fee'>Tạo phí<PlusOutlined /></Button>
                </Route>
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
                    rowKey={(record) => {
                        return record.key;
                    }}
                    rowSelection={{
                        ...rowSelection,
                        preserveSelectedRowKeys: true,
                    }}
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
