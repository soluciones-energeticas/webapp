export {articleBody}

import { tableSection } from "./tableSection.js"
import { resumen } from "./resumen.js"
import { editionForm } from "./editionForm.js"
import { formBtn } from "./formBtn.js"

function articleBody(){
  const div = document.createElement('div')

  div.className = 'flex-grow-1 d-flex overflow-hidden'

  const divTable = document.createElement('div')
  const divEdition = document.createElement('div')

  divTable.className = 'w-75 overflow-auto'
  divEdition.className = 'w-25 ps-2 overflow-hidden d-flex flex-column'

  div.append(divTable)
  div.append(divEdition)

  divTable.append(tableSection())
  divEdition.append(resumen())
  divEdition.append(editionForm())
  divEdition.append(formBtn())

  return div
  
}