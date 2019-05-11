import { observable, action } from 'mobx'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { observer, PropTypes as ObservablePropTypes } from 'mobx-react' // 支持 mobx 的 props 类型校验

class Store {
  @observable
  cache = {
    queue: []
  }

  @action.bound
  refresh () {
    this.cache.queue.push(1)
  }
}

const store = new Store()

// 这里 observe 必须放到使用观察数据的组件中，比如这里，需要放到 bar 组件，放到 foo 不生效
@observer
class Bar extends Component {
  static propTypes = {
    // queue: PropTypes.array // 这里在 5.x 已经是没有问题的了
    queue: ObservablePropTypes.observableArray
  }

  render () {
    const queue = this.props.queue
    return <span>{ queue.length }</span>
  }
}

class Foo extends Component {
  static propTypes = {
    // cache: PropTypes.object // 这里没有问题，可以使用 mobx-react 提供的类型检验
    cache: ObservablePropTypes.observableObject
  }

  render () {
    const cache = this.props.cache
    return (<div>
      <button onClick={ this.props.refresh }>refresh</button>
      <Bar queue={cache.queue}></Bar>
    </div>)
  }
}

ReactDOM.render(<Foo cache={store.cache} refresh={store.refresh}/>, document.getElementById('app'))