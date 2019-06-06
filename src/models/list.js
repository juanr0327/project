import {check,deletecardto,checkrizhi,rizhi2,userqueryList2,userqueryList,addequipment,getequipment,deletecard,getoperator,getoperatorjob, addop,rizhi,addWorklog,queryList,queryList2, removeList, addList, updateList, queryFakeList ,addcard,addcardto,updatecard,updatecardto} from '@/services/api';

export const duankouMap = {
  0: '电脑端',
  1: '手机端',

};

export const avatarsMap = {
  zsyh: 'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E6%8B%9B%E5%95%86%E9%93%B6%E8%A1%8C.jpg', // 招商
  zgyh: 'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E4%B8%AD%E5%9B%BD%E9%93%B6%E8%A1%8C.jpg', // 中国
  nyyh: 'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E4%B8%AD%E5%9B%BD%E5%86%9C%E4%B8%9A%E9%93%B6%E8%A1%8C.jpg', // 农业
  gsyh: 'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E4%B8%AD%E5%9B%BD%E5%B7%A5%E5%95%86%E9%93%B6%E8%A1%8C.jpg', // 工商
  jsyh: 'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E4%B8%AD%E5%9B%BD%E5%BB%BA%E8%AE%BE%E9%93%B6%E8%A1%8C.jpg', // 建设
 
};

export default {
  namespace: 'list',

  state: {
    list: [],
  },

  effects: {
     
    *check({ payload }, { call, put }) {
      const data = yield call(check, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *checkrizhi({ payload }, { call, put }) {
      const data = yield call(checkrizhi, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *fetchrizhi({ payload }, { call, put }) {
      const data = yield call(rizhi, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *fetchrizhi2({ payload }, { call, put }) {
      const data = yield call(rizhi2, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *addrizhi({ payload }, { call, put }) {
      const data = yield call(addWorklog, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *fetchop({ payload }, { call, put }) {
      const data = yield call(getoperator, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *fetchequipment({ payload }, { call, put }) {
      const data = yield call(getequipment, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *fetchopjob({ payload }, { call, put }) {
      const data = yield call(getoperatorjob, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *addop({ payload }, { call, put }) {
      const data = yield call(addop, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *addequipment({ payload }, { call, put }) {
      const data = yield call(addequipment, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    //admin
    *fetch({ payload }, { call, put }) {
      const data = yield call(queryList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
     *fetch2({ payload }, { call, put }) {
      const data = yield call(queryList2, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
     //user 
    *userfetch({ payload }, { call, put }) {
      const data = yield call(userqueryList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
     *userfetch2({ payload }, { call, put }) {
      const data = yield call(userqueryList2, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *deletefetch({ payload }, { call, put }) {
      yield call(deletecard, payload);
    },
    *deletefetch2({ payload }, { call, put }) {
      yield call(deletecardto, payload);
    },
    *addfetch({ payload }, { call, put }) {
      const data = yield call(addcard, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *addfetch2({ payload }, { call, put }) {
      const data = yield call(addcardto, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *updatefetch({ payload }, { call, put }) {
      const data = yield call(updatecard, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *updatefetch2({ payload }, { call, put }) {
      const data = yield call(updatecardto, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *fakefetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeList : updateList;
      } else {
        callback = addList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
