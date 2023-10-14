export {modal,toast,disabledBtn,activateBtn}

const modal = new bootstrap.Modal(document.getElementById('modal_alertas'))
const toast = new bootstrap.Toast(document.getElementById('toast_notification'))

window.soleswebapp = {}

function disabledBtn(btn,loadingText){
  const spinner = btn.querySelector('.spinner')
  const btnText = btn.querySelector('.btnText')
  spinner.classList.remove('visually-hidden')
  btnText.textContent = loadingText
  btn.disabled = true
}

function activateBtn(btn,normalText){
  const spinner = btn.querySelector('.spinner')
  const btnText = btn.querySelector('.btnText')
  spinner.classList.add('visually-hidden')
  btnText.textContent = normalText
  btn.disabled = false
}
