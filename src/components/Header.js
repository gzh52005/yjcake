import React from 'react';
import {withRouter} from 'react-router-dom';

import '../assets/sass/header.scss';
import {
    ShoppingCartOutlined,
    GlobalOutlined,
    LeftOutlined, 
    DeleteOutlined,
} from '@ant-design/icons';
function Header(props){
    console.log("header-props",props);
    return(
        <div className="header">
            <div className="icons-list">
                {
                    props.location.pathname==='/'||props.location.pathname==='/home'?
                    <GlobalOutlined />:<LeftOutlined />
                    
                }
            </div>
            <div className="title">
                {
                    props.location.pathname==='/'||props.location.pathname==='/home'||props.location.pathname==='/mine'?
                        <img src="http://img.maixiaobu.cn/yujian-anyang/fixed/20181226/3ff9703e5be78449.png" />:
                        props.location.pathname==='/list'?<span>蛋糕名录</span>:
                        props.location.pathname==='/cart'?<span>购物车</span>:
                        <span>我的订单</span>
                    
                }
                
            </div>
            <div className="icons-list">
                {
                    props.location.pathname==='/cart'?<DeleteOutlined />:<ShoppingCartOutlined />
                }
            </div>
        </div>
    )
}
Header=withRouter(Header);
export default Header;