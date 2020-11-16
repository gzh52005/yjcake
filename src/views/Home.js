import React,{useEffect,useState} from 'react';
import '../assets/sass/home.scss';
import { Carousel } from 'antd';

import Company from '../components/Company';
import request from '../utils/request';
function Home(props){
    const [slideData,changeslide] = useState([]);
    const [listdata,changelist] = useState([]);
    useEffect(()=>{
        // 这里的代码在组件渲染结束后执行（初始化和组件更新）
        // 发起请求
        request('/goodslist/slide').then(res=>{
            changeslide(res.data)
           
        })
    },[])
    useEffect(()=>{
        // 这里的代码在组件渲染结束后执行（初始化和组件更新）
        // 发起请求
        request('/goodslist/category').then(res=>{
            changelist(res.data)
           
        })
    },[])
    return(
        <div className="main">
            <div className="home">
                <div className="sweiper">
                    {
                        // console.log("slideData",slideData)
                    }
                    <Carousel autoplay style={{touchAction: 'none'}} >
                        {
                            slideData.slice(0,5).map(item=><img src={item.pic_link} key={item._id} alt="图片" onClick={()=>{
                                // window.addEventListener('goTo', goTo, { passive: false })
                                if(item.skip_link){
                                    props.history.push(`/detail/${item.skip_link}`);
                                }else{
                                    props.history.replace('/home');
                                }
                            }} />
                            )
                        }
                    </Carousel>
                </div>
                <div className="adPic">
                    {
                        // console.log("listdata",listdata)
                    }
                   {
                       listdata.map(item=><img src={item.pic} key={item._id} alt="图片" onClick={()=>{
                            props.history.push(`/list/${item.id}`);
                       }} />
                       )
                   }
                </div>
                <Company />
            </div>
        </div>
    )
}

export default Home;