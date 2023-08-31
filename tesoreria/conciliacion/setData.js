export { update_tables,afterDataTransacciones,afterDepositos,setTableDepositosContent,setTableRetirosContent,afterDataInicial,updateResumen }

import { conciliacion_global } from "./getData.js";


function afterDataInicial(data){
  conciliacion_global.balances_bancos = data.balances_bancos
  conciliacion_global.ajustes_imp = data.ajustes_imp
  conciliacion_global.inputs_editables = data.inputs_editables
  conciliacion_global.estatus = data.estatus

  const empresa_input = document.querySelector('#empresa_input')
  const fecha_input = document.querySelector('#fecha_input')
  const retiros_empresa_input = document.querySelector('#retiros_empresa_input')
  const depositos_empresa_input = document.querySelector('#depositos_empresa_input')
  let empresa_options = ''

  data.empresas.forEach(element => {
    empresa_options += `<option value="${element}">${element}</option>`
  });
  
  empresa_input.innerHTML = empresa_options
  retiros_empresa_input.innerHTML = empresa_options
  depositos_empresa_input.innerHTML = empresa_options

  conciliacion_global.inputs_editables.forEach(input => {
    document.querySelector(`#${input}`).disabled = false
  })
  
  
}

function update_tables(){
  afterDataTransacciones()
  afterDepositos()
}

function afterDataTransacciones(data){
  const empresa_input = document.querySelector('#empresa_input')
  const fecha_input = document.querySelector('#fecha_input')
  const resumen_guardar_btn = document.querySelector('#resumen_guardar_btn')
  const empresa = empresa_input.value
  let diaFiltro

  if(data){
    data.dataEmpresas.forEach(e => conciliacion_global.dataEmpresas[e.empresa] = e.transacciones)
  }

  if(!(conciliacion_global.dataEmpresas[empresa])) return

  if(fecha_input.value) diaFiltro = fecha_input.value
  else diaFiltro = conciliacion_global.dataEmpresas[empresa][0]?.fecha

  if(!diaFiltro) return

  fecha_input.value = diaFiltro

  const transacciones = conciliacion_global.dataEmpresas[empresa].filter(retiro => retiro.fecha == diaFiltro)

  setTableRetirosContent(transacciones)

  updateResumen()
  
  empresa_input.disabled = false
  fecha_input.disabled = false
  resumen_guardar_btn.disabled = false
  resumen_guardar_btn.querySelector('.loading').classList.add('visually-hidden')
  resumen_guardar_btn.querySelector('.btn_text').classList.remove('visually-hidden')
  
}

