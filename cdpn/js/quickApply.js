function quickApply(str, fn, ele, options={}) {
  const {insert=false, pos='afterbegin', styleAnim: {toStr=false,animName='anim'}={}} = options
  const data = str.split(' ').map(s => s.split('|'))
  if (data[0].length == 1) data.flat()
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
