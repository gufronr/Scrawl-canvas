var mycode = function() {
	'use strict';
	var testTicker = Date.now(),
		testTime = testTicker,
		testNow,
		testMessage = document.getElementById('testmessage');

	//define variables
	var here,
		myGroup,
		balls,
		bendy,
		getWheel,
		dropWheel,
		mySprite = false;

	//define groups
	myGroup = scrawl.newGroup({
		name: 'mygroup',
	});
	balls = scrawl.newGroup({
		name: 'balls',
	});

	//define sprites
	for (var i = 0; i < 3; i++) {
		scrawl.newWheel({
			name: 'wheel_' + i,
			radius: 10,
			fillStyle: 'blue',
			method: 'fillDraw',
			startY: 200,
			startX: 250 * (i + 1) - 125,
			order: 1,
			group: 'mygroup',
		});
	}

	bendy = scrawl.makeQuadratic({
		name: 'mycurve',
		lineWidth: 5,
		strokeStyle: 'red',
		method: 'draw',
		precision: 100,
	});
	//fix curve points to their draggable handles
	scrawl.point.mycurve_p1.setToFixed('wheel_0');
	scrawl.point.mycurve_p2.setToFixed('wheel_1');
	scrawl.point.mycurve_p3.setToFixed('wheel_2');

	scrawl.newPhrase({
		font: '12pt Arial, sans-serif',
		handleX: 'center',
		handleY: 30,
		text: 'start',
		pivot: 'wheel_0',
		order: 2,
	}).clone({
		text: 'control',
		pivot: 'wheel_1',
	}).clone({
		text: 'end',
		pivot: 'wheel_2',
	});

	scrawl.newWheel({
		name: 'goldwheel',
		radius: 10,
		fillStyle: 'gold',
		method: 'fillDraw',
		order: 1,
		group: 'balls',
		path: 'mycurve',
		pathSpeedConstant: false,
	}).clone({
		name: 'pinkwheel',
		radius: 8,
		fillStyle: 'pink',
		order: 2,
		pathSpeedConstant: true,
	});

	//event listeners
	getWheel = function(e) {
		mySprite = myGroup.getSpriteAt(here);
		if (mySprite) {
			mySprite.pickupSprite(here);
		}
		if (e) {
			e.stopPropagation();
			e.preventDefault();
		}
	};
	dropWheel = function(e) {
		if (mySprite) {
			mySprite.dropSprite();
			mySprite = false;
		}
		if (e) {
			e.stopPropagation();
			e.preventDefault();
		}
	};
	scrawl.canvas.mycanvas.addEventListener('mousedown', getWheel, false);
	scrawl.canvas.mycanvas.addEventListener('mouseup', dropWheel, false);

	//tweens
	scrawl.newTween({
		name: 'goldTween',
		targets: scrawl.sprite.goldwheel,
		start: {
			pathPlace: 0
		},
		end: {
			pathPlace: 1
		},
		duration: 10000,
		nextTween: 'goldTween',
	}).run();
	scrawl.animation.goldTween.clone({
		name: 'pinkTween',
		targets: scrawl.sprite.pinkwheel,
		nextTween: 'pinkTween',
	}).run();

	//animation object
	scrawl.newAnimation({
		fn: function() {
			//get mouse coordinates
			here = scrawl.pad.mycanvas.getMouse();
			if (!here.active && mySprite) {
				dropWheel();
			}

			//update curve
			if (mySprite) {
				bendy.buildPositions();
			}

			//update canvas display
			scrawl.render();

			testNow = Date.now();
			testTime = testNow - testTicker;
			testTicker = testNow;
			testMessage.innerHTML = 'Milliseconds per screen refresh: ' + parseInt(testTime, 10) + '; fps: ' + parseInt(1000 / testTime, 10);
		},
	});
};

scrawl.loadModules({
	path: '../source/',
	minified: false,
	modules: ['path', 'wheel', 'phrase', 'factories', 'animation'],
	callback: function() {
		window.addEventListener('load', function() {
			scrawl.init();
			mycode();
		}, false);
	},
});
