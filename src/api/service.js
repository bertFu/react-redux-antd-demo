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
export async function get_all_regions(params) {
    params.type = 'czy';
    return Lois({
        method: 'GET',
        serverName: 'resource/regions',
        data: params
    })
}

// ------------------
// Demo
// ------------------
export async function get_demo_list(params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
            code: "0",
            message: '成功',
            content: [
              {
                  desc:"123",
                  endDate:"2016-11-22T16:27:40.698Z",
                  id:1,
                  rg:"b",
                  select:"yiminghe",
                  startDate:"2016-11-29T16:27:38.936Z",
                  time:"2016-11-11T16:29:43.306Z",
                  title:"测试"
              },
              {
                  desc:"aad123",
                  endDate:"2016-11-22T16:27:40.698Z",
                  id:2,
                  rg:"b",
                  select:"yiminghe",
                  startDate:"2016-11-29T16:27:38.936Z",
                  time:"2016-11-11T16:29:43.306Z",
                  title:"测试阿萨斯的"
              },
              {
                  desc:"a123",
                  endDate:"2016-11-22T16:27:40.698Z",
                  id:3,
                  rg:"b",
                  select:"yiminghe",
                  startDate:"2016-08-29T16:27:38.936Z",
                  time:"2016-1-11T16:29:43.306Z",
                  title:"测试的"
              }
            ]
        });
      }, 1000);
    });
    // return Lois({
    //     //  method: 'POST',
    //     //  serverName: 'account/search',
    //     method: 'GET',
    //     serverName: 'demo/test',
    //     data: params
    // })
}
export async function add_demo(params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
            code: "0",
            message: '成功',
            content: []
        });
      }, 1000);
    });
    // return Lois({
    //     method: 'POST',
    //     serverName: 'demo',
    //     data: params
    // })
}
export async function del_demo(params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
            code: "0",
            message: '成功',
            content: []
        });
      }, 1000);
    });
    // return Lois({
    //     method: 'DELETE',
    //     serverName: 'demo',
    //     data: params
    // })
}
export async function upd_demo(params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
            code: "0",
            message: '成功',
            content: []
        });
      }, 1000);
    });
    // return Lois({
    //     method: 'PUT',
    //     serverName: 'demo',
    //     data: params
    // })
}
