
import { afterDataTransacciones,afterDepositos,afterDataInicial } from "./setData.js"

window.soleswebapp.tesoreria = { conciliacion : {}}

const conciliacion_global = window.soleswebapp.tesoreria.conciliacion
conciliacion_global.dataEmpresas = {}
conciliacion_global.timers = {}

export { getDataInicial,getDataTransacciones,getDepositos,conciliacion_global }

function getDataInicial(){
  const url = 'https://script.google.com/macros/s/AKfycbzViU2XBYWhiy0ysNxkArI244q6yOftSFpubTgeGKUqMRMXzG0fW9e81hHHdJHn-7Xo/exec'

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
   .then(ans => ans.json())
   .then(ans => {
      console.log(ans)
      if(ans.estatus){
        console.log('Listo solicitud inicial')
        afterDataInicial(ans.data)
      }else{
        console.log(ans.message)
      }
   })
   .catch(err => console.log(err.message))
  
}

function getDataTransacciones(){
  const url = 'https://script.google.com/macros/s/AKfycbzViU2XBYWhiy0ysNxkArI244q6yOftSFpubTgeGKUqMRMXzG0fW9e81hHHdJHn-7Xo/exec'

  const jsonData = {
    action : 'data transacciones',
    token : sessionStorage.getItem('soles_webapp_session')
  }
  
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  console.log('Iniciando solicitud transacciones')

  fetch(url,options)
   .then(ans => ans.json())
   .then(ans => {
      console.log(ans)
      if(ans.estatus){
        console.log('Listo transacciones')
        afterDataTransacciones(ans.data)
      }else{
        console.log(ans.message)
      }
   })
   .catch(err => console.log(err.message))
}

function getDepositos(){
  const url = 'https://script.google.com/macros/s/AKfycbzViU2XBYWhiy0ysNxkArI244q6yOftSFpubTgeGKUqMRMXzG0fW9e81hHHdJHn-7Xo/exec'

  const jsonData = {
    action : 'get depositos',
    token : sessionStorage.getItem('soles_webapp_session')
  }
  
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  console.log('Iniciando solicitud depositos')

  fetch(url,options)
   .then(ans => ans.json())
   .then(ans => {
      if(ans.estatus){
        console.log('Listo depositos')
        afterDepositos(ans.data)
      }else{
        console.log(ans.message)
      }
   })
   .catch(err => console.log(err.message))
}