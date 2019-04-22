// 修饰器对类的行为的改变，是代码编译时发生的（不是TypeScript编译，而是js在执行机中编译阶段），而不是在运行时。
// 这意味着，修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数。
function Path (target: any) { // 装饰器不需要写返回类型，即不需要写成 function Path (target: any): void { ... }
  console.log('target', target)
  // 不能有返回值，可以返回一个类 => return class { ... }
}

@Path
class HelloService {
}

/** */
function Path4 (target: any) {
  console.log(target)
}

// @path4 // error 装饰器只能用于类(class)或身上类的内部
function na () {}
/** */

function Path2 (...args: Array<any>): any { // 装饰器工厂函数，负责返回一个装饰器
  return (target: any) => {
    console.log(target)
    console.log(args)
  }
}

@(Path2(1, 2, 3)) // 等同于这样写 @Path2(1, 2, 3)
class HelloService2 {
  public a: string = '1'
  constructor () {
    console.log('nmsl')
  }
}

// 五种装饰器
// 在TypeScript中装饰器可以修饰四种语句：类，属性，访问器，方法以及方法参数。

/** 类装饰器 */
interface I1Constructor {
  new (name: string, age: number): any
}

function Path3 (...args: Array<any>): (target: I1Constructor) => void {
  return (constructor) => { // 用作类装饰器时只有一个参数(constructor)
    console.log(constructor)
    constructor.prototype.wsngg || (constructor.prototype.wsngg = {}) // 往构造函数的prototype添加属性
    constructor.prototype.wsngg.nmsl = args[0] // 往构造函数的prototype添加属性
  }
}

@Path3('nmsl')
class HelloService3 {
  public name: string;
  public age: number;
  public sex: boolean | undefined;
  // wsngg: any;
  constructor (name: string, age: number, sex?: boolean) {
    this.name = name
    this.age = age
    this.sex = sex
  }
}

let cHelloService3: I1Constructor = HelloService3
let h1: HelloService3 = new cHelloService3('nmsl', 12)
// console.log(h1.wsngg.nmsl) // 可以打印(虽然编译不通过)
/** */

/** 方法装饰器 */
console.log('\n/**************/\nPath5\n')
function Path5 (): any {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) { // 第三个参数只有是装饰方法才能正确显示，其他的都是undefined
    console.log(target)
    console.log(propertyKey)
    console.log(descriptor)
    if (descriptor) {
      // return { // 如果装饰器用于方法或访问器，则可以返回PropertyDescriptor类型的对象，如下。。 
      // （ps: 这个对象可以通过Object.getOwnPropertyDescriptor(obj, 'key')的方式来获取）
      //   writable: false,
      //   enumerable: true,
      //   configurable: true
      // }
    }
  }
}

class HelloService4 {
  // 动态成员
  @Path5() // 装饰器放在动态成员前target就是该类的原型对象，对这个例子来说就是 { uu: function () { ... } }，console.log(propertyKey) 打印出name
  // 装饰器用于属性的时候不应该有返回值
  public name: string
  // @Path5() // ok, console.log(propertyKey) 打印出age
  public age: number

  @Path5()
  public uu (): number {
    return 1
  }

  // 静态成员
  @Path5() // 装饰器放在静态成员前target就是该类的构造函数 // 而且这个构造函数被赋予了nmsl属性，就是说相当于
  // let constructor = function () {}; constructor.nmsl = 'nmsl'
  static readonly nmsl: string = 'nmsl'
  constructor (name: string = 'nmsl', age: number = 12) {
    this.name = name
    this.age = age
  }
}

let jj = new HelloService4()
console.log(Object.getOwnPropertyDescriptor(HelloService4.prototype, 'uu'))
/** */
