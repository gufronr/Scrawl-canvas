var mycode = function() {
	'use strict';
	//hide-start
	var testTicker = Date.now(),
		testTime = testTicker,
		testNow,
		testMessage = document.getElementById('testmessage');
	//hide-end

	//define variables
	var sides = ['top', 'bottom', 'left', 'right', 'front', 'back'],
		pics = ['robbery', 'theft', 'violence', 'fraud', 'burglary', 'damage'],
		pads = {
			top: scrawl.pad.top,
			bottom: scrawl.pad.bottom,
			left: scrawl.pad.left,
			right: scrawl.pad.right,
			front: scrawl.pad.front,
			back: scrawl.pad.back,
		},
		cells = {
			top: scrawl.cell[pads.top.base],
			bottom: scrawl.cell[pads.bottom.base],
			left: scrawl.cell[pads.left.base],
			right: scrawl.cell[pads.right.base],
			front: scrawl.cell[pads.front.base],
			back: scrawl.cell[pads.back.base],
		},
		mystack = scrawl.stack.mystack,
		elstack = scrawl.stk.mystack,
		group = scrawl.group.mystack,
		//use a virtual cube to determine the constructed cube's orientation
		cube = scrawl.makeQuaternion(),
		//the amount (in degrees) by which the virtual cube will rotate on each screen refresh
		deltaCube = scrawl.makeQuaternion({
			pitch: 1,
			yaw: -0.8,
			roll: 0.3,
		}),
		instructions = scrawl.element.instructions,
		words,
		i, iz;

	//load images into scrawl library
	scrawl.getImagesByClass('demo205');

	//initialize DOM 3d effects - stack
	mystack.set({
		width: 400,
		height: 400,
		perspectiveZ: 800,
	});

	//initialize instructions element
	scrawl.makeElementGroup({
		name: 'instructions',
		stack: 'mystack'
	});
	instructions.set({
		startX: '50%',
		startY: '60%',
		handleX: 'center',
		handleY: 'center',
		pointerEvents: 'none',
		group: 'instructions'
	});

	//initialize DOM 3d effects - canvas elements
	group.setElementsTo({
		pivot: 'mouse',
		handleX: 'center',
		handleY: 'center',
		pointerEvents: 'none'
	});
	//each of the canvas elements has its own initial rotation and translation values
	pads.top.set({
		deltaPitch: 90,
		deltaTranslateY: -100
	});
	pads.bottom.set({
		deltaPitch: -90,
		deltaTranslateY: 100
	});
	pads.left.set({
		deltaYaw: -90,
		deltaTranslateX: -100
	});
	pads.right.set({
		deltaYaw: 90,
		deltaTranslateX: 100
	});
	pads.back.set({
		deltaYaw: -180,
		deltaTranslateZ: -100
	});
	pads.front.set({
		deltaYaw: 0,
		deltaTranslateZ: 100
	});

	//define entitys to display on each canvas
	words = scrawl.makeGroup({
		name: 'words',
		visibility: false,
		entitys: sides,
	});
	for (i = 0, iz = sides.length; i < iz; i++) {
		scrawl.makePicture({
			name: pics[i],
			pivot: sides[i],
			handleX: 'center',
			handleY: 'center',
			width: 200,
			height: 200,
			source: pics[i],
			order: 0,
			group: pads[sides[i]].base,
		});
		scrawl.makePhrase({
			name: sides[i],
			startX: 100,
			startY: 100,
			handleX: 'center',
			handleY: 'center',
			font: '36pt Arial, sans-serif',
			text: sides[i],
			order: 1,
			group: pads[sides[i]].base,
		});
	}

	//stop touchmove dragging the page up/down
	scrawl.addListener(['move', 'down'], function(e) {
		if (e) {
			e.stopPropagation();
			e.preventDefault();
		}
		var here = mystack.getMouse();
		if (here.active) {
			group.setElementsTo({
				pivot: 'mouse',
				mouseIndex: here.id
			});
		}
		else {
			group.setElementsTo({
				pivot: '',
				mouseIndex: ''
			});
		}
	}, elstack);
	scrawl.addListener('leave', function(e) {
		group.setElementsTo({
			pivot: '',
			mouseIndex: ''
		});
	}, elstack);

	//animation object
	scrawl.makeAnimation({
		fn: function() {
			//rotate the cube
			cube.quaternionMultiply(deltaCube);
			group.update({
				action: 'pads',
				quaternion: cube,
			});
			//animate the canvas entitys
			words.updateEntitysBy({
				roll: 0.5,
			});
			scrawl.render();

			//hide-start
			testNow = Date.now();
			testTime = testNow - testTicker;
			testTicker = testNow;
			testMessage.innerHTML = 'Milliseconds per screen refresh: ' + Math.ceil(testTime) + '; fps: ' + Math.floor(1000 / testTime);
			//hide-end
		},
	});
};

scrawl.loadExtensions({
	path: '../source/',
	minified: false,
	extensions: ['images', 'phrase', 'animation', 'stacks'],
	callback: function() {
		window.addEventListener('load', function() {
			scrawl.init();
			mycode();
		}, false);
	},
});
