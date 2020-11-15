import React,{useEffect,useState} from 'react';
import { message } from 'antd';
import {withUser,withToken} from '../utils/hoc';
import request from '../utils/request';
import {
    DeleteOutlined,
} from '@ant-design/icons';
import '../assets/sass/cart.scss';
function Cart(props){
    // console.log("cart-props",props);
    // let [query,changequery]=useState();
    // useEffect(()=>{
    //     if(props.currentUser){
    //         changequery(query={
    //             name:props.currentUser.username,
    //             albuy:"未购",
    //         })
            
    //     }
    // },[props.currentUser])
    let [inputIdx,changeinput]=useState(false);
    let [totalInput,changeToatl]=useState(false);
    
    let [goodsnum,changenum]=useState(false);
    let [isdelete,setDelete]=useState(false);
    let [isBuy,setBuy]=useState(false);
    let [totalMoney,changeMoney]=useState('0.00');
    let [userCart,changecart]=useState();
    let query={
        name:props.currentUser?props.currentUser.username:'',
        albuy:"未购",
    }
    useEffect(()=>{
        const fetchData = async()=>{
            const cart=await request('/cart/findAll',{query:JSON.stringify(query)});
            if(cart.code===2000){
                changecart(cart.data);
                localStorage.setItem('userCart',JSON.stringify(cart.data)); 
            }
        }
        fetchData();
           
    },[]);

    useEffect(()=>{
        let total1=0;
        if(document.querySelectorAll('.choceList').length){
            let list=document.querySelectorAll('.choceList');
            let totalTag=document.querySelector('.totalTag');
            if(totalTag.checked){
                for(let i=0;i<list.length;i++){
                    list[i].checked=true
                }
                userCart.forEach(item=>{
                    item.detailsMsg[0].specs.forEach((itemChild,index)=>{
                        if(itemChild.id===item.specs_id){
                            total1=total1+Number(itemChild.price)*item.num;
                        }
                        
                    })
                })
            }else{
                for(let i=0;i<list.length;i++){
                    list[i].checked=false
                }
            }
            changeMoney(total1.toFixed(2));
        }
    },[totalInput,goodsnum,userCart])
    useEffect(()=>{
        let count=0;
        let total2=0;
        if(document.querySelectorAll('.choceList').length){
            let list=document.querySelectorAll('.choceList');
            let totalTag=document.querySelector('.totalTag');
            for(let i=0;i<list.length;i++){
                if(list[i].checked){
                    ++count;
                    userCart[i].detailsMsg[0].specs.forEach((itemChild,index)=>{
                        if(itemChild.id===userCart[i].specs_id){
                            total2=total2+Number(itemChild.price)*userCart[i].num;
                        }
                        
                    })
                }
            }
            if(count===list.length){
                totalTag.checked=true;
            }else{
                totalTag.checked=false;
            }
            changeMoney(total2.toFixed(2));
        }
    },[inputIdx,goodsnum,userCart]);
    useEffect(()=>{
        if(document.querySelectorAll('.choceList').length){
            let list=document.querySelectorAll('.choceList');
            let goodsId=[];
            for(let i=0;i<list.length;i++){
                if(list[i].checked){
                    goodsId.push(userCart[i]._id)
                }
            }
            // console.log(userCart,goodsId);
            if(isBuy){
                request.put('/cart/albuy',{_id:goodsId}).then(res=>{
                    console.log(res);
                    if(res.code===2000){
                        setBuy(false);
                        message.success('购买成功!');
                        setDelete(true);
                    }
                })
            }
            if(isdelete){
                request.delete('/cart/delcart',{_id:goodsId}).then(res=>{
                    // console.log("删除",res);
                    if(res.code===2000){
                        message.success('已移除');
                        setDelete(false);
                        // 删除成功,重新渲染购物车数据
                        request('/cart/findAll',{query:JSON.stringify(query)}).then(res=>{
                            localStorage.setItem("userCart",JSON.stringify(res.data));
                            // 查询购物车数据
                            console.log("查询",res);
                            if(res){
                                changecart(res.data);
                                changeMoney('0.00');
                            } 
                        })
                    }
                })
            }
        }
    },[isdelete,userCart,isBuy])
    
    return(
        <div className="main">
            <div className="icon-list" onClick={()=>{
                console.log("delete");
                setDelete(true);
            }} ><DeleteOutlined/></div>
            <ul className="cartItems">
                {
                    // console.log("userCart",userCart)
                }
                {
                    userCart?userCart.map((item,index)=><li key={item._id}>
                        <div className="pic">
                            <img src={item.detailsMsg[0].cover.pc_cover}  alt="" />
                        </div>
                        <div className="content">
                            <div className="title">
                                <p>
                                    <span>{item.detailsMsg[0].name}</span>
                                    {
                                        item.detailsMsg[0].specs.map(itemSpec=>{
                                            if(itemSpec.id===item.specs_id){
                                            return <span key={itemSpec.id}>规格：{itemSpec.name}</span>
                                            } 
                                        })
                                    }
                                </p>
                                <input type="checkbox" className="choceList" onClick={()=>{
                                    // console.log("inputIdx");
                                    changeinput(!inputIdx);
                                }} />
                            </div>
                            <div className="stepper">
                            {
                                item.detailsMsg[0].specs.map(itemSpec=>{
                                    if(itemSpec.id===item.specs_id){
                                    return <span key={itemSpec.id}>￥{itemSpec.price}</span>
                                    } 
                                })
                            }
                                <div>
                                    <button onClick={()=>{
                                        if(item.num>=2){
                                           --item.num;
                                        //    console.log(item.num);
                                            request.post('/cart/addcart',{
                                                name:item.name,
                                                id:item.id,
                                                num:item.num,
                                                specs_id:item.specs_id,
                                            })
                                            changenum(!goodsnum);
                                        }
                                    }}>-</button>
                                    <span>{item.num}</span>
                                    <button onClick={()=>{
                                        ++item.num;
                                        // console.log(item.num);
                                        request.post('/cart/addcart',{
                                            name:item.name,
                                            id:item.id,
                                            num:item.num,
                                            specs_id:item.specs_id,
                                        })
                                        changenum(!goodsnum);
                                    }}>+</button>
                                </div>
                            </div>
                        </div>
                    </li>):
                    <li>
                        暂无商品，请前往<button onClick={()=>{
                            props.history.push('/list');
                        }}>选购</button>吧！
                    </li>
                }
            </ul>
            <div className="cart">
                <div className="check">
                    <input type="checkbox" className="totalTag" onClick={()=>{
                        // console.log("totalInput");
                        changeToatl(!totalInput);
                    }} />
                    <span className="totalPrice">商品总价:￥{totalMoney}</span>
                </div>
                <div className="gobuy" onClick={()=>{
                    console.log("buy");
                    setBuy(true);
                }}>
                    <span>去结算</span>
                </div>
            </div>
        </div>
    )
}
const NewCart=withUser(Cart);
const MyCart=withToken(NewCart)
export default MyCart;