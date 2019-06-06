import React, { PureComponent } from 'react';
import { List, Icon, Button, Modal, Form, message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './Articles.less';
import Ellipsis from '@/components/Ellipsis';
import { getUserTel } from "@/utils/authority";

const CreateForm = Form.create()(props => {
  const { modalVisible, handleAdd, handleModalVisible, activeidworklog } = props;
  return (
    <Modal
      destroyOnClose
      visible={modalVisible}
      onOk={() => handleAdd(activeidworklog)}
      onCancel={() => handleModalVisible()}
      title={activeidworklog}

    >
      <div>确认？</div>
    </Modal>
  );
});
@connect(({ list }) => ({
  list,
}))
@Form.create()

class Center extends PureComponent {


  // eslint-disable-next-line react/sort-comp
  handleAdd = (idworklog) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/checkrizhi',
      payload: {
        idworklog
      },
    });

    message.success('操作成功');
    this.handleModalVisible();

    setTimeout(() => {
      location.reload()
    }, 300);
  };

  state = { modalVisible: false, activeidworklog: '' }


  componentDidMount() {
    const { dispatch } = this.props;
    const tel = getUserTel()
    const payload = { tel }
    dispatch({
      type: 'list/fetchrizhi2',
      payload
    });
  }

  handleModalVisible = (flag, idworklog) => {
    this.setState({
      modalVisible: !!flag,
      activeidworklog: idworklog
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
    const { modalVisible, activeidworklog } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <div>


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
                    <p>{item.op_name}</p>
                    <p>时间：{item.wk_time}</p>
                    <p>内容：{item.wk_content}</p>
                    <Button
                      type="primary"
                      style={{ width: '10%', marginBottom: 8 }}
                      icon=""
                      className={styles.newButton}
                      onClick={() => this.handleModalVisible(true, item.idworklog)}
                    >
                      确认
                    </Button>
                    <CreateForm {...parentMethods} modalVisible={modalVisible} activeidworklog={activeidworklog} />
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
