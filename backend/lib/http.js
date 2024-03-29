import axios from 'axios';

const domain =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

const http = (url, { method = 'get', data = undefined }) => {
  return axios({
    method,
    url: `${domain}${url}`,
    data,
  });
};

const get = (url, opts = {}) => http(url, { ...opts });
const post = (url, opts = {}) => http(url, { method: 'POST', ...opts });
const put = (url, opts = {}) => http(url, { method: 'PUT', ...opts });
const deleteData = (url, opts = {}) => http(url, { method: 'DELETE', ...opts });

const methods = {
  get,
  post,
  put,
  delete: deleteData,
};

export default methods;
