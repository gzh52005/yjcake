import React,{useEffect,useState} from 'react';
import { Form, Input, Button, Checkbox ,message} from 'antd';
import CryptoJS from 'crypto-js';
import request from '../utils/request';
import '../assets/sass/login.scss';
function Login(props){
    const currentUsername = props.location.state ? props.location.state.username : ''
    const onFinish =async function(values)  {
      const password = CryptoJS.SHA256(values.password).toString();
      // 加密用户信息
    //   console.log("values",values);
      // 验证登录是否
      let currentUser=await request('/user/getVerify/login',{
        name:values.username,
        password:password,
        code:values.checkCode+'',
        
    })
      console.log("currentUser=",currentUser);
      if(currentUser.code === 2000){
        // props.login(currentUser.data,values.remember);
        // 登录跳转
        props.history.replace('/mine');
      }else if(currentUser.code === 3000){
          message.error('用户名或密码错误')
      }
     
    };
    const [imgcode, setImgcode] = useState({img:'点击获取验证码'});
    useEffect(() => {
        console.log(imgcode);
        document.querySelector('.imgcode').innerHTML=imgcode.img;
    },[imgcode]); 
    return(
        <div className="main">
            <div className="login">
                
                    <Form labelCol={{span:3,offset:0}}
                        name="用户登录"
                        initialValues={{ remember: true,username:currentUsername }}
                        onFinish={onFinish}
                        >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名！' }]}
                            hasFeedback='true'
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码！' }]}
                        >
                            <Input.Password/>
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
                        <Form.Item 
                        name="remember" valuePropName="checked">
                            <Checkbox>7天免登陆</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button 
                            type="primary" 
                            htmlType="submit" 
                            >
                            登录
                            </Button>
                        </Form.Item>
                    </Form>
                
                <div className="footer"></div>
            </div>
        </div>
    )
}

export default Login;