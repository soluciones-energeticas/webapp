export { after_deleting,after_save_clicking,after_saving,set_requerimiento_estatus }

import { requerimientos_global } from "../compras.js"
import { update_table,update_resumen } from "./renders_requerimientos.js"
import { toast,modal } from "../../scripts.js"

function after_saving(res){
    const { estatus,data,message } = res

    if(!estatus){
      modal_body_span.textContent = message
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
  const id = document.querySelector('#id_input').value
  let registro
  
  if(id){
    //editando registro
    registro = requerimientos_global.data_requerimientos.find(requerimiento => requerimiento.id == id)
    if(!registro) return

    registro.editando = true

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

function set_requerimiento_estatus(requerimiento){
  if(
    requerimiento['no_conduce'] == ''
    && requerimiento['no_factura'] == ''
    && requerimiento['no_recepcion'] == ''
  ) requerimiento.estatus = 'Pendiente'

  if(
    requerimiento['no_conduce'] != ''
    || requerimiento['no_factura'] != ''
    || requerimiento['no_recepcion'] != ''
    || requerimiento['soporte'] != ''
  ) requerimiento.estatus = 'En proceso'

  if(
    requerimiento['no_conduce'] != ''
    && requerimiento['no_factura'] != ''
    && requerimiento['no_recepcion'] != ''
    && requerimiento['soporte'] != ''
  ) requerimiento.estatus = 'Completado'

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
    modal_body_span.textContent = message
    modal.show()
    return
  }

}