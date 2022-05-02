import { useParams } from "react-router";
import { Col, Row, Form, Input, Button, Typography, message } from "antd";
import { useQueryClient } from "react-query";
import { useCategoryDetail, useEditCategory } from "../../api/useCategory";
const EditCategory = () => {
    const { id } = useParams();
    const { Title } = Typography;
    const queryClient = useQueryClient();
    const style = { background: '#fff', padding: '16px' };
    const { isLoading, data, isError, error } = useCategoryDetail(id);

    const onSuccess = data => {
        queryClient.invalidateQueries(['category-detail', id]);
        message.success('Edit success!');
    }
    const onError = error => {
        console.log({ error })
    }
    const { isLoading: isLoadingEdit, mutate } = useEditCategory(onSuccess, onError);

    const onFinish = async (values) => {
        const dataEdit = {
            name: values.name,
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
                "name": data?.data?.name,
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
                        <Col span={12}>
                            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input category name!' }]} tooltip="This is a required field">
                                <Input />
                            </Form.Item>
                        </Col>
                    </div>
                </Col>
            </Row>
        </Form>
    </>
}
export default EditCategory;