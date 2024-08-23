import React from 'react';
import { Form, Input, InputNumber, Radio, Select, Switch, Collapse, Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { useLocation, NavLink } from 'react-router-dom';

export default function Detail() {
    const location = useLocation();
    const data = location.state || {}; 

    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="vertical"
            style={{ padding: "0px 36px", width: 1200 }}
        >
            <h2 style={{padding: "20px 100px", }}>CHI TIẾT PHÍ</h2>
            
            <Collapse bordered={false} defaultActiveKey={['1', '2', '3']}>
                <Collapse.Panel header="Đối tượng áp dụng" key="1">
                    <Form.Item label="Đối tượng áp dụng">
                        <Radio.Group value={data.radio}>
                            <Radio value="Nhà cung cấp dịch vụ">Nhà cung cấp dịch vụ</Radio>
                            <Radio value="Khách hàng">Khách hàng</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Collapse.Panel>
                
                <Collapse.Panel header="Thông tin chung" key="2">
                    <Form.Item label="Tên phí">
                        <Input value={data.feeName} disabled />
                    </Form.Item>
                    <Form.Item label="Mã phí">
                        <Input value={data.feeCode} disabled />
                    </Form.Item>
                    <Form.Item label="Phương thức thanh toán">
                        <Input value={data.paycheck} disabled />
                    </Form.Item>
                    <Form.Item label="Mô tả">
                        <Input.TextArea value={data.textArea} disabled />
                    </Form.Item>
                    <Form.Item label="Trạng thái hoạt động">
                        <Switch checked={data.activeStatus} disabled />
                    </Form.Item>
                </Collapse.Panel>
                
                <Collapse.Panel header="Thông tin phân loại" key="3">
                    <Form.Item label="Kiểu phí">
                        <Select value={data.feeType} disabled>
                            <Select.Option value="Phí cố định">Phí cố định</Select.Option>
                            <Select.Option value="Phí tùy biến">Phí tùy biến</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Loại phí">
                        <Select value={data.feeCategories} disabled>
                            <Select.Option value="Phí cố định">Phí cố định</Select.Option>
                            <Select.Option value="Phí định kỳ">Phí định kỳ</Select.Option>
                            <Select.Option value="Phân tầng">Phân tầng</Select.Option>
                            <Select.Option value="Phân chia doanh thu">Phân chia doanh thu</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Giá trị phí">
                        <InputNumber value={data.feeValue} disabled style={{ width: "100%" }} suffix="VND" />
                    </Form.Item>
                    <Form.Item>
                        <NavLink to="/dashboard">
                            <Button>Return to Dashboard <RollbackOutlined /> </Button>
                        </NavLink>
                    </Form.Item>
                </Collapse.Panel>
            </Collapse>
        </Form>
    );
}
