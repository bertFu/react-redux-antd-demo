// import _ from 'lodash';
import {message} from 'antd';
import {createReducer, getNewPager} from '../util';
import types from '../store/types';
const InitState = {
    list: [{
        id: 1,
        title: '测试'
    }],
    loading: false,
    pager: {
        pageID: 1,
        pageSize: 10,
        total: 0,
    },

    title: '',

    updDemoInfo: {
        title: '',
    },
    oldUpdDemoInfo: {
        title: '',
    },
}

export default createReducer(InitState, {
    [`${types.GET_DEMO_LIST}`]: (state, data, params) => {
        return Object.assign({}, state, {
            loading: true,
        })
    },
    // 显示修改项
    [`${types.SHOW_UPD_DEMO_VISIBLE}`]: (state, data, params) => {
        let list = state.list;
        let updDemoInfo = '';

        list = state.list.map((item) => {
            if (item.id == params.id) {
                item.updStatus = 'update';
                updDemoInfo = item;
            } else {
                item.updStatus = '';
            }
            return item;
        })

        return Object.assign({}, state, {
            list: list,
            updDemoInfo: updDemoInfo,
        })
    },
    // 取消修改项
    [`${types.CLOSE_UPD_DEMO_VISIBLE}`]: (state, data, params) => {
        let list = state.list;
        list = state.list.map((item) => {
            if (item.id == params.id) {
                item.updStatus = '';
            }
            return item;
        })

        return Object.assign({}, state, {
            list: list,
            updDemoInfo: InitState.updDemoInfo,
            oldUpdDemoInfo: InitState.updDemoInfo,
        })
    },
    // 设置 Demo 的 State
    [`${types.SET_DEMO_STATE}`]: (state, data, params) => {
        return Object.assign({}, state, {
            ...params.state
        })
    },
    // 设置 Demo 的 State
    [`${types.SET_UPD_DEMO_INFO}`]: (state, data, params) => {
        return Object.assign({}, state, {
            updDemoInfo: {
                ...state.updDemoInfo,
                ...params.state
            }
        })
    },
    // 查询 Demo
    [`${types.GET_DEMO_LIST}_PENDING`]: (state, data, params) => {
        return Object.assign({}, state, {
            loading: true,
        })
    },
    [`${types.GET_DEMO_LIST}_SUCCESS`]: (state, data, params) => {
        return Object.assign({}, state, {
            loading: false,
            list: data.content
        })
    },
    [`${types.GET_DEMO_LIST}_ERROR`]: (state, data, params) => {
        return Object.assign({}, state, {
            loading: false,
        })
    },
    // 添加 Demo
    [`${types.ADD_DEMO}_PENDING`]: (state, data, params) => {
        let list = state.list;

        list.unshift({
            title: params.title,
            id: params.id,
            addStatus: 'loading',
        })

        return Object.assign({}, state, {
            list: list,
        })
    },
    [`${types.ADD_DEMO}_SUCCESS`]: (state, data, params) => {
        let list = state.list;

        list = state.list.map((item) => {
            if (item.id == params.id) {
                item.addStatus = data.code != '0' ? 'error' : 'success';
            }
            return item;
        })

        return Object.assign({}, state, {
            list: list,
        })
    },
    [`${types.ADD_DEMO}_ERROR`]: (state, data, params) => {
        let list = state.list;

        list = state.list.map((item) => {
            if (item.id == params.id) {
                item.addStatus = 'error';
            }
            return item;
        })

        return Object.assign({}, state, {
            list: list,
        })
    },
    // 修改 Demo
    [`${types.UPD_DEMO}_PENDING`]: (state, data, params) => {
        let list = state.list;

        list = state.list.map((item) => {
            if (item.id == params.id) {
                item = params;
                item.updStatus = 'loading';
            }
            return item;
        })

        return Object.assign({}, state, {
            list: list,
        })
    },
    [`${types.UPD_DEMO}_SUCCESS`]: (state, data, params) => {

        let list = state.list;

        if (data.code != '0') {
            message.error(data.message);
            list = state.list.map((item) => {
                if (item.id == params.id) {
                    item = state.oldUpdDemoInfo;
                    item.updStatus = 'update';
                }
                return item;
            })
            return Object.assign({}, state, {
                list: list,
            })
        }

        list = state.list.map((item) => {
            if (item.id == params.id) {
                item.updStatus = '';
            }
            return item;
        })

        return Object.assign({}, state, {
            list: list,
            oldUpdDemoInfo: InitState.oldUpdDemoInfo,
            updDemoInfo: InitState.updDemoInfo
        })
    },
    [`${types.UPD_DEMO}_ERROR`]: (state, data, params) => {
        let list = state.list;

        message.error('出现异常，请稍后再试...');
        list = state.list.map((item) => {
            if (item.id == params.id) {
                item = state.oldUpdDemoInfo;
                item.updStatus = '';
            }
            return item;
        })
        return Object.assign({}, state, {
            list: list,
            oldUpdDemoInfo: InitState.oldUpdDemoInfo,
            updDemoInfo: InitState.updDemoInfo,
        })
    },
    // 删除 Demo
    [`${types.DEL_DEMO}_PENDING`]: (state, data, params) => {
        let list = state.list;

        list = state.list.map((item) => {
            if (item.id == params.id) {
                item.delStatus = 'loading';
            }
            return item;
        })

        return Object.assign({}, state, {
            list: list,
        })
    },
    [`${types.DEL_DEMO}_SUCCESS`]: (state, data, params) => {
        let list = state.list;

        if (data.code == '0') {
            list = state.list.filter((item) => {
                return item.id != params.id;
            })
        } else {
            list = state.list.map((item) => {
                if (item.id == params.id) {
                    item.delStatus = 'error';
                }
                return item;
            })
        }

        return Object.assign({}, state, {
            list: list,
        })
    },
    [`${types.DEL_DEMO}_ERROR`]: (state, data, params) => {
        let list = state.list;

        list = state.list.map((item) => {
            if (item.id == params.id) {
                item.delStatus = 'error';
            }
            return item;
        })

        return Object.assign({}, state, {
            list: list,
        })
    },
})
