export {guardarNuevosRegistros_cheques,guardarNuevoDeposito,guardarCuadre,actualizarEstatus,actualizarImpuesto}

import { modal } from "../scripts.js"
import { conciliacion_global } from "./conciliacion/getData.js"
import { updateAll } from "./conciliacion/setData.js"


function guardarNuevosRegistros_cheques(){
  const retiros_empresa_input = document.querySelector('#retiros_empresa_input')
  const retiros_fecha_input = document.querySelector('#retiros_fecha_input')
  const retiros_cheques_input = document.querySelector('#retiros_cheques_input')

  const files = retiros_cheques_input.files

  if(!files.length) return
  
  const file = files[0]
      
  readXlsxFile(file).then(rows => {
    let filas_encabezado = 0
    for(let i = 0; i < rows.length; i++){
      if(rows[i][0] == 'FECHA') break
      filas_encabezado++
    }
    rows.splice(0,filas_encabezado)

    const index = rows[0].indexOf('FECHA')

    for(let i = 1; i < rows.length; i++){
      rows[i][index] = JSON.stringify(rows[i][index]).split('T')[0].replace('"',"")
    }

    const empresa = retiros_empresa_input.value
    const fecha = retiros_fecha_input.value

    if(!fecha){
      modal.show()
      document.getElementById('modal_alertas_message').textContent = 'Se debe llenar el campo de fecha'
      return
    }
    
    const url = 'https://script.google.com/macros/s/AKfycbzViU2XBYWhiy0ysNxkArI244q6yOftSFpubTgeGKUqMRMXzG0fW9e81hHHdJHn-7Xo/exec'

    const jsonData = {
      action : 'new cheques',
      token : sessionStorage.getItem('soles_webapp_session'),
      data : rows,
      empresa,
      fecha
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
        document.getElementById('modal_alertas_message').textContent = res.message
        modal.show()
        return
      }

      conciliacion_global.dataEmpresas[empresa].splice(0,0,...res.data.dataObj)
      updateAll()
      console.log('Actualizado')
    })
    
  })



  
}

function guardarNuevoDeposito(){
  const empresa = depositos_empresa_input.value
  const url = 'https://script.google.com/macros/s/AKfycbzViU2XBYWhiy0ysNxkArI244q6yOftSFpubTgeGKUqMRMXzG0fW9e81hHHdJHn-7Xo/exec'

  const jsonData = {
    action : 'new deposito',
    token : sessionStorage.getItem('soles_webapp_session'),
    fecha : document.querySelector('#depositos_date_input').value,
    monto : document.querySelector('#depositos_monto_input').value,
    detalle : document.querySelector('#depositos_detalle_input').value,
    empresa
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
      document.getElementById('modal_alertas_message').textContent = res.message
      modal.show()
      return
    }

    conciliacion_global.depositos.push(res.data.dataObj)
    updateAll()
    console.log('Actualizado')
  })
  
}

function guardarCuadre(){
  const empresa = empresa_input.value
  const url = 'https://script.google.com/macros/s/AKfycbzViU2XBYWhiy0ysNxkArI244q6yOftSFpubTgeGKUqMRMXzG0fW9e81hHHdJHn-7Xo/exec'

  const jsonData = {
    action : 'save cuadre',
    token : sessionStorage.getItem('soles_webapp_session'),
    fecha : document.querySelector('#fecha_input').value,
    balance_banco : document.querySelector('#resumen_balance_banco_p').value,
    ajuste_imp : document.querySelector('#resumen_ajuste_imp_transferencia_p').value,
    balance_libro : document.querySelector('#resumen_balance_libro_p').getAttribute('numericValue'),
    empresa
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
      document.getElementById('modal_alertas_message').textContent = res.message
      modal.show()
      
      return
    }

    conciliacion_global.ajustes_imp = res.data.new_dataobj_ajuste_imp
    conciliacion_global.balances_bancos = res.data.new_dataobj_balance_banco
    conciliacion_global.balances_libros = res.data.new_dataobj_balance_libro

    const resumen_guardar_btn = document.querySelector('#resumen_guardar_btn')
    resumen_guardar_btn.querySelector('.loading').classList.toggle('visually-hidden')
    resumen_guardar_btn.querySelector('.btn_text').classList.toggle('visually-hidden')
    resumen_guardar_btn.disabled = false

    console.log('Actualizado')


    
    
  })
  
}

function actualizarEstatus(empresa,id,estatus){
  const url = 'https://script.google.com/macros/s/AKfycbzViU2XBYWhiy0ysNxkArI244q6yOftSFpubTgeGKUqMRMXzG0fW9e81hHHdJHn-7Xo/exec'

  const jsonData = {
    action : 'update estatus',
    token : sessionStorage.getItem('soles_webapp_session'),
    id,
    estatus,
    empresa
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
      document.getElementById('modal_alertas_message').textContent = res.message
      modal.show()
      return
    }

    conciliacion_global.dataEmpresas[empresa].find(e => e.id == id).estatus = estatus
    updateAll()
    
  })
  
}

function actualizarImpuesto(empresa,id,impuesto){
  const url = 'https://script.google.com/macros/s/AKfycbzViU2XBYWhiy0ysNxkArI244q6yOftSFpubTgeGKUqMRMXzG0fW9e81hHHdJHn-7Xo/exec'

  const jsonData = {
    action : 'update impuesto',
    token : sessionStorage.getItem('soles_webapp_session'),
    id,
    impuesto,
    empresa
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
      document.getElementById('modal_alertas_message').textContent = res.message
      modal.show()
      return
    }

    conciliacion_global.dataEmpresas[empresa].find(e => e.id == id).impuesto = impuesto
    updateAll()

    console.log('Actualizado')
    
  })
  
}