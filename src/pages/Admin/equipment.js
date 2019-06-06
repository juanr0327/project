import React, { PureComponent } from 'react';
import Ellipsis from '@/components/Ellipsis';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Modal,
  Form,
  message
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Table.less';
import { duankouMap } from '../../models/list';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

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
      <Form.Item label="编号">
        {getFieldDecorator('idequipment', {
          rules: [{ required: true, message: '请输入！' }],
          })(
            <Input prefix={<Icon type="idequipment" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入！" />
                        )}
      </Form.Item>
      <Form.Item label="端口">
        {form.getFieldDecorator('duankou', {
           // initialValue: formVals.type,
          })(
            <RadioGroup>
              <Radio value="0">电脑端</Radio>
              <Radio value="1">手机端</Radio>
            </RadioGroup>
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
class BasicList extends PureComponent {
  state = { visible: false, done: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

 // eslint-disable-next-line react/sort-comp
 handleAdd = fields => {
  const { dispatch } = this.props;
  dispatch({
    type: 'list/addequipment',
    payload: {
      idequipment: fields.idequipment,
      duankou:fields.duankou,
    },
  });

  message.success('添加成功');
  this.handleModalVisible();
};

state = { modalVisible: false}

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetchequipment',
      payload: {
        count: 5,
      },
    });
   
  }

  showModal = () => {
    this.setState({
    visible: true,
    current: undefined,
    });
    };
    
    showEditModal = item => {
    this.setState({
    visible: true,
    current: item,
    });
    };
    
    handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
    done: false,
    visible: false,
    });
    };
    
    handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
    visible: false,
    });
    };
    
    handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';
    
    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
    if (err) return;
    this.setState({
    done: true,
    });
    dispatch({
    type: 'list/submit',
    payload: { id, ...fieldsValue },
    });
    });
    };
    
    deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
    type: 'list/submit',
    payload: { id },
    });
    };

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

    const {modalVisible} = this.state;


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除操作员',
          content: '确定删除该设备吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };
    
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">等待中</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      pageSize: 5,
      total: list.length,
    };

    const ListContent = ({ data: { num, percent, status } }) => (
      <div className={styles.listContent}>
       
        
        <div className={styles.listContentItem}>
          <span>任务量</span>
          <p>{num}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>任务完成度</span>
          <p><Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} /></p>
        </div>
      </div>
    );

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.current)}> 
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          管理 <Icon type="down" />
        </a>
      </Dropdown>
    );
    
    // eslint-disable-next-line no-unused-vars
   

    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="待办" value="8个任务" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="标准列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={() => this.handleModalVisible(true)}
           
            >
              添加
            </Button>
            <CreateForm {...parentMethods} modalVisible={modalVisible} />
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    // eslint-disable-next-line jsx-a11y/anchor-has-content
                    <a
                      onClick={e => {
                        e.preventDefault();
                        this.showEditModal(item);
                      }}
                     />,
                    <MoreBtn current={item} />,
                  ]}
                >
                  <List.Item.Meta
                    title={<a href={item.href}>编号：{item.idequipment}</a>}
                    description={
                   
                      <Ellipsis className={styles.item}>
                        <p>{duankouMap[item.duankou]}</p>
                       
                      </Ellipsis>
                      
                    }
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
        
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;
