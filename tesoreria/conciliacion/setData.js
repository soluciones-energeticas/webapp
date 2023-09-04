export { setTableDepositosContent,setTableRetirosContent,updateResumen,updateAll }

import { conciliacion_global } from "./getData.js";

function setTableDepositosContent(depositos){
  let html_depositos = ''

  depositos.forEach(deposito => {

    html_depositos += `
    <tr>
    <td class="p-2 d-none">${deposito['id']}</td>
    <td class="p-2">${deposito['fecha']}</td>
    <td class="p-2">${deposito['detalle']}</td>
    <td class="p-2">${Number(deposito['monto']).toLocaleString('en-US')}</td>
    </tr>
    `
    
  })
  
  depositos_table.querySelector('tbody').innerHTML = ''
  depositos_table.querySelector('tbody').innerHTML = html_depositos
}

function setTableRetirosContent(transacciones){
  let html_retiros = ''

  transacciones.forEach(retiro => {
    let options_html = ''

    conciliacion_global.estatus.forEach(estatus => {
      if(retiro.estatus == estatus) options_html += `<option value="${estatus}" selected>${estatus}</option>`
      else options_html += `<option value="${estatus}">${estatus}</option>`
    })
    
    html_retiros += `
    <tr>
      <td class="p-2 d-none prop-id">${retiro['id']}</td>
      <td class="p-2 prop-fecha">${retiro['fecha']}</td>
      <td class="p-2 prop-no_cheque">${retiro['no_cheque']}</td>
      <td class="p-2 prop-beneficiario">${retiro['beneficiario']}</td>
      <td class="p-2 prop-concepto">${retiro['concepto']}</td>
      <td class="p-2 prop-monto">${Number(retiro['monto']).toLocaleString('en-US')}</td>
      <td class="p-2 prop-impuesto">
        <select class="form-select form-select-sm">
          <option value="0.15" selected>0.15%</option>
          <option value="100">RD$100</option>
        </select>
      </td>
      <td class="d-none prop-empresa">${retiro['empresa']}</td>
      <td class="p-2 prop-estatus"><select class="form-select form-select-sm">${options_html}</select></td>
    </tr>
    `
    
  })
  
  retiros_table.querySelector('tbody').innerHTML = ''
  retiros_table.querySelector('tbody').innerHTML = html_retiros
}

function updateAll(){
  const empresa_input = document.querySelector('#empresa_input')
  const fecha_input = document.querySelector('#fecha_input')

  document.querySelector('#buscar_depositos_input').value = ''
  document.querySelector('#buscar_retiros_input').value = ''
  
  const depositos = conciliacion_global.depositos.filter(e => e.fecha == fecha_input.value)
  const transaccionesEmpresa = conciliacion_global.dataEmpresas?.[empresa_input.value]
  const transacciones = transaccionesEmpresa.filter(e => e.fecha_cuadre == fecha_input.value)

  setTableDepositosContent(depositos)
  setTableRetirosContent(transacciones)
  updateResumen()
  
  
}

