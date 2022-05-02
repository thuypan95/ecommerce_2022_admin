import { Table, Button, Space, Row, Skeleton, Popconfirm } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useRemoveSize, useSize } from '../../api/useSize';
const ListSize = () => {
    const history = useHistory();
    const onSuccess = data => {
        history.push('/sizes/list');
    }

    const onError = error => {
        console.log({ error })
    }
    const { isLoading: isLoadingRemove, mutate } = useRemoveSize(onSuccess, onError);
    const handleRemove = (id) => {
        mutate(id)
    }
    const columns = [
        {
            title: 'Name',
            // width: 100,
            dataIndex: 'name',
            key: '1',

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
                    onClick={() => history.push('/sizes/edit/' + text)} />
            </Space>,
        },
    ];

    const { isLoading, data, isError, error } = useSize();

    if (isLoading) {
        return <Skeleton />
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }
    return <div>
        <Row justify="end" style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusCircleOutlined />} size='large' onClick={() => { history.push('/sizes/add') }}>
                Add item
            </Button>
        </Row>
        <Table columns={columns} dataSource={data.data} scroll={undefined} rowKey="id" />
    </div>
}
export default ListSize;