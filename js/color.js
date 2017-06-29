var aud = document.getElementById('aud');
var imgstop = document.getElementById('playpause');
var imgpre = document.getElementById('pre');
var imgnext = document.getElementById('next');
var img = document.getElementsByTagName('img');
var n = 0;
var volumn = document.getElementById('vol');
var volvalue = 1;
volumn.addEventListener("mousedown", function() {
	if(volvalue) {
		volvalue = 0;
		volumn.src = "img/novol.svg";
		aud.volume = 0;
	} else {
		volvalue = 1;
		volumn.src = "img/vol.svg";
		aud.volume = 1;
	}
})

imgstop.onclick = function() {
	if(aud.paused) {
		aud.play();
	} else {
		aud.pause();
	}
}
var content=document.getElementById('content');
var songifo = document.getElementById('songifo');
imgpre.onclick = function() {
	aud.pause();
	aud.src = "http://sc1.111ttt.com/2016/1/11/28/204281919253.mp3";
	songifo.innerText = "刚好遇见你-李玉刚";
	content.style.backgroundImage="url(img/刚好遇见你.jpg)";
	aud.play();
}
imgnext.onclick = function() {
	aud.pause();
	aud.src = "http://sc1.111ttt.com/2015/1/02/09/95091224402.mp3";
	songifo.innerText = "Alan Walker-Fade";
	content.style.backgroundImage="url(img/fade.jpg)";
	aud.play();
}

var change;
aud.addEventListener("play", function(e) {
	imgstop.src = "img/stop.svg";
	clearInterval(change);
	change = setInterval(function() {
		n++;
		var deg = -1 * n;
		imgstop.style.transform = "rotate(" + deg + "deg)";
	}, 30)

}, false);

aud.addEventListener("pause", function(e) {
	imgstop.src = "img/play.svg";
	clearInterval(change);
	imgstop.style.transform = "rotate(0deg)";

}, false);

var ctime = document.getElementById('currenttime');
var dtime = document.getElementById('durationtime');

setInterval(function() {
	var second1 = Math.floor(aud.currentTime % 60);

	if(second1 < 10) {
		if(aud.currentTime==NaN){
			aud.currentTime=0;
		}
		ctime.innerText = "0" + Math.floor(aud.currentTime / 60) + ":0" + Math.floor(aud.currentTime % 60);
	} else {
		if(aud.currentTime==NaN){
			aud.currentTime=0;
		}
		ctime.innerText = "0" + Math.floor(aud.currentTime / 60) + ":" + Math.floor(aud.currentTime % 60);
	}
}, 100);

setInterval(function() {
	if(aud.duration==NaN){
		dtime.innerText="00:00";
	}
	var second2 = Math.floor(aud.duration % 60);

	if(second2 < 10) {
		
		dtime.innerText = "0" + Math.floor(aud.duration / 60) + ":0" + Math.floor(aud.duration % 60);
	} else {
		dtime.innerText = "0" + Math.floor(aud.duration / 60) + ":" + Math.floor(aud.duration % 60);
	}

}, 1000)

var prog = document.getElementById('prog');
setInterval(function() {
	prog.style.width = Math.ceil((aud.currentTime * 960 / aud.duration)) + "px";
}, 1000);

//通过改变 当前播放时间的值 来改变 进度条的宽度
//把鼠标点击位置 转化为 当前播放时间的值
//鼠标点击位置是相对灰色进度条的
var unprog = document.getElementById('unprog');
var prog = document.getElementById('prog');
unprog.onmousedown = function(unprog) {
	ev1 = event || window.event;
}
unprog.onclick = function() {
	aud.currentTime = ev1.offsetX * aud.duration / 960;
}
prog.onmousedown = function(prog) {
	ev2 = event || window.event;
}
prog.onclick = function() {
	aud.currentTime = ev2.offsetX * aud.duration / 960;
	console.log(aud.currentTime);
	console.log(ev2.offsetX, ev2.offsetY);

}

var voltop = document.getElementById('voltop');
var volbottom = document.getElementById('volbottom');

voltop.onmousedown = function(voltop) {
	ev3 = event || window.event;
}
voltop.onclick = function() {
	aud.volume =  ev3.offsetX / 100;
}
volbottom.onmousedown = function(volbottom) {
	ev4 = event || window.event;
}
volbottom.onclick = function() {
	aud.volume =  ev4.offsetX / 100;
	/*console.log("当前音量:" + aud.volume);
	console.log(ev4.offsetX, ev4.offsetY);*/ //页面调试
}
setInterval(function() {
	voltop.style.width = aud.volume * 100 + "px";
	/*console.log("当前高度:" + voltop.style.height);*/
}, 30)

//利用opacity来控制音量条的出现与否
//写私有方法供鼠标事件调用

/*var volshow = function() {
	function showvol() {
		volbottom.style.opacity = 0.5;
		voltop.style.opacity = 0.8;
	}
	this.show = function() {
		showvol();
	}

	function hidevol() {
		volbottom.style.opacity = 0;
		voltop.style.opacity = 0;
	}
	this.hide = function() {
		hidevol();
	}

	function volbig() {
		vol.style.width = 40 + "px";
		vol.style.height = 30 + "px";
	}
	this.volbigbig = function() {
		volbig();
	}

	function volsm() {
		vol.style.width = 35 + "px";
		vol.style.height = 25 + "px";
	}
	this.volsmall = function() {
		volsm();
	}
}*/

var vol = document.getElementById('vol');
/*vol.onmouseover = function() {
	var volshow1 = new volshow();
	volshow1.show();
	volshow1.volbigbig();
}
vol.onmouseout = function() {
	var volshow2 = new volshow();
	volshow2.hide();
	volshow2.volsmall();
}
voltop.onmouseover = function() {
	var volshow3 = new volshow();
	volshow3.show();
	volshow3.volbigbig();

}
voltop.onmouseout = function() {
	var volshow4 = new volshow();
	volshow4.hide();
	volshow4.volsmall();
}
volbottom.onmouseover = function() {
	var volshow5 = new volshow();
	volshow5.show();
	volshow5.volbigbig();
}
volbottom.onmouseout = function() {
	var volshow6 = new volshow();
	volshow6.hide();
	volshow6.volsmall();
}*/

//用a标签download属性来实现下载 但是只有火狐和谷歌chrome支持
var adownload=document.getElementById('adownload');
adownload.onclick = function(){
	console.log(aud.currentSrc);
	adownload.href=aud.currentSrc;
	console.log(songifo.textContent);
	adownload.download=songifo.textContent;	
	console.log(adownload.download);
	//出现了一个问题，下载下来的文件，其download属性值即文件名无法改变，下载下来的文件其download被强制设置为服务器上对应文件的id
	//经过测试，这种情况是a标签download属性对于客户端和服务器的支持不完善导致的（缺少一个download属性值得回传）
	//考虑了通过jQuery调用jplayer这个插件的方案，这样引入了大量无用js文件，不仅会减慢网页的展现速度，而且也违背了我用原生js写代码的初衷
	//由于这个小问题对用户体验的影响不是那么大，用户可以通过重命名的方式自己修改文件名
	//基于上述原因，所以我选择妥协，等找到更好的解决方案我会重新考虑这个问题
	//这还是源于我对服务器方面知识的欠缺
}
console.log(window.screen.width);
