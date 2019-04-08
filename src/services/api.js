import { stringify } from 'qs';
import request from '@/utils/request';

// export const createorder = () => axios.get('/api/createorder')

// mock get request
export async function getMockList() {
  return request('/server/api/info/counselingFilters');
}

// mock post request, 第一个参数query表示查询参数，第二个表示请求body里的数据
export async function getMockListUsingPost(query, data) {
  return request(`/server/api/query/counselorList?${stringify(query)}`, {
    method: 'POST',
    body: {
      ...data,
    },
  });
}

// 历史转账记录
export async function getRecordHistory(params) {
  return request(`/server/api/recordHistory?${stringify(params)}`);
}

// 银行卡列表
export async function getCard() {
  return request('/server/api/Cardlist');
}
// add
export async function addRecordHistory() {
  return request('/server/api/recordHistory');
}
// add
export async function addCard() {
  return request('/server/api/Cardlist');
}
export async function removeRecordHistory() {
  return request('/server/api/recordHistory');
}

export async function updateRecordHistory() {
  return request('/server/api/recordHistory');
}

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`server/api/recordHistory?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('server/api/createorder', {
    method: 'POST',
    body: params,
  });
}
export async function fakeSubmitFormsever(params) {
  return request('server/api/forms', {
    method: 'POST',
    body: params,
  });
}
export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryList(params) {
  return request(`http://localhost:3000/api/recordCard`);
} 

export async function removeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`server/api/cardlist?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addList(params) {
  const { count = 5, ...restParams } = params;
  return request(`server/api/cardlist?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateList(params) {
  const { count = 5, ...restParams } = params;
  return request(`server/api/cardlist?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
