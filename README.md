# mobx入门

[慕课网地址](https://www.imooc.com/learn/1012)

> 课程讲的是 mobx 4.x，而我安装的是 5.x，差距有一些

区别，5.x使用了 Proxy 代理对象，区别较大：

> MobX >=5 runs on any browser with ES6 `proxy` support. It will throw an error on startup on older environments such as IE11, Node.js <6 or React Native Android on old JavaScriptCore how-to-upgrade.

> MobX 4 runs on any ES5 browser and will be actively maintained. The MobX 4 and 5 api's are the same and semantically can achieve the same, but MobX 4 has some limitations.


## mobx vs redux

mobx 核心思想: 状态变化引起的副作用应该被自动触发

Action -> State -> Reaction

- mobx开发难度低
- 开发代码量少
- 渲染性能好

## mobx 常用API

- 可观察的数据(observable): observable是一种让数据的变化可以被观察的方法 observable.js
- 对可观察的数据作出反应: computed, autorun, when, Reaction 四个api reactingToObservable.js
- 修改可观察的数据: action

## 结合react

需要 mobx-reack 包

mobx-react.js

## react结合mobx实现todo

## 常用的工具函数

- observe: 不要和 mobx-react 中的 observer 搞混，mobx-react 中的 observer 是一个组件
- toJS
- trace
- spy