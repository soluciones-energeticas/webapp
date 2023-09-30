export { searchName }

import { globalNovedades } from "../novedades.js"

function searchName(){
  const inputNum = document.querySelector('#newNovedadForm_num_empleado')
  const inputNom = document.querySelector('#newNovedadForm_nom_empleado')

  inputNom.value = ''

  if(inputNum.value){
    const empleado = globalNovedades.empleados.find(e => e.IDCONTRATO == inputNum.value)
    if(empleado) inputNom.value = empleado.NOMBRES.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    else inputNom.value = 'Empleado no encontrado'
  }
  
}