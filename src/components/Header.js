import React from 'react';
import {withRouter} from 'react-router-dom';

import '../assets/sass/header.scss';
import {
    ShoppingCartOutlined,
    InfoOutlined,
    LeftOutlined, 
} from '@ant-design/icons';
function Header(props){
    console.log("header-props",props);
    return(
        <div className="header">
            <div className="icons-list">
                {
                    props.location.pathname==='/'||props.location.pathname==='/home'?
                    <InfoOutlined />:<LeftOutlined />
                    
                }
            </div>
            <div className="title">
                {
                    props.location.pathname==='/'||props.location.pathname==='/home'?
                        <img src="http://img.maixiaobu.cn/yujian-anyang/fixed/20181226/3ff9703e5be78449.png" />:
                        props.location.pathname==='/list'?<span>蛋糕名录</span>:
                        <span>我的订单</span>
                    
                }
                
            </div>
            <div className="icons-list"><ShoppingCartOutlined /></div>
        </div>
    )
}
Header=withRouter(Header);
export default Header;