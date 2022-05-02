
import styled from 'styled-components';
import { Layout } from 'antd';
const { Sider } = Layout;

export const Logo = styled.div`
    color:white;
    text-align:center;
    padding:12px 0;
    text-transform:uppercase;
    font-weight:bold;
    letter-spacing:1.5px;
`;
export const StyledSider = styled(Sider)`
min-height: 100vh;
`;