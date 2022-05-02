import { Table, Button, Space, Row, Skeleton, Popconfirm } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useColor, useRemoveColor } from '../../api/useColor';
const ListColor = () => {
    const history = useHistory();
    const onSuccess = data => {
        history.push('/colors/list');
    }

    const onError = error => {
        console.log({ error })
    }
    const { isLoading: isLoadingRemove, mutate } = useRemoveColor(onSuccess, onError);
    const handleRemove = (id) => {
        mutate(id)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: '1',
        },
        {
            title: 'Color code',
            dataIndex: 'color_code',
            key: '1',
            render: (text) => <div style={{ display: 'flex' }}>
                <p style={{ border: '1px solid #eee', width: 20, height: 20, backgroundColor: `${text}` }} />
                <span style={{ marginLeft: '5px' }}>{text}</span></div>
        },
        { title: 'Created at', dataIndex: 'created_at', key: '3', responsive: ['md'], },
        {
            title: 'Action',
            key: '4',
            dataIndex: 'id',
            width: 100,
            render: (text) => <Space>
                <Popconfirm
                    placement="topRight"
                    title='Are you sure to delete this entry?'
                    onConfirm={handleRemove.bind(null, text)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        loading={isLoadingRemove}
                        size='small'
                        type="danger"
                        icon={<DeleteOutlined />}
                    />
                </Popconfirm>

                <Button
                    size='small'
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => history.push('/colors/edit/' + text)} />

            </Space>,
        },
    ];

    const { isLoading, data, isError, error } = useColor();

    if (isLoading) {
        return <Skeleton />
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }
    return <div>
        <Row justify="end" style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusCircleOutlined />} size='large' onClick={() => { history.push('/colors/add') }}>
                Add item
            </Button>
        </Row>
        <Table columns={columns} dataSource={data.data} scroll={undefined} rowKey="id" />
    </div>
}
export default ListColor;