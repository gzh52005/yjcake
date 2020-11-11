import React,{useEffect,useState} from 'react';
import request from '../utils/request';
import {withRouter} from 'react-router-dom';

import '../assets/sass/header.scss';
import {
    ShoppingCartOutlined,
    GlobalOutlined,
    LeftOutlined, 
    DeleteOutlined,
} from '@ant-design/icons';
function Header(props){
    // console.log("header-props",props);
    const goodsId=props.location.pathname.split('/').slice(-1)[0];
    const [titleName,changedetail] = useState();
    useEffect(()=>{
        // 这里的代码在组件渲染结束后执行（初始化和组件更新）
        // 发起请求
        request(`/goodslist/getgood/${goodsId}`).then(res=>{
            changedetail(res.data[0].name)
        })
    },[])
    return(
        <div className="header">
            <div className="icons-list">
                {
                    props.location.pathname==='/'||props.location.pathname==='/home'?
                    <GlobalOutlined />:<LeftOutlined onClick={()=>{
                        props.history.goBack(-1);
                    }} />
                    
                }
            </div>
            <div className="title">
                {
                    props.location.pathname==='/'||props.location.pathname==='/home'||props.location.pathname==='/mine'?
                        <img src="http://img.maixiaobu.cn/yujian-anyang/fixed/20181226/3ff9703e5be78449.png"  alt="" />:
                        props.location.pathname==='/list'?<span>蛋糕名录</span>:
                        props.location.pathname==='/cart'?<span>购物车</span>:
                        props.location.pathname==='/order'?<span>我的订单</span>:
                        <span>{titleName}</span>
                    
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