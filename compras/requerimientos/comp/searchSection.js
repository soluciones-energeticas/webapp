export { search_html }

import { elementFromHTML } from "../../../scripts.js"

function search_html(){
  const nuevoBtn =  `
    <button id="nuevo_btn" type="button" class="btn btn-info text-light d-flex align-items-center" disabled>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
      </svg>
      <span class="ms-2">Nuevo</span>
    </button>
  `

  const inputSearch = `
    <div class="input-group ms-3">
      <span class="input-group-text" id="basic-addon1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
        </svg>
      </span>
      <input type="text" disabled class="form-control" id="search_input" placeholder="Escribe tus búsquedas separadas por ;" aria-label="Input group example" aria-describedby="basic-addon1">
    </div>
  `

  const filtroSelect = `
  <select id="filtro_input" disabled class="form-select w-auto ms-3" aria-label="Default select example">
    <option selected>Selecciona un estatus</option>
  </select>
  `
  
  const searchSection = `
    <div class="search_filter_section d-flex justify-content-between align-items-center">
      ${nuevoBtn.trim()}
      ${inputSearch.trim()}
      ${filtroSelect.trim()}
    </div>
  `
  return elementFromHTML(searchSection)

}