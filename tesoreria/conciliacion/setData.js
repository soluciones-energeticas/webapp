export { setInputOptions,update_tables,afterDataTransacciones,afterDepositos,setTableDepositosContent,setTableRetirosContent }

import { conciliacion_global } from "./getData.js";


function setInputOptions(data){
  
  const empresa_input = document.querySelector('#empresa_input')
  let empresa_options = ''
  data.empresas.forEach(element => {
    empresa_options += `<option value="${element}">${element}</option>`
  });
  empresa_input.innerHTML = empresa_options
  
  conciliacion_global.estatus = data.estatus
  
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
      <td class="p-2 d-none">${retiro['id']}</td>
      <td class="p-2">${retiro['fecha']}</td>
      <td class="p-2">${retiro['no_cheque']}</td>
      <td class="p-2">${retiro['beneficiario']}</td>
      <td class="p-2">${retiro['concepto']}</td>
      <td class="p-2">${Number(retiro['monto']).toLocaleString('en-US')}</td>
      <td class="p-2"><select class="form-select form-select-sm">${options_html}</select></td>
    </tr>
    `
    
  })
  
  retiros_table.querySelector('tbody').innerHTML = ''
  retiros_table.querySelector('tbody').innerHTML = html_retiros
}