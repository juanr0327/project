import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
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
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,message
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './Table.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;



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

    const {
form: { getFieldDecorator },
} = this.props;
const { visible, done, current = {} } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '选择操作员',
          content: '确定选择该操作员吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };
    
    const modalFooter = done
    ? { footer: null, onCancel: this.handleDone }
    : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const ListContent = ({ data: { op_name, ordernum, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>姓名</span>
          <p>{op_name}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>任务量</span>
          <p>{ordernum}</p>
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
           
            <Menu.Item key="delete">选择</Menu.Item>
          </Menu>
        }
      >
        <a>
          分配 <Icon type="down" />
        </a>
      </Dropdown>
    );
    
    // eslint-disable-next-line no-unused-vars

    const paginationProps = {
      pageSize: 5,
      total: list.length,
    };
   

    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>

          <Card
            className={styles.listCard}
            bordered={false}
            title="标准列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
      
          >
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
                    avatar={<Avatar src={item.photos} shape="square" size="large" />}
                    title={<a href={item.href}>{item.idoperator}号操作员</a>}
                    description={
                   
                      <Ellipsis className={styles.item}>
                        <p>电话：{item.op_tel} / 邮箱：{item.op_email}</p>
                       
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