function afterDepositos(data){
  if(data) conciliacion_global.depositos = data

  if(!conciliacion_global.depositos) return

  const empresa = document.querySelector('#empresa_input').value
  const fecha_input = document.querySelector('#fecha_input')
  const depositos_table = document.querySelector('#depositos_table')
  let diaFiltro
  
  if(fecha_input.value) diaFiltro = fecha_input.value
  else diaFiltro = conciliacion_global.depositos[0]?.fecha
  
  if(!diaFiltro) return
  
  const depositos = conciliacion_global.depositos.filter(deposito => {
    return deposito.fecha == diaFiltro && deposito.empresa == empresa
  })
  
  setTableDepositosContent(depositos)
  
}

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
          <option value="0.15%" selected>0.15%</option>
          <option value="100">100</option>
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
  // const resumen_vencidos_p = document.querySelector('#resumen_vencidos_p')
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
  // resumen_vencidos_p.textContent = '0.00'
  resumen_ajuste_nulo_p.textContent = '0.00'
  resumen_balance_libro_comprobacion_p.textContent = '0.00'
  resumen_comprobacion_p.textContent = '0.00'
  fecha_input.textContent = '0.00'

  if(!fecha_input.value || !empresa_input.value) return
  
  const fecha_arr = fecha_input.value.split('-')
  const dia = Number(fecha_arr[2])
  const mes = Number(fecha_arr[1]) - 1
  const ano = Number(fecha_arr[0])
  const fechaActual = fecha_input.value
  const fechaAnterior = JSON.stringify(new Date(ano,mes,dia - 1)).split('T')[0].replace('"',"")
  let totalDepositos = 0,
  totalPagosEmitidos = 0,
  totalAjusteImp = 0,
  totalBalanceBanco = 0,
  totalDepositos_anterior = 0,
  totalPagosEmitidos_anterior = 0,
  totalAjusteImp_anterior = 0,
  totalTransito = 0,
  totalRetenido = 0,
  totalVencido = 0,
  totalEntregado = 0,
  totalNulo = 0

  const estatus_types = {
    transito : ["Retenido","Entregado"]
  }

  conciliacion_global.dataEmpresas[empresa_input.value].forEach(retiro => {

    if(retiro.fecha == fechaActual){

      if(retiro.impuesto == '0.15%'){
        totalPagosEmitidos += 1.0015 * parseFloat(retiro.monto)
      }else if(retiro.impuesto == '100'){
        totalPagosEmitidos += parseFloat(retiro.monto) + 100
      }

      
      
    }

    if(retiro.fecha == fechaAnterior){

      if(retiro.impuesto == '0.15%'){
        totalPagosEmitidos_anterior += 1.0015 * parseFloat(retiro.monto)
      }else if(retiro.impuesto == '100'){
        totalPagosEmitidos_anterior += parseFloat(retiro.monto) + 100
      }

    }

    if(estatus_types.transito.includes(retiro.estatus)){

      if(retiro.impuesto == '0.15%'){
        totalTransito += 1.0015 * parseFloat(retiro.monto)
      }else if(retiro.impuesto == '100'){
        totalTransito += parseFloat(retiro.monto) + 100
      }

    }

    if(retiro.estatus == 'Retenido'){

      if(retiro.impuesto == '0.15%'){
        totalRetenido += 1.0015 * parseFloat(retiro.monto)
      }else if(retiro.impuesto == '100'){
        totalRetenido += parseFloat(retiro.monto) + 100
      }

    }

    if(retiro.estatus == 'Entregado'){

      if(retiro.impuesto == '0.15%'){
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

    if(deposito.fecha == fechaAnterior){
      totalDepositos_anterior += parseFloat(deposito.monto)
    }
    
  })

  conciliacion_global.ajustes_imp.forEach(ajuste => {
    if(ajuste.fecha == fechaActual){
      totalAjusteImp += parseFloat(ajuste.monto)
    }
    
    if(ajuste.fecha == fechaAnterior){
      totalAjusteImp_anterior += parseFloat(ajuste.monto)
    }
    
  })

  conciliacion_global.balances_bancos.forEach(balance => {
    if(balance.fecha == fechaActual){
      totalBalanceBanco += parseFloat(balance.balance)
    }
    
  })
  
  balance_anterior_libro_p.textContent = (totalDepositos_anterior - totalPagosEmitidos_anterior - totalAjusteImp_anterior).toLocaleString('en-US')
  resumen_depositos_p.textContent = totalDepositos.toLocaleString('en-US')
  resumen_pagos_emitidos_p.textContent = totalPagosEmitidos.toLocaleString('en-US')
  resumen_ajuste_imp_transferencia_p.value = totalAjusteImp.toLocaleString('en-US')
  resumen_balance_libro_p.textContent = ((totalDepositos_anterior - totalPagosEmitidos_anterior - totalAjusteImp_anterior) + totalDepositos - totalPagosEmitidos + totalAjusteImp).toLocaleString('en-US')
  resumen_balance_banco_p.value = totalBalanceBanco.toLocaleString('en-US')
  resumen_transitos_p.textContent = totalTransito.toLocaleString('en-US')
  resumen_entregados_p.textContent = totalEntregado.toLocaleString('en-US')
  resumen_retenidos_p.textContent = totalRetenido.toLocaleString('en-US')
  // resumen_vencidos_p.textContent = totalVencido.toLocaleString('en-US')
  resumen_ajuste_nulo_p.textContent = totalNulo.toLocaleString('en-US')

  resumen_balance_libro_comprobacion_p.textContent = (totalBalanceBanco - totalTransito + totalNulo).toLocaleString('en-US')

  resumen_comprobacion_p.textContent = ( (totalBalanceBanco - totalTransito + totalNulo) - ((totalDepositos_anterior - totalPagosEmitidos_anterior - totalAjusteImp_anterior) + totalDepositos - totalPagosEmitidos - totalAjusteImp) ).toLocaleString('en-US')

  
}