import types from '../store/types';
import _ from 'lodash';
import {addFieldsToObject, objectTransformField} from '../util'
import {
    get_tableDemo_list,
    add_tableDemo,
    upd_tableDemo,
    del_tableDemo,
    enable_tableDemo,
    disable_tableDemo,
} from '../api/tableDemo';

export function initView(state) {
    return (dispatch, getState) => {
        dispatch({
            type: types.INIT_VIEW_TABLEDEMO,
            params: {
                state: state
            }
        })
    }
}

export function page(pageID) {
    return (dispatch, getState) => {

        const pageSize =  getState().tableDemo.pager.pageSize;
        const searchParams = getState().tableDemo.searchParams;
        const params = {
            skip: (pageID-1)*pageSize,
            limit: pageSize,
        }

        addFieldsToObject(params, searchParams);

        dispatch({
            type: types.PAGE_TABLEDEMO,
            payload: {
                promise: get_tableDemo_list(params)
            },
            params: {
                ...params,
                pageSize: pageSize,
                pageID : pageID,
            }
        })
    }
}

export function setSearchParam(state) {
    return (dispatch, getState) => {
        dispatch(setState({
            searchParams: {
                ...getState().tableDemo.searchParams,
                ...state
            }
        }))
    }
}

export function search() {
    return (dispatch, getState) => {

        const pageSize =  getState().tableDemo.pager.pageSize
        const searchParams = getState().tableDemo.searchParams;
        const params = {
            skip: 0,
            limit: pageSize,
        }

        addFieldsToObject(params, searchParams);

        dispatch({
            type: types.PAGE_TABLEDEMO,
            payload: {
                promise: get_tableDemo_list(params)
            },
            params: {
                ...params,
                pageSize: pageSize,
                pageID : 1,
            }
        })
    }
}

export function clearSearch() {
    return (dispatch, getState) => {
        const params = {}

        let pageSize =  getState().tableDemo.pager.pageSize

        dispatch(setState({
            searchParams: {}
        }))

        dispatch({
            type: types.PAGE_TABLEDEMO,
            payload: {
                promise: get_tableDemo_list({
                    skip: 0,
                    limit: pageSize,
                })
            },
            params: {
                pageSize: pageSize,
                pageID : 1,
                name : '',
            }
        })
    }
}

export function showAdd() {
    return (dispatch, getState) => {
        dispatch(setState({
            addModalVsible: true
        }))
    }
}

export function closeAdd() {
    return (dispatch, getState) => {
        dispatch(setState({
            addModalVsible: false
        }))
    }
}

export function setAddParam(state) {
    return (dispatch, getState) => {
        dispatch(setState({
            addParams: {
                ...getState().tableDemo.addParams,
                ...state
            }
        }))
    }
}

export function add() {
    return (dispatch, getState) => {
        const pageID = 1;
        const addParams = getState().tableDemo.addParams;
        const params = {}

        addFieldsToObject(params, addParams);

        dispatch({
            type: types.ADD_TABLEDEMO,
            payload: {
                promise: add_tableDemo(params).then(function(data){
                    if(data.code == 0){
                        dispatch(page(pageID))
                    }

                    return data;
                })
            },
            params: params
        })
    }
}

export function showUpd(record) {
    let updParams = objectTransformField({}, record);

    return (dispatch, getState) => {
        dispatch(setState({
            updModalVsible: true,
            updParams: updParams,
            detail : record
        }))
    }
}
export function closeUpd() {
    return (dispatch, getState) => {
        dispatch(setState({
            updModalVsible: false
        }))
    }
}

export function setUpdParam(fields) {
    let state = addFieldsToObject({}, fields);



    return (dispatch, getState) => {
        dispatch(setState({
            updParams: {
                ...getState().tableDemo.updParams,
                ...fields
            },
            detail : {
                ...state
            }
        }))
    }
}

export function upd() {
    return (dispatch, getState) => {
        const pageID = getState().tableDemo.pager.pageID;
        const updParams = getState().tableDemo.updParams;
        const params = addFieldsToObject({}, updParams);

        dispatch({
            type: types.UPD_TABLEDEMO,
            payload: {
                promise: upd_tableDemo(params).then(function(data){
                    if(data.code == 0){
                        dispatch(page(pageID))
                    }

                    return data;
                })
            },
            params: params
        })
    }
}

export function del(id) {
    return (dispatch, getState) => {
        let pageID = getState().tableDemo.pager.pageID

        dispatch({
            type: types.DEL_TABLEDEMO,
            payload: {
                promise: del_tableDemo({
                    id: id
                }).then(function(data){
                    if(data.code == 0){
                        dispatch(page(pageID))
                    }

                    return data;
                })
            }
        })
    }
}
export function disable(id) {
    return (dispatch, getState) => {
        let pageID = getState().tableDemo.pager.pageID

        dispatch({
            type: types.DISABLE_TABLEDEMO,
            payload: {
                promise: disable_tableDemo({
                    id: id
                }).then(function(data){
                    if(data.code == 0){
                        dispatch(page(pageID))
                    }

                    return data;
                })
            }
        })
    }
}
export function enable(id) {
    return (dispatch, getState) => {
        let pageID = getState().tableDemo.pager.pageID

        dispatch({
            type: types.ENABLE_TABLEDEMO,
            payload: {
                promise: enable_tableDemo({
                    id: id
                }).then(function(data){
                    if(data.code == 0){
                        dispatch(page(pageID))
                    }

                    return data;
                })
            }
        })
    }
}

// ------------------------
// Util
// ------------------------
function setState(state) {
    return (dispatch, getState) => {
        dispatch({
            type: types.SET_STATE_TABLEDEMO,
            params: {
                state: state
            }
        })
    }
}
