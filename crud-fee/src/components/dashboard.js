import React, { useState } from "react";
import { AppstoreOutlined, UserAddOutlined, UserSwitchOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink } from "react-router-dom";
import FeeManagement from "./fee-list";
const { Header, Content, Sider } = Layout;

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{minHeight: "100vh"}}>
            <Header style={{ display: 'flex', alignItems: 'center', background: '#2C3D94' }} >
                <NavLink to="/dashboard">
                    <img src="https://staging.onesme.vn/static/media/oneSME_Logo.27bbb32f.svg"
                        className="oneSME-logo"
                        alt="oneSME-logo" />
                </NavLink>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Quản lý dịch vụ</Breadcrumb.Item>
                    <Breadcrumb.Item>Danh sách Combo</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}>
                    <Sider collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                        style={{ background: '#000', width: 200 }}>
                        <Menu
                            theme="dark"    
                            mode="inline"
                            defaultSelectedKeys={['14']}
                            defaultOpenKeys={['sub4']}
                            style={{ height: '100%', minHeight: "100vh" }}
                        >
                            <Menu.SubMenu key={"sub1"} icon={<UserOutlined />} title="Tài khoản">
                                <Menu.Item key={"1"}>Quản trị viên</Menu.Item>
                                <Menu.Item key={"2"}>Nhà cung cấp</Menu.Item>
                                <Menu.Item key={"3"}>Khách hàng</Menu.Item>
                                <Menu.Item key={"4"}>Quyền chủ thể dữ liệu</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key={"sub2"} icon={<UserSwitchOutlined />} title="Phân quyền">
                                <Menu.Item key={"5"}>Quản trị viên</Menu.Item>
                                <Menu.Item key={"6"}>Nhà cung cấp</Menu.Item>
                                <Menu.Item key={"7"}>Khách hàng</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key={"sub3"} icon={<UserAddOutlined />} title="Khách hàng">
                                <Menu.Item key={"8"}>Doanh nghiệp</Menu.Item>
                                <Menu.Item key={"9"}>Cá nhân</Menu.Item>
                                <Menu.Item key={"10"}>Hộ kinh doanh</Menu.Item>
                                <Menu.Item key={"11"}>Nhóm khách hàng</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key={"sub4"} icon={<AppstoreOutlined />} title="Phân quyền">
                                <Menu.Item key={"12"}>Hoa hồng</Menu.Item>
                                <Menu.Item key={"13"}>Thanh toán hoa hồng</Menu.Item>
                                <Menu.Item key={"14"}>Phí</Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Sider>
                    <FeeManagement />
                </Layout>
            </Content>
        </Layout>
    )
}



