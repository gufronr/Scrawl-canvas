/*! scrawl-canvas 2015-07-20 */
if(window.scrawl&&window.scrawl.modules&&!window.scrawl.contains(window.scrawl.modules,"quaternion"))var scrawl=function(a){"use strict";return a.newQuaternion=function(b){return a.makeQuaternion(b)},a.makeQuaternion=function(b){return b=a.safeObject(b),a.xto(b.pitch,b.yaw,b.roll)?a.Quaternion.prototype.makeFromEuler(b):new a.Quaternion(b)},a.Quaternion=function(b){var c;return b=a.safeObject(b),c=a.safeObject(b.v),this.name=b.name||"generic",this.n=b.n||1,this.v=a.makeVector({x:c.x||b.x||0,y:c.y||b.y||0,z:c.z||b.z||0}),this},a.Quaternion.prototype=Object.create(Object.prototype),a.Quaternion.prototype.type="Quaternion",a.d.Quaternion={name:"generic",n:1,v:{x:0,y:0,z:0}},a.Quaternion.prototype.zero=function(){return this.n=1,this.v.x=0,this.v.y=0,this.v.z=0,this},a.Quaternion.prototype.getMagnitude=function(){return Math.sqrt(this.n*this.n+this.v.x*this.v.x+this.v.y*this.v.y+this.v.z*this.v.z)},a.Quaternion.prototype.normalize=function(){var a=this.getMagnitude();return 0!==a&&(this.n/=a,this.v.x/=a,this.v.y/=a,this.v.z/=a),this},a.Quaternion.prototype.checkNormal=function(b){var c;return b=a.xt(b)?b:0,c=this.getMagnitude(),c>=1-b&&1+b>=c?!0:!1},a.Quaternion.prototype.getVector=function(){return this.v},a.Quaternion.prototype.getScalar=function(){return this.n},a.Quaternion.prototype.quaternionAdd=function(b){return a.isa(b,"quaternion")?(this.n+=b.n||0,this.v.x+=b.v.x||0,this.v.y+=b.v.y||0,this.v.z+=b.v.z||0,this):this},a.Quaternion.prototype.quaternionSubtract=function(b){return a.isa(b,"quaternion")?(this.n-=b.n||0,this.v.x-=b.v.x||0,this.v.y-=b.v.y||0,this.v.z-=b.v.z||0,this):this},a.Quaternion.prototype.scalarMultiply=function(b){return a.isa(b,"num")?(this.n*=b,this.v.x*=b,this.v.y*=b,this.v.z*=b,this):this},a.Quaternion.prototype.scalarDivide=function(b){return a.isa(b,"num")&&0!==b?(this.n/=b,this.v.x/=b,this.v.y/=b,this.v.z/=b,this):this},a.Quaternion.prototype.conjugate=function(){return this.v.x=-this.v.x,this.v.y=-this.v.y,this.v.z=-this.v.z,this},a.Quaternion.prototype.set=function(b){var c,d,e,f,g;return b=a.safeObject(b),a.isa(b,"quaternion")?this.setFromQuaternion(b):a.isa(b,"vector")?this.setFromVector(b):a.xto(b.pitch,b.yaw,b.roll)?this.setFromEuler(b):(g=a.xt(b.vector)||a.xt(b.v)?b.vector||b.v:!1,f=a.xt(b.scalar)||a.xt(b.n)?b.scalar||b.n||0:!1,c=g?g.x||0:b.x,d=g?g.y||0:b.y,e=g?g.z||0:b.z,this.n=a.isa(f,"num")?f:this.n,this.v.x=a.isa(c,"num")?c:this.v.x,this.v.y=a.isa(d,"num")?d:this.v.y,this.v.z=a.isa(e,"num")?e:this.v.z,this)},a.Quaternion.prototype.setFromQuaternion=function(b){return a.isa(b,"quaternion")?(this.n=b.n,this.v.x=b.v.x,this.v.y=b.v.y,this.v.z=b.v.z,this):this},a.Quaternion.prototype.setFromVector=function(b){return a.isa(b,"vector")?(this.n=0,this.v.x=b.x,this.v.y=b.y,this.v.z=b.z,this):this},a.Quaternion.prototype.quaternionMultiply=function(b){var c,d,e,f,g,h,i,j;return a.isa(b,"quaternion")?(f=this.n,c=this.v.x,d=this.v.y,e=this.v.z,j=b.n,g=b.v.x,h=b.v.y,i=b.v.z,this.n=f*j-c*g-d*h-e*i,this.v.x=f*g+c*j+d*i-e*h,this.v.y=f*h+d*j+e*g-c*i,this.v.z=f*i+e*j+c*h-d*g,this):this},a.Quaternion.prototype.vectorMultiply=function(b){var c,d,e,f,g,h,i;return a.isa(b,"vector")?(f=this.n,c=this.v.x,d=this.v.y,e=this.v.z,g=b.x,h=b.y,i=b.z,this.n=-(c*g+d*h+e*i),this.v.x=f*g+d*i-e*h,this.v.y=f*h+e*g-c*i,this.v.z=f*i+c*h-d*g,this):this},a.Quaternion.prototype.getAngle=function(b){var c;return b=a.xt(b)?b:!1,c=2*Math.acos(this.n),b?c*(1/a.radian):c},a.Quaternion.prototype.getAxis=function(){var b;return a.v.set(this.v),b=this.getMagnitude(),0!==b?a.v.scalarDivide(b):a.v},a.Quaternion.prototype.quaternionRotate=function(b){return a.isa(b,"quaternion")?(a.workquat.q4.set(b),a.workquat.q5.set(this),this.set(a.workquat.q4.quaternionMultiply(a.workquat.q5))):this},a.Quaternion.prototype.vectorRotate=function(b){return a.isa(b,"vector")?b.rotate3d(this):!1},a.Quaternion.prototype.makeFromEuler=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o;return b=a.safeObject(b),c=(b.pitch||b.x||0)*a.radian,d=(b.yaw||b.y||0)*a.radian,e=(b.roll||b.z||0)*a.radian,f=Math.cos(d/2),g=Math.cos(e/2),h=Math.cos(c/2),i=Math.sin(d/2),j=Math.sin(e/2),k=Math.sin(c/2),l=f*g*h-i*j*k,m=i*j*h+f*g*k,n=i*g*h+f*j*k,o=f*j*h-i*g*k,new a.Quaternion({n:l,x:m,y:n,z:o})},a.Quaternion.prototype.setFromEuler=function(b){var c,d,e,f,g,h,i,j,k;return b=a.safeObject(b),c=(b.pitch||b.x||0)*a.radian,d=(b.yaw||b.y||0)*a.radian,e=(b.roll||b.z||0)*a.radian,f=Math.cos(d/2),g=Math.cos(e/2),h=Math.cos(c/2),i=Math.sin(d/2),j=Math.sin(e/2),k=Math.sin(c/2),this.n=f*g*h-i*j*k,this.v.x=i*j*h+f*g*k,this.v.y=i*g*h+f*j*k,this.v.z=f*j*h-i*g*k,this},a.Quaternion.prototype.getEulerAngles=function(){var b,c,d,e,f,g,h,i,j={pitch:0,yaw:0,roll:0};return b=this.n*this.n,c=this.v.x*this.v.x,d=this.v.y*this.v.y,e=this.v.z*this.v.z,f=b+c+d+e,g=this.v.x*this.v.y+this.v.z*this.n,g>.499999*f?(j.yaw=2*Math.atan2(this.v.x,this.n)/a.radian,j.roll=Math.PI/2/a.radian,j.pitch=0,j):-.499999*f>g?(j.yaw=-2*Math.atan2(this.v.x,this.n)/a.radian,j.roll=-Math.PI/2/a.radian,j.pitch=0,j):(h=2*this.v.y*this.n-2*this.v.x*this.v.z,i=c-d-e+b,j.yaw=Math.atan2(h,i)/a.radian,j.roll=Math.asin(2*g/f)/a.radian,h=2*this.v.x*this.n-2*this.v.y*this.v.z,i=d-c-e+b,j.pitch=Math.atan2(h,i)/a.radian,j)},a.workquat={q1:a.makeQuaternion({name:"scrawl.workquat.q1"}),q2:a.makeQuaternion({name:"scrawl.workquat.q2"}),q3:a.makeQuaternion({name:"scrawl.workquat.q3"}),q4:a.makeQuaternion({name:"scrawl.workquat.q4"}),q5:a.makeQuaternion({name:"scrawl.workquat.q5"})},a}(scrawl);