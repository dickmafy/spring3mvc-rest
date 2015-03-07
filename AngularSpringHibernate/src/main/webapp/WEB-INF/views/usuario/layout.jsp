<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="container">
	<div id="fui-button" class="pbl"></div>
	<div class="demo-row">
		<div class="demo-title">USUARIO / LAYOUT</div>
		<div class="demo-content">
			<span class="label label-danger" ng-show="error">{{errorMessage}}</span>
			<span class="label label-success" ng-show="success">{{successMessage}}</span>
			
			<div class="row">
				<!-- ADD -->
				<form ng-submit="add(bean)">
					<div class="col-lg-8">
						<input class="form-control" placeholder="Ingresa nombre" type="text" ng-model="bean.nombre" required min="1" /> <input
							class="form-control" placeholder="Ingresa correo" type="text" ng-model="bean.correo" required min="1" />
					</div>
				</form>
				<button class="btn btn-primary" ng-disabled="!bean" ng-hide="editMode" ng-click="add(bean)">Agregar Usuario</button>
				<button type="btn btn-primary" class="btn btn-primary" ng-disabled="!bean" ng-show="editMode" ng-click="update(bean)">Guardar</button>
				<button type="btn btn-primary" class="btn btn-primary" ng-click="reset()">Limpiar</button>
			</div>
			<hr />
			<!-- BUSCAR -->
			<div class="row">
				<div class="col-lg-8">
					<div class="form-group">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Search" id="search-query-3" ng-model="searchAddressBook"> <span
								class="input-group-btn">
								<button type="submit" class="btn">
									<span class="fui-search"></span>
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
			<hr />
			<div class="alert alert-info" style="width: 400px; margin-left: 100px;" ng-show="beanList.length == 0">No address book entry found
			</div>
			beanList.length : {{beanList.length}}
			<!-- Mostrar solo si hay data -->
			<table class="table table-bordered table-striped" ng-show="beanList.length > 0">
				<thead>
					<!-- CABECERA TABLA -->
					<tr>
						<th style="text-align: center; width: 25px;">Borrar</th>
						<th style="text-align: center; width: 25px;">Actualizar</th>
						<th style="text-align: center;"><a href="" ng-click="reverse=!reverse;order('id', reverse)">ID </a></th>
						<th style="text-align: center;"><a href="" ng-click="reverse=!reverse;order('correo', reverse)">CORREO </a></th>
						<th style="text-align: center;"><a href="" ng-click="reverse=!reverse;order('contrasena', reverse)">CONTRASEÑA </a></th>
					</tr>
				</thead>
				<tbody>
					<!-- FILAS TABLA -->
					<tr ng-repeat="bean in beanList | filter:searchAddressBook">
						<td style="width: 70px; text-align: center;">
							<button class="btn btn-mini btn-danger" ng-click="delete(bean)">Delete</button>
						</td>
						<td style="width: 70px; text-align: center;">
							<button class="btn btn-mini btn-danger" ng-click="set(beanList.indexOf(bean), bean)">Update</button>
						</td>
						<td>{{bean.id}}</td>
						<td>{{bean.nombre}}</td>
						<td>{{bean.correo}}</td>
					</tr>
				</tbody>
			</table>
			
			<div data-ng-init="getPersonDataFromServer()">
					<b>Person Data:</b> <select id="personData">
						<option value="">-- Select Persons --</option>
						<option data-ng-repeat="bean in beanList" value="{{bean.id}}">{{bean.nombre}}</option>
					</select><br>
				</div>
		

		</div>
		<!-- /.demo-content -->
	</div>
	<!-- /.demo-row -->
</div>
<!-- /.container -->
