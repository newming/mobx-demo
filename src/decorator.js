function log(target) {
  // console.log(target) // Numberic
  const desc = Object.getOwnPropertyDescriptors(target.prototype)
  // console.log(desc) // {add: {value, writable, emumerable, configurable}, constructor: {}}
  for (const key of Object.keys(desc)) {
    if (key === 'constructor') {
      continue
    }
    const func = desc[key].value
    if ('function' === typeof func) {
      Object.defineProperty(target.prototype, key, {
        value(...args) {
          console.log('before ' + key)
          const ret = func.apply(this, args)
          console.log('after ' + key)

          return ret
        }
      })
    }
  }
}

function readonly(target, key, descriptor) {
  // console.log(descriptor)
  descriptor.writable = false
}

function validate(target, key, descriptor) {
  const func = descriptor.value
  descriptor.value = function(...args) {
    for (let num of args) {
      if ('number' !== typeof num) {
        throw new Error(`"${num}" is not a number`)
      }
    }
    return func.apply(this, args)
  }
}

// 类修饰器
@log
class Numberic {
  // 类属性成员修饰器
  @readonly PI = 3.1415926;

  // 类方法成员修饰器
  @validate
  add(...nums) {
    return nums.reduce((p, n) => (p + n), 0)
  }
}

// 1. 验证类修饰器
// var res = (new Numberic()).add(1, 23)
// console.log(res)

// 2. 验证类属性修饰器
// new Numberic().PI = 100 // Uncaught TypeError readonly

// 3. 验证类方法修饰器
new Numberic().add(1, 3, 'x')
