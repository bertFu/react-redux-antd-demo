import Api from './api';
import {getCookie} from '../util';

const api = new Api({
  baseURI: '/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export default api

export function Lois(data) {
    data.data.backend_token = decodeURIComponent(getCookie('backend_token'));
    return api.post('inter/shoulou', {data: data})
}
