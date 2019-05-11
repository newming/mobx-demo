import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

@observer
class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired
    }).isRequired
  }

  handleToggle = e => {
    this.props.todo.toggle() // 这个 toggle 是 Todo 类上的 action
  }

  render() {
    const todo = this.props.todo
    return <Fragment>
      <input type="checkbox" className="toggle" defaultChecked={todo.finished} onClick={this.handleToggle} />
      <span>{ todo.title }</span>
    </Fragment>
  }
}

export default TodoItem
