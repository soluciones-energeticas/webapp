export { resumen }

import { elementFromHTML } from "../../../scripts.js"

function resumen(){
  const resumen = `
    <div class="resumen_section mt-5" id="resumen_section">
      <div class="resumen_div border shadow-sm rounded-2 p-3 my-1">
        <h3 class="fw-bold fs-5 mb-2 ps-1">Resumen</h3>
        <ul id="resumen_estatus_list" class="px-0 m-0">
        </ul>
      </div>
    </div>
  `
  return elementFromHTML(resumen)
}