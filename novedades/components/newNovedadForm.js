export { modalNewNovedades }

import { globalNovedades } from "../novedades.js"

function modalNewNovedades(){
  const div = document.createElement('div')
  div.className = 'modal fade'
  div.id = 'modalNewNovedades'
  div.setAttribute('data-bs-backdrop','static')
  div.setAttribute('data-bs-keyboard','false')
  div.setAttribute('tabindex','-1')
  div.setAttribute('aria-labelledby','staticBackdropLabel')
  div.setAttribute('aria-hidden','true')
  
  div.innerHTML = 
  `
  <div class="modal-dialog" id="novedades_modalDialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">
          <span>Registrando nueva novedad</span>
        </h1>
      </div>
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button id="btnAceptar" type="button" class="btn btn-sm btn-info text-white bg-gradient">
          <span class="visually-hidden spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span class="btn_text" role="status">Aceptar</span>
        </button>
        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
  `

  div.querySelector('.modal-body').append(newNovedadForm())

  document.querySelector('body').append(div)

  const modalForm = new bootstrap.Modal(div)

  globalNovedades.main.querySelector('#novedades_main_div #nuevo_btn').addEventListener('click', () => {
    modalForm.show()
  })
  
}

function newNovedadForm(){
  const div = document.createElement('div')
  div.innerHTML = 
  `
  <form id="novedades_new_form">
    <div class="row">
      <div class="col-5">
        <label for="newNovedadForm_num_empleado" class="form-label">Código Colaborador</label>
        <input name="codigo" type="text" class="form-control" id="newNovedadForm_num_empleado">
      </div>
      <div class="col-7">
        <label for="newNovedadForm_nom_empleado" class="form-label">Nombre Colaborador</label>
        <input name="nombre" type="text" readonly class="form-control bg-body-tertiary text-primary" id="newNovedadForm_nom_empleado">
      </div>
      <div class="col-12 mt-3">
        <label for="newNovedadForm_novedad" class="form-label">Novedad</label>
        <select name="novedad" type="text" class="form-select" id="newNovedadForm_novedad">
          <option selected></option>
          ${tiposNovedades()}
        </select
      </div>
      <div class="col-12 mt-3">
        <label for="observaciones" class="form-label">Informaciones adicionales</label>
        <textarea name="observaciones" class="form-control" id="observaciones" rows="3"></textarea>
      </div>
      <div class="col-12 mt-3">
        <label for="archivosAdjuntos" class="form-label">Archivos adjuntos</label>
        <input name="files" class="form-control" type="file" id="archivosAdjuntos" multiple>
      </div>

    </div>
  </form>
  `

  return div
  
}

function tiposNovedades(){
  let html = ''

  globalNovedades.tiposNovedades.forEach(e => {
    html += `<option value="${e}">${e}</option>`  
  })

  return html
  
}