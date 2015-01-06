$(document).ready(function() {

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
		onSelectRow : function(aRowids, status, e) {
			var data = $('#grilla_subentidades').jqGrid('getRowData', aRowids);
			getSU(data.codigo);
		}
	});
	
	// Oficinas
	jQuery("#grilla_oficinas").jqGrid({
		url : 'listarOficina.json',
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
			name : 'codigoOfi',
			index : 'codigoOfi',
			width : 100,
			sortable : false
		}, {
			name : 'nombreOfi',
			index : 'nombreOfi',
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
		pager : '#pgrilla_oficinas',
		sortname : 'id',
		viewrecords : true,
		sortorder : "desc",
		onSelectRow : function(aRowids, status, e) {
			var data = $('#grilla_oficinas').jqGrid('getRowData', aRowids);
			getOU(data.codigoOfi);
		}
	});

});

function getSU(codigo) {

	var data = '';

	$.ajax({
		url : "../../comun/cmbPerfiles.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {
		$.each(jsonData, function(key, val) {
			data += val.codigo + ':' + val.nombre + ';';
		});

	});
	
	data = data.substr(0, data.length - 1);

	var parametros = new Object();
	parametros.codigo = codigo;

	// SubEntidades x Usuarios
	jQuery("#grilla_SubEntidadxUsuario").jqGrid({
		url : 'listarSubEntidadxUsuario.json',
		postData : parametros,
		datatype : "json",
		mtype : 'POST',
		colNames : [ '', 'Código', 'Nombre', 'Perfil' ],
		colModel : [ {
			name : 'codigoSubEnti',
			index : 'codigoSubEnti',
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
			name : 'perfil',
			index : 'perfil',
			width : 200,
			editable : true,
			edittype : 'select',
			editoptions : {
				value : data
			}

		} ],
		cellEdit : true,
		cellsubmit : 'remote',
		cellurl : 'saveCellPerfil.json',
		rowNum : 10,
		height : 150,
		width : 950,
		rowList : [ 10, 20, 30 ],
		pager : '#pgrilla_SubEntidadxUsuario',
		sortname : 'id',
		viewrecords : true,
		sortorder : "desc",		
		beforeSubmitCell : function(rowid, celname, value, iRow, iCol) {
			
			selectedRowId = $('#grilla_SubEntidadxUsuario').jqGrid(
					'getGridParam', 'selrow');
			cellValue = $('#grxUsuario').jqGrid('getCell',
					selectedRowId, 'illa_SubEntidadcodigoUsu');

			return {
				valor_edit : value,
				nom_cell : celname,
				valor_id : cellValue
			};
		}
	});
}

//OficinaxUsuario
function getOU(codigoOfi) {

	var data = '';

	$.ajax({
		url : "../../comun/cmbPerfiles.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {
		$.each(jsonData, function(key, val) {
			data += val.codigo + ':' + val.nombre + ';';
		});

	});
	
	data = data.substr(0, data.length - 1);

	var parametros = new Object();
	parametros.codigoOfi = codigoOfi;

	// SubEntidades x Usuarios
	jQuery("#grilla_OficinaxUsuario").jqGrid({
		url : 'listarOficinaxUsuario.json',
		postData : parametros,
		datatype : "json",
		mtype : 'POST',
		colNames : [ '', 'Código', 'Nombre', 'Perfil' ],
		colModel : [ {
			name : 'codigoSubEnti',
			index : 'codigoSubEnti',
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
			name : 'perfil',
			index : 'perfil',
			width : 200,
			editable : true,
			edittype : 'select',
			editoptions : {
				value : data
			}

		} ],
		cellEdit : true,
		cellsubmit : 'remote',
		cellurl : 'saveCellPerfil.json',
		rowNum : 10,
		height : 150,
		width : 950,
		rowList : [ 10, 20, 30 ],
		pager : '#pgrilla_OficinaxUsuario',
		sortname : 'id',
		viewrecords : true,
		sortorder : "desc",
		beforeSubmitCell : function(rowid, celname, value, iRow, iCol) {

			selectedRowId = $('#grilla_OficinaxUsuario').jqGrid(
					'getGridParam', 'selrow');
			cellValue = $('#grilla_paramPais').jqGrid('getCell',
					selectedRowId, 'codigoUsu');

			return {
				valor_edit : value,
				nom_cell : celname,
				valor_id : cellValue
			};
		},
		onSelectRow : function(aRowids, status, e) {

		}

	});
}