import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Form, Modal, Button, Spin, Steps, Icon, Popover, } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import classNames from 'classnames';
import styles from './BasicProfile.less';
import { bankMap, statusMap } from './models/profile';
import logo from '../../assets/ABC/login.PNG';
import logo2 from '../../assets/ABC/safeCer1.PNG';
import logo4 from '../../assets/ABC/surePwd.PNG';
import logo3 from '../../assets/ABC/trans.PNG';
import logo5 from '../../assets/ABC/transSucc.PNG';

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const { Description } = DescriptionList;
const { Step } = Steps;


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



/* eslint react/no-multi-comp:0 */
@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class BasicProfile extends Component {
  state = {
    visible: false,
    stepDirection: 'horizontal',
  };

  componentDidMount() {
    const fakeIdorder = '12'
    const { dispatch, location } = this.props;
    const { idorder } = location.state ? location.state : { idorder: fakeIdorder }

    dispatch({
      type: 'profile/fetchBasic',
      payload: idorder || fakeIdorder,
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

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

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  showModal2 = () => {
    this.setState({
      visible2: true,
    });
  }

 

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const { stepDirection } = this.state;
    const { profile = {}, loading } = this.props;
    const { curUser } = profile;

    console.log(loading)

    if (!curUser || loading) {
      return <Spin />
    }

    return (
      <PageHeaderWrapper title="转账详情页" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
            <Description term="转入银行">{bankMap[curUser.bankto]}</Description>
            <Description term="转入账户">{curUser.accountto}</Description>
            <Description term="转账时间">{curUser.od_time}</Description>
            <Description term="转账金额">{curUser.od_money}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="详细信息" style={{ marginBottom: 32 }}>
            <Description term="转出银行">{bankMap[curUser.bankout]}</Description>
            <Description term="转出账户">{curUser.accountout}</Description>
            <Description term="操作员姓名">{curUser.op_name}</Description>
            <Description term="完成状态">{statusMap[curUser.od_state]}</Description>
            <Description term="备注">{curUser.remark}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />

          <div className={styles.title}>进度</div>
          <Card title="流程进度" style={{ marginBottom: 24 }} bordered={false}>
            <Steps direction={stepDirection} progressDot={customDot} current={5}>
              <Step
                title="创建项目"
                description={
                  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
                    <Fragment>
                      {curUser.op_name}
                      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
                    </Fragment>
                    <div>{curUser.od_time}</div>
                  </div>}
              />
              <Step
                title="网页登录"
                description={
                  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
                    
                    <div>{curUser.Plogin}</div>
                  </div>}
              />
              <Step
                title="验证码验证"
                description={
                  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
                   
                    <div>{curUser.Pverify}</div>
                  </div>}
              />
              <Step
                title="填写信息"
                description={
                  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
                    <div>{curUser.Pfill}</div>
                  </div>}
              />
              <Step
                title="完成转账"
                description={
                  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
                    <div>{curUser.Presult}</div>
                  </div>}
              />

            </Steps>
            <Modal
              title="图片详情"
              // eslint-disable-next-line react/destructuring-assignment
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <img alt="logo" className={styles.logo} src={logo} />
            </Modal>
            <Modal
              title="图片详情"
              // eslint-disable-next-line react/destructuring-assignment     
              visible2={this.state.visible2}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <img alt="logo" className={styles.logo} src={logo2} />
            </Modal>
          </Card>

          {/* <Step Description={<div onClick={() => this.xx()} >查看详情</div>} /> */}

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
