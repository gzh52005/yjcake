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
    const [titleName, setData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
     
    useEffect(() => {
        const fetchData = async()=>{
            setIsLoading(true);
            if(props.location.pathname.split('/')[1]==='detail'){
                const result = await request(
                    `/goodslist/getgood/${goodsId}`,
                );
                console.log(result);
                if(result.flag){
                    setData(result.data[0].name);
                    setIsLoading(false);
                }
            }else{
                setData('Loading...');
                setIsLoading(false);
            }
        
        }
        fetchData();
    },[goodsId]); 
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
                    // console.log("titleName",titleName)
                }
                {
                    props.location.pathname==='/'||props.location.pathname==='/home'||props.location.pathname==='/mine'?
                        <img src="http://img.maixiaobu.cn/yujian-anyang/fixed/20181226/3ff9703e5be78449.png"  alt="" />:
                        props.location.pathname==='/list'?<span>蛋糕名录</span>:
                        props.location.pathname==='/cart'?<span>购物车</span>:
                        props.location.pathname==='/order'?<span>我的订单</span>:
                        props.location.pathname==='/login'?<span>登录</span>:props.location.pathname==='/reg'?<span>注册</span>:
                        <span>
                            {isLoading ? (
                               ' Loading... '
                            ) : (
                                titleName
                            )}
                                
                        </span>
                    
                }
            </div>
            <div className="icons-list">
                {
                    props.location.pathname==='/cart'?<DeleteOutlined />:
                    props.location.pathname==='/login'||props.location.pathname==='/reg'?<span></span>:<ShoppingCartOutlined />
                }
            </div>
        </div>
    )
}
Header=withRouter(Header);
export default Header;