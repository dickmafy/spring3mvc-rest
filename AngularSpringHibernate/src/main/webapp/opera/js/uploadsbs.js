$(function () {
				
				$("#dlgInfoUpload").dialog({
					resizable: false,
					autoOpen: false,
					modal:true,
					buttons: {
						Aceptar: function() {
							$(this).dialog("close");
						}
					}
				});
				
				 $( "#dlgConfirm" ).dialog({
					 resizable: false,
					 autoOpen:false,
					 height:140,
					 modal: true,
					 buttons: {
					 "Aceptar": function() {
					 	process();
					 },
					 "Cancelar": function() {
					 	$( this ).dialog( "close" );
					 }
					 }
				});
				
				
			    $('#fileupload').fileupload({
			        dataType: 'json',
			        add: function ( e, data ) {
			        	if( data.files[ 0 ].name.endsWith( "xls") ||
			        		data.files[ 0 ].name.endsWith( "xlsx") ) {
			        		clear();
			        		 $("#tbUploadFiles").append(
				                        $('<tr/>')
				                        .append( $("<td width='20%' align='center'/>").text( data.files[ 0 ].name ) )
				                        .append( $("<td width='10%' align='center'/>").text( bytesTo( data.files[ 0 ].size ) ) )
				                        .append( $("<td width='5%'  align='center'/>").html(  $("<input type='button'/>").val( 'Upload' ).click( function(){
				                        	$(this).css( 'disabled', 'disabled' );
				                        	data.submit();
				                        }) ) )	
				                        .append( $("<td width='5%' align='center'/>").html(  $("<input type='button'/>").val( 'Delete' ).click( function(){
				                        	clear();
				                        }) ) )
				                        .append( $("<td width='10%'/>").html( createProgressBar() ) )
				                        );
			        	} else {
			        		$("#dlgInfoUpload").dialog( 'open' );
			        		$("#dlgInfoUpload").text(' Solamente puedes subir archivos con las siguientes extensiones xls,xlsx ');
			        	}	
			        },
			        done: function ( e, data ){
			        	 clearTblExcel();
			        	 $("#tbExcel").css( 'display', 'block' );
			        	 $.each( data.result, function ( index, sbsCtrl ) {
			        		 $("#tbExcel").append(
			        				 		$("<tr/>")
			        				 		.append( $("<td width='1%' align='center'/>").text( index + 1 )  )
			        				 		.append( $("<td width='10%' align='center'/>").text( sbsCtrl.perICI )  )
			        				 		.append( $("<td width='5%' align='center'/>").text( sbsCtrl.action )  )
			        				 		.append( $("<td width='5%' align='center'/>").text( sbsCtrl.codeEntity )  )
			        				 		.append( $("<td width='10%' align='center'/>").text( sbsCtrl.txtDateFrom )  )
			        				 		.append( $("<td width='10%' align='center'/>").text( sbsCtrl.txtDateTo )  )
			        				 		.append( $("<td width='5%' align='center'/>").text( sbsCtrl.type )  )
			        				 );
			             });
			        },
			        progressall: function ( e, data ) {
			        	  	
			            var progress = parseInt( data.loaded / data.total * 100, 10 );
			            			            
			            $('#progress .bar').css(
			                'width',
			                progress + '%'
			            );
			        }  
			    });
			    
			    
			    $("#btnProcess").click( function( event ){
			    	$("#dlgConfirm").text( "Estas seguro de realizar la siguiente operación?" );
			    	$("#dlgConfirm").dialog("open");
			    	
			    });
			    
			    $("#btnCancel").click( function( event ){
			    	alert("Usted ha presionado cancelar");
			    });
			    
			});
			
			function process(){
				 $.ajax({  
			           type: "POST",  
			           url : "<c:url value='process.htm'/>",
			           success: function( response ) {
			        	   processOK( response );
			           },
			           failed: function( response ){
			        	   processFailed( response );
			           }
			       });
			}
			
			function processOK( response ){
				$( '#dlgConfirm' ).dialog( "close" );
	        	$( '#dlgInfoUpload' ).dialog( "open" );
	        	$( '#dlgInfoUpload' ).text( response );
	        	//Limpiar tabla  
	        	clearTblExcel();
	        	$("#tbExcel").css('display','none');
	        	//Limpiar fileupload
	        	clear();
			}
			function processFailed( response ){
				$( '#dlgInfoUpload' ).dialog( "open" );
	        	$( '#dlgInfoUpload' ).text( response );
			}
			
			function clear(){
				$("#tbUploadFiles tbody tr").remove();
			}
			
			function clearTblExcel(){
				$("#tbExcel tbody tr").remove();
			}
			
			function createProgressBar(){
		    	return $("<div id='progress' class='progress_bar'/>")
		    	       .append("<div style='width: 0%' class='bar'/>");
			}
			
			
			function bytesTo( _bytes) {
			    _sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB' ];
			    
			    if ( _bytes == 0) return 'n/a';
			    
			    var i = parseInt( Math.floor( Math.log( _bytes ) / Math.log( 1024 ) ) );
			    
			    return ( _bytes / Math.pow( 1024, i ) ).toFixed( 1 ) + ' ' + _sizes[ i ];
			}
			
		
			