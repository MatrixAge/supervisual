window.onload = function() {
	try {
		var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
	} catch(err) {
		alert('!Your browser does not support Web Audio API!');
	};
	//下面使用ajax来进行一步读取音源,好处是避免有声而无图

	var myCanvas = document.getElementById('myCanvas'),
		mycanvas1 = document.getElementById('myCanvas1');
	canvasCtx = myCanvas.getContext("2d"),
		canvasCtx1 = mycanvas1.getContext("2d"),
		myAudio = document.getElementById("aud");
	myAudio.src = "audio/KSHMR,Sidnie Tipton - Wildcard (Extended Mix).mp3";
// 		myAudio.src = "http://sc1.111ttt.com/2015/1/09/19/102191059559.mp3";
	var source = audioCtx.createMediaElementSource(myAudio);
	var analyser = audioCtx.createAnalyser();
	analyser.fftSize = 4096;

	//	(function() {
	//		alert("123");
	//		var request = new XMLHttpRequest();　　 //开一个请求
	//		request.open('GET', '', true);　　　　 //往url请求数据
	//		request.responseType = 'arraybuffer'; //设置返回数据类型
	//		alert("123");
	//		request.onload = function() {
	//			var audioData = request.response;
	//			//数据缓冲完成之后，进行解码
	//			audioCtx.decodeAudioData(audioData, function(buffer) {
	//				source.buffer = buffer; //将解码出来的数据放入source中
	//
	//			}, function(err) {　　　　　　　
	//				alert('Fail to decode the file!'); //解码出错处理
	//				　　　　
	//			});
	//		};
	//		request.send();
	//	})();

	source.connect(analyser);
	analyser.connect(audioCtx.destination);

	myAudio.oncanplaythrough = function draw() {

		var cwidth = myCanvas.width,
			cheight = myCanvas.height,
			cwidth1 = myCanvas1.width,
			cheight1 = myCanvas1.height,
			array = new Uint8Array(128);
		analyser.getByteFrequencyData(array);
		canvasCtx.clearRect(0, 0, cwidth, cheight);
		canvasCtx1.clearRect(0, 0, cwidth1, cheight1);
		canvasCtx1.beginPath();
		canvasCtx1.arc(290, 290, 242 , 0, 2 * Math.PI);
		canvasCtx1.fillStyle = "black";
		canvasCtx1.fill();
		canvasCtx1.closePath();

		canvasCtx.fillStyle = "white";
		for(var i = 0; i < array.length; i++) {
			var num = 0;
			num = num + array[i];
			canvasCtx.beginPath();
			canvasCtx.arc(100, 120, array[17] / 3, 0, 2 * Math.PI);
			canvasCtx.arc(290, 120, array[127] / 3, 0, 2 * Math.PI);
			canvasCtx.fillRect(i * 3, 280, 1, array[i] / 8);
			canvasCtx.fill();
			canvasCtx.closePath();

			var rad;
			if(array[2] > 200) {
				rad = array[2] - 200;
			} else {
				rad = 0;
			}

			canvasCtx1.beginPath();
			canvasCtx1.arc(290, 290, 240 + rad, 0, 2 * Math.PI);
			canvasCtx1.fillStyle = "black";
			canvasCtx1.fill();
			canvasCtx1.closePath();


		}

		//i与频率值成正比，进行for循环时，i从0一直变化到127，所以i成为了填充方块的横坐标
		//array[i]表示的是i的频率值，当i的频率值为0时，那么，填充方块的纵坐标就是cheight
		//而cheight表示的是canvas的高度值400px，表示从纵坐标为400px的地方开始填充
		//
		requestAnimationFrame(draw);
	}

}
