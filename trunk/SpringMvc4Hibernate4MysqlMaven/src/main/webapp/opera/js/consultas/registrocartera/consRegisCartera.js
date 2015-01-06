var tamanioBaseGrilla;

var combBusca;
var combSubBusca;


var paramBusca = new Object();
paramBusca.tipDocuIden = "";
paramBusca.numDocuIden = "";
paramBusca.apepat = "";
paramBusca.apemat = "";
paramBusca.nombper = "";
paramBusca.ruc = "";
paramBusca.numDocMoroso ="";
paramBusca.codStsProceso = "";
paramBusca.todo ="";
paramBusca.codigoSci = "";
paramBusca.codigoHost = "";
paramBusca.nombre = "";

$(document)
		.ready(
				function() {

					$("a.linkXLS").click(function() {
						exportToFile('XLS');
					});

					$("a.linkPDF").click(function() {
						exportToFile('PDF');
					});
					
					$("#resultado_busqueda").css("display", "none");
					
					jQuery("#grilla_cons_regis_cartera")
							.jqGrid(
									{
										colNames : [ 'Nro',
												'Nro. doc. moroso', 'Tipo y nro. doc. identidad', 'Nombre / Razón social',
												'Moneda', 'Monto', 'Fecha de vencimiento', 'Fecha de cancelación',
												'Estado de proceso', 'Estado de registro', 'Fecha de reporte',
												'Fecha de modificación', 'Tipo de movimiento',
												'codTipPersona','tipPersona','tipoDocIdentidad','nroDocuIden',
												'apePaternoNatural','apeMaternoNatural','nombreNatural',
												'direcScom','dptoDeu','provDeu','distDeu','tipoDocCredito','tipoCondDeud','codigomoroso' ] ,
										colModel : [
												{
													name : 'nro',
													index : 'nro',
													width : 50,
													sortable : false
												},
												{
													name : 'nroDocMoroso',
													index : 'nroDocMoroso',
													width : 100,
													sortable : false
												},
												{
													name : 'tipNumDocIdentidad',
													index : 'tipNumDocIdentidad',
													width : 50,
													sortable : false
												},
												{
													name : 'razonSocial',
													index : 'razonSocial',
													width : 150,
													sortable : false
												},
												{
													name : 'moneda',
													index : 'moneda',
													width : 50,
													sortable : false
												},
												{
													name : 'monto',
													index : 'monto',
													width : 50,
													sortable : false
												},
												{
													name : 'fecvencimiento',
													index : 'fecvencimiento',
													width : 80,
													sortable : false
												},
												{
													name : 'feccancelacion',
													index : 'feccancelacion',
													width : 150,
													sortable : false
												},
												{
													name : 'stsProceso',
													index : 'stsProceso',
													width : 80,
													sortable : false
												},
												{
													name : 'stsRegistro',
													index : 'stsRegistro',
													width : 80,
													sortable : false
												},
												{
													name : 'fecReporte',
													index : 'fecReporte',
													width : 80,
													sortable : false
												},
												{
													name : 'fecModificacion',
													index : 'fecModificacion',
													width : 80,
													sortable : false
												},
												{
													name : 'tipMovimiento',
													index : 'tipMovimiento',
													width : 80,
													sortable : false
												},
												{
													name : 'codTipPersona',
													index : 'codTipPersona',
													hidden: true																										
												},	
												{
													name : 'tipPersona',
													index : 'tipPersona',
													hidden: true																										
												},
												{
													name : 'tipoDocIdentidad',
													index : 'tipoDocIdentidad',
													hidden: true																										
												},
												{
													name : 'nroDocuIden',
													index : 'nroDocuIden',
													hidden: true																										
												},
												{
													name : 'apePaternoNatural',
													index : 'apePaternoNatural',
													hidden: true																										
												},
												{
													name : 'apeMaternoNatural',
													index : 'apeMaternoNatural',
													hidden: true																										
												},
												{
													name : 'nombreNatural',
													index : 'nombreNatural',
													hidden: true																										
												},
												{
													name : 'direcScom',
													index : 'direcScom',
													hidden: true																										
												},
												{
													name : 'dptoDeu',
													index : 'dptoDeu',
													hidden: true																										
												},
												{
													name : 'provDeu',
													index : 'provDeu',
													hidden: true																										
												},
												{
													name : 'distDeu',
													index : 'distDeu',
													hidden: true																										
												},
												{
													name : 'tipoDocCredito',
													index : 'tipoDocCredito',
													hidden: true																										
												},
												{
													name : 'tipoCondDeud',
													index : 'tipoCondDeud',
													hidden: true																										
												},
												{
													name : 'codigomoroso',
													index : 'codigomoroso',
													hidden: true																										
												}												
												],
										rowNum : 10,
										height : 240,
										width : 1121,
										rowList : [ 10, 20, 30 ],
										pager : '#pgrilla_cons_regis_cartera',
										sortname : 'id',
										viewrecords : true,
										sortorder : "desc",
										scrollOffset: 0,
										onSelectRow : function(id) {
											var filaEntidad = $(
													"#grilla_cons_regis_cartera")
													.jqGrid('getRowData', id);
											//alert("selection row CG " + filaEntidad.codigomoroso);
											mostrarInfo(filaEntidad.codigomoroso);
										}
									});

					tamanioBaseGrilla = jQuery(
							"#grilla_cons_regis_cartera").getGridParam().height;

					$('#grilla_cons_regis_cartera').jqGrid(
							'setGridParam',
							{
								beforeRequest : function() {

									var cantidadXPagina = jQuery(
											"#grilla_cons_regis_cartera")
											.getGridParam().rowNum;
									var alto = Number(tamanioBaseGrilla)
											+ (Number(cantidadXPagina) * 3);

									if (cantidadXPagina == "10") {
										alto = tamanioBaseGrilla;
									}

									$('#grilla_cons_regis_cartera')
											.jqGrid('setGridHeight', alto);

								}
							});
					
					cmbStsProcesoCrga("cboStsProceso");
					cmbDocumento("cboTipDocumento");
					
});


