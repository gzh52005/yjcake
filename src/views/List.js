import React from 'react';
import {Route, Redirect, Switch,withRouter,NavLink} from 'react-router-dom';
import '../assets/sass/list.scss';
import Company from '../components/Company';
// 引入页面组件
import One from './ListMore/one.jsx';
import Two from './ListMore/two';
import Three from './ListMore/three';
import Four from './ListMore/four';
import Five from './ListMore/five';
import Six from './ListMore/six';
function Home(props){
    const menu = [{
                path: '/list/0',
                text: '全部'
            }, {
                path: '/list/2',
                text: '慕斯蛋糕'
            }, {
                path: '/list/1',
                text: '乳脂奶油蛋糕'
            }, {
                path: '/list/11',
                text: '拿破仑蛋糕'
            },{
                path: '/list/3',
                text: '巧克力蛋糕'
            },{
                path: '/list/12',
                text: '冰淇淋蛋糕'
            }];
    const goto = (path) => {
               props.history.push(path)
            }
    return(
        <div className="main">
            <div className="list">
            <nav>
                 <ul className="listMuen">
                     {
                        menu.map(item => <li key={item.path} onClick={goto.bind(null, item.path)}>
                            <NavLink 
                            activeClassName="active"
                            to={item.path}
                            >{item.text}</NavLink> 
                        </li>)
                    }
                </ul>
            </nav> 
              
            <Switch>
            <Route path="/list/0" component={One} />
            <Route path="/list/2" component={Two} />
            <Route path="/list/1" component={Three} />   
            <Route path="/list/11" component={Four} />  
            <Route path="/list/3" component={Five} />      
            <Route path="/list/12" component={Six} />  
            <Redirect from="/list" to="/list/0" exact />
            </Switch>
            </div>
           
        </div>
    )
}
const List = withRouter(Home)
export default List;