/** 类型兼容 */
/////////////////////// 变量
interface Named {
  name: string;
  age: number
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: 'Alice', age: 18, location: 'Seattle', sex: true };
x = y // ok
// x = { name: 'Alice', age: 18, location: 'Seattle', sex: true }; // error

// 总结：赋值方的成员可以比被赋值方的成员多（赋值方必须包含被赋值方的所有成员）！！！！！！！

// 直接赋值必错
// let n2: Named = { name: 'Alice', age: 18, location: 'Seattle', sex: true }; // error，因为Named接口没有location和sex成员

////////////////////// 函数
let fn1: (a: number, b: string, c: boolean) => void = (a, b, c) => { }

// let fn2: (h: number) => void = fn1 // error 赋值方参数比被赋值方参数少，所以不兼容！！！！！！！

let fn3: (r: number, s: string, t: boolean, u: Array<any>) => void = fn1 // ok

// 总结：赋值方的参数成员可以比被赋值方的参数成员少！！！！！！
// (参数名字可以不同，但类型和顺序必须相同，返回值必须相同,[any, void另外算])！！！！！！！！

/////////////////////// 另外
let x1 = (a: number, b: string) => ({ name: 'Alice' });
let y1 = (a: number, b: string, c: boolean) => ({ name: 'Alice', location: 'Seattle' });
// x1 = y1; // error
// y1 = x1; // error, 因为返回值类型不兼容，返回值类型属于变量类型兼任，按照变量类型兼任处理，即多的能兼任少的！！！！！！！！！

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 等于这么写 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓

let x2: (a: number, b: string) => { name: string } = (a: number, b: string) => ({ name: 'Alice' });
let y2: (a: number, b: string, c: boolean) => { name: string, location: string } = (a: number, b: string, c: boolean) => ({ name: 'Alice', location: 'Seattle' });
// x2 = y2; // error
// y2 = x2; // error, 因为返回值类型不兼容，返回值类型属于变量类型兼任，按照变量类型兼任处理，即多的能兼任少的！！！！！！！！！

/** */

enum EventType { Mouse, Keyboard }

interface Event { timestamp: number, a: number }
interface MouseEvent extends Event { x1: number; y1: number }
interface KeyEvent extends Event { keyCode: number }
interface KK { timestamp: number; }

function listenEvent(eventType: EventType, handler: (n: Event) => void) {
  /* ... */
}

listenEvent(EventType.Mouse, (e: KK) => { console.log(e.timestamp) }) // ok,少的可以匹配多的
// listenEvent(EventType.Mouse, (e: MouseEvent) => { console.log(e.x1) }) // error，因为MouseEvent接口的成员比Event接口成员多

listenEvent(EventType.Mouse, (e: Event) => { console.log(e.a) }); // ok，完整匹配
listenEvent(EventType.Mouse, ((e: MouseEvent) => { console.log(e.x1) }) as (n: Event) => void); // ok，利用断言可以实现

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
// listenEvent(EventType.Mouse, (e: number) => { }); // error，根本不匹配
listenEvent(EventType.Mouse, (e: { timestamp: number}) => { console.log(e.timestamp) }); // ok,少的可以匹配多的


// 类与对象字面量和接口差不多，但有一点不同：类有静态部分和实例部分的类型。
// 比较两个类类型的对象时，只有实例的成员会被比较。
// 静态成员和构造函数不在比较的范围内。
class Animal {
  feet!: number;
  constructor(name: string, numFeet: number) { }
}

class Size {
  feet!: number;
  constructor(numFeet: number) { }
}

let a: Animal = new Animal('', 1)
let s: Size = new Size(1)

a = s;  // OK,构造函数不在比较的范围内
s = a;  // OK,构造函数不在比较的范围内