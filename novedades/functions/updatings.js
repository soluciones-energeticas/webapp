export { updateEstatus,updateResponsable,updateSoporteCierre }

import { url } from "../novedades.js";
import { modal } from "../../scripts.js";
import { globalNovedades } from "../novedades.js";
import { setTableContent } from "../renders/tableRender.js";
import { tableRowClick } from "./tableRowClick.js";
import { activateBtn } from "../../scripts.js";

function updateEstatus(id,estatus){
  const jsonData = {
    action : 'update estatus',
    token : sessionStorage.getItem('soles_webapp_session'),
    data : { id,estatus }
  }
    
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  fetch(url,options).then(res => res.json())
    .then(res => {
      if(res.estatus){
        const novedad = globalNovedades.novedades.find(e => e.id == id)
        if(!novedad) return 
        
        novedad.estatus = estatus

        setTableContent(globalNovedades.novedades)
        
      }else{
        modal.show()
        document.getElementById('modal_alertas_message').textContent = res.message
      }
      
      tableRowClick(globalNovedades.main,globalNovedades.activeTr)
      
    })
  
}

function updateResponsable(id,responsable,nombre_responsable){
  const jsonData = {
    action : 'update responsable',
    token : sessionStorage.getItem('soles_webapp_session'),
    data : { id,responsable,nombre_responsable }
  }
    
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  fetch(url,options).then(res => res.json())
    .then(res => {
      if(res.estatus){
        const novedad = globalNovedades.novedades.find(e => e.id == id)
        if(!novedad) return 
        
        novedad.responsable = responsable

        setTableContent(globalNovedades.novedades)
        
      }else{
        modal.show()
        document.getElementById('modal_alertas_message').textContent = res.message
      }
      
      tableRowClick(globalNovedades.main,globalNovedades.activeTr)
      
    })
  
}

function updateSoporteCierre(id,soporte,btn){
  const jsonData = {
    action : 'update soporte cierre',
    token : sessionStorage.getItem('soles_webapp_session'),
    data : { id,soporte }
  }
    
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  fetch(url,options).then(res => res.json())
    .then(res => {
      activateBtn(btn,"Guardar")

      if(res.estatus){
        const novedad = globalNovedades.novedades.find(e => e.id == id)
        if(!novedad) return 
        
        novedad.soporte_cierre = res.data.soporte
        novedad.estatus = res.data.estatus

        setTableContent(globalNovedades.novedades)
        
      }else{
        modal.show()
        document.getElementById('modal_alertas_message').textContent = res.message
      }
      
      
    })
  
}