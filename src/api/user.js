import api, {
    Lois
} from './index.js'
import Promise from '../util/promise'

export async function user_login(params) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 0,
                message: '成功'
            });
        }, 500);
    });
    // return api.post('login', {
    //     data: params
    // })
}
export async function get_all_regions(params) {
    params.type = 'czy';
    return Lois({
        method: 'GET',
        serverName: 'resource/regions',
        data: params
    })
}
export async function get_all_privilege(params) {
    return Lois({
        method: 'POST',
        serverName: 'YDSL/backend/role/listmPrivilegeAndRoleHas',
        data: params
    })
}
export async function get_privilege_regions(params) {
    return Lois({
        method: 'POST',
        serverName: 'YDSL/backend/role/listAllPrjPrivAndRoleHas',
        data: params
    })
}