function updateResumen(){
  const resumen_balance_banco_p = document.querySelector('#resumen_balance_banco_p')
  const balance_anterior_libro_p = document.querySelector('#balance_anterior_libro_p')
  const resumen_depositos_p = document.querySelector('#resumen_depositos_p')
  const resumen_pagos_emitidos_p = document.querySelector('#resumen_pagos_emitidos_p')
  const resumen_ajuste_imp_transferencia_p = document.querySelector('#resumen_ajuste_imp_transferencia_p')
  const resumen_balance_libro_p = document.querySelector('#resumen_balance_libro_p')
  const resumen_transitos_p = document.querySelector('#resumen_transitos_p')
  const resumen_entregados_p = document.querySelector('#resumen_entregados_p')
  const resumen_retenidos_p = document.querySelector('#resumen_retenidos_p')
  const resumen_ajuste_nulo_p = document.querySelector('#resumen_ajuste_nulo_p')
  const resumen_balance_libro_comprobacion_p = document.querySelector('#resumen_balance_libro_comprobacion_p')
  const resumen_comprobacion_p = document.querySelector('#resumen_comprobacion_p')
  const fecha_input = document.querySelector('#fecha_input')
  const empresa_input = document.querySelector('#empresa_input')

  resumen_balance_banco_p.value = ''
  balance_anterior_libro_p.textContent = '0.00'
  resumen_depositos_p.textContent = '0.00'
  resumen_pagos_emitidos_p.textContent = '0.00'
  resumen_ajuste_imp_transferencia_p.value = ''
  resumen_balance_libro_p.textContent = '0.00'
  resumen_transitos_p.textContent = '0.00'
  resumen_entregados_p.textContent = '0.00'
  resumen_retenidos_p.textContent = '0.00'
  resumen_ajuste_nulo_p.textContent = '0.00'
  resumen_balance_libro_comprobacion_p.textContent = '0.00'
  resumen_comprobacion_p.textContent = '0.00'
  fecha_input.textContent = '0.00'

  if(!fecha_input.value || !empresa_input.value) return
  
  const fechaActual = fecha_input.value
  let totalDepositos = 0,
  totalPagosEmitidos = 0,
  totalAjusteImp = 0,
  totalBalanceBanco = 0,
  totalTransito = 0,
  totalRetenido = 0,
  totalEntregado = 0,
  totalNulo = 0

  const estatus_types = {
    transito : ["Retenido","Entregado"]
  }

  conciliacion_global.dataEmpresas[empresa_input.value].forEach(retiro => {

    if(retiro.fecha_cuadre == fechaActual){

      if(retiro.impuesto == '0.15'){
        totalPagosEmitidos += 1.0015 * parseFloat(retiro.monto)
      }else if(retiro.impuesto == '100'){
        totalPagosEmitidos += parseFloat(retiro.monto) + 100
      }

    }

    if(estatus_types.transito.includes(retiro.estatus)){

      if(retiro.impuesto == '0.15'){
        totalTransito += 1.0015 * parseFloat(retiro.monto)
      }else if(retiro.impuesto == '100'){
        totalTransito += parseFloat(retiro.monto) + 100
      }

    }

    if(retiro.estatus == 'Retenido'){

      if(retiro.impuesto == '0.15'){
        totalRetenido += 1.0015 * parseFloat(retiro.monto)
      }else if(retiro.impuesto == '100'){
        totalRetenido += parseFloat(retiro.monto) + 100
      }

    }

    if(retiro.estatus == 'Entregado'){

      if(retiro.impuesto == '0.15'){
        totalEntregado += 1.0015 * parseFloat(retiro.monto)
      }else if(retiro.impuesto == '100'){
        totalEntregado += parseFloat(retiro.monto) + 100
      }

    }
    
  })

  conciliacion_global.depositos.forEach(deposito => {
    if(deposito.fecha == fechaActual){
      totalDepositos += parseFloat(deposito.monto)
    }
    
  })

  conciliacion_global.ajustes_imp.forEach(ajuste => {
    if(ajuste.fecha == fechaActual){
      totalAjusteImp += parseFloat(ajuste.monto)
    }
    
  })

  conciliacion_global.balances_bancos.forEach(balance => {
    if(balance.fecha == fechaActual){
      totalBalanceBanco += parseFloat(balance.balance)
    }
    
  })

  let balance_anterior_libro = 0

  //buscar el primer balance en libro registrado cuya fecha sea menor a la actual. Los balances en libro estan ordenados de forma descendente de mas reciente a mas antiguo
  for(let i = 0; i < conciliacion_global.balances_libros.length; i++){
    const balance = conciliacion_global.balances_libros[i]
    const arr1 = balance.fecha.split('-')
    const arr2 = fechaActual.split('-')
    const f1 = new Date(arr1[0],parseInt(arr1[1]) - 1,arr1[2])
    const f2 = new Date(arr2[0],parseInt(arr2[1]) - 1,arr2[2])
    if(f1.getTime() < f2.getTime()){
      balance_anterior_libro = balance.balance
      break
    }
  }

  const balance_libro_1 = balance_anterior_libro + totalDepositos - totalPagosEmitidos + totalAjusteImp
  const balance_libro_2 = totalBalanceBanco - totalTransito + totalNulo
  const comprobacion = balance_libro_1 - balance_libro_2
  
  balance_anterior_libro_p.textContent = balance_anterior_libro.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
  resumen_depositos_p.textContent = parseFloat(totalDepositos).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
  resumen_pagos_emitidos_p.textContent = parseFloat(totalPagosEmitidos).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
  resumen_ajuste_imp_transferencia_p.value = parseFloat(totalAjusteImp).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})

  resumen_balance_libro_p.textContent = balance_libro_1.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
  resumen_balance_libro_p.setAttribute('numericValue',balance_libro_1)

  resumen_balance_banco_p.value = parseFloat(totalBalanceBanco).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
  resumen_transitos_p.textContent = parseFloat(totalTransito).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
  resumen_entregados_p.textContent = parseFloat(totalEntregado).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
  resumen_retenidos_p.textContent = parseFloat(totalRetenido).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
  resumen_ajuste_nulo_p.textContent = parseFloat(totalNulo).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})

  resumen_balance_libro_comprobacion_p.textContent = balance_libro_2.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})

  resumen_comprobacion_p.textContent = comprobacion.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})

}