
import { Col, Row, Form, Input, InputNumber, Button, Typography } from "antd";
import { SettingOutlined } from '@ant-design/icons';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import SelectCategory from "./SelectCategory";
import SelectColor from "./SelectColor";
import { request } from "../../utils/axios-utils";
import SelectSize from "./SelectSize";
import { useHistory } from "react-router-dom";
import { useAddProduct } from "../../api/useProduct";
const AddProduct = () => {
    const history = useHistory();
    const { Title, Text } = Typography;
    const style = { background: '#fff', padding: '16px' };
    const [editorState, setEditorState] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedColor, setSelectedColor] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    const [errorImage, setErrorImage] = useState('');
    const onSuccess = data => {
        history.push('/products/list');
    }

    const onError = error => {
        console.log({ error })
    }
    const { isLoading, mutate, } = useAddProduct(onSuccess, onError);
    const onFinish = async (values) => {
        let formData = new FormData();
        // add one or more of your files in FormData
        // again, the original file is located at the `originFileObj` key
        for (let i = 0; i < fileList.length; i++) {
            formData.append("files", fileList[i]?.originFileObj);
        }

        request({ url: 'upload', data: formData, method: 'post' }).then(response => {
            if (response.data) {
                const data = {
                    name: values.name,
                    price: values.price,
                    description: editorState.toHTML(),
                    images: response.data,
                    categories: selectedCategory,
                    colors: selectedColor,
                    sizes: selectedSize,
                    fileList: fileList
                }
                mutate({ data });
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleEditorChange = (editorState) => {
        setEditorState(BraftEditor.createEditorState(editorState));
    }
    useEffect(() => {
        // Assume here to get the editor content in html format from the server
        const htmlContent = ''
        // Use BraftEditor.createEditorState to convert html strings to editorState data needed by the editor
        setEditorState(BraftEditor.createEditorState(htmlContent))
    }, []);

    return <div>
        <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row justify="space-between" style={{ marginBottom: '10px' }}>
                <Title level={3}>Create an entry</Title>
                <Button htmlType="submit" size="large" type="primary" loading={isLoading}>
                    Submit
                </Button>
            </Row>

            <Row gutter={16}>
                <Col span={16}>
                    <div style={style}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input product name!' }]} tooltip="This is a required field">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input product price!' }]} tooltip="This is a required field">
                                    <InputNumber addonafter={<SettingOutlined />} initialvalues={100} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <UploadImage fileList={fileList} setFileList={setFileList} setErrorImage={setErrorImage} />
                                {errorImage && <Text type="danger">{errorImage}</Text>}
                            </Col>
                        </Row>
                        <Row >
                            <Form.Item label="Description" name="description" tooltip="This is a required field" >
                                <BraftEditor
                                    style={{ border: '1px solid #d9d9d9', borderRadius: '2px' }}
                                    language='en'
                                    value={editorState}
                                    onChange={handleEditorChange}
                                />
                            </Form.Item>
                        </Row>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={style}>
                        <SelectCategory selectedItems={selectedCategory} setSelectedItems={setSelectedCategory} />
                        <SelectColor selectedItems={selectedColor} setSelectedItems={setSelectedColor} />
                        <SelectSize selectedItems={selectedSize} setSelectedItems={setSelectedSize} />
                    </div>
                </Col>
            </Row>
        </Form>
    </div>
}
export default AddProduct;