export { bodySection }

import { table } from "./table.js"
import { detalles } from "./detalles.js"
import { bodySectionLeftSide } from "./bodySectionLeftSide.js"

function bodySection(){
  const div = document.createElement('div')
  div.className = 'w-100 d-flex flex-grow-1 overflow-hidden'

  div.append(detalles())
  div.append(bodySectionLeftSide())

  return div
  
}