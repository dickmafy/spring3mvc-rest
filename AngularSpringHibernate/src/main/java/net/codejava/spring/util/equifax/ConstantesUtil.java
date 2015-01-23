package net.codejava.spring.util.equifax;

public class ConstantesUtil {

	//LAYOUT'S
	public static final String LAYOUT_USUARIO = "usuario";
	
	public static final String OPTION_SELECT = "--SELECCIONAR--";

	public static final String RESPUESTA_OK = "OK";
	public static final String RESPUESTA_ERROR_GENERAL = "ERROR";
	public static final String RESPUESTA_ERROR_VALIDACION = "ERROR_VALIDACION";
	public static final String TIPO_MENSAJE_VACIO = "VACIO";
	public static final String TIPO_MENSAJE_INFO = "INFO";
	public static final String TIPO_MENSAJE_WARNING = "WARNING";
	public static final String TIPO_MENSAJE_ERROR = "ERROR";

	public static final String MENSAJE_RESPUESTA_ERROR_GENERAL = "No se pudo completar la operación, Intentelo más tarde.";
	public static final String MENSAJE_RESPUESTA_CORRECTA = "La operación se realizó correctamente.";

	public static final String URL_LOGIN = "/seguridad/cerrar-session.htm";
	public static final String MODELO_RISKMODULE = "00030781";
	public static final String TIPO_SERVICIO_11 = "11";
	public static final String TIPO_SERVICIO_50 = "50";
	public static final String TIPO_SERVICIO_40 = "40";

	public static final String TRAMA_TRANSACCION = "EXPE";
	public static final Integer TRAMA_TAM_TIPO_SERVICIO = 2;
	public static final Integer TRAMA_TAM_USUARIO = 20;
	public static final Integer TRAMA_TAM_CLAVE = 8;
	public static final Integer TRAMA_TAM_LONGITUD = 5;
	public static final Integer TRAMA_TAM_MODELO = 8;
	public static final Integer TRAMA_TAM_CANT_INTEGRANTES = 1;
	public static final Integer TRAMA_TAM_LONG_ENTIDAD = 5;
	public static final Integer TRAMA_TAM_NUM_ENTIDAD = 1;
	public static final Integer TRAMA_TAM_LONG_DATOS_ENTRADA = 5;
	public static final Integer TRAMA_TAM_LONG_DATOS_COMPLEMENTARIOS = 5;
	public static final Integer TRAMA_TAM_LONG_INTEGRANTES = 5;
	public static final Integer TRAMA_TAM_NRO_INTEGRANTES = 1;
	public static final Integer TRAMA_TAM_TIPO_PERSONA = 1;
	public static final Integer TRAMA_TAM_TIPO_DOCUMENTO = 1;
	public static final Integer TRAMA_TAM_NRO_DOCUMENTO = 11;
	public static final Integer TRAMA_TAM_APELLIDO_PATERNO = 30;
	public static final Integer TRAMA_TAM_APELLIDO_MATERNO = 30;
	public static final Integer TRAMA_TAM_NOMBRES = 40;
	public static final Integer TRAMA_TAM_LONG_DATOS_ENTRADA_INTEGRANTES = 5;
	public static final Integer TRAMA_TAM_LONG_DATOS_COMPLMENTARIOS_INTEGRANTES = 5;

	public static final Integer VARIABLE_TAM_NOMBRE = 10;
	public static final Integer VARIABLE_TAM_TIPO = 1;
	public static final Integer VARIABLE_TAM_LONG_VALOR = 3;
	public static final Integer VARIABLE_TAM_LONG_DECIMALES = 2;

	public static final String TIPO_SOLICITANTE_NATURAL = "N";
	public static final String TIPO_SOLICITANTE_JURIDICA = "J";

	public static final String ESTADO_CIVIL_CASADO_SI = "1";
	public static final String SOCIO_MAYORITARIO_SI = "1";

	public static final String ESTADO_PENDIENTE = "P";
	public static final String ESTADO_ACTIVO = "A";
	public static final String ESTADO_INACTIVO = "I";

	public static final String CHAR_SI = "1";
	public static final String CHAR_NO = "0";

	public static final String PLATAFORMA_ORIGEN_wEb = "1";
	public static final String TIPO_PRODUCTO_CONSUMO_ID = "CON";
	public static final String TIPO_PRODUCTO_MICROFINANZAS_ID = "MES";
	public static final String ID_TIPO_DOCUMENTO_DNI = "1";

	public static final String NUEVO_INFORME_EVALUACION = "NC";
	public static final String INFORME_EVALUACION_HISTORICA = "CH";

	public static final String FECHA_DEFECTO = "0";
	public static final String TIPO_DATE_ORACLE = "DATE";
	public static final String PUNTO = ".";
	public static final String ABRE_PARENTESIS = "(";
	public static final String CIERRA_PARENTESIS = ")";
	public static final String COMA = ",";
	public static final String ESPACIO = " ";
	public static final String EXTENSION_TXT = "txt";

