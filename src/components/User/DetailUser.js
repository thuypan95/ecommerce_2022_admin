import { Col, Row, Form, Input, Button, Typography, message, Switch } from "antd";
import { useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useEditUser, useUserDetail } from "../../api/useUser";
const DetailUser = () => {
    const { id } = useParams();
    const style = { background: '#fff', padding: '16px' };
    const { Title } = Typography;
    const queryClient = useQueryClient();


    const onSuccess = data => {
        queryClient.invalidateQueries(['user-detail', id]);
        message.success('Edit success!');

    }
    const onError = error => {
        console.log({ error })
    }
    const { isLoading: isLoadingEdit, mutate } = useEditUser(onSuccess, onError);
    const { isLoading, data, isError, error } = useUserDetail(id);



    const onFinish = async (values) => {
        console.log(values)
        const dataEdit = {
            blocked: values.blocked
        }
        mutate({ id, data: dataEdit });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }
    return <>
        <Form
            initialValues={{
                "username": data?.data?.username,
                "email": data?.data?.email,
                "first_name": data?.data?.info_address?.first_name,
                "last_name": data?.data?.info_address?.last_name,
                "phone_number": data?.data?.info_address?.phone_number,
                "address": data?.data?.info_address?.address,
                "city": data?.data?.info_address?.city,
                "state": data?.data?.info_address?.state,
                "blocked": data?.data?.blocked
            }}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off" >
            <Row justify="space-between" style={{ marginBottom: '10px' }}>
                <Title level={3}>Edit an entry</Title>
                <Button htmlType="submit" size="large" type="primary" loading={isLoadingEdit}>
                    Submit
                </Button>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <div style={style}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Blocked" name="blocked" valuePropName="checked">
                                    <Switch
                                        checkedChildren="ON"
                                        unCheckedChildren="OFF"
                                        defaultChecked={data?.data.blocked} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Username" name="username" >
                                    <Input disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email" name="email">
                                    <Input disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="First Name" name="first_name" >
                                    <Input disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Last name" name="last_name">
                                    <Input disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Phone number" name="phone_number" >
                                    <Input disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Address" name="address">
                                    <Input disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="City" name="city" >
                                    <Input disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="State" name="state">
                                    <Input disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>

                    </div>
                </Col>
            </Row>
        </Form>
    </>
}
export default DetailUser;