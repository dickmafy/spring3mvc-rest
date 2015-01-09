function loadDiv(url, div, type) {
	if (isValid(url)  
			&& isValid(div) 
			&& isValid(type)) {
	
		var _div = completeId(div);
		
		if (type.toLowerCase() == "s") {
			$.get(url).done(function(data){
				$(_div).removeClass('loading');
				$(_div).addClass('ready');
				$(_div).append(data);
			})
			.fail(function(){
				// TODO Manejar excepcion
				$(_div).append(data);
			});
		} else if (type.toLowerCase() == "n") {
			location.replace(url);
		}
	}
}

function loadDiv(url, div, type, time) {
	if (isValid(url)  
			&& isValid(div) 
			&& isValid(type)) {
	
		var _div = completeId(div);
		
		if (type.toLowerCase() == "s") {
			setTimeout(function(){
				$.get(url).done(function(data){
					$(_div).removeClass('loading');
					$(_div).addClass('ready');
					$(_div).append(data);
				})
				.fail(function(){
					// TODO Manejar excepcion
				});
			}, time);
		} else if (type.toLowerCase() == "n") {
			location.replace(url);
		}
	}
}

function loadForm(_form, _div, _type) {
	if (isValid(_form)) {
		var _data = readForm(_form);
		_form = completeId(_form);
		var _method = $(_form).attr('method');
		var _url = $(_form).attr('action');
		
		if (typeof _type === 'undefined') {
			_type = 's';
		}
		
		if (_type.toLowerCase() == "s") {
			if(idValid(_div)) {
				_div = completeId(_div);
				$(_div).addClass('loading');
				$.ajax({
					type: _method,
					url : _url,
					data : _data,
					cache : false
				})
				.done(function(data){
					$(_div).removeClass('loading');
					$(_div).addClass('ready');
					$(_div).empty();
					$(_div).append(data);
				})
				.fail(function(){
					$(_div).removeClass('loading');
					$(_div).addClass('ready');
					$(_div).empty();
					$(_div).append('<span>Informacion no disponible</span>');
				});
			}
		} else if (type.toLowerCase() == "n") {
			$(_form).submit();
		}
	}
}

function loadHelp( _url, _divPg, _divPgLoader ){
	
	_divPg       = completeId( _divPg );
	_divPgLoader = completeId( _divPgLoader );
	
	$(_divPgLoader).css('display','block');
	$(_divPg).css('display','none');
	
	if( isValid( _url ) ) {
		$.ajax({
			type:"GET",
			url : _url,
			cache:false
		}).done( function( data ){
			$( _divPgLoader ).css( 'display','none' );
			$( _divPg ).css( 'display', 'block' );
			$( _divPg ).empty();
			$( _divPg ).append( data );
		}).fail( function( data ){
			$( _divPgLoader ).css( 'display','none' );
			$( _divPg ).css( 'display', 'block' );
			$( _divPg ).empty();
			$( _divPg ).append('<span>Informacion no disponible</span>');
		});
	}
	
}



function loadContentPaging( _url, _divPg, _divPgLoader ){
	if( isValid( _url ) ) {
		_divPg = completeId( _divPg );
		_divPgLoader = completeId( _divPgLoader );
		$.ajax({
			type:"POST",
			url : _url,
			cache:false
		}).done( function( data ){
			$( _divPgLoader ).css( 'display','none' );
			$( _divPg ).css( 'display', 'block' );
			$( _divPg ).empty();
			$( _divPg ).append( data );
		}).fail( function( data ){
			$( _divPgLoader ).css( 'display','none' );
			$( _divPg ).css( 'display', 'block' );
			$( _divPg ).empty();
			$( _divPg ).append('<span>Informacion no disponible</span>');
		});
	}
}


function loadContent(_url, _div, _type, _time) {
	if(isValid(_url) && isValid(_div)) {
		
		_div = completeId(_div);
		
		if (typeof _type === 'undefined') {
			_type = 's';
		}
		
		if (typeof _time === 'undefined') {
			_time = 0;
		} else {
			if(isNaN(_time)) {
				_time = 1000;
			}
		}
		
		if (_type.toLowerCase() == "s") {
			setTimeout(function(){
				$.ajax({
					type: "GET",
					url: _url,
					cache: false
				}).done(function(data){
					$(_div).removeClass('loading');
					$(_div).addClass('ready');
					$(_div).empty();
					$(_div).append(data);
				}).fail(function(){
					$(_div).removeClass('loading');
					$(_div).addClass('ready');
					$(_div).empty();
					$(_div).append('<span>Informacion no disponible</span>');
				});
			}, _time);
		} else {
			location.replace(_url);
		}
	}
}

