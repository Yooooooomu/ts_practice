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
