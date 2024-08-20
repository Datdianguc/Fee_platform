import React, { useState } from "react";
import {
    Button,
    Form,
    Input,
    Radio,
    Select,
    Switch,
    Collapse,
    message
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PriceInput from "./price-input";

export default function CreateFee() {

    const [radio, setRadio] = useState(null);
    const [feeName, setFeeName] = useState('');
    const [feeCode, setFeeCode] = useState('');
    const [paycheck, setPaycheck] = useState('');
    const [textArea, setTextArea] = useState('');
    const [feeType, setFeeType] = useState(null);
    const [feeCategories, setFeeCategories] = useState(null);
    const [activeStatus, setActiveStatus] = useState(false);
    const [price, setPrice] = useState({ number: 0, currency: 'VND' });

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { Option } = Select;

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:8081/api/fees/create",
                {
                    radio,
                    feeName,
                    paycheck,
                    textArea,
                    feeCode,
                    feeType,
                    feeCategories,
                    activeStatus,
                    price
                }
            )
            if (res.data.status) {
                navigate("/dashboard/detail", {
                    state: {
                        radio,
                        feeName,
                        paycheck,
                        textArea,
                        feeCode,
                        feeType,
                        feeCategories,
                        activeStatus,
                        price
                    }
                })
            }
        }
        catch (e) {
            console.log("Có lỗi không xác định đã xảy ra", e)
        }
    };

    const onFinishFailed = () => {
        message.error('Điền thất bại!');
    };

    const onPriceChange = (newPrice) => {
        setPrice(newPrice);
    }

      const checkPrice = (_, value) => {
        if (value.number > 0) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Price must be greater than zero!'));
      };

    return (
        <>
            <Form
                form={form}
                variant="outlined"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="vertical"
                style={{
                    padding: "0px 36px",
                    maxWidth: 1200,
                }}
                initialValues={{
                    price: {
                        number: 0,
                        currency: 'VND'
                    }
                }}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
            >
                <span className="title-feelist">TẠO PHÍ</span>
                <Collapse bordered={false} defaultActiveKey={['1', '2', '3']}>
                    <Collapse.Panel header="Đối tượng áp dụng" key="1">
                        <Form.Item
                            label="Đối tượng áp dụng"
                            name="feeRadio"
                            rules={[
                                {
                                    required: true,
                                    message: "Thiếu thông tin!"
                                },
                            ]}
                        >
                            <Radio.Group
                                onChange={(e) => setRadio(e.target.value)}
                                value={radio}>
                                <Radio value="Nhà cung cấp dịch vụ">Nhà cung cấp dịch vụ</Radio>
                                <Radio value="Khách hàng">Khách hàng</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Collapse.Panel>

                    <Collapse.Panel header="Thông tin chung" key="2">
                        <Form.Item>
                            <Form.Item
                                label="Tên phí"
                                name="feeName"
                                style={{ width: "100%" }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Thiếu thông tin!"
                                    },
                                ]}>
                                <Input
                                    placeholder="Nhập tên phí"
                                    maxLength={50}
                                    value={feeName}
                                    onChange={(value) => setFeeName(value)} />
                            </Form.Item>

                            <Form.Item
                                label="Mã phí"
                                name="feeCode"
                                style={{ width: "100%" }}
                                initialValue={Math.floor(100000 + Math.random() * 900000)}
                            >
                                <Input
                                    value={feeCode}
                                    prefix="FE"
                                    onChange={(value) => setFeeCode(value)}
                                    disabled
                                />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            label="Phương thức thanh toán"
                            name="paycheck"
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: "Thiếu thông tin!"
                                },
                            ]}>
                            <Select
                                value={paycheck}
                                onChange={(value) => setPaycheck(value)}
                                placeholder="Chọn phương thức thanh toán">
                                <Option value="Chuyển khoản">Chuyển khoản</Option>
                                <Option value="Thanh toán qua thẻ tín dụng">Thanh toán qua thẻ tín dụng</Option>
                                <Option value="Ví điện tử">Ví điện tử</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Mô tả"
                            name="textArea"
                            style={{ width: "100%" }} >
                            <Input.TextArea
                                value={textArea}
                                onChange={(e) => setTextArea(e.target.value)}
                                placeholder="Nhập mô tả"
                                maxLength={1000} />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái hoạt động"
                            name="Switch"
                            valuePropName="checked" >
                            <Switch
                                checked={activeStatus}
                                onChange={(checked) => setActiveStatus(checked)}
                            />
                        </Form.Item>
                    </Collapse.Panel>

                    <Collapse.Panel header="Thông tin phân loại" key="3">
                        <Form.Item
                            label="Kiểu phí"
                            name="feeType"
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: "Thiếu thông tin!"
                                },
                            ]}>
                            <Select
                                value={feeType}
                                onChange={(value) => setFeeType(value)}
                                placeholder="Phí cố định">
                                <Option value="Phí cố định">Phí cố định</Option>
                                <Option value="Phí tùy biến">Phí tùy biến</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Loại phí"
                            name="feeCategories"
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: "Thiếu thông tin!"
                                },
                            ]}>
                            <Select
                                value={feeCategories}
                                onChange={(value) => setFeeCategories(value)}
                                placeholder="Chọn loại phí">
                                <Option value="Phí cố định">Phí cố định</Option>
                                <Option value="Phí định kỳ">Phí định kỳ</Option>
                                <Option value="Phân tầng">Phân tầng</Option>
                                <Option value="Phân chia doanh thu">Phân chia doanh thu</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Giá trị phí"
                            name="feeValue"
                            rules={[
                                {
                                    required: true,
                                    message: "Thiếu thông tin!",
                                    validator: checkPrice,
                                },
                            ]}>
                            <PriceInput value={price} onChange={onPriceChange} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Collapse.Panel>
                </Collapse>
            </Form>
        </>
    )
}
