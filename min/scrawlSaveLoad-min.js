/*! scrawl-canvas 2016-12-15 */
if(window.scrawl&&window.scrawl.work.extensions&&!window.scrawl.contains(window.scrawl.work.extensions,"saveload"))var scrawl=function(a){"use strict";return a.load=function(b){var c,d,e,f,g;b.substring&&(b=[b]);for(var h=0,i=b.length;i>h;h++)if(b[h].substring&&(c=JSON.parse(b[h]),a.xt(c.type)))if(d=c.type.toLowerCase(),a.contains(a[c.classname],c.name)){e=a[d][c.name].parse(),f=a.work.d[c.type],g=Object.keys(e);for(var j=0,k=g.length;k>j;j++)a.xt(c[g])||(c[g]=f[g]);a[d][c.name].set(c)}else switch(d){case"pad":a.addCanvasToPage(c),a.work.currentPad=c.name;break;case"cell":a.xt(c.pad)&&a.contains(a.padnames,c.pad)&&!a.contains(a.pad[c.pad].cells,c.name)&&a.pad[c.pad].addNewCell(c);break;case"group":a.makeGroup(c);break;case"path":a.makePath(c);break;case"gradient":a.makeGradient(c);break;case"radialgradient":a.makeRadialGradient(c);break;default:new a[c.type](c)}return!0},a.save=function(b){var c,d,e=[];switch(b){case"pads":for(c=0,d=a.padnames.length;d>c;c++)e=e.concat(a.pad[a.padnames[c]].toString());break;case"cells":for(c=0,d=a.cellnames.length;d>c;c++)e=e.concat(a.cell[a.cellnames[c]].toString());break;case"groups":for(c=0,d=a.groupnames.length;d>c;c++)e=e.concat(a.group[a.groupnames[c]].toString());break;case"entitys":for(c=0,d=a.entitynames.length;d>c;c++)e=e.concat(a.entity[a.entitynames[c]].toString());break;case"designs":for(c=0,d=a.designnames.length;d>c;c++)e=e.concat(a.design[a.designnames[c]].toString());break;case"spriteanimations":if(a.xt(a.spriteanimationnames))for(c=0,d=a.spriteanimationnames.length;d>c;c++)e=e.concat(a.spriteanimation[a.spriteanimationnames[c]].toString());break;case"springs":if(a.xt(a.springnames))for(c=0,d=a.springnames.length;d>c;c++)e=e.concat(a.spring[a.springnames[c]].toString())}return e},a.Base.prototype.toString=function(){var b=Object.keys(a.work.d[this.type]),c={};c.type=this.type,c.classname=this.classname,c.name=this.name;for(var d=0,e=b.length;e>d;d++)a.xt(this[b[d]])&&this[b[d]]!==a.work.d[this.type][b[d]]&&(c[b[d]]=this[b[d]]);return JSON.stringify(c)},a.Position.prototype.toString=function(){var b=Object.keys(a.work.d[this.type]),c={};c.type=this.type,c.classname=this.classname,c.name=this.name;for(var d=0,e=b.length;e>d;d++)a.contains(["start","delta","handle"],b[d])?this[b[d]].isLike(a.work.d[this.type][b[d]])||(c[b[d]]=this[b[d]]):a.xt(this[b[d]])&&this[b[d]]!==a.work.d[this.type][b[d]]&&(c[b[d]]=this[b[d]]);return JSON.stringify(c)},a.PageElement.prototype.toString=function(){var b,c=Object.keys(a.work.d[this.type]),d={};d.type=this.type,d.classname=this.classname,d.name=this.name;for(var e=0,f=c.length;f>e;e++)a.contains(["start","delta","handle","perspective","translate"],c[e])&&(this[c[e]].isLike(a.work.d[this.type][c[e]])||(d[c[e]]=this[c[e]])),"rotation"===c[e]&&(b=this.rotation.getEulerAngles(),0!==b.pitch&&(d.pitch=b.pitch),0!==b.yaw&&(d.yaw=b.yaw),0!==b.roll&&(d.roll=b.roll)),"deltaRotation"===c[e]?(b=this.rotation.getEulerAngles(),0!==b.pitch&&(d.deltaPitch=b.pitch),0!==b.yaw&&(d.deltaYaw=b.yaw),0!==b.roll&&(d.deltaRoll=b.roll)):a.xt(this[c[e]])&&this[c[e]]!==a.work.d[this.type][c[e]]&&(d[c[e]]=this[c[e]]);return JSON.stringify(d)},a.Pad.prototype.toString=function(b){var c,d,e,f,g,h=Object.keys(a.work.d[this.type]),i={},j=[],k=[],l=[],m=[],n=["localWidth","localHeight","mouse","displayOffsetX","displayOffsetY"];for(i.type=this.type,i.classname=this.classname,i.name=this.name,i.parentElement=a.canvas[this.name].parentElement.id,d=0,e=h.length;e>d;d++)a.contains(["start","delta","handle"],h[d])?this[h[d]].isLike(a.work.d[this.type][h[d]])||(i[h[d]]=this[h[d]]):a.contains(n,h[d])||a.xt(this[h[d]])&&this[h[d]]!==a.work.d[this.type][h[d]]&&(i[h[d]]=this[h[d]]);if(j.push(JSON.stringify(i)),!b){for(d=0,e=this.cells.length;e>d;d++){for(f=0,g=a.cell[this.cells[d]].groups.length;g>f;f++)a.pushUnique(k,a.cell[this.cells[d]].groups[f]);j.push(a.cell[this.cells[d]].toString(!0))}for(d=0,e=k.length;e>d;d++){for(f=0,g=a.group[k[d]].entitys.length;g>f;f++)a.pushUnique(l,a.group[k[d]].entitys[f]);j.push(a.group[k[d]].toString(!0))}for(d=0,e=l.length;e>d;d++)c=a.ctx[a.entity[l[d]].context],a.contains(a.designnames,c.fillStyle)&&a.pushUnique(m,c.fillStyle),a.contains(a.designnames,c.strokeStyle)&&a.pushUnique(m,c.strokeStyle),a.contains(a.designnames,c.shadowColor)&&a.pushUnique(m,c.shadowColor);for(d=0,e=m.length;e>d;d++)j.push(a.design[m[d]].toString());for(d=0,e=l.length;e>d;d++)j.push(a.entity[l[d]].toString(!0))}return j},a.Cell.prototype.toString=function(b){var c,d,e,f,g,h=Object.keys(a.work.d[this.type]),i={},j=[],k=[],l=[],m=["copyData","pasteData","actualWidth","actualHeight"];for(i.type=this.type,i.classname=this.classname,i.name=this.name,d=0,e=h.length;e>d;d++)a.contains(["start","delta","handle","copy","copyDelta"],h[d])?this[h[d]].isLike(a.work.d[this.type][h[d]])||(i[h[d]]={x:this[h[d]].x,y:this[h[d]].y}):a.contains(m,h[d])||a.xt(this[h[d]])&&this[h[d]]!==a.work.d[this.type][h[d]]&&(i[h[d]]=this[h[d]]);if(j.push(JSON.stringify(i)),!b){for(d=0,e=this.groups.length;e>d;d++){for(f=0,g=a.group[this.groups[d]].entitys.length;g>f;f++)a.pushUnique(k,a.group[this.groups[d]].entitys[f]);j.push(a.group[this.groups[d]].toString(!0))}for(d=0,e=k.length;e>d;d++)c=a.ctx[a.entity[k[d]].context],a.contains(a.designnames,c.fillStyle)&&a.pushUnique(l,c.fillStyle),a.contains(a.designnames,c.strokeStyle)&&a.pushUnique(l,c.strokeStyle),a.contains(a.designnames,c.shadowColor)&&a.pushUnique(l,c.shadowColor);for(d=0,e=l.length;e>d;d++)j.push(a.design[l[d]].toString());for(d=0,e=k.length;e>d;d++)j.push(a.entity[k[d]].toString(!0))}return j},a.Context.prototype.toString=function(){for(var b={},c=0,d=a.work.contextKeys.length;d>c;c++)"lineDash"===a.work.contextKeys[c]?a.xt(this.lineDash)&&this.lineDash.length>0&&(b.lineDash=this.lineDash):a.xt(this[a.work.contextKeys[c]])&&this[a.work.contextKeys[c]]!==a.work.d.Context[a.work.contextKeys[c]]&&(b[a.work.contextKeys[c]]=this[a.work.contextKeys[c]]);return JSON.stringify(b)},a.Group.prototype.toString=function(b){var c,d,e,f=Object.keys(a.work.d[this.type]),g={},h=[],i=[];for(g.type=this.type,g.classname=this.classname,g.name=this.name,d=0,e=f.length;e>d;d++)a.xt(this[f[d]])&&this[f[d]]!==a.work.d[this.type][f[d]]&&(g[f[d]]=this[f[d]]);if(delete g.entitys,h.push(JSON.stringify(g)),!b){for(d=0,e=this.entitys.length;e>d;d++)c=a.ctx[a.entity[this.entitys[d]].context],a.contains(a.designnames,c.fillStyle)&&a.pushUnique(i,c.fillStyle),a.contains(a.designnames,c.strokeStyle)&&a.pushUnique(i,c.strokeStyle),a.contains(a.designnames,c.shadowColor)&&a.pushUnique(i,c.shadowColor);for(d=0,e=i.length;e>d;d++)h.push(a.design[i[d]].toString());for(d=0,e=this.entitys.length;e>d;d++)h.push(a.entity[this.entitys[d]].toString(!0))}return h},a.Group.prototype.save=function(){var b=Object.keys(a.work.d[this.type]),c={};c.type=this.type,c.classname=this.classname,c.name=this.name;for(var d=0,e=b.length;e>d;d++)a.xt(this[b[d]])&&this[b[d]]!==a.work.d[this.type][b[d]]&&(c[b[d]]=this[b[d]]);return[JSON.stringify(c)]},a.Entity.prototype.toString=function(b){b=a.xt(b)?b:!1;var c,d=Object.keys(a.work.d[this.type]),e={},f=a.ctx[this.context],g=[],h=[],i=["start","delta","handle","copy"],j=["collisionVectors","dataSet","pointList","firstPoint","linkList","linkDurations","perimeterLength","style","variant","weight","size","metrics","family","texts","copyData","pasteData","localHeight","localWidth"];if(e.type=this.type,e.classname=this.classname,e.name=this.name,!b){f&&f.fillStyle&&a.contains(a.designnames,f.fillStyle)&&a.pushUnique(g,f.fillStyle),f&&f.strokeStyle&&a.contains(a.designnames,f.strokeStyle)&&a.pushUnique(g,f.strokeStyle),f&&f.shadowColor&&a.contains(a.designnames,f.shadowColor)&&a.pushUnique(g,f.shadowColor);for(var k=0,l=g.length;l>k;k++)h.push(a.design[g[k]].toString())}for(var m=0,n=d.length;n>m;m++)if(a.contains(i,d[m]))this[d[m]].isLike(a.work.d[this.type][d[m]])||(e[d[m]]={x:this[d[m]].x,y:this[d[m]].y});else if("context"===d[m]&&a.xt(a.ctx[this.context])){f=JSON.parse(a.ctx[this.context].toString()),c=Object.keys(f);for(var o=0,p=c.length;p>o;o++)e[c[o]]=f[c[o]]}else a.contains(j,d[m])||a.xt(this[d[m]])&&this[d[m]]!==a.work.d[this.type][d[m]]&&(e[d[m]]=this[d[m]]);return"Picture"===this.type&&(e.url=a.image[this.source].source),h.push(JSON.stringify(e).replace("\\n","\\\\n")),h},a}(scrawl);