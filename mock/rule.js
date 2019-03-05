import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    accountTo: `to ${i}`,
    accountOut: `out ${i}`,
    bankTo: Math.floor(Math.random() * 10) % 4,
    bankOut: Math.floor(Math.random() * 10) % 4,
    operator: '曲丽丽',
    count: Math.floor(Math.random() * 100000),
    time: new Date(`2019-03-${Math.floor(i / 2) + 1}`),
    progress:
      i % 6 === 0
        ? {
            percent: 100,
            process: 0,
          }
        : {
            percent: Math.ceil(Math.random() * 100),
            process: (Math.floor(Math.random() * 10) % 3) + 1,
          },
  });
}

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
    bankOut.forEach(bo => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => data.bankOut === Number(bo))
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

function postRule(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        desc,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { desc, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  return getRule(req, res, u);
}

export default {
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
};
