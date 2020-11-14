import React,{useState} from 'react';
import {withUser,withToken} from '../utils/hoc';
import '../assets/sass/mine.scss';

import { 
    DoubleRightOutlined,
    RightOutlined,

    UserOutlined,
    PhoneOutlined,
    DollarOutlined,
    TrophyOutlined,
} from '@ant-design/icons';
function Mine(props){
    // console.log("mine-props",props);
    const [zindex,changemask] = useState(-1000);
    return(
        <div className="main">
            <div className="mine">
                <div className="member">
                    <div className="avator">
                        <img src="http://img.maixiaobu.cn/yujian-anyang/fixed/20181022/0c2188979be61c61.png" alt=""/>
                    </div>
                    <div className="memberContent">
                        <div>
                            <p><UserOutlined />昵称：{props.currentUser?props.currentUser.username:''}</p>
                            <p><PhoneOutlined />手机：</p>
                            <p><DollarOutlined />余额：0.00</p>
                            <p><TrophyOutlined />付费等级：暂无</p>
                        </div>
                        <div className="icons-list"><DoubleRightOutlined onClick={()=>{
                            changemask(100)
                        }} /></div>
                    </div>

                </div>
                <div className="others">
                    <span>充值</span>
                    <span>我的二维码</span>
                </div>
                <div className="memberCon">
                    <div>
                        <b><DollarOutlined /></b>
                        <span>待付款</span>
                    </div>
                    <div>
                        <b><DollarOutlined /></b>
                        <span>待付款</span>
                    </div>
                    <div>
                        <b><DollarOutlined /></b>
                        <span>待付款</span>
                    </div>
                    <div>
                        <b><DollarOutlined /></b>
                        <span>待付款</span>
                    </div>
                    <b><RightOutlined /></b>
                    <div>
                        <b><DollarOutlined /></b>
                        <span>待付款</span>
                    </div>
                    <div>
                        <b><DollarOutlined /></b>
                        <span>待付款</span>
                    </div>
                    <div>
                        <b><DollarOutlined /></b>
                        <span>待付款</span>
                    </div>
                    <div>
                        <b><DollarOutlined /></b>
                        <span>待付款</span>
                    </div>
                    <div>
                        <b><DollarOutlined /></b>
                        <span>待付款</span>
                    </div>
                    <b><RightOutlined /></b>
                    <div>
                        <b><DollarOutlined /></b>
                        <span>待付款</span>
                    </div>
                </div>

            </div>
            <div className="editmine"  style={{zIndex:zindex}}>
                <ul>
                    <li>
                        <span>手机号：</span>
                    </li>
                    <li>
                        <span>昵称：</span>
                    </li>
                    <li>
                        <span>姓名：</span>
                    </li>
                    <li>
                        <span>邮箱：</span>
                    </li>
                    <li>
                        <span>生日：</span>
                    </li>
                    <li>
                        <span>性别：</span>
                    </li>
                    <li>
                        <span>修改密码</span>
                    </li>
                </ul>
                <div onClick={()=>{
                    changemask(-1000)
                }}>
                    安全退出
                </div>
            </div>
        </div>
    )
}
const NewMine=withUser(Mine);
const Mymine=withToken(NewMine)
export default Mymine;