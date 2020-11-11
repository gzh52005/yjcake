import React from 'react';

import '../assets/sass/cart.scss';
function Home(){
    return(
        <div className="main">
            <ul className="cartItems">
                <li>
                    <div className="pic">
                        <img src="http://img.maixiaobu.cn/yujian-anyang/product/20200925/99b037aaaad5159a.jpg"  alt="" />
                    </div>
                    <div className="content">
                        <div className="title">
                            <p>
                                <p>热情百香果 Passion passion fruit</p>
                                <p>规格：1.0磅-14*14cm </p>
                            </p>
                            <input type="checkbox" />
                        </div>
                        <div className="stepper">
                            <span className="price">￥199.00</span>
                            <div>
                                <button>-</button>
                                <span>0</span>
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="cart">
                <div className="check">
                    <input type="checkbox"/>
                    <span>商品总价：￥0.00</span>
                </div>
                <div className="gobuy">
                    <span>去结算</span>
                </div>
            </div>
        </div>
    )
}

export default Home;