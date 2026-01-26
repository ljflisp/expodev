var Ops = Object.create(null)

Ops.obj = (function(exports) {
  const pureObj = (p=null) => Object.create(p)
  const typeCheck = (v) => Object.prototype.toString.call(v)
  const isIterable = (v) => (v != null && typeof v[Symbol.iterator] === 'function')
  const isArray = Array.isArray
  const isString = (n) => typeof n === 'string'
  const isNum = (n) => typeof n === 'number'
  const isTag = (v) => v instanceof HTMLElement
  const isBool = (v) => typeof v === 'boolean' || v instanceof Boolean
  const isUndefined = (n) => typeof n === 'undefined'

  const genRange = ({start=0, end, step=1}) => {
    const length = Math.floor((end - start) / step) + 1;
    return Array.from({length}, (_,i) => start + i * step)
  }

  const {toUpperCase, toLowerCase} = String.prototype
  const string = pureObj()
  string.split = (s,s2) => s?.split(s2)
  string.upper = (s) => toUpperCase.call(s)
  string.lower = (s) => toLowerCase.call(s)
  string.cap = (s) => string.upper(s[0]) + s.slice(1)

  exports.isTag = isTag
  exports.isNum = isNum
  exports.isBool = isBool
  exports.string = string
  exports.isArray = isArray
  exports.pureObj = pureObj
  exports.genRange = genRange
  exports.isString = isString
  exports.typeCheck = typeCheck
  exports.isIterable = isIterable
  exports.isUndefined = isUndefined
  
  return exports;
})({})

Ops.dom = (function(exports) {
  const {pureObj, isArray, isUndefined, isNum, isString, isTag, isBool} = Ops.obj
  const d = globalThis.document
  if (isUndefined(d)) return {}

  const q = ({p=d,v}) => p.querySelector(v)
  const qa = ({p=d,v,idx}) => {
    const f = () => p.querySelectorAll(v);
    if (isUndefined(idx)) {
      return f()
    } 
    else if (isNum(idx)) {
      return f()[idx]
    }
    else if (isArray(idx)) {
      return idx.map(i => f()[i])
    }
  }
  
  const toggle = ({p=d, v, cls, cond, idx, all=true, debug=false}) => {
    if (debug) print('log', 'toggle: Ops.dom.toggle')
    if (isString(v) && !isArray(idx) && !all) {
      q({p:p,v:v}).classList.toggle(cls, cond)
      if (debug) print('log', 'Single')
    }
    else if (isTag(v)) {
      v.classList.toggle(cls, cond)
      if (debug) print('log', 'Tag')
    }
    else if (isArray(idx)) {
      qa({v:v, idx: idx}).forEach((node,i) => toggle({v: node, cls: cls, cond: (isBool(cond)||isUndefined(cond)) ? cond : cond[i]}))
      if (debug) print('log', 'Choose range')
    }
    else if (all) {
      qa({p:p,v:v}).forEach(v => v.classList.toggle(cls, cond))
      if (debug) print('log', 'All')
    }
  }
  
  const print = (k,v) => console[k](v)
  
  const msg = pureObj

  msg.alert = (s) => alert(s)

  exports.q = q
  exports.qa = qa
  exports.msg = msg
  exports.print = print
  exports.toggle = toggle
  
  return exports;
})({})

const test = () => {
  Ops.dom.qa({v: 'h1', idx: Ops.obj.genRange({end:2,step:1})}).forEach(s => {
    let text = document.createTextNode('hello world')
    s.append(text)
  })
  const dom = Ops.dom
  dom.toggle({v: 'h1', cls: 'red', idx: [0,1,2]})
  dom.q({p: dom.qa({v:'h1', idx: 2}), v: 'span'}).innerHTML = 1
}