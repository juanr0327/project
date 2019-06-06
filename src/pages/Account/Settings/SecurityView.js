import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { List  ,Form, Modal,  Input,  Icon,  message,Button} from 'antd';
import { connect } from 'dva';

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const { getFieldDecorator } = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="修改"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form.Item label="登录密码">
        {getFieldDecorator('op_password', {
          rules: [{ required: true, message: '请输入六位以上密码！'  ,min: 6}],
          })(
            <Input prefix={<Icon type="op_password" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入！" />
                        )}
      </Form.Item>
      <Form.Item label="支付密码">
        {getFieldDecorator('op_paymentcode', {
          rules: [{ required: true, message: '请输入六位以上密码！' ,min: 6 }],
          })(
            <Input prefix={<Icon type="op_paymentcode" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入！" />
                        )}
      </Form.Item>
     
                 
    </Modal>
  );
});
const passwordStrength = {
  strong: (
    <font className="strong">
      <FormattedMessage id="app.settings.security.strong" defaultMessage="Strong" />
    </font>
  ),
  medium: (
    <font className="medium">
      <FormattedMessage id="app.settings.security.medium" defaultMessage="Medium" />
    </font>
  ),
  weak: (
    <font className="weak">
      <FormattedMessage id="app.settings.security.weak" defaultMessage="Weak" />
      Weak
    </font>
  ),
};

@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
@Form.create()
class SecurityView extends Component {

  // eslint-disable-next-line react/sort-comp
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/updatepassword',
      payload: {
        op_password: fields.op_password,
        op_paymentcode:fields.op_paymentcode,
      },
    });
  
    message.success('添加成功');
    this.handleModalVisible();
  };
  
  state = { modalVisible: false}
  
    componentDidMount() {
      const { dispatch } = this.props;
      dispatch({
        type: 'list/fetchop',
        payload: {
          count: 5,
        },
      });
     
    }

    handleModalVisible = flag => {
      this.setState({
        modalVisible: !!flag,
      });
    };

  getData = () => [
    {
      title: formatMessage({ id: 'app.settings.security.password' }, {}),
      description: (
        <Fragment>
          {formatMessage({ id: 'app.settings.security.password-description' })}：
          {passwordStrength.strong}
        </Fragment>
      ),
     
    },
  
   
    
  ];

  render() {
    const {
      user: { user },
      loading,
    } = this.props;

    const {modalVisible} = this.state;


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />

            </List.Item>
          )}
        />
        <Button
          type="primary"
          style={{ width: '10%', marginBottom: 8 }}
          onClick={() => this.handleModalVisible(true)}
        >
              修改
        </Button>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </Fragment>
    );
  }
}

export default SecurityView;
