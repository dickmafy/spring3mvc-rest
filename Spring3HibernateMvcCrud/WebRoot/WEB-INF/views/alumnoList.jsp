<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>All alumnos</title>
</head>
<body>
<h1>List alumnos</h1>
<h3><a href="dni/123.html">Add More alumnos</a></h3>

<c:if test="${!empty alumnos}">
	<table align="left" border="1">
		<tr>
			<th>alumnos ID</th>
			<th>alumnos Name</th>
			<th>alumnos Age</th>
			<th>alumnos Salary</th>
			<th>alumnos Address</th>
		</tr>

		<c:forEach items="${alumnos}" var="item">
			<tr>
				<td><c:out value="${item.id}"/></td>
				<td><c:out value="${item.nombre}"/></td>
				<td><c:out value="${item.apellidos}"/></td>
				<td><c:out value="${item.direccion}"/></td>
				<td><c:out value="${item.dni}"/></td>
				
				
			</tr>
		</c:forEach>
	</table>
</c:if>
</body>
</html>