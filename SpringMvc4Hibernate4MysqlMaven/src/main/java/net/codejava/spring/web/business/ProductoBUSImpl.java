package net.codejava.spring.web.business;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;

import net.codejava.spring.web.dao.ProductoDAO;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoBUSImpl implements ProductoBUS {
	
	private static final Logger log = Logger.getLogger(ProductoBUSImpl.class);

	@Autowired
	ProductoDAO productoDAO;
	
	/*
	@Override
	public Integer obtenerCantidadProductos(Producto producto) {
		log.info("inicio ProductoBUSImpl.obtenerCantidadProductos");
		return productoDAO.obtenerCantidadProductos(producto);
	}

	@Override
	public List<Producto> buscarProductosPaginado(Producto producto,
			Integer pagina, Integer registros) {
		log.info("inicio ProductoBUSImpl.buscarProductosPaginado");
		return productoDAO.buscarProductosPaginado(producto, pagina, registros);
	}

	@Override
	public Integer guardarProducto(Producto producto) throws EquifaxBusinessException {
		log.info("inicio ProductoBUSImpl.guardarProducto");
		
		HashMap<String, Integer> resultado = productoDAO.guardarProducto(producto);
		
		if(resultado.get("resultado")== 1){
			throw new EquifaxBusinessException("El producto ingresado ya se encuentra registrado.");
		}
		
		return resultado.get("codigo");
	}

	@Override
	public void crearTablaProducto(Producto producto) throws EquifaxBusinessException {
		log.info("inicio ProductoBUSImpl.crearTablaProducto");
		
		
		String sentenciaSQL = generarSQLCrearProducto(producto);
		Integer resultado = productoDAO.crearTablaProducto(sentenciaSQL);
		
		if(resultado==1){
			throw new EquifaxBusinessException("Ocurrio un error al crear un producto en la BD");
		}
	}
	
	@Override
	public String generarSQLCrearProducto(Producto producto) throws EquifaxBusinessException {
		
		String sentenciaSQL = ConstantesUtil.PRODUCTO_CREATE_TABLE;
		sentenciaSQL= sentenciaSQL.replace(ConstantesUtil.COMODIN_PRODUCTO, producto.getNombreTabla());
		
		CatalogoColumnBean catalogoColumnBean= new CatalogoColumnBean();
		catalogoColumnBean.setCodigoEmpresa(producto.getCodigoEmpresa());
		catalogoColumnBean.setEsColumnDefecto(ConstantesUtil.CHAR_SI);
		catalogoColumnBean.setEstado(ConstantesUtil.ESTADO_ACTIVO);
		List<CatalogoColumnBean> listaColumnCatalogo = catalogoColumnDAO.listarCatalogoColumn(catalogoColumnBean);
		String columnasSQL = "";
		
		for (CatalogoColumnBean filaColumn : listaColumnCatalogo){
			columnasSQL = columnasSQL + filaColumn.getNombre() + ConstantesUtil.ESPACIO + filaColumn.getValorOracleTipoDato();
			if(!filaColumn.getValorOracleTipoDato().equalsIgnoreCase(ConstantesUtil.TIPO_DATE_ORACLE)){
				columnasSQL = columnasSQL + ConstantesUtil.ABRE_PARENTESIS + filaColumn.getLongitud() + ConstantesUtil.CIERRA_PARENTESIS + ConstantesUtil.COMA;
			}else{
				columnasSQL = columnasSQL + ConstantesUtil.COMA;
			}
		}
		
		columnasSQL =  columnasSQL.substring(0, columnasSQL.length()-1);
		sentenciaSQL= sentenciaSQL.replace(ConstantesUtil.COMODIN_PRODUCTO_COLUMNAS, columnasSQL);
		
		return sentenciaSQL;
	}

	@Override
	public Producto obtenerProducto(Producto producto)
			throws EquifaxBusinessException {
		log.info("inicio ProductoBUSImpl.obtenerProducto");
		return productoDAO.obtenerProducto(producto);
	}

	@Override
	public void actualizarProducto(Producto producto)
			throws EquifaxBusinessException {
		log.info("inicio ProductoBUSImpl.actualizarProducto");
		
		Integer resultado = productoDAO.actualizarProducto(producto);
		if(resultado==1){
			throw new EquifaxBusinessException("Ocurrio un error al crear un producto en la BD");
		}
	}

	@Override
	public HashMap<String, String> eliminarProducto(Producto producto)
			throws EquifaxBusinessException {
		
		log.info("inicio ProductoBUSImpl.eliminarProducto");
		
		HashMap<String, String> resultado = productoDAO.eliminarProducto(producto);
		
		return resultado;
	}
*/
}
