export { update_table,update_resumen,hide_edition_form,show_edition_form }

import { requerimientos_global } from "../compras.js"

function update_table(){
  const fragment = document.createDocumentFragment()
  const table_columns = [
    'id', //hidden
    'requerimiento',
    'fecha',
    'no_oc',
    'monto_oc',
    'suplidor',
    'condicion_pago',
    'estatus_pago',
    'estatus'
  ]

  requerimientos_global.data_requerimientos.forEach(registro => {
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

function update_resumen() {
  let html_resumen = ''
  const estatus_counter = {}
  requerimientos_global.estatus_list.forEach(e => {
    estatus_counter[e] = requerimientos_global.data_requerimientos.filter(ticket => ticket.estatus == e).length
    html_resumen += `<li class="list-group-item d-flex justify-content-between align-items-center p-1 rounded-4"><span>${e}</span><span class="badge bg-primary rounded-pill">${estatus_counter[e]}</span></li>`

  })
  resumen_estatus_list.innerHTML = html_resumen
} 

function hide_edition_form(){
  document.querySelector('.form_section').classList.add('d-none')
  document.querySelector('.form_btn_section').classList.add('d-none')
  document.querySelector('#resumen_section').classList.remove('d-none')
  document.querySelector('#form_contabilidad_fieldset').classList.remove('d-none')
  document.querySelector('#form_tesoreria_fieldset').classList.remove('d-none')
  document.querySelector('main').classList.remove('creando_nuevo')
  if(requerimientos_global.active_table_tr) requerimientos_global.active_table_tr.classList.remove('active')
}

function show_edition_form(){
  const form_section = document.querySelector('.form_section')
  document.querySelector('#edition_form').reset()
  form_section.classList.remove('d-none')
  document.querySelector('.form_btn_section').classList.remove('d-none')
  document.querySelector('#resumen_section').classList.add('d-none')
  form_section.scroll(0,0)
}