export { setEstatusHTML, setResponsablesHTML }

import { globalNovedades } from "../novedades.js";

function setEstatusHTML(){
  const select = document.querySelector(`#novedades_main_div #novedades_detalles_estatus_select`)
  const selectFiltro = document.querySelector('#novedades_main_div #filtro_estatus_select_input')
  let html = ''
  
  globalNovedades.estatus.forEach(e => {
    html += `<option value="${e}">${e}</option>`
  })

  select.innerHTML = html
  selectFiltro.innerHTML = '<option value="">Todos</option>' + html
  
}

function setResponsablesHTML(){
  const select = document.querySelector(`#novedades_main_div #novedades_detalles_responsable_select`)
  const selectFiltro = document.querySelector('#novedades_main_div #filtro_responsables_select_input')

  let html = '<option value="Sin Responsable">Sin Responsable</option>'
  
  globalNovedades.responsables.forEach(e => {
    html += `<option value="${e.value}">${e.name}</option>`
  })

  select.innerHTML = html
  selectFiltro.innerHTML = '<option value="">Todos</option>' + html
  
}