export { tableRowClick }

import { globalNovedades } from "../novedades.js"


function tableRowClick(main,tr){
  if(!globalNovedades.permisos) return
  
  let activeTr = globalNovedades.activeTr
  const id = tr.querySelector('.novedades_row_id p').textContent
  const novedad = globalNovedades.novedades.find(e => e.id == id)
  const detalles = main.querySelector('#tabla_detalles')
  const labels = [
    'id',
    'fecha_ingreso',
    'fecha_modificacion',
    'usuario',
    'num_empleado',
    'nom_empleado',
    'novedad',
    'observaciones',
  ]
  
  labels.forEach(lb => detalles.querySelector(`#${lb}`).textContent = novedad[lb])
  
  const dropdown = document.querySelector('#novedades_main_div #novedades_select_adjuntos')
  const ul = document.querySelector('#novedades_main_div #novedades_select_adjuntos ul')
  const selectEstatus = document.querySelector('#novedades_main_div #novedades_detalles_estatus_select')
  const selectResponsable = document.querySelector('#novedades_main_div #novedades_detalles_responsable_select')

  selectEstatus.value = novedad.estatus
  selectResponsable.value = novedad.responsable

  if(globalNovedades.permisos.asignar_responsable) selectResponsable.disabled = false
  else selectResponsable.disabled = true

  if((globalNovedades.permisos.cambiar_estatus || novedad.responsable == globalNovedades.permisos.user) && novedad.responsable != 'Sin Responsable' && novedad.responsable){
    selectEstatus.disabled = false
  }else{
    selectEstatus.disabled = true
  }

  dropdown.classList.add('d-none')
  ul.innerHTML = '<li class="dropdown-item">Sin adjuntos</li>'
  
  if(novedad.files){
    const links = novedad.files.split(';;')
    let html = ''
    links.forEach((link,n) => {
      html += `<li><a class="dropdown-item" href="${link}" target="_blank">Adjunto ${n + 1}</a></li>`
    })
    
    ul.innerHTML = html
    dropdown.classList.remove('d-none')
    
  }

  if(activeTr){
    activeTr.classList.remove('bg_div_color')
    activeTr.classList.remove('text-white')
  }

  tr.classList.add('bg_div_color')
  tr.classList.add('text-white')
  globalNovedades.activeTr = tr

  const detalles_title = document.querySelector('#novedades_main_div #detalles_title')
  
  if(novedad.estatus == 'Completado') {
    detalles_title.classList.remove('bg-info','bg-gradient')
    detalles_title.classList.add('bg_lightgreen')
    detalles_title.querySelector('p').classList.add('text-dark')
  }else{
    detalles_title.classList.add('bg-info','bg-gradient')
    detalles_title.classList.remove('bg_lightgreen')
    detalles_title.querySelector('p').classList.remove('text-dark')
  }
  
}
