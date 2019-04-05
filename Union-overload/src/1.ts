function fn1(val: string | number): number {
  if (typeof val === 'string') {
    return val.length
  } else if (typeof val === 'number') {
    return val.toString().length
  } else {
    return -1
  }
}

console.log(fn1('sa5d654'))

interface Ifn2 {
  (name: string, age: number): string
}

let fn2: Ifn2 = (name, age) => {
  return `${name} + ${age}`
}

console.log(fn2('mao', 54))

// 需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必须参数了：

let fn3: (user: string, password: string, host?: string, port?: number) => void = (user, password, string, port) => {
  console.log(`user: ${user}\npassword: ${password}`)
}

fn3('root', '123456')

function myReverse (val: string): string
function myReverse (val: number): number

function myReverse (val: string | number): string | number {
  if (typeof val === 'string') {
    return val.split('').reverse().join()
  } else if (typeof val === 'number') {
    return val.toString().split('').reverse().join()
  } else {
    return val
  }
}

myReverse('ssdkkjad')
myReverse('sad')
myReverse(123456)
