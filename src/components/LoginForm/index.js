import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, message, Row } from 'antd';
import { loginUser, useAuthDispatch, useAuthState } from '../../context';
import { useHistory, useLocation } from 'react-router-dom';
import * as S from './style';
const LoginForm = () => {
    const history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const dispatch = useAuthDispatch();
    const { loading, errorMessage, token } = useAuthState();
    const onFinish = async (values) => {
        await loginUser(dispatch, { email: values.username, password: values.password }).then(response => {
            if (response?.jwt) {
                history.replace(from);
            }
            else {
                if (errorMessage !== null) {
                    message.error(errorMessage);
                }
            }
        });
    };
    useEffect(() => {
        if (token) {
            history.replace(from);
        }
        if (errorMessage !== null) {
            message.error(errorMessage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorMessage])
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <Row align="middle" justify="center" style={{ minHeight: "100vh" }}>
        <S.borderLogin
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </S.borderLogin>

    </Row>
};
export default LoginForm;