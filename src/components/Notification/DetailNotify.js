import { useLocation } from "react-router";
import { Comment, Avatar, Row, Col, Skeleton, Divider, Form, Input, Button, Space, Tag } from 'antd';
import { useEffect, useState } from "react";
import { request } from "../../utils/axios-utils";
import { useAuthState } from "../../context";

const Editor = ({ onFinish, onFinishFailed, submitting, onCancel }) => {

    const { TextArea } = Input;

    return <>
        <Form onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item name="contentReply" rules={[{ required: true, message: 'Please input category name!' }]}>
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="text" onClick={onCancel}>Cancel</Button>
                    <Button htmlType="submit" loading={submitting} type="primary">
                        Add Comment
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    </>
};
const DetailNotify = () => {
    const { id: userID } = useAuthState();
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const queryLocation = useLocation().search;
    const style = { background: '#fff', padding: '16px', flexDirection: "column-reverse", display: "flex" };
    const [showInputReply, setShowInputReply] = useState(-1);
    const [submitting, setSubmitting] = useState(false);

    const toggleInputReply = (item) => {
        setShowInputReply(item.id)
    }
    const fetchComments = async () => {
        setIsLoading(true);
        await request({ url: `comments${queryLocation}&_sort=created_at:ASC` })
            .then(response => {
                if (response.data) {
                    setList(response.data);
                    setIsLoading(false);
                }
            })
    }
    useEffect(() => {
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryLocation]);

    const onFinish = async (comment, reply, values) => {
        const { contentReply } = values;
        const data = {
            comment_content: contentReply, users_permissions_user: userID,
            product: comment.product, parent_id: comment.id, name_reply_to: reply?.users_permissions_user?.username
        }
        setSubmitting(true);
        request({ url: 'comments', method: 'POST', data: data }).then(() => {

            const data = {
                count_reply: comment.count_reply + 1
            }

            request({ url: `comments/${comment.id}`, method: 'PUT', data: data }).then(() => {
                fetchComments();
                setSubmitting(false);
            })


        })

    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    if (isLoading) {
        return <Skeleton />
    }
    return <>
        <Row>
            <Col span={24}>
                <div style={style}>
                    {list.length > 0 && list.map((item) => {
                        if (item.parent_id === 0) {
                            return <div key={item.id}>
                                <Comment
                                    actions={[<span key="comment-nested-reply-to" onClick={toggleInputReply.bind(null, item)}>Reply to</span>]}
                                    author={<span>{item?.users_permissions_user?.username}</span>}
                                    avatar={<Avatar>{item?.users_permissions_user?.username.charAt(0).toUpperCase()}</Avatar>}
                                    content={<p>{item.comment_content}</p>}>
                                    {showInputReply === item.id && <Editor
                                        onCancel={() => { setShowInputReply(-1) }}
                                        onFinishFailed={onFinishFailed}
                                        onFinish={onFinish.bind(null, item, null)}
                                        submitting={submitting} />}
                                    {
                                        list.length > 0 && list.map(i => {
                                            if (item.id === i.parent_id) {
                                                return <div key={i.id}> <Comment

                                                    actions={[<span key="comment-nested-reply-to" onClick={toggleInputReply.bind(null, i)}>Reply to</span>]}
                                                    author={<span>{i?.users_permissions_user?.username} &nbsp;&nbsp;{i?.users_permissions_user?.role === 3 && <Tag color="#eebc49">ADMIN</Tag>} </span>}
                                                    avatar={<Avatar>{i?.users_permissions_user?.username.charAt(0).toUpperCase()}</Avatar>}
                                                    content={<p><span style={{ fontWeight: 'bold' }}>{i.name_reply_to !== null ? `@${i.name_reply_to}:` : ''}</span> {i.comment_content}</p>} >
                                                    {
                                                        showInputReply === i.id && <Editor
                                                            onCancel={() => { setShowInputReply(-1) }}
                                                            onFinishFailed={onFinishFailed}
                                                            onFinish={onFinish.bind(null, item, i)}
                                                            submitting={submitting} />
                                                    }
                                                </Comment>
                                                </div>
                                            }
                                            return null
                                        })
                                    }
                                </Comment>
                                <Divider />
                            </div>
                        }
                        return null;
                    })}
                </div>
            </Col>
        </Row>
    </>
}
export default DetailNotify;