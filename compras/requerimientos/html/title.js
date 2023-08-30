export { title_html }

import { elementFromHTML } from "../../../scripts.js"

function title_html(){
  const title = `
  <h1 class="titulo fw-bold mb-4">Control y seguimiento de órdenes de compra</h1>
  `

  return elementFromHTML(title)

  
  
}