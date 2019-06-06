import {queryProjectNotice2, queryProjectNotice,userqueryList } from '@/services/api';

export const bankMap = {
  jsyh: '建设银行',
  zsyh: '招商银行',
  gsyh: '工商银行',
  zgyh: '中国银行',
  nyyh: '农业银行',
};

export const statusMap = {
  completed: '已完成',
  ongoing: '进行中',
  notstart: '未进行',
  error: '异常',
};
export default {
  namespace: 'project',

  state: {
    notice: [],
  },

  effects: {
  //   *fetchNotice(_, { call, put }) {
  //     const response = yield call(queryProjectNotice);
  //     yield put({
  //       type: 'saveNotice',
  //       payload: Array.isArray(response) ? response : [],
  //     });
  //   },
  // 
  *fetchNotice({ payload }, {call, put }) {
    const response = yield call(queryProjectNotice,payload);
    yield put({
      type: 'saveNotice', // 这个名字和下面的reducers是一一对应的，你就看成拿到数据后会调用下面的函数
      payload: response, // data就是你的数据，下面👇通过action.payload拿到
    });
  },
  *fetchNotice2({ payload }, {call, put }) {
    const response = yield call(queryProjectNotice2,payload);
    yield put({
      type: 'saveNotice', // 这个名字和下面的reducers是一一对应的，你就看成拿到数据后会调用下面的函数
      payload: response, // data就是你的数据，下面👇通过action.payload拿到
    });
  },
  *fetchcard({ payload }, { call, put }) {
    const data = yield call(userqueryList, payload);
    yield put({
      type: 'saveNotice',
      payload: Array.isArray(data) ? data : [],
    });
  },
},
  reducers: {
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
  },
};
