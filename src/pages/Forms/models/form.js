import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm, fakeSubmitFormsever } from '@/services/api';

export const parseAmount = amount => {
  return `￥${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const fakeAccount = [
  {
    value: '建设银行',
    label: '建设银行',
    children: [
      {
        value: '5212261614003383141',
        label: '5212261614003383141',
      },
    ],
  },
  {
    value: '农业银行',
    label: '农业银行',
    children: [
      {
        value: '6212261614003383140',
        label: '6212261614003383140',
      },
    ],
  },
  {
    value: '中国银行',
    label: '中国银行',
    children: [
      {
        value: '6212261614003383141',
        label: '6212261614003383141',
      },
    ],
  },
  {
    value: '招商银行',
    label: '招商银行',
    children: [
      {
        value: '6212261614003383145',
        label: '6212261614003383145',
      },
    ],
  },
  {
    value: '工商银行',
    label: '工商银行',
    children: [
      {
        value: '6212261614003383143',
        label: '6212261614003383143',
      },
    ],
  },
];

export default {
  namespace: 'form',

  state: {
    step: {
      payAccount: ['', ''],
      receiverAccount: ['', ''],
      time: '',
      amount: '',
    },
  },

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(fakeSubmitFormsever, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
