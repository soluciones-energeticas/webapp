export { btnSection }

import { elementFromHTML } from "../../../scripts.js";

function btnSection(){
  const html = `
    <div class="form_btn_section p-3 d-flex justify-content-end d-none rounded-bottom-2 z-2 bg-white">
      <button id="btn_cancel" type="button" class="btn btn-outline-danger btn-sm">Cancel</button>
      <button id="btn_borrar" type="button" class="btn btn-outline-secondary btn-sm ms-2" disabled>Borrar</button>
      <button id="btn_guardar" type="button" class="btn btn-info text-light btn-sm ms-2">Guardar</button>
    </div>
  `
  return elementFromHTML(html)
}