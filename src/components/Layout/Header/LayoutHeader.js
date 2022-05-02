import { Button, Layout, Row, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';
import { Badge } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import DropdownListNotify from '../../Notification/DropdownListNotify';
import { useEffect, useState } from 'react';
import { request } from '../../../utils/axios-utils';
const LayoutHeader = (props) => {
    const { listNotify, setListNotify, countNotify, setCountNotify } = props;
    const [visible, setVisible] = useState(false);
    const [loadingNotify, setLoadingNotify] = useState(false)

    const { Header } = Layout;
    const fetchNotify = () => {
        setLoadingNotify(true);
        request({ url: 'notifications?_sort=created_at:DESC' }).then(rs => {
            let count = 0;
            if (rs.data) {
                for (let i = 0; i < rs.data.length; i++) {
                    if (!rs.data[i].read) {
                        count++;
                    }
                }
                setCountNotify(count);
                setListNotify(rs.data);
                setLoadingNotify(false);
            }

        })
    }
    useEffect(() => {
        fetchNotify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleVisibleChange = (flag) => {
        setVisible(flag)
    }
    return <Header className="site-layout-background" style={{ position: 'sticky', zIndex: 1, width: '100%', top: 0, padding: 0 }}>
        <Row justify="space-between" align="middle" style={{ paddingRight: '24px' }}>
            {
                props.collapsed ?
                    <MenuUnfoldOutlined className="trigger" onClick={props.toggle} /> :
                    <MenuFoldOutlined className="trigger" onClick={props.toggle} />
            }
            <Dropdown
                trigger={['click']}
                visible={visible}
                onVisibleChange={handleVisibleChange}
                overlay={<DropdownListNotify listNotify={listNotify} loadingNotify={loadingNotify} setVisible={setVisible} fetchNotify={fetchNotify} />}
                placement="bottomRight">
                <Button type="link">
                    <Badge count={countNotify}>
                        <NotificationOutlined style={{ fontSize: 24 }} />
                    </Badge>
                </Button>
            </Dropdown>
        </Row>
    </Header>
}
export default LayoutHeader;