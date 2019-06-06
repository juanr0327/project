import React, { PureComponent } from 'react';
import { List, Icon,  Button,Modal,Form,Input,message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './Articles.less';
import Ellipsis from '@/components/Ellipsis';
import { getUserTel } from "@/utils/authority";

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
      title="新建"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form.Item label="内容">
        {getFieldDecorator('wk_content', {
          rules: [{ required: true, message: '请输入！' }],
          })(
            <Input prefix={<Icon type="wk_content" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入！" />
                        )}
      </Form.Item>
                 
    </Modal>
  );
});

@connect(({ list }) => ({
  list,
}))
@Form.create()

class Center extends PureComponent {

  
  // eslint-disable-next-line react/sort-comp
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/addrizhi',
      payload: {
        wk_content: fields.wk_content,
        wk_time:moment().format('YYYY-MM-DD HH:mm:ss'),
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  state = { modalVisible: false}
  

  componentDidMount() {
    const { dispatch } = this.props;
    const tel = getUserTel()
    const payload = {tel}
    dispatch({
      type: 'list/fetchrizhi',
      payload
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };


  render() {

    const {
      list: { list },
    } = this.props;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    const {modalVisible} = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <div>
        <Button
          type="dashed"
          style={{ width: '100%', marginBottom: 8 }}
          icon="plus"
          className={styles.newButton} 
          onClick={() => this.handleModalVisible(true)}
        >
      添加
        </Button>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <List
          size="large"
          className={styles.articleList}
          rowKey="id"
          itemLayout="vertical"
          dataSource={[...list]}
          renderItem={item =>
              // eslint-disable-next-line react/jsx-indent
              <List.Item
                key={item.id}
                actions={[
             
              // eslint-disable-next-line react/jsx-indent
              <IconText type="message" text={item.wk_state} />,
            ]}
              >
                <List.Item.Meta
              
                  description={
                    <Ellipsis className={styles.item}>
                      <p>时间：{item.wk_time}</p>
                      <p>内容：{item.wk_content}</p>
                        
                    </Ellipsis>
                    }
                />
            
              </List.Item>
        
          }
        />
       
      </div>
    );
  }
}

export default Center;
