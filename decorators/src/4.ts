/* 

用途

其实所有的用途都是一个目的，给对象添加额外的信息，但是不影响对象的结构。
这一点很重要，当你给对象添加了一个原信息的时候，对象是不会有任何的变化的，不会多 property，也不会有的 property 被修改了。
但是可以衍生出很多其他的用途。

*/

import "reflect-metadata";

const formatMetadataKey = Symbol("format");
const wsndMetadataKey = Symbol("wsnd");

function format(formatString: string) { // 装饰器工厂
  return Reflect.metadata(formatMetadataKey, formatString); // 返回一个装饰器 ([一个key，最好是symbol唯一的], [你的数据,any类型])
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey); // （[一个key，和metadata第一个参数一样]，[类], [类的成员,字符串类型]）
}

class Greeter {
  @format("Hello, %s")
  greeting: string;

  @Reflect.metadata(wsndMetadataKey, {a: 1, b: 2})
  wsnd!: number;

  constructor(message: string) {
    this.greeting = message;
  }
  greet(): string {
    let formatString: string = getFormat(this, "greeting") as string; // 返回 Hello, %s
    return formatString.replace("%s", this.greeting);
  }
}

let g1 = new Greeter('nmsl')
console.log(g1.greet())
console.log(Reflect.getMetadata(wsndMetadataKey, g1, "wsnd"))

console.log('\n=====================\n')
const item1MetadataKey: symbol = Symbol('item1')

@Reflect.metadata(item1MetadataKey, 'sss')
class C2 {
  @Reflect.metadata(item1MetadataKey, () => { console.log('wsnd') })
  public item1!: string;
}

let c21 = new C2()
Reflect.getMetadata(item1MetadataKey, c21, 'item1')()
console.log(Reflect.getMetadata(item1MetadataKey, C2))

Reflect.defineMetadata(item1MetadataKey.toString(), {a: 'a'}, c21, 'item1')
console.log(Reflect.getMetadata(item1MetadataKey.toString(), c21, 'item1'))
Reflect.getMetadata(item1MetadataKey, c21, 'item1')()