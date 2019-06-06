import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card, List, Avatar } from 'antd';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import { Radar } from '@/components/Charts';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { avatarsMap } from '../../models/list';
import { bankMap, statusMap } from '../../models/project';
import styles from './Workplace.less';

@connect(({ user, project, activities, chart, loading }) => ({
  loading: loading.models.user,
  user,
  project,
  activities,
  chart,
  currentUser: loading.effects['user/fetchuser2'],
  projectLoading: loading.models.project,
  activitiesLoading: loading.models.activities,
}))


class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchuser2',
    });
    dispatch({
      type: 'project/fetchNotice2',
    });
    dispatch({
      type: 'activities/fetchrizhi',
    });
    dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map(item => {
      const events = (
        <div>
          {item.op_name} 新建了
          <a href="/account/center2/articles">
            转账日志
          </a>
        </div>
      )
      return (
        <List.Item key={item.idworklog}>
          <List.Item.Meta
            avatar={<Avatar src={item.photos} />}
            title={
              <span className={styles.event}>{events}</span>
            }
            description={
              <span className={styles.datetime} title={item.wk_time}>
                {moment(item.wk_time).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      user,
      loading,
      project: { notice },
      projectLoading,
      activitiesLoading,
      chart: { radarData },
    } = this.props;
    const currentUser = user.list[0];
    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src='https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png' />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              早安，
              财务经理
              ，祝你开心每一天！
            </div>
          </div>
        </div>
      ) : null;

    const extraContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.extraContent}>
          <div className={styles.statItem}>
            <p>任务数</p>
            <p>{currentUser.ordernum}</p>
          </div>
          <div className={styles.statItem}>
            <p>完成率</p>
            <p>{currentUser.percent}%</p>
          </div>
          <div className={styles.statItem}>
            <p>转账额</p>
            <p>{currentUser.money}</p>
          </div>
        </div>
      ) : null;

    // const id = item.description;
    // const routeState1 = {
    //   pathname: "/profile/basic",
    //   state: {
    //     idorder: id
    //   }
    // };

    return (

      <PageHeaderWrapper
        loading={loading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="已完成的项目"
              bordered={false}
              extra={<Link to="/list/table-list">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              <List
                rowKey="id"
                dataSource={notice}
                renderItem={item => (
                  <Card.Grid className={styles.projectGrid} key={item.idorder}>
                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                      <Card.Meta
                        title={
                          <div className={styles.cardTitle}>
                            <Avatar size="small" src={avatarsMap[item.bankout]} />
                            <Link to="/list/table-list"> {bankMap[item.bankout]}</Link>
                          </div>
                        }
                        description={item.accountto}
                      />
                      <div className={styles.projectItemContent}>

                        <Link to="/list/table-list">{item.accountout || ''}</Link>
                        {item.od_time && (
                          <span className={styles.datetime} title={item.od_time}>
                            {moment(item.od_time).fromNow()}
                          </span>
                        )}
                      </div>
                    </Card>
                  </Card.Grid>
                )}
              />
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>{this.renderActivities()}</div>
              </List>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>

            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card>
           
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default props => (
  <AsyncLoadBizCharts>
    <Workplace {...props} />
  </AsyncLoadBizCharts>
);
