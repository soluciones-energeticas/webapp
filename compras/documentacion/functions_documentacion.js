export { after_save_clicking_documentacion,after_deleting_documentacion }

import { documentacion_global } from "../compras.js"
import { modal,toast } from "../../scripts.js"
import { update_resumen_documentacion,update_table_documentacion } from "./renders_documentacion.js"



function after_saving_documentacion(obj){
  const { estatus,message,data } = obj

  if(!estatus){
    modal.show()
    modal.querySelector('.modal_body span').textContent = message
  }

  if(data.nuevo){
    documentacion_global.data_documentacion.splice(0,0,...data.requerimientos)
    update_table_documentacion()
    update_resumen_documentacion()
    toast.hide()

  }else{
    const registro = data.requerimientos[0]
    const index = documentacion_global.data_documentacion.findIndex(requerimiento => requerimiento.id == registro.id)
    registro.editando = false
    
    if(index > -1) documentacion_global.data_documentacion[index] = registro

    update_table_documentacion()
    update_resumen_documentacion()

  }
}

function read_soporte_file_documentacion(){
  const files = file_soporte_input.files

  return new Promise((resolve) => {
    if(!files.length) resolve(false)
    
    const fr = new FileReader()
    fr.readAsArrayBuffer(file_soporte_input.files[0])

    fr.onload = () => {
      const file = [...new Int8Array(fr.result)]
      resolve(file)
    }
    
  })

}

function after_save_clicking_documentacion(rows){
  const token = sessionStorage.getItem('token_control_compras')

  read_soporte_file_documentacion().then(file_soporte => {
    
    let registro
    const id_input = document.querySelector('#id_input')
    const estatus_forzado_input = document.querySelector('#estatus_forzado_input')
    const id = id_input.value

    if(id){
      //editando registro
      registro = documentacion_global.data_documentacion.find(requerimiento => requerimiento.id == id)
      if(!registro) return

      if(estatus_forzado_input.value != 'Anulado' && registro.estatus_forzado == 'Anulado'){
        modal_body_span.textContent = 'Para remover el estatus anulado debes contactar con el administrador'
        modal.show()
        registro.editando = false
        return
      }

      registro.editando = true
      registro.estatus_forzado = estatus_forzado_input.value
      registro.token = token

      if(file_soporte) registro.file_soporte = file_soporte

      if(registro.estatus_forzado == 'Anulado' && !registro.soporte && !registro.file_soporte){
        modal_body_span.textContent = 'Debes anexar un caso interno para poder anular una orden de compra.'
        registro.estatus_forzado = ''
        estatus_forzado_input.value = ''
        modal.show()
        registro.editando = false
        return
      }

      const editable_props = [
        'no_conduce',
        'no_factura',
        'no_recepcion',
        'observaciones'
      ]

      editable_props.forEach(prop => registro[prop] = document.querySelector(`#${prop}_input`).value)

      const url = 'https://script.google.com/macros/s/AKfycbw0t44neg_ANzRWRRTSz9aKx284g_pNqerCUMiZiQiOtlvnyhYjJASeRewypkfhmiofHw/exec'

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
        after_saving_documentacion(res)
      })

      update_table_documentacion()

      set_requerimiento_estatus_documentacion(registro)

    }else{
      //ingresando nuevos registros
      if(!rows) return

      registro = { rows,id }

      const url = 'https://script.google.com/macros/s/AKfycbw0t44neg_ANzRWRRTSz9aKx284g_pNqerCUMiZiQiOtlvnyhYjJASeRewypkfhmiofHw/exec'

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
        after_saving_documentacion(res)
      })

      toast.show()
      toast_body_loading.classList.remove('d-none')
      toast_body_span.textContent = 'Cargando nuevos registros'
      
    }

    
  })
  


}

function set_requerimiento_estatus_documentacion(requerimiento){
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

function after_deleting_documentacion(res){
  const estatus = res.estatus
  const id = res.data.id
  const message = res.message

  if(estatus){
    const index = documentacion_global.data_documentacion.findIndex(req => req.id == id)
    if(index < 0) return
    documentacion_global.data_documentacion.splice(index,1)
    update_table_documentacion()
    update_resumen_documentacion()
  }else{
    modal.show()
    modal.querySelector('.modal_body span').textContent = message
  }
}