export { update_resumen_documentacion,update_table_documentacion,show_edition_form_documentacion,hide_edition_form_documentacion }

import { documentacion_global } from "../compras.js"


function update_table_documentacion(){
  const fragment = document.createDocumentFragment()
  const table_columns = [
    'id', //hidden
    'no_solicitud',
    'no_oc',
    'fecha',
    'no_auxiliar',
    'suplidor',
    'monto_oc',
    'no_conduce',
    'no_factura',
    'no_recepcion',
    'estatus'
  ]

  documentacion_global.data_documentacion.forEach(registro => {
    const tr = document.createElement('tr')
    
    if(registro.eliminando) tr.classList.add('eliminando')
    else if(registro.editando) tr.classList.add('editando')
    
    let html = ''

    table_columns.forEach(prop => {
      if(prop == 'estatus' && registro.eliminando){
        html += `<td prop="${prop}">Eliminando...</td>`
      }else if(prop == 'estatus' && registro.editando){
        html += `<td prop="${prop}">Editando...</td>`
      }else if(prop == 'estatus' && registro.estatus_forzado){
        html += `<td prop="${prop}">${registro.estatus_forzado}</td>`
      }else{
        html += `<td prop="${prop}">${registro[prop]}</td>`
      }
    })
    
    tr.innerHTML = html
    fragment.append(tr)
  })

  const tbody = document.querySelector('.table_section tbody')
  tbody.innerHTML = ''
  tbody.append(fragment)
}

function update_resumen_documentacion() {
  let html_resumen = ''
  const estatus_counter = {}
  documentacion_global.estatus_list.forEach(e => {
    estatus_counter[e] = documentacion_global.data_documentacion.filter(ticket => ticket.estatus == e).length
    html_resumen += `<li class="list-group-item d-flex justify-content-between align-items-center p-1 rounded-4"><span>${e}</span><span class="badge bg-primary rounded-pill">${estatus_counter[e]}</span></li>`

  })
  resumen_estatus_list.innerHTML = html_resumen
} 

function hide_edition_form_documentacion(){
  document.querySelector('.form_section').classList.add('d-none')
  document.querySelector('.form_btn_section').classList.add('d-none')
  document.querySelector('#resumen_section').classList.remove('d-none')
  document.querySelector('main').classList.remove('creando_nuevo')
  document.querySelector('#form_edition_div').classList.remove('d-none')
  if(documentacion_global.active_table_tr) documentacion_global.active_table_tr.classList.remove('active')
}

function show_edition_form_documentacion(){
  document.querySelector('main').classList.add('creando_nuevo')
  document.querySelector('#edition_form').reset()
  document.querySelector('.form_section').classList.remove('d-none')
  document.querySelector('.form_btn_section').classList.remove('d-none')
  document.querySelector('#resumen_section').classList.add('d-none')

}