import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { AccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { isArray } from 'util';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    //authority:undefined,
    //tel:undefined,
   
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);
      const loginSuccess = isArray(response)
     
      const resp = { status: loginSuccess ? 'ok' : 'error', response: loginSuccess ? response[0] : null, type: 'account', currentAuthority: loginSuccess ? response[0].authority : "guest",  }
      yield put({
        type: 'changeLoginStatus',
        payload: resp
      });
      // Login successfully
      if (loginSuccess) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }

        yield put(routerRedux.replace(redirect || '/'));        
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
          response: {
            tel: ''
          }
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const { response, status, type } = payload
      const { currentAuthority } = payload
      const { tel } = response
      setAuthority(currentAuthority, tel);
      return {
        ...state,
        status,
        type,
        user: response
      };
    },
  },
};
