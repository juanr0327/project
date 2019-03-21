/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'dva';

@connect(({ mock }) => ({
  mock,
}))
class MockList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    // dispatch mock request, payload会被mock.js里面的 *fetchMockList函数接收,
    dispatch({
      type: 'mock/fetchMockList',
    });

    dispatch({
      type: 'mock/fetchMockListUsingPost',
      payload: {
        query: {
          pageNum: 1,
          pageSize: 5,
        },
        data: {
          city: 8,
        },
      },
    });
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const text = this.props.mock;
    console.log(text);
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div>{JSON.stringify(text)}</div>
    );
  }
}

export default MockList;
