import { queryBasicProfile, queryAdvancedProfile } from '@/services/api';

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
export const checkMap = {
  1: '已审核',
  0: '未审核',
 
};
export default {
  namespace: 'profile',

  state: {
    basicGoods: [],
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
    curUser: null
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(queryBasicProfile, payload);
      yield put({
        type: 'fetchBasicReducer',
        payload: response,
      });
    },
    *fetchAdvanced({ payload }, { call, put }) {
      const response = yield call(queryAdvancedProfile, payload);
      yield put({
        type: 'fetchBasicReducer',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    fetchBasicReducer(state, {payload}) {
      return {
        ...state, 
        curUser: payload[0]
      }
    }
  },
};
