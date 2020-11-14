import React,{useEffect,useState} from 'react';
import { Carousel , Spin,message } from 'antd';
import { DoubleRightOutlined} from '@ant-design/icons';
import request from '../utils/request';
import '../assets/sass/detail.scss';
import { Badge } from 'antd';
import { withUser } from '../utils/hoc';
function Detail(props){
    // console.log("detail-props",props);
    const goodsId=props.location.pathname.split('/').slice(-1)[0];
    const [detailData,changedetail] = useState();
    useEffect(()=>{
        // 这里的代码在组件渲染结束后执行（初始化和组件更新）
        // 发起请求
        request(`/goodslist/getgood/${goodsId}`).then(res=>{
            changedetail(...(res.data))
            document.querySelector('.text').innerHTML=res.data[0].describe;
            document.querySelector('.bigImg').innerHTML=res.data[0].wap_description;
        })
    },[goodsId]);
    const [zindex,changemask] = useState(-100);
    const [idx,changeidx] = useState(0);
    let [num,changenum] = useState(1);
    let [cartNum,changecart] = useState(0);
    useEffect(()=>{
        if(props.userCart!=='undefined'){
            changecart(props.userCart.length);
        }
    },[])
    return(
        <div className="main">
            <div className="goodsNum"><Badge count={cartNum} offset={[-13, 7]} size="small" showZero></Badge></div>
            <div className="detail">
                <div className="sweiper">
                    {
                        // console.log("detailData",detailData?detailData:detailData)
                    }
                    <Carousel autoplay>
                        {
                            detailData?detailData.pc_pictures.map(item=><img src={item.pc_picture} key={item.id} alt="图片" />
                            ):<Spin />
                        }
                    </Carousel>
                </div>
                <div className="content">
                    <h1>
                        {
                            detailData?detailData.name:<Spin />
                        }
                    </h1>
                    <div className="text"></div>
                    <div className="choceSpec">
                        <p><label>规格数量选择</label><span className="name">({ detailData?detailData.specs[idx].name:''})</span>x<span className="num">{num}</span></p>
                        <DoubleRightOutlined onClick={()=>{
                            changemask(1);
                        }} />
                    </div>
                    <div className="bigImg"></div>
                </div>
                <div className="buyIt">
                    <button onClick={()=>{
                        // console.log(props.currentUser.username,goodsId,num,detailData.specs[idx].id);
                        if(props.currentUser){
                            request.post('/cart/addcart',{
                                name:props.currentUser.username,
                                id:goodsId,
                                num:num,
                                specs_id:detailData.specs[idx].id,
                            }).then(res=>{
                                // console.log("addgoods",res);
                                if(res.code===2000){
                                    message.success('已加入购物车');
                                    const query={
                                        name:props.currentUser.username,
                                        albuy:"未购",
                                    }
                                    request('/cart/findAll',{query:JSON.stringify(query)}).then(res=>{
                                        // 查询购物车数据
                                        // console.log("查询",res);
                                        if(res.code===2000){
                                           localStorage.setItem("userCart",JSON.stringify(res.data));
                                           changecart(res.data.length);
                                        } 
                                    })
                                }
                            })
                        }else{
                            message.warning('请先登录同步购物车！');
                            props.history.push('/login');
                        }
                    }}>加入购物车</button>
                    <button>立即预定</button>
                </div>
            </div>
            <div className="mask" style={{zIndex:zindex}}>
                <h1>￥
                {
                    detailData?detailData.specs[idx].price:<Spin />
                } 
                </h1>
                <div className="specs">
                    {
                        detailData?detailData.specs.map((item,index)=>
                            <span className="specName" key={item.id} onClick={()=>{
                                changeidx(index);
                                document.querySelectorAll('.specName').forEach(item=>{
                                    item.classList.remove('chocespec');
                                })
                                document.querySelectorAll('.specName')[index].classList.add('chocespec');
                            }}>
                                {item.name}
                            </span>
                        ):<Spin />
                    } 
                </div>
                <p className="changeNum">
                    <span>数量</span>
                    <b
                        onClick={()=>{
                            if(num>=2){
                                changenum(--num);
                            }
                        }}
                    >-</b>
                    <b className="num">{num}</b>
                    <b
                        onClick={()=>{
                            changenum(++num);
                        }}
                    >+</b>
                </p>
                <p className="isSure">
                    <span  onClick={()=>{
                        changemask(-100);
                    }}>确定</span>
                </p>
            </div>
        </div>
    )
}
const Newdetail=withUser(Detail)
export default Newdetail;