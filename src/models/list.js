import { queryList, removeList, addList, updateList } from '@/services/api';

const titles = [
  '招商银行',
  '中国银行',
  '中国农业银行',
  '中国工商银行',
  '中国建设银行',
  '招商银行',
  '中国银行',
  '中国农业银行',
];
const avatars = [
  'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E6%8B%9B%E5%95%86%E9%93%B6%E8%A1%8C.jpg', // 招商
  'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E4%B8%AD%E5%9B%BD%E9%93%B6%E8%A1%8C.jpg', // 中国
  'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E4%B8%AD%E5%9B%BD%E5%86%9C%E4%B8%9A%E9%93%B6%E8%A1%8C.jpg', // 农业
  'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E4%B8%AD%E5%9B%BD%E5%B7%A5%E5%95%86%E9%93%B6%E8%A1%8C.jpg', // 工商
  'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E4%B8%AD%E5%9B%BD%E5%BB%BA%E8%AE%BE%E9%93%B6%E8%A1%8C.jpg', // 建设
  'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E6%8B%9B%E5%95%86%E9%93%B6%E8%A1%8C.jpg', // 招商
  'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E4%B8%AD%E5%9B%BD%E9%93%B6%E8%A1%8C.jpg', // 中国
  'https://raw.githubusercontent.com/cellier/bank-icon-cn/master/JPG/%E4%B8%AD%E5%9B%BD%E5%86%9C%E4%B8%9A%E9%93%B6%E8%A1%8C.jpg', // 农业
];
function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `list-${i}`,
      title: titles[i % 8],
      avatar: avatars[i % 8],
      status: ['active', 'exception', 'normal'][i % 3],
      card_id: '123456',
      op_name: 'wangxiaoming',
      description: '卡号：*********;管理员：***',
      content: '银行卡管理',
    });
  }

  return list;
}

let sourceData;

function getList(req, res) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = List(count);
  sourceData = result;
  return res.json(result);
}

function postList(req, res) {
  const { /* url = '', */ body } = req;
  // const params = getUrlParams(url);
  const { method, id } = body;
  // const count = (params.count * 1) || 20;
  let result = sourceData;

  switch (method) {
    case 'delete':
      result = result.filter(item => item.id !== id);
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.id === id) {
          result[i] = Object.assign(item, body);
        }
      });
      break;
    case 'post':
      result.unshift({
        body,
        id: `list-${result.length}`,
        createdAt: new Date().getTime(),
      });
      break;
    default:
      break;
  }

  return res.json(result);
}

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
