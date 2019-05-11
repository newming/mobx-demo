// es5 实现继承
function Animal() {}
function Dog() {}

Object.defineProperties(Animal.prototype, {
  name: {
    value() {
      return 'Animal'
    }
  },
  say: {
    value() {
      return `i am ${this.name()}`
    }
  }
})

Dog.prototype = Object.create(Animal.prototype, {
  constructor: {
    value: Dog,
    enumerable: false // 不可枚举
  },
  name: {
    value() {
      return 'Dog'
    }
  }
})



// 使用 es6 实现继承
// class Animal {
//   name() {
//     return 'Animal'
//   }
//   say() {
//     return `i am ${this.name()}`
//   }
// }

// class Dog extends Animal {
//   food = 'bone'
//   name() {
//     return 'Dog'
//   }
// }

console.log(new Dog() instanceof Animal)
console.log((new Dog()).say())