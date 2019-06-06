import { queryActivities,rizhi2 } from '@/services/api';

export default {
  namespace: 'activities',

  state: {
    list: [],
  },

  effects: {
    *fetchList(_, { call, put }) {
      const response = yield call(queryActivities);
      yield put({
        type: 'saveList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchrizhi({ payload }, { call, put }) {
      const data = yield call(rizhi2, payload);
      console.log(data)
      yield put({
        type: 'saveList',
        payload: Array.isArray(data) ? data : [],
      });
    },
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
