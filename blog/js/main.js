var runPage;
runPage = new FullPage({
	id: 'pageContain',
	slideTime: 800,
	effect: {
		transform: {
			translate: 'Y',
			scale: [1, 1],
			rotate: [0, 0]
		},
		opacity: [1, 1]
	},
	mode: 'wheel,touch,nav:navBar',
	easing: 'ease'
});


$(function(){
	//回到最顶部
	$(".goTop").hide();
	$(".goTop").on("click",function(){
				runPage.go(0);
				if(runPage.thisPage() == 0){
					$(".goTop").hide();
				}
			});
	//点击下一页按钮绑定事件
	var $goNext = $(".next").on("click",function(){
		//num值＝当前页＋1
		var num = runPage.thisPage() + 1;
		//去到第num页
		runPage.go(num);
		//如果num等于数组goNext的长度，num归0，回到最顶部
		if(num == $goNext.length){
			num = 0;
			runPage.go(num);
		}
		//如果当前页面大于2小于6，展示回到顶部按钮；反之则隐藏
		if(runPage.thisPage() > 2 && runPage.thisPage() < 6){
			$(".goTop").show();
		}else{
			$(".goTop").hide();
		};
	});
	//点击小圆点绑定事件
	$('#navBar li').on("click",function(){
		//如果当前页面大于2小于5，展示回到顶部按钮；反之则隐藏
		if(runPage.thisPage() > 2 && runPage.thisPage() < 6){
			$(".goTop").show();
		}else{
			$(".goTop").hide();
		};
	});

	//定时器
	interval = setInterval(function(){
		if(runPage.thisPage() > 1 && runPage.thisPage() < 5){
			$(".goTop").show();
		}else{
			$(".goTop").hide();
		};
		var count = runPage.thisPage();
		// alert($goNext.length);
		if (count >= $goNext.length - 1) {
			runPage.go(0);
		}else{
			runPage.go(runPage.thisPage() + 1);
		};
	},2000);
});