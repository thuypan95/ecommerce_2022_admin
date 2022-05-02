import { Menu } from 'antd';
import * as S from './style';
import {
    ContainerOutlined,
    DashboardOutlined,
    UserOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    SwitcherOutlined,
    DatabaseOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
const LayoutSider = (props) => {
    const { SubMenu } = Menu;
    const rootKeys = ['/', '/users', '/products', '/categories', '/colors', '/sizes', '/orders'];
    const [openKeys, setOpenKeys] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (!props.collapsed) {
            setOpenKeys(props.defaultOpenKeys);
        }
    }, [props.defaultOpenKeys, props.collapsed]);
    const onOpenChange = items => {
        const latestOpenKey = items.find(key => openKeys.indexOf(key) === -1);
        if (rootKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(items);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : props.defaultOpenKeys);
        }
    };

    return <S.StyledSider trigger={null} collapsible collapsed={props.collapsed}>
        <S.Logo>{!props.collapsed ? 'Replei 1995' : 'R95'} </S.Logo>
        <Menu theme="dark"
            defaultSelectedKeys={['/']}
            openKeys={openKeys}
            selectedKeys={[location.pathname]}
            onOpenChange={onOpenChange}
            mode="inline">
            <Menu.Item key="/" icon={<DashboardOutlined />}>
                Dashboard
                <Link to="/" />
            </Menu.Item>
            <Menu.Item key="/users" icon={<UserOutlined />}>
                Users
                <Link to="/users" />
            </Menu.Item>
            <SubMenu key="/products" icon={<DatabaseOutlined />} title="Products">
                <Menu.Item key="/products/list">Products list <Link to="/products/list" /></Menu.Item>
                <Menu.Item key="/products/add">Add Product<Link to="/products/add" /></Menu.Item>
            </SubMenu>

            <SubMenu key="/categories" icon={<SwitcherOutlined />} title="Categories">
                <Menu.Item key="/categories/list">Categories list <Link to="/categories/list" /></Menu.Item>
                <Menu.Item key="/categories/add">Add Category<Link to="/categories/add" /></Menu.Item>
            </SubMenu>
            <SubMenu key="/colors" icon={<BgColorsOutlined />} title="Colors">
                <Menu.Item key="/colors/list">Colors list <Link to="/colors/list" /></Menu.Item>
                <Menu.Item key="/colors/add">Add Colors<Link to="/colors/add" /></Menu.Item>
            </SubMenu>
            <SubMenu key="/sizes" icon={<FontSizeOutlined />} title="Sizes">
                <Menu.Item key="/sizes/list">Sizes list <Link to="/sizes/list" /></Menu.Item>
                <Menu.Item key="/sizes/add">Add Sizes<Link to="/sizes/add" /></Menu.Item>
            </SubMenu>
            <Menu.Item key="/orders" icon={<ContainerOutlined />}>
                Orders
                <Link to="/orders/list" />
            </Menu.Item>
        </Menu>
    </S.StyledSider>
}
export default LayoutSider;