/* interface Lengthwise {
  length: number
}

function loggingIdentity<T> (arg: T): T {
  let len = arg.length // 类型“T”上不存在属性“length”
  return arg
} */


/** 泛型约束 */
interface Lengthwise {
  length: number
}

// T类型必须包含Lengthwise接口里面的所有成员
function loggingIdentity<T extends Lengthwise> (arg: T): T {
  console.log(arg.length)
  return arg
}

// loggingIdentity<boolean>(true) // 类型“boolean”不满足约束“Lengthwise”
loggingIdentity<string>('123456')

function copyFields<T extends U, U>(target: T, source: U): void {
  for (let id in source) {
    target[id] = (source as T)[id] // 必须加断言，不然U类型不能赋值给T类型
  }
}
let o1 = {a: 1, b: 2, c: 3, d: 111}
copyFields<{a: number, b: number, c: number, d: number}, {b: number, d: number}>(o1, {b: 666, d: 999})
console.log(o1)
/**  */

/** 泛型接口 */
interface Ia {
  <T = string>(v1: T): T
}

let p1: Ia = (v1) => {
  return v1
}

p1<number>(1)
/** */

class GenericNumber<T> {
    zeroValue!: T;
    add!: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; }; // 因为 52 行把number传入泛型里面，所以可以x + y
