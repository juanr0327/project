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
        {getFieldDecorator('card_id', {
          rules: [{ required: true, message: '请输入银行卡号！' }],
          })(
            <Input prefix={<Icon type="card_id" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入银行卡号！" />
                        )}
      </Form.Item>
      <Form.Item            
        label="银行名称"
        hasFeedback
      >
        {getFieldDecorator('bank', {
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
      <Form.Item label="余额">
        {getFieldDecorator('money', {
          rules: [{ required: true, message: '请输入银行卡余额！' }],
          })(
            <Input prefix={<Icon type="money" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入银行卡余额！" />
                        )}
      </Form.Item>
      <Form.Item label="姓名"> 
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入持卡人姓名！' }],
        })(
          <Input prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入持卡人姓名！" />
          )}
      </Form.Item>
      <Form.Item label="电话">
        {getFieldDecorator('tel', {
          rules: [{ required: true, message: '请输入持卡人电话！' }],
        })(
          <Input prefix={<Icon type="tel" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入持卡人电话！" />
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
const CreateForm2 = Form.create()(props => {
  const { modalVisible2, handleModalVisible2, activeCardId,activename,activemoney,activetel} = props;
 // console.log(cardId)
  return (
    <Modal
      destroyOnClose
      title="详情"
      visible={modalVisible2}
      onOk={() => handleModalVisible2()}
      onCancel={() => handleModalVisible2()}
    >
      <div>卡号：{activeCardId}</div>
      <div>持卡人：{activename}</div>
      <div>余额：{activemoney}</div>
      <div>持卡人电话：{activetel}</div>               
    </Modal>
  );
});


const CreateForm3 = Form.create()(props => {
  const { modalVisible3, handledelete, handleModalVisible3, activeCardId} = props;
  return (
    <Modal
      destroyOnClose
      // title="删除"
      visible={modalVisible3}
      onOk={() => handledelete(activeCardId)}
      onCancel={() => handleModalVisible3()}
      title={activeCardId}
    >
      <div>卡号：{activeCardId}</div>
      <div>你确定删除该银行卡吗？</div>
                                  
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
      type: 'list/addfetch',
      payload: {
        card_id: fields.card_id,
        bank: fields.bank,
        money: fields.money,
        name: fields.name,
        tel: fields.tel,
        idoperator: fields.idoperator,
      },
    });
   
    message.success('添加成功');
    this.handleModalVisible();
  };

  
  handledelete = (cardId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/deletefetch',
      payload: {
       cardId
      },
    });

    message.success('删除成功');
    this.handleModalVisible3();

    setTimeout(() => {
      location.reload()
    }, 1000);    
  };

  state = { modalVisible: false,  modalVisible2: false,modalVisible3: false, activeCardId: '',activename:'',activetel:'',activemoney:'' }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
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

  handleModalVisible2 = (flag, cardId,money,name,tel) => {
    this.setState({
      modalVisible2: !!flag,
      activeCardId: cardId,
      activemoney: money,
      activename:name,
      activetel:tel,

    });
  };

  handleModalVisible3 = (flag, cardId) => {
    this.setState({
      modalVisible3: !!flag,
      activeCardId: cardId
    });
  };

  render() {
    const {
      list: { list },
      loading,
     
    } = this.props;
   
    const {  modalVisible,modalVisible2,modalVisible3, activeCardId,activemoney,activename,activetel } = this.state;
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
    const paginationProps = {
      pageSize: 6,
      total: list.length,
    };
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
    const parentMethods2 = {
      
      handleModalVisible2: this.handleModalVisible2,
    };
    const parentMethods3 = {
      
      handledelete: this.handledelete,
      handleModalVisible3: this.handleModalVisible3,
    };
    return (
      <PageHeaderWrapper title="银行卡列表" content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            pagination={paginationProps}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card}>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={avatarsMap[item.bank]} />}
                      title={<a>{item.title}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          <p>卡号：{item.card_id}</p>
                          <p>管理员：{item.op_name}</p>
                          
                        </Ellipsis>
                      }
                    />
                    <Button
                      type="primary"
                      className={styles.newButton2}
                      // eslint-disable-next-line no-shadow
                      href='http://localhost:8000/admin/operator-card'
                    >
                      <Icon type="update" /> 管理
                    </Button>
                    <Button type="primary" className={styles.newButton2} onClick={() => this.handleModalVisible2(true, item.card_id,item.money,item.name,item.tel)}>
                      <Icon type="detail" /> 详情
                    </Button>
                    <Button type="danger" className={styles.newButton2} onClick={() => this.handleModalVisible3(true, item.card_id)}>
                      <Icon type="delete" /> 删除
                    </Button>
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton} onClick={() => this.handleModalVisible(true)}>
                    <Icon type="plus" /> 新建
                  </Button>
                  <CreateForm {...parentMethods} modalVisible={modalVisible} />
                </List.Item>
              )
            }
          />
        </div>
        <CreateForm2 {...parentMethods2} modalVisible2={modalVisible2} activeCardId={activeCardId} activemoney={activemoney} activename={activename} activetel={activetel} />
        <CreateForm3 {...parentMethods3} modalVisible3={modalVisible3} activeCardId={activeCardId} />
      </PageHeaderWrapper>
    );
  }
}

export default CardList;
