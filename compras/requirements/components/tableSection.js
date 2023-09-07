export {tableSection}

function tableSection(){
  const section = document.createElement('section')

  section.className = 'table_section border-bottom'

  section.innerHTML = `
    <table class="">
      <thead>
        <tr class="bg-info bg-gradient">
          <th>ID</th>
          <th class="text-light th_numero" >Requerimiento</th>
          <th class="text-light th_numero" >Fecha</th>
          <th class="text-light th_numero" >No. OC</th>
          <th class="text-light th_numero" >Monto OC</th>
          <th class="text-light th_texto" >Suplidor</th>
          <th class="text-light th_numero" >Condicion de pago</th>
          <th class="text-light th_texto" >Estatus de Pago</th>
          <th class="text-light th_texto" >Estatus</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 ps-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 pe-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
        </tr>
        <tr>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 ps-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 pe-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
        </tr>
        <tr>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 ps-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          <td class="p-1 pe-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
        </tr>
      </tbody>
    </table>
  `

  return section  
}