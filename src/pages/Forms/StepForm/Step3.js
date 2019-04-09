import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import moment from 'moment';
import styles from './style.less';
import { parseAmount } from '../models/form';

@connect(({ form ,loading}) => ({
  form,
  loading: loading.models.form,
  data: form.step,
}))

class Step3 extends React.PureComponent {
 
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'form/submitorder',
    });
  }

 
 
  render() {
    const { data } = this.props;
    const onFinish = () => {
      router.push('/form/step-form/info');
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            付款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.payAccount.join(' / ')}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverAccount.join(' / ')}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            转款时间：
          </Col>
          <Col xs={24} sm={16}>
            {moment(data.time).format('YYYY-MM-DD HH:mm:ss')}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            转账金额：
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.money}>{parseAmount(data.amount)}</span>
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          再转一笔
        </Button>
        <Button>查看账单</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description="预计两小时内到账"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }

}

export default Step3;
