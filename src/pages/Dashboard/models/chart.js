import { ChartData2,ChartData,fakeChartData, fakeChartData1 ,fakeChartData2} from '@/services/api';

export default {
  namespace: 'chart',

  state: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchData(_, { call, put }) {
      const response = yield call(ChartData);
      yield put({
        type: 'saveOwn',
        payload: response
      });
    },
    *fetchData2(_, { call, put }) {
      const response = yield call(ChartData2);
      yield put({
        type: 'saveOwn',
        payload: response
      });
    },
    *fetchSalesData( _, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
    *fetchSalesData1( {payload}, { call, put }) {
      const { range } = payload
      const startDate = range[0].format("YYYY-MM-DD HH:mm:ss")
      const endDate = range[1].format("YYYY-MM-DD HH:mm:ss")
      const params = {
        startDate, endDate
      }
      const response = yield call(fakeChartData1, params);
      console.log(response)
      yield put({
        type: 'save',
        payload: {
          salesData: response,
        },
      });
    },
    *fetchSalesData12( {payload}, { call, put }) {
      const { range } = payload
      const startDate = range[0].format("YYYY-MM-DD HH:mm:ss")
      const endDate = range[1].format("YYYY-MM-DD HH:mm:ss")
      const params = {
        startDate, endDate
      }
      const response = yield call(fakeChartData2, params);
      console.log(response)
      yield put({
        type: 'save',
        payload: {
          salesData: response,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveOwn(state, { payload }) {
      return {
        ...state,
        visitData: payload.visitData,
        visitData2: payload.visitData2,
        salesData: payload.salesData,
        searchData: payload.searchData,
        offlineData: payload.offlineData,
        // offlineChartData: payload.offlineChartData,
        salesTypeData: payload.salesTypeData,
        salesTypeDataOnline: payload.salesTypeDataOnline,
        salesTypeDataOffline: payload.salesTypeDataOffline,
        radarData: payload.radarData,
      };
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};
