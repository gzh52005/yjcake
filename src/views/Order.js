import React,{useEffect,useState} from 'react';
import { message } from 'antd';
import '../assets/sass/order.scss';
import request from '../utils/request';
import {withUser,withToken} from '../utils/hoc';
function Order(props){
    const [list,moreData]=useState([]);
    const [allSure,changeAllSure]=useState(false);;
    const [isDel,changIsDel]=useState(false);
    const [isChecked,changeChecked]=useState(false);
    const someDel=()=>{
        if(document.querySelectorAll('.isChecked').length){
            let isChecked=document.querySelectorAll('.isChecked');
            let goodsId=[];
            for(let i=0;i<isChecked.length;i++){
                
                if(isChecked[i].checked){
                    goodsId.push(isChecked[i].getAttribute("_id"))
                    // console.log(isChecked[i].getAttribute("_id"));
                }
            }
            request.delete('/cart/delcart',{_id:goodsId}).then(res=>{
                if(res.code===2000){
                    message.success('勾选订单已确认收货');
                    changIsDel(!isDel)
                }
            })
        }
    }
    useEffect(()=>{
        let query={
            name:props.currentUser?props.currentUser.username:'',
            albuy:"已购",
        }
        request('/cart/findAll',{query:JSON.stringify(query)})
        .then(res=>{
           if(res.data){
            moreData([...res.data])
           }
        });
    },[isDel])
    useEffect(()=>{
       if(document.querySelectorAll('.isChecked').length){
           let isChecked=document.querySelectorAll('.isChecked');
           let allChecked=document.querySelector('.allChecked');
           if(allChecked.checked){
            for(let i=0;i<isChecked.length;i++){
                isChecked[i].checked=true;
                
            }
        }else{
            for(let i=0;i<isChecked.length;i++){
                isChecked[i].checked=false;
            }
        }
       }
    },[allSure])
    useEffect(()=>{
        if(document.querySelectorAll('.isChecked').length){
            let isChecked=document.querySelectorAll('.isChecked');
            let allChecked=document.querySelector('.allChecked');
            let isChecked1=[...isChecked];
            // console.log(isChecked1);
          let isChecked2 = isChecked1.every(item=>{
                return item.checked==true;
            });
            console.log(isChecked2);
            if(isChecked2){
                allChecked.checked=true;
            }else{
                allChecked.checked=false;
            }
        }
    },[isChecked])
    return(
        <div id="box">
        <div id="top">
        <div className="top">
           <span>我的订单</span>
        </div>
        </div>
        <div className="context">
        <ul>
            {
                list.length?
                list.map(item=>
            <li key={item.createTime}>
            <img src={item.detailsMsg[0].cover.wap_cover}></img>
            <p>
            {item.detailsMsg[0].name}<br/>
              {
              item.detailsMsg[0].specs.map(itemSpec=>{
                if(itemSpec.id===item.specs_id){
                return itemSpec.name
                } 
            })
              }
              <br/>
               数量：{item.num}<br/>
               ￥{
              item.detailsMsg[0].specs.map(itemPrice=>{
                if(itemPrice.id===item.specs_id){
                return itemPrice.price*item.num
                } 
            })
              }
            </p>
            <input type="checkbox" 
            _id={item._id}onClick={()=>{
                changeChecked(!isChecked)
            }}
            className="isChecked" />
            <button onClick={()=>{
                 request.delete('/cart/delcart',{_id:[item._id]}).then(res=>{
                    if(res.code===2000){
                    message.success('已确认收货');
                    changIsDel(!isDel)
                            }
                        })
                        
            }}>
                确认送达
            </button>
            </li>
             ):<span>暂无订单</span>
}
        </ul>
        </div>
       <div className="bottom">
       <input type="checkbox" className="allChecked" onClick={()=>{
           changeAllSure(!allSure)
       }}/>
       <span>
           全部确认
        </span>
       <button onClick={()=>{
           someDel();
          
       }}>
           确认送达
       </button>
       </div>
        </div>

       
    )
}
const newOrder=withUser(Order);
const MyOrder=withToken(newOrder)
export default MyOrder;