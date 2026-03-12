/* Copyright 2026 oneinagoogolplex._ - PRIVATE ENGINE v2 */
const _0x1a2b=["width","height","--bubble-size","transform"];
let _0xP={x:window.innerWidth/2,y:window.innerHeight/2},_0xV={x:0,y:0},_0xT={x:_0xP.x,y:_0xP.y};
let _0xS=1,_0xR=0,_0xTi=0,_0xIsD=false;const _0xEl={p:document.getElementById("bubble-positioner"),s:document.getElementById("bubble-stretch-wrapper"),g:document.getElementById("fixed-glints")};
let bubbleSize=0; // The fix is here

function getBubbleSize(){
    const sizeStr = getComputedStyle(document.documentElement).getPropertyValue(_0x1a2b[2]).trim();
    return parseInt(sizeStr, 10);
}

window.runEngine=()=>{
    if(window.isPopped)return;
    if(bubbleSize === 0){ bubbleSize = getBubbleSize(); } // Read the size only once
    const w=window.innerWidth,h=window.innerHeight;
    
    if(_0xIsD){_0xP.x+=(_0xT.x-_0xP.x)*0.15;_0xP.y+=(_0xT.y-_0xP.y)*0.15;_0xV.x=_0xP.x-window.lX;_0xV.y=_0xP.y-window.lY;window.lX=_0xP.x;window.lY=_0xP.y}
    else{_0xTi+=0.032;_0xV.x+=Math.sin(_0xTi)*0.35;_0xV.y+=Math.cos(_0xTi*0.7)*0.15;_0xP.x+=_0xV.x;_0xP.y+=_0xV.y;_0xV.x*=0.97;_0xV.y*=0.97;
    if(_0xP.x>w-bubbleSize/2||_0xP.x<bubbleSize/2)_0xV.x*=-0.5;if(_0xP.y>h-bubbleSize/2||_0xP.y<bubbleSize/2)_0xV.y*=-0.5}

    const sp=Math.sqrt(_0xV.x**2+_0xV.y**2),rot=Math.atan2(_0xV.y,_0xV.x)*(180/Math.PI);_0xR+=(rot-_0xR)*0.06;let ts=1+Math.min(sp*0.005,0.2);
    _0xS+=((ts-_0xS)*0.15);_0xS*=0.82;
    _0xEl.p.style[_0x1a2b[3]]=`translate3d(${_0xP.x-bubbleSize/2}px,${_0xP.y-bubbleSize/2}px,0)`;_0xEl.s.style[_0x1a2b[3]]=`rotate(${_0xR}deg) scale(${_0xS},${1/_0xS})`;
    _0xEl.g.style[_0x1a2b[3]]=`rotate(${-_0xR}deg) scale(${1/_0xS},${_0xS})`;requestAnimationFrame(window.runEngine)};
    
window.lX=_0xP.x;window.lY=_0xP.y;window.updateT=(x,y)=>{_0xT.x=x;_0xT.y=y};window.setD=(v)=>{_0xIsD=v};window.runEngine();```

---

### Step 3: Hard Refresh
1.  After committing the changes for **both files** on GitHub, wait 60 seconds.
2.  Go to your site link.
3.  Perform a **hard refresh** to clear the cache: **`Ctrl + Shift + R`** (or **`Cmd + Shift + R`** on Mac).

The bubble should now be a perfect circle and move smoothly again. Let me know if that squashes the bug
