/**
 * 16.11.29 boramkim
 */
	
angular.module('ciderApp', [])
	.controller('EntryController', ['$scope', '$http', function($scope, $http) {
		
//		$scope.master = {entry_name:"", entry_eamil:"", entry_melody:""};
//		
//		$scope.reset = function() {
//	        $scope.entry = angular.copy($scope.master);
//	    };
		
		$scope.update = function(entry) {
			
			$scope.entryForm.entry_melody.$valid = false;
			
			if( /(\S{2,3}[,]){4}\S{2,3}/.test($('input[name="entry_melody"]').attr('value'))) {
				
				if ( $scope.entryForm.entry_name.$valid && $scope.entryForm.entry_email.$valid ) {
					$scope.entryForm.$valid = true;
					entry.entry_melody = $('input[name="entry_melody"]').attr('value');
				}
			}
    	};
    	
    	$scope.entryAjax = function(entryData, entryForm){
    		// entry ajax
			console.log(
					'in entryAjax ' + entryData['entry_name'] + 
					' / in entryAjax ' + entryData['entry_email'] + 
					' / in entryAjax ' + entryData['entry_melody']
			);
			/* 성공적으로 결과 데이터가 넘어 왔을 때 처리 */
			$http({
				method: 'POST', //방식
				url: '/cider/entry', /* 통신할 URL */
				data: $.param(entryData), /* 파라메터로 보낼 데이터 */
				headers: {
			        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			    } //헤더
			})
			.success(function(data, status, headers, config) {
				popMessage(entryData["entry_name"] + '님 응모되었습니당 >_<');
				location.reload();
				
//				$scope.reset(entryForm);
				
				// 리다이렉트 할 방법을 찾아오시오. 너의 미쑌
				
//				$http({
//    			    method: 'get' ,
//    			    url: '/cider/entry',
//    			    headers: {
//    			        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//    			    }
//    			})
				
				
			})
			.error(function(data, status, headers, config) {
				/* 서버와의 연결이 정상적이지 않을 때 처리 */
				console.log('status : ' + status);
			});
    	}
    	
    	
    	$scope.submitForm = function(entry, entryForm){
    		
    		if ( entryForm.$valid ) {
    			
    			var entryData = {
    					"entry_name" : entry.entry_name,
    					"entry_email" : entry.entry_email,
    					"entry_melody" : entry.entry_melody
    			};
    			
    			
    			$http({
    			    method: 'POST' ,
    			    url: '/cider/email',
    			    data: $.param(entryData), // angular 에서 데이터 전송시 $.param을 통해 직렬화를 해주어야한다
    			    headers: {
    			        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    			    }
    			}).success(function(data) {
    				var email_check = data.email_check; // 이메일 존재유무, 0 은 없음 1은 존재
    			    console.log('data : ' + email_check);
    			    if(email_check == '0' ) {
    			    	$scope.entryAjax(entryData, entryForm);
    			    } else {
    					popMessage( entry.entry_email + ' 은 \n 이미 응모한 메일입니다');
        			}
    			}).error(function(data, status, headers, config) {
    				console.log(data);
    				console.log(status);
    				console.log(headers);
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
				
				popMessage(errorText + '를 확인해주세요!!');
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
var popMessage = function(errorText){

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

