import React, { useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import api from "./baseURL";
import PriceInput from "./price-input";
const randomNumber = Math.floor(100000 + Math.random() * 900000);

export default function CreateFee() {

    const [radio, setRadio] = useState(null);
    const [feeName, setFeeName] = useState('');
    const [feeCode, setFeeCode] = useState(randomNumber);
    const [paycheck, setPaycheck] = useState(null);
    const [textArea, setTextArea] = useState('');
    const [feeType, setFeeType] = useState(null);
    const [feeCategories, setFeeCategories] = useState(null);
    const [activeStatus, setActiveStatus] = useState(false);
    const [price, setPrice] = useState({ number: 0, currency: 'VND' });

    const [form] = Form.useForm();
    const {state} = useLocation();
    const navigate = useNavigate();
    const { Option } = Select;

    useEffect(() => {
        if (state) {
            setRadio(state.radio);
            setFeeName(state.feeName);
            setFeeCode(state.feeCode);
            setPaycheck(state.paycheck);
            setTextArea(state.textArea);
            setFeeType(state.feeType);
            setFeeCategories(state.feeCategories);
            setActiveStatus(state.activeStatus);
            setPrice(state.price);
        }
    }, [state])

    const handleSubmit = async () => {
        try {
            const payload = {
                radio,
                feeName,
                paycheck,
                textArea,
                feeCode,
                feeType,
                feeCategories,
                activeStatus,
                price
            };
            if (state) {
                await api.put(`/fees/update/${state.key}`, payload);
            } else {
                await api.post("/fees/create", payload);
            }
            navigate("/dashboard/detail");
        } catch (e) {
            console.log("An error occurred:", e);
        }
    };

    const onFinishFailed = () => {
        message.error('Điền thất bại!');
    };

    const onPriceChange = (newPrice) => {
        setPrice(newPrice);
    }

    return (
        <>
            <Form
                form={form}
                variant="outlined"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 20 }}
                layout="vertical"
                style={{
                    padding: "0px 36px",
                    width: 1500
                }}
                initialValues={{
                    price: {
                        number: 0,
                        currency: 'VND'
                    }
                }}
                scrollToFirstError={true}
                size="large"
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
            >
                <span className="title-feelist" style={{padding: 500}}>TẠO PHÍ</span>
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
                                <Radio value={1}>Nhà cung cấp dịch vụ</Radio>
                                <Radio value={2}>Khách hàng</Radio>
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
                                    onChange={(e) => setFeeName(e.target.value)} />
                            </Form.Item>

                            <Form.Item
                                label="Mã phí"
                                name="feeCode"
                                style={{ width: "100%" }}
                                initialValue={randomNumber}
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
                                <Option value={1}>Chuyển khoản</Option>
                                <Option value={2}>Thanh toán qua thẻ tín dụng</Option>
                                <Option value={3}>Ví điện tử</Option>
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
                                <Option value={1}>Phí cố định</Option>
                                <Option value={2}>Phí tùy biến</Option>
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
                                <Option value={1}>Phí cố định</Option>
                                <Option value={2}>Phí định kỳ</Option>
                                <Option value={3}>Phân tầng</Option>
                                <Option value={4}>Phân chia doanh thu</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Giá trị phí"
                            name="feeValue"
                            rules={[
                                {
                                    required: true,
                                    message: "Thiếu thông tin!",
                                },
                            ]}>
                            <PriceInput value={price} onChange={onPriceChange} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {state ? 'Update' : 'Submit'}
                            </Button>
                        </Form.Item>
                    </Collapse.Panel>
                </Collapse>
            </Form>
        </>
    )
}
