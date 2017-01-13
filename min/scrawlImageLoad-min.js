/*! scrawl-canvas 2017-01-13 */
if(window.scrawl&&window.scrawl.work.extensions&&!window.scrawl.contains(window.scrawl.work.extensions,"imageload"))var scrawl=function(a){"use strict";return a.work.imageFragment=document.createDocumentFragment(),a.work.imageCanvas=document.createElement("canvas"),a.work.imageCanvas.id="imageHiddenCanvasElement",a.work.imageFragment.appendChild(a.work.imageCanvas),a.work.imageCvx=a.work.imageCanvas.getContext("2d"),a.newImage=function(b){return a.makeImage(b)},a.newSpriteAnimation=function(b){return a.makeSpriteAnimation(b)},a.newVideo=function(b){return a.makeVideo(b)},a.makeImage=function(b){return new a.Image(b)},a.makeSpriteAnimation=function(b){return new a.SpriteAnimation(b)},a.makeVideo=function(b){return new a.Video(b)},a.work.workimg={v1:a.makeVector()},a.pushUnique(a.work.sectionlist,"image"),a.pushUnique(a.work.nameslist,"imagenames"),a.pushUnique(a.work.sectionlist,"video"),a.pushUnique(a.work.nameslist,"videonames"),a.pushUnique(a.work.sectionlist,"spriteanimation"),a.pushUnique(a.work.nameslist,"spriteanimationnames"),a.pushUnique(a.work.sectionlist,"asset"),a.pushUnique(a.work.nameslist,"assetnames"),a.getImagesByClass=function(b,c){var d,e,f=a.makeImage;if(c=a.xtGet(c,!0),b&&(d=document.getElementsByClassName(b),d.length>0)){for(e=d.length;e>0;e--)f(d[e-1].width&&d[e-1].height?{element:d[e-1],removeImageFromDOM:c,crossOrigin:"anonymous"}:{url:d[e-1].src,name:d[e-1].id,removeImageFromDOM:c,crossOrigin:"anonymous"});return!0}return!1},a.getImageById=function(b,c){var d,e=a.makeImage;return c=a.xtGet(c,!0),b?(d=document.getElementById(b),e(d&&d.width&&d.height?{element:d,removeImageFromDOM:c,crossOrigin:"anonymous"}:{url:d.src,name:d.id,removeImageFromDOM:c,crossOrigin:"anonymous"}),!0):!1},a.getVideoCallback=function(){a.makeVideo({element:this,crossOrigin:"anonymous"})},a.getVideoById=function(b){var c;return b?(c=document.getElementById(b),c.callback="anonymous",c.readyState>1?a.makeVideo({element:c,crossOrigin:"anonymous"}):c.addEventListener("loadeddata",a.getVideoCallback,!1),!0):!1},a.Image=function(b){var c,d=a.xt,e=a.xtGet,f=!1;return b=a.safeObject(b),this.width=0,this.height=0,a.xto(b.element,b.data,b.url)?(d(b.element)?b.name=e(b.name,b.element.getAttribute("id"),b.element.getAttribute("name"),""):d(b.data)?b.name=e(b.name,""):d(b.url)&&(c=b.url.substr(0,128),b.name=e(b.name,c,"")),a.Base.call(this,b),d(a.image[b.name])&&(this.name=b.name,f=!0),a.image[this.name]=this,a.pushUnique(a.imagenames,this.name),d(b.element)?this.addImageByElement(b):d(b.data)?this.addImageByData(b):d(b.url)&&this.addImageByUrl(b),f&&this.updateDependentEntitys(),this):!1},a.Image.prototype=Object.create(a.Base.prototype),a.Image.prototype.type="Image",a.Image.prototype.classname="imagenames",a.work.d.Image={width:0,height:0},a.mergeInto(a.work.d.Image,a.work.d.Base),a.Image.prototype.addImageByElement=function(b){var c,d=a.xtGet(b.removeImageFromDOM,!0),e=a.xtGetTrue;return c=d?b.element:b.element.cloneNode(),c.id=this.name,this.width=parseFloat(e(c.offsetWidth,c.width,c.style.width,1)),this.height=parseFloat(e(c.offsetHeight,c.height,c.style.height,1)),a.work.imageFragment.appendChild(c),a.asset[this.name]=c,a.pushUnique(a.assetnames,this.name),a.isa_fn(b.callback)&&b.callback(),!0},a.Image.prototype.addImageByUrl=function(b){var c,d=this;return b.url.substring?(c=document.createElement("img"),c.id=this.name,c.onload=function(){var e,f,g,h,i,j=a.design,k=a.designnames,l=a.entity,m=a.entitynames;for(d.width=c.width,d.height=c.height,a.work.imageFragment.appendChild(c),i="#"+d.name,a.asset[d.name]=a.work.imageFragment.querySelector(i),a.pushUnique(a.assetnames,d.name),g=0,h=m.length;h>g;g++)e=l[m[g]],"Picture"===e.type&&e.source===d.name&&e.setCopy();for(g=0,h=k.length;h>g;g++)f=j[k[g]],"Pattern"===f.type&&f.source===d.name&&(f.sourceType="image",f.makeDesign());a.isa_fn(b.callback)&&b.callback()},c.onerror=function(){},c.src=b.url,!0):!1},a.Image.prototype.addImageByData=function(b){var c,d=a.work.imageCanvas,e=a.work.imageCvx;return a.xt(b.data)?(c=b.data,d.width=c.width,d.height=c.height,e.putImageData(c,0,0),b.url=d.toDataURL("image/png"),delete b.data,this.addImageByUrl(b)):!1},a.Image.prototype.createImageFromCell=function(b,c){var d,e;return b.substring&&(e=a.canvas[b],b=a.cell[b],a.xt(e)&&(d=e.toDataURL("image/png"),a.xt(d)))?this.addImageByUrl({url:d,name:a.xtGet(c,b.name,"cell-image"),width:b.actualWidth,height:b.actualHeight}):!1},a.Image.prototype.clone=function(b){return b.element=a.work.imageFragment.getElementById(this.name).cloneNode(),a.makeImage(b)},a.Image.prototype.checkNaturalDimensions=function(){var b,c,d=a.asset[this.name],e=a.xtGetTrue,f=!1;return d&&(b=parseFloat(e(d.offsetWidth,d.width,d.style.width,1)),c=parseFloat(e(d.offsetHeight,d.height,d.style.height,1)),b!==this.width&&(this.width=b,f=!0),c!==this.height&&(this.height=c,f=!0)),f&&this.updateDependentEntitys(),f},a.Image.prototype.updateDependentEntitys=function(){var a,b,c,d=scrawl.entity,e=scrawl.entitynames;for(b=0,c=e.length;c>b;b++)a=d[e[b]],"Picture"===a.type&&a.source===this.name&&a.setCopy();return!0},a.SpriteAnimation=function(b){var c=a.xtGet;return b=a.safeObject(b),a.Base.call(this,b),this.frames=a.xt(b.frames)?[].concat(b.frames):[],this.currentFrame=c(b.currentFrame,0),this.speed=c(b.speed,1),this.loop=c(b.loop,"end"),this.running=c(b.running,"complete"),this.lastCalled=c(b.lastCalled,Date.now()),a.spriteanimation[this.name]=this,a.pushUnique(a.spriteanimationnames,this.name),this},a.SpriteAnimation.prototype=Object.create(a.Base.prototype),a.SpriteAnimation.prototype.type="SpriteAnimation",a.SpriteAnimation.prototype.classname="spriteanimationnames",a.work.d.SpriteAnimation={frames:[],currentFrame:0,speed:1,loop:"end",running:"complete",lastCalled:0},a.work.animKeys=Object.keys(a.work.d.SpriteAnimation),a.mergeInto(a.work.d.SpriteAnimation,a.work.d.Scrawl),a.SpriteAnimation.prototype.set=function(b){var c;if(b=a.safeObject(b),c="pause"===this.loop?!0:!1,a.Base.prototype.set.call(this,b),a.xt(b.running))switch(b.running){case"forward":this.running="forward",c||(this.currentFrame=0);break;case"backward":this.running="backward",c||(this.currentFrame=this.frames.length-1);break;default:this.running="complete",this.currentFrame=0}return this},a.SpriteAnimation.prototype.getData=function(){var a,b;if(this.speed>0)switch(a=this.frames[this.currentFrame].d/this.speed,b=this.lastCalled+a<Date.now()?!0:!1,this.running){case"complete":this.lastCalled=Date.now();break;case"forward":b&&(this.getDataForward[this.loop](this),this.lastCalled=Date.now());break;case"backward":b&&(this.getDataBackward[this.loop](this),this.lastCalled=Date.now())}return this.frames[this.currentFrame]},a.SpriteAnimation.prototype.getDataForward={end:function(a){a.running=a.currentFrame+1>=a.frames.length?"complete":a.running,a.currentFrame=a.currentFrame+1>=a.frames.length?a.currentFrame:a.currentFrame+1},loop:function(a){a.currentFrame=a.currentFrame+1>=a.frames.length?0:a.currentFrame+1},reverse:function(a){a.running=a.currentFrame+1>=a.frames.length?"backward":"forward",a.currentFrame=a.currentFrame+1>=a.frames.length?a.currentFrame:a.currentFrame+1},pause:function(){}},a.SpriteAnimation.prototype.getDataBackward={end:function(a){a.running=a.currentFrame-1<=0?"complete":a.running,a.currentFrame=a.currentFrame-1<=0?a.currentFrame:a.currentFrame-1},loop:function(a){a.currentFrame=a.currentFrame-1<=0?a.frames.length-1:a.currentFrame-1},reverse:function(a){a.running=a.currentFrame-1<=0?"forward":"backward",a.currentFrame=a.currentFrame-1<=0?a.currentFrame:a.currentFrame-1},pause:function(){}},a.Video=function(b){var c,d=a.xt,e=a.xtGet;return b=a.safeObject(b),this.width=0,this.height=0,d(b.element)?(d(b.element)?b.name=e(b.name,b.element.getAttribute("id"),b.element.getAttribute("name"),""):d(b.url)&&(c=b.url.substr(0,128),b.name=e(b.name,c,"")),a.Base.call(this,b),a.video[this.name]=this,a.pushUnique(a.videonames,this.name),this.addVideoByElement(b),this):!1},a.Video.prototype=Object.create(a.Base.prototype),a.Video.prototype.type="Video",a.Video.prototype.classname="videonames",a.work.d.Video={width:0,height:0},a.mergeInto(a.work.d.Video,a.work.d.Base),a.Video.prototype.addVideoByElement=function(b){var c=b.element,d=["loadstart","loadedmetadata","loadeddata","canplay","canplaythrough"],e=a.xtGet(b.readyState,1);return a.xt(c)?(c.id=this.name,this.width=1,this.height=1,a.work.imageFragment.appendChild(c),a.asset[this.name]=a.work.imageFragment.querySelector("#"+this.name),a.pushUnique(a.assetnames,this.name),this.api=a.asset[this.name],this.api.readyState>=e?(this.setIntrinsicDimensions(),a.isa_fn(b.callback)&&b.callback()):this.api.addEventListener(d[e],function(){this.setIntrinsicDimensions(),a.isa_fn(b.callback)&&b.callback()},!1),!0):!1},a.Video.prototype.setIntrinsicDimensions=function(){var b,c,d,e,f,g=a.entity,h=a.entitynames;for(a.xt(this.api)?(c=this.api,d=this):(c=this,d=a.video[this.id]),d.width=c.videoWidth,d.height=c.videoHeight,e=0,f=h.length;f>e;e++)b=g[h[e]],"Picture"===b.type&&b.setCopy();return!0},a.Video.prototype.addVideoByUrl=function(){return!1},a}(scrawl);