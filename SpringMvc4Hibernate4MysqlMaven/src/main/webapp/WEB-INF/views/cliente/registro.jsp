<script src="${pageContext.request.contextPath}/resources/registro.js"></script>



<div id="imgNuevoDoc" class="ready"> 
</div>

<!-- <table style="margin-top: 18px; margin-bottom: 6px;" border="0" cellpadding="2" cellspacing="2">
    <tbody>
      <tr>
        <td style="width: 123px;">Fecha de reporte</td>
        <td style="width: 217px;"><p id="fecReporte"></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
</table> -->

<div id="tabsdocMoroso">
 
  <fieldset style="width: 780px;height: 100%">
  r1 . <%=request.getContextPath()%> <br>
  r2 : <%=request.getRequestURL()%> <br>
  r4 : <%=request.getPathInfo()%> <br>
   r5 : ${pageContext.request.contextPath} <br>
  
  <legend>Datos del deudor</legend>
        
  <table style="height: 100%;" id="tabla" class="deudor" border="0" cellpadding="4" cellspacing="4" width="100%">
    <tbody>      
      <tr>
	        <td style="width: 145px;">Tipo de persona</td>
	        <td style="width: 232px;">
		        <select id="cboTipPersona" name="cboTipPersona" class="combo"  onchange="mostrarOcultarTipoPersona();" ><option value="">seleccione</option></select>
	        </td>
	        <td colspan="2" rowspan="1" style="width: 165px;"></td>
      </tr>
      <tr>
        	<td style="width: 145px;">Tipo de documento</td>
        	<td style="width: 232px;">
	        	<select id="cboTipDcto" class="combo"><option value="">seleccione</option></select>
		        <label class="Asterisco">*</label>
		    </td>
	        <td style="width: 145px;"> Número de documento </td>
	        <td style="width: 165px;"> <input id="numdocident" name="numdocident" maxlength="12" size="20" value="" 
 				style="text-transform: uppercase;" class="cajatexto1"  type="text">
        	<label class="Asterisco">*</label>
			</td>
      </tr>
      <tr class="critPersonaNatural" >
	        <td style="width: 145px;">Apellido paterno</td>
	        <td colspan="3" rowspan="1"  style="width: 232px;"> 
	        <input  name="apePaternoNatural" id="apePaternoNatural" maxlength="50"  size="60" value="" style="text-transform: uppercase;"
	 			class="cajatexto3" type="text">
	        <label class="Asterisco">*</label>
	        </td>
      </tr>
      <tr class="critPersonaNatural" >
	        <td style="width: 145px;">Apellido materno</td>
	        <td colspan="3" rowspan="1" style="width: 232px;"> 
	         <input  name="apeMaternoNatural" id="apeMaternoNatural" maxlength="50" size="60" value="" style="text-transform: uppercase;"
	 			class="cajatexto3" type="text">
	        <label class="Asterisco">*</label>
	        </td>
      </tr>
      <tr class="critPersonaNatural">
	        <td style="width: 145px;">Nombres</td>
	        <td colspan="3" rowspan="1" style="width: 232px;"> 
	        <input  name="nombreNatural" id="nombreNatural" maxlength="50"  size="60" value="" style="text-transform: uppercase;"
	 			class="cajatexto3" type="text">
	        <label class="Asterisco">*</label>
	        </td>
      </tr>
	  <tr class="critPersonaJuridica" >
	        <td>
	        Razón social
	        </td>
	        <td colspan="3" style="width: 232px;" >
	           	<input name="razonSocial"  id="razonSocial" maxlength="80" size="80" value="" style="text-transform: uppercase;"
	 			class="cajatextors" type="text"><label  class="Asterisco">*</label>
	        </td>
	  </tr>
      <tr>
	        <td style="width: 145px;">Dirección</td>
	        <td style="width: 232px;" colspan="3" rowspan="1">
	        <input name="direccion" id="direccion"  maxlength="80" size="50" value="" style="text-transform: uppercase;" class="cajatexto2" type="text">
	        <label class="Asterisco">*</label>
	        </td>
      </tr>
      <tr>
	        <td style="width: 145px; ">Departamento</td>
	        <td style="width: 232px; ">
		         <select id="cboTipDpto" class="combo" onchange="loadProvincia();"><option value="">seleccione</option></select>
	    	    <label class="Asterisco">*</label>
	        </td>
	        <td style="width: 145px;">Provincia</td>
	        <td style="width: 165px;">        
		        <select id="cboTipProv" class="combo" onchange="loadDistrito();"><option value="">seleccione</option></select>        
		        <label class="Asterisco">*</label>
	        </td>
      </tr>
      <tr>
	        <td style="width: 145px;">Distrito</td>
	        <td colspan="3" rowspan="1" style="width: 232px;">	        
		        <select id="cboTipDist" class="combo"><option value="">seleccione</option></select>
		        <label class="Asterisco">*</label>
	        </td>
      </tr>
    </tbody>
  </table>
  </fieldset>
  
  <br>
  
  <fieldset style="height: 100%; width : 780px"> 
  <legend>Datos del documento moroso</legend>
  
  <table style="width: 100%; height: 100%;" border="0" cellpadding="4" cellspacing="4" >
    <tbody>
      <tr>
        <td style="width: 145px;">Nro. doc. moroso</td>
        <td style="width: 232px;">
        <input id="nroDocMoroso" name="nroDocMoroso" maxlength="30" size="20" value="" style="text-transform: uppercase;" class="cajatexto1" type="text">
        </td>      
        <td style="width: 145px;" >Documento de credito</td>
        <td style="width: 165px;" >
        
        <select id="cboTipDocCredito" class="combo"><option value="">seleccione</option></select>
        
        <label class="Asterisco">*</label>
        </td>
      </tr>
      <tr>
        <td style="width: 145px;">Tipo de moneda</td>
        <td>
        <select id="cboTipMoneda" class="combo"><option value="">seleccione</option></select>
        <label class="Asterisco">*</label>
        </td>
        <td style="width: 145px;" >Monto</td>
        <td> <input name="monto" id="monto" maxlength="13" size="14" value="" class="cajatexto1" type="text"> 
        <label class="Asterisco">*</label>
        </td>
      </tr>
      <tr>
        <td style="width: 145px;" >Fecha de vencimiento</td>
        <td> <input name="fecvencimiento" id="fecvencimiento" class="cajafecha" type="text">
        <label class="Asterisco">*</label>
        </td>
        <td>Condicion de la deuda</td>
        <td>
        
        <select id="cboTipCondDeuda" class="combo"><option value="">seleccione</option></select>
        
        
        <label class="Asterisco">*</label>
        </td>
      </tr>
      <tr>
        <td style="width: 145px;" >Presenta aval</td>
        <td >
	        
			Sí <input id="radSelSi" name="tieneAvales" value="1" onClick="verAval();" type="radio">
			No <input id="radSelNo" name="tieneAvales" value="0" checked="checked" onClick="noverAval()" type="radio">

        </td>
        <td >
        	<p id="lblCantAvales"></p>
        </td>
        <td>
               
	        <div id="AgregaAval" style="display: none;">
		        <select id="cboNroAval" name="numeroAvales" onchange="activaAval()">
				<option value="">seleccione</option>
		        <option value="1">1</option>
		        <option value="2">2</option>
		        <option value="3">3</option>
		        </select>
		    </div>
	    
        </td>
      </tr>
    </tbody>
  </table>
  </fieldset>
  
</div>
  


<form id="formularioRegistrarAvales">
<div id="secAval"></div>
</form>

<p align="right">
<input value="Grabar" type="button" onclick="mensaje();">
<input type="button" value="Regresar" onclick="$('#nuevoDctoMoroso').dialog('close');"/>
 

<div id="msgsValidacionesRegistrarDctoMoroso" class="msg-errores"></div>