<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="../lib/jquery-2.1.4.min.js" type="text/javascript"></script>
	<style>
		*{
			padding: 0;
			margin: 0;
		}
		.box{
			width: 50px;
			height: 50px;
			border: 1px solid slateblue;
			position: relative;
			left: 750px;
			top: 500px;
		}
		.animate{
			width:  50px;
			height: 50px;
			border: 1px solid skyblue;
			background: slateblue;
			opacity: 0;
			position: absolute;
		}
		.up{
			z-index: 999;
			background: red;
			width:  50px;
			height: 50px;
			border: 1px solid skyblue;

		}
		#btn{
			background: slateblue;
			position: absolute;
			left: 0;
			top: 0;
		}
		.number{
			position: absolute;
			top: 600px;
			left: 740px;
			width: 100px;
			height: 30px;
		}
		#btnTrg{
			background: slateblue;
			width: 100px;
			height: 30px;
			border: 0;
			position: absolute;
			top: 600px;
			left: 600px;
		}
		.result{
			position: absolute;
			top: 600px;
			left: 900px;
			width: 100px;
			height: 30px;
			background: skyblue;
			text-align: center;
		}

	</style>
</head>
<body>
	<div id="content"></div>
	<div class="box">
		<span class="animate1 animate"></span>
		<span class="animate2 animate"></span>
		<span class="animate3 animate"></span>
		<span class="animate4 animate"></span>
		<span class="animate5 animate"></span>
		<span class="animate6 animate"></span>
		<div class="up"></div>
	</div>
	<div id="btn"></div>
	<button id="btnTrg">click me</button>
	<input type="text" class="number" id="num"/>
	<span class="result"></span>
</body>
<script>
	var span1=$(".animate1");
	var span2=$(".animate2");
	var span3=$(".animate3");
	var span4=$(".animate4");
	var span5=$(".animate5");
	var span6=$(".animate6");
	var box=$("#content");
	var btn=$("#btn");
	var btnTrg=$("#btnTrg");
	var input=$("#num");
	var result=$(".result");
	var resultNum=1;
	var ani=[
		function () {
			span1.css({
				background:"red",
				opacity:1
			}).animate({
				left:-300,
				top:-100
			}, function () {
				result.html(resultNum++)
			}).animate({
				left:-50,
				top:-450,
				opacity:0.2
			}, function () {
				$(this).css({
					left:0,
					top:0,
					opacity:0
				})
			})
		},
		function () {
			span2.css({
				background:"blue",
				opacity:1
			}).animate({
				left:-200,
				top:-200
			}, function () {
				result.html(resultNum++)
			}).animate({
				left:-50,
				top:-450,
				opacity:0.2
			}, function () {
				$(this).css({
					left:0,
					top:0,
					opacity:0
				})
			})
		},
		function () {
			span3.css({
				background:"pink",
				opacity:1
			}).animate({
				left:-100,
				top:-300
			}, function () {
				result.html(resultNum++)
			}).animate({
				left:-50,
				top:-450,
				opacity:0.2
			}, function () {
				$(this).css({
					left:0,
					top:0,
					opacity:0
				})
			})
		},
		function () {
			span4.css({
				background:"green",
				opacity:1
			}).animate({
				left:100,
				top:-300
			}, function () {
				result.html(resultNum++)
			}).animate({
				left:50,
				top:-450,
				opacity:0.2
			}, function () {
				$(this).css({
					left:0,
					top:0,
					opacity:0
				})
			})
		},
		function () {
			span5.css({
				background:"orange",
				opacity:1
			}).animate({
				left:200,
				top:-200
			}, function () {
				result.html(resultNum++)
			}).animate({
				left:50,
				top:-450,
				opacity:0.2
			}, function () {
				$(this).css({
					left:0,
					top:0,
					opacity:0
				})
			})
		},
		function () {
			span6.css({
				background:"black",
				opacity:1
			}).animate({
				left:300,
				top:-150
			}, function () {
				result.html(resultNum++)
			}).animate({
				left:50,
				top:-450,
				opacity:0.2
			}, function () {
				$(this).css({
					left:0,
					top:0,
					opacity:0
				})
			})
		}
	];
	var queue;
	var len=0;
	var flag=0;
	var timer;
	input.on("keyup", function () {
		var result=[];
		var value=input.val();
		len=value;
		if(flag>=len){
			clearInterval(timer);
		}
		if(value<6){
			result =ani.slice(0,value);
			queue=$.queue(box,"animate",result);
		}else if(value>6){
			var num1=Math.floor(value/6);
			var num2=value%6;
			for(var i=0;i<num1;i++){
				result=result.concat(ani);
			}
			result=result.concat(ani.slice(0,num2));
			console.log(result);
			$.queue(box,"animate",result);
		}
	});
	btnTrg.on("click", function () {
		resultNum=0;
		flag=0;
		timer=setInterval(function () {
			flag++;
			console.log(flag);
			$.dequeue(box,"animate");

		},500);
	})
</script>
</html>