function loadComponent(_url, _div) {
	if (isValid(_url) && isValid(_div)) {
		var _prod = $('#prod').val();
		var _type = $('#type').val();
		var _params = getUrlParams(_url);
		var _data = "";
		_url = removeUrlParams(_url);
		_div = completeId(_div);
		var _mod = $(_div).children('#mod').val();
		
		if (_params.length > 0) {
			_params.push('idProd');
			_params['idProd'] = _prod;
			_params.push('idMod');
			_params['idMod'] = _mod;
			_params.push('tipo');
			_params['tipo'] = _type;
		} else {
			_params[0] = 'idProd';
			_params[_params[0]] = _prod;
			_params[1] = 'idMod';
			_params[_params[1]] = _mod;
			_params[2] = 'tipo';
			_params[_params[2]] = _type;
		}
		
		for(var i = 0; i < _params.length; i++) {
			_data += _params[i] + '=' 
						+ _params[_params[i]] + '&';
		}
		_data = _data.substring(0,(_data.length-1));
		$.ajax({
			type: "POST",
			url: _url,
			data: _data,
			cache: false
		}).done(function(data) {
			$(_div).removeClass('loading');
			$(_div).addClass('ready');
			$(_div).empty();
			$(_div).append(data);
		}).fail(function() {
			$(_div).removeClass('loading');
			$(_div).addClass('ready');
			$(_div).empty();
			$(_div).append('<span>Informacion no disponible</span>');
		});
	}
}

function doSearchCNG(_form) {
	_form = completeId(_form);
	$.ajax({
		type: $(_form).attr('method'),
		url: $(_form).attr('action'),
		data: $(_form).serialize(),
		cache: false
	}).done(function(data){
		if (data.substring(0,2) == "M:"){
			$('#message').text(data.substring(2));
		} else {
			location.assign(data);
		}
	}).fail(function(){
		$('#message').text("Busqueda fallida");
	});
}

function doUpdatePass(_form) {
	_form = completeId(_form);
	$.ajax({
		type: $(_form).attr('method'),
		url: $(_form).attr('action'),
		data: $(_form).serialize(),
		cache: false
	}).done(function(data){
		if (data.substring(0,2) == "E:"){
			$('#message').text(data.substring(2));
		} else {
			$("#dlgContrasena").text(data);
			$("#dlgContrasena").dialog("open");
		}
	}).fail(function(){
		$('#message').text("Actualizacion fallida");
	});
}

function slideDiv(_a, _div) {
	_a = completeId(_a);
	_div = completeId(_div);
	$(_a).click(function(){
		$(_div).slideToggle(function(){
				
			if( $('#icon').attr('class') == 'slide_open' ){
				$('#icon', _a).removeClass('slide_open').addClass('slide_close');
				$( _div ).css( 'display', 'none' );
		    } else{
		    	$('#icon', _a).removeClass('slide_close').addClass('slide_open');
		    	$( _div ).css( 'display', 'block' );
		    }
		});
		return false;
	});
}

function linkDialog(_a, _div) {
	_a = completeId(_a);
	_div = completeId(_div);
	$(_a).click(function(){
		$(_div).dialog("open");
		return false;
	});
}

/*
 * Funcion para buscar textos en el menu de ayuda
 */
function findMatches( _txt, _container ){
	_container = completeId(_container);
	
	if( $.trim( _txt ).length > 0 ){
		$(_container).removeHighlight('helptree-highlight').
					  highlight( _txt,'helptree-highlight' );
		
		$(_container).treeview({ action : 'expandable' });
		
	}else{
		$(_container).removeHighlight('helptree-highlight');
		//$(_container).treeview({ action : 'collapsable' });
	}
	
	return false;
}


function onIdleDialog(_div) {
	_div = completeId(_div);
	$( _div ).dialog({
    	autoOpen: false,
		modal: true,
		draggable: false,
		closeOnEscape: false,
		height: 140,
		width: 400,
		resizable: false,
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );
				location.replace('index.htm');
			}
		},
		open: function() {
			$('.ui-dialog-titlebar-close').css("visibility","hidden");
		},
		close: function() {
			location.replace('/');
		}
	});
}

function listDialog(_div, _height, _width) {
	_div = completeId(_div);
	$(_div).dialog({
		autoOpen: false, 
		draggable: false,
		resizable: false,
		modal: true,
		height: _height,
		width: _width,
		open: function() {
			$('.ui-dialog-titlebar-close').css("visibility","visible");
		},
		close: function() {
			$('.ui-dialog-titlebar-close').css("visibility","hidden");
		}
	});
}


