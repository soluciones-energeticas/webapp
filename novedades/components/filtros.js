export { filtros }




function filtros(){
  const div = document.createElement('div')
  div.className = 'mb-4'
  div.innerHTML = 
  `
  <div class="d-flex">
    <div class="w-25">
      <label for="filtro_responsables_select_input" class="form-label">Responsable</label>
      <select id="filtro_responsables_select_input" class="form-select form-select-sm">
        <option selected></option>
      </select>
    </div>
    <div class="ms-3 w-25">
      <label for="filtro_estatus_select_input" class="form-label">Estatus</label>
      <select id="filtro_estatus_select_input" class="form-select form-select-sm" aria-label="Default select example">
        <option selected></option>
      </select>
    </div>
  </div>
  `

  return div
  
}