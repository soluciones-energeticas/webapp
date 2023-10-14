export { detalles }


function detalles(){
  const div = document.createElement('div')
  div.className = 'overflow-auto w-25 me-2 fs-6 fw-lighter'
  div.id = 'tabla_detalles'
  div.innerHTML = 
  `
  <div id="detalles_title" class="position-sticky top-0 bg-info bg-gradient text-white fw-bold ps-1 z-3 d-flex justify-content-between">
    <p class="my-auto text-center">Detalles de novedad</p>
  </div>
  `
  const fragment = document.createDocumentFragment()

  const labels = [
    ['#','id'],
    ['Creación','fecha_ingreso'],
    ['Última modificación','fecha_modificacion'],
    ['Usuario','usuario'],
    ['Código de empleado','num_empleado'],
    ['Nombre de empleado','nom_empleado'],
    ['Novedad','novedad'],
    ['Observaciones','observaciones'],
  ]

  labels.forEach(label => {
    fragment.append(detallesElement(label[0],label[1]))
  })

  div.append(selectAdjunto())
  div.append(selectEstatus())
  div.append(selectResponsable())
  div.append(inputSoporteCierre())
  div.append(fragment)

  return div
}

function detallesElement(label,inputName){
  const div = document.createElement('div')
  div.className = 'ps-1 p-2 d-flex flex-column py-2 detalles-div'
  div.innerHTML = `
  <p class="m-0 p-0 fw-normal text-primary">${label}:</p>
  <p class="m-0 p-0 text-success" id="${inputName}"></p>
  `
  return div
}

function selectAdjunto(){
  const div = document.createElement('div')
  div.className = 'dropdown px-1 p-2 w-100 d-none z-2'
  div.id = 'novedades_select_adjuntos'

  div.innerHTML = 
  `
  <button class="btn btn-sm btn-info text-white dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Ver Soportes
  </button>
  <ul class="dropdown-menu">
    <li class="dropdown-item">Sin adjuntos</li>
  </ul>
  `
  return div
}

function selectEstatus(){
  const div = document.createElement('div')
  div.className = 'fs-6 fw-lighter p-2 ps-1 w-100'

  const label = document.createElement('label')
  label.className = 'fs-6 fw-lighter mb-1'
  label.for = 'novedades_detalles_estatus_select'
  label.textContent = 'Estatus'
  
  const select = document.createElement('select')
  select.className = 'form-select form-select-sm'
  select.disabled = true
  select.id = 'novedades_detalles_estatus_select'
  
  div.append(label)
  div.append(select)

  return div
}

function selectResponsable(){
  const div = document.createElement('div')
  div.className = 'fs-6 fw-lighter p-2 ps-1 w-100'

  const label = document.createElement('label')
  label.className = 'fs-6 fw-lighter mb-1'
  label.for = 'novedades_detalles_responsable_select'
  label.textContent = 'Responsable'
  
  const select = document.createElement('select')
  select.className = 'form-select form-select-sm'
  select.disabled = true
  select.id = 'novedades_detalles_responsable_select'
  
  div.append(label)
  div.append(select)

  return div
}

function inputSoporteCierre(){
  const div = document.createElement('div')
  div.className = 'fs-6 fw-lighter p-2 ps-1 w-100 d-flex flex-wrap'

  div.innerHTML = `
    <label for="novedades_detalles_soporte_cierre_input" class="w-100 form-label">Soporte cierre</label>
    <input name="soporte_cierre" type="text" class="form-control w-50 me-2 form-control-sm" id="novedades_detalles_soporte_cierre_input">
    <button id="guardar_soporte_btn" type="button" class="btn btn-sm btn-primary">
      <span class="spinner spinner-border spinner-border-sm visually-hidden" role="status" aria-hidden="true"></span>
      <span class="btnText">Guardar</span>
    </button>
  `
  
  return div
  
}