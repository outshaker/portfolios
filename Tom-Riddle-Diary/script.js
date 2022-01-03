const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))

const getTimer = () => {
  const start = Date.now()
  return () => {
    return Date.now() - start
  }
}

const timer = getTimer()

const addText = (text) => {
  const loader = document.querySelector('.loader')
  const logger = document.querySelector('.logger')
  const node = document.createElement('div')
  node.innerText = text
  node.setAttribute('t', timer())
  // node.style.animation = 'fade-out 10s ease-in forwards'
  // node.classList.add('fade')
  node.addEventListener('animationend', () => {
    // console.log('end')
    logger.appendChild(node)
    // node.remove()
  })
  loader.appendChild(node)
}

window.addEventListener('load', () => {
  // addText('test fade out effect') // test
  const bar = document.querySelector('.bar')

  bar.addEventListener('keyup', (e) => {
    // console.log('keyup', e.key)
    if (bar.value && e.key === 'Enter') {
      const text = bar.value
      addText(text)
      bar.value = ''
    }
  })
  
  bar.focus()
  bar.addEventListener('blur', () => {
    // console.log('onBlur')
    bar.focus()
  })
})

const play = () => {
  const list = [...document.querySelectorAll('.logger>div')].map((node) => ({ t: parseInt(node.getAttribute('t')), text: node.innerText }))
  if (!list) {
    console.warn('logger has no record')
  }

  const show = async (list, i) => {
    const loader = document.querySelector('.loader')
    const node = document.createElement('div')
    node.innerText = list[i].text
    node.addEventListener('animationend', () => {
      node.remove()
    })
    loader.appendChild(node)
    if (i+1 < list.length) {
      let wait_t = list[i+1].t - list[i].t
      wait_t = (wait_t > 30 * 1000) ? 30 * 1000 : wait_t // max 30s
      console.log(`wait ${wait_t}ms for No.${i+1}`)
      await sleep(wait_t)
      show(list, i+1)
    }
  }
  show(list, 0)
}

const save = () => {
  const logger = document.querySelector('.logger')
  console.log(logger.innerHTML)
  window.localStorage.setItem('log', logger.innerHTML)
}

const load = () => {
  const data = window.localStorage.getItem('log') || ''
  const logger = document.querySelector('.logger')
  logger.innerHTML = data
}

