<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- Import -->
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script> 


<!-- Customise -->
<link rel="stylesheet" href="/resources/css/common.css">
<script type="text/javascript" src="/resources/js/common.js"></script>

<title>Cider Event</title>
</head>
<body>
	<header>
		<tiles:insertAttribute name="header"/>
	</header>
	<article>
		<tiles:insertAttribute name="content"/>
	</article>
	<footer>
		<tiles:insertAttribute name="footer"/>
	</footer>
</body>
</html>