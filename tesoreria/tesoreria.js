export { showTesoreriaSection }  

import { getDataInicial,getDataTransacciones,getDepositos,conciliacion_global } from "./conciliacion/getData.js"
import { update_tables,afterDataTransacciones,afterDepositos,setTableDepositosContent,setTableRetirosContent } from "./conciliacion/setData.js"


function showTesoreriaSection(){
  const main = document.querySelector('main')

  main.innerHTML = `
  <div class="tesoreria_div d-flex flex-column">
      <h1 class="fw-bold fs-3 ps-2 pt-2">Conciliación de bancos</h1>
      <div id="tesoreria_body_div" class="w-100 flex-grow-1 d-flex">
        <div class="aside_tesoreria h-100 d-flex flex-column ps-2">
          <select id="empresa_input" class="form-select form-select-sm border-0 ps-1 w-100" aria-label="">
            <option selected>Selecciona una empresa</option>
          </select>
          <div id="controles_fecha_div" class="d-flex align-items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
              <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
            </svg>
            <input type="date" class="form-control form-control-sm text-center mx-3" id="fecha_input">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
              <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
            </svg>
          </div>
          <p id="cuadre_header" class="fw-bold fs-5 m-0 mt-2">Cuadre</p>
          <div id="resumen" class="rounded-3 p-2 shadow w-100">
            <table id="table_resumen" class="w-100">
              <tr>
                <th>
                  <p class="m-0 fw-normal text-start">Balance anterior libro</p>
                </th>
                <td>
                  <p class="m-0 fw-normal text-start" id="balance_anterior_libro_p">0.00</p>
                </td>
              </tr>
              <tr>
                <th>
                  <p class="m-0 fw-normal text-start">Depósitos</p>
                </th>
                <td>
                  <p class="m-0 fw-normal text-start" id="resumen_depositos_p">0.00</p>
                </td>
              </tr>
              <tr>
                <th>
                  <p class="m-0 fw-normal text-start">Pagos emitidos</p>
                </th>
                <td>
                  <p class="m-0 fw-normal text-start" id="resumen_pagos_emitidos_p">0.00</p>
                </td>
              </tr>
              <tr>
                <th>
                  <p class="m-0 fw-normal text-start">Ajuste imp. transferencias</p>
                </th>
                <td>
                  <input id="resumen_ajuste_imp_transferencia_p" type="text" class="form-control form-control-sm text-start px-0 ps-1" placeholder="0.00">
                </td>
              </tr>
              <tr>
                <th>
                  <p class="m-0 fw-bold text-start">Balance en libro</p>
                </th>
                <td>
                  <p class="m-0 fw-bold text-start" id="resumen_balance_libro_p">0.00</p>
                </td>
              </tr>
              <tr id="balance_banco_tr">
                <th>
                  <p class="m-0 fw-normal text-start">Balance banco</p>
                </th>
                <td>
                <input id="resumen_balance_banco_p" type="text" class="form-control form-control-sm text-start px-0 ps-1" placeholder="0.00">
                </td>
              </tr>
              <tr>
                <th>
                  <p class="m-0 fw-normal text-start">Tránsitos</p>
                </th>
                <td>
                  <p class="m-0 fw-normal text-start" id="resumen_transitos_p">0.00</p>
                </td>
              </tr>
              <tr>
                <th>
                  <p class="m-0 fw-normal text-start ms-auto resumen_subp">Entregados</p>
                </th>
                <td>
                  <p class="m-0 fw-normal text-start" id="resumen_entregados_p">0.00</p>
                </td>
              </tr>
              <tr>
                <th>
                  <p class="m-0 fw-normal text-start ms-auto resumen_subp">Retenidos</p>
                </th>
                <td>
                  <p class="m-0 fw-normal text-start" id="resumen_retenidos_p">0.00</p>
                </td>
              </tr>
              <tr>
                <th>
                  <p class="m-0 fw-normal text-start ms-auto resumen_subp">Vencidos</p>
                </th>
                <td>
                  <p class="m-0 fw-normal text-start" id="resumen_vencidos_p">0.00</p>
                </td>
              </tr>
              <tr>
                <th>
                  <p class="m-0 fw-normal text-start">Ajuste cheque nulo/tránsito</p>
                </th>
                <td>
                  <p class="m-0 fw-normal text-start" id="resumen_ajuste_nulo_p">0.00</p>
                </td>
              </tr>
              <tr>
                <th>
                  <p class="m-0 fw-bold text-start">Balance en libro</p>
                </th>
                <td>
                  <p class="m-0 fw-bold text-start" id="resumen_balance_libro_comprobacion_p">0.00</p>
                </td>
              </tr>
              <tr>
                <th>
                  <p class="m-0 fw-bold text-start">Comprobación</p>
                </th>
                <td>
                  <p class="m-0 fw-bold text-start" id="resumen_comprobacion_p">0.00</p>
                </td>
              </tr>
            </table>
          </div>
          <p id="depositos_header" class="fw-bold fs-5 mt-2">Depósitos</p>
          <div id="depositos_div" class="px-1 w-100 h-00 h-transition">
            <div id="depositos_table_header_div" class="d-flex mb-2">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                  </svg>
                </span>
                <input id="buscar_depositos_input" type="text" class="form-control form-control-sm" placeholder="Buscar" aria-label="Input group example" aria-describedby="basic-addon1">
              </div>
              <svg id="depositos_nuevo_btn" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-square-fill m-auto ms-2" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"></path>
              </svg>
              <svg id="depositos_eliminar_btn" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dash-square-fill m-auto ms-2" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
              </svg>
            </div>
            <div id="depositos_table_new_form" class="d-flex flex-wrap overflow-hidden h-0 h-transition">
              <div class="w-50">
                <input disabled id="depositos_date_input" class="form-control form-control-sm w-100 my-2" type="date">
              </div>
              <div class="w-50 ps-2">
                <input disabled id="depositos_monto_input" class="form-control form-control-sm w-100 my-2" type="text" placeholder="Monto">
              </div>
              <div class="flex-grow-1">
                <input disabled id="depositos_detalle_input" class="form-control form-control-sm w-100" placeholder="Detalle" type="text">
              </div>
              <div class="w-25 ps-1 d-flex align-items-start">
                <button disabled id="depositos_guardar_btn" type="button" class="btn btn-primary btn-sm ms-auto">Guardar</button>
              </div>
            </div>
            <div id="depositos_table_div" class="mt-2">
              <table id="depositos_table" class="w-100">
                <thead>
                  <tr>
                    <th class="py-1 d-none">id</th>
                    <th class="py-1">Fecha</th>
                    <th class="py-1">Detalle</th>
                    <th class="py-1">Monto</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                </tr>
                <tr>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                </tr>
                <tr>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="main_tesoreria h-100 d-flex flex-column ps-3 pe-2">
          <p class="fw-bold fs-5">Retiros y transferencias</p>
          <div id="retiros_table_header_div" class="d-flex">
            <svg id="retiros_nuevo_btn" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="m-auto mx-2 bi bi-plus-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"></path>
            </svg>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                </svg>
              </span>
              <input id="buscar_retiros_input" type="text" class="form-control form-control-sm" placeholder="Buscar" aria-label="Input group example" aria-describedby="basic-addon1">
            </div>
          </div>
          <div id="retiros_new_form" class="d-flex flex-wrap h-0 h-transition">
            <div class="p-1 w-50">
              <label for="retiros_fecha_input" class="form-label">Cheques</label>
              <input disabled type="file" class="form-control" id="retiros_cheques_input">
            </div>
            <div class="p-1 w-50">
              <label for="retiros_no_cheque_input" class="form-label">Transferencias</label>
              <input disabled type="file" class="form-control" id="retiros_transferencia_input">
            </div>
            <button disabled id="retiros_guardar_btn" type="button" class="btn btn-primary btn-sm m-1 w-100">Guardar</button>
          </div>
          <div id="retiros_table_div" class="mt-2">
            <table id="retiros_table" class="w-100">
              <thead>
                <tr>
                  <th class="py-1 d-none">id</th>
                  <th class="py-1">Fecha</th>
                  <th class="py-1">No. cheque</th>
                  <th class="py-1">Beneficiario</th>
                  <th class="py-1">Concepto</th>
                  <th class="py-1">Monto</th>
                  <th class="py-1">Estatus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                </tr>
                <tr>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                </tr>
                <tr>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                </tr>
                <tr>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                  <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `

  const depositos_nuevo_btn = document.querySelector('#depositos_nuevo_btn')
  const depositos_guardar_btn = document.querySelector('#depositos_guardar_btn')
  const retiros_nuevo_btn = document.querySelector('#retiros_nuevo_btn')
  const retiros_new_form = document.querySelector('#retiros_new_form')
  const cuadre = document.querySelector('#resumen')
  const depositos_table = document.querySelector('#depositos_table')
  const cuadre_header = document.querySelector('#cuadre_header')
  const depositos_header = document.querySelector('#depositos_header')
  const depositos_table_new_form = document.querySelector('#depositos_table_new_form')
  const empresa_input = document.querySelector('#empresa_input')
  const fecha_input = document.querySelector('#fecha_input')

  // cuadre_header.addEventListener('click', e => {
  //   cuadre.classList.remove('d-none')
  //   depositos_table.classList.add('d-none')
  // })

  // depositos_header.addEventListener('click', e => {
  //   cuadre.classList.add('d-none')
  //   depositos_table.classList.remove('d-none')
  // })
  
  depositos_guardar_btn.addEventListener('click', e => {
    const div = document.querySelector('#depositos_table_new_form')
    div.classList.remove('active')
  })
  
  // retiros_nuevo_btn.addEventListener('click', e => {
  //   retiros_new_form.classList.toggle('h-0')
  // })

  depositos_nuevo_btn.addEventListener('click',e => {
    depositos_table_new_form.classList.toggle('h-0')
  })

  document.addEventListener('change', e => {
    const target = e.target

    if(target === empresa_input || target === fecha_input){
      document.querySelector('#buscar_depositos_input').value = ''
      document.querySelector('#buscar_retiros_input').value = ''
      update_tables()
    }  
    
  })

  document.addEventListener('input', e => {
    const target = e.target

    if(target.matches('#buscar_depositos_input')){
      document.querySelector('#fecha_input').value = ''
      createSearchTimer('depositos',target)
    }

    if(target.matches('#buscar_retiros_input')){
      document.querySelector('#fecha_input').value = ''
      createSearchTimer('retiros',target)
    }
    
  })

  getDataInicial()
  getDataTransacciones()
  getDepositos()
  

}

