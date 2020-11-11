import React from 'react';
import '../assets/sass/home.scss';

import Company from '../components/Company';
function Home(){
    return(
        <div className="main">
            <div className="home">
                <div className="sweiper">
                    <img src="http://img.maixiaobu.cn/yujian-anyang/slide_picture/20200415/7e1c55d862b5ee7a.jpg" />
                </div>
                <div className="adPic">
                    <img src="http://img.maixiaobu.cn/yujian-anyang/category_picture/20200823/6013dceea11d968d.jpg" />
                </div>
                <div className="adPic">
                    <img src="http://img.maixiaobu.cn/yujian-anyang/category_picture/20200823/6013dceea11d968d.jpg" />
                </div>
                <div className="adPic">
                    <img src="http://img.maixiaobu.cn/yujian-anyang/category_picture/20200823/6013dceea11d968d.jpg" />
                </div>
                <div className="adPic">
                    <img src="http://img.maixiaobu.cn/yujian-anyang/category_picture/20200823/6013dceea11d968d.jpg" />
                </div>
                <div className="adPic">
                    <img src="http://img.maixiaobu.cn/yujian-anyang/category_picture/20200823/6013dceea11d968d.jpg" />
                </div>
                <Company />
            </div>
        </div>
    )
}

export default Home;