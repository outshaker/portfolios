const getTimer = () => {
  const start = Date.now()
  return () => {
    return Math.floor((Date.now() - start) / 1000)
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

