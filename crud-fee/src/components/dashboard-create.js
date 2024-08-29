import React, { useState } from "react";
import { 
    AppstoreOutlined, 
    UserAddOutlined, 
    UserSwitchOutlined, 
    UserOutlined, 
    BellOutlined, 
    SearchOutlined, 
    InfoCircleOutlined,
    LogoutOutlined 
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Badge, Avatar, Dropdown, Space } from 'antd';
import { NavLink, Link } from "react-router-dom";
import "../css/dashboard.css"
import CreateFee from "./create-fee";

const { Header, Content, Sider } = Layout;

const items = [
    {
        label: <NavLink to="/dashboard">Chi tiết tài khoản</NavLink>,
        key: '0',
        icon: <UserOutlined />
    },
    {
        label: <NavLink to="/forgot-password">Đổi mật khẩu</NavLink>,
        key: '1',
        icon: <SearchOutlined />

    },
    {
        label: <NavLink to="/dashboard">Trợ giúp</NavLink>,
        key: '2',
        icon: <InfoCircleOutlined />
    },
    {
        label: <NavLink to="/">Đăng xuất</NavLink>,
        key: '3',
        icon: <LogoutOutlined />
    }
]

const getMenuItems = (label, key, icon, children) => {
    return {
        label, key, icon, children
    };
}

const MenuItems = [
    getMenuItems('Tài khoản', 'sub1', <UserOutlined />, [
        getMenuItems('Quản trị viên', '1'),
        getMenuItems('Nhà cung cấp', '2'),
        getMenuItems('Khách hàng', '3'),
        getMenuItems('Quyền chủ thể dữ liệu', '4')
    ]),
    getMenuItems('Phân quyền', 'sub2', <UserSwitchOutlined />, [
        getMenuItems('Quản trị viên', '5'),
        getMenuItems('Nhà cung cấp', '6'),
        getMenuItems('Khách hàng', '7'),
    ]),
    getMenuItems('Khách hàng', 'sub3', <UserAddOutlined />, [
        getMenuItems('Doanh nghiệp', '8'),
        getMenuItems('Cá nhân', '9'),
        getMenuItems('Hộ kinh doanh', '10'),
        getMenuItems('Nhóm khách hàng', '11'),
    ]),
    getMenuItems('Phân quyền', 'sub4', <AppstoreOutlined />, [
        getMenuItems('Hoa hồng', '12'),
        getMenuItems('Thanh toán hoa hồng', '13'),
        getMenuItems('Hoa hồng', '14'),
    ])
]

export default function DashboardCreate() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ display: 'flex', alignItems: 'center', background: '#2C3D94' }} >
                <NavLink to="/dashboard">
                    <img src="https://staging.onesme.vn/react/static/media/oneSME_Logo.27bbb32f.svg"
                        className="oneSME-logo"
                        alt="oneSME-logo" />
                </NavLink>
                <div className="notification-icon">
                    <Badge className="badge">
                        <BellOutlined />
                    </Badge>
                    <Dropdown menu={{ items, }} trigger={['click']}>
                        <Link onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar src={<img src="https://staging.onesme.vn/resources/upload/file/users/images/22052024/202405221000959d6f83-841e-49b4-9899-21746181ea3e.JPG" alt="avatar" />} />
                            </Space>
                        </Link>
                    </Dropdown>
                </div>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb 
                    style={{ margin: '16px 0' }} 
                    items={[
                        {
                            title: 'Quản lý dịch vụ'
                        },
                        {
                            title: <Link to="/dashboard">Danh sách Combo</Link>
                        }
                    ]} />
                <Layout>
                    <Sider collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                        style={{ background: '#000', width: 200 }}>
                        <Menu
                            theme="dark"
                            mode="inline"
                            items={MenuItems}
                            defaultSelectedKeys={['14']}
                            defaultOpenKeys={['sub4']}
                            style={{ height: '100%', minHeight: "100vh" }}
                        />
                    </Sider>
                    <CreateFee />
                </Layout>
            </Content>
        </Layout>
    )
}

