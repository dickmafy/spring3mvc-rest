package net.codejava.spring.util.equifax;

import java.text.DateFormat;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import net.codejava.spring.wrapper.MensajeValidacionBean;

import org.owasp.esapi.ESAPI;
import org.owasp.esapi.Validator;
import org.owasp.esapi.codecs.OracleCodec;
import org.owasp.esapi.errors.IntrusionException;
import org.owasp.esapi.errors.ValidationException;


public class EsapiUtil {

	public static Validator validador = ESAPI.validator();

	public static Object validar() {

		return (new Object());

	}

	public static boolean esNuloOVacio(String valor) {
		if (valor != null && !valor.equals("")) {
			return false;
		} else {
			return true;
		}

	}

	public static void esNuloOVacioConMsg(String nombreCampo, String valor, boolean opcional, List<MensajeValidacionBean> listaMensajeValidacionBeans) {
		if (esNuloOVacio(valor)) {
			MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
			mensajeValidacionBean.setCampo(nombreCampo);
			mensajeValidacionBean.setMensaje(nombreCampo + ": Requerido");
			listaMensajeValidacionBeans.add(mensajeValidacionBean);
		}

	}

	public static Integer validarEntero(String nombreCampo, String valor, int valorMinimo, int valorMaximo, boolean opcional, List<MensajeValidacionBean> listaMensajeValidacionBeans) {
		if (opcional == false && esNuloOVacio(valor)) {

			MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
			mensajeValidacionBean.setCampo(nombreCampo);
			mensajeValidacionBean.setMensaje(nombreCampo + ": Requerido");
			listaMensajeValidacionBeans.add(mensajeValidacionBean);

		} else {
			try {
				return validador.getValidInteger(nombreCampo, valor, valorMinimo, valorMaximo, opcional);
			} catch (ValidationException e) {
				MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
				mensajeValidacionBean.setCampo(nombreCampo);
				mensajeValidacionBean.setMensaje(nombreCampo + ": Debe ingresar un valor entero entre " + valorMinimo + " y " + valorMaximo);
				listaMensajeValidacionBeans.add(mensajeValidacionBean);

				e.printStackTrace();
			} catch (IntrusionException e) {

				e.printStackTrace();
			}
		}
		return null;

	}

