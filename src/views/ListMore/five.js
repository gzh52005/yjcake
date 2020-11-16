import React,{useEffect, useState} from 'react';
import {ShoppingCartOutlined} from '@ant-design/icons';
import request from '../../utils/request';
import '../../assets/sass/findMore.scss';
import { withUser } from '../../utils/hoc';
import { message } from 'antd';
 function MoreOne(props){
   //  console.log(props);
  let isScroll=true;
//   let isLoad=false
  const [list,moreData]=useState([]);
  const [NUM,newNum]=useState(1);
  const [isContinue,changIt]=useState(true);
//   const [isLoad,changLoad]=useState(false)
 const addToCart=(goodsId,specs_id,)=>{
  if(props.currentUser){
    request.post('/cart/addcart',{
        name:props.currentUser.username,
        id:goodsId,
        num:1,
        specs_id:specs_id,
    }).then(res=>{
        if(res.code===2000){
            message.success('已加入购物车');
            const query={
                name:props.currentUser.username,
                albuy:"未购",
            }
            request('/cart/findAll',{query:JSON.stringify(query)}).then(res=>{
                if(res.code===2000){
                   localStorage.setItem("userCart",JSON.stringify(res.data));
                  //  window.location.reload()
                } 
            })
        }
    })
}else{
  message.warning('亲，请先登录再购物！祝您生活愉快');
  // props.history.push('/login');
}
 }
  useEffect(async()=>{
     let timer = null;
     window.addEventListener('scroll',()=>{
      let scrollTop  = document.documentElement.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight =document.documentElement.scrollHeight;
      isScroll=scrollTop+clientHeight+350>=scrollHeight?true:false;
      if(!timer&&isScroll){
         timer=setTimeout(()=>{
               newNum(NUM+1);
         },400);
      }
     });
   if(isScroll&&isContinue){
       let query=JSON.stringify({category_id:"3"});
      const dataList = await request.get('/goodslist/list',{
         page:NUM,
         pageSize:8,
         query
     })
     if(dataList.flag){
     moreData([...list,...dataList.data])
     }else{
      changIt(false)
    }
     }
     
   },[NUM])
     return(
         <div id="box">
           <ul className="list">
             { 

             list.map(item=>
              <li key={item.id} 
              onClick={()=>{
            //    console.log(12);
               props.history.push(`/detail/${item.id}`);
          }}>
                <img src={item.cover.wap_cover}></img>
             <p className="name">{item.name.replace(/\w/gi,'')}</p>
                 
              <p className="name">{item.name.replace(/[\u4E00-\u9FA5]/g,'')}</p>
                 
                 <div className="price">
                   <p>
             <label>￥{item.specs?item.specs[0].price:"118.00"}</label>
                   <label>{item.specs?item.specs[0].name:"1.0磅（14*14cm）"}</label>
                   </p>
                   <div className="anticon-addCart" 
                   onClick={(e)=>{
                     e.stopPropagation()
                    addToCart(item.id,item.specs[0].id)}}>
                   <ShoppingCartOutlined style={{fontSize: 20,color: "#492321"}}/>
                   </div>
                 </div>
              </li>
             )
              }
           </ul>
           <div className="footer" >
            <p>客服中心：400-0372-411</p>
            <p>豫ICP备15007864号</p>
            <p>COPYRIGHT©2009-2016 河南遇见食品有限公司 </p>
            <p>技术支持：迈小步科技</p>
            </div>
            <div className='alone'>

            </div>
         </div>
     )
 }
 const newOne=withUser(MoreOne)
export default newOne;