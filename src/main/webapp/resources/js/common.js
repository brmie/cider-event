/**
 * 16.11.29 boramkim
 */

$(function() {
	// 메뉴 포커싱
	var curPath = location.pathname.split('/')[1];
	
	$('#menu li a').each(function(index, item) {
		if ($(this).attr('href') == '/' + curPath) {
			$(this).addClass('menuOn')
		}
	})
	
	var minHight = $(window).height() - $('header').innerHeight() - $('footer').innerHeight();
	$('article').css('min-height', minHight);
})
