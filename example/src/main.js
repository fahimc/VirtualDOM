(function() {
	var collection = [];
	var enterFrame;
	function init() {
		window.addEventListener('load', onLoad);
	}

	function onLoad() {
		document.getElementById('paint').addEventListener('click',onClick);
		vdocument.body.setAttribute("data-test", "hello world");

		var div = vdocument.createElement("DIV");
		div.innerHTML = "test";
		
		vdocument.body.appendChild(div);
		setTimeout(function() {
			div.classList.add("test");
		}, 200);
		
		// makeCirclesWithout();
		// animateWithout();
		
		makeCircles();
		animate();
	}
function makeCircles() {
		collection = [];

		var holder = vdocument.getElementById('holder');
		holder.innerHTML = "";
		for (var a = 0; a < 800; a++) {
			var circle = vdocument.createElement('DIV');
			circle.classList.add("circle");
			circle.vstyle("height","100px");
			circle.vstyle("width", "100px");
			circle.vstyle("display" , "block");
			circle.vstyle("position" , "absolute");
			circle.vstyle("left" , "0px");
			circle.vstyle("top" , (Math.floor(Math.random() * 500) + 1) + "px");
			
			holder.appendChild(circle);
		}
		
	}
	function animate() {
		enterFrame = setInterval(function() {
			var holder = vdocument.getElementById('holder');

			for (var a = 0; a < holder.childNodes.length; a++) {
				if (holder.childNodes[a].classList && holder.childNodes[a].classList.contains('circle'))
				{
					holder.childNodes[a].vstyle("left",(Math.floor(Math.random() * 500) + 1) + "px");
									
				}
					
			}
			
		}, 200);
	}
	function makeCirclesWithout() {
		collection = [];

		var holder = document.getElementById('holder');
		holder.innerHTML = "";
		for (var a = 0; a < 400; a++) {
			var circle = document.createElement('DIV');
			circle.classList.add("circle");
			circle.style.height="100px";
			circle.style.width= "100px";
			circle.style.display= "block";
			circle.style.position= "absolute";
			circle.style.left= "0px";
			circle.style.top= (Math.floor(Math.random() * 500) + 1) + "px";
			
			holder.appendChild(circle);
		}
		
	}
	function animateWithout() {
		enterFrame = setInterval(function() {
			var holder = document.getElementById('holder');

			for (var a = 0; a < holder.childNodes.length; a++) {
				if (holder.childNodes[a].classList && holder.childNodes[a].classList.contains('circle'))
				{
					holder.childNodes[a].style.left=(Math.floor(Math.random() * 500) + 1) + "px";
									
				}
					
			}
			
		}, 200);
	}
function onClick(){
	clearInterval(enterFrame);
}
	init();
})();
