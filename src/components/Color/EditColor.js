import { Col, Row, Form, Input, Button, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useColorDetail, useEditColor } from "../../api/useColor";
import { SketchPicker } from 'react-color';
import { useQueryClient } from "react-query";

const EditColor = () => {
    const { id } = useParams();
    const style = { background: '#fff', padding: '16px' };
    const { Title } = Typography;
    const [color, setColor] = useState('#ffffff');
    const queryClient = useQueryClient();
    const { isLoading, data, isError, error } = useColorDetail(id);
    const onSuccess = data => {
        queryClient.invalidateQueries(['color-detail', id]);
        message.success('Edit success!');

    }
    const onError = error => {
        console.log({ error })
    }
    const { isLoading: isLoadingEdit, mutate } = useEditColor(onSuccess, onError);
    useEffect(() => {
        setColor(data?.data.color_code)
    }, [data])

    const handleChangeComplete = (color) => {
        setColor(color.hex)
    };
    const onFinish = async (values) => {
        const dataEdit = {
            name: values.name,
            color_code: color
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
    return <div>
        <Form
            initialValues={{
                "name": data?.data?.name,
                "color_code": data?.data?.color_code
            }}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off" >
            <Row justify="space-between" style={{ marginBottom: '10px' }}>
                <Title level={3}>Create an entry</Title>
                <Button htmlType="submit" size="large" type="primary" loading={isLoadingEdit}>
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
                                <Form.Item label="Color code" name="color_code" rules={[{ required: true, message: 'Please input color code!' }]} tooltip="This is a required field">
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
export default EditColor;