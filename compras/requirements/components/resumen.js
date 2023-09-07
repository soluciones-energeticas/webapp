export {resumen}

function resumen(){
  const section = document.createElement('section')

  section.id = 'resumen_section'
  section.className = 'resumen_section'

  section.innerHTML = `
    <div class="resumen_div border shadow-sm rounded-2 p-3">
      <h3 class="fw-bold mb-2 ps-1">Resumen</h3>
      <ul id="resumen_estatus_list" class="px-0 m-0">
      </ul>
    </div>

  `
  
  return section
}