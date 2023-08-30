export { showComprasSection,hideComprasSection,setComprasSection,requerimientos_global,documentacion_global }

import { modal } from "../scripts.js"
import { update_table,update_resumen,hide_edition_form,show_edition_form } from "./requerimientos/renders_requerimientos.js"
import { update_resumen_documentacion,update_table_documentacion,show_edition_form_documentacion,hide_edition_form_documentacion } from "./documentacion/renders_documentacion.js"
import { setRequerimientosListeners } from "./requerimientos/listeners_requerimientos.js"
import { setRequerimientosListeners_documentacion } from "./documentacion/listeners_documentacion.js"
import { requerimientos } from "./requerimientos/html/requerimientos.js"

window.soleswebapp.compras = { requerimientos : {},documentacion : {} }

const requerimientos_global = window.soleswebapp.compras.requerimientos
const documentacion_global = window.soleswebapp.compras.documentacion

function showComprasSection(){
  document.querySelector('#app_section_compras').classList.remove('d-none')
}

function hideComprasSection(){
  document.querySelector('#app_section_compras').classList.add('d-none')
}

function setComprasSection(data_res){

  const section = document.createElement('section')
  section.id = 'app_section_compras'
  section.classList.add('d-none','w-100','h-100','d-flex','flex-column')
  document.querySelector('#app_main').appendChild(section)

  section.innerHTML = `
  <nav>
    <ul class="nav nav-underline">
      <li class="nav-item">
        <a class="nav-link compras_nav_item" aria-current="page" href="#">Requerimientos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link compras_nav_item" href="#">Documentación</a>
      </li>
    </ul>
  </nav>
  `

  if(data_res.subsecciones_permitidas.includes('compras_requerimientos')){
    setComprasRequerimientosArticle()
  }


  document.querySelectorAll('.compras_nav_item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.compras_nav_item').forEach(e => e.classList.remove('active'))
      item.classList.add('active')
      
      document.querySelectorAll('#app_section_compras article').forEach(e => e.classList.add('d-none'))
      
      switch(item.textContent){
        case 'Requerimientos':
          showComprasRequerimientosArticle()
          break
        case 'Documentación':
          // showComprasDocumentacionArticle()
          break
        
      }
    })
    
  })

}


function setComprasRequerimientosArticle(){

  const article = document.querySelector('#app_section_compras').appendChild(requerimientos())
  
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

  console.log('Iniciando request...')

  fetch(url,options)
  .then(res => res.json())
  .then(res => {
      
      if(!res.estatus){
        modal.show()
        document.getElementById('modal_alertas').querySelector('.modal_body span').textContent = res.message

      }else{
        console.log(res)

        res.data.inputs_editables.forEach(input => {
          article.querySelector(`#${input}`).disabled = false
        })
        
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



}

function showComprasRequerimientosArticle(){
  document.getElementById('compras_requerimientos_article').classList.remove('d-none')
}

function hideComprasRequerimientosArticle(){
  document.getElementById('compras_requerimientos_article').classList.add('d-none')
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
</div>`

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
        modal.querySelector('.modal_body span').textContent = res.message

      }else{
        const article = document.querySelector('#compras_article')
        article.innerHTML = html
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



