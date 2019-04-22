import "reflect-metadata";

/**
Reflect.getMetadata方法的作用是配合装饰器使用可以得出类中成员的类型
class A {
  public c: string
}
可以得出A类的成员c的类型(string)
*/

function logType (target : any, key : string) {
  /* 到目前为止，只有三个可用的键:

  类型元数据使用元数据键"design:type"
  参数类型元数据使用元数据键"design:paramtypes"
  返回值类型元数据使用元数据键"design:returntype"

  */
  const t = Reflect.getMetadata("design:type", target, key); // target:Demo类的原型对象,key:成员名
  console.log(`${key} type: ${t.name}`);// 该成员 key 的定义类型为 string
}

class Demo {
  @logType // apply property decorator
  public attr1!: string;
}

console.log('\n')
