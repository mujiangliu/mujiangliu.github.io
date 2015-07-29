$(function(){
	setInterval(function(){
		$(".more").animate({'margin-top': '200px'}, 500,function(){
			$(".more-up").fadeOut(500,function(){
				$(".more").animate({'margin-top': '180px'},500,function(){
					$(".more-up").fadeIn(2000);
				});
			});
		});
	},3500);

	$(".more-up").on('click',function(){
		$('html,body').animate({scrollTop: '750px'}, 800);
	});

	$('#goTop').hide();
	$(window).scroll(function(){
		var $wH = $(window).scrollTop();
		if($wH >= 500){
			$('#goTop').show();
		}else{
			$('#goTop').hide();
		}
	});

	$('.gotop').on('click',function(){
		$('html,body').animate({scrollTop:'0px'},1000);
	});
	$('button').on('click',function(){
		window.location.href = "https://github.com/mujiangliu";
	});
});