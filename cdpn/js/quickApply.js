function quickApply(str, fn, ele, options={}) {
  if (!document.querySelector(ele) && ele != 'style') {
    console.error(`quickApply: selector \`${ele}\` not found!`)
    return
  }
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

const addPrefix = (prefix, str, separator=' ') => str.split(separator).map(s=>prefix+s).join(separator)

const paddingZero = (num) => {
  return num.toString().padStart(2,'0')
}

const elesArr = (str, sign, separator=' ') => str.split(separator).map(s => document.querySelector(sign+s))

const logicCheck = (arr, type = 'and') => type === 'and' ? arr.every(Boolean) : arr.some(Boolean)

const singleQuery = s => document.querySelector(s)
const capitalize = s => s.at(0).toUpperCase()+s.slice(1)

const activeLink = (str, fn = () => {}) => {
  let list = queryAll(str)
  list[0].classList.add("active")
  list.forEach((item) => item.onclick = () => {
    list.forEach((item) => item.classList.remove("active"))
    item.classList.add("active")
    fn(item)
  })
}

const showCalendar = (str, sign='#') => {
  const eles = elesArr(str, sign)
  let lang = navigator.language
  let date = new Date()

  let month = date.toLocaleString(lang, { month: "long" })
  let weekday = date.toLocaleString(lang, { weekday: "long" })
  let day = String(date.getDate()).padStart(2, '0')
  let year = date.getFullYear()
  const rizi = [month, weekday, day, year]

  eles.forEach((s, i) => s.innerHTML = rizi[i])
}

const comingSoon = (ele="#launch") => {
  const countDownDate = new Date(`Jan 1, ${new Date().getFullYear()+1} 00:00:00`).getTime()
  const x = setInterval(() => {
    const now = new Date().getTime()
    const distance = (countDownDate - now) / 1000
    const dhms = [distance / 86400, distance % 86400 / 3600, distance % 3600 / 60, distance % 60].map(s => Math.floor(s))
    if (Array.isArray(ele)) {
      ele.forEach((s, i) => singleQuery(s).innerHTML = paddingZero(dhms[i]))
    }
    else {
      singleQuery(ele).innerHTML = 'dhms'.split('').map((s, i) => paddingZero(dhms[i])+s).join(' ')
    }
    if (distance < 0) {
      clearInterval(x)
      if (Array.isArray(ele)) {
        ele.forEach(s => singleQuery(s).innerHTML = '00')
      } else {
        singeQuery(ele).innerHTML = 'EXPIRED'
      }
    }
  }, 1000)
}