function getUrlParams(url)
{
    var vars = [], hash;
    var index = url.indexOf('?');
    
    if (index >= 0) {
    	var hashes = url.slice(index + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
    }
    return vars;
}

function removeUrlParams(url) {
	var index = url.indexOf('?');
	if (index >= 0) {
		return url.substring(0,index);
	}
	return url;
}

function readForm(form) {
	var data = '';
	if (form != null && form.length > 0){
		data = $(completeId(form)).serialize();
	}
	return data;
}

function isValid(param) {
	if (param != null 
			&& param.length > 0) {
		return true;
	}
	return false;
}

function completeId(id) {
	return "#" + id;
}

function validateDocument(_doc, _type) {
	if (_type == "6" && _doc.length != 11) {
		return false;
	}
	if (_type == "9" && _doc.length != 8) {
		return false;
	}
	var regex = new RegExp("^[0-9]+$");
	if (!regex.test(_doc)) {
		return false;
	}
	return true;
}

function validateInteger(_digits) {
	var regex = new RegExp("^[0-9]+$");
	if (!regex.test(_digits)) {
		return false;
	}
	return true;
}

function validateDigits(_digits) {
	_digits = $.trim(_digits);
	if (_digits.length > 0) {
		if (!isNaN(_digits)) {
			return true;
		}
	}
	return false;
}

function allowLetters(event) {
    if ( isFunctionKey(event)) {
        return;
    } else {
        if (event.keyCode < 65 || event.keyCode > 90) {
                event.preventDefault(); 
        } 
    }
}

function allowNumbers(event) {
	
    if ( isFunctionKey(event)) {
        return;
    } else {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) 
            && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
        }   
    }
}

function allowLettersAndNumbers(event) {
	
    if ( isFunctionKey(event)) {
        return;
    } else {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 90)
        		&& (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault(); 
        }   
    }
}

function isFunctionKey(event) {
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 
        || event.keyCode == 27 || event.keyCode == 13 
        || (event.keyCode == 65 && event.ctrlKey === true)
        || (event.keyCode == 67 && event.ctrlKey === true)
        || (event.keyCode == 86 && event.ctrlKey === true)
        || (event.keyCode == 88 && event.ctrlKey === true)
        || (event.keyCode >= 35 && event.keyCode <= 39)) {        
        return true;
    }
}

function isRepeated(value, array, n) {
    var cant = 0;
    for (var i = 0; i < array.length; ++i) {
        if (array[i] == value) {
            cant++;        
        };
    }
    if (cant >= n) {
        return true;
    }
    return false;
}

function isNumber(value) {
    var regex =/\d/;
    if (regex.test(value)) {
        return true;
    } 
    return false;
}

function trim(string) {
	return string.replace(/^\s+|\s+$/g, '');
}

function searchInTable(table, value, trClass, tdClass) {
    
    if (typeof trClass === 'undefined') {
        trClass = '';
    }
    
    if (typeof tdClass === 'undefined') {
        tdClass = '';
    }
    if (tdClass.length != 0) {
        tdClass = '.' + tdClass;
    }
    tdClass = 'td' + tdClass;
    
    // each tr
    table = '#' + table;
    $(table).find('tr').each(function(i, row){
        var _columns = $(row).find(tdClass);
        if (_columns.length > 0) {
            var _tdFound = false;
            // each td
            _columns.each(function(i, col) {
                var regex = new RegExp(value, 'i');
                if (regex.test($(col).text())) {
                    _tdFound = true;
                    return false;
                }
            });
            
            if (trClass.length == 0) {
                if(_tdFound) {
                    $(row).show();
                } else {
                    $(row).hide();
                }
            } else {
                var _class = $(row).attr('class');
                if (_class == trClass) {
                    if(_tdFound) {
                        $(row).show();
                    } else {
                        $(row).hide();
                    }
                } else {
                    $(row).hide();
                }
            }
        }
    });
}

/**
 * Vaida fechas formato dd/mm/yyyy
 * @param val             fecha a validar
 * @returns {Boolean}     true si la fecha es correcta ,false en caso contrario
 */
function isDate( val ){
	  
	var currVal = val;
	  
	  if( currVal == '' )
	    return false;
	   
	  //Declare Regex 
	  var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; 
	  var dtArray = currVal.match( rxDatePattern );
	 
	  if (dtArray == null)
	     return false;
	  
	  dtDay= dtArray[ 1 ];
	  dtMonth = dtArray[ 3 ];
	  dtYear = dtArray[ 5 ];
	  
	  if ( dtDay < 1 || dtDay> 31 ){
	      return false;
	  }
	  else if ( dtMonth < 1 || dtMonth > 12 ){
	      return false;
	  }
	  else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31){
	      return false;
	  }
	  else if (dtMonth == 2){
	     var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
	     if (dtDay> 29 || (dtDay ==29 && !isleap))
	          return false;
  	  }
	  
	  return true;
	}


function isDateLessThan( val1, val2 ){
	  
	 var currVal1 = val1;
	 var currVal2 = val2;
	   
	  //Declare Regex 
	  var rxDatePattern1 = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; 
	  var dtArray1 = currVal1.match( rxDatePattern1 );
	 
	  var rxDatePattern2 = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; 
	  var dtArray2 = currVal2.match( rxDatePattern2 );
	  
	  dtDay   = dtArray1[ 1 ];
	  dtMonth = dtArray1[ 3 ];
	  dtYear  = dtArray1[ 5 ];
	  
	  var aux1 = dtYear+""+dtMonth+""+dtDay;
	  
	  dtDay   = dtArray2[ 1 ];
	  dtMonth = dtArray2[ 3 ];
	  dtYear  = dtArray2[ 5 ];
	  
	  var aux2 = dtYear+""+dtMonth+""+dtDay;
	  
	  return  aux1 <= aux2; 
	}
