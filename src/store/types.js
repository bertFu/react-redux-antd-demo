import keyMirror from 'key-mirror'

/**
 * key-mirror：
 * keyMirror() 创建的对象，值会与名字一致，编码起来更方便
 */

export default keyMirror({

    // -------------
    // Menu
    // -------------
    UPDATE_NAVPATH: null,
    UPDATE_COLLAPSE: null,
    SET_STATE: null,
    SET_TOP_MENU: null,

    // -------------
    // User
    // -------------
    UID_NOT_FOUND: null,
    FETCH_PROFILE: null,
    LOGIN: null,
    LOGOUT: null,
    TIMEOUT: null,
    UPD_STATE: null,
    UPD_NICKNAME: null,
    GET_AG_USER: null,
    GET_ALL_PRIVILEGE: null,
    GET_PROJECT_PRIVILEGE: null,

    // -------------
    // TableDemo
    // -------------
    INIT_VIEW_TABLEDEMO: null,
    PAGE_TABLEDEMO: null,
    SET_STATE_TABLEDEMO: null,
    ADD_TABLEDEMO: null,
    UPD_TABLEDEMO: null,
    DEL_TABLEDEMO: null,
    DISABLE_TABLEDEMO: null,
    ENABLE_TABLEDEMO: null,
    GET_TEAM_MEMBER_DETAIL: null,

    // -------------
    // OTHER
    // -------------
    ERROR_SHOW_MESSAGE: null,

    // -------------
    // Demo
    // -------------
    GET_DEMO_LIST: null,
    SET_DEMO_STATE: null,
    ADD_DEMO: null,
    DEL_DEMO: null,
    UPD_DEMO: null,
    SET_UPD_DEMO_INFO: null,
    SHOW_UPD_DEMO_VISIBLE: null,
    CLOSE_UPD_DEMO_VISIBLE: null,
})
