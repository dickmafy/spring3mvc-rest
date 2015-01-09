
/**
     * Metodo que se encarga  de paginar los registros de una tabla
     * @param n    Cantidad de registros a mostrar x pagina
     */
	 var fw_pos   = 0;
     var back_pos = 0;
     var max_show_links = 0;
     var limitIni = 0;
     var limitFin = 0;
     var rowsXData = 1;
     
     /**
      * 
      * @param n numero de registros a mostrar por pagina
      */
     function paginacion(){	
    	 if ( arguments.length == 2 ){
    		 return( paginacion.twoParams.apply( this, arguments ) );
    	 }else {
    		return( paginacion.oneParams.apply( this, arguments ) );
    	 }
     }
     
     var defaultConfig = { container:'.tabla_pg',
    		 			   items:0,
    		 			   prev : 'Anterior',
    		 			   next : 'Siguiente',
    		 			   last : '>>',
    		 			   first: '<<',
    		 			   nav_items: 10
    		 			  };
     
     
     function paginacionList(){
    	 doPagination( n, nElements );
     }
     
     paginacion.oneParams = function( n ){
    	 return( paginacion.twoParams( n, 0 ) );
     };
  
     paginacion.twoParams = function( n, nElements ){
    	 doPagination( n, nElements  );
     };
 
    /**
     * 
     * @param n       numero de registros a mostrar por pagina
     * @param nLinks  numero maximo de links a mostrar
     */ 
     function doPagination( n,nElements ){
    	//10 Links por defecto
    	max_show_links  = 10;
    	limitIni  = 0;
    	limitFin  = max_show_links - 1;
    	
    	tb_head = $('.tabla_pg').children('thead');
    	tb_body = $('.tabla_pg').children('tbody');
    	
        numberOfElements = tb_body.children('tr').length;
        num_per_page = parseInt( n );
        
        if( nElements == 0 ){
        	number_of_items = tb_body.children('tr').length;
        } else {
        	number_of_items = nElements;
        }
        
        num_per_page =  parseInt( n );
        
        number_of_pages = Math.ceil( numberOfElements/num_per_page );
        
        /*
         * Dibuja la barra de paginación si existen mas de 1 registro
         */
        if( number_of_pages > 1 ){
        	/*
        	 * Si el numero de paginas calculadas es menor( number_of_pages ) a la cantidad de links a mostrar( max_show_links )
        	 * este último obtiene el valor del numero de paginas calculadas
        	 */
	        if( number_of_pages < max_show_links ){
	    		max_show_links = number_of_pages;
	    	}
	        
	        $('#tb_pg_page').val( 0 );  
	        $('#tb_pg_range').val( num_per_page );  
	    
	        var navigation_html = '<a class="pag_prev" href="javascript:first();"><<</a>';  
	        navigation_html += '<a class="pag_prev" href="javascript:previous();">Anterior</a>';
	        
	        var current_link = 0;
	        
	        while( current_link < max_show_links ){
	        	navigation_html += '<a class="pag_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>'; 
	        	current_link++;  
	        }
	        
	        navigation_html += '<a class="pag_next" href="javascript:next();">Siguiente</a>';  
	        navigation_html += '<a class="pag_next" href="javascript:last();">>></a>';
	  
	        $('#tb_pg_nav').html(navigation_html);
	        $('#tb_pg_nav .pag_link:first').addClass('pag_act');
	        
	        tb_body.children('tr').slice( 0,numberOfElements ).css('display', 'none'); 
	        tb_body.children('tr').slice( 0,parseInt( num_per_page )).css('display', 'block');
	        tb_head.children('tr').css('display', 'block');
        }
    }

    /**
     * muestra la primera pagina
     */
     function first(){
    	pg_page = parseInt( $('#tb_pg_page').val() );
    	
    	limitIni = 0;
    	limitFin = max_show_links - 1;
    	
    	repaint_tb_pg_nav( limitIni, limitFin );
    	
    	go_to_page( 0 );
    }
    /**
     * muestra la ultima pagina
     */
     function last(){
    	
    	limitFin = Math.ceil( number_of_items / num_per_page ) - 1;
    	limitIni = ( limitFin - max_show_links ) + 1;
    	repaint_tb_pg_nav( limitIni, limitFin );
    	go_to_page( limitFin ); 
         
    }
    /**
     * muestra la pagina anterior
     */
     function previous(){  
	    pg_page = parseInt( $('#tb_pg_page').val() );
	    
	    prev_ = pg_page - 1;
	    
	    if( prev_ <= limitIni && prev_ >= 0 ){
	    	limitIni = prev_;
	    	limitFin = ( prev_ + max_show_links) - 1;	
	    	repaint_tb_pg_nav( limitIni, limitFin ); 
	    }	    
	    
	    if( prev_ >= 0 ){
	    	go_to_page( prev_ ); 
	    }

	}
    /**
     * muestra la sgte pagina
     */
     function next(){  
        pg_page = parseInt( $('#tb_pg_page').val() );
        
        next_ = pg_page + 1;
        
        if( next_ > limitFin && next_ <=  ( Math.ceil( number_of_items/num_per_page ) - 1 ) ){
        	limitFin = next_;
	    	limitIni = ( next_ - max_show_links) + 1 ;
	    	repaint_tb_pg_nav( limitIni, limitFin );
        } 
        
        if( $('.pag_act').next('.pag_link').length == true ){
        	go_to_page( next_ );
        }
    }

    /**
     * Repaint para de la barra de paginacion 
     * @param start   pagina de inicio
     * @param end     pagina final
     * @param pag     pagina actual
     */
     function repaint_tb_pg_nav( start, end ){
    	
    	navigation_html = '<a class="pag_prev" href="javascript:first();"><<</a>';  
        navigation_html += '<a class="pag_prev" href="javascript:previous();">Anterior</a>';
         
    	for( var i = start;i <= end; i++ ){
    		navigation_html += '<a class="pag_link" href="javascript:go_to_page(' + i +')" longdesc="' + i +'">'+ ( i+1 ) +'</a>';
    	}
    	
    	navigation_html += '<a class="pag_next" href="javascript:next();">Siguiente</a>';  
    	navigation_html += '<a class="pag_next" href="javascript:last();">>></a>';
   
         $( '#tb_pg_nav' ).html( navigation_html );
         $( '#tb_pg_nav .pag_link:first' ).addClass( 'pag_act' );
    }
    /**
     * redirecciona ala pagina solicitada
     * @param page_num
     */
    function go_to_page( page_num ){  
         var num_per_page = parseInt( $('#tb_pg_range').val() );
         
         start_from = page_num * num_per_page; 
         end_on = start_from + num_per_page;

         tb_body.children( 'tr' ).slice( 0, number_of_items ).css('display', 'none'); 
         tb_head.children( 'tr' ).slice( 0, 1 ).css('display', 'block'); 
         tb_body.children(' tr' ).slice( start_from, end_on).css('display', 'block');
        
        $('.pag_link[longdesc=' + page_num +']').addClass( 'pag_act' ).siblings( '.pag_act' ).removeClass( 'pag_act' );  
  
        $('#tb_pg_page').val(page_num);  
    }