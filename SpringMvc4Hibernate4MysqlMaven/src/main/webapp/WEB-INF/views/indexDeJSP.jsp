<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Home</title>
    </head>
    <body>
        <div align="center">
	        <h1>Contact List</h1>
        	<table border="1">
	        	<th>No</th>
	        	<th>Username</th>
	        	<th>Email</th>
	        	
				<c:forEach var="user" items="${userList}" varStatus="status">
	        	<tr>
	        		<td>${status.index + 1}</td>
					<td>${user.username}</td>
					<td>${user.email}</td>
							
	        	</tr>
				</c:forEach>	        	
        	</table>
        </div>
        
    </body>
</html>



<html lang="en" ng-app="AngularSpringApp">
<head>
    <meta charset="utf-8">
    <title>CloudSole Angular</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Loading Bootstrap -->
    <link href="resources/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="resources/bootstrap/css/prettify.css" rel="stylesheet">
    <link src="resources/css/ng-table.min.css" rel="stylesheet">

    <!-- Loading Flat UI -->
    <link href="resources/css/flat-ui.css" rel="stylesheet">
    <link href="resources/css/docs.css" rel="stylesheet">

    <link href="resources/css/nv.d3.min.css" rel="stylesheet">

</head>
<body>
<div id="wrapper">

    <ul class="demo-sidebar hide-on-tablets">
        <li><a href="#/todo">Todo List</a></li>
        <li><a href="#/address">Address Book</a></li>
        <li><a href="#/table">Dynamic Table</a></li>
        <li><a href="#/tabs">Dynamic Tabs</a></li>
        <li><a href="#/file">File Upload</a></li>
        <li><a href="#/editor">Ace Editor</a></li>
        <li><a href="#/restangular">Restangular</a></li>
        <li><a href="#/d3">D3 Chart</a></li>
        <li><a href="#/force">Force.com</a></li>
        <li><a href="#/postgres">Postgres Angular</a></li>
        <li><a href="#/mongo">Mongo Angular</a></li>
        <li><a href="#/redis">Redis Angular</a></li>
    </ul>

    <h1 class="demo-headline">AngularJS</h1>
    <div ng-view></div>

</div>

<script src="resources/js/jquery-1.8.3.min.js"></script>
<script src="resources/js/jquery-ui-1.10.3.custom.min.js"></script>
<script src="resources/js/jquery.ui.touch-punch.min.js"></script>
<script src="resources/js/bootstrap.min.js"></script>
<script src="resources/js/bootstrap-select.js"></script>
<script src="resources/js/bootstrap-switch.js"></script>
<script src="resources/js/flatui-checkbox.js"></script>
<script src="resources/js/flatui-radio.js"></script>
<script src="resources/js/jquery.tagsinput.js"></script>
<script src="resources/js/jquery.placeholder.js"></script>
<script src="resources/js/typeahead.js"></script>
<script src="resources/bootstrap/js/google-code-prettify/prettify.js"></script>
<script src="resources/js/application.js"></script>
<script src="resources/js/lib/angular/angular-file-upload-shim.min.js"></script>


<script src="resources/js/lib/angular/angular.min.js"></script>
<script src="resources/js/lib/angular/angular-route.min.js"></script>
<script src="resources/js/lib/angular/ui-bootstrap-tpls-0.11.0.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js"></script>
<script src="resources/js/lib/angular/ui-ace.min.js"></script>
<script src="resources/js/lib/angular/ng-table.min.js"></script>

<script src="resources/js/lib/angular/angular-file-upload.min.js"></script>

<script src="resources/js/d3.min.js"></script>
<script src="resources/js/nv.d3.js"></script>
<script src="resources/js/lib/angular/angularjs-nvd3-directives.min.js"></script>

<script src="resources/js/app.js"></script>
<script src="resources/js/services.js"></script>
<script src="resources/js/controllers/TodoController.js"></script>
<script src="resources/js/controllers/AddressBookController.js"></script>
<script src="resources/js/controllers/TableController.js"></script>
<script src="resources/js/controllers/FileController.js"></script>
<script src="resources/js/controllers/EditorController.js"></script>
<script src="resources/js/controllers/RestController.js"></script>
<script src="resources/js/controllers/ForceController.js"></script>
<script src="resources/js/controllers/D3Controller.js"></script>
<script src="resources/js/controllers/TabsController.js"></script>
<script src="resources/js/filters.js"></script>
<script src="resources/js/directives.js"></script>


<script src="resources/js/lib/angular/restangular.min.js"></script>
</body>
</html>

