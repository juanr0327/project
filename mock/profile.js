import mockjs from 'mockjs';



const basicProgress = [
  {
    key: '1',
    time: '2019-03-01 14:10',
    rate: '创建任务',
    status: 'success',
    operator: '用户',
    cost: '1mins',
  },
  {
    key: '2',
    time: '2019-03-01 18:00',
    rate: '开始转账',
    status: 'success',
    operator: '系统',
    cost: '1h',
  },
  {
    key: '3',
    time: '2019-03-01 18:02',
    rate: '网银页面登录',
    status: 'success',
    operator: '系统',
    cost: '5mins',
  },
  {
    key: '4',
    time: '2019-03-01 18:05',
    rate: '填写转账信息',
    status: 'success',
    operator: '系统',
    cost: '1h',
  },
  {
    key: '5',
    time: '2019-03-01 18:07',
    rate: '验证码验证',
    status: 'success',
    operator: '系统',
    cost: '5mins',
  },
  {
    key: '6',
    time: '2019-03-01 18:08',
    rate: '转账成功',
    status: 'success',
    operator: '系统',
    cost: '5mins',
  },
  {
    key: '7',
    time: '2019-03-02 12:00',
    rate: '客户经理审核',
    status: 'success',
    operator: '用户',
    cost: '5mins',
  },
];

const advancedOperation1 = [
  {
    key: 'op1',
    type: '转账完成',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: '财务复审',
    name: '付小小',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: '不通过原因',
  },
  {
    key: 'op3',
    type: '部门初审',
    name: '李彬',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: '提交任务',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '很棒',
  },
  {
    key: 'op5',
    type: '创建任务',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];
const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2,
  advancedOperation3,
};

const { Random } = mockjs;

export default {
  'GET /api/profile/advanced': getProfileAdvancedData,
  'GET /api/profile/basic': (req, res) => {
    const { id } = req.query;
    const application = {
      id:'工商银行',
      status: '6212261614003383145',
      orderNo: '2019-03-01 18:00',
      childOrderNo: '500',
    };
    const userInfo = {
      name: '中国银行',
      tel: '5212261614003383145',
      delivery: '小红',
      addr: '已完成',
      remark: '备注',
    };
    res.json({
      userInfo,
      application,
    
      basicProgress,
    });
  },
};
