import React,{useEffect,useState} from 'react';
import request from '../utils/request';
import '../assets/sass/detail.scss';
function Detail(props){
    // // console.log("detail-props",props);
    // const goodsId=props.location.pathname.split('/').slice(-1)[0];
    // const [detailData,changedetail] = useState([]);
    // useEffect(()=>{
    //     // 这里的代码在组件渲染结束后执行（初始化和组件更新）
    //     // 发起请求
    //     request(`/goodslist/getgood/${goodsId}`).then(res=>{
    //         changedetail(res.data)
    //     })
    // },[])
    return(
        <div className="main">
            <div className="detail">
                
                <div className="buyIt">
                    <button>加入购物车</button>
                    <button>立即预定</button>
                </div>
            </div>

        </div>
    )
}

export default Detail;