export { formBtn }

function formBtn(){
  const section = document.createElement('section')

  section.className = 'form_btn_section p-3 d-flex justify-content-end rounded-bottom-2 z-2 bg-white d-none'

  section.innerHTML = `
  <button id="btn_cancel" type="button" class="btn btn-outline-danger btn-sm">Cancel</button>
  <button id="btn_borrar" type="button" class="btn btn-outline-secondary btn-sm ms-2" disabled>Borrar</button>
  <button id="btn_guardar" type="button" class="btn btn-info text-light btn-sm ms-2">Guardar</button>
  `

  return section
}