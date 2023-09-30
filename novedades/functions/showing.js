export { showResumen,hideResumen }


function showResumen(){
  const tabla_detalles = document.querySelector('#novedades_main_div #tabla_detalles')
  const table_novedades = document.querySelector('#novedades_main_div #table_novedades')
  const header_section = document.querySelector('#novedades_main_div #header_section')
  const novedades_resumen_div = document.querySelector('#novedades_main_div #novedades_resumen_div')

  tabla_detalles.classList.add('d-none')
  table_novedades.classList.add('d-none')
  header_section.classList.add('d-none')
  novedades_resumen_div.classList.remove('d-none')

}

function hideResumen(){
  const tabla_detalles = document.querySelector('#novedades_main_div #tabla_detalles')
  const table_novedades = document.querySelector('#novedades_main_div #table_novedades')
  const header_section = document.querySelector('#novedades_main_div #header_section')
  const novedades_resumen_div = document.querySelector('#novedades_main_div #novedades_resumen_div')

  tabla_detalles.classList.remove('d-none')
  table_novedades.classList.remove('d-none')
  header_section.classList.remove('d-none')
  novedades_resumen_div.classList.add('d-none')
}