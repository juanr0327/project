import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Center.less';
import { getUserTel } from "@/utils/authority";
import { avatarsMap } from '../../../models/list';

@connect(({ loading, user, project }) => ({
  listLoading: loading.effects['user/gerenxinxi'],
  user,
  loading: loading.models.user,
  currentUser: loading.effects['user/gerenxinxi'],
  currentUserLoading: loading.effects['user/gerenxinxi'],
  project,
  projectLoading: loading.effects['project/fetchNotice'],
}))

class Center extends PureComponent {
  state = {
    newTags: [],
  
    inputValue: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const tel = getUserTel()
    const payload = {tel}
    console.log(tel);
    dispatch({
      type: 'user/gerenxinxi',
      payload
    
    });
    dispatch({
      type: 'project/fetchcard',
      payload
    });
  }

  onTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'articles':
        router.push(`${match.url}/articles`);
        break;
   
      default:
        break;
    }
  };

  
  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
     
      inputValue: '',
    });
  };

  render() {
    
    const {
      listLoading,
      match,
      location,
      children,
      
    } = this.props;

    const {
      user,
      loading,
    } = this.props;

    const curUser = user.list[0]

    const operationTabList = [
      {
        key: 'articles',
        tab: (
          <span>
            日志 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },

    ];

    console.log(curUser)

    return (
      <GridContent className={styles.user}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
              {curUser && Object.keys(curUser).length ? (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={curUser.photos} />
                    <div className={styles.name}>{curUser.op_name}</div>
                    <div>{curUser.signature}</div>
                  </div>
                  <div className={styles.detail}>
                    <p>
                      <i className={styles.title} />
                      {curUser.idoperator}号操作员
                    </p>
                    <p>
                      <i className={styles.title} />
                      电话：{curUser.op_tel}
                    </p>
                    <p>
                      <i className={styles.title} />
                      邮箱：{curUser.op_email}
                    </p>
                    <p>
                      <i className={styles.address} />
                      {curUser.op_address}
                    </p>
                  </div>
                  <Divider dashed />
               
                  <Divider style={{ marginTop: 16 }} dashed />
          
                </div>
              ) : (
                'loading...'
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
              loading={listLoading}
            >
              {children}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Center;
