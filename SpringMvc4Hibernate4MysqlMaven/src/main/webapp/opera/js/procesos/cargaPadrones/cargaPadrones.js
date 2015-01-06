$(document)
		.ready(
				function() {
			cmbTipoCargaPadron("cmbTipoCargaPadron");
			cmbTipoOperacionCarga("cmbTipoOperacionCarga");			
			
		});

function uploadFile() {
	var tipoCargaPadron = $('#cmbTipoCargaPadron').val();
	var tipoOperacionCarga = $('#cmbTipoOperacionCarga').val();

	var formData = new FormData();
	formData.append('file', $('#fileupload').get(0).files[0]);
	formData.append('tipoCargaPadron', tipoCargaPadron);
	formData.append('tipoOperacionCarga', tipoOperacionCarga);

	$.ajax({
		url : 'uploadFile.htm',
		type : 'POST',
		data : formData,
		cache : false,
		contentType : false,
		processData : false,
		async : false,
		error : function(xhr, textStatus, errorThrown) {
			alert('An error occurred! ' + errorThrown);
		},
		success : function(data, textStatus) {

		}
	});
}