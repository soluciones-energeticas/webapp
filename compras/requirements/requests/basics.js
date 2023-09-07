export { getDataInicial }

import { modal } from "../../../scripts.js"
import { requerimientos_global } from "../../compras.js"
import { update_table,update_resumen,hide_edition_form,show_edition_form } from "../functions/renders.js"
import { setRequerimientosListeners } from "../listeners/listeners.js"

function getDataInicial(){
  const url = 'https://script.google.com/macros/s/AKfycbz3B6q-240Nc5p-8_Zd8BU2TpjHW69Tgu0BPvpYwrHHthDddQFCeL4lroQKw9n92v3T/exec'

  const jsonData = {
    action : 'dataInicial',
    token : sessionStorage.getItem('soles_webapp_session')
  }
    
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  console.log('Iniciando solicitud inicial')
  
  fetch(url,options)
  .then(res => res.json())
  .then(res => {
     console.log('Solicitud inicial terminada')
     
      if(!res.estatus){
        modal.show()
        document.getElementById('modal_alertas_message').textContent = res.message

      }else{
        const article = document.querySelector('#compras_requerimientos_article')

        res.data.inputs_editables.forEach(input => article.querySelector(`#${input}`).disabled = false)
        
        let input_filtro_html = ''
        res.data.estatus_list.forEach(estatus => {
          input_filtro_html += `<option value="${estatus}">${estatus}</option>`
        })
        article.querySelector(`#filtro_input`).innerHTML += input_filtro_html
        
        let empresa_input_html = ''
        res.data.empresas.forEach(empresa => {
          empresa_input_html += `<option value="${empresa}">${empresa}</option>`
        })
        article.querySelector(`#empresa_input`).innerHTML += empresa_input_html

        let condicion_pago_input_html = ''
        res.data.condiciones_pago.forEach(condicion => {
          condicion_pago_input_html += `<option value="${condicion}">${condicion}</option>`
        })
        article.querySelector(`#condicion_pago_input`).innerHTML += condicion_pago_input_html

        let estatus_pago_input_html = ''
        res.data.estatus_pago.forEach(estatus => {
          estatus_pago_input_html += `<option value="${estatus}">${estatus}</option>`
        })
        article.querySelector(`#estatus_pago_input`).innerHTML += estatus_pago_input_html

        requerimientos_global.data_requerimientos = res.data.requerimientos
        requerimientos_global.estatus_list = res.data.estatus_list
        requerimientos_global.data_suplidores = res.data.suplidores
        requerimientos_global.editable_props = res.data.editable_props
        requerimientos_global.crear_nuevos_registros = res.data.crear_nuevos_registros
        requerimientos_global.eliminar_registros = res.data.eliminar_registros
        requerimientos_global.calificar_suplidores = res.data.calificar_suplidores
        requerimientos_global.active_table_tr = ''
        requerimientos_global.ticket_seleccionado = ''

        let nuevo_btn = article.querySelector('#nuevo_btn')
        if(res.data.crear_nuevos_registros) nuevo_btn.disabled = false

        let btn_borrar = article.querySelector('#btn_borrar')
        if(res.data.eliminar_registros) btn_borrar.disabled = false

        update_table()
        update_resumen()
        setRequerimientosListeners()

      }
   })
   .catch(err => console.log(err.message))
  
}