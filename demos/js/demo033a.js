var mycode = function() {
	'use strict';
	var testTicker = Date.now(),
		testTime = testTicker,
		testNow,
		msg = document.getElementById('message');
	var myresults = [],
		counter = 0,
		level,
		doTest,
		run = [],
		length,
		fps,
		f,
		p,
		result,
		fails = 0,
		running = true,
		average = 0;

	//define variables
	var canvas = scrawl.canvas.mycanvas,
		pad = scrawl.pad.mycanvas,
		totalBunnies = 0,
		minX = 5,
		minY = 5,
		maxX = 595,
		maxY = 595,
		bunnyPos = [],
		bunny,
		start,
		addBunnies,
		moveBunnies;

	//load image into scrawl library
	scrawl.getImagesByClass('demo033');

	//define a single bunny entity - start and delta values will be stored in the bunnyPos array
	bunny = scrawl.makePicture({
		name: 'bunny',
		source: 'bunny',
		handleX: 'center',
		handleY: 'center',
		collisionPoints: 'center',
		fastStamp: true, //essential if speed gains are to be realised
	});
	start = bunny.currentStart;

	//event listener
	addBunnies = function(e) {
		for (var i = 0; i < 100; i++) {
			bunnyPos.push({
				x: 10,
				y: 10,
				dx: (Math.random() * 8) + 1,
				dy: (Math.random() * 8) + 1,
			});
		}
		totalBunnies += 100;
	};

	//animation (display loop) function
	moveBunnies = function() {
		var temp, b, i, iz;
		pad.clear();
		for (i = 0, iz = bunnyPos.length; i < iz; i++) {
			b = bunnyPos[i];
			temp = b.x + b.dx;
			if (temp < minX || temp > maxX) {
				b.dx = -b.dx;
			}
			b.x += b.dx;
			start.x = b.x;
			temp = b.y + b.dy;
			if (temp < minY || temp > maxY) {
				b.dy = -b.dy;
			}
			b.y += b.dy;
			start.y = b.y;
			bunny.stamp();
		}
		pad.show();
	};

	doTest = function() {
		var i, iz;
		if (running) {
			run.push(fps);
			if (run.length > 20) {
				length = run.length;
				for (i = 0; i < length; i++) {
					average += run[i];
				}
				result = Math.floor(average / length);
				myresults[totalBunnies] = result;
				run.length = 0;
				average = 0;
				if (result < 20) {
					fails++;
				}
				if (fails > 2) {
					running = false;
					f = document.getElementById('results');
					p = '';
					for (i = 0, iz = myresults.length; i < iz; i++) {
						if (myresults[i]) {
							p += i + ' bunnies: ' + myresults[i] + 'fps<br />';
						}
					}
					f.innerHTML = p;
				}
				else {
					addBunnies();
				}
			}
		}
	};

	//initialize scene
	addBunnies();

	//animation object
	scrawl.makeAnimation({
		fn: function() {
			moveBunnies();

			msg.innerHTML = 'Bunnies: ' + totalBunnies;
			testNow = Date.now();
			testTime = testNow - testTicker;
			testTicker = testNow;
			fps = Math.floor(1000 / testTime);
			doTest();
		},
	});
};

scrawl.loadExtensions({
	path: '../source/',
	minified: false,
	extensions: ['images', 'animation'],
	callback: function() {
		window.addEventListener('load', function() {
			scrawl.init();
			mycode();
		}, false);
	},
});
