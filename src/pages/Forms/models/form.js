import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { submitOrder, fakeSubmitForm } from '@/services/api';

export const parseAmount = amount => {
  return `￥${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const fakeAccount = [
  {
    value: 'jsyh',
    label: '建设银行',
    children: [
      {
        value: '5212261614003383141',
        label: '5212261614003383141',
      },
    ],
  },
  {
    value: 'nyyh',
    label: '农业银行',
    children: [
      {
        value: '6212261614003383140',
        label: '6212261614003383140',
      },
    ],
  },
  {
    value: 'zgyh',
    label: '中国银行',
    children: [
      {
        value: '6212261614003383141',
        label: '6212261614003383141',
      },
    ],
  },
  {
    value: 'zsyh',
    label: '招商银行',
    children: [
      {
        value: '6212261614003383145',
        label: '6212261614003383145',
      },
    ],
  },
  {
    value: 'gsyh',
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
    *submitorder({ payload }, { call, put }) {
      /**
       * yeild call, 第一个参数为调用的函数，第二个参数为该函数的参数(如果有多个参数，则 call(func, arg1, arg2...) )
       * response为后端的返回
       *  */
      const data = yield call(submitOrder, payload);

      yield put({
        type: 'saveorder', // 这个名字和下面的reducers是一一对应的，你就看成拿到数据后会调用下面的函数
        payload: data, // data就是你的数据，下面👇通过action.payload拿到
      });
    },
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStepForm({ payload }, { call, put }) {
      // yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
  },

  reducers: {
    saveorder(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveStepFormData(state, { payload }) {
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
