/**
 * 高阶组件
    * 把组件作为参数传入
    * 返回一个新的组件
    
    * 注意：封装高阶组件一定要传递props
* 高阶组件定义方式
    * 定义方式一： 属性代理
    * 定义方式二： 反向继承
        > 一般用于类组件
 */
import React from 'react';
// import {Redirect} from 'react-router-dom';
import store from '../store/redux.js';
// import request from '../utils/request';
// import {message} from 'antd';
// 属性代理
export function withUser(InnerComponent){
    return function OuterComponent(props){
        // console.log('OuterComponent.props=',props);
        const data=localStorage.getItem('currentUser');
        // const cart=localStorage.getItem('userCart');
        let currentUser;
        // let userCart;
        try{
            currentUser=JSON.parse(data);
            // userCart=JSON.parse(cart);
        }catch(err){
            currentUser=data;
            // userCart=cart;
        }
        return <InnerComponent {...props} currentUser={currentUser}/>
    }
}
// 加强版：属性代理(无论传什么参数都可获取，传key(currentUser)得key(currentUser))
export function withStorage(...keys){
    return function(InnerComponent){
        return function OuterComponent(props){
            let storage={};
            for(let key of keys){
                
                let data = localStorage.getItem(key);
                try{
                    data = JSON.parse(data);
                }catch(err){
                    
                }
                // console.log(key,data);
                storage[key]=data;
                
            }
            // console.log("storage",storage);
            return <InnerComponent {...props} {...storage}  />
        }
    }
}
// 校验token
export function withToken(InnerComponent){
    return function OuterComponent(props){
        let data=localStorage.getItem('currentUser');
        if(!data){
            props.history.replace({
                pathname:'/login',
                search:props.location.pathname
            })
        }
         
        return <InnerComponent {...props}/>
    }
}
// 反向继承：一般用于类组件
// export function withAuth(InnerComponent){
    
//     return class OuterComponent extends InnerComponent{
//         async componentDidMount(){
//             // console.log("withAuth",this.props);
//             const {currentUser} = this.props;

//             // 校验token
//             if(currentUser){
//                 const data = await request.get('/user/verify',{},{
//                     headers:{
//                         Authorization:currentUser.Authorization
//                     }
//                 });
    
//                 // console.log('verify=',data);
//                 if(data.status === 401){
//                     message.error('登录已失效，请重新登录')
//                     this.props.history.replace({
//                         pathname:'/login',
//                         search:this.props.location.pathname
//                     })
//                 }

//             }
//         }
//         render(){
//             const {currentUser}=this.props;
//             if(currentUser){
//                 return super.render()
//             }else{
//                 return <Redirect to="/login" />
//             }
            
//         }
        
//     }
//     // return OuterComponent
// }

export function withRedux(InnerComponent){
    return class OuterComponent extends React.Component{
        state={
            data:{

            }
        }
        componentDidMount(){
            const data = store.getState();
            this.setState({
                data
            });

            store.subscribe(()=>{
                const newData = store.getState();
                this.setState({
                    data:newData
                });
            })
        }
        render(){
            return <InnerComponent {...this.props} storeState={this.state.data} dispatch={store.dispatch} subscribe={store.subscribe} />
        }
    }
}