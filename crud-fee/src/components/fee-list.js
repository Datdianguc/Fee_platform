import React from 'react';
import { Table, Tag, Button } from 'antd';
import { useState } from 'react';

const FeeManagement = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
                <Tag color={status === 'Hoạt động' ? '#5AB98D' : '#F3BF1B'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    return (
        <main className="p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
                <div className="font-bold text-xl leading-10 uppercase">DANH SÁCH PHÍ</div>
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="border p-2 rounded-lg w-1/3"
                />
                <Button type="primary">Tạo phí</Button>
            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
            />
        </main>
    );
};

export default FeeManagement;
