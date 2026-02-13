// read custom message from query strings
// Tutorial -> https://youtu.be/6ojp1iWUKw8

const urlSearchParams = new URLSearchParams(window.location.search)

const messageCustom = urlSearchParams.get('message')

if (messageCustom) {

  const mainMessageElement = document.querySelector('#mainMessage')
  mainMessageElement.textContent = decodeURI(messageCustom)
}

// Loader / splash logic (interactivo: requiere nombre 'Yadhira')
(() => {
  const loader = document.getElementById('loader')
  const progressEl = document.getElementById('progressPercent')
  const nameInput = document.getElementById('visitorName')
  const slider = document.getElementById('unlockSlider')
  const enterBtn = document.getElementById('enterBtn')

  function finishLoading(visitorName) {
if (progressEl) progressEl.textContent = '100%'
  if (loader) loader.classList.add('hidden')
  document.body.classList.remove('loading')

  // 🔊 reproducir música
  const music = document.getElementById('bgMusic')
  if (music) {
    music.play().catch(() => {
      console.log("Autoplay bloqueado por el navegador");
    })
  }

  if (visitorName) {
    const mainMessageElement = document.querySelector('#mainMessage')
    if (mainMessageElement) {
      mainMessageElement.textContent += `\n\nCon cariño, Jose UWU`
    }
  }
  }

  function updateState() {
    const name = (nameInput && nameInput.value || '').trim().toLowerCase()
    const matchesYadhira = name === 'yadhira'
    if (matchesYadhira) {
      if (slider) slider.value = 100
      if (progressEl) progressEl.textContent = `100%`
      if (enterBtn) enterBtn.disabled = false
    } else {
      const value = Number(slider && slider.value || 0)
      if (progressEl) progressEl.textContent = `${value}%`
      if (enterBtn) enterBtn.disabled = true
    }
  }

  if (slider) slider.addEventListener('input', updateState)
  if (nameInput) {
    nameInput.addEventListener('input', updateState)
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const name = nameInput.value.trim()
        if (name.toLowerCase() === 'yadhira') finishLoading(name)
      }
    })
  }
  if (enterBtn) enterBtn.addEventListener('click', () => finishLoading((nameInput && nameInput.value) ? nameInput.value.trim() : ''))

  document.addEventListener('keydown', (e) => {
    if (!document.body.classList.contains('loading')) return
    const active = document.activeElement
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return
    const name = (nameInput && nameInput.value || '').trim()
    if (name.toLowerCase() === 'yadhira') finishLoading(name)
  })

  // estado inicial
  updateState()
})();

// the tutorial starts here

const btnOpenElement = document.querySelector('#open')
const btnCloseElement = document.querySelector('#close')

btnCloseElement.disabled = true



btnOpenElement.addEventListener('click', ()=> {
  btnOpenElement.disabled = true
  btnCloseElement.disabled = false
  const coverElement = document.querySelector('.cover')
  coverElement.classList.add('open-cover')

  setTimeout(()=>{
    //
    coverElement.style.zIndex = -1
    
    const paperElement = document.querySelector('.paper')
    paperElement.classList.remove('close-paper')
    paperElement.classList.add('open-paper')

    // animacion del corazón
    const heartElement = document.querySelector('.heart')
    heartElement.style.display = 'block'
  
  }, 500)

})
btnCloseElement.addEventListener('click', ()=> {
  btnOpenElement.disabled = false
  btnCloseElement.disabled = true

  const coverElement = document.querySelector('.cover')
  const paperElement = document.querySelector('.paper')
  paperElement.classList.remove('open-paper')
  paperElement.classList.add('close-paper')
  
  setTimeout(()=>{
    coverElement.style.zIndex = 0
    coverElement.classList.remove('open-cover')

    // animacion del corazón
    const heartElement = document.querySelector('.heart')
    heartElement.style.display = 'none'
  },500)
})