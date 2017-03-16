<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<link rel="stylesheet" href="/resources/css/cider/ciderAdmin.css">
<script type="text/javascript" src="/resources/js/cider/ciderAdmin.js"></script>

<div id="content">
	
	<div class="content">
		<div class="titleBox">
			<span class="eventSubTitle">관리자를 위한 페이지입니다 : )</span>
		</div>
		
		<div class="clear"></div>
		
		<div id="entryList">
		
			<audio id="allSound" src=""></audio>
			
			<c:if test="${entries.size() == 0 }">
				<span class="emptyTitle">아직 아무도 응모하지 않았어요 ㅠoㅠ</span>
			</c:if>
			
			<c:forEach var="entry" items="${entries }">
				<div class="entryItem">
					<p class="entry-no">${entry.entry_no }</p>
					<p class="entry-name">${entry.entry_name }</p>
					<p class="entry-email">${entry.entry_email }</p>
					<p class="entry-date"><fmt:formatDate pattern="yy-MM-dd, hh:mm:ss" value="${entry.entry_date }"/></p>
				</div>
			</c:forEach>
		</div>	
	</div>
</div>
