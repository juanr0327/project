import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, DatePicker,Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import { Cascader } from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
const options = [{
  value: '建设银行',
  label: '建设银行',
  children: [{
    value: '5212261614003383141',
    label: '5212261614003383141',
   
  }],
}, {
  value: '农业银行',
  label: '农业银行',
  children: [{
    value: '6212261614003383140',
    label: '6212261614003383140',
  }],
}, {
  value: '中国银行',
  label: '中国银行',
  children: [{
    value: '6212261614003383141',
    label: '6212261614003383141',
  }],
}, {
  value: '招商银行',
  label: '招商银行',
  children: [{
    value: '6212261614003383145',
    label: '6212261614003383145',
  }],
}, {
  value: '工商银行',
  label: '工商银行',
  children: [{
    value: '6212261614003383143',
    label: '6212261614003383143',
    
  }],
}
];
function onChange(value) {
  console.log(value);
}
@connect(({ form }) => ({
  data: form.step,
}))
@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          router.push('/form/step-form/confirm');
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="付款账户">
            {getFieldDecorator('payAccount', {
              initialValue: data.payAccount,
              rules: [{ required: true, message: '请选择付款账户' }],
            })(
              <Cascader options={options} onChange={onChange} placeholder="Please select" />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="收款账户">
            {getFieldDecorator('receiverAccount', {
                initialValue: data.receiverAccount,
                rules: [
                  { required: true, message: '请输入收款人账户' },
                ],
              })(
                <Cascader options={options} onChange={onChange} placeholder="Please select" />
              )}
          </Form.Item>
         
          <Form.Item {...formItemLayout} label="转账金额">
            {getFieldDecorator('amount', {
              initialValue: data.amount,
              rules: [
                { required: true, message: '请输入转账金额' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入合法金额数字',
                },
              ],
            })(<Input prefix="￥" placeholder="请输入金额" />)}
          </Form.Item>
          <Form.Item key="time" {...this.formLayout} label="开始时间">
            {form.getFieldDecorator('time', {
              rules: [{ required: true, message: '请选择开始时间！' }],
            })(
              <DatePicker
                style={{ width: '100%' }}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择开始时间"
              />
          )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Step1;
