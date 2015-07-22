var aImg = document.getElementById('section').getElementsByTagName('img');
var aComputerImg = document.getElementById('computer').getElementsByTagName('img');
var count = 0;
for(var i=0; i<aImg.length; i++){
	aImg[i].index = i;
	aImg[i].onclick = function(){
		for(var i=0; i<aImg.length; i++){
			aImg[i].style.display = "none";
		}
		aImg[this.index].style.display = "inline-block";
		var peopleNum = this.index;

		//电脑随机出招
		var string = "0,1,2";
		var array = string.split(",");
		var computerNum = array[Math.round(Math.random()*(array.length - 1))];
		show(computerNum);
		if(peopleNum == computerNum){
			result("平局");
		}else if(peopleNum > computerNum && peopleNum - computerNum != 2){
			result("YOU WIN!");
			count++;
		}else if(peopleNum - computerNum == -2){
			result("YOU WIN!");
			count++;
		}else{
			result("YOU LOSE!");
		}
		document.getElementById('count').innerHTML = count;
		document.getElementById('count').style.color = "red";
	};
}

//电脑的图片显示方法
function show(num){
	aComputerImg[num].style.display = "inline-block";
}

//游戏结果
function result(txt){
	document.getElementById('content').innerHTML = txt;
	// var contentP = document.createElement('p');
	// var newContent = document.createTextNode(txt);
	// contentP.appendChild(newContent);
	// var element = document.getElementById('img-area');
	// element.appendChild(contentP);
}

//再来一局
var oAgain = document.getElementById('again');
oAgain.onclick = function(){
	for(var i=0; i<aImg.length; i++){
		aImg[i].style.display = "inline-block";
		aComputerImg[i].style.display = "none";
	}
	result("");
}