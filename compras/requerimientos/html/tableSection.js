export { table_html }

import { elementFromHTML } from "../../../scripts.js"

function table_html(){
  const tableSection = `
    <div class="table_section mt-3 flex-grow-1 overflow-auto">
      <table id="sections_app_compras__requerimientos_table" class="">
        <thead>
          <tr class="bg-info bg-gradient">
            <th prop="id">ID</th>
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
            <td prop="id" class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          </tr>
          <tr>
            <td prop="id" class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          </tr>
          <tr>
            <td prop="id" class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
            <td class="m-0 p-0"><p class="m-0 p-0 placeholder-glow"><span class="placeholder col-12"></span></p></td>
          </tr>
        </tbody>
      </table>
    </div>

  `

  return elementFromHTML(tableSection)

  
  
}