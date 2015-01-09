var tamanioBaseGrilla;

var combBusca;
var combSubBusca;

var paramBusca = new Object();
paramBusca.atraso = "";
paramBusca.estado = "";
paramBusca.todo = "";


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
			
			jQuery("#grilla_cons_regis_entidades")
					.jqGrid(
							{
								colNames : [ 'Nro',
										'Código entidad', 'Código host', 'Nombre de entidad',
										'RUC', 'Dirección', 'País', 'Email',
										'Estado'] ,
								colModel : [
										{
											name : 'nro',
											index : 'nro',
											width : 50,
											sortable : false
										},
										{
											name : 'codigo',
											index : 'codigo',
											width : 100,
											sortable : false
										},
										{
											name : 'codigoHost',
											index : 'codigoHost',
											width : 50,
											sortable : false
										},
										{
											name : 'nombre',
											index : 'nombre',
											width : 150,
											sortable : false
										},
										{
											name : 'ruc',
											index : 'ruc',
											width : 50,
											sortable : false
										},
										{
											name : 'direccion',
											index : 'direccion',
											width : 50,
											sortable : false
										},
										{
											name : 'pais',
											index : 'pais',
											width : 80,
											sortable : false
										},
										{
											name : 'email',
											index : 'email',
											width : 150,
											sortable : false
										},
										{
											name : 'estado',
											index : 'estado',
											width : 80,
											sortable : false
										}												
										],
								rowNum : 10,
								height : 240,
								width : 1121,
								rowList : [ 10, 20, 30 ],
								pager : '#pgrilla_cons_regis_entidades',
								sortname : 'id',
								viewrecords : true,
								sortorder : "desc",
								scrollOffset: 0,
								onSelectRow : function(id) {
									var filaEntidad = $(
											"#grilla_cons_regis_entidades")
											.jqGrid('getRowData', id);
									//alert("selection row CG " + filaEntidad.codigomoroso);
									obtenerDetalle(filaEntidad.codigo);
								}
							});

			tamanioBaseGrilla = jQuery(
					"#grilla_cons_regis_entidades").getGridParam().height;

			$('#grilla_cons_regis_entidades').jqGrid(
					'setGridParam',
					{
						beforeRequest : function() {

							var cantidadXPagina = jQuery(
									"#grilla_cons_regis_entidades")
									.getGridParam().rowNum;
							var alto = Number(tamanioBaseGrilla)
									+ (Number(cantidadXPagina) * 3);

							if (cantidadXPagina == "10") {
								alto = tamanioBaseGrilla;
							}

							$('#grilla_cons_regis_entidades')
									.jqGrid('setGridHeight', alto);

						}
					});
			
		});


function obtenerDetalle(codigoEntidad) {

	bloquearPantalla();
	
	$.ajax({
		url : "irDetalleEntidad.htm",
		type : "GET",		
		async : false,
		cache : false
		}).done(function(html) {
			var data;
			var gsr = $('#grilla_cons_regis_entidades').jqGrid('getGridParam', 'selrow');
			if (gsr) {
				data = $('#grilla_cons_regis_entidades').jqGrid('getRowData', gsr);
			}		
			desbloquearPantalla();
			$("#mostrarInfoRpt").html(html);
			crearPopUp("mostrarInfoRpt", 600, 600, 'Detalle de Entidad');
			obtenerDetalleEntidad(codigoEntidad);
			
		});
}

function buscarRegistroEntidades() {
		
	if(validaBusqueda()){
		$("#resultado_busqueda").css("display", "block");	
		$("#grilla_cons_regis_entidades").jqGrid('setGridParam', {
			url : 'listarRegistroEntidad.json',
			postData : {"paramBusca":paramBusca},
			datatype : 'json',
			mtype : 'POST',
			page : 1
		}).trigger('reloadGrid');	
	}
	
	
	
}

