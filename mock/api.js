import mockjs from 'mockjs';


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
export const photos = [
   'https://img.52z.com/upload/news/image/20180213/20180213062640_77463.jpg', 
   'https://img.52z.com/upload/news/image/20180213/20180213062640_13061.jpg',
   'https://img.52z.com/upload/news/image/20180213/20180213062635_29121.jpg',
   'https://img.52z.com/upload/news/image/20180213/20180213062638_50905.jpg',
   'https://img.52z.com/upload/news/image/20180213/20180213062639_27250.jpg',
   'https://img.52z.com/upload/news/image/20180213/20180213062641_19995.jpg',
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

const avatars2 = [
  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];
const tel=[
  '电话：17856564125 ',
  '电话：12586541235',
  '电话：17865884125',
  '电话：14522553335',
];
const emails=[
  '邮箱：85365235@163.com',
  '邮箱：uibikb2@163.com',
  '邮箱：iubjonu@163.com',
  '邮箱：joiniunbik@163.com',
]
const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      photo: photos[i % 5],
      owner: user[i % 10],
      title: titles[i % 8],
      ID:`操作员${i}号`,
      ordernum:Math.ceil(Math.random() * 50) + 10,
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      tel:tel[i%3],
      email:emails[i%3],
      card_id:'123456',
      op_name:'wangxiaoming',
      description:
        '卡号：*********;管理员：***',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '银行卡管理',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
          id: 'member1',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
          id: 'member2',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
          id: 'member3',
        },
      ],
    });
  }

  return list;
}

let sourceData;

function getFakeList(req, res) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);
  sourceData = result;
  return res.json(result);
}

function postFakeList(req, res) {
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
        id: `fake-list-${result.length}`,
        createdAt: new Date().getTime(),
      });
      break;
    default:
      break;
  }

  return res.json(result);
}

const getNotice = [
  {
    id: 'xxx1',
    title: titles[0],
    logo: avatars[0],
    description: '6212261614003383145',
    updatedAt: new Date(),
    member: '已完成',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: titles[1],
    logo: avatars[1],
    description: '6212261614003383145',
    updatedAt: new Date('2019-04-15'),
    member: '已完成',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: titles[2],
    logo: avatars[2],
    description: '6212261614003383145',
    updatedAt: new Date('2019-04-15'),
    member: '已完成',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: titles[3],
    logo: avatars[3],
    description: '描述',
    updatedAt: new Date('2019-04-15'),
    member: '5212261614003383142',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: titles[4],
    logo: avatars[4],
    description: '描述',
    updatedAt: new Date('2019-04-15'),
    member: '4212261614003383145',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: titles[5],
    logo: avatars[5],
    description: '描述',
    updatedAt: new Date('2019-04-15'),
    member: '5212261614003383145',
    href: '',
    memberLink: '',
  },
];

const getActivities = [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: '曲丽丽',
      avatar: avatars2[0],
    },
   
    project: {
      name: '工作日志',
      link: 'http://localhost:8000/account/center/articles',
    },
    template: '新建 @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: '曲丽丽',
      avatar: avatars2[1],
    },
  
    project: {
      name: '转账任务',
      link: 'http://localhost:8000/list/table-list',
    },
    template: ' 新建 @{project}',
  },



];

function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
}

export default {
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'POST /api/fake_list': postFakeList,
  'GET /api/captcha': getFakeCaptcha,
};