function mostrarInfo(codigoMoroso) {
	//alert(codigoMoroso);
	bloquearPantalla();
	$.ajax({
		url : "mostrarInfo.htm",
		type : "GET",		
		async : false,
		cache : false
	}).done(function(html) {
		var data;
		var gsr = $('#grilla_cons_regis_cartera').jqGrid('getGridParam', 'selrow');
		if (gsr) {
			data = $('#grilla_cons_regis_cartera').jqGrid('getRowData', gsr);
		}

		desbloquearPantalla();
		$("#mostrarInfoRpt").html(html);
		crearPopUp("mostrarInfoRpt", 500, 500, 'Detalle Documento Moroso');
		recuperarAval(codigoMoroso);
		
		$("#nro").text(data.nro);
		$("#nroDocMoroso").text(data.nroDocMoroso);
		$("#tipNumDocIdentidad").text(data.tipNumDocIdentidad);
		$("#razonSocial").text(data.razonSocial);
		$("#moneda").text(data.moneda);
		$("#monto").text(data.monto);
		$("#fecvencimiento").text(data.fecvencimiento);
		$("#feccancelacion").text(data.feccancelacion);
		$("#stsProceso").text(data.stsProceso);
		$("#stsRegistro").text(data.stsRegistro);
		$("#fecReporte").text(data.fecReporte);
		$("#fecModificacion").text(data.fecModificacion);
		$("#tipMovimiento").text(data.tipMovimiento);
				
		$("#tipPersona").text(data.tipPersona);
		$("#tipoDocIdentidad").text(data.tipoDocIdentidad);
		$("#nroDocuIden").text(data.nroDocuIden);
		
		$("#apePaternoNatural").text(data.apePaternoNatural);
		$("#apeMaternoNatural").text(data.apeMaternoNatural);
		$("#nombreNatural").text(data.nombreNatural);
		
		$("#codTipPersona").text(data.codTipPersona);
				
		$("#direcScom").text(data.direcScom);
		
		$("#dptoDeu").text(data.dptoDeu);
		$("#provDeu").text(data.provDeu);
		$("#distDeu").text(data.distDeu);
		
		$("#tipoDocCredito").text(data.tipoDocCredito);
		$("#tipoCondDeud").text(data.tipoCondDeud);
		
		
		if(data.codTipPersona == '1'){
			$('#tblDeudor').find('.trjuri').hide();
		}else if(data.codTipPersona == '2'){
			$('#tblDeudor').find('.trnatu').hide();
			$('#tblDeudor').find('.trnatu2').hide();
		}else{
			$('#tblDeudor').find('.trnatu').hide();
			$('#tblDeudor').find('.trnatu2').hide();
			$('#tblDeudor').find('.trjuri').hide();
		}
		
		
		
	});
}


