import { Layout, notification } from 'antd';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import React, { useEffect } from "react";
import { useState } from 'react';
import 'antd/dist/antd.css'
import LayoutSider from './Sider/LayoutSider';
import HomeCom from '../Home';
import { SmileOutlined } from '@ant-design/icons';
import { useAuthState } from '../../context';
import LayoutHeader from './Header/LayoutHeader';
import { socket } from '../../socket';
import { request } from '../../utils/axios-utils';

const ListUser = React.lazy(() => import('../User/ListUser'));
const DetailUser = React.lazy(() => import('../User/DetailUser'));
const ListProduct = React.lazy(() => import('../Product/ListProduct'));
const AddProduct = React.lazy(() => import('../Product/AddProduct'));
const EditProduct = React.lazy(() => import('../Product/EditProduct'));
const ListCategory = React.lazy(() => import('../Category/ListCategory'));
const AddCategory = React.lazy(() => import('../Category/AddCategory'));
const EditCategory = React.lazy(() => import('../Category/EditCategory'));
const ListColor = React.lazy(() => import('../Color/ListColor'));
const AddColor = React.lazy(() => import('../Color/AddColor'));
const EditColor = React.lazy(() => import('../Color/EditColor'));
const ListSize = React.lazy(() => import('../Size/ListSize'));
const AddSize = React.lazy(() => import('../Size/AddSize'));
const EditSize = React.lazy(() => import('../Size/EditSize'));
const ListOrder = React.lazy(() => import('../Order/ListOrder'));
const DetailOrder = React.lazy(() => import('../Order/DetailOrder'));
const DetailNotify = React.lazy(() => import('../Notification/DetailNotify'));
const DetailComment = React.lazy(() => import('../Comment/DetailComment'));
function PrivateRoute({ children, ...rest }) {
    const { token } = useAuthState();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }} />)} />);
}
const DefaultLayout = (props) => {
    const location = useLocation();
    const [defaultOpenKeys, setdefaultOpenKeys] = useState('')
    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [listNotify, setListNotify] = useState([]);
    const [countNotify, setCountNotify] = useState(0);
    useEffect(() => {
        setdefaultOpenKeys(`/${location.pathname.split('/')[1]}`);
    }, [location.pathname]);

    useEffect(() => {
        socket.on('newCommentAdded', (res) => {
            if (res) {
                const comment = res.comment;
                const data = { comment: comment, order: null }
                request({ url: 'notifications', method: 'post', data: data }).then((response) => {
                    if (response.data) {
                        setListNotify((listNotify) => [response.data, ...listNotify])
                        setCountNotify((countNotify) => countNotify + 1)
                    }
                    notification.open({
                        message: 'You just received a comment!',
                        description: <> <span style={{ fontWeight: 'bold' }}> {comment.users_permissions_user.username}: </span>{comment.comment_content}</>,
                        placement: 'bottomRight',
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    });
                })
                    .catch(err => {
                        console.log("err", err);
                    })
            }
        });
        socket.on('newOrderAdded', (res) => {
            console.log('ds')
            if (res) {
                const order = res?.order;
                const data = { order: order, comment: null }
                console.log('res', res);
                request({ url: 'notifications', method: 'post', data: data }).then((response) => {

                    if (response.data) {
                        setListNotify((listNotify) => [response.data, ...listNotify])
                        setCountNotify((countNotify) => countNotify + 1)
                    }
                    notification.open({
                        message: 'You just received a order!',
                        description: <> <span style={{ fontWeight: 'bold' }}> {res?.user_id?.username} just created an order </span></>,
                        placement: 'bottomRight',
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    });
                })
                    .catch(err => {
                        console.log("err", err);
                    })
            }
        });

        return () => {
            socket.close();
        };
    }, []);
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    return <React.Fragment>
        <Layout>
            <LayoutSider collapsed={collapsed} defaultOpenKeys={[defaultOpenKeys]} />
            <Layout className="site-layout">
                <LayoutHeader toggle={toggle}
                    collapsed={collapsed}
                    listNotify={listNotify}
                    setListNotify={setListNotify}
                    countNotify={countNotify}
                    setCountNotify={setCountNotify} />
                <Content style={{ padding: 24 }}>
                    <Switch>
                        <PrivateRoute exact path='/'>
                            <HomeCom />
                        </PrivateRoute>
                        <PrivateRoute exact path='/users'>
                            <ListUser />
                        </PrivateRoute>
                        <PrivateRoute exact path='/users/:id'>
                            <DetailUser />
                        </PrivateRoute>
                        <PrivateRoute exact path='/products/list'>
                            <ListProduct />
                        </PrivateRoute>
                        <PrivateRoute exact path='/products/add'>
                            <AddProduct />
                        </PrivateRoute>
                        <PrivateRoute exact path='/products/edit/:id'>
                            <EditProduct />
                        </PrivateRoute>
                        <PrivateRoute exact path='/categories/list'>
                            <ListCategory />
                        </PrivateRoute>
                        <PrivateRoute exact path='/categories/add'>
                            <AddCategory />
                        </PrivateRoute>
                        <PrivateRoute exact path='/categories/edit/:id'>
                            <EditCategory />
                        </PrivateRoute>
                        <PrivateRoute exact path='/colors/list'>
                            <ListColor />
                        </PrivateRoute>
                        <PrivateRoute exact path='/colors/add'>
                            <AddColor />
                        </PrivateRoute>
                        <PrivateRoute exact path='/colors/edit/:id'>
                            <EditColor />
                        </PrivateRoute>
                        <PrivateRoute exact path='/sizes/list'>
                            <ListSize />
                        </PrivateRoute>
                        <PrivateRoute exact path='/sizes/add'>
                            <AddSize />
                        </PrivateRoute>
                        <PrivateRoute exact path='/sizes/edit/:id'>
                            <EditSize />
                        </PrivateRoute>
                        <PrivateRoute exact path='/orders/list'>
                            <ListOrder />
                        </PrivateRoute>
                        <PrivateRoute exact path='/orders/:id'>
                            <DetailOrder />
                        </PrivateRoute>
                        <PrivateRoute exact path='/notifications/:id'>
                            <DetailNotify />
                        </PrivateRoute>
                        <PrivateRoute exact path='/products/comments'>
                            <DetailComment />
                        </PrivateRoute>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    </React.Fragment>
}
export default DefaultLayout;
