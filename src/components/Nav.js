import React from 'react';
import {withRouter} from 'react-router-dom';
import '../assets/sass/nav.scss';
import {
    HomeOutlined,
    AppstoreOutlined,
    FileTextOutlined,
    UserOutlined,
  } from '@ant-design/icons';

function Nav(props){
    return(
        <div className="nav">
        <div className="navItem" onClick={()=>{
          props.history.push('/home')
        }}>
          <HomeOutlined className="icon" />
          <span>首页</span>
          
        </div>
        <div className="navItem" onClick={()=>{
          props.history.push('/list')
        }}>
          <AppstoreOutlined className="icon" />
          <span>蛋糕名录</span>
          
        </div>
        <div className="navItem" onClick={()=>{
          props.history.push('/order')
        }}>
          <FileTextOutlined className="icon" />
          <span>订单中心</span>
          
        </div>
        <div className="navItem" onClick={()=>{
          props.history.push('/mine')
        }}>
          <UserOutlined className="icon" />
          <span>会员中心</span>
          
        </div>
      </div>
    )
}
Nav=withRouter(Nav);
export default Nav;