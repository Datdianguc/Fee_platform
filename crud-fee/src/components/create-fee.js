import React, { useState } from "react";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateFee() {
    const [radio, setRadio] = useState(null);
    const [feeName, setFeeName] = useState(null);
    const [paycheck, setPaycheck] = useState(null);
    const [textArea, setTextArea] = useState(null);
    const [feeType, setFeeType] = useState(null);
    const [feeCategories, setFeeCategories] = useState(null);
    const [feeValue, setFeeValue] = useState(null);
    const [activeStatus, setActiveStatus] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            const res = await axios.post("http://localhost:8081/api/users/login",
                {
                    radio,
                    feeName,
                    paycheck,
                    textArea,
                    feeType,
                    feeCategories,
                    feeValue
                }
            )
            if (res.data.status) {
                navigate("/dashboard/detail")
            }
        }
        catch (e) {
            console.log("Có lỗi không xác định đã xảy ra", e)
        }
    };

    return (
        <>
            <Form
                variant="outlined"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="vertical"
                style={{
                    padding: "0px 36px",
                    maxWidth: 1200,
                }}
                onFinish={handleSubmit}>
                <span className="title-feelist">TẠO PHÍ</span>

                <Form.Item style={{ paddingTop: 20 }}>
                    <Radio.Group
                        onChange={(e) => setRadio(e.target.value)}
                        value={radio}>
                        <Radio value="Nhà cung cấp dịch vụ">Nhà cung cấp dịch vụ</Radio>
                        <Radio value="Khách hàng">Khách hàng</Radio>
                    </Radio.Group>
                </Form.Item>

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
                    // todo: fetch key from database -> generate random fee code
                    >
                        <Input disabled />
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
                        <Select.Option value="Chuyển khoản">Chuyển khoản</Select.Option>
                        <Select.Option value="Thanh toán qua thẻ tín dụng">Thanh toán qua thẻ tín dụng</Select.Option>
                        <Select.Option value="Ví điện tử">Ví điện tử</Select.Option>
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
                    style={{ color: "#1bf740" }}
                    checked={activeStatus}
                    onChange={(checked) => setActiveStatus(checked)}
                    />
                </Form.Item>

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
                        <Select.Option value="Phí cố định">Phí cố định</Select.Option>
                        <Select.Option value="Phí tùy biến">Phí tùy biến</Select.Option>
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
                        <Select.Option value="Phí cố định">Phí cố định</Select.Option>
                        <Select.Option value="Phí định kỳ">Phí định kỳ</Select.Option>
                        <Select.Option value="Phân tầng">Phân tầng</Select.Option>
                        <Select.Option value="Phân chia doanh thu">Phân chia doanh thu</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Giá trị phí"
                    name="feeValue"
                    rules={[
                        {
                            required: true,
                            message: "Thiếu thông tin!"
                        }
                    ]}>
                    <InputNumber
                        type="number"
                        value={feeValue}
                        onChange={(value) => setFeeValue(value)}
                        style={{ width: "100%" }}
                        suffix="VND"
                        changeOnWheel />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
