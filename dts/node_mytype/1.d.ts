declare function jjQuery(selector: number): void

declare namespace jjQuery {
  interface ajaxConfig {
    data?: 'json',
    method?: 'get' | 'post'
  }
  const ajax: (url: string, config?: ajaxConfig) => void
}

declare namespace Nmsl {
  interface Nmsl {
    a: string
    b: string
    c: (v1: string, v2: number) => boolean
  }

  interface NmslConstructor {
    new (v1: string): any
  }
  class Nmsl implements Nmsl {
    a: string
    constructor (v1: string)
  }
}

export default jjQuery

export {
  Nmsl
}