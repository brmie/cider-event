<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<link rel="stylesheet" href="/resources/css/cider/winner.css">

<div id="content">
	
	<div class="content">
		<div class="titleBox">
			<span class="eventSubTitle">당첨자분들입니다 : )</span>
		</div>
		
		<div class="clear"></div>
		
		<div id="entryList">
			<c:if test="${winners.size() == 0 }">
				<span class="emptyTitle">아직 당첨자 발표기간이 아닙니다 ㅠoㅠ</span>
			</c:if>
			<c:forEach var="winner" items="${winners }">
				<div class="winnerItem">
					<p class="entry-winner">
						<c:choose>
							<c:when test="${winner.entry_winner == 1 }">당선작</c:when>
							<c:when test="${winner.entry_winner == 2 }">우수상</c:when>
							<c:when test="${winner.entry_winner == 3 }">장려상</c:when>
							<c:otherwise> hoho </c:otherwise>
						</c:choose>
					</p>
					<p class="entry-name">${winner.entry_name }</p>
					<p class="entry-email">${winner.entry_email }</p>
					<p class="entry-date"><fmt:formatDate pattern="yy-MM-dd, hh:mm:ss" value="${winner.entry_date }"/></p>
				</div>
			</c:forEach>
		</div>	
	</div>
</div>
