export { showComprasSection,requerimientos_global,documentacion_global }

import { modal } from "../scripts.js"
import { update_table,update_resumen,hide_edition_form,show_edition_form } from "./requirements/functions/renders.js"
import { update_resumen_documentacion,update_table_documentacion,show_edition_form_documentacion,hide_edition_form_documentacion } from "./documentacion/renders_documentacion.js"
import { setRequerimientosListeners } from "./requirements/listeners/listeners.js"
import { setRequerimientosListeners_documentacion } from "./documentacion/listeners_documentacion.js"
import { setSuplidoresFormModal } from "./documentacion/suplidores.js"
import { requerimientos } from "./requirements/components/requrimientos.js"
import { getDataInicial } from "./requirements/requests/basics.js"

window.soleswebapp.compras = { requerimientos : {},documentacion : {} }

const requerimientos_global = window.soleswebapp.compras.requerimientos
const documentacion_global = window.soleswebapp.compras.documentacion

function showComprasSection(){
  const main = document.querySelector('main')

  main.innerHTML = 
  `
    <div class="compras_main p-0 m-0 h-100 w-100 d-flex flex-column">
      <ul id="compras_section_tabs" class="nav nav-underline">
        <li class="nav-item">
          <a id="compras_requerimientos_tab" class="nav-link" aria-current="page" href="#">Requerimientos</a>
        </li>
        <li class="nav-item">
          <a id="compras_documentacion_tab" class="nav-link" href="#">Documentación</a>
        </li>
      </ul>
      <article id="compras_article" class="flex-grow-1 overflow-hidden d-flex d-none">
      </article>
    </div>
  `

  const compras_main = document.querySelector('.compras_main')

  compras_main.appendChild(requerimientos())

  //listeners
  document.querySelectorAll('#compras_section_tabs li').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#compras_section_tabs a').forEach(e => e.classList.remove('active'))
      tab.querySelector('a').classList.add('active')

      const articles = [
        document.querySelector('#compras_requerimientos_article')
      ]

      articles.forEach(article => article.classList.add('d-none'))

      const selectedTab = tab.querySelector('a').textContent

      switch(selectedTab){
        case 'Requerimientos':
          articles[0].classList.remove('d-none')
          break
        case 'Documentación':
          // showComprasDocumentacionArticle()
          break
        
      }

      
    })
  })

  //requests
  getDataInicial()

}

