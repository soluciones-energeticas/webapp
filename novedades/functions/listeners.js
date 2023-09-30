export { setListeners }

import { globalNovedades } from "../novedades.js"
import { tableRowClick } from "./tableRowClick.js"
import { afterAcceptClick } from "./saveNovedad.js"
import { searchName } from "./searchName.js"
import { updateEstatus,updateResponsable } from "./updatings.js"
import { showResumen,hideResumen } from "./showing.js"
import { showDetalles,hideDetalles } from "./detallesOpenClose.js"
import { setTableContent } from "../renders/tableRender.js"
import { exportar } from "./exportar.js"

function setListeners(){

  const main = globalNovedades.main

  document.addEventListener('click', (e) => {
    const target = e.target

    if( target.matches('#novedades_main_div #table_novedades td p') || target.matches('#novedades_main_div #table_novedades td')){
      let tr

      if(target.matches('p')) tr = target.parentElement.parentElement
      else if(target.matches('td')) tr = target.parentElement

      tableRowClick(main,tr)
      showDetalles()
    }

    if(target.matches('#novedades_modalDialog #btnAceptar span.btn_text')){
      const parentElement = target.parentElement
      const spinner = parentElement.querySelector('.spinner-border')
      const btn_text = parentElement.querySelector('.btn_text')

      spinner.classList.remove('visually-hidden')
      target.textContent = 'Guardando...'
      
      afterAcceptClick(document.querySelector('#novedades_modalDialog form'),parentElement,target,spinner)

    }

    if(target.matches('#novedades_main_div .rowValue')){
      hideResumen()
    }

    if(target.matches('#novedades_main_div #detalles_close_btn')){
      hideDetalles()
    }

    if(target.matches('#novedades_main_div #exportar_btn span')){
      exportar()
      
    }

    
    
  })

  document.addEventListener('input', e => {
    const target = e.target

    if(target.matches('#newNovedadForm_num_empleado')){
      searchName()
    }

    if(target.matches('#novedades_main_div #search_input')){
      setTableContent()
    }
    
  })

  document.addEventListener('change', e => {
    const target = e.target

    if(target.matches('#novedades_main_div #novedades_detalles_estatus_select')){
      const tr = globalNovedades.activeTr
      if(!tr) return

      const id = tr.querySelector('.novedades_row_id p').textContent

      updateEstatus(id,target.value)
      
    }

    if(target.matches('#novedades_main_div #novedades_detalles_responsable_select')){
      const tr = globalNovedades.activeTr
      if(!tr) return

      const id = tr.querySelector('.novedades_row_id p').textContent

      updateResponsable(id,target.value)
      
    }

    if(target.matches('#novedades_main_div #filtro_estatus_select_input')){
      setTableContent()
      
    }

    if(target.matches('#novedades_main_div #filtro_responsables_select_input')){
      setTableContent()
      
    }
    
  })
  
}