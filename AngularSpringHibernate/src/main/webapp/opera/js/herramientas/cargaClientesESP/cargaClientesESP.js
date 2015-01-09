$(document).ready(function() {
	$.ajax({
		url : 'ultimaFecha.json',
		type : "POST",
		async : false,
		cache : false,
		error : function(xhr, textStatus, errorThrown) {
			alert('An error occurred! ' + errorThrown);
		},
		success : function(value) {
			var now = new Date();
			now.setTime(value);
			$('#fechaUltima').text($.datepicker.formatDate("DD dd 'de' MM 'del' yy", now));
		}
	});
});

function cargarClientesEspeciales() {
	$.ajax({
		url : 'cargarClientesEspeciales.json',
		type : "POST",
		async : false,
		cache : false,
		error : function(xhr, textStatus, errorThrown) {
			alert('An error occurred! ' + errorThrown);
		},
		success : function(value) {
			$("#cantidad").text(value);
		}
	});
}