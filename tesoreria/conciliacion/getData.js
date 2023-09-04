export { conciliacion_global,getAll }

import { modal } from "../../scripts.js"
import { setTableRetirosContent } from "./setData.js"

window.soleswebapp.tesoreria = { conciliacion : {}}

const conciliacion_global = window.soleswebapp.tesoreria.conciliacion
conciliacion_global.dataEmpresas = {}
conciliacion_global.timers = {}

function getAll(){
  const url = 'https://script.google.com/macros/s/AKfycbzViU2XBYWhiy0ysNxkArI244q6yOftSFpubTgeGKUqMRMXzG0fW9e81hHHdJHn-7Xo/exec'
  
  const requests = [
    {
      method: "POST",
      Headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        action : 'dataInicial',
        token : sessionStorage.getItem('soles_webapp_session')
      })
    },
    {
      method: "POST",
      Headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        action : 'data transacciones',
        token : sessionStorage.getItem('soles_webapp_session')
      })
    },
    {
      method: "POST",
      Headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        action : 'get depositos',
        token : sessionStorage.getItem('soles_webapp_session')
      })
    },

  ]

  Promise.all([fetch(url,requests[0]),fetch(url,requests[1]),fetch(url,requests[2])])
    .then(values => {

      Promise.all([values[0].json(),values[1].json(),values[2].json()])
        .then(answers => {

          //solicitud inicial empresas, estatus, balances_bancos, balances_libros, ajustes_imp
          if(!answers[0].estatus){
            document.getElementById('modal_alertas_message').textContent = answers[0].message
            modal.show()
          }else{
            afterDataInicial(answers[0].data)
          }
          
          //solicitud data transacciones
          if(!answers[1].estatus){
            document.getElementById('modal_alertas_message').textContent = answers[1].message
            modal.show()
          }else{
            afterDataTransacciones(answers[1].data)
          }
          
          //solicitud data depositos
          if(!answers[2].estatus){
            document.getElementById('modal_alertas_message').textContent = answers[2].message
            modal.show()
          }else{
            afterDepositos(answers[2].data)
          }

          const empresa_input = document.querySelector('#empresa_input')
          const fecha_input = document.querySelector('#fecha_input')

          const transacciones = conciliacion_global.dataEmpresas?.[empresa_input.value]

          setTableRetirosContent(transacciones)

          
        })
      
    })
  
}

function afterDataInicial(data){
  conciliacion_global.balances_bancos = data.balances_bancos
  conciliacion_global.balances_libros = data.balances_libros
  conciliacion_global.ajustes_imp = data.ajustes_imp
  conciliacion_global.inputs_editables = data.inputs_editables
  conciliacion_global.estatus = data.estatus

  const empresa_input = document.querySelector('#empresa_input')
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

  document.querySelector('#depositos_table tbody').innerHTML = ''
  document.querySelector('#retiros_table tbody').innerHTML = ''
  resumen_guardar_btn.querySelector('.loading').classList.toggle('visually-hidden')
  resumen_guardar_btn.querySelector('.btn_text').classList.toggle('visually-hidden')
  resumen_guardar_btn.disabled = false

}

function afterDataTransacciones(data){
  data.dataEmpresas.forEach(e => conciliacion_global.dataEmpresas[e.empresa] = e.transacciones)
}

function afterDepositos(data){
  conciliacion_global.depositos = data
}
