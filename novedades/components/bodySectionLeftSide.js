export { bodySectionLeftSide }

import { table } from "./table.js"
import { filtros } from "./filtros.js"
import { header } from "./header.js"
import { resumen } from "./resumen.js"

function bodySectionLeftSide(){
  const div = document.createElement('div')
  div.className = 'm-0 w-75 ps-2 overflow-hidden d-flex flex-column'
  div.id = 'bodySectionLeftSide'

  div.append(filtros())
  div.append(header())
  div.append(table())
  div.append(resumen())

  return div

  
}