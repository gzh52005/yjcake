import React,{useEffect, useState} from 'react';
import {ShoppingCartOutlined} from '@ant-design/icons';
import request from '../../utils/request';
import '../../assets/sass/findMore.scss';
 function MoreOne(props){
   //  console.log(props);
  let isScroll=true;
//   let isLoad=false
  const [list,moreData]=useState([]);
  const [NUM,newNum]=useState(1);
  const [isContinue,changIt]=useState(true);
//   const [isLoad,changLoad]=useState(false)
  useEffect(async()=>{
     let timer = null;
     window.addEventListener('scroll',()=>{
      let scrollTop  = document.documentElement.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight =document.documentElement.scrollHeight;
      isScroll=scrollTop+clientHeight+600>=scrollHeight?true:false;
      if(!timer&&isScroll){
         timer=setTimeout(()=>{
               newNum(NUM+1);
         },400);
      }
     });
   if(isScroll&&isContinue){
      const dataList = await request.get('/goodslist/list',{
         page:NUM,
         pageSize:8,
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
               console.log(12);
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
                   <div className="anticon-addCart">
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
export default MoreOne;