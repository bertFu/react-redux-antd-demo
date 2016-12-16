import './index.html';
import ReactDOM from 'react-dom';
import React from 'react';
import {
    hashHistory,
    Router,
    Route,
    IndexRedirect
} from 'react-router';

import App from '../views/App';
import Home from '../views/Home';
import Login from '../views/Login';
import Demo from '../views/Demo';
import TableDemo from '../views/TableDemo';

import NotFound from '../components/NotFound';
import Loding from '../components/Loding';
import './index.less';
import {getCookie} from '../util';

const Provider = require('react-redux').Provider;
const configureStore = require('../store/configureStore');
const store = configureStore();

function validate(next, replace, callback) {
    // 在路由群载入时做 filter 处理
    // const isLoggedIn = !!getCookie('backend_token')
    // if (!isLoggedIn && next.location.pathname != '/login') {
    //     replace('/login')
    // }
    callback()
}

ReactDOM.render(
    <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/login" component={Login}/>
        <Route path="/" onEnter={validate}>
            <IndexRedirect to="tdemo"/>
            <Route component={App}>
                <Route path="home" component={Home}/>
                <Route path="loding" component={Loding}/>
                <Route path="tdemo" component={TableDemo}/>
                <Route path="demo" component={Demo}/>
            </Route>
        </Route>
        <Route path="*" component={NotFound}/>
    </Router>
</Provider>, document.getElementById('root'));
