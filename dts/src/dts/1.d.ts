/** 声明合并 */
declare function jQuery (selector: string): void
declare function jQuery (selector: number): number
// 不能写成 declare const jQuery: (selector: any): any // 否则不能合并

declare namespace jQuery {
  interface ajaxSetting {
    method?: 'get' | 'post'
    data?: 'json'
  }
  const ajax: (url: string, config?: ajaxSetting) => void
}
