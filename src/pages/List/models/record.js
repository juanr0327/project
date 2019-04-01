import { getRecordHistory,addRecordHistory ,removeRecordHistory,updateRecordHistory} from '@/services/api';
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

const tableListDataSource = [];

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
    *fetchRecordHistory(_, { call, put }) {
      /**
       * yeild call, 第一个参数为调用的函数，第二个参数为该函数的参数(如果有多个参数，则 call(func, arg1, arg2...) )
       * response为后端的返回
       *  */
      const data = yield call(getRecordHistory);
      yield put({
        type: 'saveHistoryRecord', // 这个名字和下面的reducers是一一对应的，你就看成拿到数据后会调用下面的函数
        payload: data, // data就是你的数据，下面👇通过action.payload拿到
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
  },

  // 用来把数据合并到最上面的state里面
  reducers: {
    saveHistoryRecord(state, action) {
      const pageSize = 10;

      const result = {
        list: action.payload,
        pagination: {
          total: action.payload.length,
          pageSize,
          current: 1,
        },
      };
      return {
        ...state,
        result,
      };
    },
  },
};

function getRule(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  // Mock 转入账户
  if (params.accountTo) {
    dataSource = dataSource.filter(data => data.accountTo === params.accountTo);
  }

  // Mock 转出账户
  if (params.accountOut) {
    dataSource = dataSource.filter(data => data.accountOut === params.accountOut);
  }

  // Mock 转入银行
  if (params.bankTo) {
    const bankTo = params.bankTo.split(',');
    let filterDataSource = [];
    bankTo.forEach(bt => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => data.bankTo === Number(bt))
      );
    });
    dataSource = filterDataSource;
  }

  // Mock 转出银行
  if (params.bankOut) {
    const bankOut = params.bankOut.split(',');
    let filterDataSource = [];
    bankOut.forEach(pa => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => data.bankOut === Number(pa))
      );
    });
    dataSource = filterDataSource;
  }
  // Mock 转账状态
  if (params.progress) {
    const progress = params.progress.split(',');
    let filterDataSource = [];
    progress.forEach(bo => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => data.progress === Number(bo))
      );
    });
    dataSource = filterDataSource;
  }
  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}