	public static Integer validarEnteroPositivo(String nombreCampo, String valor, boolean opcional, List<MensajeValidacionBean> listaMensajeValidacionBeans) {

		if (opcional == false && esNuloOVacio(valor)) {

			MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
			mensajeValidacionBean.setCampo(nombreCampo);
			mensajeValidacionBean.setMensaje(nombreCampo + ": Requerido");
			listaMensajeValidacionBeans.add(mensajeValidacionBean);

		} else {
			try {
				return validador.getValidInteger(nombreCampo, valor, 0, 999999999, opcional);
			} catch (ValidationException e) {
				MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
				mensajeValidacionBean.setCampo(nombreCampo);
				mensajeValidacionBean.setMensaje(nombreCampo + ": Debe ingresar un valor entero positivo");
				listaMensajeValidacionBeans.add(mensajeValidacionBean);
				e.printStackTrace();
			} catch (IntrusionException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static Double validarDouble(String nombreCampo, String valor, double valorMinimo, double valorMaximo, boolean opcional, List<MensajeValidacionBean> listaMensajeValidacionBeans) {
		if (opcional == false && esNuloOVacio(valor)) {

			MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
			mensajeValidacionBean.setCampo(nombreCampo);
			mensajeValidacionBean.setMensaje(nombreCampo + ": Requerido");
			listaMensajeValidacionBeans.add(mensajeValidacionBean);

		} else {
			try {
				return validador.getValidDouble(nombreCampo, valor, valorMinimo, valorMaximo, opcional);
			} catch (ValidationException e) {
				MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
				mensajeValidacionBean.setCampo(nombreCampo);
				mensajeValidacionBean.setMensaje(nombreCampo + ": Debe ingresar un valor decimal entre " + valorMinimo + " y " + valorMaximo);
				listaMensajeValidacionBeans.add(mensajeValidacionBean);
				e.printStackTrace();
			} catch (IntrusionException e) {
				e.printStackTrace();
			}
		}
		return null;

	}

	public static Double validarDoublePositivo(String nombreCampo, String valor, boolean opcional, List<MensajeValidacionBean> listaMensajeValidacionBeans) {
		if (opcional == false && esNuloOVacio(valor)) {

			MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
			mensajeValidacionBean.setCampo(nombreCampo);
			mensajeValidacionBean.setMensaje(nombreCampo + ": Requerido");
			listaMensajeValidacionBeans.add(mensajeValidacionBean);

		} else {
			try {
				return validador.getValidDouble(nombreCampo, valor, 0, 999999999, opcional);

			} catch (ValidationException e) {
				MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
				mensajeValidacionBean.setCampo(nombreCampo);
				mensajeValidacionBean.setMensaje(nombreCampo + ": Debe ingresar un valor decimal.");
				listaMensajeValidacionBeans.add(mensajeValidacionBean);
				e.printStackTrace();
			} catch (IntrusionException e) {
				e.printStackTrace();
			}
		}
		return null;

	}

	public static Date validarFecha(String nombreCampo, String valor, boolean opcional, List<MensajeValidacionBean> listaMensajeValidacionBeans) {

		DateFormat fechaFormato;
		fechaFormato = new SimpleDateFormat("dd/MM/yyyy");

		if (opcional == false && esNuloOVacio(valor)) {

			MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
			mensajeValidacionBean.setCampo(nombreCampo);
			mensajeValidacionBean.setMensaje(nombreCampo + ": Requerido");
			listaMensajeValidacionBeans.add(mensajeValidacionBean);

		} else {
			try {
				return validador.getValidDate(nombreCampo, valor, fechaFormato, opcional);
			} catch (ValidationException e) {
				MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
				mensajeValidacionBean.setCampo(nombreCampo);
				mensajeValidacionBean.setMensaje(nombreCampo + ": Debe ingresar una fecha.");
				listaMensajeValidacionBeans.add(mensajeValidacionBean);
				e.printStackTrace();
			} catch (IntrusionException e) {
				e.printStackTrace();
			}
		}
		return null;

	}

	public static void validarRangoFechas(String stFecha1, String stFecha2, String nombreCampo1, String nombreCampo2, List<MensajeValidacionBean> listaMensajeValidacionBeans) {

		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

		Date fecha1 = sdf.parse(stFecha1, new ParsePosition(0));
		Date fecha2 = sdf.parse(stFecha2, new ParsePosition(0));

		MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
		mensajeValidacionBean.setCampo(nombreCampo1);

		if (fecha2.before(fecha1)) {
			mensajeValidacionBean.setMensaje(nombreCampo1 + " es mayor a " + nombreCampo2);
			listaMensajeValidacionBeans.add(mensajeValidacionBean);
		} else if (fecha1.equals(fecha2)) {
			mensajeValidacionBean.setMensaje(nombreCampo1 + " es igual a " + nombreCampo2);
			listaMensajeValidacionBeans.add(mensajeValidacionBean);
		}

	}

	public static String validarPorExpresionRegular(String nombreCampo, String valor, String expresionRegular, int longitudMaxima, boolean opcional, List<MensajeValidacionBean> listaMensajeValidacionBeans) {

		if (opcional == false && esNuloOVacio(valor)) {

			MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
			mensajeValidacionBean.setCampo(nombreCampo);
			mensajeValidacionBean.setMensaje(nombreCampo + ": Requerido");
			listaMensajeValidacionBeans.add(mensajeValidacionBean);

		} else {
			try {
				return validador.getValidInput(nombreCampo, valor, expresionRegular, longitudMaxima, opcional);
			} catch (ValidationException e) {
				MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
				mensajeValidacionBean.setCampo(nombreCampo);
				mensajeValidacionBean.setMensaje(nombreCampo + ": formato incorrecto.");
				listaMensajeValidacionBeans.add(mensajeValidacionBean);
				e.printStackTrace();
			} catch (IntrusionException e) {
				e.printStackTrace();
			}
		}
		return null;

	}

	public static void validarComboVacio(String nombreCampo, String valor, boolean opcional, List<MensajeValidacionBean> listaMensajeValidacionBeans) {

		if (opcional == false && (valor == null || valor.equals("-1"))) {

			MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
			mensajeValidacionBean.setCampo(nombreCampo);
			mensajeValidacionBean.setMensaje(nombreCampo + ": Requerido");
			listaMensajeValidacionBeans.add(mensajeValidacionBean);

		}
	}

	public static <T> void validarListaVacia(String nombreCampo, List<T> lista, boolean opcional, List<MensajeValidacionBean> listaMensajeValidacionBeans) {

		if (opcional == false && lista.size() == 0) {

			MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
			mensajeValidacionBean.setCampo(nombreCampo);
			mensajeValidacionBean.setMensaje(nombreCampo + ": Seleccione un elemento de la lista");
			listaMensajeValidacionBeans.add(mensajeValidacionBean);

		}

	}

	public static String ecoderOracle(String valor) {
		return ESAPI.encoder().encodeForSQL(new OracleCodec(), valor);
	}

	public static void validarIdentidad(String nombreCampo, String tipoDcto, String nroDcto, String nombres, boolean opcional, List<MensajeValidacionBean> listaMensajeValidacionBeans) {
		//ValidationEcm validacionecm = new ValidationEcm();

		boolean resultado = true;
		boolean respuestaWsOk = true;
		try {
			//resultado = validacionecm.validarIdentidad(tipoDcto, nroDcto, nombres);
		} catch (Exception e) {
			resultado = false;
			respuestaWsOk = false;
			e.printStackTrace();
		}

		if (opcional == false && !resultado) {

			MensajeValidacionBean mensajeValidacionBean = new MensajeValidacionBean();
			mensajeValidacionBean.setCampo(nombreCampo);
			if (respuestaWsOk) {
				mensajeValidacionBean.setMensaje(nombreCampo + ": No cumple con la validacion");
			} else {
				mensajeValidacionBean.setMensaje(nombreCampo + ": Error con el Web Service de identidad");
			}
			listaMensajeValidacionBeans.add(mensajeValidacionBean);
		}
	}

}
