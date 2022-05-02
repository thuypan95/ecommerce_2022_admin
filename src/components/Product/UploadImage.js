import { Upload, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
const UploadImage = (props) => {

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handleCancel = () => setPreviewVisible(false);;
    const handlePreview = file => {
        setPreviewVisible(true);
        setPreviewImage(props.detail !== undefined ? file.url : file.thumbUrl);
    };
    const handleUpload = ({ fileList }) => {
        //---------------^^^^^----------------
        // this is equivalent to your "const img = event.target.files[0]"
        // here, antd is giving you an array of files, just like event.target.files
        // but the structure is a bit different that the original file
        // the original file is located at the `originFileObj` key of each of this files
        // so `event.target.files[0]` is actually fileList[0].originFileObj
        props.setFileList(fileList);
        if (fileList?.length === 0) {
            props.setErrorImage('Please upload images product!');
        }
        else {
            props.setErrorImage('');
        }
        // you store them in state, so that you can make a http req with them later
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return <>
        <Form.Item
            label="Upload Images"
            name="image"
            rules={[{ required: true, message: 'Please upload images product!' }]}
            tooltip="This is a required field">
            <Upload
                style={{ width: '100%' }}
                multiple={true}
                listType="picture-card"
                fileList={props.fileList}
                onPreview={handlePreview}
                onChange={handleUpload}
                beforeUpload={() => false}>
                {uploadButton}
            </Upload>
        </Form.Item>

        <Modal
            visible={previewVisible}
            footer={null}
            onCancel={handleCancel}>
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
    </>
}
export default UploadImage;
