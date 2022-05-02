import { Col, Row, Typography, Descriptions, List, Avatar, Tag } from "antd";
import { useParams } from "react-router";
import { useOrderDetail } from "../../api/useOrder";
const DetailOrder = () => {
    const { id } = useParams();
    const style = { background: '#fff', padding: '16px' };
    const { Title, Text } = Typography;

    const { isLoading, data, isError, error } = useOrderDetail(id);


    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }
    return <>
        <Row gutter={16}>
            <Col span={12}>
                <div style={style}>
                    <Descriptions title="Shipping Information" column={1}>
                        <Descriptions.Item label="Full name">{data?.data?.info_shipping?.first_name} {data?.data?.info_shipping?.last_name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{data?.data?.user_id?.email}</Descriptions.Item>
                        <Descriptions.Item label="Telephone">{data?.data?.info_shipping?.phone_number}</Descriptions.Item>
                        <Descriptions.Item label="Address">{data?.data?.info_shipping?.address} {data?.data?.info_shipping?.city} {data?.data?.info_shipping?.state}</Descriptions.Item>
                    </Descriptions>
                </div>
            </Col>
            <Col span={12}>
                <div style={style}>
                    <Row justify="space-between" align="middle" style={{ marginBottom: '10px' }}>
                        <Title level={5}>Order #{data?.data?.number_order} </Title>
                        <Tag color="green">{data?.data?.status}</Tag>
                    </Row>
                    <List
                        dataSource={data?.data?.dishes}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.imgUrl} />}
                                    title={<a href="https://ant.design">{item.name}</a>}
                                    description={`Size: ${item.size} - Color: ${item.color}`}
                                />
                                <Text strong>${item.price}</Text>
                            </List.Item>
                        )} />
                    <Row justify="end" align="middle" >
                        <Col span={12}>
                            <Row justify="space-between" align="middle" style={{ paddingBottom: '10px', borderBottom: '1px dashed #ddd' }}>
                                <Text >Shipping fee</Text>
                                <Text strong>$0</Text>
                            </Row>
                            <Row justify="space-between" align="middle">
                                <Text strong>Total</Text>
                                <Title level={4}>${data?.data?.amount} </Title>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>

        {/* <Form
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
        
            autoComplete="off" >
            <Row justify="space-between" style={{ marginBottom: '10px' }}>
                <Title level={3}>Edit an entry</Title>
               
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
        </Form> */}
    </>
}
export default DetailOrder;