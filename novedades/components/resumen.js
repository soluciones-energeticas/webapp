export { resumen,updateResumen }

import { globalNovedades } from "../novedades.js"


function resumen(){
  const div = document.createElement('div')
  div.id = 'novedades_resumen_div'
  div.className = 'mt-2 d-flex flex-wrap justify-content-end'
  return div
}

function total_line(novedades){
  const div = document.createElement('div')
  div.className = 'w-100'
  div.innerHTML = `<p class="m-0 mb-1 p-0 text-end"><span class="fs-min fw-semibold me-2">Total</span><span class="fs-min text-primary">${novedades.length}</span></p>`
  return div
}

function responsables_side(novedades){
  const div = document.createElement('div')
  div.className = ''
  const responsables = []
  
  novedades.forEach(novedad => {
    let find = responsables.find(e => e.nombre == novedad.responsable)

    if(!find){
      responsables.push({
        nombre: novedad.responsable,
        cantidad: 1
      })
    }else{
      find.cantidad++
    }

    
  });

  responsables.forEach(responsable => {
    div.innerHTML +=
    `
    <div class="d-flex">
      <p class="m-0 p-0 fs-min me-2 fw-semibold">${responsable.nombre}</p>
      <p class="m-0 p-0 fs-min ms-auto text-primary">${responsable.cantidad}</p>
    </div>
    `
  })

  return div
}

function estatus_side(novedades){
  const div = document.createElement('div')
  div.className = 'ms-4'
  const estatus = []
  
  novedades.forEach(novedad => {
    let find = estatus.find(e => e.estatus == novedad.estatus)

    if(!find){
      estatus.push({
        estatus: novedad.estatus,
        cantidad: 1
      })
    }else{
      find.cantidad++
    }

    
  });

  estatus.forEach(e => {
    div.innerHTML += 
    `
    <div class="d-flex">
      <p class="m-0 p-0 fs-min me-2 fw-semibold">${e.estatus}</p>
      <p class="m-0 p-0 fs-min ms-auto text-primary">${e.cantidad}</p>
    </div>
    `
  })

  return div
}

function updateResumen(novedades){
  const resumen_div = document.querySelector('#novedades_main_div #novedades_resumen_div')

  resumen_div.innerHTML = ''

  resumen_div.append(responsables_side(novedades))
  resumen_div.append(estatus_side(novedades))
  resumen_div.append(total_line(novedades))
  
}





