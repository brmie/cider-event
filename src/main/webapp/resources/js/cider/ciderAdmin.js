/**
 * 16.11.29 boramkim
 */

$(function() {
	
	// 응모글 클릭시 음원재생
	$('.entryItem').on('mousedown', function(){
		
		var $thisItem = $(this); // 클릭한 응모글
		$thisItem.css('backgroundColor', '#eee');
		$thisItem.prepend('<div class="playing"></div>');
		
		var song = [];
		var entry_no = $('p.entry-no', this).html(); // 클릭한것의 entry_no
		
		$.ajax({
			type:"GET",
			url:"/cider/play/" + entry_no,
			success: function(data){
				
				// 뱓아온 멜로디를 배열에 담는다
				var song = data.split(',');
				
				// 소리재생
				var i = 0; // 배열의 index 
				$('#allSound').attr('src', '/resources/sound/'+song[i]+'.mp3');
				
				$('#allSound')[0].play();
				$('#allSound')[0].addEventListener("ended", function() {
					i++;
					
					if(i<5){
						$('#allSound').attr('src', '/resources/sound/'+song[i]+'.mp3');
						$('#allSound')[0].play();
					} else if ( i == 5 ){
						// 소리 재생 끝나면 색 원상복귀
						$thisItem.css('backgroundColor', '#fff');
						$thisItem.children('div.playing').remove();
					}
				});
			} // end success
		}) // end ajax
	});
});