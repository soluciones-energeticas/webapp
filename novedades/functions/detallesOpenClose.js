export {showDetalles,hideDetalles}

import { globalNovedades } from "../novedades.js"

function showDetalles(){
  const div = document.querySelector('#novedades_main_div #tabla_detalles')

  div.classList.remove('h-0')
  
}

function hideDetalles(){
  const div = document.querySelector('#novedades_main_div #tabla_detalles')

  div.classList.add('h-0')

  const activeTr = globalNovedades.activeTr

  if(activeTr){
    activeTr.classList.remove('bg_div_color')
    activeTr.classList.remove('text-white')
  }
  
}