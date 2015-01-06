function listarParametrosPorPais(codigo) {
	var parametros = new Object();
	parametros.codigo = codigo;

	jQuery("#grilla_paramPais").jqGrid(
			{
				url : 'listarParamPaises.json',
				postData : parametros,
				datatype : "json",
				mtype : 'POST',
				colNames : [ 'Código', 'Descripcion', 'Valor' ],
				colModel : [ {
					name : 'codigo',
					index : 'codigo',
					width : 1,
					sortable : false,
					hidden : true
				}, {
					name : 'descripcion',
					index : 'descripcion',
					width : 100,	
					sortable : false,
					editable : true
				}, {
					name : 'valor',
					index : 'valor',
					width : 100,
					sortable : false,
					editable : true
				} ],
				cellEdit : true,
				cellsubmit : 'remote',
				cellurl : 'saveCellParamPais.json',
				rowNum : 10,
				height : 250,
				width : 400,
				rowList : [ 10, 20, 30 ],
				pager : '#grilla_paramPais',
				sortname : 'id',
				viewrecords : true,
				sortorder : "desc",
				beforeSubmitCell : function(rowid, celname, value, iRow, iCol) {

					selectedRowId = $('#grilla_paramPais').jqGrid(
							'getGridParam', 'selrow');
					cellValue = $('#grilla_paramPais').jqGrid('getCell',
							selectedRowId, 'codigo');

					return {
						valor_edit : value,
						nom_cell : celname,
						valor_id : cellValue
					};
				}
			});

	$("#grilla_paramPais").jqGrid('setGridParam').trigger('reloadGrid');

}