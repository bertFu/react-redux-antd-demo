import {getCookie} from '../util';
import api from '../api';
import types from '../store/types';
import {
    user_login,
    get_all_regions,
    get_all_privilege,
    get_privilege_regions,
} from '../api/user';

export function fetchProfile() {
  let backend_token = getCookie('backend_token');

  if (backend_token === undefined) {
    return { type: types.UID_NOT_FOUND };
  }
  return dispatch => {
      dispatch(setAg());
      dispatch(getAllRegions());
      dispatch(getAllPrivilege());
      dispatch({
          type: types.FETCH_PROFILE,
      });
  }
}

export function login(user, password) {
  return {
    type: types.LOGIN,
    payload: {
      promise: user_login({
          username: user,
          pwd: password
      })
    }
  }
}

export function logout() {
  return {
    type: types.LOGOUT,
    payload: {
      promise: api.post('logout')
    }
  }
}

export function updState(state) {
  return {
    type: types.UPD_STATE,
    params: {
      state: state
    }
  }
}


export function updNickname(nickname) {
  const _nickname = encodeURI(nickname);
  return {
    type: types.UPD_NICKNAME,
    payload: {
      promise: api.put('case/nickname', { params: { nickname: _nickname } })
    },
    params: {
      nickname: nickname
    }
  }
}
