export { setListeners }

import { globalNovedades } from "../novedades.js"
import { tableRowClick } from "./tableRowClick.js"
import { afterAcceptClick } from "./saveNovedad.js"
import { searchName } from "./searchName.js"
import { updateEstatus,updateResponsable,updateSoporteCierre } from "./updatings.js"
import { showResumen,hideResumen } from "./showing.js"
import { showDetalles,hideDetalles } from "./detallesOpenClose.js"
import { setTableContent } from "../renders/tableRender.js"
import { exportar } from "./exportar.js"
import { disabledBtn } from "../../scripts.js"

function setListeners(){

  const main = globalNovedades.main
  const guardar_soporte_btn = document.querySelector('#guardar_soporte_btn')

  document.addEventListener('click', (e) => {
    const target = e.target

    if( target.matches('#novedades_main_div #table_novedades td p') || target.matches('#novedades_main_div #table_novedades td')){
      let tr

      if(target.matches('p')) tr = target.parentElement.parentElement
      else if(target.matches('td')) tr = target.parentElement

      tableRowClick(main,tr)
      showDetalles()
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
      
      if(target.value == 'Completado'){
        const novedad = globalNovedades.novedades.find(e => e.id == id)
        const actualEstatus = novedad ? novedad.estatus : "Pendiente"
        target.value = actualEstatus
        return
      }

      updateEstatus(id,target.value)
      
    }

    if(target.matches('#novedades_main_div #novedades_detalles_responsable_select')){
      const tr = globalNovedades.activeTr
      if(!tr) return

      const id = tr.querySelector('.novedades_row_id p').textContent
      const option = target.querySelector(`option[value="${target.value}"]`)

      updateResponsable(id,target.value,option.name)
      
    }

    if(target.matches('#novedades_main_div #filtro_estatus_select_input')){
      setTableContent()
      
    }

    if(target.matches('#novedades_main_div #filtro_responsables_select_input')){
      setTableContent()
      
    }
    
  })

  guardar_soporte_btn.addEventListener('click', e => {
    const tr = globalNovedades.activeTr
    if(!tr) return
    
    const id = tr.querySelector('.novedades_row_id p').textContent
    const input = document.querySelector('#novedades_detalles_soporte_cierre_input')

    disabledBtn(guardar_soporte_btn,"Guardando")
    
    updateSoporteCierre(id,input.value,guardar_soporte_btn)
    
  })
  
}