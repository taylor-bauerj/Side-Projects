(function(){
	
	var width, height, canvas, header, bats, ctx = true;
	
	init();
	addListeners();
	animate();
	
	function init(){
		width = window.innerWidth;
		height = window.innerHeight;
		
		canvas = document.getElementById('canvas');
		canvas.height = height;
		canvas.width = width;
		ctx = canvas.getContext('2d');
		
		header = document.getElementById('large-header');
		header.style.height = height + 'px';
		
		bats = [];
		for(var i = 0; i < 250; i++){
			addBats(i*10);
		}
	}
	
	function addBats(delay){
		setTimeout(function(){
			var b = new Bat();
			bats.push(b);
			tweenBats(b);
		}, delay);
	}
	
	function tweenBats(bat){
		var t = Math.random() * (2*Math.PI);
		var x = (200 + Math.random() * 1000) * Math.cos(t) + width * 0.5;
		var y = (200 + Math.random() * 1000) * Math.sin(t) + height * 0.5 - 20;
		var time = 4 + 3 * Math.random();
		
		TweenLite.to(bat.pos, time, {x: x,
			y: y, ease: Back.easeIn,
			onComplete: function(){
					bat.init();
					tweenBats(bat);
			}
		});
	}
	
	function Bat(){
		var _this = this;
		
		var rand = Math.round(Math.random());
		
		(function() {
			_this.pos = {};
			
			_this.rotation = Math.random() * 360;
			
			_this.img = new Image();
			if(rand == 0) _this.img.src = 'images/bat.png';
			else if(rand == 1) _this.img.src = 'images/ghost.png';
			
			_this.img.onload = function(){
				init();
			}
		}) ();
		
		function init(){
			_this.pos.x = width * 0.5;
			_this.pos.y = height * 0.5 - 20;
		}
		 
		this.draw = function(){
			drawImageRot(_this.img, _this.pos.x, _this.pos.y, 50, 50, _this.rotation);
        
			ctx.fill();
		};
		
		this.init = init;
	}
	
	function drawImageRot(img,x,y,width,height,deg){

		//Convert degrees to radian 
		var rad = deg * Math.PI / 180;

		//Set the origin to the center of the image
		ctx.translate(x + width / 2, y + height / 2);

		//Rotate the canvas around the origin
		ctx.rotate(rad);

		//draw the image    
		ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

		//reset the canvas  
		ctx.rotate(rad * ( -1 ) );
		ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
	}
	
	function addListeners(){
        window.addEventListener('resize', resize);
	}
	
	function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        header.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
		
        ctx.clearRect(0, 0, width, height);
		for(var i in bats){
			bats[i].draw();
		}
        requestAnimationFrame(animate);
    }
	
}) ();