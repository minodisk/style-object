import {parse} from 'css'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'

const rVendorPrefix = /^-(?:webkit|moz|o)-/
const upperCamelCase = str => upperFirst(camelCase(str))
const capitalizePropertyName = name => rVendorPrefix.test(name) ? upperCamelCase(name) : camelCase(name)

export default function style (strings, ...interpolations) {
  let str = 'div {'
  for (let i = 0; i < strings.length; i++) {
    str += strings[i]
    if (interpolations[i] == null) {
      continue
    }
    str += interpolations[i]
  }
  str += '}'
  return parse(str).stylesheet.rules
    .filter(({type, selectors}) => type === 'rule' && selectors[0] === 'div')
    .reduce((style, { declarations }) => {
      return declarations
        .filter(({type}) => type === 'declaration')
        .reduce((style, {property, value}) => {
          style[capitalizePropertyName(property)] = value
          return style
        }, style)
    }, {})
}
