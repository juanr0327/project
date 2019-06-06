import {getRecordHistor2, getRecordHistory,addRecordHistory ,removeRecordHistory,updateRecordHistory,addRecordHistory2 ,removeRecordHistory2,updateRecordHistory2} from '@/services/api';
import { parse } from 'url';

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
  namespace: 'record',

  // 转账记录初始值，空数组，api调用拿到数据才有真实数据
  state: {
    result: {
      list: [],
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
      },
    },
  },

  effects: {
    // 无需payload的话，用_省略该参数
    *fetchRecordHistory({ payload }, {call, put }) {
      const response = yield call(getRecordHistory,payload);
      yield put({
        type: 'saveHistoryRecord', // 这个名字和下面的reducers是一一对应的，你就看成拿到数据后会调用下面的函数
        payload: response, // data就是你的数据，下面👇通过action.payload拿到
      });
    },

    *fetchRecordHistory2({ payload}, { call, put }) {
      const response = yield call(getRecordHistor2,payload);
      yield put({
        type: 'saveHistoryRecord', // 这个名字和下面的reducers是一一对应的，你就看成拿到数据后会调用下面的函数
        payload: response, // data就是你的数据，下面👇通过action.payload拿到
      });
    },

    *add({ payload, callback }, { call, put }) {
      const data = yield call(addRecordHistory, payload);
      yield put({
        type: 'saveHistoryRecord',
        payload: data,
      });
      if (callback) callback();
    },

    *remove({ payload, callback }, { call, put }) {
      const data = yield call(removeRecordHistory, payload);
      yield put({
        type: 'saveHistoryRecord',
        payload: data,
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }) {
      const data = yield call(updateRecordHistory, payload);
      yield put({
        type: 'saveHistoryRecord',
        payload: data,
      });
      if (callback) callback();
    },

    *add2({ payload, callback }, { call, put }) {
      const data = yield call(addRecordHistory2, payload);
      yield put({
        type: 'saveHistoryRecord',
        payload: data,
      });
      if (callback) callback();
    },

    *remov2({ payload, callback }, { call, put }) {
      const data = yield call(removeRecordHistory2, payload);
      yield put({
        type: 'saveHistoryRecord',
        payload: data,
      });
      if (callback) callback();
    },

    *update2({ payload, callback }, { call, put }) {
      const data = yield call(updateRecordHistory2, payload);
      yield put({
        type: 'saveHistoryRecord',
        payload: data,
      });
      if (callback) callback();
    },
  },

  // 用来把数据合并到最上面的state里面
  reducers: {
    saveHistoryRecord(state, action) {
      const list = action.payload;
      return {
        ...state,
        list,
      };
    },
  },
};