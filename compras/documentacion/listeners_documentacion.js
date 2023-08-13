export { setRequerimientosListeners_documentacion }

import { documentacion_global } from "../compras.js"
import { hide_edition_form_documentacion,show_edition_form_documentacion } from "./renders_documentacion.js"
import { after_save_clicking_documentacion,after_deleting_documentacion } from "./functions_documentacion.js"
import { update_resumen_documentacion,update_table_documentacion } from "./renders_documentacion.js"

function setRequerimientosListeners_documentacion(){
  const nuevo_btn = document.getElementById('nuevo_btn')
  const btn_guardar = document.getElementById('btn_guardar')
  const btn_borrar = document.getElementById('btn_borrar')
  const btn_cancel = document.getElementById('btn_cancel')
  const id_input = document.querySelector('#id_input')
  const form_section = document.querySelector('.form_section')
  const link_evidencia = document.querySelector('#link_evidencia')

  nuevo_btn.addEventListener('click', (e) => {
    document.querySelector('#form_edition_div').classList.add('d-none')
    show_edition_form_documentacion()
  })
  
  btn_guardar.addEventListener('click', e => {
    hide_edition_form_documentacion(true)
  
    setTimeout(() => {
      const file = file_input.files[0]
      
      if(file){
        readXlsxFile(file).then(rows => {
          let filas_encabezado = 0
          for(let i = 0; i < rows.length; i++){
            if(rows[i][0] == 'IDNUMERO') break
            filas_encabezado++
          }
          rows.splice(0,filas_encabezado)
          after_save_clicking_documentacion(rows)
        })
      }else{
        after_save_clicking_documentacion()
      }
    },0)
  
  })
  
  btn_borrar.addEventListener('click', e => {
  
    if(!id_input.value) return
  
    documentacion_global.ticket_seleccionado.eliminando = true

    const url = 'https://script.google.com/macros/s/AKfycbw0t44neg_ANzRWRRTSz9aKx284g_pNqerCUMiZiQiOtlvnyhYjJASeRewypkfhmiofHw/exec'
    
    const registro = {
      id: id_input.value,
    }

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
      after_deleting_documentacion(res)
    })
  
    update_table_documentacion()
    hide_edition_form_documentacion()
    
  })
  
  btn_cancel.addEventListener('click', (e) => {
    hide_edition_form_documentacion()
  })
  
  document.addEventListener('click', (e) => {
    const target = e.target
  
    if(target.matches('tbody tr td')){
      
      hide_edition_form_documentacion()
      show_edition_form_documentacion()
      
      documentacion_global.active_table_tr = target.parentElement
      documentacion_global.active_table_tr.classList.add('active')
      
      const id_buscado = target.parentElement.querySelector('td').textContent
      const ticket = documentacion_global.data_documentacion.find(e => e.id == id_buscado)
      
      if(!ticket) return
      
      documentacion_global.ticket_seleccionado = ticket
      
      
      Object.keys(documentacion_global.ticket_seleccionado).forEach(prop => {
        const element = document.querySelector(`#${prop}_input`)
        if(!element) return
        element.value = documentacion_global.ticket_seleccionado[prop]
      })
      
      if(documentacion_global.ticket_seleccionado.soporte){
        link_evidencia.setAttribute("href",documentacion_global.ticket_seleccionado.soporte)
        link_evidencia.classList.remove('d-none')
      }else{
        link_evidencia.setAttribute("href","#")
        link_evidencia.classList.add('d-none')
      }

    }
  
    if(target.matches('#to_pdf_btn')){
      printing_format()
      
    }
  
    
  })
  
  document.addEventListener('change', (e) => {
    const target = e.target
  
    if(target.matches('#empresa_input')){
      const suplidores = data_suplidores.filter(e => e['empresa'] == target.value)
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
      
      const find = data_suplidores.find(e => e.empresa == empresa_input.value && e.codigo == target.value)
  
      if(!find) return
  
      suplidor_input.value = find.nombre
      
    }
  
    if(target.matches('#suplidor_input') && empresa_input.value){
      no_auxiliar_input.value = ''
  
      const find = data_suplidores.find(e => e.empresa == empresa_input.value && e.nombre == target.value)
  
      if(!find) return
  
      no_auxiliar_input.value = find.codigo
      
    }
  
    if(target.matches('#search_input')){
      hide_edition_form_documentacion()
      const search_array = target.value.split(';')
  
      document.querySelectorAll('.table_section tbody tr').forEach(tr => {
        const id = tr.querySelector('td[prop="id"]').textContent
        const find = documentacion_global.data_documentacion.find(req => req.id == id)
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
