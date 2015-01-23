package net.codejava.spring.dao;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;


@Repository
public class ProductoDAOImpl implements ProductoDAO {

	private static final Logger LOG = Logger.getLogger(ProductoDAOImpl.class);
	/*
	@Autowired
	private JdbcTemplate jdbcTemplate;
	private SimpleJdbcCall jdbcCall;
	
	
	@Override
	public Integer obtenerCantidadProductos(Producto producto) {
		log.info("inicio ProductoDAOImpl.obtenerCantidadProductos");
		
		Integer cantidad = 0;
		
		jdbcCall = new SimpleJdbcCall(jdbcTemplate.getDataSource());
		jdbcCall.withCatalogName("PKG_PRODUCTO");
		jdbcCall.withProcedureName("SP_OBTENER_CANTIDAD_PRODUCTOS");
		jdbcCall.addDeclaredParameter(new SqlOutParameter("P_OUT_CANTIDAD", OracleTypes.INTEGER));
		
		MapSqlParameterSource parametros = new MapSqlParameterSource();
		parametros.addValue("P_IN_CODIGO_EMP", producto.getCodigoEmpresa());
		parametros.addValue("P_IN_NOMBRE", producto.getDescripcion());
		parametros.addValue("P_IN_NOMBRE_TABLA", producto.getNombreTabla());
		parametros.addValue("P_IN_ESTADO", producto.getEstado());
		
		
		Map<String,Object> results = jdbcCall.execute(parametros);
		cantidad = (Integer) results.get("P_OUT_CANTIDAD");
		
		return cantidad;
	}

	@Override
	public List<Producto> buscarProductosPaginado(Producto producto,
			Integer pagina, Integer registros) {
				log.info("inicio ProductoDAOImpl.buscarProductosPaginado");
				
				Integer inicio=(pagina-1)*registros+1;
				Integer fin=inicio+registros-1;	
				
				jdbcCall = new SimpleJdbcCall(jdbcTemplate.getDataSource());
				jdbcCall.withCatalogName("PKG_PRODUCTO");
				jdbcCall.withProcedureName("SP_BUSCAR_PRODUCTOS_PAGINADO");
				jdbcCall.addDeclaredParameter(new SqlOutParameter("P_OUT_CURSOR_PRODUCTOS", OracleTypes.CURSOR,new BeanPropertyRowMapper(Producto.class)));
				
				MapSqlParameterSource parametros = new MapSqlParameterSource();
				parametros.addValue("P_IN_CODIGO_EMP", producto.getCodigoEmpresa());
				parametros.addValue("P_IN_NOMBRE", producto.getDescripcion());
				parametros.addValue("P_IN_NOMBRE_TABLA", producto.getNombreTabla());
				parametros.addValue("P_IN_ESTADO", producto.getEstado());
				parametros.addValue("P_IN_INICIO", inicio);
				parametros.addValue("P_IN_FIN", fin);
				
				Map<String,Object> results = jdbcCall.execute(parametros);
				
				
				List<Producto> lista = (List<Producto>) results.get("P_OUT_CURSOR_PRODUCTOS");
				
				return lista;
	}
	
	
	@Override
	public HashMap<String,Integer> guardarProducto(Producto producto) {
		
		log.info("inicio ProductoDAOImpl.guardarProducto");
		HashMap<String,Integer> resultado = new HashMap<String,Integer>();
		
		jdbcCall = new SimpleJdbcCall(jdbcTemplate.getDataSource());
		jdbcCall.withCatalogName("PKG_PRODUCTO");
		jdbcCall.withProcedureName("SP_GUARDAR_PRODUCTO");
		jdbcCall.addDeclaredParameter(new SqlOutParameter("P_OUT_RESULTADO", OracleTypes.INTEGER));
		jdbcCall.addDeclaredParameter(new SqlOutParameter("P_OUT_CODIGO", OracleTypes.INTEGER));
		
		MapSqlParameterSource parametros = new MapSqlParameterSource();
		parametros.addValue("P_IN_DESCRIPCION", producto.getDescripcion());
		parametros.addValue("P_IN_NOMBRE_TABLA", producto.getNombreTabla());
		parametros.addValue("P_IN_NMBR_ARCH_OUT", producto.getNombreArchivoSalida());
		parametros.addValue("P_IN_ESTADO", producto.getEstado());
		parametros.addValue("P_IN_USU_CREA", producto.getUsuarioCreacion());
		parametros.addValue("P_IN_EMP_CODIGO", producto.getCodigoEmpresa());
		
		
		Map<String,Object> results = jdbcCall.execute(parametros);
		Integer codigo = (Integer.parseInt(results.get("P_OUT_CODIGO").toString()));
		
		resultado.put("resultado", (Integer) results.get("P_OUT_RESULTADO")) ;
		resultado.put("codigo", codigo) ;
		
		return resultado;
	}

	@Override
	public Integer crearTablaProducto(String sentenciaSQL) {
		log.info("inicio ProductoDAOImpl.crearTablaProducto");
		Integer resultado = 0;
		
		try {
			jdbcTemplate.execute(sentenciaSQL);
		} catch (Exception e) {
			log.error("Error en la ejecucion del metodo crearTablaProducto(String sentenciaSQL)"+e);
			resultado = 1;
			return resultado;
		}
		return resultado;
	}

	@Override
	public Producto obtenerProducto(Producto producto) {
		log.info("inicio ProductoDAOImpl.obtenerProducto");
		
		jdbcCall = new SimpleJdbcCall(jdbcTemplate.getDataSource());
		jdbcCall.withCatalogName("PKG_PRODUCTO");
		jdbcCall.withProcedureName("SP_OBTENER_PRODUCTO");
		jdbcCall.addDeclaredParameter(new SqlOutParameter("P_OUT_PRODUCTOS", OracleTypes.CURSOR,new BeanPropertyRowMapper(Producto.class)));
		
		MapSqlParameterSource parametros = new MapSqlParameterSource();
		parametros.addValue("P_IN_CODIGO", producto.getCodigo());
		
		Map<String,Object> results = jdbcCall.execute(parametros);
		List<Producto> lista = (List<Producto>) results.get("P_OUT_PRODUCTOS");
		
		if (!lista.isEmpty()) {
			return lista.get(0);
		}
		
		return null;
	}

	@Override
	public Integer actualizarProducto(Producto producto) {
		log.info("inicio ProductoDAOImpl.actualizarProducto");
		Integer resultado = 0;
		
		try {
			jdbcCall = new SimpleJdbcCall(jdbcTemplate.getDataSource());
			jdbcCall.withCatalogName("PKG_PRODUCTO");
			jdbcCall.withProcedureName("SP_ACTUALIZAR_PRODUCTO");
			
			MapSqlParameterSource parametros = new MapSqlParameterSource();
			parametros.addValue("P_IN_CODIGO", producto.getCodigo());
			parametros.addValue("P_IN_TIENE_VIDEN", producto.getTieneValIden());
			parametros.addValue("P_IN_DESCRIPCION", producto.getDescripcion());
			parametros.addValue("P_IN_NOM_ARCH_SAL", producto.getNombreArchivoSalida());
			parametros.addValue("P_IN_VIDEN_TDOC", producto.getCodigoColValIdenTipoDoc());
			parametros.addValue("P_IN_VIDEN_NDOC", producto.getCodigoColValIdenNumDoc());
			parametros.addValue("P_IN_TIENE_VIDEN_PNAT", producto.getTieneValIdenPerN());
			parametros.addValue("P_IN_VIDEN_PNAT_NOMBRE", producto.getCodigosColValIdenperN());
			parametros.addValue("P_IN_TIENE_VIDEN_PJUR", producto.getTieneValIdenPerJ());
			parametros.addValue("P_IN_VIDEN_PJUR_NOMBRE", producto.getCodigosColValIdenperJ());
			parametros.addValue("P_IN_TIENE_VAL_CLIESP", producto.getTieneValClienteEsp());
			parametros.addValue("P_IN_TIENE_VAL_FLEY", producto.getTieneValFiltroLey());
			parametros.addValue("P_IN_USU_MODI", producto.getUsuarioModificacion());
			Map<String,Object> results = jdbcCall.execute(parametros);
		} catch (Exception e) {
			log.error("Error en la ejecucion del metodo actualizarProducto(Producto producto)"+e);
			resultado = 1;
			return resultado;
		}
		return resultado;
	}

	@Override
	public HashMap<String, String> eliminarProducto(Producto producto) {
		
		log.info("inicio ProductoDAOImpl.eliminarProducto");
		HashMap<String,String> resultado = new HashMap<String,String>();
		
		jdbcCall = new SimpleJdbcCall(jdbcTemplate.getDataSource());
		jdbcCall.withCatalogName("PKG_PRODUCTO");
		jdbcCall.withProcedureName("SP_ELIMINAR_PRODUCTO");
		jdbcCall.addDeclaredParameter(new SqlOutParameter("P_OUT_RESULTADO", OracleTypes.INTEGER));
		jdbcCall.addDeclaredParameter(new SqlOutParameter("P_OUT_MSG", OracleTypes.VARCHAR));
		
		MapSqlParameterSource parametros = new MapSqlParameterSource();
		parametros.addValue("P_IN_CODIGO", producto.getCodigo());
		
		
		Map<String,Object> results = jdbcCall.execute(parametros);
		resultado.put("resultado", results.get("P_OUT_RESULTADO").toString()) ;
		resultado.put("msg", results.get("P_OUT_MSG").toString()) ;
		
		return resultado;
	}
	
*/	
}