function showComprasRequerimientosArticle(){
  const html =  `
  <div id="main_div" class="main_div d-flex flex-column">
      <h1 class="titulo fw-bold mb-4">Control y seguimiento de órdenes de compra</h1>
      <section class="search_filter_section d-flex justify-content-between align-items-center">
        <button id="nuevo_btn" type="button" class="btn btn-info text-light d-flex align-items-center" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
          </svg>
          <span class="ms-2">Nuevo</span>
        </button>
        <div class="input-group ms-3">
          <span class="input-group-text" id="basic-addon1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
              </svg>
          </span>
          <input type="text" disabled class="form-control" id="search_input" placeholder="Escribe tus búsquedas separadas por ;" aria-label="Input group example" aria-describedby="basic-addon1">
        </div>
        <select id="filtro_input" disabled class="form-select w-auto ms-3" aria-label="Default select example">
          <option selected>Selecciona un estatus</option>
        </select>
      </section>
      <section class="table_section mt-3 border-bottom">
        <table class="">
        <table class="">
          <thead>
            <tr class="bg-info bg-gradient">
              <th>ID</th>
              <th class="text-light th_numero" >Requerimiento</th>
              <th class="text-light th_numero" >Fecha</th>
              <th class="text-light th_numero" >No. OC</th>
              <th class="text-light th_numero" >Monto OC</th>
              <th class="text-light th_texto" >Suplidor</th>
              <th class="text-light th_numero" >Condicion de pago</th>
              <th class="text-light th_texto" >Estatus de Pago</th>
              <th class="text-light th_texto" >Estatus</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </section>
  </div>
  <div id="edition_div" class="edition_div px-3 pe-0 d-flex flex-column justify-content-between">
      <section class="resumen_section mt-5" id="resumen_section">
        <div class="resumen_div border shadow-sm rounded-2 p-3 my-1">
          <h3 class="fw-bold mb-2 ps-1">Resumen</h3>
          <ul id="resumen_estatus_list" class="px-0 m-0">
          </ul>
        </div>
      </section>
      <section class="form_section p-3 mt-5 flex-grow-1 overflow-auto d-none border shadow-sm rounded-top-2 z-2 bg-white">
        <form action="#" class="form" id="edition_form">
          <fieldset id="form_compras_fieldset" class="d-flex flex-wrap pb-4">
            <legend class="mb-4">Compras</legend>
            <div class="mb-3 w-50 px-1 d-none">
              <label for="token_input" class="form-label">ID</label>
              <input name="token_input" type="text" class="form-control form-control-sm" id="token_input">
            </div>
            <div class="mb-3 w-50 px-1 d-none">
              <label for="id_input" class="form-label">ID</label>
              <input name="id_input" type="text" class="form-control form-control-sm" id="id_input">
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="fecha_input" class="form-label">Fecha</label>
              <input name="fecha_input" type="date" disabled class="form-control form-control-sm" id="fecha_input">
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="ticket_input" class="form-label">Ticket</label>
              <input name="ticket_input" type="text" disabled class="form-control form-control-sm" id="ticket_input">
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="requerimiento_input" class="form-label">Requerimiento</label>
              <input name="requerimiento_input" type="text" disabled class="form-control form-control-sm" id="requerimiento_input">
            </div>
            <div class="mb-3 w-100 px-1">
              <label for="proyecto_input" class="form-label">Proyecto</label>
              <input name="proyecto_input" type="text" disabled class="form-control form-control-sm" id="proyecto_input">
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="no_oc_input" class="form-label">No. OC</label>
              <input name="no_oc_input" type="text" disabled class="form-control form-control-sm" id="no_oc_input">
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="monto_oc_input" class="form-label">Monto OC</label>
              <input name="monto_oc_input" type="text" disabled class="form-control form-control-sm" id="monto_oc_input">
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="empresa_input" class="form-label">Empresa</label>
              <select name="empresa_input" id="empresa_input" disabled class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option selected></option>
              </select>
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="no_auxiliar_input" class="form-label">No. Auxiliar</label>
              <input name="no_auxiliar_input" type="text" disabled class="form-control form-control-sm" id="no_auxiliar_input">
            </div>
            <div class="mb-3 w-100 px-1">
              <label for="suplidor_input" class="form-label">Suplidor</label>
              <input name="suplidor_input" disabled class="form-control form-control-sm" list="suplidor_dataList" id="suplidor_input" placeholder="">
              <datalist id="suplidor_dataList">
              </datalist>
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="indicaciones_compra_input" class="form-label">Indicaciones de compra</label>
              <input name="indicaciones_compra_input" type="text" disabled class="form-control form-control-sm" id="indicaciones_compra_input">
            </div>
            <div class="mb-3 w-100 px-1">
              <label for="condicion_pago_input" class="form-label">Condición de pago</label>
              <select name="condicion_pago_input" id="condicion_pago_input" disabled class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option selected></option>
              </select>
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="no_factura_input" class="form-label">No. factura</label>
              <input name="no_factura_input" type="text" disabled class="form-control form-control-sm" id="no_factura_input">
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="no_conduce_input" class="form-label">No. conduce</label>
              <input name="no_conduce_input" type="text" disabled class="form-control form-control-sm" id="no_conduce_input">
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="no_recepcion_input" class="form-label">No. recepción de servicio</label>
              <input name="no_recepcion_input" type="text" disabled class="form-control form-control-sm" id="no_recepcion_input">
            </div>
            <div class="mb-3 w-75 px-1">
              <label for="no_modificacion_anulacion_input" class="form-label">No. modificación y/o anulació<nav></nav></label>
              <input name="no_modificacion_anulacion_input" type="text" disabled class="form-control form-control-sm" id="no_modificacion_anulacion_input">
            </div>
          </fieldset>
          <fieldset id="form_contabilidad_fieldset" class="d-flex flex-wrap pb-4">
            <legend class="mb-4">Contabilidad</legend>
            <div class="mb-3 w-50 px-1">
              <label for="solicitud_pago_input" class="form-label">Solicitud de pago</label>
              <input name="solicitud_pago_input" type="text" disabled class="form-control form-control-sm" id="solicitud_pago_input">
            </div>
          </fieldset>
          <fieldset id="form_tesoreria_fieldset" class="d-flex flex-wrap pb-4">
            <legend class="mb-4">Tesorería</legend>
            <div class="mb-3 w-50 px-1">
              <label for="chk_input" class="form-label">CHK</label>
              <input name="chk_input" type="text" disabled class="form-control form-control-sm" id="chk_input">
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="tbk_input" class="form-label">TBK</label>
              <input name="tbk_input" type="text" disabled class="form-control form-control-sm" id="tbk_input">
            </div>
            <div class="w-50 px-1">
              <label for="estatus_pago_input" class="form-label">Estatus de pago</label>
              <select name="estatus_pago_input" id="estatus_pago_input" disabled class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option selected></option>
              </select>
            </div>
          </fieldset>
        </form>
      </section>
      <section class="form_btn_section p-3 d-flex justify-content-end d-none rounded-bottom-2 z-2 bg-white">
        <button id="btn_cancel" type="button" class="btn btn-outline-danger btn-sm">Cancel</button>
        <button id="btn_borrar" type="button" class="btn btn-outline-secondary btn-sm ms-2" disabled>Borrar</button>
        <button id="btn_guardar" type="button" class="btn btn-info text-light btn-sm ms-2">Guardar</button>
      </section>
    </div>
    `

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

  fetch(url,options)
   .then(res => res.json())
   .then(res => {
      if(!res.estatus){
        modal.show()
        document.getElementById('modal_alertas_message').textContent = res.message

      }else{
        const article = document.querySelector('#compras_article')
        article.innerHTML = html
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
        requerimientos_global.active_table_tr = ''
        requerimientos_global.ticket_seleccionado = ''
        
        let nuevo_btn = article.querySelector('#nuevo_btn')
        if(res.data.crear_nuevos_registros) nuevo_btn.disabled = false

        let btn_borrar = article.querySelector('#btn_borrar')
        if(res.data.eliminar_registros) btn_borrar.disabled = false

        update_resumen()
        update_table()
        setRequerimientosListeners()

      }
   })
   .catch(err => console.log(err.message))


}

