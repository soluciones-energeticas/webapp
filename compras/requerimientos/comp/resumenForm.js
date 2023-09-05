export { resumenForm }

import { elementFromHTML } from "../../../scripts.js";

function resumenForm(){
  const html = `
    <div class="form_section p-3 flex-grow-1 overflow-auto d-none border shadow-sm rounded-top-2 z-2 bg-white">
      <form action="#" class="form" id="edition_form">
        <fieldset id="form_compras_fieldset" class="d-flex flex-wrap pb-4">
          <legend class="mb-4">Compras</legend>
          <div class="mb-3 w-50 px-1 d-none">
            <label for="token_input" class="form-label">ID</label>
            <input name="token_input" type="text" class="form-control form-control-sm" id="token_input">
          </div>
          <div class="mb-3 w-50 px-1 d-none">
            <label for="id_input" class="form-label">ID</label>
            <input name="id_input" type="text" class="form-control form-control-sm" id="id_input">
          </div>
          <div class="mb-3 w-50 px-1">
            <label for="fecha_input" class="form-label">Fecha</label>
            <input name="fecha_input" type="date" disabled class="form-control form-control-sm" id="fecha_input">
          </div>
          <div class="mb-3 w-50 px-1">
            <label for="ticket_input" class="form-label">Ticket</label>
            <input name="ticket_input" type="text" disabled class="form-control form-control-sm" id="ticket_input">
          </div>
          <div class="mb-3 w-50 px-1">
            <label for="requerimiento_input" class="form-label">Requerimiento</label>
            <input name="requerimiento_input" type="text" disabled class="form-control form-control-sm" id="requerimiento_input">
          </div>
          <div class="mb-3 w-100 px-1">
            <label for="proyecto_input" class="form-label">Proyecto</label>
            <input name="proyecto_input" type="text" disabled class="form-control form-control-sm" id="proyecto_input">
          </div>
          <div class="mb-3 w-50 px-1">
            <label for="no_oc_input" class="form-label">No. OC</label>
            <input name="no_oc_input" type="text" disabled class="form-control form-control-sm" id="no_oc_input">
          </div>
          <div class="mb-3 w-50 px-1">
            <label for="monto_oc_input" class="form-label">Monto OC</label>
            <input name="monto_oc_input" type="text" disabled class="form-control form-control-sm" id="monto_oc_input">
          </div>
          <div class="mb-3 w-50 px-1">
            <label for="empresa_input" class="form-label">Empresa</label>
            <select name="empresa_input" id="empresa_input" disabled class="form-select form-select-sm" aria-label=".form-select-sm example">
              <option selected></option>
            </select>
          </div>
          <div class="mb-3 w-50 px-1">
            <label for="no_auxiliar_input" class="form-label">No. Auxiliar</label>
            <input name="no_auxiliar_input" type="text" disabled class="form-control form-control-sm" id="no_auxiliar_input">
          </div>
          <div class="mb-3 w-100 px-1">
            <label for="suplidor_input" class="form-label">Suplidor</label>
            <input name="suplidor_input" disabled class="form-control form-control-sm" list="suplidor_dataList" id="suplidor_input" placeholder="">
            <datalist id="suplidor_dataList">
            </datalist>
          </div>
          <div class="mb-3 w-50 px-1">
            <label for="indicaciones_compra_input" class="form-label">Indicaciones de compra</label>
            <input name="indicaciones_compra_input" type="text" disabled class="form-control form-control-sm" id="indicaciones_compra_input">
          </div>
          <div class="mb-3 w-100 px-1">
            <label for="condicion_pago_input" class="form-label">Condición de pago</label>
            <select name="condicion_pago_input" id="condicion_pago_input" disabled class="form-select form-select-sm" aria-label=".form-select-sm example">
              <option selected></option>
            </select>
          </div>
          <div class="mb-3 w-50 px-1">
            <label for="no_factura_input" class="form-label">No. factura</label>
            <input name="no_factura_input" type="text" disabled class="form-control form-control-sm" id="no_factura_input">
          </div>
          <div class="mb-3 w-50 px-1">
            <label for="no_conduce_input" class="form-label">No. conduce</label>
            <input name="no_conduce_input" type="text" disabled class="form-control form-control-sm" id="no_conduce_input">
          </div>
          <div class="mb-3 w-50 px-1">
            <label for="no_recepcion_input" class="form-label">No. recepción de servicio</label>
            <input name="no_recepcion_input" type="text" disabled class="form-control form-control-sm" id="no_recepcion_input">
          </div>
          <div class="mb-3 w-75 px-1">
            <label for="no_modificacion_anulacion_input" class="form-label">No. modificación y/o anulació<nav></nav></label>
            <input name="no_modificacion_anulacion_input" type="text" disabled class="form-control form-control-sm" id="no_modificacion_anulacion_input">
          </div>
        </fieldset>
        <fieldset id="form_contabilidad_fieldset" class="d-flex flex-wrap pb-4">
          <legend class="mb-4">Contabilidad</legend>
          <div class="mb-3 w-50 px-1">
            <label for="solicitud_pago_input" class="form-label">Solicitud de pago</label>
            <input name="solicitud_pago_input" type="text" disabled class="form-control form-control-sm" id="solicitud_pago_input">
          </div>
        </fieldset>
        <fieldset id="form_tesoreria_fieldset" class="d-flex flex-wrap pb-4">
          <legend class="mb-4">Tesorería</legend>
          <div class="mb-3 w-50 px-1">
            <label for="chk_input" class="form-label">CHK</label>
            <input name="chk_input" type="text" disabled class="form-control form-control-sm" id="chk_input">
          </div>
          <div class="mb-3 w-50 px-1">
            <label for="tbk_input" class="form-label">TBK</label>
            <input name="tbk_input" type="text" disabled class="form-control form-control-sm" id="tbk_input">
          </div>
          <div class="w-50 px-1">
            <label for="estatus_pago_input" class="form-label">Estatus de pago</label>
            <select name="estatus_pago_input" id="estatus_pago_input" disabled class="form-select form-select-sm" aria-label=".form-select-sm example">
              <option selected></option>
            </select>
          </div>
        </fieldset>
      </form>
    </div>
  `
  return elementFromHTML(html)
}