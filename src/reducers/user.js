import _ from 'lodash';
import {getCookie, delAllCookie, provincesCitysDistrictsFormat} from '../util';
import {
    message
} from 'antd';
import {
    createReducer
} from '../util';
import types from '../store/types';

const InitState = {

    agUrl: "",
    agOauth: "",

    allRegions: [],
    allRegionsLoading: false,

    name: null,
    id: null,
    backend_token: null,
    portrait: null,

    loggingIn: false,
    loggingOut: false,
    loginErrors: null,
}

export default createReducer(InitState, {
    [`${types.LOGIN}_PENDING`]: (state, data) => {
        return Object.assign({}, InitState, {
            loggingIn: true
        });
    },
    [`${types.LOGIN}_SUCCESS`]: (state, data) => {
        if (data.code != '0') {
            return Object.assign({}, state, {
                ...state,
                loggingIn: false,
                user: null,
                loginErrors: data.message
            });
        }

        let name = 'Bert';

        return Object.assign({}, state, {
            user: name,
            loggingIn: false,
            loginErrors: null
        });
    },
    [`${types.LOGIN}_ERROR`]: (state, data) => {
        return Object.assign({}, state, {
            ...state,
            loggingIn: false,
            user: null,
            loginErrors: null
        });
    },
    [`${types.LOGOUT}_SUCCESS`]: (state, data) => {
        return Object.assign({}, InitState, {
            loggingOut: true,
        });
    },
    [`${types.LOGOUT}_ERROR`]: (state, data) => {
        message.error('注销失败！')
        return state;
    },
    [`${types.ERROR_SHOW_MESSAGE}`]: (state, data, params) => {
        message.error(params.message)
        return state;
    },
    [`${types.FETCH_PROFILE}`]: (state, data, params) => {

        let name = decodeURIComponent(getCookie('name'));
        let portrait = decodeURIComponent(getCookie('image'));
        let id = decodeURIComponent(getCookie('id'));
        let backend_token = decodeURIComponent(getCookie('backend_token'));
        let username = decodeURIComponent(getCookie('username'));

        return Object.assign({}, state, {
            name: name,
            portrait: portrait,
            id: id,
            backend_token: backend_token,
            username: username,

            loggingIn: false,
            loginErrors: null
        });
    },
    [`${types.TIMEOUT}`]: (state, data) => {
        delAllCookie();
        return Object.assign({}, InitState, {
            loggingOut: true,
        });
    },
})
