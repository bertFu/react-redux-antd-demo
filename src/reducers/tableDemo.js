// import _ from 'lodash';
import {message} from 'antd';
import {createReducer, getNewPager} from '../util';
import types from '../store/types';
const InitState = {
    list: [],

    loading: false,

    pager: {
        pageID: 1,
        pageSize: 3,
        total: 0,
    },

    searchParams: {
    },

    addModalVsible: false,

    addParams: {
    },

    addLoading: false,

    updParams: {
        parent: {
            dirty: false,
            name: 'parent',
            value: []
        },
    },

    updLoading: false,

    detail: {}
}

export default createReducer(InitState, {
    // 查询列表数据
    [`${types.PAGE_TABLEDEMO}_PENDING`]: (state, data, params) => {
        return Object.assign({}, state, {
            loading: true,
        })
    },
    [`${types.PAGE_TABLEDEMO}_SUCCESS`]: (state, data, params) => {
        if (data.code + '' != '0') {
            return Object.assign({}, state, {
                loading: false,
            })
        }
        
        return Object.assign({}, state, {
            loading: false,
            list: data.content.list,
            pager: {
                pageID: params.pageID,
                total: data.content.count,
                pageSize: params.pageSize,
            }
        })
    },
    [`${types.PAGE_TABLEDEMO}_ERROR`]: (state, data, params) => {
        return Object.assign({}, state, {
            loading: false,
        })
    },
    [`${types.SET_STATE_TABLEDEMO}`]: (state, data, params) => {
        return Object.assign({}, state, {
            ...params.state
        })
    },
    //添加
    [`${types.ADD_TABLEDEMO}_PENDING`]: (state, data, params) => {
        return Object.assign({}, state, {
            addLoading: true
        })
    },
    [`${types.ADD_TABLEDEMO}_SUCCESS`]: (state, data, params) => {
        if(data.code == 0){
            message.success('添加成功');
        }

        return Object.assign({}, state, {
            addParams : {},
            addLoading: false,
            addModalVsible: false,
        })
    },
    [`${types.ADD_TABLEDEMO}_ERROR`]: (state, data, params) => {
        message.error('添加失败')
        return Object.assign({}, state, {
            addLoading: false
        })
    },
    //修改
    [`${types.UPD_TABLEDEMO}_PENDING`]: (state, data, params) => {
        return Object.assign({}, state, {
            updLoading: true
        })
    },
    [`${types.UPD_TABLEDEMO}_SUCCESS`]: (state, data, params) => {
        if(data.code == 0){
            message.success('修改成功');
        }

        return Object.assign({}, state, {
            updParams : {},
            updLoading: false,
            updModalVsible: false,
        })
    },
    [`${types.UPD_TABLEDEMO}_ERROR`]: (state, data, params) => {
        message.error('修改失败')
        return Object.assign({}, state, {
            updLoading: false
        })
    },
    //删除
    [`${types.DEL_TABLEDEMO}_PENDING`]: (state, data, params) => {
        return Object.assign({}, state, {
        })
    },
    [`${types.DEL_TABLEDEMO}_SUCCESS`]: (state, data, params) => {
        if(data.code == 0){
            message.success('删除成功');
        }

        return Object.assign({}, state, {
        })
    },
    [`${types.DEL_TABLEDEMO}_ERROR`]: (state, data, params) => {
        message.error('删除失败')
        return Object.assign({}, state, {
        })
    },
    //禁用
    [`${types.DISABLE_TABLEDEMO}_PENDING`]: (state, data, params) => {
        return Object.assign({}, state, {
        })
    },
    [`${types.DISABLE_TABLEDEMO}_SUCCESS`]: (state, data, params) => {
        if(data.code == 0){
            message.success('禁用成功');
        }

        return Object.assign({}, state, {
        })
    },
    [`${types.DISABLE_TABLEDEMO}_ERROR`]: (state, data, params) => {
        message.error('禁用失败')
        return Object.assign({}, state, {
        })
    },
    //启用
    [`${types.ENABLE_TABLEDEMO}_PENDING`]: (state, data, params) => {
        return Object.assign({}, state, {
        })
    },
    [`${types.ENABLE_TABLEDEMO}_SUCCESS`]: (state, data, params) => {
        if(data.code == 0){
            message.success('启用成功');
        }

        return Object.assign({}, state, {
        })
    },
    [`${types.ENABLE_TABLEDEMO}_ERROR`]: (state, data, params) => {
        message.error('启用失败')
        return Object.assign({}, state, {
        })
    }
})
