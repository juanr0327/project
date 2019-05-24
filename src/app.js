import fetch from 'dva/fetch';
import { createLogger } from 'redux-logger'

// log my own action only
const reg = /(global\/*)|(setting\/*)|(menu\/*)|(@@DVA_LOADING\/*)/
const logger = createLogger({
  predicate: (getState, action) => !reg.test(action.type)
})

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
    },
    onAction: logger
  },
};

let authRoutes = {};

function ergodicRoutes(routes, authKey, authority) {
  routes.forEach(element => {
    if (element.path === authKey) {
      if (!element.authority) element.authority = []; // eslint-disable-line
      Object.assign(element.authority, authority || []);
    } else if (element.routes) {
      ergodicRoutes(element.routes, authKey, authority);
    }
    return element;
  });
}

export function patchRoutes(routes) {
  Object.keys(authRoutes).map(authKey =>
    ergodicRoutes(routes, authKey, authRoutes[authKey].authority)
  );
  window.g_routes = routes;
}

export function render(oldRender) {
  fetch('/api/auth_routes')
    .then(res => res.json())
    .then(
      ret => {
        authRoutes = ret;
        oldRender();
      },
      () => {
        oldRender();
      }
    );
}
