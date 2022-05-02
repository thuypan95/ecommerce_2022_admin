import { Col, Row, Form, Input, Button, Typography } from "antd";
import { useState } from "react";
import { useHistory } from "react-router";
import { useAddColor } from "../../api/useColor";
import { SketchPicker } from 'react-color';

const AddColor = () => {
    const history = useHistory();
    const style = { background: '#fff', padding: '16px' };
    const { Title } = Typography;
    const [color, setColor] = useState('#ffffff');
    const onSuccess = data => {
        history.push('/colors/list');
    }

    const onError = error => {
        console.log({ error })
    }
    const { isLoading, mutate, } = useAddColor(onSuccess, onError);
    const handleChangeComplete = (color) => {
        setColor(color.hex)
    };
    const onFinish = async (values) => {
        const data = {
            name: values.name,
            color_code: color
        }
        mutate({ data });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <div>
        {console.log(color)}
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
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input color name!' }]} tooltip="This is a required field">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Color code" name="color_code" tooltip="This is a required field">
                                    <SketchPicker
                                        color={color}
                                        onChangeComplete={handleChangeComplete}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Form>
    </div>
}
export default AddColor;