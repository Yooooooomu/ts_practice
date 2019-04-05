let fn1: (val: string | number) => void = (val) => {
  if ((val as string).length) {
    return (val as string).length
  } else {
    return val.toString().length
  }
}

console.log(fn1(123456789))

import { promisify } from 'util'
import fs from 'fs'
;

(async () => {
  try {
    let result: Buffer = await promisify(fs.readFile)('../README.md')
    console.log(result.toString())
  } catch (err) {
    console.error(err)
  }
})()