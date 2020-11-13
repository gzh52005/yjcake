import React,{useEffect,useState} from 'react';
import { Form, Input, Button,message} from 'antd';
import CryptoJS from 'crypto-js';
import request from '../utils/request';
import '../assets/sass/login.scss';
function Reg(props){
    const [imgcode, setImgcode] = useState({img:'点击获取验证码'});
    useEffect(() => {
        console.log(imgcode);
        document.querySelector('.imgcode').innerHTML=imgcode.img;
    },[imgcode]); 
    const onFinish =async values => {
        // 用户信息加密
        const password = CryptoJS.SHA256(values.password).toString();
        // 验证验证码
        if(values.checkCode===imgcode.code){
            // 注册请求
            const data=await request.post('/user/reg',{
                name:values.username,
                password:password,
            })
            console.log("data",data);
            if(data.code===2000){
                message.success('注册成功');
                // 注册成功跳转到登录
                props.history.replace({
                    pathname:'/login',
                    state:{
                        username:values.username
                    }
                })
            }else if(data.code===3000){
                message.error('注册失败');
            }
        }
        
        
    };
    return(
        <div className="main">
            <div className="login">
                <Form
                    name="用户注册"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' },
                        {validator:function (rule,value) {
                        // 自定义校验
                        // console.log("validator",rule,values);
                        return new Promise((resolve,reject)=>{
                            request.get('/user/checkname',{
                                name:value
                            }).then(res=>{
                                if(res.code === 3000){
                                    reject('用户名已存在')
                                }else if(res.code === 2000){
                                    resolve()
                                }
                            })
        
                        })
                        }}]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="confirm"
                        rules={[
                            {
                            required: true,
                            message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="验证码"
                        name="checkCode"
                        rules={[{ required: true, message: '请输入验证码' }]}
                        >
                        <Input /> 
                    </Form.Item>
                        <span className="imgcode" onClick={async()=>{
                            const imgcode = await request(
                                `/user/getVerify`,
                            )
                            console.log(imgcode);
                            setImgcode(imgcode);
                        }}></span> 
                    <Form.Item>
                        <Button 
                        type="primary" 
                        htmlType="submit" 
                        >
                        注册
                        </Button>
                    </Form.Item>
                </Form>

                <div className="footer"></div>
            
            </div>
        </div>
    )
}

export default Reg;