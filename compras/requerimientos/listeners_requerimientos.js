export {setRequerimientosListeners}

import { requerimientos_global } from "../compras.js"
import { hide_edition_form,show_edition_form,update_table,update_resumen } from "./renders_requerimientos.js"
import { modal } from "../../scripts.js"
import { after_deleting, after_save_clicking } from "./functions_requerimientos.js"


function setRequerimientosListeners(){
  const nuevo_btn = document.getElementById('nuevo_btn')
  const btn_guardar = document.getElementById('btn_guardar')
  const btn_borrar = document.getElementById('btn_borrar')
  const btn_cancel = document.getElementById('btn_cancel')
  const id_input = document.querySelector('#id_input')
  const form_section = document.querySelector('.form_section')

  nuevo_btn.addEventListener('click', (e) => {
    hide_edition_form()
    show_edition_form()
    form_contabilidad_fieldset.classList.add('d-none')
    form_tesoreria_fieldset.classList.add('d-none')
    document.querySelector('main').classList.add('creando_nuevo')
  })
  
  btn_guardar.addEventListener('click', e => {
    let registro
    const id = id_input.value

    if(id) registro = requerimientos_global.data_requerimientos.find(el => el.id == id)
    
    if(!fecha_input.value){
      modal_body_span.textContent = 'El campo de fecha es obligatorio.'
      modal.show()
      if(registro) registro.editando = false
      return
    }
    
    hide_edition_form()
    after_save_clicking()
  })
  
  btn_borrar.addEventListener('click', e => {
    const id = id_input.value
  
    if(!id) return
  
    requerimientos_global.ticket_seleccionado.eliminando = true
  
    update_table()
    
    const registro = {id}

    const url = 'https://script.google.com/macros/s/AKfycbz3B6q-240Nc5p-8_Zd8BU2TpjHW69Tgu0BPvpYwrHHthDddQFCeL4lroQKw9n92v3T/exec'

    const jsonData = {
      action : 'DELETE',
      data : {registro},
      token : sessionStorage.getItem('soles_webapp_session')
    }
      
    const options = {
      method: "POST",
      Headers: {"Content-Type": "application/json"},
      body: JSON.stringify(jsonData)
    }

    fetch(url,options)
    .then(res => res.json())
    .then(res => {
      after_deleting(id,res)
    })
  
    hide_edition_form()
    
  })
  
  btn_cancel.addEventListener('click', (e) => {
    hide_edition_form()
  })
  
  document.addEventListener('click', (e) => {
    const target = e.target
  
    if(target.matches('tbody tr td')){
      hide_edition_form()
      show_edition_form()

      requerimientos_global.active_table_tr = target.parentElement
      requerimientos_global.active_table_tr.classList.add('active')

      const id_buscado = target.parentElement.querySelector('td').textContent
      const ticket = requerimientos_global.data_requerimientos.find(e => e.id == id_buscado)

      if(!ticket) return
  
      requerimientos_global.ticket_seleccionado = ticket
      
      Object.keys(requerimientos_global.ticket_seleccionado).forEach(prop => {
        const element = document.querySelector(`#${prop}_input`)
        if(!element) return
        element.value = requerimientos_global.ticket_seleccionado[prop]
      })

      document.querySelector('main').classList.add('creando_nuevo')
  
    }
  
    if(target.matches('#to_pdf_btn')){
      printing_format()
      
    }
  
    
  })
  
  document.addEventListener('change', (e) => {
    const target = e.target
  
    if(target.matches('#empresa_input')){
      const suplidores = requerimientos_global.data_suplidores.filter(e => e['empresa'] == target.value)
      let html = ''
  
      suplidores.forEach(suplidor => {
        html += `<option value="${suplidor.nombre}">`
      })
  
      suplidor_dataList.innerHTML = html
      suplidor_input.value = ''
      no_auxiliar_input.value = ''
  
      
    }
  
    if(target.matches('#filtro_input')){
      document.querySelectorAll('.table_section tbody tr').forEach(el => {
        if(target.value != 'Selecciona un estatus'){
          const estatus = el.querySelector('td[prop="estatus"]').textContent
          if(estatus != target.value) el.classList.add('d-none')
          else el.classList.remove('d-none')
        }else{
          el.classList.remove('d-none')
        }
        
      })
      
    }
    
  })
  
  document.addEventListener('input', e => {
    const target = e.target
  
    if(target.matches('#no_auxiliar_input') && empresa_input.value){
      suplidor_input.value = ''
      
      const find = requerimientos_global.data_suplidores.find(e => e.empresa == empresa_input.value && e.codigo == target.value)
  
      if(!find) return
  
      suplidor_input.value = find.nombre
      
    }
  
    if(target.matches('#suplidor_input') && empresa_input.value){
      no_auxiliar_input.value = ''
  
      const find = requerimientos_global.data_suplidores.find(e => e.empresa == empresa_input.value && e.nombre == target.value)
  
      if(!find) return
  
      no_auxiliar_input.value = find.codigo
      
    }
  
    if(target.matches('#search_input')){
      hide_edition_form()
      const search_array = target.value.split(';')
  
      document.querySelectorAll('.table_section tbody tr').forEach(tr => {
        const id = tr.querySelector('td[prop="id"]').textContent
        const find = requerimientos_global.data_requerimientos.find(req => req.id == id)
        let boolean = true
  
        if(!find) return
  
        const data = Object.entries(find).join("").toLowerCase()
  
        for(let i = 0; i < search_array.length; i++){
          const searchText = search_array[i].toLowerCase()
          if(!data.includes(searchText)){
            boolean = false
            break
          }
        }
  
        if(boolean){
          tr.classList.remove('d-none')
        }else{
          tr.classList.add('d-none')
        }
  
  
      })
    }
  
    if(target.matches('#chk_input')){
      tbk_input.value = ''
  
      if(target.value) tbk_input.disabled = true
      else tbk_input.disabled = false
      
    }
  
    if(target.matches('#tbk_input')){
      chk_input.value = ''
  
      if(target.value) chk_input.disabled = true
      else chk_input.disabled = false
      
    }
    
  })
}

