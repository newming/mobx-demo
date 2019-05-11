// 修改可观察的数据 action https://mobx.js.org/refguide/action.html#
import { observable, computed, reaction, action, runInAction } from 'mobx'

class Store {
  @observable array = []
  @observable obj = {}
  @observable map = new Map()

  @observable str = 'hello'
  @observable num = 123
  @observable bool = false

  @computed get mixed () {
    return store.str + '/' + store.num
  }

  @action bar () {
    this.str = 'world'
    this.num = 300
  }

  @action.bound
  increment () {
    this.num ++
  }
}
var store = new Store()

reaction(() => [store.str, store.num], arr => {
  console.log(arr.join('/')) // bar方法修改了两个值，只触发一次 reaction
})

// @action 和 @action.bound 的区别：@action修饰的方法是挂载到了类的原型上，而 bound 后是挂载到了实例上(即 new 出来的对象上)，在与react结合使用的时候更多是使用bound，因为需要将action方法当作props传给组件，这时候action是放在store实例上的属性
// store.bar()
// action action.bound
// var increment = store.increment
// increment()
// increment()
// increment()

// runInAction 是 action 的语法糖，第一个参数 name 方便调试
runInAction('modify', () => {
  store.bar = 'world'
  store.num = 300
})
