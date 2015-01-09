$(document).ready(
		function() {

			var linkUsuarioSE = function(cellVal, options, rowObject) {
				var linkUsuarioSE = "<center>";
				linkUsuarioSE += "<a href=javascript:getSU('" + options.rowId
						+ "');>" + options.rowId + "</a>";
				linkUsuarioSE += "</center>";
				return linkUsuarioSE;
			};
			
			var linkUsuarioOF = function(cellVal, options, rowObject) {
				var linkUsuarioOF = "<center>";
				linkUsuarioOF += "<a href=javascript:getOU('" + options.rowId
						+ "');>" + options.rowId + "</a>";
				linkUsuarioOF += "</center>";
				return linkUsuarioOF;
			};

			var codigo = $("#codigoEntidad").val();
			var parametros = new Object();
			parametros.codigo = codigo;

			// SubEntidades
			var lastsel = '';
			jQuery("#grilla_subentidades").jqGrid(
					{
						url : 'listarSubEntidad.json',
						postData : parametros,
						datatype : "json",
						mtype : 'POST',
						colNames : [ '', 'Código', 'Nombre', 'Ruc',
								'Direccion', 'Jefe', 'Telefono', 'Fax' ],
						colModel : [ {
							name : 'codigoEnti',
							index : 'codigoEnti',
							hidden : true
						}, {
							name : 'codigo',
							index : 'codigo',
							width : 100,
							formatter : linkUsuarioSE,
							sortable : false
						}, {
							name : 'nombre',
							index : 'nombre',
							width : 200,
							sortable : false,
							editable : true
						}, {
							name : 'ruc',
							index : 'ruc',
							width : 200,
							sortable : false,
							editable : true
						}, {
							name : 'direccion',
							index : 'direccion',
							width : 200,
							sortable : false,
							editable : true
						}, {
							name : 'jefe',
							index : 'jefe',
							width : 200,
							sortable : false,
							editable : true
						}, {
							name : 'telefono',
							index : 'telefono',
							width : 200,
							sortable : false,
							editable : true
						}, {
							name : 'fax',
							index : 'fax',
							width : 80,
							sortable : false,
							editable : true
						} ],
						cellEdit : true,
						cellsubmit : 'remote',
						cellurl : 'saveCellSubEntidad.json',
						rowNum : 10,
						height : 200,
						width : 950,
						rowList : [ 10, 20, 30 ],
						pager : '#pgrilla_subentidades',
						viewrecords : true,
						onSelectRow : function(aRowids, status, e) {
							console.log('inside onSelectRow');
							if (aRowids && aRowids !== lastsel) {
								$('#grilla_subentidades').restoreRow(lastsel);
								$('#grilla_subentidades')
										.editRow(aRowids, true);
								lastsel = aRowids;
							}
						},
						beforeSubmitCell : function(rowid, celname, value, iRow, iCol) {
							selectedRowId = $('#grilla_subentidades').jqGrid(
									'getGridParam', 'selrow');
							cellValue = $('#grilla_subentidades').jqGrid('getCell',
									selectedRowId, 'codigo');
							return {
								valor_edit : value,
								nom_cell : celname,
								valor_id : rowid
							};
						}
					});

			// Oficinas
			jQuery("#grilla_oficinas").jqGrid(
					{
						url : 'listarOficina.json',
						postData : parametros,
						datatype : "json",
						mtype : 'POST',
						colNames : [ '', 'Código', 'Nombre', 'Direccion',
								'Jefe', 'Telefono', 'Fax' ],
						colModel : [ {
							name : 'codigoEnti',
							index : 'codigoEnti',
							hidden : true
						}, {
							name : 'codigoOfi',
							index : 'codigoOfi',
							width : 80,
							formatter : linkUsuarioOF,
							sortable : false
						}, {
							name : 'nombreOfi',
							index : 'nombreOfi',
							width : 200,
							sortable : false,
							editable : true
						}, {
							name : 'direccionOfi',
							index : 'direccionOfi',
							width : 200,
							sortable : false,
							editable : true
						}, {
							name : 'jefeOfi',
							index : 'jefeOfi',
							width : 100,
							sortable : false,
							editable : true
						}, {
							name : 'telefonoOfi',
							index : 'telefonoOfi',
							width : 100,
							sortable : false,
							editable : true
						}, {
							name : 'faxOfi',
							index : 'faxOfi',
							width : 100,
							sortable : false,
							editable : true
						} ],
						cellEdit : true,
						cellsubmit : 'remote',
						cellurl : 'saveCellOficina.json',
						rowNum : 10,
						height : 200,
						width : 950,
						rowList : [ 10, 20, 30 ],
						pager : '#pgrilla_oficinas',
						sortname : 'id',
						viewrecords : true,
						sortorder : "desc",
						onSelectRow : function(aRowids, status, e) {

						},
						beforeSubmitCell : function(rowid, celname, value, iRow, iCol) {
							selectedRowId = $('#grilla_oficinas').jqGrid(
									'getGridParam', 'selrow');
							cellValue = $('#grilla_oficinas').jqGrid('getCell',
									selectedRowId, 'codigo');

							return {
								valor_edit : value,
								nom_cell : celname,
								valor_id : rowid
							};
						}
					});

		});

