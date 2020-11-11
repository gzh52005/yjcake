import React from 'react';

import '../assets/sass/mine.scss';

import { 
    DoubleRightOutlined,
    UserOutlined,
    DollarOutlined,
    RightOutlined,
} from '@ant-design/icons';
function Home(){
    return(
        <div className="main">
            <div className="mine">
                <div className="member">
                    <div className="avator">
                        <img src="http://img.maixiaobu.cn/yujian-anyang/fixed/20181022/0c2188979be61c61.png" alt=""/>
                    </div>
                    <div className="memberContent">
                        <div>
                            <p><UserOutlined />昵称：</p>
                            <p><UserOutlined />昵称：</p>
                            <p><UserOutlined />昵称：</p>
                            <p><UserOutlined />昵称：</p>
                        </div>
                        <div className="icons-list"><DoubleRightOutlined /></div>
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
        </div>
    )
}

export default Home;