
import { Avatar, List, Badge, Typography } from 'antd';
import { useHistory, useLocation } from 'react-router';
import { convertDistanceToNow } from '../../functions';
import { request } from '../../utils/axios-utils';
const { Text } = Typography;

const Description = (props) => {

    const { item } = props;
    if (item.comment !== null) {
        const fullComment = item?.fullComment;
        return <div style={{ opacity: item.read ? '0.7' : '1' }}>
            <Text strong> {fullComment?.users_permissions_user?.username}</Text> <Text>commented on the product </Text>
            <Text strong> {fullComment?.product?.name}</Text>
            <div style={{ color: item.read ? 'inherit' : '#1890ff' }}>{convertDistanceToNow(item.created_at)}</div>
        </div>
    }
    else {
        return <div style={{ opacity: item.read ? '0.7' : '1' }}>
            <Text strong> {item?.order?.info_shipping?.username}</Text> <Text>have just created order </Text>

            <div style={{ color: item.read ? 'inherit' : '#1890ff' }}>{convertDistanceToNow(item.created_at)}</div>
        </div>
    }

}

const DropdownListNotify = (props) => {
    const queryLocation = useLocation().search;
    const history = useHistory();
    const readNotify = (item) => {
        const data = {
            id: item?.id,
            read: true,
            productID: item?.comment !== null ? item?.comment?.product : null
        }
        if (!item.read) {
            request({ url: `notifications/${item.id}`, data, method: 'PUT' }).then(() => {
                props.setVisible(false);
                if (item.comment !== null) {
                    let currentPath = window.location.pathname;
                    const preFix = `${currentPath}/notifications/${item.id}?product=${item.comment?.product}`;
                    if (queryLocation === `?product=${item.comment?.product}`) {
                        history.replace(preFix);
                        setTimeout(() => {
                            history.replace(`/notifications/${item.id}?product=${item.comment?.product}`);
                        }, 0)
                    }
                    else {
                        history.push(`/notifications/${item.id}?product=${item.comment?.product}`);
                    }
                }
                else {
                    console.log('vo day')
                    history.push(`/orders/${item?.order?.id}`);
                }
                props.fetchNotify();
            })
        }
        else {
            props.setVisible(false);
            if (item.comment !== null) {
                history.push(`/notifications/${item.id}?product=${item.comment?.product}`);
            }
            else history.push(`/orders/${item?.order?.id}`);

        }

    }
    return <>
        <div
            id="scrollableDiv"
            style={{
                backgroundColor: 'white',
                height: 400,
                width: 400,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}>
            <List
                loading={props.loadingNotify}
                dataSource={props.listNotify}
                renderItem={item => {
                    if (item.comment !== null)
                        return (
                            <List.Item key={item.id} onClick={readNotify.bind(null, item)} style={{ cursor: 'pointer' }}>
                                <List.Item.Meta
                                    avatar={<Avatar>{item?.fullComment?.users_permissions_user?.username?.charAt(0).toUpperCase()}</Avatar>}
                                    description={<Description item={item} />}
                                />
                                <div>{!item.read && <Badge color="blue" />} </div>
                            </List.Item>
                        )
                    else {
                        return <List.Item key={item.id} onClick={readNotify.bind(null, item)} style={{ cursor: 'pointer' }}>
                            <List.Item.Meta
                                avatar={<Avatar>{item?.order?.info_shipping?.username?.charAt(0).toUpperCase()}</Avatar>}
                                description={<Description item={item} />}
                            />
                            <div>{!item.read && <Badge color="blue" />} </div>
                        </List.Item>
                    }
                }}
            />

        </div>

    </>
}
export default DropdownListNotify;