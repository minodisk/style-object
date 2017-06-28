const style = require('./lib/index').default
const {deepEqual} = require('assert')
const {describe, it} = require('mocha')

describe('style', () => {
  it('should be valid object', () => {
    const got = style`
      background-color: red;
    `
    deepEqual(got, {
      backgroundColor: 'red'
    })
  })
})
