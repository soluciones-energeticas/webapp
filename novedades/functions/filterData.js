export { filterData }

import { globalNovedades } from "../novedades.js"


function filterData(){
  const responsable = document.querySelector('#novedades_main_div #filtro_responsables_select_input')
  const estatus = document.querySelector('#novedades_main_div #filtro_estatus_select_input')
  const search = document.querySelector('#novedades_main_div #search_input').value
  const novedades = globalNovedades.novedades

  const novedadesFiltradas = novedades.filter(novedad => {

    if(!checkSearch(search,novedad)) return false

    if(responsable.value && novedad.responsable != responsable.value) return false

    if(estatus.value && novedad.estatus != estatus.value) return false

    return true
    
  })
  
  return novedadesFiltradas
}

function checkSearch(search,novedad){
  if(!search) return true

  const arr_fecha_ingreso = novedad.fecha_ingreso.split('T')[0].split('-')
  const fecha_ingreso = `${arr_fecha_ingreso[2]}-${arr_fecha_ingreso[1]}-${arr_fecha_ingreso[0]}`

  const arr = search.split(';')
  const propiedades = [
    'id',
    'fecha_ingreso',
    'usuario',
    'num_empleado',
    'nom_empleado',
    'novedad',
    'observaciones',
  ]

  let incluye = true

  for(let search of arr){
    let enNovedad = false
    for(let propiedad of propiedades){
      if(propiedad == 'fecha_ingreso' && fecha_ingreso.includes(search)){
        enNovedad = true
        break
      }else if(novedad[propiedad].toString().toLowerCase().includes(search.toLowerCase())){
        enNovedad = true
        break
      }
    }

    if(!enNovedad){
      incluye = false
      break
    }
    
  }

  if(incluye) return true
  
  return false
  
}