function createSearchTimer(timerProp,target){
  if(conciliacion_global.timers[timerProp]) conciliacion_global.timers[timerProp].forEach(timer => clearTimeout(timer))

  if(!target.value){
    switch(timerProp){
      case 'depositos':
        afterDepositos()
        break
      case 'retiros':
        afterDataTransacciones()
        break
    }

    return
  }
  
  const busquedas = target.value.split(';')
  
  const timer = setTimeout(() => {
    const empresa = document.querySelector('#empresa_input').value
    let arrayBusqueda
  
    switch(timerProp){
      case 'depositos':
        arrayBusqueda = conciliacion_global.depositos
        break
      case 'retiros':
        arrayBusqueda = conciliacion_global.dataEmpresas[empresa]
        break
      
    }

    const dataFiltrada = arrayBusqueda.filter(registro => {
      const entries = Object.entries(registro)
      
      for(let j = 0; j < busquedas.length; j++){
        let encontrado = false
        for(let i = 0; i < entries.length; i++){
          if(entries[i].toString().toLowerCase().includes(busquedas[j].toString().toLowerCase())){
            encontrado = true
            break
          }
        }

        if(!encontrado) return false
        
      }

      return true
      
    })
    
    switch(timerProp){
      case 'depositos':
        setTableDepositosContent(dataFiltrada)
        break
      case 'retiros':
        setTableRetirosContent(dataFiltrada)
        break
    }

    console.log('filtro aplicado')

  }, 1000);

  if(!conciliacion_global.timers[timerProp]) conciliacion_global.timers[timerProp] = []

  conciliacion_global.timers[timerProp].push(timer)

}