function validaBusqueda(){
	
	var codigoSci = '';
	var codigoHost = '';
	
	var mivalor = $("#codigoSciHost").val();

	if (mivalor == '1')
		codigoSci = $("#codigo").val();
	else
		codigoHost = $("#codigo").val();

	var nombre = $("#nombre").val();
	
	
	paramBusca.codigoSci = codigoSci;
	paramBusca.codigoHost = codigoHost;
	paramBusca.nombre = nombre;
	
	if(combBusca=="persona"){
		
		if(combSubBusca=="persona"){
		
			if($("#rdSubOpcion1").val()==1){
				//alert("Por documento");
				if($("#cboTipDocumento").val()!=""){
					if($("#txtNumDoc").val()!=""){
						paramBusca.tipDocuIden = $("#cboTipDocumento").val();
						paramBusca.numDocuIden = $("#txtNumDoc").val();
						return true;
					}else{
						mostrarMensaje("WARNING","Debe ingresar un numero de documento");
						return false;
					}
				}else{
					mostrarMensaje("WARNING","Debe seleccionar un tipo de documento");
					return false;
				}
					
				
			}else if ($("#rdSubOpcion1").val()==2){
				
				var auno; 
				
				if($("#txtApepat").val().trim()!=""){
					auno = true;
				}else if($("#txtApemat").val().trim()!=""){
					auno = true;
				}else if($("#txtNombre").val().trim()!=""){
					auno = true;
				}else{
					auno = false;
				}
				
				if(auno){
					paramBusca.apepat = $("#txtApepat").val().trim();
					paramBusca.apemat = $("#txtApemat").val().trim();
					paramBusca.nombper = $("#txtNombre").val().trim();
					return true;
				}else{
					mostrarMensaje("WARNING","Debe ingresar al menos un apellido o nombre, para la busqueda");
					return false;
				}
				
			}
			
		}else{
			mostrarMensaje("WARNING","Debe seleccionar por Documento o por Nombre");
			return false;
		}
		
	}else if(combBusca=="empresa"){
		
		if(combSubBusca=="empresa"){
			if ($("#rdSubOpcion2").val()==1){
				if($("#txtRUC").val()!=""){
					paramBusca.ruc = $("#txtRUC").val();
					return true;
				}else{
					mostrarMensaje("WARNING","Debe ingresar el número de Ruc");
					return false;
				}
			}	
		}else{
			mostrarMensaje("WARNING","Debe seleccionar por Ruc");
			return false;
		}
		
	}else if (combBusca=="docMoroso"){
		
		if(combSubBusca=="docMoroso"){
		
			if($("#rdSubOpcion3").val()==1){
				if($("#txtNumDocMoroso").val().trim()!=""){
					paramBusca.numDocMoroso = $("#txtNumDocMoroso").val().trim();
					return true;
				}else{
					mostrarMensaje("WARNING","Debe ingresar el número de Documento Moroso");
					return false;
				}
			}else if($("#rdSubOpcion3").val()==2){
				
				if($("#cboStsProceso").val()!=""){
					paramBusca.codStsProceso = $("#cboStsProceso").val();
					return true;
				}else{
					mostrarMensaje("WARNING","Debe seleccionar el estado del proceso");
					return false;
				}
				
			}
			
		}else{
			mostrarMensaje("WARNING","Debe seleccionar por documento o por estado");
			return false;
		}
		
	}else if (combBusca=="todo"){
		paramBusca.todo = 1;
		return true;
	}else{
		mostrarMensaje("WARNING","Debe seleccionar algun criterio de busqueda");
	}
	
	
	return false;
}


