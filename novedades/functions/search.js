export {  }

import { globalNovedades } from "../novedades.js"
import { setTableContent } from "../renders/tableRender.js"

function findNovedades(value){
  const arr = value.split(';')
  const propiedades = [
    'id',
    'fecha_ingreso',
    'usuario',
    'num_empleado',
    'nom_empleado',
    'novedad',
    'observaciones',
  ]

  const matchNovedades = []

  console.clear()

  for(let novedad of globalNovedades.novedades){
    console.log('-----------------------------------')
    let incluye = true
    const arr_fecha_ingreso = novedad.fecha_ingreso.split('T')[0].split('-')
    const fecha_ingreso = `${arr_fecha_ingreso[2]}-${arr_fecha_ingreso[1]}-${arr_fecha_ingreso[0]}`
    console.log(fecha_ingreso,novedad.fecha_ingreso)

    for(let search of arr){
      let enNovedad = false
      for(let propiedad of propiedades){
        console.log(propiedad)
        if(propiedad == 'fecha_ingreso' && fecha_ingreso.includes(search)){
          console.log(fecha_ingreso.includes(search))
          enNovedad = true
          break
        }else if(novedad[propiedad].toString().toLowerCase().includes(search.toLowerCase())){
          enNovedad = true
          break
        }
      }

      if(!enNovedad){
        console.log('no incluida')
        incluye = false
        break
      }
      
      console.log('incluida')
    }

    console.log(incluye)

    if(incluye) matchNovedades.push(novedad)
    
  }

  console.log(matchNovedades)
  
  setTableContent(matchNovedades)
  
}