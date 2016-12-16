import api from '../api';
import types from '../store/types';

// ------------------------
// Action
// ------------------------

// 修改面包屑
export function updateNavPath(path, key) {
    return {
        type: types.UPDATE_NAVPATH,
        payload: {
            data: path,
            key: key
        }
    }
}

// 修改 state
export function setState(state) {
    return {
        type: types.SET_STATE,
        params: {
            state: state
        }
    }
}

// 侧栏菜单缩放效果
export function updateCollapse(collapse) {
    return {
        type: types.UPDATE_COLLAPSE,
        payload: {
            collapse: collapse,
        }
    }
}

export function setTopMenu(key) {
    return {
        type: types.SET_TOP_MENU,
        params: {
            key: key,
        }
    }
}


// ------------------------
// Uilt
// ------------------------
