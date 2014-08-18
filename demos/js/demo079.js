var mycode = function() {
	'use strict';
	var testTicker = Date.now(),
		testTime = testTicker,
		testNow,
		testMessage = document.getElementById('testmessage');

	//define variables
	var myBase = scrawl.cell[scrawl.pad.mycanvas.base],
		myBaseGroup = scrawl.group[myBase.name],
		myCollisionMap,
		myWheels,
		mySprite,
		hits,
		checkBounds,
		fieldBall,
		myBall,
		updateTimer,
		dTime,
		tkr;

	//define groups
	scrawl.newGroup({
		name: 'particles',
		order: 0,
	});
	myWheels = scrawl.newGroup({
		name: 'wheels',
		order: 1,
	});

	//build collision map
	myCollisionMap = scrawl.addNewCell({ //make cell
		name: 'collisionMap',
		height: 400,
		width: 600,
		backgroundColor: 'black',
	}).compile();
	scrawl.newBlock({ //add, and stamp, sprites
		startX: 10,
		startY: 50,
		width: 580,
		height: 300,
		fillStyle: 'rgba(255,0,0,0.5)',
		strokeStyle: 'rgba(255,0,0,1)',
		method: 'draw',
		group: 'collisionMap',
	}).stamp('fill');
	scrawl.newBlock({
		startX: 300,
		startY: 200,
		handleX: 'center',
		handleY: 'center',
		roll: 15,
		width: 400,
		height: 100,
		fillStyle: 'rgba(0,255,0,0.5)',
		strokeStyle: 'rgba(0,255,0,1)',
		method: 'draw',
		group: 'collisionMap',
	}).stamp('fill');
	scrawl.newWheel({
		startX: 150,
		startY: 200,
		radius: 140,
		fillStyle: 'rgba(0,0,255,0.5)',
		strokeStyle: 'rgba(0,0,255,1)',
		method: 'draw',
		group: 'collisionMap',
	}).stamp('fill');
	scrawl.makeRegularShape({
		startX: 450,
		startY: 200,
		radius: 140,
		sides: 6,
		fillStyle: 'rgba(0,0,255,0.5)',
		strokeStyle: 'rgba(0,0,255,1)',
		method: 'draw',
		group: 'collisionMap',
	}).stamp('fill');
	myBase.fieldLabel = myCollisionMap.getImageData();
	myBaseGroup.addSpritesToGroup(scrawl.group.collisionMap.sprites);

	//define physics sprites
	fieldBall = scrawl.newParticle({
		mass: 1000000,
	});
	scrawl.newParticle({
		name: 'redP',
		startX: 300,
		startY: 120,
		deltaX: 60,
		deltaY: 90,
		mass: 0.5,
		radius: 0.2,
		group: 'particles'
	}).clone({
		name: 'greenP',
		startX: 300,
		startY: 200,
		deltaX: 90,
		deltaY: 60,
	}).clone({
		name: 'blueP',
		startX: 110,
		deltaX: 60,
		deltaY: 80,
	}).clone({
		name: 'hexP',
		startX: 450,
		deltaX: 70,
		deltaY: 80,
	});

	//define other sprites
	scrawl.newWheel({
		name: 'redB',
		radius: 20,
		method: 'fillDraw',
		fillStyle: 'red',
		fieldChannel: 'red',
		group: 'wheels',
		pivot: 'redP',
		collisionPoints: 12,
	}).clone({
		name: 'greenB',
		fillStyle: 'green',
		fieldChannel: 'green',
		pivot: 'greenP',
	}).clone({
		name: 'blueB',
		fillStyle: 'blue',
		fieldChannel: 'blue',
		pivot: 'blueP',
	}).clone({
		name: 'hexB',
		pivot: 'hexP',
	});

	//physics update function
	updateTimer = function() {
		dTime = Date.now() - tkr;
		dTime = (dTime > 10) ? 10 : dTime;
		tkr = Date.now();
		scrawl.physics.deltaTime = dTime / 1000;
	};

	//animation function
	checkBounds = function() {
		var i, iz;
		for (i = 0, iz = myWheels.sprites.length; i < iz; i++) {
			mySprite = scrawl.sprite[myWheels.sprites[i]];
			mySprite.setDelta({
				scale: (mySprite.scale + 0.01 <= 1) ? 0.005 : 0,
			});
		}
		hits = myWheels.getFieldSpriteHits();
		for (i = 0, iz = hits.length; i < iz; i++) {
			mySprite = scrawl.sprite[hits[i][0]];
			mySprite.setDelta({
				scale: (mySprite.scale > 0.8) ? -0.04 : 0,
			});
			myBall = scrawl.sprite[mySprite.pivot];
			myBall.revert();
			myBall.linearCollide(fieldBall.set({
				startX: hits[i][1].x,
				startY: hits[i][1].y,
			}));
		}
	};

	//animation object
	scrawl.newAnimation({
		fn: function() {
			updateTimer();
			checkBounds();
			scrawl.render();

			testNow = Date.now();
			testTime = testNow - testTicker;
			testTicker = testNow;
			testMessage.innerHTML = 'Milliseconds per screen refresh: ' + Math.ceil(testTime) + '; fps: ' + Math.floor(1000 / testTime);
		},
	});
};

scrawl.loadModules({
	path: '../source/',
	minified: false,
	modules: ['block', 'wheel', 'factories', 'path', 'animation', 'collisions', 'physics'],
	callback: function() {
		window.addEventListener('load', function() {
			scrawl.init();
			mycode();
		}, false);
	},
});