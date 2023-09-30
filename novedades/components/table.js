export {table}

function table(){
  const div = document.createElement('div')
  div.id = 'table_novedades_container'
  div.className = 'w-100 overflow-auto border border-top-0'

  div.innerHTML = `
    <table class="w-100" id="table_novedades">
      <thead class="">
        <tr class="bg-info bg-gradient">
          <th>
            <div class="w-100 h-100">
              <span class="text-center text-white d-block w-100 h-100"><input type="checkbox"></span>
            </div>
          </th>
          <th>
            <div class="w-100 h-100">
              <span class="text-center text-white d-block w-100 h-100">#</span>
            </div>
          </th>
          <th>
            <div class="w-100 h-100">
              <span class="text-center text-white d-block w-100 h-100">Fecha</span>
            </div>
          </th>
          <th>
            <div class="w-100 h-100">
              <span class="text-center text-white d-block w-100 h-100">Cod. Empleado</span>
            </div>
          </th>
          <th>
            <div class="w-100 h-100">
              <span class="text-center text-white d-block w-100 h-100">Empleado</span>
            </div>
          </th>
          <th>
            <div class="w-100 h-100">
              <span class="text-center text-white d-block w-100 h-100">Novedad</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="">
        <tr>
          <td class="p-1 ps-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 ps-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 ps-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 pe-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
        </tr>
        <tr>
          <td class="p-1 ps-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 ps-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 ps-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 pe-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
        </tr>
        <tr>
          <td class="p-1 ps-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 ps-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 ps-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 pe-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
        </tr>
      </tbody>
    </table>
  `

  return div  
}