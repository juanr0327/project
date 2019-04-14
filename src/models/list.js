import { queryList, removeList, addList, updateList, queryFakeList } from '@/services/api';



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
    *fetch({ payload }, { call, put }) {
      const data = yield call(queryList, payload);
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
