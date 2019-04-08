interface I1 {
  name: string
  age: number
}

let a1: I1 = {
  name: '',
  age: 1
}

let obj = {
  name: '1',
  age: 2,
  b: 2
}

let a2: I1 = obj // 这样子赋值允许额外的成员

interface I2 {
  name: string
  age: number
  [key: string]: string | number // 默认可选，允许额外成员，但值的返回值必须包含其他成员的返回值
}

let a3: I2 = {
  name: 'a0',
  age: 1
}

class Animal {
  public sleep (): number {
    return 1
  }
}

interface dosth extends Animal {
  run (): void
  eat(): void
}

let animal1: dosth = {
  run () {},
  eat () {},
  // sleep (): string {
  //   return '1'
  // }
  sleep (): number {
    return NaN
  }
}

interface Igg {
  (name: string): string
  a: number,
  b (): void
}

function getIgg (): Igg {
  let igg = ((name: string) => name) as Igg
  igg.a = 1
  igg.b = () => {}
  return igg
}