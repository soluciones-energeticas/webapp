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
  const empresa = document.querySelector('#empresa_input').value
  const fecha_input = document.querySelector('#fecha_input')
  const retiros_table = document.querySelector('#retiros_table')
  let diaFiltro
  
  if(data){
    data.dataEmpresas.forEach(e => conciliacion_global.dataEmpresas[e.empresa] = e.transacciones)
  }

  if(!(conciliacion_global.dataEmpresas[empresa])) return
  
  if(fecha_input.value) diaFiltro = fecha_input.value
  else diaFiltro = conciliacion_global.dataEmpresas[empresa][0]?.fecha
  
  if(!diaFiltro) return
  
  const transacciones = conciliacion_global.dataEmpresas[empresa].filter(retiro => retiro.fecha == diaFiltro)

  setTableRetirosContent(transacciones)

  empresa_input.disabled = false
  fecha_input.disabled = false
  
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
      <td class="p-2 prop-estatus"><select class="form-select form-select-sm">${options_html}</select></td>
      <td class="d-none prop-empresa">${retiro['empresa']}</td>
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
  const resumen_vencidos_p = document.querySelector('#resumen_vencidos_p')
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
  resumen_vencidos_p.textContent = '0.00'
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
  
  const totalDepositos = conciliacion_global.depositos.filter(e => e['fecha'] == fechaActual).reduce((previus,current) => {
    return previus + Number(current['monto'])
  },0)

  const totalPagosEmitidos = conciliacion_global.dataEmpresas[empresa_input.value].filter(e => e['fecha'] == fechaActual).reduce((previus,current) => {
    return previus + Number(current['monto'])
  },0)

  const totalAjusteImp = conciliacion_global.ajustes_imp.filter(e => e['fecha'] == fechaActual).reduce((previus,current) => {
    return previus + Number(current['monto'])
  },0)

  const totalBalanceBanco = conciliacion_global.balances_bancos.filter(e => e['fecha'] == fechaActual).reduce((previus,current) => {
    return previus + Number(current['balance'])
  },0)

  resumen_depositos_p.textContent = totalDepositos.toLocaleString('en-US')
  resumen_pagos_emitidos_p.textContent = totalPagosEmitidos.toLocaleString('en-US')
  resumen_ajuste_imp_transferencia_p.value = totalAjusteImp.toLocaleString('en-US')
  resumen_balance_libro_p.textContent = (totalDepositos - totalPagosEmitidos - totalAjusteImp).toLocaleString('en-US')
  resumen_balance_banco_p.value = totalBalanceBanco.toLocaleString('en-US')
  
  const totalDepositos_anterior = conciliacion_global.depositos.filter(e => e['fecha'] == fechaAnterior).reduce((previus,current) => {
    return previus + Number(current['monto'])
  },0)
  
  const totalPagosEmitidos_anterior = conciliacion_global.dataEmpresas[empresa_input.value].filter(e => e['fecha'] == fechaAnterior).reduce((previus,current) => {
    return previus + Number(current['monto'])
  },0)
  
  const totalAjusteImp_anterior = conciliacion_global.ajustes_imp.filter(e => e['fecha'] == fechaAnterior).reduce((previus,current) => {
    return previus + Number(current['monto'])
  },0)
  
  balance_anterior_libro_p.textContent = (totalDepositos_anterior - totalPagosEmitidos_anterior - totalAjusteImp_anterior).toLocaleString('en-US')
  
}