var tamanioBaseGrilla;

$(document).ready(function (){
	
	
	var formatoEstado = function(cellVal,options,rowObject){
		
		var estado = "";
		
		if(rowObject.estado=='P'){
			estado = "PENDIENTE";
		}
		else if(rowObject.estado=='A'){
			estado = "ACTIVO";
		}
		else{
			estado = "INACTIVO";
		}
		
		return estado;		
	};
	
	listarEstadosFormatoDos("bestadoPrd");
		
		var opciones = function(cellVal,options,rowObject){
			
			var botones = "<center>";		
				botones += "<div style='display: inline-block;'>";
				botones += "<a href=javascript:editarProducto('" + rowObject.codigo +"'); title='Editar'>";
				//botones += "<img src='../../opera/img/editar.png' border='0' title='Editar'/></a>&emsp;";
				botones +="<span class='ui-icon ui-icon-pencil'></span></a></div>&nbsp;";
				botones += "<div style='display: inline-block;'>";
				botones += "<a href=javascript:eliminarProducto('" + rowObject.codigo +"'); title='Eliminar'>";
				//botones += "<img src='../../opera/img/cancel_16x16.png' border='0' title='Eliminar'/></a>&emsp;";
				botones +="<span class='ui-icon ui-icon-trash' ></span></a></div>";
				botones += "</center>";
			return botones;
		};
		
		jQuery("#grilla_mantenimiento_producto")
		.jqGrid(
				{
					colNames : ['Código','Nombre', 'Nombre de Tabla', 'Archivo de Salida', 'Estado', 'Opciones'],
					colModel : [ 
						{
							name : 'codigo',
							index : 'codigo',
							width : 65,
							sortable : false,
							resizable : false
						},{
							name : 'descripcion',
							index : 'descripcion',
							width : 300,
							sortable : false,
							resizable : false
						},{
							name : 'nombreTabla',
							index : 'nombreTabla',
							width : 300,
							sortable : false,
							resizable : false
						}, {
							name : 'nombreArchivoSalida',
							index : 'nombreArchivoSalida',
							width : 300,
							sortable : false,
							resizable : false
						}, {
							name : 'estado',
							index : 'estado',
							width : 120,
							formatter:formatoEstado,
							sortable : false,
							resizable : false
						},{
							name : 'opciones',
							index : 'codigo',
							width : 60,
							formatter:opciones,
							sortable : false,
							resizable : false,
							title : false
						}
					],
					rowNum : 10,
					height: 240,
					//width: '100%',
					rowList : [ 10, 20, 30 ],
					pager : '#pgrilla_mantenimiento_producto',
					sortname : 'id',
					viewrecords : true,
					sortorder : "desc",
					scrollOffset: 0 //Not space column last
		});
		
		tamanioBaseGrilla = jQuery("#grilla_mantenimiento_producto").getGridParam().height;
		
		$('#grilla_mantenimiento_producto').jqGrid('setGridParam', { 
			beforeRequest: function(){
				
				var cantidadXPagina = jQuery("#grilla_mantenimiento_producto").getGridParam().rowNum;
				var alto = Number(tamanioBaseGrilla) + (Number(cantidadXPagina) * 3 );
				
				if(cantidadXPagina=="10"){
					alto = tamanioBaseGrilla;
				}
				
				$('#grilla_mantenimiento_producto').jqGrid('setGridHeight', alto);
				
			} 
		});
	
});


function buscarProducto(){
			
	var bnombrePrd = $("#bnombrePrd").val();
	var bnombrePrdTbl = $("#bnombrePrdTbl").val();
	var bestadoPrd = $("#bestadoPrd").val();
	
	
	var parametros=new Object();
	
	parametros.bnombrePrd = bnombrePrd;
	parametros.bnombrePrdTbl = bnombrePrdTbl;
	parametros.bestadoPrd = bestadoPrd;
	
	$("#grilla_mantenimiento_producto").jqGrid('setGridParam',
			{
				url:'listar-producto.json',
				postData: parametros,
				datatype:'json', 
				mtype : 'POST',
				page:1
			}).trigger('reloadGrid');
		
}


function irNuevoProducto(){
	var form = document.getElementById("idMantProductoMain");
	form.method = "POST";
	form.action = "registrar-producto.htm";
	form.submit();
	//window.location.replace("registrar-producto.htm");
}

function eliminarProducto(codigo){
	
	var accionPreEjecucion = "confirmarEliminProd('"+codigo+"')";
	var accionPostEjecucion = "buscarProducto()";
	
	mensajeConfirmacionNuevo(accionPreEjecucion, accionPostEjecucion);
	
}

function confirmarEliminProd(codigo){
	
	bloquearPantalla();
	
	var parametros=new Object();
	parametros.codigoProd = codigo;
	
	$.ajax({
		  url: "eliminar-producto.json",
		  data: parametros,
		  dataType: "json",
		  type: "POST",
		  async: false,
		  cache: false
	}).done(function(jsonData) {
		
		desbloquearPantalla();
		
		if(jsonData.respuesta==VG_RESPUESTA_OK){
			
			mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
			
		}else if (jsonData.respuesta==VG_RESPUESTA_ERROR) {
			
			mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
			
		}
		
	});
	
}

function editarProducto(codigo){
	//alert("edit");
	/*var parametros=new Object();
	parametros.codigoProd = codigo;

	$().redirect('irSubentidadOficina.json', {
		'codigoEntidad' : objeto.codigo,
		'nombreEntidad' : objeto.nombre
	}, 'POST');*/
	
	var form = document.getElementById("idMantProductoMain");
	form.method = "POST";
	form.codigoProducto.value = codigo;
	form.action = "editar-producto.htm";
	form.submit();
	
}