function showComprasDocumentacionArticle(){
  const html =  `
    <div class="main_div d-flex flex-column">
      <h1 class="titulo fw-bold mb-4">Recepción de documentación física de compras</h1>
      <section class="search_filter_section d-flex justify-content-between align-items-center">
        <button id="nuevo_btn" type="button" class="btn btn-info text-light d-flex align-items-center" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
            </svg>
            <span class="ms-2">Nuevo</span>
        </button>
        <div class="input-group ms-3">
          <span class="input-group-text" id="basic-addon1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
              </svg>
          </span>
          <input type="text" disabled class="form-control" id="search_input" placeholder="Escribe tus búsquedas separadas por ;" aria-label="Input group example" aria-describedby="basic-addon1">
        </div>
        <select id="filtro_input" disabled class="form-select w-auto ms-3" aria-label="Default select example">
          <option selected>Selecciona un estatus</option>
        </select>
        <div class="ms-2">
          <button type="button" class="btn border-0" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
            </svg>
            <span class="visually-hidden">Button</span>
          </button>
          <ul class="dropdown-menu">
            <li><button id="to_pdf_btn" class="dropdown-item">To PDF</button></li>
            <li><button id="suplidores_update_btn" class="dropdown-item">Actualizar Suplidores</button></li>
          </ul>
        </div>
      </section>
      <section class="table_section mt-3 border-bottom">
        <table class="">
          <thead>
            <tr class="bg-info bg-gradient">
              <th>ID</th>
              <th class="text-light th_numero">No. solicitud</th>
              <th class="text-light th_numero">No. OC</th>
              <th class="text-light th_numero">Fecha</th>
              <th class="text-light th_numero">No. auxiliar</th>
              <th class="text-light th_texto">Suplidor</th>
              <th class="text-light th_numero">Monto</th>
              <th class="text-light th_numero">No. conduce</th>
              <th class="text-light th_numero">No. factura</th>
              <th class="text-light th_numero">No. recepción</th>
              <th class="text-light th_texto">Estatus</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </section>
    </div>
    <div class="edition_div p-3 d-flex flex-column justify-content-between">
      <section class="resumen_section mt-5" id="resumen_section">
        <div class="resumen_div border shadow-sm rounded-2 p-3 my-1">
          <h3 class="fw-bold mb-2 ps-1">Resumen</h3>
          <ul id="resumen_estatus_list" class="px-0 m-0">
          </ul>
        </div>
      </section>
      <section id="form_section_id" class="form_section z-2 p-3 flex-grow-1 overflow-auto d-none border shadow-sm rounded-top-2 bg-white">
        <form action="#" class="form d-flex flex-wrap" id="edition_form">
          <div class="mb-3 w-50 px-1 d-none">
            <label for="id_input" class="form-label">ID</label>
            <input name="id_input" type="text" class="form-control form-control-sm" id="id_input">
          </div>
          <div class="mb-3 w-100">
            <label for="file_input" class="form-label">Reporte de ordenes de compra</label>
            <input disabled class="form-control form-control-sm" id="file_input" type="file">
          </div>
          <div id="form_edition_div" class="m-0 p-0 d-flex flex-wrap">
            <div class="mb-3 w-50 px-1">
              <label for="no_conduce_input" class="form-label">No. conduce</label>
              <input disabled name="no_conduce_input" type="text" disabled class="form-control form-control-sm" id="no_conduce_input">
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="no_factura_input" class="form-label">No. factura</label>
              <input disabled name="no_factura_input" type="text" disabled class="form-control form-control-sm" id="no_factura_input">
            </div>
            <div class="mb-3 w-50 px-1">
              <label for="no_recepcion_input" class="form-label">No. recepción</label>
              <input disabled name="no_recepcion_input" type="text" disabled class="form-control form-control-sm" id="no_recepcion_input">
            </div>
            <div class="mb-3 w-100 px-1">
              <label for="observaciones_input" class="form-label">Observaciones</label>
              <input disabled name="observaciones_input" type="text" disabled class="form-control form-control-sm" id="observaciones_input">
            </div>
            <div class="mb-3 w-100 px-1">
              <label for="estatus_forzado_input" class="form-label">Estatus</label>
              <select id="estatus_forzado_input" disabled class="form-select" aria-label="Default select example">
                <option value="" selected>Selecciona un estatus</option>
                <option value="Pendiente">Pendiente</option>
                <option value="">Completado</option>
                <option value="Anulado">Anulado</option>
              </select>
            </div>
            <div class="mb-3 w-100">
              <label for="file_soporte_input" class="form-label">Soportes</label>
              <input class="form-control form-control-sm" id="file_soporte_input" type="file">
            </div>
            <a id="link_evidencia" href="#" target="_blank" class="d-none">Ver soporte</a>
          </div>
        </form>
      </section>
      <section class="form_btn_section z-2 p-3 d-flex justify-content-end rounded-bottom-2 d-none bg-white">
        <button id="btn_cancel" type="button" class="btn btn-outline-danger btn-sm">Cancel</button>
        <button id="btn_borrar" type="button" class="btn btn-outline-secondary btn-sm ms-2" disabled>Borrar</button>
        <button id="btn_guardar" type="button" class="btn btn-info text-light btn-sm ms-2">Guardar</button>
      </section>
      <section id="suplidores_form_section" class="d-none bg-white rounded-2 p-3">
        <fieldset>
          <legend>Suplidores</legend>
          <div class="mb-3 w-100">
            <label for="file_input" class="form-label">Base de suplidores</label>
            <input disabled class="form-control form-control-sm" id="base_suplidores_input_file" type="file">
          </div>
          <button id="suplidores_cancelar_btn" type="button" class="btn btn-outline-danger btn-sm">Cancelar</button>    
          <button id="suplidores_aceptar_btn" type="button" class="btn btn-outline-info btn-sm">Aceptar</button>    
        </fieldset>
      </section>
    </div>
  `

  const url = 'https://script.google.com/macros/s/AKfycbw0t44neg_ANzRWRRTSz9aKx284g_pNqerCUMiZiQiOtlvnyhYjJASeRewypkfhmiofHw/exec'

  const jsonData = {
    action : 'dataInicial',
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
      if(!res.estatus){
        modal.show()
        document.getElementById('modal_alertas_message').textContent = res.message

      }else{
        const article = document.querySelector('#compras_article')
        
        article.innerHTML = html
        article.appendChild(setSuplidoresFormModal())

        const suplidores_modal_form = new bootstrap.Modal(document.getElementById('suplidores_modal_form'))
        suplidores_modal_form.show()

        res.data.inputs_editables.forEach(input => article.querySelector(`#${input}`).disabled = false)

        let input_filtro_html = ''
        res.data.estatus_list.forEach(estatus => {
          input_filtro_html += `<option value="${estatus}">${estatus}</option>`
        })
        article.querySelector(`#filtro_input`).innerHTML += input_filtro_html

        let nuevo_btn = article.querySelector('#nuevo_btn')
        if(res.data.crear_nuevos_registros) nuevo_btn.disabled = false

        let btn_borrar = article.querySelector('#btn_borrar')
        if(res.data.eliminar_registros) btn_borrar.disabled = false

        documentacion_global.data_documentacion = res.data.requerimientos
        documentacion_global.estatus_list = res.data.estatus_list
        requerimientos_global.active_table_tr = ''
        requerimientos_global.ticket_seleccionado = ''

        update_table_documentacion()
        update_resumen_documentacion()
        setRequerimientosListeners_documentacion()


      }
   })
   .catch(err => console.log(err.message))


}



