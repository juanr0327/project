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
// workplace(user)
export async function fetchuser(params) {
  return request(`/server/api/feachuser?${stringify(params)}`);
}
// workplace(admin)
export async function fetchuser2() {
  return request('/server/api/feachuser2');
}
// 查看个人信息(user)
export async function gerenxinxi(params) {
  return request(`/server/api/view_gerenxinxi?${stringify(params)}`);
}
// 查看个人信息(admin)
export async function gerenxinxi2() {
  return request(`/server/api/view_gerenxinxi2`);
}
// 查看操作员列表
export async function getoperator(params) {
  return request(`/server/api/view_op?${stringify(params)}`);
}
// 查看操作员列表
export async function getequipment(params) {
  return request(`/server/api/view_equipment?${stringify(params)}`);
}
// 查看操作员任务
export async function getoperatorjob(params) {
  return request(`/server/api/view_op_job?${stringify(params)}`);
}
// 历史转账记录(user)
export async function getRecordHistory(params) {
  return request(`/server/api/recordHistory?${stringify(params)}`);
}
// 历史转账记录(admin)
export async function getRecordHistor2(params) {
  return request(`/server/api/recordHistory2?${stringify(params)}`);
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
// addequipment
export async function addequipment(params) {
  return request(`/server/api/addequipment`, {
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
  return request(`/server/api/deletecard?${stringify(params)}`, {
    method: 'POST',
    body: {
      method: 'post',
    },
  });
}

// delete cardto
export async function deletecardto(params) {
  return request(`/server/api/deletecardto${stringify(params)}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
// 
export async function queryProjectNotice(params) {
  return request(`/server/api/fetchNotice?${stringify(params)}`);
}
export async function queryProjectNotice2() {
  return request(`/server/api/fetchNotice2`);
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
export async function fakeChartData1(params) {
  return request(`/server/api/fake_chart_data?${stringify(params)}`);
}
export async function fakeChartData2(params) {
  return request(`/server/api/fake_chart_data2?${stringify(params)}`);
}
export async function ChartData() {
  return request('/server/api/chart_data');
}
export async function ChartData2() {
  return request('/server/api/chart_data2');
}
export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/server/api/basic?id=${id}`);
}

export async function AdvancedProfile() {
  return request('/api/profile/advanced');
}


//查看银行卡列表（admin）
export async function queryList(params) {
  return request(`/server/api/recordCard`);
}
export async function queryList2(params) {
  return request(`/server/api/recordCardto`);
}

//查看银行卡列表（user）
export async function userqueryList(params) {
  return request(`/server/api/recordCard2?${stringify(params)}`);
}
export async function userqueryList2(params) {
  return request(`/server/api/recordCardto2?${stringify(params)}`);
}

export async function queryAdvancedProfile(id) {
  return request(`/server/api/advanced?id=${id}`);
}

export async function rizhi(params) {
  return request(`/server/api/recordrizhi?${stringify(params)}`);
}
export async function rizhi2() {
  return request(`/server/api/recordrizhi2`);
}
export async function checkrizhi(params) {
  return request(`/server/api/checkrizhi?${stringify(params)}`);
}
export async function check(params) {
  return request(`/server/api/check?${stringify(params)}`);
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
  return request(`/server/api/login`, {
    method: 'POST',
    body: {
      ...params,
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

// 修改个人资料(user)
export async function updategerenxinxi(params) {
  return request(`/server/api/updategerenxinxi`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
// 修改个人资料(admin)
export async function updategerenxinxi2(params) {
  return request(`/server/api/updategerenxinxi2`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
// 修改密码(user)
export async function updatepassword(params) {
  return request(`/server/api/updatepassword`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
// 修改密码(admin)
export async function updatepassword2(params) {
  return request(`/server/api/updatepassword2`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}