function quickApply(str, fn, ele, options={}) {
  const {insert=false, pos='afterbegin', separator=' ', style: {isAnim=false, animName='anim', styleId='my-style'}={}} = options
  let data
  if (Array.isArray(str)) {
    data = str
  } else {
    data = str.split(separator)
  }
  if (/\|/.test(str)) data = data.map(s => s.split('|'))
  const Z = (fn) => data.map(fn).join('')
  if (ele == 'style') {
    const existStyle = document.querySelector('style#'+styleId)
    let cssRuleStr = isAnim ? `@keyframes ${animName}{`+Z(fn)+'}' : Z(fn)

    if (existStyle) {
      existStyle.innerHTML += cssRuleStr
    } else {
      let style = document.createElement('style')
      style.id = styleId
      style.innerHTML = cssRuleStr
      document.head.appendChild(style)
    }
  } else {
    if (insert) {
      document.querySelector(ele).insertAdjacentHTML(pos, Z(fn))
    } else {
        document.querySelector(ele).innerHTML = Z(fn)
    }
  }
}

function quickQuery(str, sign='', separator=' ') {
  return str.split(separator).map(s => document.querySelector(sign+s))
}

const queryAll = (str, scope=document, separator = " ") => {
  if (!str.includes(separator)) {
    return scope.querySelectorAll(str);
  } else {
    return str.split(separator).map((s) => document.querySelector(s));
  }
};

const paddingZero = (num) => {
  return num.toString().padStart(2,'0')
}

const elesArr = (str, sign, separator=' ') => str.split(separator).map(s => document.querySelector(sign+s))

const logicCheck = (arr, type = 'and') => type === 'and' ? arr.every(Boolean) : arr.some(Boolean)

const singleQuery = s => document.querySelector(s)

const activeLink = (str) => {
  let list = queryAll(str)
  list[0].classList.add("active")
  list.forEach((item) => item.onclick = () => {
    list.forEach((item) => item.classList.remove("active"))
    item.classList.add("active")
  })
}