/*
    // 1、安装redux----npm i redux
    import {createStore} from 'redux';//2、引入redux

    let currentUser = localStorage.getItem('currentUser');
    try{
        currentUser = JSON.parse(currentUser) || {}
    }catch(err){
        currentUser = {}
    }
    const initialState={
        // 3、初始化state
        // username:"laoxie",
        // password:123456,
        ...currentUser
    }

    const reducer=function(state=initialState,action){
        // 4、创建reducer，且初始化state
        // reducer: - 是一个纯函数（不能修改传入的参数）
                // - 必须返回一个新的state
        // action : 命令（动作）,是一个对象，格式为：{type:'add_to_cart'}
        let newState;
        switch(action.type){
            case 'login':
                // console.log('login',action);
                newState=action.currentUser
                if(action.remember){
                    localStorage.setItem('currentUser',JSON.stringify(newState))
                }else{
                    sessionStorage.setItem('currentUser',JSON.stringify(newState))
                }
                return newState;
            case 'logout':
                localStorage.removeItem('currentUser')
                sessionStorage.removeItem('currentUser')
                return {}
            case 'changePassword':
                return newState={...state,password:633333};

        }
        return state
    }
    const store = createStore(reducer);//5、创建仓库
    // const action= {type:"changePassword"}
    // console.log("store",store);
    /*
        - getState()    获取state最新状态 
        - dispatch()    修改state的唯一方式
        - subscribe()   监听state修改

    */
    // console.log("state",store.getState());//state修改前
    // store.dispatch(action);//修改state
    // console.log("state",store.getState());//state修改后
/*


    export default store;//6、导出store
*/
