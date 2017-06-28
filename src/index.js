'use strict'

import parse from './vendor/postcss-safe-parser/parse'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'

const rVendorPrefix = /^-(?:webkit|moz|o)-/
const upperCamelCase = str => upperFirst(camelCase(str))
const capitalizePropertyName = name => rVendorPrefix.test(name) ? upperCamelCase(name) : camelCase(name)

export default (strings, ...interpolations) => {
  let str = ''
  for (let i = 0; i < strings.length; i++) {
    str += strings[i]
    if (interpolations[i] == null) {
      continue
    }
    str += interpolations[i]
  }
  return parse(str).nodes
    .reduce((style, {prop, value}) => {
      style[capitalizePropertyName(prop)] = value
      return style
    }, {})
}
