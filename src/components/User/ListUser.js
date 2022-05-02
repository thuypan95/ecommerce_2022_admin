import { Table, Skeleton, Space, Button } from 'antd';
import { EyeOutlined, } from '@ant-design/icons';
import { useUser } from '../../api/useUser';
import { useHistory } from 'react-router-dom';
const ListUser = () => {
    const history = useHistory();
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'info_address',
            key: '1',
            render: (text) => <span>{`${text?.first_name || ''} ${text?.last_name || ''}`}</span>
            // fixed: 'left',
        },
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'Email', dataIndex: 'email', key: '3' },
        { title: 'Created at', dataIndex: 'created_at', key: '4' },
        {
            title: 'Action',
            key: '4',
            dataIndex: 'id',
            width: 100,
            render: (text) => <Space>
                <Button
                    size='small'
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() => history.push('/users/' + text)} />
            </Space>,
        },
    ];

    const { isLoading, data, isError, error } = useUser();

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
export default ListUser;