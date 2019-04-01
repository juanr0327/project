import { getMockList, getMockListUsingPost } from '@/services/api';

export default {
  namespace: 'mock',

  // state初始化
  state: {
    dataByGet: null,
    dataByPost: null,
  },

  effects: {
    // 无需payload的话，用_省略该参数
    *fetchMockList(_, { call, put }) {
      /**
       * yeild call, 第一个参数为调用的函数，第二个参数为该函数的参数
       * (如果有多个参数，则 call(func, arg1, arg2...) )
       * response为后端的返回
       *  */
      const response = yield call(getMockList);
      yield put({
        type: 'saveMockDataByGet',
        payload: response,
      });
    },
    *fetchMockListUsingPost({ payload }, { call, put }) {
      const response = yield call(getMockListUsingPost, payload.query, payload.data);
      yield put({
        type: 'saveMockDataByPost',
        payload: response,
      });
    },
  },

  reducers: {
    saveMockDataByGet(state, action) {
      return {
        ...state,
        dataByGet: action.payload,
      };
    },
    saveMockDataByPost(state, action) {
      return {
        ...state,
        dataByPost: action.payload,
      };
    },
  },
};
