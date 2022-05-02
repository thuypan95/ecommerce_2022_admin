import { Table, Button, Space, Row, Skeleton, Popconfirm } from 'antd';
import { useProduct, useRemoveProduct } from '../../api/useProduct';
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';

import { useHistory } from 'react-router-dom';

const ListProduct = () => {
    const history = useHistory();

    const onSuccess = data => {
        history.push('/products/list');
    }

    const onError = error => {
        console.log({ error })
    }
    const { isLoading: isLoadingRemove, mutate } = useRemoveProduct(onSuccess, onError);
    const handleEdit = (id) => {
        history.push('/products/edit/' + id);
    }

    const handleRemove = (id) => {
        mutate(id)
    }
    const columns = [
        {
            title: 'Name',
            // width: 100,
            dataIndex: 'name',
            key: '1',
            // fixed: 'left',

        },
        {
            title: 'Price',
            //width: 100,
            dataIndex: 'price',
            key: '2',

            render(text) {
                return {
                    children: <div>${text}</div>
                };
            }
            // fixed: 'left',
        },
        {
            title: 'Comments',
            //width: 100,
            dataIndex: 'comments',
            key: '2',

            render(text) {
                return {
                    children: <div onClick={() => {
                        if (text.length <= 0) {
                            return
                        }
                        else {
                            history.push(`comments?product=${text[0].product}`)
                        }
                    }}>{text?.length <= 0 ? 'No comment' : `${text?.length} comments`}  </div>
                };
            }
            // fixed: 'left',
        },

        { title: 'Created at', dataIndex: 'created_at', key: '3', responsive: ['md'], },
        {
            title: 'Action',
            key: '4',
            // fixed: 'right',
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
                    onClick={handleEdit.bind(null, text)}
                />

            </Space>,
        },
    ];

    const { isLoading, data, isError, error } = useProduct();

    if (isLoading) {
        return <Skeleton />
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }
    return <div>
        <Row justify="end" style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusCircleOutlined />} size='large' onClick={() => { history.push('/products/add') }}>
                Add item
            </Button>
        </Row>

        <Table columns={columns} dataSource={data.data} scroll={undefined} rowKey="id" />
    </div>
}
export default ListProduct;