$(document).ready(function() {

	$("#tabsPerfilUsuario").tabs();

});

function getSubentidadUsuario(codigoEntidad) {
	var codigo = $("#codigoEntidad").val();
	var parametros = new Object();
	parametros.codigo = codigo;

	// SubEntidades
	jQuery("#grilla_subentidades").jqGrid({
		url : 'listarSubEntidad.json',
		postData : parametros,
		datatype : "json",
		mtype : 'POST',
		colNames : [ '', 'Código', 'Nombre', 'Cantidad de Usuarios' ],
		colModel : [ {
			name : 'codigoEnti',
			index : 'codigoEnti',
			width : 1,
			sortable : false,
			hidden : true
		}, {
			name : 'codigo',
			index : 'codigo',
			width : 100,
			sortable : false
		}, {
			name : 'nombre',
			index : 'nombre',
			width : 200,
			sortable : false
		}, {
			name : 'numUsuarios',
			index : 'numUsuarios',
			width : 80,
			sortable : false
		} ],
		rowNum : 10,
		height : 200,
		width : 950,
		rowList : [ 10, 20, 30 ],
		pager : '#pgrilla_subentidades',
		sortname : 'id',
		viewrecords : true,
		sortorder : "desc",
		onSelectRow : function(rowid, status, e) {
			var data = $('#grilla_subentidades').jqGrid('getRowData', rowId);
			getSU(data.codigo);
		}
	});

	
}

function getSU(codigo) {
	var parametros = new Object();
	parametros.codigo = codigo;
	
	// SubEntidades x Usuarios
	jQuery("#grilla_subentidades_usuarios").jqGrid({
		url : 'listarSubEntidadxUsuario.json',
		postData : parametros,
		datatype : "json",
		mtype : 'POST',
		colNames : [ '', 'Código', 'Nombre', 'Perfil' ],
		colModel : [ {
			name : 'codigoSubenti',
			index : 'codigoSubenti',
			width : 1,
			sortable : false,
			hidden : true
		}, {
			name : 'codigoUsu',
			index : 'codigoUsu',
			width : 100,
			sortable : false
		}, {
			name : 'nombreUsu',
			index : 'nombreUsu',
			width : 200,
			sortable : false
		}, {
			name : 'perfil.nombre',
			index : 'perfil.nombre',
			width : 200,
			sortable : false
		} ],
		rowNum : 10,
		height : 150,
		width : 950,
		rowList : [ 10, 20, 30 ],
		pager : '#pgrilla_subentidades_usuarios',
		sortname : 'id',
		viewrecords : true,
		sortorder : "desc",
		onSelectRow : function(id) {
			var data = $('#grilla_subentidades').jqGrid('getRowData', rowId);
			getSU(data.codigo);
		}

	});
}

function obtenerUsuarioSubenti(codigo) {
	var parametros = new Object();
	parametros.codigoSubenti = codigo;

	$("#grilla_subentidades_usuarios").jqGrid('setGridParam', {
		url : 'listarUsuarioSubEnti.json',
		postData : parametros,
		datatype : 'json',
		mtype : 'POST',
		page : 1
	}).trigger('reloadGrid');

}
