import { stringify } from 'qs';
import request from '@/utils/request';
import { getUserID } from "@/utils/authority";

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

// 查看个人信息
export async function gerenxinxi() {
  return request('/server/api/view_gerenxinxi');
}

// 查看操作员列表
export async function getoperator(params) {
  return request(`/server/api/view_op?${stringify(params)}`);
}
// 查看操作员任务
export async function getoperatorjob(params) {
  return request(`/server/api/view_op_job?${stringify(params)}`);
}
// 历史转账记录
export async function getRecordHistory(params) {
  return request(`/server/api/recordHistory?${stringify(params)}`);
}
export async function removeRecordHistory() {
  return request('/server/api/recordHistory');
}
export async function updateRecordHistory() {
  return request('/server/api/recordHistory');
}

// 银行卡列表
export async function getCard() {
  return request('/server/api/Cardlist');
}
// createoperator
export async function addop(params) {
  return request(`/server/api/createoperator`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
// add worklog
export async function addWorklog(params) {
  return request(`/server/api/createWorklog`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
// add card
export async function addcard(params) {
  return request(`/server/api/createcard`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

// add cardto
export async function addcardto(params) {
  return request(`/server/api/createcardto`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

// add card
export async function updatecard(params) {
  return request(`/server/api/updatecard`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

// add cardto
export async function updatecardto(params) {
  return request(`/server/api/updatecardto`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

// delete card
export async function deletecard(params) {
  return request(`/server/api/deletetecard`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

// delete cardto
export async function deletecardto(params) {
  return request(`/server/api/deletecardto`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/server/api/recordHistory?${stringify(params)}`);
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

export async function submitOrder(params) {
  return request(`/server/api/createorder`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeSubmitFormsever(params) {
  return request('/server/api/forms', {
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
  return request(`/server/api/recordCard`);
}
export async function rizhi(params) {
  return request(`/server/api/recordrizhi`);
}
export async function queryList2(params) {
  return request(`/server/api/recordCardto`);
}
export async function removeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/server/api/cardlist?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/server/api/cardlist?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/server/api/cardlist?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}


export async function AccountLogin(params) {
  const uID = getUserID()
  return request(`/server/api/login`, {
    method: 'POST',
    body: {
      ...params,uID,
      method: 'post',
    },
  });
}

export async function Register() {
  return request('/server/api/register', {
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
