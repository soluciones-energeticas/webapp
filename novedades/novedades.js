export { showNovedadesSection,globalNovedades,url }

import { title,header } from "./components/header.js";
import { modal } from "../scripts.js";
import { table } from "./components/table.js";
import { bodySection } from "./components/bodySection.js";
import { setTableContent } from "./renders/tableRender.js";
import { setListeners } from "./functions/listeners.js";
import { modalNewNovedades } from "./components/newNovedadForm.js";
import { setEstatusHTML,setResponsablesHTML } from "./functions/detallesSelect.js";
import { resumen } from "./components/resumen.js";
import { filtros } from "./components/filtros.js";

window.soleswebapp.novedades = { globalNovedades : {} }

const globalNovedades = window.soleswebapp.novedades.globalNovedades
const url = 'https://script.google.com/macros/s/AKfycbzZEbdTjWvOk79u4JVAHrZTgVsLZjDAFgiESPhSfAjb2HxBIVCS9IQUzCZ37GlDE2I_Ig/exec'

function showNovedadesSection(){
  promiseAllNovedades()
  getEmpleados()
  getTiposNovedades()
  
  const mainDiv = document.createElement('div')
  mainDiv.className = 'h-100 p-2 d-flex flex-column fs-6 fw-lighter'
  mainDiv.id = 'novedades_main_div'

  mainDiv.append(title())
  mainDiv.append(bodySection())

  const main = document.querySelector('main')

  main.innerHTML = ''
  
  main.append(mainDiv)

  globalNovedades.main = mainDiv

  setListeners()
  
}

function promiseAllNovedades(){
  Promise.all([getNovedades(),getEstatus(),getResponsables()])
    .then(res => {
      // document.querySelector('#novedades_main_div #bodySectionLeftSide').prepend(resumen())
    })
}

function getNovedades(){

  const jsonData = {
    action : 'get novedades',
    token : sessionStorage.getItem('soles_webapp_session')
  }
    
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  return fetch(url,options).then(res => res.json())
    .then(res => {
      if(res.estatus){
        globalNovedades.novedades = res.data
        setTableContent()
        document.querySelector('#novedades_main_div #search_input').disabled = false
      }else{
        modal.show()
        document.getElementById('modal_alertas_message').textContent = res.message
      }

    })
  
}

function getEmpleados(){

  const jsonData = {
    action : 'get empleados',
    token : sessionStorage.getItem('soles_webapp_session')
  }
    
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  fetch(url,options).then(res => res.json())
    .then(res => {
      if(res.estatus){
        globalNovedades.empleados = res.data
      }else{
        modal.show()
        document.getElementById('modal_alertas_message').textContent = res.message
      }

    })
  
}

function getTiposNovedades(){

  const jsonData = {
    action : 'get tipos novedades',
    token : sessionStorage.getItem('soles_webapp_session')
  }
    
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  fetch(url,options).then(res => res.json())
    .then(res => {
      if(res.estatus){
        globalNovedades.tiposNovedades = res.data
        getPermisos()
      }else{
        modal.show()
        document.getElementById('modal_alertas_message').textContent = res.message
      }

    })
  
}

function getPermisos(){

  const jsonData = {
    action : 'get permisos',
    token : sessionStorage.getItem('soles_webapp_session')
  }
    
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  fetch(url,options).then(res => res.json())
    .then(res => {
      if(res.estatus){
        globalNovedades.permisos = res.data

        if(res.data.crear_novedad){
          modalNewNovedades()
          globalNovedades.main.querySelector('#nuevo_btn').disabled = false
        }
        
      }else{
        modal.show()
        document.getElementById('modal_alertas_message').textContent = res.message
      }

    })
  
}

function getEstatus(){

  const jsonData = {
    action : 'get estatus',
    token : sessionStorage.getItem('soles_webapp_session')
  }
    
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  return fetch(url,options).then(res => res.json())
    .then(res => {
      if(res.estatus){
        globalNovedades.estatus = res.data
        setEstatusHTML()
      }else{
        modal.show()
        document.getElementById('modal_alertas_message').textContent = res.message
      }

    })
  
}

function getResponsables(){

  const jsonData = {
    action : 'get responsables',
    token : sessionStorage.getItem('soles_webapp_session')
  }
    
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  return fetch(url,options).then(res => res.json())
    .then(res => {
      if(res.estatus){
        globalNovedades.responsables = res.data
        setResponsablesHTML()
      }else{
        modal.show()
        document.getElementById('modal_alertas_message').textContent = res.message
      }

    })
  
}