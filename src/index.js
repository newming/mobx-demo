import { trace, toJS, spy, observe, observable, action, computed } from "mobx"
import React, { Component, Fragment } from "react"
import ReactDOM from "react-dom"
import { observer, PropTypes as ObservablePropTypes } from 'mobx-react'
import PropTypes from 'prop-types'

import TodoItem from './components/TodoItem.jsx'

// spy函数，监控了所有数据变化，慎用 https://mobx.js.org/refguide/spy.html
// spy(event => {
//   console.log(event)
// })

class Todo {
  id = Math.random()
  @observable
  title = ''

  @observable
  finished = false

  constructor(title) {
    this.title = title
  }

  @action.bound
  toggle () {
    this.finished = !this.finished
  }
}

class Store {
  @observable
  todos = []

  // observe 函数使用
  disposers = [] // 将来需要被销毁的观察数据列表
  constructor () {
    observe(this.todos, change => {
      // 监控没个 todo 属性的变化
      this.disposers.forEach(disposer => disposer()) // 将现在已有的观察销毁
      this.disposers = [] // 清空观察对象列表
      for (let todo of change.object) {
        // change.object 包含了所有数据
        var disposer = observe(todo, changex => {
          // observe 观察每个子todo变化
          // console.log(changex)
          this.save()
        })
      }
      this.save()
      // console.log(change) // 当 todos 增加或者删除的时候触发，但是修改单个 todo 的属性不会触发，比如修改某个todo的 finished
    })
  }

  save () {
    // 将 todos 存储到 localstorage
    // toJS函数，将mobx观察数据转为了正常数据 https://mobx.js.org/refguide/tojson.html
    // console.log(toJS(this.todos))
    localStorage.setItem('todos', JSON.stringify(toJS(this.todos)))
  }

  @computed
  get left () {
    return this.todos.filter(todo => !todo.finished).length
  }

  @action.bound
  createTodo (title) {
    this.todos.unshift(new Todo(title))
  }

  @action.bound
  removeTodo (todo) {
    // https://mobx.js.org/refguide/array.html
    this.todos.remove(todo) // 这里的 remove 并不是原生js的方法，是mobx为observable array提供的
  }
}

var store = new Store()

@observer
class TodoList extends Component {
  static propTypes = {
    store: PropTypes.shape({
      left: PropTypes.number,
      createTodo: PropTypes.func,
      todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject)
    }).isRequired
  }

  state = {
    inputValue: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    var store = this.props.store
    var inputValue = this.state.inputValue
    store.createTodo(inputValue)
    this.setState({inputValue: ''})
  }
  handleChange = (e) => {
    let inputValue = e.target.value
    this.setState({
      inputValue
    })
  }

  remove = (todo) => {
    this.props.store.removeTodo(todo)
  }

  render () {
    // trace函数，用来debugging的 https://mobx.js.org/best/trace.html
    trace()

    const store = this.props.store
    const todos = store.todos
    return <div className="todo-list">
      <header>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.inputValue} type="text" onChange={this.handleChange} className="input" placeholder="input something" />
        </form>
      </header>
      <ul>{todos.map(todo => {
        return <li key={todo.id} className="todo-item">
          <TodoItem todo={todo} />
          <span style={{color: "blue", cursor: "pointer"}} onClick={e => this.remove(todo)}>删除</span>
        </li>
      })}</ul>
      <footer>
        <p>{ store.left } items left</p>
      </footer>
    </div>
  }
}

ReactDOM.render(<TodoList store={store} />, document.getElementById('app'))
