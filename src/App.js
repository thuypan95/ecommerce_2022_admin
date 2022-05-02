import { Route, Switch } from 'react-router-dom';
import { Spin, Row } from 'antd';
import { QueryClientProvider, QueryClient } from 'react-query'
import React from "react";
import './index.css';
import 'antd/dist/antd.css';


const loading = (
  <Row align="middle" justify="center">
    <Spin size="large" />
  </Row>

)

const DefaultLayout = React.lazy(() => import('./components/Layout/DefaultLayout'));
//pages
const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const queryClient = new QueryClient();
function App() {
  return <QueryClientProvider client={queryClient}>
    <React.Suspense fallback={loading}>
      <Switch>
        <Route exact path="/login" name="Login Page" render={(props) => <LoginPage {...props} />} />
        <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
      </Switch>
    </React.Suspense>
  </QueryClientProvider>

}
export default App;
