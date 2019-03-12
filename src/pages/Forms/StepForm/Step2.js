import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider, Row, Col, message } from 'antd';
import router from 'umi/router';
import { digitUppercase } from '@/utils/utils';
import moment from 'moment';
import { parseAmount } from '../models/form';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))
@Form.create()
class Step2 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;

    const onPrev = () => {
      router.push('/form/step-form/info');
    };

    const LineInfo = props => (
      <Row>
        <Col span={5}>{`${props.label}: `}</Col>
        <Col span={19}>{props.value}</Col>
      </Row>
    );

    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          // 密码验证(默认123456) 向后端请求
          if (values.password !== '123456') {
            message.error('密码错误，请确认！');
            return;
          }

          dispatch({
            type: 'form/submitStepForm',
            payload: {
              ...data, // 之前的data，完整传过去即可
            },
          });
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <LineInfo label="付款账户" value={data.payAccount.join(' / ')} />
        <LineInfo label="收款账户" value={data.receiverAccount.join(' / ')} />
        <LineInfo
          label="转账金额"
          value={`${parseAmount(data.amount)} / ${digitUppercase(data.amount)}`}
        />
        <LineInfo label="转账时间" value={moment(data.time).format('YYYY-MM-DD HH:mm:ss')} />

        <Divider style={{ margin: '24px 0' }} />
        <Form.Item {...formItemLayout} label="支付密码" required={false}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '需要支付密码才能进行支付',
              },
            ],
          })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
        </Form.Item>
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          提交
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          上一步
        </Button>
      </Form>
    );
  }
}

export default Step2;
