/**
 * 16.11.29 boramkim
 */
	
angular.module('ciderApp', [])
	.controller('EntryController', ['$scope', '$http', function($scope, $http) {
		
		$scope.update = function(entry) {
			
			$scope.entryForm.entry_melody.$valid = false;
			
			if( /(\S{2,3}[,]){4}\S{2,3}/.test($('input[name="entry_melody"]').attr('value'))) {
				
				if ( $scope.entryForm.entry_name.$valid && $scope.entryForm.entry_email.$valid ) {
					$scope.entryForm.$valid = true;
					entry.entry_melody = $('input[name="entry_melody"]').attr('value');
				}
			}
    	};
    	
    	
    	$scope.submitForm = function(entry, entryForm){
    		
    		if ( entryForm.$valid ) {
    			
    			var entryData = {
    					"entry_name" : entry.entry_name,
    					"entry_email" : entry.entry_email,
    					"entry_melody" : entry.entry_melody
    			};
    			
    			
    			$.ajax({
					method : 'post',
					url : '/cider/email',
					dataType : 'json',
					data:entryData,
					success : function(data){
						var emailValidation = data; // 이메일 존재유무, 0 은 없음 1은 존재
						
						if ( emailValidation == '0' ){
							$.ajax({
								method : 'post',
								url : '/cider/entry',
								dataType : 'json',
								data : entryData,
								complete : function(){
									errorMassage(entryData["entry_name"] + '님 응모되었습니당 >_<');
								}
							});
						} else {
							errorMassage( entry.entry_email + ' 은 \n 이미 응모한 메일입니다');
						}
					}
				});
    			
			} else {
				
				var errorText = ''; // 에러문
				
				if ( !$scope.entryForm.entry_name.$valid ) {
					errorText += '이름';
				}
				
				if ( !$scope.entryForm.entry_email.$valid ) {
					if ( errorText != '' ) {
						errorText += ', ';
					}
					errorText += '이메일 ';
				}
				
				if ( !/(\S{2,3}[,]){4}\S{2,3}/.test($('input[name="entry_melody"]').attr('value')) ) {
					if ( errorText != '' ) {
						errorText += ', ';
					}
					errorText += '멜로디';
				}
				
				errorMassage(errorText + '를 확인해주세요!!');
			}
    	}
}]);
 

$(function() {
	
	$('#entryBtn').click(function(e){
		e.stopPropagation();
		e.preventDefault();
		e.stopImmediatePropagation();
	});
	
});


// 알림창
var errorMassage = function(errorText){

	var addBox = '<div><p>'; // 에러 찍힐 박스
	addBox += errorText + '</p></div>';
	
	$('#content').after(addBox);
	$('#content + div').addClass('errorBox');
	
	$('.errorBox').css('top', $(window).scrollTop() - ($('.errorBox').outerHeight() - $(window).height())/2 - 100);
	$('.errorBox').css('left', $(window).width()/2 - $('.errorBox').outerWidth()/2);
	
	$('.errorBox').delay(3000).fadeOut('slow', function(){
		$(this).remove();
	});
}