import api, {
    Lois
} from './index.js'
import Promise from '../util/promise'

// ------------------
// 登录
// ------------------
export async function user_login(params) {
    return api.post('login', {
        data: params
    })
}

export async function get_tableDemo_list(params) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 0,
                message: '成功',
                content: {
                    "count": 7,
                    "list": [
                        {
                            id: 1,
                            number: '123',
                            org: "团队4",
                            type: "类型4",
                            member: "员工4",
                            teamName: "团队4",
                            status: "disable"
                        },
                        {
                            id: 2,
                            number: '222',
                            org: "团队5",
                            type: "类型5",
                            member: "员工5",
                            teamName: "团队5",
                            status: "enable"
                        },
                        {
                            id: 3,
                            number: '444',
                            org: "团队6",
                            type: "类型6",
                            member: "员工6",
                            teamName: "团队6",
                            status: "disable"
                        }
                    ]
                }
            });
        }, 500);
    });
    // return Lois({
    //     //  method: 'POST',
    //     //  serverName: 'account/search',
    //     method: 'GET',
    //     serverName: 'demo/test',
    //     data: params
    // })
}

export async function add_tableDemo(params) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 0,
                message: '成功'
            });
        }, 500);
    });
    // return Lois({
    //     //  method: 'POST',
    //     //  serverName: 'account/search',
    //     method: 'GET',
    //     serverName: 'demo/test',
    //     data: params
    // })
}

export async function upd_tableDemo(params) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 0,
                message: '成功'
            });
        }, 500);
    });
    // return Lois({
    //     //  method: 'POST',
    //     //  serverName: 'account/search',
    //     method: 'GET',
    //     serverName: 'demo/test',
    //     data: params
    // })
}

export async function del_tableDemo(params) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 0,
                message: '成功'
            });
        }, 500);
    });
    // return Lois({
    //     //  method: 'POST',
    //     //  serverName: 'account/search',
    //     method: 'GET',
    //     serverName: 'demo/test',
    //     data: params
    // })
}

export async function disable_tableDemo(params) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 0,
                message: '成功'
            });
        }, 500);
    });
    // return Lois({
    //     //  method: 'POST',
    //     //  serverName: 'account/search',
    //     method: 'GET',
    //     serverName: 'demo/test',
    //     data: params
    // })
}
export async function enable_tableDemo(params) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 0,
                message: '成功'
            });
        }, 500);
    });
    // return Lois({
    //     //  method: 'POST',
    //     //  serverName: 'account/search',
    //     method: 'GET',
    //     serverName: 'demo/test',
    //     data: params
    // })
}