function getSU(id) {
	console.log('id ' + id);
	var parametros = new Object();
	parametros.codigo = id;

	// SubEntidades x Usuarios
	jQuery("#grilla_SubEntidadxUsuario").jqGrid(
			{
				url : 'listarSubEntidadxUsuario.json',
				postData : parametros,
				datatype : "json",
				mtype : 'POST',
				colNames : [ '', 'Código', 'Nombre', 'Cargo', 'Codigo Host',
						'Oficina', 'Telefono', 'Axeno', 'Email', 'Estado' ],
				colModel : [ {
					name : 'codigoSubEnti',
					index : 'codigoSubEnti',
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
					name : 'cargoUsu',
					index : 'cargoUsu',
					width : 100,
					sortable : false
				}, {
					name : 'codigoUsuHost',
					index : 'codigoUsuHost',
					width : 100,
					sortable : false
				}, {
					name : 'oficinaUsu',
					index : 'oficinaUsu',
					width : 100,
					sortable : false
				}, {
					name : 'telefonoUsu',
					index : 'telefonoUsu',
					width : 100,
					sortable : false
				}, {
					name : 'anexoUsu',
					index : 'anexoUsu',
					width : 100,
					sortable : false
				}, {
					name : 'emailUsu',
					index : 'emailUsu',
					width : 100,
					sortable : false
				}, {
					name : 'estadoUsu',
					index : 'estadoUsu',
					width : 100,
					sortable : false
				} ],
				rowNum : 10,
				height : 150,
				width : 950,
				rowList : [ 10, 20, 30 ],
				pager : '#pgrilla_SubEntidadxUsuario',
				viewrecords : true
			});
}

// OficinaxUsuario
function getOU(id) {
	console.log('id ' + id);
	var parametros = new Object();
	parametros.codigoOfi = id;

	// SubEntidades x Usuarios
	jQuery("#grilla_OficinaxUsuario").jqGrid(
			{
				url : 'listarOficinaxUsuario.json',
				postData : parametros,
				datatype : "json",
				mtype : 'POST',
				colNames : [ '', 'Código', 'Nombre', 'Cargo', 'Codigo Host',
						'Oficina', 'Telefono', 'Axeno', 'Email', 'Estado' ],
				colModel : [ {
					name : 'codigoOfi',
					index : 'codigoOfi',
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
					name : 'cargoUsu',
					index : 'cargoUsu',
					width : 100,
					sortable : false
				}, {
					name : 'codigoUsuHost',
					index : 'codigoUsuHost',
					width : 100,
					sortable : false
				}, {
					name : 'oficinaUsu',
					index : 'oficinaUsu',
					width : 100,
					sortable : false
				}, {
					name : 'telefonoUsu',
					index : 'telefonoUsu',
					width : 100,
					sortable : false
				}, {
					name : 'anexoUsu',
					index : 'anexoUsu',
					width : 100,
					sortable : false
				}, {
					name : 'emailUsu',
					index : 'emailUsu',
					width : 100,
					sortable : false
				}, {
					name : 'estadoUsu',
					index : 'estadoUsu',
					width : 100,
					sortable : false
				} ],
				rowNum : 10,
				height : 150,
				width : 950,
				rowList : [ 10, 20, 30 ],
				pager : '#pgrilla_OficinaxUsuario',
				viewrecords : true,
				onSelectRow : function(aRowids, status, e) {

				}

			});
}