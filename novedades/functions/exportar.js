export { exportar }


import { header } from "../components/header.js";
import { filterData } from "./filterData.js"

function exportar(){
  const novedades = filterData()

  const columnas = [
    'id',
    'num_empleado',
    'nom_empleado',
    'novedad',
    'observaciones',
    'estatus',
    'responsable',
    'departamento',

  ]

  if(!novedades.length) return
  
  const rows = []

  novedades.forEach(novedad => {
    const newRow = []

    if(!rows.length){
      const headerRow = []
      columnas.forEach(key => {
        headerRow.push({value : key})
        newRow.push({value : novedad[key]})
      })
      rows.push(headerRow)
      rows.push(newRow)
    }else{
      columnas.forEach(key => {
        newRow.push({value : novedad[key]})
      })
      rows.push(newRow)

    }

    
    
    
  });

  writeXlsxFile(rows, {
    fileName: 'novedades.xlsx'
  })
  
}