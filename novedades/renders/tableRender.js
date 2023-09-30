export {setTableContent}

import { globalNovedades } from "../novedades.js";
import { filterData } from "../functions/filterData.js";
import { updateResumen } from "../components/resumen.js";

function setTableContent(){
  const data = filterData()
  const fragment = document.createDocumentFragment()

  data.forEach(e => {
    const name = e.nom_empleado.toLowerCase();
    const capitalizedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const tr = document.createElement('tr')
    const marcadorCompletado = e.estatus == 'Completado' ? ' bg_lightgreen border-bottom border-2 border-white' : ''
    const arr = e.fecha_ingreso.split('T')[0].split('-')
    const fecha_ingreso = `${arr[2]}-${arr[1]}-${arr[0]}`
    tr.className = `border-0${marcadorCompletado}`
    tr.innerHTML = `
    <td class="px-1 text-center"><input type="checkbox"></td>
    <td class="px-1 novedades_row_id"><p class="m-0 p-0 text-center">${e.id}</td>
    <td class="px-1 novedades_row_id"><p class="m-0 p-0 text-center">${fecha_ingreso}</td>
    <td class="px-1 "><p class="m-0 p-0 text-center">${e.num_empleado}</td>
    <td class="px-1 "><p class="m-0 p-0">${capitalizedName}</td>
    <td class="px-1 "><p class="m-0 p-0">${e.novedad}</td>
    `
    fragment.append(tr)
  });

  const tbody = globalNovedades.main.querySelector('#table_novedades tbody')

  tbody.innerHTML = ''

  tbody.append(fragment)

  updateResumen(data)
  
}