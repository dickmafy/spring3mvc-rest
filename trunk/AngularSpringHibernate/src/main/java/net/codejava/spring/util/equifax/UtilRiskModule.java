package net.codejava.spring.util.equifax;



public class UtilRiskModule {

	
	/**
	 * Función que elimina acentos y caracteres especiales de
	 * una cadena de texto.
	 * @param input
	 * @return cadena de texto limpia de acentos y caracteres especiales.
	 */
	public static String eliminarCaracteresEspeciales(String input) {
		
		// Cadena de caracteres original a sustituir.
	    String original = "áàäéèëíìïóòöúùuñ�?ÀÄÉÈË�?Ì�?ÓÒÖÚÙÜÑçÇ";
	    // Cadena de caracteres ASCII que reemplazarán los originales.
	    String ascii = "aaaeeeiiiooouuunAAAEEEIIIOOOUUUNcC";
	    String output = input;
	    for (int i=0; i<original.length(); i++) {
	        // Reemplazamos los caracteres especiales.
	        output = output.replace(original.charAt(i), ascii.charAt(i));
	    }
	    return output;
	}
	
	
}
