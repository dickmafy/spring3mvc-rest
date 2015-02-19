package net.codejava.spring.controller;

import net.codejava.spring.dao.UserDAO;
import net.codejava.spring.generic.AbstractHibernateDao;
import net.codejava.spring.model.Usuario;
import net.codejava.spring.util.equifax.ConstantesUtil;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.annotation.PostConstruct;

@Controller
@RequestMapping("/usuario")
public class UsuarioController extends AbstractHibernateDao<Usuario> {

	private static Logger	LOG	= Logger.getLogger(UsuarioController.class);

	@Autowired
	private UserDAO			dao;

	@Autowired
	SessionFactory			sessionFactory;

	@PostConstruct
	public void init() {
		LOG.info("UsuarioController");
	}

	@RequestMapping(value = "/list.json", method = RequestMethod.GET)
	public @ResponseBody
	List<Usuario> listUsuario() {
		return dao.list();
	}

	@RequestMapping("/layout")
	public String getTodoPartialPage() {
		return ConstantesUtil.LAYOUT_USUARIO + "/layout";
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public @ResponseBody
	void insertUsuario(@RequestBody Usuario bean) {
		save(bean);
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	void deleteUsuario(@RequestBody Usuario bean) {
		delete(bean);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public @ResponseBody
	void updateUsuario(@RequestBody Usuario bean) {
		update(bean);
	}

	/*
	 * public SessionFactory getSessionFactory() { return sessionFactory; }
	 * 
	 * public void setSessionFactory(SessionFactory sessionFactory) {
	 * this.sessionFactory = sessionFactory; }
	 */
	/*
	 * @RequestMapping(value = "/update/{pos}", method = RequestMethod.PUT)
	 * public @ResponseBody void updateAddressBook(@RequestBody AddressBook
	 * addressBook, @PathVariable("pos") String pos){
	 * bookService.updateAddressBook(Integer.valueOf(pos), addressBook); }
	 * 
	 * @RequestMapping(value="/delete/all", method = RequestMethod.DELETE)
	 * public @ResponseBody void deleteAllAddressBook(){
	 * bookService.deleteAllAddressBook(); }
	 */

	/*
	 * @RequestMapping(value =
	 * "/mantenimiento/producto/mantenimiento-productos.htm", method =
	 * {RequestMethod.POST,RequestMethod.GET}) public String
	 * irMantenimientoProducto(){
	 * log.info("ProductoController.irMantenimientoProducto");
	 * 
	 * return "mantenimientoProducto"; }
	 * 
	 * @RequestMapping(value = "/mantenimiento/producto/registrar-producto.htm",
	 * method = {RequestMethod.POST,RequestMethod.GET}) public String
	 * irRegistrarProducto(){
	 * log.info("ProductoController.irRegistrarProducto");
	 * 
	 * return "registrarProducto"; }
	 * 
	 * @RequestMapping(value = "/mantenimiento/producto/editar-producto.htm",
	 * method = {RequestMethod.POST,RequestMethod.GET}) public String
	 * editarProducto(Model model, @RequestParam String codigoProducto){
	 * log.info("ProductoController.editarProducto.htm");
	 * model.addAttribute("codigoProducto", codigoProducto);
	 * 
	 * return "editarProducto"; }
	 * 
	 * 
	 * @RequestMapping(value = "/mantenimiento/producto/get-position.json",
	 * method = RequestMethod.GET,produces="application/json") public
	 * @ResponseBody ResponseObjectBean<String> getPosicion(@RequestParam String
	 * codigoProducto){
	 * 
	 * 
	 * ResponseObjectBean<String> response = new ResponseObjectBean<String>();
	 * 
	 * Integer ordenMaximo =
	 * productoColumBUS.obtenerMaximoProductosColumn(Integer
	 * .valueOf(codigoProducto)) + 1;
	 * 
	 * response.setObjeto(String.valueOf(ordenMaximo));
	 * 
	 * return response; }
	 * 
	 * 
	 * @RequestMapping(value =
	 * "/mantenimiento/producto/get-editar-producto.json", method =
	 * RequestMethod.GET,produces="application/json") public @ResponseBody
	 * ResponseObjectBean<Producto> getEditarProducto(@RequestParam String
	 * codigoProducto){ log.info("ProductoController.get-editar-producto");
	 * ResponseObjectBean<Producto> response = new
	 * ResponseObjectBean<Producto>();
	 * 
	 * Producto producto = new Producto();
	 * producto.setCodigo(Integer.valueOf(codigoProducto)); try { producto =
	 * productoBUS.obtenerProducto(producto);
	 * 
	 * producto.setNombreArchivoSalida(FilenameUtils.getBaseName(producto.
	 * getNombreArchivoSalida()));
	 * 
	 * response.setObjeto(producto);
	 * 
	 * response.setRespuesta(ConstantesUtil.RESPUESTA_OK); } catch
	 * (EquifaxBusinessException e) {
	 * response.setRespuesta(ConstantesUtil.RESPUESTA_ERROR_VALIDACION);
	 * response.setTipoMensaje(ConstantesUtil.TIPO_MENSAJE_ERROR);
	 * response.setMensaje(e.getMessage()); }
	 * 
	 * 
	 * return response; }
	 * 
	 * @RequestMapping(value = "/mantenimiento/producto/listar-producto.json",
	 * method = RequestMethod.POST,produces="application/json") public
	 * @ResponseBody ResponseListBean<Producto> listarProducto(
	 * 
	 * @RequestParam(value = "bnombrePrd", defaultValue = ConstantesUtil.VACIO)
	 * String nombre,
	 * 
	 * @RequestParam(value = "bnombrePrdTbl", defaultValue =
	 * ConstantesUtil.VACIO) String nombreTabla,
	 * 
	 * @RequestParam(value = "bestadoPrd", defaultValue = ConstantesUtil.VACIO)
	 * String estado,
	 * 
	 * @RequestParam(value = "page", defaultValue =
	 * ConstantesUtil.PAGINA_INICIO) Integer pagina,
	 * 
	 * @RequestParam(value = "rows", defaultValue = ConstantesUtil.PAGINA_FIN)
	 * Integer registros){
	 * 
	 * log.info("inicio ProductoController.listarProducto"); //TODO: Obtener
	 * valor de empresa en session int codigoEmpresa = 1;
	 * 
	 * 
	 * ResponseListBean<Producto> response = new ResponseListBean<>();
	 * 
	 * Producto producto = new Producto(); //TODO: Poner valor de empresa
	 * producto.setCodigoEmpresa(codigoEmpresa);
	 * producto.setDescripcion(nombre.equalsIgnoreCase
	 * (ConstantesUtil.VACIO)?ConstantesUtil.CONSULTA_LIKE_TODOS:nombre);
	 * producto
	 * .setNombreTabla(nombreTabla.equalsIgnoreCase(ConstantesUtil.VACIO)
	 * ?ConstantesUtil.CONSULTA_LIKE_TODOS:nombreTabla);
	 * producto.setEstado(estado
	 * .equalsIgnoreCase(ConstantesUtil.VACIO)?ConstantesUtil
	 * .CONSULTA_LIKE_TODOS:estado);
	 * 
	 * 
	 * Integer totalRegistros = productoBUS.obtenerCantidadProductos(producto);
	 * 
	 * response.setPage(pagina); response.setRecords(totalRegistros);
	 * response.setTotal(OperadoresUtil.obtenerCociente(totalRegistros,
	 * registros));
	 * response.setRows(productoBUS.buscarProductosPaginado(producto, pagina,
	 * registros));
	 * 
	 * return response; }
	 * 
	 * @RequestMapping(value =
	 * "/mantenimiento/producto/listar-columnas-producto.json", method =
	 * RequestMethod.POST,produces="application/json") public @ResponseBody
	 * ResponseListBean<ProductoColumBean> listarColumnaxProducto(
	 * 
	 * @RequestParam(value = "codigoProducto", defaultValue =
	 * ConstantesUtil.VACIO) Integer codigoProducto,
	 * 
	 * @RequestParam(value = "esLlave", defaultValue = ConstantesUtil.VACIO)
	 * String esLlave,
	 * 
	 * @RequestParam(value = "esOblig", defaultValue = ConstantesUtil.VACIO)
	 * String esOblig,
	 * 
	 * @RequestParam(value = "esColumnSal", defaultValue = ConstantesUtil.VACIO)
	 * String esColumnSal,
	 * 
	 * @RequestParam(value = "esColumnEdit", defaultValue =
	 * ConstantesUtil.VACIO) String esColumnEdit,
	 * 
	 * @RequestParam(value = "estado", defaultValue = ConstantesUtil.VACIO)
	 * String estado,
	 * 
	 * @RequestParam(value = "page", defaultValue =
	 * ConstantesUtil.PAGINA_INICIO) Integer pagina,
	 * 
	 * @RequestParam(value = "rows", defaultValue = ConstantesUtil.PAGINA_FIN)
	 * Integer registros){
	 * 
	 * log.info("inicio ProductoController.listarColumnaxProducto");
	 * 
	 * 
	 * ResponseListBean<ProductoColumBean> response = new ResponseListBean<>();
	 * 
	 * ProductoColumBean productoColumBean = new ProductoColumBean();
	 * productoColumBean.setCodigoProducto(codigoProducto);
	 * productoColumBean.setEsLlave(esLlave);
	 * productoColumBean.setEsObligatorio(esOblig);
	 * productoColumBean.setEsColumnaSalida(esColumnSal);
	 * productoColumBean.setColumnaEditable(esColumnEdit);
	 * productoColumBean.setEstado(estado);
	 * 
	 * List<ProductoColumBean> columBeans =
	 * productoColumBUS.buscarColumnasxProducto(productoColumBean); Integer
	 * totalRegistros = columBeans.size(); response.setPage(pagina);
	 * response.setRecords(totalRegistros);
	 * response.setTotal(OperadoresUtil.obtenerCociente(totalRegistros,
	 * registros));
	 * 
	 * response.setRows(productoColumBUS.buscarProductoColumnPaginado(
	 * productoColumBean, pagina, registros));
	 * 
	 * return response; }
	 * 
	 * 
	 * @RequestMapping(value =
	 * "/mantenimiento/producto/listar-columnas-producto2.json", method =
	 * RequestMethod.POST,produces="application/json") public @ResponseBody
	 * ResponseListBean<ProductoColumBean> listarColumnaXProducto2(
	 * 
	 * @RequestParam(value = "codigoProducto", defaultValue =
	 * ConstantesUtil.VACIO) Integer codigoProducto,
	 * 
	 * @RequestParam(value = "esLlave", defaultValue = ConstantesUtil.VACIO)
	 * String esLlave,
	 * 
	 * @RequestParam(value = "esOblig", defaultValue = ConstantesUtil.VACIO)
	 * String esOblig,
	 * 
	 * @RequestParam(value = "esColumnSal", defaultValue = ConstantesUtil.VACIO)
	 * String esColumnSal,
	 * 
	 * @RequestParam(value = "esColumnEdit", defaultValue =
	 * ConstantesUtil.VACIO) String esColumnEdit,
	 * 
	 * @RequestParam(value = "estado", defaultValue = ConstantesUtil.VACIO)
	 * String estado){
	 * 
	 * log.info("inicio ProductoController.listar-columnas-producto2");
	 * 
	 * 
	 * ResponseListBean<ProductoColumBean> response = new ResponseListBean<>();
	 * 
	 * ProductoColumBean productoColumBean = new ProductoColumBean();
	 * productoColumBean.setCodigoProducto(codigoProducto);
	 * productoColumBean.setEsLlave(esLlave);
	 * productoColumBean.setEsObligatorio(esOblig);
	 * productoColumBean.setEsColumnaSalida(esColumnSal);
	 * productoColumBean.setColumnaEditable(esColumnEdit);
	 * productoColumBean.setEstado(estado);
	 * 
	 * response.setRows(productoColumBUS.buscarColumnasxProducto(productoColumBean
	 * ));
	 * 
	 * return response; }
	 * 
	 * @RequestMapping(value = "/mantenimiento/producto/guardar-producto.json",
	 * method = RequestMethod.POST,produces="application/json") public
	 * @ResponseBody ResponseObjectBean<String> guardarProducto(
	 * 
	 * @RequestParam(value = "nombreProd", defaultValue = "") String nombreProd,
	 * 
	 * @RequestParam(value = "nombreTbl", defaultValue = "") String nombreTbl,
	 * 
	 * @RequestParam(value = "nombreArchSalida", defaultValue = "") String
	 * nombreArchSalida,
	 * 
	 * @RequestParam(value = "estadoProductoReg", defaultValue = "") String
	 * estadoProductoReg) throws EquifaxBusinessException{
	 * 
	 * log.info("inicio ProductoController.guardarProducto");
	 * 
	 * //TODO: Obtener valores de la session int codigoEmpresa = 1; String
	 * codigoUsuario = "adiazgon"; String paisNombreCorto = "PE"; String
	 * empresaNombreCorto = "EFX";
	 * 
	 * ResponseObjectBean<String> response = new ResponseObjectBean<>();
	 * List<MensajeValidacionBean> listaMensajesValidacionBeans=new
	 * ArrayList<>();
	 * 
	 * EsapiUtil.validarPorExpresionRegular("Nombre", nombreProd,
	 * "textoConEspaciosSinNumeros", 150, false, listaMensajesValidacionBeans);
	 * EsapiUtil.validarPorExpresionRegular("Tabla:", nombreTbl,
	 * "textoSinEspaciosSinNumeros", 12, false, listaMensajesValidacionBeans);
	 * EsapiUtil.validarPorExpresionRegular("Archivo de Salida:",
	 * nombreArchSalida, "nombreArchivo", 250, false,
	 * listaMensajesValidacionBeans);
	 * 
	 * if(listaMensajesValidacionBeans.size()>0){
	 * 
	 * response.setRespuesta(ConstantesUtil.RESPUESTA_ERROR_VALIDACION);
	 * response.setListaMensajesValidacion(listaMensajesValidacionBeans); return
	 * response;
	 * 
	 * }else{
	 * 
	 * Producto producto = new Producto();
	 * producto.setCodigoEmpresa(codigoEmpresa);
	 * producto.setDescripcion(nombreProd);
	 * producto.setNombreTabla(ConstantesUtil.PREFIJO_ESQUEMA_BD +
	 * ConstantesUtil.GUION_BAJO + paisNombreCorto + ConstantesUtil.GUION_BAJO +
	 * empresaNombreCorto + ConstantesUtil.GUION_BAJO + nombreTbl);
	 * producto.setNombreArchivoSalida
	 * (nombreArchSalida+ConstantesUtil.PUNTO+ConstantesUtil.EXTENSION_TXT);
	 * producto.setEstado(estadoProductoReg);
	 * producto.setUsuarioCreacion(codigoUsuario);
	 * 
	 * Integer codigoProd = 349;//productoBUS.guardarProducto(producto);
	 * producto.setCodigo(codigoProd);
	 * //productoBUS.crearTablaProducto(producto);
	 * 
	 * //productoColumBUS.insertarProctoColumIni(producto);
	 * 
	 * response.setRespuesta(ConstantesUtil.RESPUESTA_OK);
	 * response.setTipoMensaje(ConstantesUtil.TIPO_MENSAJE_INFO);
	 * response.setMensaje("El producto se guardó correctamente.");
	 * response.setObjeto(String.valueOf(codigoProd)); return response;
	 * 
	 * } }
	 * 
	 * @RequestMapping(value =
	 * "/mantenimiento/producto/actualizarProducto.json", method =
	 * RequestMethod.POST,produces="application/json") public @ResponseBody
	 * ResponseObjectBean<String> actualizarProducto(
	 * 
	 * @RequestParam(value = "codigoProducto", defaultValue = "") Integer
	 * codigoProducto,
	 * 
	 * @RequestParam(value = "tieneValIdentidad", defaultValue = "") String
	 * tieneValIdentidad,
	 * 
	 * @RequestParam(value = "nombreProd", defaultValue = "") String nombreProd,
	 * 
	 * @RequestParam(value = "nombreArchSalida", defaultValue = "") String
	 * nombreArchSalida,
	 * 
	 * @RequestParam(value = "vid_tipo_documento", defaultValue = "") Integer
	 * vidTipoDocumento,
	 * 
	 * @RequestParam(value = "vid_num_documento", defaultValue = "") Integer
	 * vidNumDocumento,
	 * 
	 * @RequestParam(value = "vid_persona_natural", defaultValue = "") String
	 * vidPersonaNatural,
	 * 
	 * @RequestParam(value = "slc_persona_natural", defaultValue = "") String
	 * slcPersonaNatural,
	 * 
	 * @RequestParam(value = "vid_persona_juridica", defaultValue = "") String
	 * vidPersonaJuridica,
	 * 
	 * @RequestParam(value = "slc_persona_juridica", defaultValue = "") String
	 * slcPersonaJuridica,
	 * 
	 * @RequestParam(value = "vid_clientes_esp", defaultValue = "") String
	 * vidClientesEsp,
	 * 
	 * @RequestParam(value = "vid_filtros_ley", defaultValue = "") String
	 * vidFiltrosLey ) throws EquifaxBusinessException{
	 * 
	 * log.info("inicio ProductoController.actualizarProducto");
	 * 
	 * //TODO: Obtener valores de la session String codigoUsuario = "adiazgon";
	 * boolean esCorrectaValIden=false;
	 * 
	 * ResponseObjectBean<String> response = new ResponseObjectBean<>();
	 * List<MensajeValidacionBean> listaMensajesValidacionBeans=new
	 * ArrayList<>();
	 * 
	 * EsapiUtil.validarPorExpresionRegular("Nombre", nombreProd,
	 * "textoConEspaciosSinNumeros", 150, false, listaMensajesValidacionBeans);
	 * EsapiUtil.validarPorExpresionRegular("Archivo de Salida:",
	 * nombreArchSalida, "nombreArchivo", 250, false,
	 * listaMensajesValidacionBeans);
	 * 
	 * MensajeValidacionBean mensajeValidacionBean = new
	 * MensajeValidacionBean();
	 * 
	 * if(vidPersonaNatural.equalsIgnoreCase(ConstantesUtil.CHAR_SI)){
	 * if(slcPersonaNatural == null ||
	 * slcPersonaNatural.equalsIgnoreCase(ConstantesUtil.VACIO)){
	 * mensajeValidacionBean = new MensajeValidacionBean();
	 * mensajeValidacionBean
	 * .setCampo("Validacion de Identidad Persona Natural");
	 * mensajeValidacionBean.setMensaje(
	 * "Validacion de Identidad Persona Natural: Debe seleccionar al menos una opcion"
	 * ); listaMensajesValidacionBeans.add(mensajeValidacionBean); } else{
	 * esCorrectaValIden = true; } }
	 * 
	 * if(vidPersonaJuridica.equalsIgnoreCase(ConstantesUtil.CHAR_SI)){
	 * if(slcPersonaJuridica == null ||
	 * slcPersonaJuridica.equalsIgnoreCase(ConstantesUtil.VACIO)){
	 * mensajeValidacionBean = new MensajeValidacionBean();
	 * mensajeValidacionBean
	 * .setCampo("Validacion de Identidad Persona Juridica");
	 * mensajeValidacionBean.setMensaje(
	 * "Validacion de Identidad Persona Juridica: Debe seleccionar al menos una opcion"
	 * ); listaMensajesValidacionBeans.add(mensajeValidacionBean); }else{
	 * esCorrectaValIden = true; } }
	 * 
	 * //if(!(tieneValIdentidad.equalsIgnoreCase(ConstantesUtil.CHAR_SI) &&
	 * esCorrectaValIden)){
	 * if(tieneValIdentidad.equalsIgnoreCase(ConstantesUtil.CHAR_SI) &&
	 * !esCorrectaValIden){ mensajeValidacionBean = new MensajeValidacionBean();
	 * mensajeValidacionBean.setCampo("Validacion de Identidad");
	 * mensajeValidacionBean.setMensaje(
	 * "Validacion de Identidad: Complete los datos de validacion de identidad"
	 * ); listaMensajesValidacionBeans.add(mensajeValidacionBean); }
	 * 
	 * if(listaMensajesValidacionBeans.size()>0){
	 * 
	 * response.setRespuesta(ConstantesUtil.RESPUESTA_ERROR_VALIDACION);
	 * response.setListaMensajesValidacion(listaMensajesValidacionBeans); return
	 * response;
	 * 
	 * }else{
	 * 
	 * Producto producto = new Producto(); producto.setCodigo(codigoProducto);
	 * producto.setTieneValIden(tieneValIdentidad);
	 * producto.setDescripcion(nombreProd);
	 * producto.setNombreArchivoSalida(nombreArchSalida
	 * .concat(ConstantesUtil.PUNTO).concat(ConstantesUtil.EXTENSION_TXT));
	 * producto.setCodigoColValIdenTipoDoc(vidTipoDocumento);
	 * producto.setCodigoColValIdenNumDoc(vidNumDocumento);
	 * producto.setTieneValIdenPerN(vidPersonaNatural);
	 * producto.setCodigosColValIdenperN(slcPersonaNatural);
	 * producto.setTieneValIdenPerJ(vidPersonaJuridica);
	 * producto.setCodigosColValIdenperJ(slcPersonaJuridica);
	 * producto.setTieneValClienteEsp(vidClientesEsp);
	 * producto.setTieneValFiltroLey(vidFiltrosLey);
	 * producto.setUsuarioModificacion(codigoUsuario);
	 * 
	 * productoBUS.actualizarProducto(producto);
	 * 
	 * response.setRespuesta(ConstantesUtil.RESPUESTA_OK);
	 * response.setTipoMensaje(ConstantesUtil.TIPO_MENSAJE_INFO);
	 * response.setMensaje("El producto se registro correctamente."); return
	 * response;
	 * 
	 * } }
	 * 
	 * @RequestMapping(value =
	 * "/mantenimiento/producto/registro-agregar-columna.htm", method =
	 * RequestMethod.GET) public String irRegAgregarColumna(){
	 * log.info("ProductoController.irRegAgregarColumna"); return
	 * "regAgregarColumna"; }
	 * 
	 * @RequestMapping(value = "/mantenimiento/producto/editar-columna.htm",
	 * method = RequestMethod.GET) public String irEditarColumna(Model
	 * model,@RequestParam String codigoProducto){
	 * log.info("ProductoController.irEditarColumna");
	 * 
	 * Integer ordenMaximo =
	 * productoColumBUS.obtenerMaximoProductosColumn(Integer
	 * .valueOf(codigoProducto));
	 * 
	 * model.addAttribute("RANGE_PERMITIDO",
	 * "Rango Permitido: 1 - ".concat(String.valueOf(ordenMaximo)));
	 * 
	 * 
	 * return "editAgregarColumna"; }
	 * 
	 * @RequestMapping(value =
	 * "/mantenimiento/producto/obtener-catalogo-column.json", method =
	 * RequestMethod.POST,produces="application/json") public @ResponseBody
	 * ResponseObjectBean<CatalogoColumnBean> obtenerCatalogoColumn(
	 * 
	 * @RequestParam(value = "codigoCatalogoColumn", defaultValue =
	 * ConstantesUtil.VACIO) Integer codigoCatalogoColumn){
	 * 
	 * log.info("inicio ProductoController.obtenerCatalogoColumn");
	 * 
	 * ResponseObjectBean<CatalogoColumnBean> response = new
	 * ResponseObjectBean<>(); CatalogoColumnBean catalogoColumnBean = new
	 * CatalogoColumnBean(); catalogoColumnBean.setCodigo(codigoCatalogoColumn);
	 * catalogoColumnBean =
	 * catalogoColumnBUS.obtenerCatalogoColumn(catalogoColumnBean);
	 * response.setObjeto(catalogoColumnBean); return response; }
	 * 
	 * @RequestMapping(value =
	 * "/mantenimiento/producto/reg-producto-agregar-columna.json", method =
	 * RequestMethod.POST,produces="application/json") public @ResponseBody
	 * ResponseObjectBean<String> agregarColumnaProducto(
	 * 
	 * @RequestParam(value = "esCampoOblig", defaultValue = "") String
	 * esCampoOblig,
	 * 
	 * @RequestParam(value = "esCampoKey", defaultValue = "") String esCampoKey,
	 * 
	 * @RequestParam(value = "codigoProducto", defaultValue = "") Integer
	 * codigoProducto,
	 * 
	 * @RequestParam(value = "codigoCatalogoColumn", defaultValue = "") Integer
	 * codigoCatalogoColumn,
	 * 
	 * @RequestParam(value = "estado", defaultValue = "") String estado,
	 * 
	 * @RequestParam(value = "codigoTipoDato", defaultValue = "") Integer
	 * codigoTipoDato,
	 * 
	 * @RequestParam(value = "longitud", defaultValue = "") String longitud,
	 * 
	 * @RequestParam(value = "formatoFecha", defaultValue = "") String
	 * formatoFecha,
	 * 
	 * @RequestParam(value = "esCampoSalida", defaultValue = "") String
	 * esCampoSalida,
	 * 
	 * @RequestParam(value = "posicionInicial", defaultValue = "") String
	 * posicionInicial,
	 * 
	 * @RequestParam(value = "longitudSalida", defaultValue = "") String
	 * longitudSalida,
	 * 
	 * @RequestParam(value = "validaciones", defaultValue = "") String
	 * validaciones,
	 * 
	 * @RequestParam(value = "esTipoFecha", defaultValue = "") String
	 * esTipoFecha) throws EquifaxBusinessException{
	 * 
	 * log.info("inicio ProductoController.agregarColumnaProducto");
	 * 
	 * //TODO: Obtener valores de la session int codigoEmpresa = 1; String
	 * codigoUsuario = "adiazgon";
	 * 
	 * ResponseObjectBean<String> response = new ResponseObjectBean<>();
	 * List<MensajeValidacionBean> listaMensajesValidacionBeans=new
	 * ArrayList<>();
	 * 
	 * EsapiUtil.validarPorExpresionRegular("Longitud", longitud, "numeroComa",
	 * 5, false, listaMensajesValidacionBeans);
	 * if(esTipoFecha.equalsIgnoreCase(ConstantesUtil.CHAR_SI)){
	 * EsapiUtil.validarPorExpresionRegular("Formato de fecha", formatoFecha,
	 * "formatoFecha", 30, false, listaMensajesValidacionBeans); }
	 * if(esCampoSalida.equalsIgnoreCase(ConstantesUtil.CHAR_SI)){
	 * EsapiUtil.validarPorExpresionRegular("Nro. Posicion", posicionInicial,
	 * "soloNumero", 5, false, listaMensajesValidacionBeans);
	 * EsapiUtil.validarPorExpresionRegular("Longitud", longitudSalida,
	 * "soloNumero", 5, false, listaMensajesValidacionBeans); } Integer
	 * ordenMaximo =
	 * productoColumBUS.obtenerMaximoProductosColumn(Integer.valueOf
	 * (codigoProducto)); Integer iPosicionInicial =
	 * Integer.valueOf(posicionInicial);
	 * 
	 * if (iPosicionInicial<1 || iPosicionInicial>ordenMaximo) {
	 * MensajeValidacionBean mensajeValidacionBean = new
	 * MensajeValidacionBean(); mensajeValidacionBean.setCampo("Nro. Posicion");
	 * mensajeValidacionBean.setMensaje(mensajeValidacionBean.getCampo().concat(
	 * ": No puede estar fuera del Rango 1 - "
	 * .concat(String.valueOf(ordenMaximo))));
	 * listaMensajesValidacionBeans.add(mensajeValidacionBean); }
	 * 
	 * 
	 * if(listaMensajesValidacionBeans.size()>0){
	 * 
	 * response.setRespuesta(ConstantesUtil.RESPUESTA_ERROR_VALIDACION);
	 * response.setListaMensajesValidacion(listaMensajesValidacionBeans); return
	 * response;
	 * 
	 * }else{
	 * 
	 * ProductoColum productoColum = new ProductoColum();
	 * 
	 * productoColum.setCodigoCatalogo(codigoCatalogoColumn);
	 * productoColum.setCodigoTipoDato(codigoTipoDato);
	 * productoColum.setLongitudCol(longitud); productoColum.setEstado(estado);
	 * productoColum.setUsuarioCreacion(codigoUsuario);
	 * productoColum.setCodigoProducto(codigoProducto);
	 * productoColum.setColumnaEditable(ConstantesUtil.CHAR_SI);
	 * productoColum.setEsColumnaSalida(esCampoSalida);
	 * if(esCampoSalida.equalsIgnoreCase(ConstantesUtil.CHAR_SI)){
	 * productoColum.setLongColumnSalida(Integer.valueOf(longitudSalida));
	 * }else{ productoColum.setLongColumnSalida(0); }
	 * 
	 * productoColum.setEsLlave(esCampoKey);
	 * productoColum.setEsObligatorio(esCampoOblig);
	 * productoColum.setFormatoFecha(formatoFecha);
	 * 
	 * 
	 * productoColum.setOrdenColumnSalida(Integer.valueOf(posicionInicial));
	 * 
	 * //Integer codigoProductoColum = 354; Map<String,Integer> pColumns =
	 * productoColumBUS.guardarProductoColumn(productoColum);
	 * 
	 * Integer codigoProductoColum = pColumns.get("codigo"); Integer resultado =
	 * pColumns.get("resultado");
	 * 
	 * //Solo entra si se actualiza. if (resultado == 1) { Integer posicion =
	 * productoColumBUS.obtenerPosicionProductoColumn(codigoProducto,
	 * codigoProductoColum);
	 * 
	 * ProductoColumBean productoColumBean = new ProductoColumBean();
	 * productoColumBean.setCodigoProducto(codigoProducto);
	 * productoColumBean.setEsLlave("%");
	 * productoColumBean.setEsObligatorio("%");
	 * productoColumBean.setEsColumnaSalida("%");
	 * productoColumBean.setColumnaEditable("%");
	 * productoColumBean.setEstado("%");
	 * 
	 * List<ProductoColumBean> lists =
	 * productoColumBUS.buscarColumnasxProducto(productoColumBean); Integer[]
	 * codigosColumns = new Integer[lists.size()]; int i = 0; for
	 * (ProductoColumBean p : lists) { codigosColumns[i] =
	 * Integer.valueOf(p.getCodigo()); i++; } Integer[] gPosiciones =
	 * changePosition(codigosColumns, posicion,
	 * productoColum.getOrdenColumnSalida(),true); i=1; if
	 * (!ArrayUtils.isEmpty(gPosiciones)) { for (Integer codigoColumn :
	 * gPosiciones) {
	 * productoColumBUS.actuaPosicionProductoColumn(codigoProducto,
	 * codigoColumn, i); i++; }
	 * 
	 * } }
	 * 
	 * Producto producto = new Producto(); producto.setCodigo(codigoProducto);
	 * producto = productoBUS.obtenerProducto(producto);
	 * 
	 * TipoDato tipoDato = new TipoDato(); tipoDato.setCodigo(codigoTipoDato);
	 * tipoDato = tipoDatoBUS.obtenerTipoDato(tipoDato);
	 * 
	 * CatalogoColumnBean catalogoColumnBean = new CatalogoColumnBean();
	 * catalogoColumnBean.setCodigo(codigoCatalogoColumn); catalogoColumnBean =
	 * catalogoColumnBUS.obtenerCatalogoColumn(catalogoColumnBean);
	 * 
	 * String sentenciaSQL = null;
	 * 
	 * 
	 * if (resultado == 0) { sentenciaSQL =
	 * sentenciaSQLAlterColumn(productoColum, producto, tipoDato,
	 * catalogoColumnBean,1); }else{
	 * 
	 * sentenciaSQL = sentenciaSQLAlterColumn(productoColum, producto, tipoDato,
	 * catalogoColumnBean,2); }
	 * 
	 * productoColumBUS.ejecutarSentenciaSQL(sentenciaSQL);
	 * 
	 * String[] listaValidaciones = null;
	 * 
	 * if(StringUtils.isBlank(validaciones)){ listaValidaciones = new
	 * String[]{"-1"}; }else{ listaValidaciones =
	 * StringUtils.split(validaciones,","); }
	 * 
	 * ValidacionCampo validacionCampo = null; for (String val :
	 * listaValidaciones){ validacionCampo = new ValidacionCampo();
	 * validacionCampo.setCodigoProductoColum(codigoProductoColum);
	 * validacionCampo.setCodigoValidacion(Integer.parseInt(val));
	 * validacionCampo.setUsuarioCreacion(codigoUsuario);
	 * validacionBUS.guardarValidacionCampo(validacionCampo); }
	 * 
	 * response.setRespuesta(ConstantesUtil.RESPUESTA_OK);
	 * response.setTipoMensaje(ConstantesUtil.TIPO_MENSAJE_INFO);
	 * 
	 * if (resultado == 0) {
	 * response.setMensaje("La columna se agrego correctamente"); }else{
	 * response.setMensaje("La columna se actualizo correctamente"); }
	 * 
	 * return response; } }
	 * 
	 * 
	 * public String sentenciaSQLAlterColumn(ProductoColum
	 * productoColum,Producto producto, TipoDato tipoDato, CatalogoColumnBean
	 * catalogoColumnBean,int tipoAlter){
	 * log.info("inicio ProductoController.sentenciaSQLAddColumn");
	 * 
	 * String sentenciaSQL; if (tipoAlter == 1) { sentenciaSQL =
	 * ConstantesUtil.PRODUCTO_COLUMN_ADD; }else{ sentenciaSQL =
	 * ConstantesUtil.PRODUCTO_COLUMN_UPDATE; }
	 * 
	 * sentenciaSQL = sentenciaSQL.replace(ConstantesUtil.COMODIN_TABLA,
	 * producto.getNombreTabla()); sentenciaSQL =
	 * sentenciaSQL.replace(ConstantesUtil.COMODIN_COLUMNA,
	 * catalogoColumnBean.getNombre()); sentenciaSQL =
	 * sentenciaSQL.replace(ConstantesUtil.COMODIN_TIPO_DATO,
	 * tipoDato.getValorOracle());
	 * if(!tipoDato.getValorOracle().equalsIgnoreCase
	 * (ConstantesUtil.TIPO_DATE_ORACLE)){ sentenciaSQL =
	 * sentenciaSQL.replace(ConstantesUtil.COMODIN_LONGITUD,
	 * ConstantesUtil.ABRE_PARENTESIS + productoColum.getLongitudCol() +
	 * ConstantesUtil.CIERRA_PARENTESIS); } else{ sentenciaSQL =
	 * sentenciaSQL.replace(ConstantesUtil.COMODIN_LONGITUD,
	 * ConstantesUtil.VACIO); } log.info("Sentencia SQL: " +sentenciaSQL);
	 * 
	 * return sentenciaSQL; }
	 * 
	 * @RequestMapping(value =
	 * "/mantenimiento/producto/eliminar-columna-producto.json", method =
	 * RequestMethod.POST,produces="application/json") public @ResponseBody
	 * ResponseObjectBean<String> eliminarColumnaProducto(
	 * 
	 * @RequestParam(value = "codigoColumn", defaultValue = "") Integer
	 * codigoColumn,
	 * 
	 * @RequestParam(value = "codigoProducto", defaultValue = "") Integer
	 * codigoProducto) throws EquifaxBusinessException{
	 * 
	 * log.info("inicio ProductoController.eliminarColumnaProducto");
	 * 
	 * ResponseObjectBean<String> response = new ResponseObjectBean<>();
	 * List<MensajeValidacionBean> listaMensajesValidacionBeans=new
	 * ArrayList<>();
	 * 
	 * if(listaMensajesValidacionBeans.size()>0){
	 * 
	 * response.setRespuesta(ConstantesUtil.RESPUESTA_ERROR_VALIDACION);
	 * response.setListaMensajesValidacion(listaMensajesValidacionBeans); return
	 * response;
	 * 
	 * }else{
	 * 
	 * ProductoColum productoColum = new ProductoColum();
	 * 
	 * productoColum.setCodigo(codigoColumn);
	 * productoColum.setCodigoProducto(codigoProducto);
	 * productoColumBUS.eliminarProductoColumn(productoColum);
	 * 
	 * response.setRespuesta(ConstantesUtil.RESPUESTA_OK);
	 * response.setTipoMensaje(ConstantesUtil.TIPO_MENSAJE_INFO);
	 * response.setMensaje("La columna se elimino correctamente"); return
	 * response;
	 * 
	 * } }
	 * 
	 * @RequestMapping(value =
	 * "/mantenimiento/producto/obtener-vali-column.json", method =
	 * RequestMethod.POST,produces="application/json") public @ResponseBody
	 * List<ValidacionCampo> obtenerListaValiColumn(
	 * 
	 * @RequestParam(value = "codigoProdCol", defaultValue = "") Integer
	 * codigoProdCol){
	 * 
	 * ValidacionCampo validacionCampo= new ValidacionCampo();
	 * validacionCampo.setCodigoProductoColum(codigoProdCol);
	 * List<ValidacionCampo> listaValidacionesColumn =
	 * validacionBUS.listarValidacionesXcolumna(validacionCampo);
	 * 
	 * return listaValidacionesColumn; }
	 * 
	 * @RequestMapping(value = "/mantenimiento/producto/eliminar-producto.json",
	 * method = RequestMethod.POST,produces="application/json") public
	 * @ResponseBody ResponseObjectBean<String> eliminarProducto(
	 * 
	 * @RequestParam(value = "codigoProd", defaultValue = "") Integer
	 * codigoProd) throws EquifaxBusinessException{
	 * 
	 * log.info("inicio ProductoController.eliminarProducto");
	 * 
	 * ResponseObjectBean<String> response = new ResponseObjectBean<>();
	 * 
	 * Producto producto = new Producto(); producto.setCodigo(codigoProd);
	 * 
	 * HashMap<String, String> result = productoBUS.eliminarProducto(producto);
	 * 
	 * if(result.get("resultado").equalsIgnoreCase("1")){
	 * response.setRespuesta(ConstantesUtil.RESPUESTA_ERROR_GENERAL);
	 * response.setTipoMensaje(ConstantesUtil.TIPO_MENSAJE_WARNING);
	 * response.setMensaje(result.get("msg")); return response; } else{
	 * response.setRespuesta(ConstantesUtil.RESPUESTA_OK);
	 * response.setTipoMensaje(ConstantesUtil.TIPO_MENSAJE_INFO);
	 * response.setMensaje("Se elimino correctamente el producto"); return
	 * response; } }
	 * 
	 * 
	 * public static <T> T[] changePosition(T[] positions,int position,int
	 * positionToChange,boolean returnNull){
	 * 
	 * int indexPosAcambiar = positionToChange - 1; int indexPosActual =
	 * position - 1;
	 * 
	 * T sacarVariable = null; boolean entro = false;
	 * 
	 * if (positionToChange < position) {
	 * 
	 * for (int i = positions.length - 1; i >= 0; i--) {
	 * 
	 * if (i==indexPosActual) { sacarVariable = positions[i]; entro = true; } if
	 * (i == indexPosAcambiar) { positions[i]=sacarVariable; break; } if (entro)
	 * { positions[i]=positions[i-1]; } } }else if(positionToChange > position){
	 * 
	 * for (int i = 0; i < positions.length; i++) {
	 * 
	 * if (i==indexPosActual) { sacarVariable = positions[i]; entro = true; } if
	 * (i == indexPosAcambiar) { positions[i]=sacarVariable; break; } if (entro)
	 * { positions[i]=positions[i+1]; } } } else{ if (returnNull) { return null;
	 * } }
	 * 
	 * return positions; }
	 */

}