	public static final String COMODIN_PRODUCTO = "<TABLE>";
	public static final String COMODIN_PRODUCTO_COLUMNAS = "<COLUMNAS>";
	public static final String PRODUCTO_CREATE_TABLE = "CREATE TABLE " + COMODIN_PRODUCTO + "(" + COMODIN_PRODUCTO_COLUMNAS + ")";

	public static final String COMODIN_TABLA = "<TABLE>";
	public static final String COMODIN_COLUMNA = "<COLUMNA>";
	public static final String COMODIN_TIPO_DATO = "<TIPO_DATO>";
	public static final String COMODIN_LONGITUD = "<LONGITUD>";
	public static final String PRODUCTO_COLUMN_ADD = "ALTER TABLE" + ESPACIO + COMODIN_TABLA + ESPACIO + "ADD" + ESPACIO + COMODIN_COLUMNA + ESPACIO + COMODIN_TIPO_DATO + ESPACIO + COMODIN_LONGITUD;
	public static final String PRODUCTO_COLUMN_UPDATE = "ALTER TABLE" + ESPACIO + COMODIN_TABLA + ESPACIO + "MODIFY" + ESPACIO + COMODIN_COLUMNA + ESPACIO + COMODIN_TIPO_DATO + ESPACIO + COMODIN_LONGITUD;
	public static final String PRODUCTO_COLUMN_DROP = "ALTER TABLE" + ESPACIO + COMODIN_TABLA + ESPACIO + "DROP COLUMN" + ESPACIO + COMODIN_COLUMNA;

	public static final String PREFIJO_ESQUEMA_BD = "ECMC";
	public static final String GUION_BAJO = "_";

	// Datos Generales
	public static final String[] DATOS_GENERALES = { "USURENT", "FECEVAL", "EPLATORIG", "ETIPPROD", "EPROD", "ETIPSOL", "EIPOINMEN", "ETIPCAM", "EFCONSDUP" };

	// Datos Entrada Solicitante Persona Natural
	public static final String[] DATOS_PERSONA_NATURAL = { "ECONYSOL", "ESMONTMEN", "ESGASMENS", "ESMONMSOL", "ESMTOSOL", "ESPLZSOL", "ESTASAINT" };

	// Datos Entrada Solicitante Persona Juridica
	public static final String[] DATOS_PERSONA_JURIDICA = { "ESOCIO", "ESMONTME1", "ESGASMEN1", "ESMONMSO1", "ESMTOSOL1", "ESPLZSOL1", "ESTASAIN1" };

	// Datos Complementarios Solicitante
	public static final String[] DATOS_COMPLEMENTARIOS = { "FECEVAL1", "D19QENTIH" };

	public static final String CONSULTA_LIKE_TODOS = "%";
	public static final String VACIO = "";
	public static final String PAGINA_INICIO = "1";
	public static final String PAGINA_FIN = "10";

	public static final String SERVICIO_11 = "servicio11.json";
	public static final String SERVICIO_93 = "servicio93.json";
	public static final String SERVICIO_40 = "servicio40.json";
	public static final String SERVICIO_50 = "servicio50.json";
	public static final String SERVICIO_ULTIMA_CONSULTA = "servicioUltimaConsulta.json";
	public static final String SERVICIO_TIPO_CAMIBIO = "servicioTipoCambio.json";
	public static final String SERVICIO_OBTENER_MODELO = "obtenerModelo.json";

	public static final Integer CERO = 0;

	public static final String COD_TIPO_PERSONA_NATURAL = "1";
	public static final String COD_TIPO_PERSONA_JURIDICA = "2";

	public static class EstDocumentoMoroso {

		public final static String ESTD_EXP_NVO = "1";
		public final static int ESTD_EXP_PEND = 2;
		public final static int ESTD_EXP_EXP = 3;
		public final static int ESTD_EXP_PROC = 4;
		public final static int ESTD_EXP_RECH = 5;

		public final static String VAL_IDEN_PEND = "1";
		public final static String VAL_IDEN_VAL = "2";
		public final static String VAL_IDEN_MANUAL = "3";
		public final static String VAL_IDEN_ERRADO = "4";

		public final static String TIPO_MOV_ING = "1";
		public final static int TIPO_MOV_MOD = 2;
		public final static int TIPO_MOV_ELI = 3;
		public final static int TIPO_MOV_CAN = 4;

		public final static String ESTD_CANCEL_NO_CANC = "1";
		public final static int ESTD_CANCEL_CAN = 2;

		public final static String ESTD_REGISTRO_VIG = "V";
		public final static String ESTD_REGISTRO_ELIM = "E";

		public final static String TIPO_ING_DOC_WEB = "1";
		public final static String TIPO_ING_DOC_ARCH = "2";
		public final static String TIPO_ING_DOC_FTP = "3";

		public final static String VALIDACION_IDENTIDAD = "VALIDACION_IDENTIDAD";
		public final static String N_VALID_IDENT = "N_VALID_IDENT";

	}

}
