import types from '../store/types';

import {
    get_demo_list,
    add_demo,
    del_demo,
    upd_demo,
} from '../api/service';

export function getList() {
    return (dispatch, getState) => {
        const params = {}

        dispatch({
            type: types.GET_DEMO_LIST,
            payload: {
                promise: get_demo_list(params)
            }
        })
    }
}
export function setTitle(title) {
    return (dispatch, getState) => {

        dispatch(setState({
            title: title
        }))
    }
}
export function addDemo() {
    return (dispatch, getState) => {
        const title = getState().demo.title;
        const list = getState().demo.list;

        dispatch({
            type: types.ADD_DEMO,
            payload: {
                promise: add_demo({title: title})
            },
            params: {
                title: title,
                id: list.length + 1
            }
        })
    }
}

export function delDemo(id) {
    return (dispatch, getState) => {

        dispatch({
            type: types.DEL_DEMO,
            payload: {
                promise: del_demo({id: id})
            },
            params: {
                id: id
            }
        })
    }
}
export function updDemo() {
    return (dispatch, getState) => {

        const updDemoInfo = getState().demo.updDemoInfo;

        dispatch({
            type: types.UPD_DEMO,
            payload: {
                promise: upd_demo(updDemoInfo)
            },
            params: updDemoInfo
        })
    }
}
export function setUpdDemoInfo(state) {
    return (dispatch, getState) => {
        dispatch({
            type: types.SET_UPD_DEMO_INFO,
            params: {
                state: state
            }
        })
    }
}
export function showUpdDemoItem(id) {
    return (dispatch, getState) => {
        dispatch({
            type: types.SHOW_UPD_DEMO_VISIBLE,
            params: {
                id: id
            }
        })
    }
}
export function closeUpdDemoItem(id) {
    return (dispatch, getState) => {
        dispatch({
            type: types.CLOSE_UPD_DEMO_VISIBLE,
            params: {
                id: id
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
            type: types.SET_DEMO_STATE,
            params: {
                state: state
            }
        })
    }
}
