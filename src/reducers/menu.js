// import _ from 'lodash';
import { message } from 'antd';
import { createReducer } from '../util';
import types from '../store/types';

const InitState = {
    current: 0,
    navpath: [],
    collapse: false,
    selectClass: '',
    menuList: [
        {
            key: 'tdemo',
            authKey: 'Project_get_list',
            name: '表格+弹窗',
            icon: 'calendar',
            child: []
        },
        {
            key: 'test',
            authKey: 'AccountMessage',
            name: '测试二级菜单',
            icon: 'user',
            child: [
                {
                    name: '统计图',
                    authKey: 'Account_get_list',
                    key: 'home'
                }, {
                    name: '快速操作',
                    authKey: 'Account_get_list',
                    key: 'demo'
                }, {
                    name: '加载效果',
                    authKey: 'Role_get_list',
                    key: 'loding'
                },
            ]
        }
    ]
}

export default createReducer(InitState, {

    [`${types.UPDATE_NAVPATH}`]: (state, data) => {
        let navpath = [],
            tmpOb, tmpKey, child;
        if (data.data) {
            data.data.reverse().map((item) => {
                if (item.indexOf('sub') != -1) {
                    tmpKey = item.replace('sub', '');
                    tmpOb = _.find(state.menuList, function(o) {
                        return o.key == tmpKey;
                    });
                    child = tmpOb.child;
                    navpath.push({
                            key: tmpOb.key,
                            name: tmpOb.name
                        })
                }
                if (item.indexOf('child') != -1) {
                    tmpKey = item.replace('child', '');
                    if (child) {
                        tmpOb = _.find(child, function(o) {
                            return o.key == tmpKey;
                        });
                    }
                    navpath.push({
                        key: tmpOb.key,
                        name: tmpOb.name
                    })
                }
            })
        }

        return Object.assign({}, state, {
            current: data.key + '',
            navpath: navpath,
        })
    },

    [`${types.UPDATE_COLLAPSE}`]: (state, data) => {

        return Object.assign({}, state, {
            collapse: !data.collapse
        })
    },
    [`${types.SET_TOP_MENU}`]: (state, data, params) => {
        let topMenu = projectTopMenu;
        let selectedTopMenu = 'project/my_case'
        if (params.key == 'work_report') {
            topMenu = workReportTopMenu;
            selectedTopMenu = 'work_report/daily'
        }
        if (params.key == 'team') {
            topMenu = [];
            selectedTopMenu = 'team'
        }
        return Object.assign({}, state, {
            topMenu: topMenu,
            selectedleftMenu: params.key,
            selectedTopMenu: selectedTopMenu,
        })
    },

    [`${types.SET_STATE}`]: (state, data, params) => {
        return Object.assign({}, state, {...params.state
        })
    },

})

// ------------------------
// Uilt
// ------------------------
