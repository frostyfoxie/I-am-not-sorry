/* Copyright 2026 oneinagoogolplex._ - PRIVATE ENGINE */
const _0x1a2b=["\x77\x69\x64\x74\x68","\x68\x65\x69\x67\x68\x74","\x2D\x2D\x62\x75\x62\x62\x6c\x65\x2D\x73\x69\x7a\x65","\x74\x72\x61\x6e\x73\x66\x6f\x72\x6d"];
let _0xP={x:window.innerWidth/2,y:window.innerHeight/2},_0xV={x:0,y:0},_0xT={x:_0xP.x,y:_0xP.y};
let _0xS=1,_0xR=0,_0xTi=0,_0xIsD=false;const _0xEl={p:document.getElementById("bubble-positioner"),s:document.getElementById("bubble-stretch-wrapper"),g:document.getElementById("fixed-glints")};
window.runEngine=()=>{if(window.isPopped)return;const w=window.innerWidth,h=window.innerHeight;const sz=parseInt(getComputedStyle(document.documentElement).getPropertyValue(_0x1a2b[2]));
if(_0xIsD){_0xP.x+=(_0xT.x-_0xP.x)*0.15;_0xP.y+=(_0xT.y-_0xP.y)*0.15;_0xV.x=_0xP.x-window.lX;_0xV.y=_0xP.y-window.lY;window.lX=_0xP.x;window.lY=_0xP.y}
else{_0xTi+=0.032;_0xV.x+=Math.sin(_0xTi)*0.35;_0xV.y+=Math.cos(_0xTi*0.7)*0.15;_0xP.x+=_0xV.x;_0xP.y+=_0xV.y;_0xV.x*=0.97;_0xV.y*=0.97;
if(_0xP.x>w-sz/2||_0xP.x<sz/2)_0xV.x*=-0.5;if(_0xP.y>h-sz/2||_0xP.y<sz/2)_0xV.y*=-0.5}
const sp=Math.sqrt(_0xV.x**2+_0xV.y**2),rot=Math.atan2(_0xV.y,_0xV.x)*(180/Math.PI);_0xR+=(rot-_0xR)*0.06;let ts=Math.min(1+(sp*0.005),1.2);_0xS+=((ts-_0xS)*0.15);_0xS*=0.82;
_0xEl.p.style[_0x1a2b[3]]=`translate3d(${_0xP.x-sz/2}px,${_0xP.y-sz/2}px,0)`;_0xEl.s.style[_0x1a2b[3]]=`rotate(${_0xR}deg) scale(${_0xS},${1/_0xS})`;
_0xEl.g.style[_0x1a2b[3]]=`rotate(${-_0xR}deg) scale(${1/_0xS},${_0xS})`;requestAnimationFrame(window.runEngine)};
window.lX=_0xP.x;window.lY=_0xP.y;window.updateT=(x,y)=>{_0xT.x=x;_0xT.y=y};window.setD=(v)=>{_0xIsD=v};window.runEngine();
