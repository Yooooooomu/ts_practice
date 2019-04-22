function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) { // 对泛型进行约束，即必须传一个类(也可以说传一个构造函数)
  return class extends constructor { // 返回一个新的class
    newProperty = "new property";
    hello: string = "override";
    // constructor (...rest: any[]) { // 无视这段代码
    //   super()
    //   this.hello = rest[0] // 最后实例化时会打印 { property: 'property', hello: 'world', newProperty: 'new property' }
    // }
  }
}

@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}

console.log(new Greeter("world")); // 这里new Greeer相当于是对新的类进行实例化，不是实例化Greeter类，打印{ property: 'property', hello: 'override', newProperty: 'new property' }

/** 访问器装饰器 */
console.log('\n\n访问器装饰器\n')
function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target)
    console.log(propertyKey)
    console.log(descriptor)
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() { return this._x; }

  // 不能向多个同名的 get/set 访问器应用修饰器
  // @configurable(false) // error
  /* set x(val: number) {
    this._x = val + 1
  } */

  @configurable(false)
  get y() { return this._y; }
}

let p1: Point = new Point(1, 2)