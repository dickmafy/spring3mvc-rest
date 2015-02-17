<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="container">
	<div id="fui-button" class="pbl"></div>

	<div class="demo-row">
		<div class="demo-title">USUARIO / LAYOUT</div>
		<div class="demo-content">
			<div class="alert alert-error" ng-show="error">{{errorMessage}}</div>
			<div class="row">
				<form ng-submit="addUsuario(ab)">
					<div class="col-lg-8">
						<input class="form-control" placeholder="Ingresa correo" type="text"
							ng-model="ab.correo" required min="1" /> 
							<input
							class="form-control" placeholder="Ingresa contraseña" type="text"
							ng-model="ab.contrasena" required min="1" />
					</div>
				</form>

				<button class="btn btn-primary" ng-disabled="!ab" ng-hide="editMode"
					ng-click="addUsuario(ab)">Agregar Usuario</button>
				<button type="btn btn-primary" class="btn btn-primary"
					ng-disabled="!ab" ng-show="editMode"
					ng-click="updateAddressBook(ab)">Guardar</button>
				<button type="btn btn-primary" class="btn btn-primary"
					ng-click="resetAddressBookField()">Limpiar</button>
			</div>
			<hr />

			<div class="row">
				<div class="col-lg-8">
					<div class="form-group">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Search"
								id="search-query-3" ng-model="searchAddressBook"> <span
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

			<div class="alert alert-info"
				style="width: 400px; margin-left: 100px;"
				ng-show="addressBooks.length == 0">No address book entry found
			</div>
			addressBooks.length : {{addressBooks.length}}
			<table class="table table-bordered table-striped"
				ng-show="addressBooks.length > 0">
				<thead>
					<!-- CABECERA TABLA -->
					<tr>
						<th style="text-align: center; width: 25px;">Borrar</th>
						<th style="text-align: center; width: 25px;">Actualizar</th>
						<th style="text-align: center;"><a href=""
							ng-click="reverse=!reverse;order('id', reverse)">ID
								</a></th>
						<th style="text-align: center;"><a href=""
							ng-click="reverse=!reverse;order('correo', reverse)">CORREO
								</a></th>
						<th style="text-align: center;"><a href=""
							ng-click="reverse=!reverse;order('contrasena', reverse)">CONTRASEÑA
								</a></th>
					</tr>
				</thead>
				<tbody>
					<!-- FILAS TABLA -->
					<tr
						ng-repeat="addressBook in addressBooks | filter:searchAddressBook">
						<td style="width: 70px; text-align: center;"><button
								class="btn btn-mini btn-danger"
								ng-click="deleteUsuario(addressBook)">Delete</button></td>
						<td style="width: 70px; text-align: center;"><button
								class="btn btn-mini btn-danger"
								ng-click="editAddressBook(addressBooks.indexOf(addressBook), addressBook)">Update</button></td>
						<td>{{addressBook.id}}</td>
						<td>{{addressBook.correo}}</td>
						<td>{{addressBook.contrasena}}</td>
					</tr>
				</tbody>
			</table>
			<button class="btn btn-danger" ng-show="addressBooks.length >= 1"
				ng-click="deleteAllAddressBook()">Delete All Address Book</button>
		</div>
		<!-- /.demo-content -->
	</div>
	<!-- /.demo-row -->
</div>
<!-- /.container -->

