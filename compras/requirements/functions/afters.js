export { after_deleting,after_save_clicking,after_saving,after_refresh_clicking }

import { toast,modal } from "../../../scripts.js"
import { requerimientos_global } from "../../compras.js"
import { update_table,update_resumen } from "./renders.js"

function after_saving(res){
    const { estatus,data,message } = res

    if(!estatus){
      document.getElementById('modal_alertas_message').textContent = message
      modal.show()
      return
    }

    if(data.nuevo){
      requerimientos_global.data_requerimientos.splice(0,0,...data.requerimientos)
      
    }else{
      const registro = data.requerimientos[0]
      const index = requerimientos_global.data_requerimientos.findIndex(requerimiento => requerimiento.id == registro.id)
      registro.editando = false
      
      if(index > -1) requerimientos_global.data_requerimientos[index] = registro
      
    }

    update_table()
    update_resumen()
    toast.hide()
}

function after_save_clicking(){
  const id = document.querySelector('#compras_requerimientos_article #form_compras_fieldset #id_input').value
  let registro
  
  if(id){
    //editando registro
    registro = requerimientos_global.data_requerimientos.find(requerimiento => requerimiento.id == id)
    if(!registro) return

    registro.editando = true

    requerimientos_global.editable_props.forEach(prop => {
      const calificationInputs = [
        'calificacion_entrega',
        'calificacion_tiempo_entrega',
        'calificacion_calidad',
        'calificacion_precios'
      ]
      
      if(calificationInputs.includes(prop)) return

      registro[prop] = document.querySelector(`#${prop}_input`).value
      
    })

    getCalificationValue(registro)

    const url = 'https://script.google.com/macros/s/AKfycbz3B6q-240Nc5p-8_Zd8BU2TpjHW69Tgu0BPvpYwrHHthDddQFCeL4lroQKw9n92v3T/exec'

    const jsonData = {
      action : 'UPDATE',
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
      after_saving(res)
    })

    update_table()
    update_resumen()

  }else{
    //ingresando nuevos registros
    if(!requerimientos_global.crear_nuevos_registros) return

    registro = {}
    registro.id = id

    requerimientos_global.editable_props.forEach(prop => registro[prop] = document.querySelector(`#${prop}_input`).value)

    const url = 'https://script.google.com/macros/s/AKfycbz3B6q-240Nc5p-8_Zd8BU2TpjHW69Tgu0BPvpYwrHHthDddQFCeL4lroQKw9n92v3T/exec'

    const jsonData = {
      action : 'UPDATE',
      data : {registro},
      token : sessionStorage.getItem('soles_webapp_session')
    }
      
    const options = {
      method: "POST",
      Headers: {"Content-Type": "application/json"},
      body: JSON.stringify(jsonData)
    }

    console.log(registro)

    fetch(url,options)
    .then(res => res.json())
    .then(res => {
      after_saving(res)
    })

    toast.show()
    toast_body_loading.classList.remove('d-none')
    toast_body_span.textContent = 'Cargando nuevo registro'
    
  }


}

function after_refresh_clicking(btn_refresh){

  const url = 'https://script.google.com/macros/s/AKfycbz3B6q-240Nc5p-8_Zd8BU2TpjHW69Tgu0BPvpYwrHHthDddQFCeL4lroQKw9n92v3T/exec'

  const jsonData = {
    action : 'REFRESH',
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
    btn_refresh.classList.remove('updating')
    requerimientos_global.data_requerimientos = res.data
    update_table()
    update_resumen()

    const filtro_input = document.querySelector('#compras_requerimientos_article #filtro_input')
    const search_input = document.querySelector('#compras_requerimientos_article #search_input')

    if(filtro_input.value){
      filtro_input.dispatchEvent(new Event('change'))
    }else{
      search_input.dispatchEvent(new Event('input'))
    }
    
  })



}

function after_deleting(id,res){
  const estatus = res.estatus
  const message = res.message
  
  if(estatus){
    const index = requerimientos_global.data_requerimientos.findIndex(req => req.id == res.data.id)
    if(index < 0) return
    requerimientos_global.data_requerimientos.splice(index,1)
    update_table()
    update_resumen()
  }else{
    document.getElementById('modal_alertas_message').textContent = message
    modal.show()
    return
  }

}

function getCalificationValue(registro){
  const id = document.querySelector('#compras_requerimientos_article #form_compras_fieldset #id_input')
  const calificationInputs = [
    'calificacion_entrega',
    'calificacion_tiempo_entrega',
    'calificacion_calidad',
    'calificacion_precios'
  ]

  calificationInputs.forEach(inputName => {
    const radios = document.querySelectorAll(`#compras_requerimientos_article #edition_form [name="${inputName}"]`)
    for(let radio of radios){
      if(radio.checked){
        registro[inputName] = radio.value
        break
      }
    }
    
  })
  
}
