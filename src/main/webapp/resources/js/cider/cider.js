/**
 * 16.11.29 boramkim
 */

var keyboardNavWidth;
var keyboardWidth;
var multiNum;

$(function() {
	
	keyboardNavWidth = eval($('#keyboardNav').css('width').replace('px', ''));
	keyboardWidth = eval($('#keyboardBigImg').css('width').replace('px', ''));
	multiNum = keyboardWidth/keyboardNavWidth+0.095; // 큰 건반과 작은 건반의 비율

	focusingPiano();
	
	// 피아노 네비게이션 드래그
	$('#pointer').draggable(
			{
				containment : "#keyboardNav",
				scroll : false,
				start : function() {
					$('#pointerInfo').fadeOut('slow');
				},
				drag : function() {
					focusingPiano();
				}
			}
	)
	
	// 포인터 클릭시 네이게이션 반응 없게
	$('#pointer, #shape').click(function(e){
		e.stopPropagation();
	})
	
	// 피아노 네비게이션 클릭
	var pointerWidth = $('#pointer').css('width').substr(0, $('#pointer').css('width').indexOf('px'));
	
	$('#keyboardNav').click(function(e){
		var x = e.offsetX; // 클릭한 위치의 x좌표
		var p = pointerWidth/2; // 포인터범위
		var result;
		
		if(x>p && x<keyboardNavWidth-p){
			result = e.offsetX-pointerWidth/2;
		} else if (x<p) {
			result = 0;
		} else if (x>keyboardNavWidth-p) {
			result = keyboardNavWidth-pointerWidth;
		}
		
		// 포인터 위치 설정
		$('#pointer').css('left', result);
		focusingPiano();
	});
	
	
	// 피아노 건반 눌렀을때
	var result; // 받아온 값
	var song = []; // 노래가 저장될 배열
	var songJSON;
	$('#keyboardBigImg').unbind('mousedown').mousedown(function(e){
		//마우스 클릭 중일때
		
		result = bangOnThePianoKey(e);
		
		// 눌릴때 색깔 효과
		$('#shape').fadeIn(10);
		$('#shape').attr('class', result["addClassName"]);
		$('#shape').css('left', result["startX"]);
		
		// 소리재생
		$('#nowClickSound').attr('src', '/resources/sound/'+result["nowSound"]+'.mp3');
		$('#nowClickSound')[0].play(); // Html DOM Object 파일을 제어하기 위해
		
	}).unbind('mouseup').mouseup(function(e){
		// 마우스 클릭에서 뗄 때
		e.stopPropagation();
		e.preventDefault();
		e.stopImmediatePropagation();
		
		// 효과 다시 없애기
		$('#shape').fadeOut(100);
		
		var noteLength = $('.note').length;
		
		// 음표 5개만 찍히게
		if(noteLength<5){
			
			// 음표추가
			var text = ['칠', '성', '사', '이', '다'];
			var classText = ['cil', 'sung', 'sa', 'ee', 'da'];
			var scaleArr = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
			var addNote ='<div>'+ result["nowSound"];
			
			if(result["sharp"]){
				addNote += '<div>#</div>';
			}
			
			// 오선지 넘어갔을때의 라인 추가
			if ((result["octave"]==4 && result["scale"]=='c')
				|| (result["octave"]==5 && result["scale"].match(/[ab]/))
				|| (result["octave"]<4 || result["octave"]>5)) {
				
				addNote += '<div></div></div>';
			}

			$('#notes').append(addNote);
			
			// 동적으로 생성된 음표들에 css적용되게 클래스 추가
			$('#notes').children('div').each(function(index, item){
				var addClassName = 'note ' + classText[index];
				
				if ( noteLength == index ){
					// 음표 꼬리를 올릴지 내릴지
					if ( (result["octave"] == 4 && result["scale"] == 'b') || (result["octave"]>4) ) {
						addClassName += ' down';
					}
					
					$(this).addClass(addClassName).attr('data-content', text[index]);
					
					// # 이나 오선지 넘어갔을때의 라인  클래스 추가
					$(this).children('div').each(function(i, d){
						if($(this).html()=='#'){
							$(this).addClass('sharp');
						} else {
							
							// 기본 라인은 가운데
							$(this).addClass('line');
							
							// 라인 위아래 결정
							if( (result["octave"] == 5 && result["scale"] == 'b') ||
								(result["octave"] == 6 && result["scale"].match(/[dfa]/)) ||
								(result["octave"] == 7 && result["scale"].match(/[cegb]/))
							){
								// 라인이 머리보다 아래로 들어갈 칭구들
								$(this).addClass('line under');
							} else if( ( (result["octave"] == 3 || result["octave"] == 1 ) && result["scale"].match(/[cegb]/)) ||
									(result["octave"] == 2 && result["scale"].match(/[dfa]/)) ||
									(result["octave"] == 0 && result["scale"]=='a')
								){
								// 라인이 머리보다 아래로 들어갈 칭구들
									$(this).addClass('line upper');
							}
						}
					});
					
					//칠성사이다 각각 y값 차이
					var octaveTop = eval($('.'+classText[index]).eq(0).css('top').replace('px', ''));
					
					// 음별 높이 설정
					var num; // 음마다 top 위치 차이가 다른것을 적용해줄 변수
					
					if ( classText[index] == 'cil' ){
						num = 11;
					} else if ( classText[index] == 'sung' ){
						num = 13;
					} else if ( classText[index] == 'sa' ){
						num = 15;
					} else if ( classText[index] == 'ee' ){
						num = 14;
					} else if ( classText[index] == 'da' ){
						num = 11;
					}
					
					//음별 높이
					var scaleTop = jQuery.inArray(result["scale"], scaleArr)*num;
					
					// 음표 위치 설정
					var noteTop = 540-78*(result["octave"]+1) + octaveTop - scaleTop;
					
					$('.note').eq(index).css('top', noteTop+'px');
				}
			});
			
			// DB에 저장하기 위해 배열에 담는다
			song.push(result["nowSound"]);
			$('input[name="entry_melody"]').attr('value', song);
			
		}
	}); // close mouseup function
	
	
	// 악보(noteBox) 클릭시 음원재생
	$('#noteBox').click(function(e){
		
		// 소리재생
		var i = 0; // 배열의 index 
		$('#allSound').attr('src', '/resources/sound/'+song[i]+'.mp3');
		
		$('#allSound')[0].play();
		$('#allSound')[0].addEventListener("ended", function() {
			i++;
			if(i<5){
				$('#allSound').attr('src', '/resources/sound/'+song[i]+'.mp3');
				$('#allSound')[0].play();
			}
		});
	});
	
	$('.inputGroup .inputInfo').click(function(){
		$(this).parents().children('input')[0].focus();
	});
	
});


