<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/css/cider/cider.css">
<script type="text/javascript" src="/resources/js/cider/cider.js"></script>
<script type="text/javascript" src="/resources/js/cider/ciderValidation.js"></script>

<div id="content">
	
	<div id="content1" class="content">
		<div class="titleBox">
			
			<div id="toctocs">
				<div class="toctoc toctoc1" id="toctoc1"></div>
				<div class="toctoc toctoc4" id="toctoc2"></div>
				<div class="toctoc toctoc2 tocsmall" id="toctoc3"></div>
				<div class="toctoc toctoc1 tocsmall" id="toctoc4"></div>
				<div class="toctoc toctoc4" id="toctoc5"></div>
				<div class="toctoc toctoc2 tocsmall" id="toctoc6"></div>
				<div class="toctoc toctoc2 tocsmall" id="toctoc7"></div>
				<div class="toctoc toctoc3" id="toctoc8"></div>
				<div class="toctoc toctoc3 tocsmall" id="toctoc9"></div>
				<div class="toctoc toctoc2 tocsmall" id="toctoc10"></div>
			</div>
			
			<img id="ciderLogo" alt="Cider Logo" src="/resources/img/ciderLogo.png">
			<div class="clear"></div>
			<img id="starIcon" alt="Star Icon" src="/resources/img/starIcon.png">
			<h1 class="eventTitle">칠성사이다<span class="point">멜로디 메이킹</span>이벤트</h1>
			<span class="eventSubTitle">칠성사이다만의 멜로디를 만들어주세요!</span>
			
		</div>
		
		<div id="infoBox"></div>
		
		<div class="clear"></div>
		<div id="noteBox">
			<div id="notes"></div>
			<audio id="nowClickSound" src=""></audio>
			<audio id="allSound" src=""></audio>
		</div>
		
		
		<div class="clear"></div>
				
		<div id="pianoContent" ng-app="ciderApp">
			<div id="keyboardBig">
				<div id="keyboardBigImg"><div id="shape"></div></div>
			</div>
			
			<div id="keyboardNav">
				<div id="pointer"><div id="pointerInfo">좌우로 움직여보세요!</div></div>
			</div>
			
			<div id="entryForm" ng-controller="EntryController">
				<form name="entryForm" novalidate >
					
					<div class="inputGroup">
						<label for="entry_name"><span>이 름</span></label>
						<span class="inputInfo noselect" ng-show="entryForm.entry_name.$error.pattern || entryForm.entry_name.$error.required">한글 2~6자 / 영문 2~12자!</span>
						<input type="text" name="entry_name" ng-model="entry.entry_name" ng-pattern="/^[가-힣]{2,6}$|^[A-Za-z]{2,12}$/" ng-required="true" required="required">
					</div>
					
					<div class="inputGroup">
						<label for="entry_email"><span>이메일</span></label>
						<span class="inputInfo noselect" ng-show="entryForm.entry_email.$error.pattern || entryForm.entry_email.$error.required">ex) test@test.com</span>
						<input type="email" name="entry_email" ng-model="entry.entry_email" ng-pattern="/^[A-Za-z0-9._%+-]+[@][A-Za-z0-9]+[.][A-Za-z]{2,4}$/" ng-required="true">
					</div>
					
					<input type="text" name="entry_melody" ng-model="entry.entry_melody" ng-required="true" required="required" class="ng-hide">
					
					<input id="entryBtn" type="submit" ng-mousedown="update(entry)"  ng-mouseup="submitForm(entry, entryForm)" value="">
				</form>
			</div>
		</div>
		
		<div class="clear"></div>
		
		<div id="entryMethod">
			<h2 class="subTitle">응모방법</h2>
			<div id="entryMethodContent"></div>
		</div>
	</div>
	
	<div id="content2" class="content">
		<div class="titleBox">
			<img id="starIcon" alt="Star Icon" src="/resources/img/starIcon.png">
			<div class="clear"></div>
			<span class="eventSubTitle">맑고 깨끗한 멜로디를 추천해주신</span>
			<h1 class="eventTitle">여러분께 드리는<span class="point">특별한 선물!</span></h1>
		</div>
			
		<div id="giveaway">
		</div>
		<div id="notice">
			<h2 class="subTitle">유의사항</h2>
			<ul id="noticeContent">
				<li>본 이벤트는 2016년 12월 1일부터 2016년 12월 31일 까지 진행됩니다.</li>
				<li>당선자 발표와 경품에 관한 정보는 추후 '이벤트발표' 게시판에 공지됩니다.</li>
				<li>개인정보 오입력에 의한 경품 미수령 시, 재지급은 불가능합니다.</li>
			</ul>
		</div>
	</div>
</div>
