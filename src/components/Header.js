import React,{useEffect,useState} from 'react';
import request from '../utils/request';
import {withRouter} from 'react-router-dom';
import {withUser} from '../utils/hoc';
import '../assets/sass/header.scss';
import { Badge } from 'antd';
import {
    ShoppingCartOutlined,
    GlobalOutlined,
    LeftOutlined, 
} from '@ant-design/icons';
function Header(props){
    // console.log("header-props",props);
    const address=props.location.pathname.split('/')[1];
    const goodsId=props.location.pathname.split('/').slice(-1)[0];
    const [titleName, setData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let [cartNum,changenum]=useState(0);
    let query={
        name:props.currentUser?props.currentUser.username:'',
        albuy:"未购",
    }
    
    useEffect(() => {
        const fetchData = async()=>{
            setIsLoading(true);
            if(address==='detail'){
                const result = await request(
                    `/goodslist/getgood/${goodsId}`,
                );
                if(result.flag){
                    setData(result.data[0].name);
                    setIsLoading(false);
                }
            }else{
                setData('Loading...');
                setIsLoading(false);
            }
            const cart=await request('/cart/findAll',{query:JSON.stringify(query)});
            if(cart.code===2000){
                changenum(cart.data.length);
            }
        }
        fetchData();
    },[goodsId,address]); 
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
                    props.location.pathname==='/'||props.location.pathname==='/home'?
                        <img src="http://img.maixiaobu.cn/yujian-anyang/fixed/20181226/3ff9703e5be78449.png"  alt="" />:
                        props.location.pathname==='/list'?<span>蛋糕名录</span>:
                        props.location.pathname==='/cart'?<span>购物车</span>:
                        props.location.pathname==='/order'?<span>我的订单</span>:
                        props.location.pathname==='/login'?<span>登录</span>:props.location.pathname==='/reg'?<span>注册</span>:
                        props.location.pathname==='/mine'?<span>个人资料</span>:
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
                    props.location.pathname==='/login'||props.location.pathname==='/reg'?<span></span>:<div><ShoppingCartOutlined onClick={()=>{
                        props.history.push('/cart');
                    }} /><Badge count={cartNum} offset={[-3, -18]} size="small" showZero></Badge></div>
                }
                
            </div>
        </div>
    )
}
const NewHeader=withRouter(Header);
const Myheader=withUser(NewHeader)
export default Myheader;