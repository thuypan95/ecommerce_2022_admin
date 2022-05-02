import { Table, Skeleton, Space, Button, Tag } from 'antd';
import { EyeOutlined, } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useOrder } from '../../api/useOrder';
const ListOrder = () => {
    const history = useHistory();
    const columns = [
        {
            title: 'Order number',
            dataIndex: 'number_order',
            key: 'number_order',
        },
        {
            title: 'Quantity', dataIndex: 'dishes', key: 'dishes',
            render: (text) => <span>{text?.length} item</span>
        },
        { title: 'Price', dataIndex: 'amount', key: 'amount', render: (text) => <span>${text}</span> },
        { title: 'Email', dataIndex: 'user_id', key: 'user_id', render: (text) => <span>{text.email}</span> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (text) => <Tag color="green">{text}</Tag> },
        { title: 'Created at', dataIndex: 'created_at', key: '4' },
        {
            title: 'Action',
            key: '4',
            dataIndex: 'id',
            width: 100,
            render: (text) => <Space>
                {/* <Popconfirm
                    placement="topRight"
                    title='Are you sure to delete this entry?'
                    // onConfirm={handleRemove.bind(null, text)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        //loading={isLoadingRemove}
                        size='small'
                        type="danger"
                        icon={<DeleteOutlined />}
                    />
                </Popconfirm> */}

                <Button
                    size='small'
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() => history.push('/orders/' + text)} />
            </Space>,
        },
    ];

    const { isLoading, data, isError, error } = useOrder();

    if (isLoading) {
        return <Skeleton />
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }
    return <div>

        <Table columns={columns} dataSource={data.data} scroll={undefined} rowKey="id" />
    </div>
}
export default ListOrder;