function buscarRegistroCartera() {
		
		
	if(validaBusqueda()){
		
		
		$("#resultado_busqueda").css("display", "block");	
		$("#grilla_cons_regis_cartera").jqGrid('setGridParam', {
			url : 'listarRegistroCartera.json',
			postData : {"paramBusca":paramBusca}, 
			datatype : 'json',
			mtype : 'POST',
			page : 1
		}).trigger('reloadGrid');	
		
	}
	
	
	resetParamBusqueda();
	
}

function resetParamBusqueda(){
	
	paramBusca = new Object();
	paramBusca.tipDocuIden = "";
	paramBusca.numDocuIden = "";
	paramBusca.apepat = "";
	paramBusca.apemat = "";
	paramBusca.nombper = "";
	paramBusca.ruc = "";
	paramBusca.numDocMoroso ="";
	paramBusca.codStsProceso = "";
	paramBusca.todo ="";
	paramBusca.codigoSci = "";
	paramBusca.codigoHost = "";
	paramBusca.nombre = "";
	 
}


function ocultaCriterio() {
	
	$("#critPersonaDocumento").hide("linear");
	$("#critPersonaNombre").hide("linear");
	$("#critEmpresaRuc").hide("linear");
	$("#critDocumentoMoroso").hide("linear");
	$("#critEstadoProceso").hide("linear");
	$("#critTodaCartera").hide("linear");
		
}

function ocultaTablas(){
	$("#tbPersona").hide();
	$("#tbEmpresa").hide();
	$("#tbDocumento").hide();
	$("#tbCartera").hide();
}

function limpiaTodo(){
	
	var $radiosChild;
	
	$radiosChild = $('input:radio[name=rdSubOpcion1]');
	$radiosChild.filter('[value=1]').prop('checked', false);
		
	$radiosChild = $('input:radio[name=rdSubOpcion1]');
	$radiosChild.filter('[value=2]').prop('checked', false);
		
	$radiosChild = $('input:radio[name=rdSubOpcion2]');
	$radiosChild.filter('[value=1]').prop('checked', false);
		
	$radiosChild = $('input:radio[name=rdSubOpcion3]');
	$radiosChild.filter('[value=1]').prop('checked', false);
		
	$radiosChild = $('input:radio[name=rdSubOpcion3]');
	$radiosChild.filter('[value=2]').prop('checked', false);
	
	limpiaInputsBusquedaAvanzada();
		
}

function limpiaInputsBusquedaAvanzada(){
	
	$("#cboTipDocumento").val('');
	$("#txtNumDoc").val('');
	
	$("#txtApepat").val('');
	$("#txtApemat").val('');
	$("#txtNombre").val('');
	
	$("#txtRUC").val('');
	
	$("#txtNumDocMoroso").val('');
	
	$("#cboStsProceso").val('');
	
}

//function verSubMenu(valorRadio) {
//	
//	limpiaTodo();
//	ocultaCriterio();
//	ocultaTablas();
//	
//	var $radiosParent;
//		
//	$radiosParent = $('input:radio[name=rdMainOpciones]');	
//	
//	if(valorRadio==1){
//		
//		$("#tbPersona").show();	
//    	$radiosParent.filter('[value=1]').prop('checked', true);
//	    
//	}else if(valorRadio==2){
//		
//		$("#tbEmpresa").show();
//    	$radiosParent.filter('[value=2]').prop('checked', true);
//		
//	}else if(valorRadio==3){
//		
//		$("#tbDocumento").show();		
//    	$radiosParent.filter('[value=3]').prop('checked', true);
//		
//	}else if(valorRadio==4){
//		
//		$radiosParent.filter('[value=4]').prop('checked', true);
//		
//	}
//	
//		$radiosChild = $('input:radio[name=rdSubOpcion1]');
//	  //if($radiosParent.is(':checked') === false) {
//}

