import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
  Button,
  Menu,
  message,
  Form,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Modal,
  Tooltip,
  Divider, Spin
} from 'antd';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AdvancedProfile.less';
import { checkMap, bankMap } from './models/profile';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;



const tabList = [
  {
    key: 'detail',
    tab: '详情',
  },

];

const CreateForm = Form.create()(props => {
  const { modalVisible, handleAdd, handleModalVisible, activeidworklog } = props;
  return (
    <Modal
      destroyOnClose
      visible={modalVisible}
      onOk={() => handleAdd(activeidworklog)}
      onCancel={() => handleModalVisible()}
     // title={activeidworklog}

    >
      <div>确认？</div>
    </Modal>
  );
});

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (dot, { status }) =>
  status === 'process' ? (
    <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
      {dot}
    </Popover>
  ) : (
      dot
    );



const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'agree' ? (
        <Badge status="success" text="成功" />
      ) : (
          <Badge status="error" text="驳回" />
        ),
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
class AdvancedProfile extends Component {


  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  };
 // eslint-disable-next-line react/sort-comp
 handleAdd = (idworklog) => {
  const { dispatch } = this.props;
  dispatch({
    type: 'list/check',
    payload: {
      idworklog
    },
  });
  message.success('操作成功');
  this.handleModalVisible();

  setTimeout(() => {
    location.reload()
  }, 300);
};
  state = { modalVisible: false, activeidworklog: '' }

  componentDidMount() {
    const fakeIdorder = '12'
    const { dispatch, location } = this.props;
    const { idorder } = location.state ? location.state : { idorder: fakeIdorder }
    dispatch({
      type: 'profile/fetchAdvanced',
      payload: idorder || fakeIdorder,
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
  }

  handleModalVisible = (flag, idworklog) => {
    this.setState({
      modalVisible: !!flag,
      activeidworklog: idworklog
    });
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    const { stepDirection, } = this.state;
    const { profile = {}, loading } = this.props;
    const { curUser } = profile;
    const { modalVisible, activeidworklog } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    if (!curUser || loading) {
      return <Spin />
    }
    console.log(profile)

    return (
      <PageHeaderWrapper
        title="编号：1"
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }

        content={
          <DescriptionList className={styles.headerList} size="small" col="2">
            <Description term="创建人">{curUser.op_name}</Description>
            <Description term="创建时间">{curUser.starttime}</Description>
            <Description term="关联任务号">
              <a href="">{curUser.idorder}</a>
            </Description>
            <Description term="完成日期">{curUser.endtime}</Description>
            <Description term="备注">请于两个工作日内确认</Description>
          </DescriptionList>
        }
        extraContent={
          <Row>
            <Col xs={24} sm={12}>
              <div className={styles.textSecondary}>状态</div>
              <div className={styles.heading}>{checkMap[curUser.checkstate]}</div>
            </Col>
            <Col xs={24} sm={12}>
              <div className={styles.textSecondary}>订单金额</div>
              <div className={styles.heading}>{curUser.od_money}</div>
            </Col>
          </Row>}
        tabList={tabList}
      >

        <Card title="银行卡信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="姓名">{curUser.name}</Description>
            <Description term="卡号">{curUser.card_id}</Description>
            <Description term="联系方式">{curUser.tel}</Description>
            <Description term="余额"> {curUser.money}</Description>
          </DescriptionList>

          <Button
            type="primary"
            style={{ width: '10%', marginBottom: 8 }}
            icon=""
            className={styles.newButton}
            onClick={() => this.handleModalVisible(true, curUser.idorder)}
          >
            确认
          </Button>

          <CreateForm {...parentMethods} modalVisible={modalVisible} activeidworklog={activeidworklog} />


        </Card>


      </PageHeaderWrapper>
    );
  }
}

export default AdvancedProfile;
