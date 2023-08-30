export {modal,toast,elementFromHTML}

const modal = new bootstrap.Modal(document.getElementById('modal_alertas'))
const toast = new bootstrap.Toast(document.getElementById('toast_notification'))

window.soleswebapp = {}

function elementFromHTML(html){
  const template = document.createElement('template')
  template.innerHTML = html.trim()
  return template.content.firstElementChild
}
