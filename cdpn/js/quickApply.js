function quickApply(str, fn, ele, options={}) {
  const {insert=false, pos='afterbegin', styleAnim: {toStr=false,animName='anim'}={}} = options
  let data = str.split(' ')
  if (/\|/.test(str)) data = data.map(s => s.split('|'))
  const Z = (fn) => data.map(fn).join('')
  if (ele == 'style') {
    let style = document.createElement('style')
    style.innerHTML = toStr ? `@keyframes ${animName}{`+Z(fn)+'}' : Z(fn)
    document.head.appendChild(style)
  } else {
    if (insert) {
      document.querySelector(ele).insertAdjacentHTML(pos, Z(fn))
    } else {
        document.querySelector(ele).innerHTML = Z(fn)
    }
  }
}