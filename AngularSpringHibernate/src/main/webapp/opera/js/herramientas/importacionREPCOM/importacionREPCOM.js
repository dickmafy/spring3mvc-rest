var tamanioBaseGrilla;

$(document).ready(function() {

});

function importarREPCOM() {
	jQuery("#grilla_REPCOM").jqGrid(
			{
				url : 'listarRepresentantesComerciales.json',
				datatype : "json",
				mtype : 'POST',
				colNames : [ 'Codigo', 'Nombre', 'Celular', 'Fech Nacimiento',
						'Beep', 'Cargo', 'Mercado' ],
				colModel : [ {
					name : 'codigo',
					index : 'codigo',
					width : 50,
					sortable : false
				}, {
					name : 'nombre',
					index : 'nombre',
					width : 100,
					sortable : false
				}, {
					name : 'celular',
					index : 'celular',
					width : 150,
					sortable : false
				}, {
					name : 'fechaNacimiento',
					index : 'fechaNacimiento',
					width : 50,
					sortable : false
				}, {
					name : 'beep',
					index : 'beep',
					width : 50,
					sortable : false
				}, {
					name : 'carga',
					index : 'carga',
					width : 50,
					sortable : false
				}, {
					name : 'codigoMercado',
					index : 'codigoMercado',
					width : 50,
					sortable : false
				} ],
				rowNum : 10,
				height : 250,
				width : 900,
				rowList : [ 10, 20, 30 ],
				pager : '#pgrilla_REPCOM',
				sortname : 'id',
				viewrecords : true,
				sortorder : "desc"
			});

	tamanioBaseGrilla = jQuery("#grilla_REPCOM").getGridParam().height;

	$('#grilla_REPCOM').jqGrid(
			'setGridParam',
			{
				beforeRequest : function() {

					var cantidadXPagina = jQuery("#grilla_REPCOM")
							.getGridParam().rowNum;
					var alto = Number(tamanioBaseGrilla)
							+ (Number(cantidadXPagina) * 3);

					if (cantidadXPagina == "10") {
						alto = tamanioBaseGrilla;
					}
					$('#grilla_REPCOM').jqGrid('setGridHeight', alto);
				}
			});
}
