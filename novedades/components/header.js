export {title,header}

function title(){
  const div = document.createElement('div')

  const h2 = document.createElement('h2')
  h2.textContent = 'Reporte de Novedades Diarias'
  h2.className = 'titulo fw-bold fs-5 m-0 mb-4'
  
  div.append(h2)

  return div
}

function header(){
  const section = document.createElement('section')

  section.className = 'search_filter_section d-flex align-items-center mb-2'
  section.id = 'header_section'

  section.append(searchInput())
  section.append(btnNuevo())
  section.append(btnExportar())

  return section
}

function btnNuevo(){
  const btn = document.createElement('button')

  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
    </svg>
    <span class="ms-2">Nuevo</span>
  `

  btn.id = "nuevo_btn"
  btn.type = 'button'
  btn.className = 'btn btn-sm btn-info text-light d-flex align-items-center'
  btn.disabled = true

  return btn
}

function btnExportar(){
  const btn = document.createElement('button')

  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
    </svg>
    <span class="ms-2">Exportar</span>
  `

  btn.id = "exportar_btn"
  btn.type = 'button'
  btn.className = 'btn btn-sm btn-success text-light d-flex align-items-center ms-2'
  btn.disabled = false

  return btn
}

function searchInput(){
  const div = document.createElement('div')
  div.id = 'novedades_search_input'
  div.className = 'input-group border-end pe-3 me-3'

  div.innerHTML = `
  <span class="input-group-text" id="basic-addon1">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
      </svg>
  </span>
  <input type="text" disabled class="form-control form-control-sm" id="search_input" placeholder="Escribe tus búsquedas separadas por ;" aria-label="Input group example" aria-describedby="basic-addon1">
  `

  return div
}

function selectResponsable(){
  const div = document.createElement('div')
  div.className = 'ms-2'
  div.innerHTML = 
  `
  <select id="novedades_responsables_select_input" class="form-select form-select-sm" aria-label="Default select example">
    <option selected>Seleccione responsable</option>
  </select>
  `

  return div
  
}
