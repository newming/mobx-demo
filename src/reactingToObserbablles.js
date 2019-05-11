// 对可观察的数据作出反应
import { observable, isArrayLike, computed, autorun, when, reaction } from 'mobx'

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
}
var store = new Store()

// 1. computed

// var foo = computed(function () {
//   return store.str + '/' + store.num
// })
// console.log(foo)
// console.log(foo.get())

// foo.observe(function (change) {
//   // 当可观察数据修改时执行，change包含了改变前后的数据信息
//   console.log(change)
// })

// store.str = 'world' // 修改 observable 数据触发 observe 函数执行
// store.num = 300

// 2. autorun https://mobx.js.org/refguide/autorun.html
// autorun(() => {
//   // 会自动自行一次
//   console.log('autorun')
//   // console.log(store.str + '/' + store.num)
//   console.log(store.mixed)
// })

// store.str = 'world' // 当autorun依赖的数据发生变化，会立即执行 autorun 中的函数 When autorun is used, the provided function will always be triggered once immediately and then again each time one of its dependencies changes
// store.num = 300

// 3. when https://mobx.js.org/refguide/when.html
// when(predicate: () => boolean, effect?: () => void, options?) predicate条件成立，执行effect，只执行一次
// when(() => store.bool, () => {
//   // 该函数是同步执行
//   console.log('it is true')
// })

// store.bool = true // 必须是一个被观察的数据

// 4. reaction https://mobx.js.org/refguide/reaction.html
// 仅当期望的数据变化时触发，相对于 autorun 的副作用更少
reaction(() => [store.str, store.num], arr => {
  console.log(arr.join('/'))
})

store.str = 'world'
store.bool = true // 不会触发 reaction
