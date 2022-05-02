import { Col, Row, Form, Input, InputNumber, Button, message } from "antd";
import { Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import SelectCategory from "./SelectCategory";
import SelectColor from "./SelectColor";
// import { request } from "../../utils/axios-utils";
import SelectSize from "./SelectSize";
import { useParams } from "react-router-dom";
import { useEditProduct, useProductDetail } from "../../api/useProduct";
import { useQueryClient } from 'react-query';
const EditProduct = () => {
    const { id } = useParams();
    const { Title, Text } = Typography;
    const style = { background: '#fff', padding: '16px' };
    const [editorState, setEditorState] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedColor, setSelectedColor] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    const [errorImage, setErrorImage] = useState('');
    const { isLoading, data, isError, error } = useProductDetail(id);
    const queryClient = useQueryClient()

    const onSuccess = data => {
        queryClient.invalidateQueries(['product-detail', id]);
        message.success('Edit success!');


    }
    const onError = error => {
        console.log({ error })
    }
    const { isLoading: isLoadingEdit, mutate, error: errorEdit, isError: isErrorEdit } = useEditProduct(onSuccess, onError);

    const onFinish = async (values) => {
        const dataEdit = {
            name: values.name,
            price: values.price,
            description: editorState?.toHTML(),
            images: fileList,
            categories: selectedCategory,
            colors: selectedColor,
            sizes: selectedSize
        };
        if (fileList.length > 0)
            mutate({ id, data: dataEdit });

        // request({
        //     url: `products/${id}`,
        //     data: {
        //         name: values.name,
        //         price: values.price,
        //         description: editorState.toHTML(),
        //         images: response.data,
        //         categories: selectedCategory,
        //         colors: selectedColor,
        //         sizes: selectedSize
        //     }, method: 'post'
        // }).then(() => {
        //     history.push('/products');
        // })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleEditorChange = (editorState) => {
        setEditorState(BraftEditor.createEditorState(editorState));
    }
    useEffect(() => {
        setFileList(data?.data?.images);
        setSelectedCategory(data?.data?.categories);
        setSelectedColor(data?.data?.colors);
        setSelectedSize(data?.data?.sizes);
    }, [data]);
    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }

    if (isErrorEdit) {
        return <h2>{errorEdit.message}</h2>
    }
    return <div>
        {console.log("data", data)}
        <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
                "name": data?.data?.name,
                "price": data?.data?.price,
                "category": data?.data?.categories.map(item => {
                    return item.name
                }),
                "color": data?.data?.colors.map(item => {
                    return item.name
                }),
                "size": data?.data?.sizes.map(item => {
                    return item.name
                }),
                "image": data?.data?.images,
                "description": BraftEditor.createEditorState(data?.data?.description),
            }}>
            <Row justify="space-between" style={{ marginBottom: '10px' }}>
                <Title level={3}>Edit an entry</Title>
                <Button htmlType="submit" size="large" type="primary" loading={isLoadingEdit}>
                    Submit
                </Button>
            </Row>
            <Row gutter={16}>
                <Col span={16}>
                    <div style={style}>
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input product name!' }]} tooltip="This is a required field">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input product price!' }]} tooltip="This is a required field">
                                    <InputNumber addonafter={<SettingOutlined />} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <UploadImage fileList={fileList} setFileList={setFileList}
                                    setErrorImage={setErrorImage}
                                    detail={data?.data} />
                                {errorImage && <Text type="danger">{errorImage}</Text>}
                            </Col>
                        </Row>
                        <Row >
                            <Form.Item label="Description" name="description" tooltip="This is a required field" >
                                <BraftEditor
                                    style={{ border: '1px solid #d9d9d9', borderRadius: '2px' }}
                                    language='en'
                                    value={editorState}
                                    onChange={handleEditorChange} />
                            </Form.Item>
                        </Row>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={style}>
                        <SelectCategory selectedItems={selectedCategory} setSelectedItems={setSelectedCategory} detail={data?.data} />
                        <SelectColor selectedItems={selectedColor} setSelectedItems={setSelectedColor} />
                        <SelectSize selectedItems={selectedSize} setSelectedItems={setSelectedSize} />
                    </div>
                </Col>
            </Row>
        </Form>
    </div>
}
export default EditProduct;