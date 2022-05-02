import { Col, Row, Form, Input, Button, Typography } from "antd";
import { useHistory } from "react-router";
import { useAddSize } from "../../api/useSize";
const AddSize = () => {
    const history = useHistory();
    const style = { background: '#fff', padding: '16px' };
    const { Title } = Typography;
    const onSuccess = data => {
        history.push('/sizes/list');
    }

    const onError = error => {
        console.log({ error })
    }
    const { isLoading, mutate, } = useAddSize(onSuccess, onError);
    const onFinish = async (values) => {
        const data = {
            name: values.name,
        }
        mutate({ data });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <div>
        <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off" >
            <Row justify="space-between" style={{ marginBottom: '10px' }}>
                <Title level={3}>Create an entry</Title>
                <Button htmlType="submit" size="large" type="primary" loading={isLoading}>
                    Submit
                </Button>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <div style={style}>
                        <Col span={12}>
                            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input size name!' }]} tooltip="This is a required field">
                                <Input />
                            </Form.Item>
                        </Col>
                    </div>
                </Col>
            </Row>
        </Form>
    </div>
}
export default AddSize;