// 피아노 포커싱
var focusingPiano = function(){
	var pointerLeft = $('#pointer').css('left');
	var pointerLeftSize = pointerLeft.substr(0, pointerLeft.indexOf('px'));
	
	$('#keyboardBigImg').css('left', -pointerLeftSize*multiNum);
}


// 건반 누르기 ~~
var bangOnThePianoKey = function(e){
//  흰건반 가로 57px / 세로 230px  //  검은건반 가로 34px / 세로 134px
	
	var x = e.offsetX; // 클릭한 위치의 x좌표
	var y = e.offsetY; // 클릭한 위치의 y좌표
	
	var n = Math.ceil(x/57) % 7; //계이름을 판단할 값. 
	// 클릭값을 건반의 가로값으로 나누고 올림하여 다시 도~시(7)로 나눈 나머지
	
	var m = x%57;
	
	var scale; // 계이름이 담길 변수. #이 붙으면 흑건반
	var octave = Math.ceil(Math.ceil(x/57)/7); // 몇 옥타브인지
	var addName = 'white'; // 추가될 클래스 명
	var sharp = false; // #이 붙는지 안붙는지
	
	var nowSound; // 눌린 건반의 정보
	
	var startX; // 눌릴 건반의 시작 x값
	
	var q;// 현재 계이름
	var bn = 0; // '도'를 기준으로 한 검은건반의 시작값
	
	if (n==1){
		scale='a';
		octave += -1;
		if(y<=134){
			if(m<=17){
				scale='g#';
				bn = 269;
				addName = 'black';
				sharp = true;
			} else if(m>=45){
				scale='a#';
				bn = 332;
				addName = 'black';
				sharp = true;
			}
		}
	} else if (n==2){
		scale='b';
		octave += -1;
		if(y<=134 && m<=22){
			scale='a#';
			bn = 332;
			addName = 'black';
			sharp = true;
		}
	} else if (n==3){
		scale='c';
		if(y<=134 && m>=33){
			scale='c#';
			bn = 34;
			addName = 'black';
			sharp = true;
		}
	} else if (n==4){
		scale='d';
		if(y<=134){
			if(m<=11){
				scale='c#';
				bn = 34;
				addName = 'black';
				sharp = true;
			} else if(m>=45){
				scale='d#';
				bn = 103;
				addName = 'black';
				sharp = true;
			}
		}
	} else if (n==5){
		scale='e';
		if(y<=134 && m<=24){
			scale='d#';
			bn = 103;
			addName = 'black';
			sharp = true;
		}
	} else if (n==6){
		scale='f';
		if(y<=134 && m>=33){
			scale='f#';
			bn = 206;
			addName = 'black';
			sharp = true;
		}
	} else if (n==0){
		scale='g';
		if(y<=134){
			if(m<=11){
				scale='f#';
				bn = 206;
				addName = 'black';
				sharp = true;
			} else if(m>=40){
				scale='g#';
				bn = 269;
				addName = 'black';
				sharp = true;
			}
		}
	}
	
	nowSound = scale + octave;
	
	// - - - - - 건반 클릭 효과 - - - - - //
	
	var k; // 옥타브 라0부터 시작 도는 1 부터라서
	
	if(n<3){
		k=1;
	} else {
		k=2;
	}
	
	// 눌릴 건반의 시작 x값
	startX = (octave-k) * 57 * 7 + 57*(n+6);
	
	q = scale.substr(0,1); // 현재 계명 #빼고
	
	if(scale.indexOf('#')>0){
		//흑건반이면
		startX = (octave-1) * 57 * 7 + 57*2; // '도' 시작 위치
		startX += bn; // 각 옥타브의 '도'를 기준으로 검은건반의 시작값을 더한다
	} else {
		//백건반이면
		addName += ' '+scale; 
	}
	
	nowSound = nowSound.replace('#', 's'); // 소리파일에서는 샵을 s로 표기했기때문

	var result; // json 값으로 리턴
	result = {
			"addClassName" : addName,
			"startX" : startX,
			"nowSound" : nowSound,
			"octave" : octave,
			"scale" : q,
			"sharp" : sharp
			};
	
	return result;
}