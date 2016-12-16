import types from '../types'
import { message } from 'antd';
import { delAllCookie } from '../../util';
import {
    browserHistory
} from 'react-router'

export default store => next => action => {
    // 这块根据自己的接口形式决定
    if (action.payload && action.payload.code) {
        const code = action.payload.code + ''
        const msg = action.payload.message || '操作失败！'

        // if (code == '-2') {
        //     next({
        //         type: types.TIMEOUT
        //     })
        //     window.location.href = '/#/login';
        //     return;
        // }

        if (code == '-3') {
            next(action)
            message.error(msg);
            return;
        }
    }

    // if(action.type == "INIT_HUXING_LIST_SUCCESS") {
    //     console.log('测试清除 cookie');
    //     delAllCookie();
    // }

    next(action)
}
