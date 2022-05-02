import { Popconfirm, Table, Button, Space, Row, Skeleton } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useCategory, useRemoveCategory } from '../../api/useCategory';
const ListCategory = () => {
    const history = useHistory();
    const onSuccess = data => {
        history.push('/categories/list');
    }

    const onError = error => {
        console.log({ error })
    }
    const { isLoading: isLoadingRemove, mutate } = useRemoveCategory(onSuccess, onError);
    const handleRemove = (id) => {
        mutate(id)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: '1',
        },
        { title: 'Created at', dataIndex: 'created_at', key: '3', responsive: ['md'], },
        {
            title: 'Action',
            key: '4',
            width: 100,
            dataIndex: 'id',
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
                    onClick={() => history.push('/categories/edit/' + text)} />
            </Space>,
        },
    ];

    const { isLoading, data, isError, error } = useCategory();
    if (isLoading) {
        return <Skeleton />
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }
    return <div>
        <Row justify="end" style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusCircleOutlined />} size='large' onClick={() => { history.push('/categories/add') }}>
                Add item
            </Button>
        </Row>
        <Table columns={columns} dataSource={data.data} scroll={undefined} rowKey="id" />
    </div>
}
export default ListCategory;