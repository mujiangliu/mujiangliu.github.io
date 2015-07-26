// $(function(){
// 	$(.img).on("click",function(){
// 		$(.img).animate({
			
// 		},1000);
// 	});
// });
// 
// 
var total = 17;
var zWin = $(window);
var render = function(){
	var padding = 2;
	var winWidth = zWin.width();
	var picWidth = Math.floor((winWidth - padding * 3)/4);
	var tmpl = '';
	for(var i = 1; i <= total; i++){
		var p = padding;
		var imgSrc = 'images/' + i + '.jpg';
		if (i%4 == 1) {
			p = 0;
		}
		tmpl += '<li data-id="'+ i +'" class="animated bounceIn" style="width:' + picWidth + 'px;height:' + picWidth + 'px;padding-left:' + p + 'px;padding-top:' + padding + 'px;"><canvas id="cvs_' + i
		+'"></canvas></li>';
		var imageObj = new Image();
		imageObj.index = i;
		imageObj.onload = function(){
			var cvs = $('#cvs_' + this.index)[0].getContext('2d');
			cvs.width = this.width;
			cvs.height = this.height;
			cvs.drawImage(this,0,0);
		}
		imageObj.src = imgSrc;
	}
	$('#container').html(tmpl);
}
render();
var wImg = $('#large_img');
var loadImg = function(id){
	$('#large_container').css({
		width:zWin.width(),
		height:zWin.height()
	}).show();
	var imgsrc = 'images/' + id + '.jpg';
	var imageObj = new Image();
	imageObj.onload = function(){
		var w = this.width;
		var h = this.height;
		var winWidth = zWin.width();
		var winHeight = zWin.height();
		var realw = winHeight * w / h;
		var paddingLeft = parseInt((winWidth - realw) / 2);
		var realh = winWidth * h / w;
		var paddingTop = parseInt((winHeight - realh) / 2);
		wImg.css('width','auto').css('height','auto');
		wImg.css('padding-left','0px').css('padding-top','0px');
		if(h/w > 1.2){
			
			wImg.attr('src',imgsrc).css('height',winHeight).css('padding-left',paddingLeft);
		}else{
			wImg.attr('src',imgsrc).css('width',winWidth).css('padding-top',paddingTop);
		}
	}
	imageObj.src = imgsrc;
}
var cid;
$('#container').delegate('li','tap',function(){
	var _id = cid = $(this).attr('data-id');
	loadImg(_id);
});
$('#large_container').tap(function(){
	$(this).hide();
}).swipeLeft(function(){
	cid++;
	if (cid > total) {
		cid = total
	}else{
		loadImg(cid);
	};
}).swipeRight(function(){
	cid--;
	if (cid < 1) {
		cid = 1;
	}else{
		loadImg(cid);
	};
});