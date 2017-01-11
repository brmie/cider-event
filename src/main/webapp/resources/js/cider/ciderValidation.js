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
					url : '/cider/entry',
					dataType : 'json',
					data : entryData,
					success : function(data){
						alert(data.entry_name + '님 응모되었습니당>_<');
					},
					error : function(){
						alert('에러맨...');
					}
				});
    			
//    			$('#entryForm').find('form')[0].submit();
			} else {
				
				var errorText = '';
				var addBox = '<div><p>';
				
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
				
				addBox += errorText + '를 확인해주세요!!' + '</p></div>';
				
				$('#content').after(addBox);
				$('#content + div').addClass('errorBox');
				
				$('.errorBox').css('top', $(window).scrollTop() - ($('.errorBox').outerHeight() - $(window).height())/2 - 100);
				$('.errorBox').css('left', $(window).width()/2 - $('.errorBox').outerWidth()/2);
				
				$('.errorBox').delay(1000).fadeOut('slow', function(){
					$(this).remove();
				});
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