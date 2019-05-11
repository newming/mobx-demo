// 可观察的数据(observable)

import { observable, isArrayLike } from 'mobx'

// array
const arr = observable(['a', 'b', 'c'])

console.log(arr) // Proxy {0: "a", 1: "b", 2: "c", Symbol(mobx administration): ObservableArrayAdministration} 返回的是一个proxy对象，这里是和4.x的很大的区别
console.log(Array.isArray(arr)) // true 4.x这里返回的是false
console.log(isArrayLike(arr)) // true
console.log(arr[0], arr[1])
// console.log(arr[4]) // 越界的访问，mobx会报警告

// object
const obj = observable({
  a: 1,
  b: 1
})
console.log(obj)
console.log(obj.a)

// Map
const map = observable(new Map())
map.set('a', 1)

console.log(map)
console.log(map.has('a'))

// var num1 = observable(123) // observable 函数不可观察基本数据类型，对于基础数据类型需要使用 observable.box()
// console.log(num1) // mobx.module.js:98 Uncaught Error: [mobx] The provided value could not be converted into an observable. If you want just create an observable reference to the object use 'observable.box(value)'

// 对于基础数据类型，需要通过 observable.box 来进行包装处理，
// https://mobx.js.org/refguide/boxed.html
var num = observable.box(20)
var str = observable.box('123')
var bool = observable.box(true)

console.log(num)
console.log(str)
console.log(bool)

console.log(num.get())

num.observe(function (change) {
  console.log(change)
  console.log(change.oldValue, change.newValue)
})

num.set(30)

// 使用 @observable 修饰器，修饰器可以直接作用于基础数据类型和引用类型
// https://mobx.js.org/refguide/observable-decorator.html

class Store {
  @observable array = []
  @observable obj = {}
  @observable map = new Map()

  @observable str = 'hello'
  @observable num = 123
  @observable bool = false
}

console.log(new Store())