function verSubMenu(valorRadio) {
	
	limpiaTodo();
	ocultaCriterio();
	ocultaTablas();
	
	var $radiosParent = $('input:radio[name=rdMainOpciones]');	
	
	if(valorRadio==1){
		
		$("#rdMainOpciones").val('1');
		$("#tbPersona").show();	
    	$radiosParent.filter('[value=1]').prop('checked', true);
    	
    	combBusca="persona";
	}else if(valorRadio==2){		
		$("#rdMainOpciones").val('2');
		$("#tbEmpresa").show();
    	$radiosParent.filter('[value=2]').prop('checked', true);
    	
    	combBusca="empresa";
	}else if(valorRadio==3){
		
		$("#rdMainOpciones").val('3');
		$("#tbDocumento").show();		
    	$radiosParent.filter('[value=3]').prop('checked', true);
    	
    	combBusca="docMoroso";
	}else if(valorRadio==4){
		
		$("#rdMainOpciones").val('4');
		$radiosParent.filter('[value=4]').prop('checked', true);
		
		
		combBusca="todo";
	}
	
	//	$radiosChild = $('input:radio[name=rdSubOpcion1]');
	
	combSubBusca="";

}



function verCriterio(nombreId) {
	
	ocultaCriterio();
	limpiaInputsBusquedaAvanzada();
	
	var $radiosChild;	
	
	if (nombreId == 'critPersonaDocumento') {
		
		$("#critPersonaDocumento").show("swing");
		$("#rdSubOpcion1").val('1');
		$radiosChild = $('input:radio[name=rdSubOpcion1]');
		$radiosChild.filter('[value=1]').prop('checked', true);
		
		combSubBusca = "persona";
		
	} else if (nombreId == 'critPersonaNombre') {
		
		$("#critPersonaNombre").show("swing");
		$("#rdSubOpcion1").val('2');
		$radiosChild = $('input:radio[name=rdSubOpcion1]');
		$radiosChild.filter('[value=2]').prop('checked', true);		
		
		combSubBusca = "persona";
		
	}else if(nombreId == 'critEmpresaRuc'){
		
		$("#critEmpresaRuc").show("swing");
		$("#rdSubOpcion2").val('1');
		$radiosChild = $('input:radio[name=rdSubOpcion2]');
		$radiosChild.filter('[value=1]').prop('checked', true);
		
		combSubBusca = "empresa";
		
	}else if(nombreId == 'critDocumentoMoroso'){
		
		$("#critDocumentoMoroso").show("swing");
		$("#rdSubOpcion3").val('1');
		$radiosChild = $('input:radio[name=rdSubOpcion3]');
		$radiosChild.filter('[value=1]').prop('checked', true);
		
		combSubBusca = "docMoroso";
		
	}else if(nombreId == 'critEstadoProceso'){
		
		$("#critEstadoProceso").show("swing");
		$("#rdSubOpcion3").val('2');
		$radiosChild = $('input:radio[name=rdSubOpcion3]');
		$radiosChild.filter('[value=2]').prop('checked', true);
		
		combSubBusca = "docMoroso";
		
	}else if(nombreId == 'critTodaCartera'){
		$("#critTodaCartera").show("swing");
		
		combSubBusca = "todo";
	}
	
	
}


function exportToFile(format) {
	if(validaBusqueda()){
		var url = 'exportToFile.htm?format=' + format + '&tipDocuIden='+paramBusca.tipDocuIden +'&' + 
		'numDocuIden='+paramBusca.numDocuIden +'&' + 
		'apepat='+paramBusca.apepat +'&' + 
		'apemat='+paramBusca.apemat +'&' +
		'nombper='+paramBusca.nombper +'&' +
		'ruc='+paramBusca.ruc +'&' +
		'numDocMoroso='+paramBusca.numDocMoroso +'&' +
		'codStsProceso='+paramBusca.codStsProceso +'&' +
		'todo='+paramBusca.todo +'&' +
		'codigoSci='+paramBusca.codigoSci +'&' +
		'codigoHost='+paramBusca.codigoHost +'&' +		
		'nombre='+paramBusca.nombre;
		
		window.open(url, "_blank", "menubar=no,location=0,height=500,width=800");
	}
	
}
