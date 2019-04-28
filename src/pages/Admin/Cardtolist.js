import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  Modal,
  List,
  Select,message
} from 'antd';

import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { avatarsMap } from '../../models/list';
import styles from './CardList.less';


const { Option } = Select;

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
      <Form.Item label="卡号">
      
        {getFieldDecorator('cardto_id', {
          rules: [{ required: true, message: '请输入银行卡号！' }],
          })(
            <Input prefix={<Icon type="card_id" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入银行卡号！" />
                        )}
      </Form.Item>
      <Form.Item            
        label="银行名称"
        hasFeedback
      >
        {getFieldDecorator('银行名称', {
            rules: [
            { required: true, message: '请选择银行' },
            ],
            })(
              <Select placeholder="请选择银行" style={{ width: '100%' }}>
                <Option value="zgyh">中国银行</Option>
                <Option value="zsyh">招商银行</Option>
                <Option value="nyyh">农业银行</Option>
                <Option value="jsyh">建设银行</Option>
                <Option value="gsyh">工商银行</Option>
              </Select>
          )}
      </Form.Item>   
      
      <Form.Item label="姓名">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入持卡人姓名！' }],
        })(
          <Input prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入持卡人姓名！" />
          )}
      </Form.Item>
  
      <Form.Item            
        label="操作员姓名"
        hasFeedback
      >
        {getFieldDecorator('idoperator', {
            rules: [
            { required: true, message: '请分配操作员' },
            ],
            })(
              <Select placeholder="请分配操作员" style={{ width: '100%' }}>
                <Option value="0">曲丽丽</Option>
                <Option value="1">王程程</Option>
              </Select>
          )}
      </Form.Item>                                
    </Modal>
  );
});
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class CardList extends PureComponent {

  // eslint-disable-next-line react/sort-comp
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/addfetch2',
      payload: {
        cardto_id: fields.cardto_id,
        bank: fields.bank,
        name: fields.name,
        idoperator: fields.idoperator,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  state = { modalVisible: false}
  
 

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch2',
      payload: {
        count: 8,
      },
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
      loading,
     
    } = this.props;
   
    const {  modalVisible } = this.state;
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
         银行卡管理
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="银行卡列表" content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card} actions={[<a>管理</a>, <a>删除</a>]} >
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={avatarsMap[item.bank]} />}
                   
                      title={<a>{item.title}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          <p>卡号：{item.cardto_id}</p>
                          <p>管理员：{item.op_name}</p>
                          
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                 
                  <Button type="dashed" className={styles.newButton} onClick={() => this.handleModalVisible(true)}>
                    <Icon type="plus" /> 新建产品
                  </Button>
                  <CreateForm {...parentMethods} modalVisible={modalVisible} />
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CardList;
