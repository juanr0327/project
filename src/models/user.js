import { query as queryUsers, queryCurrent } from '@/services/user';
import {fetchuser2,fetchuser,updatepassword,updategerenxinxi,gerenxinxi,updatepassword2,updategerenxinxi2,gerenxinxi2} from '@/services/api';


export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *gerenxinxi({ payload }, { call, put }) {
      const data = yield call(gerenxinxi, payload);
      yield put({
        type: 'save',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *fetchuser({ payload }, { call, put }) {
      const data = yield call(fetchuser, payload);
      yield put({
        type: 'save',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *fetchuser2({ payload }, { call, put }) {
      const data = yield call(fetchuser2, payload);
      yield put({
        type: 'save',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *updategerenxinxi({ payload }, { call, put }) {
      const response = yield call(updategerenxinxi,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *updatepassword({ payload }, { call, put }) {
      const response = yield call(updatepassword,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *gerenxinxi2({ payload }, { call, put }) {
      const data = yield call(gerenxinxi2, payload);
      yield put({
        type: 'save',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *updategerenxinxi2({ payload }, { call, put }) {
      const response = yield call(updategerenxinxi2,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *updatepassword2({ payload }, { call, put }) {
      const response = yield call(updatepassword2,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
