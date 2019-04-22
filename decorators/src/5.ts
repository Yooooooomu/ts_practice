import "reflect-metadata";

const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) { // 作为参数装饰器时参数必须是这样的格式，否则会提示接口错误签名不正确之类的报错
  // console.log(target) // 类的原型对象
  // console.log(propertyKey) // 成员名(即函数名)
  // console.log(parameterIndex) // 参数索引 (...rect)
  let existingRequiredParameters: number[] = [];
  existingRequiredParameters.push(parameterIndex); // existingRequiredParameters 为 [0]
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function> | PropertyDescriptor) {
  let method = descriptor.value as Function;
  descriptor.value = function (...rect: Array<any>) {
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName); // [0]
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (parameterIndex >= rect.length || rect[parameterIndex] === undefined) {
          throw new Error("Missing required argument.");
        }
      }
    }
    // console.log(this) // this是g1实例
    return method.apply(this, rect);
  }
}

class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  /** 装饰器的执行顺序 先执行required，再执行validate */
  @validate
  greet(@required name: string) {
    return "Hello " + name + ", " + this.greeting;
  }
}

let g1: Greeter = new Greeter('nmsl')
let msg = g1.greet('ok') // 因为是g1调用了greet，所以this指g1 // 看25行输出
console.log(msg)
let msg2 = g1.greet('ok2')
console.log(msg2)