import logo from './logo.svg';
import './App.css';

// 按需引入（一般使用babel-plugin-import工具帮助我们实现按需加载）
// import Button from 'antd/lib/button/button'
// import 'antd/lib/button/style/index.css'

// 新版本antd的按需引入
// import {Button} from 'antd';
// import 'antd/dist/antd.css'


import React from "react";
import {Route,Redirect,Switch,withRouter} from 'react-router-dom';

// 引入页面组件
import Home from './views/Home';
import List from './views/List';
import Order from './views/Order';
import Mine from './views/Mine';
import Login from './views/Login';
import Reg from './views/Reg';
import NotFound from './views/NotFound';

import Nav from './components/Nav';
function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
          <Route path="/home" component={Home} />
          <Route path="/list" component={List} />
          <Route path="/order" component={Order} />
          <Route path="/mine" component={Mine} />
          <Route path="/login" component={Login} />
          <Route path="/reg" component={Reg} />
          <Route path="/notFound" component={NotFound} />
          {/*<Route path="/notfound" render={()=><div>404</div>} /> */}
          <Redirect from="/" to="/home" exact/>
          <Redirect  to="/notFound"/>
      </Switch>
    </div>
  );
}
// App=withRouter(App);
export default App;
