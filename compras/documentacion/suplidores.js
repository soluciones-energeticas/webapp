export { updateSuplidores,setSuplidoresFormModal }

import { toast } from "../../scripts.js"
import { hide_suplidores_form_documentacion } from "./renders_documentacion.js"

function updateSuplidores(){
  const input = document.querySelector('#base_suplidores_input_file')
  const file = input.files[0]

  if(file){
    readXlsxFile(file).then(rows => {
      rows.splice(0,2)

      const url = 'https://script.google.com/macros/s/AKfycbw0t44neg_ANzRWRRTSz9aKx284g_pNqerCUMiZiQiOtlvnyhYjJASeRewypkfhmiofHw/exec'

      const jsonData = {
        action : 'UPDATE SUPLIDORES',
        token : sessionStorage.getItem('soles_webapp_session'),
        data : rows
      }
        
      const options = {
        method: "POST",
        Headers: {"Content-Type": "application/json"},
        body: JSON.stringify(jsonData)
      }

      toast.show()
      toast_body_loading.classList.remove('d-none')
      toast_body_span.textContent = 'Actualizando Suplidores'

      hide_suplidores_form_documentacion()
      
      fetch(url,options)
      .then(res => res.json())
      .then(answer => {
        toast.hide()
      })
        
    })
    
  }

  
}

function modalHTML(){
  return (
    `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Calificación de suplidores</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ${suplidoresFormHTML()}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary">Calificar</button>
        </div>
      </div>
    </div>
    `
  )
}

function suplidoresFormHTML(){
  return (
    `
      <h2>Información del Suplidor</h2>
      <table>
          <tr>
              <td>Código de Suplidor:</td>
              <td><input type="text" name="codigo_suplidor"></td>
              <td>RNC de Suplidor:</td>
              <td><input type="text" name="rnc_suplidor"></td>
          </tr>
          <tr>
              <td>Nombre de Compañía:</td>
              <td colspan="3"><input type="text" name="nombre_compania" style="width: 100%;"></td>
          </tr>
          <tr>
              <td>Dirección de Suplidor:</td>
              <td colspan="3"><input type="text" name="direccion_suplidor" style="width: 100%;"></td>
          </tr>
          <tr>
              <td>Localidad:</td>
              <td><input type="text" name="localidad"></td>
              <td>Teléfono Contacto 1:</td>
              <td><input type="tel" name="telefono1"></td>
          </tr>
          <tr>
              <td>Teléfono Contacto 2:</td>
              <td><input type="tel" name="telefono2"></td>
              <td>Correo Electrónico:</td>
              <td><input type="email" name="correo_electronico"></td>
          </tr>
          <tr>
              <td>Nombre Contacto de Suplidor:</td>
              <td colspan="3"><input type="text" name="nombre_contacto" style="width: 100%;"></td>
          </tr>
          <tr>
              <td>Productos o Servicios que Ofrece:</td>
              <td colspan="3"><textarea name="productos_servicios" style="width: 100%;"></textarea></td>
          </tr>
          <tr>
              <td>Observaciones y Comentarios en cuanto al Servicio:</td>
              <td colspan="3"><textarea name="observaciones" style="width: 100%;"></textarea></td>
          </tr>
      </table>
      <table>
          <tr>
              <td>Cumplimiento en la Entrega de Materiales y Servicios:</td>
              <td>
                  <select name="cumplimiento_entrega">
                      <option value="excelente">Excelente</option>
                      <option value="bueno">Bueno</option>
                      <option value="regular">Regular</option>
                      <option value="malo">Malo</option>
                  </select>
              </td>
              <td>Cumplimiento en el Tiempo de Entrega:</td>
              <td>
                  <select name="cumplimiento_tiempo">
                      <option value="excelente">Excelente</option>
                      <option value="bueno">Bueno</option>
                      <option value="regular">Regular</option>
                      <option value="malo">Malo</option>
                  </select>
              </td>
          </tr>
          <tr>
              <td>Cumplimiento en la Calidad del Material y/o Servicio:</td>
              <td>
                  <select name="cumplimiento_calidad">
                      <option value="excelente">Excelente</option>
                      <option value="bueno">Bueno</option>
                      <option value="regular">Regular</option>
                      <option value="malo">Malo</option>
                  </select>
              </td>
              <td>Cumplimiento en los Precios de los Materiales y/o Servicios:</td>
              <td>
                  <select name="cumplimiento_precios">
                      <option value="excelente">Excelente</option>
                      <option value="bueno">Bueno</option>
                      <option value="regular">Regular</option>
                      <option value="malo">Malo</option>
                  </select>
              </td>
          </tr>
          <tr>
              <td>Otros (Especificar):</td>
              <td colspan="3"><textarea name="otros" style="width: 100%;"></textarea></td>
          </tr>
          <tr>
              <h2>Evaluación del Suplidor</h2>
      </table>
      <table>
        <tr>
            <td>Cumplimiento en la Entrega de Materiales y Servicios:</td>
            <td><input type="number" name="cumplimiento_entrega" min="0" max="100" required></td>
        </tr>
        <tr>
            <td>Cumplimiento en el Tiempo de Entrega:</td>
            <td><input type="number" name="cumplimiento_tiempo" min="0" max="100" required></td>
        </tr>
        <tr>
            <td>Cumplimiento en la Calidad del Material y/o Servicio:</td>
            <td><input type="number" name="cumplimiento_calidad" min="0" max="100" required></td>
        </tr>
        <tr>
            <td>Cumplimiento en los Precios de los Materiales y/o Servicios:</td>
            <td><input type="number" name="cumplimiento_precios" min="0" max="100" required></td>
        </tr>
      </table>
      <input type="submit" value="Enviar Formulario">
    </form>  
          </form>
      </div>
  </div>
    `
  )
  
}

function setSuplidoresFormModal(){
  const div = document.createElement('div')
  div.classList.add('modal')
  div.tabIndex = "-1"
  div.id = 'suplidores_modal_form'
  div.innerHTML = modalHTML()
  return div
}