function validaBusqueda(){
	
	
	if(combBusca=="todo"){
		paramBusca.todo = 1;
		return true;
	}else if(combBusca=="estado"){
		
		if($("#cboStsProceso").val()!=""){
			paramBusca.estado = $("#cboStsProceso").val();
			return true;
		}else{
			mostrarMensaje("WARNING","Debe seleccionar el estado del proceso");
			return false;
		}
		
	}else if(combBusca=="atraso"){
		
		if(combSubBusca=="atraso1"){
			paramBusca.atraso = 1;
			return true;
		}else if(combSubBusca=="atraso2"){
			paramBusca.atraso = 2;
			return true;
		}else if(combSubBusca=="atraso3"){
			paramBusca.atraso = 3;
			return true;
		}else if(combSubBusca=="atraso4"){
			paramBusca.atraso = 4;
			return true;
		}else{
			mostrarMensaje("WARNING","Debe seleccionar un tipo de atraso");
			return false;
		}
		
	}else{
		mostrarMensaje("WARNING","Debe seleccionar algun criterio de busqueda");
	}

	return false;
	
}

function ocultaCriterio() {
	
	$("#critTodoAportantes").hide("linear");
	$("#critEstadoProceso").hide("linear");
	$("#critPorAportantes").hide("linear");	
		
}




function limpiaInputs(){
	
	$radiosChild = $('input:radio[name=rdSubOpcion1]');
	$radiosChild.filter('[value=1]').prop('checked', false);
		
	$radiosChild = $('input:radio[name=rdSubOpcion1]');
	$radiosChild.filter('[value=2]').prop('checked', false);
		
	$radiosChild = $('input:radio[name=rdSubOpcion1]');
	$radiosChild.filter('[value=3]').prop('checked', false);
		
	$radiosChild = $('input:radio[name=rdSubOpcion1]');
	$radiosChild.filter('[value=4]').prop('checked', false);
	
	$("#cboStsProceso").val('');
	
}

function chkLink(valorRadio) {
	
		
	var $radiosChild;
		
	$radiosChild = $('input:radio[name=rdSubOpcion1]');	
	
	if(valorRadio==1){
		$("#rdSubOpcion1").val('1');	
		$radiosChild.filter('[value=1]').prop('checked', true);
			
		combSubBusca="atraso1";
		
	}else if(valorRadio==2){
		$("#rdSubOpcion1").val('2');
		$radiosChild.filter('[value=2]').prop('checked', true);
		
		combSubBusca="atraso2";
		
	}else if(valorRadio==3){
		$("#rdSubOpcion1").val('3');
		$radiosChild.filter('[value=3]').prop('checked', true);
		
		combSubBusca="atraso3";
		
	}else if(valorRadio==4){
		$("#rdSubOpcion1").val('4');
		$radiosChild.filter('[value=4]').prop('checked', true);
		
		combSubBusca="atraso4";
	}


}

function verCriterio(nombreId) {
	
	ocultaCriterio();
	limpiaInputs();
	
	var $radiosParent;
	
	if (nombreId == 'critTodoAportantes') {
		$("#critTodoAportantes").show("swing");
		$("#rdMainOpciones").val('1');
		$radiosParent = $('input:radio[name=rdMainOpciones]');
		$radiosParent.filter('[value=1]').prop('checked', true);		
		
		combBusca="todo";
		
	}else if (nombreId == 'critEstadoProceso') {
		$("#critEstadoProceso").show("swing");
		$("#rdMainOpciones").val('2');
		$radiosParent = $('input:radio[name=rdMainOpciones]');
		$radiosParent.filter('[value=2]').prop('checked', true);
		
		combBusca="estado";
		
	}else if(nombreId == 'critPorAportantes'){
		$("#critPorAportantes").show("swing");
		$("#rdMainOpciones").val('3');
		$radiosParent = $('input:radio[name=rdMainOpciones]');
		$radiosParent.filter('[value=3]').prop('checked', true);		
		
		combBusca="atraso";
	}
	
	combSubBusca="";
	
}

function exportToFile(format) {
	if(validaBusqueda()){
		var url = 'exportToFile.htm?format=' + format + '&todo='+paramBusca.todo +'&' + 
		'estado='+paramBusca.estado +'&' + 
		'atraso='+paramBusca.atraso; 
				
		window.open(url, "_blank", "menubar=no,location=0,height=500,width=800");
	}
	
}
