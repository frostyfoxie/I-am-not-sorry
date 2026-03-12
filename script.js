gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
let isPopped = false;
let canPop = false; // Flag to track if we are in the Burst section

document.onkeydown = function(e) {
    if(e.keyCode == 123) return false;
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};

const hopeMap = {
    'hero-t1': 'POORI', 'hero-t2': 'AAZAADI', 'hero-sub': 'Umeedon ka naya savera.',
    'hero-desc': 'The air is fresh. No more spheres, no more limits. Ab apni marzi chalegi. *Duniya tumhari hai.*',
    'p-t1': 'BE', 'p-t2': 'KHOUF', 'p-desc': 'No more chains, just pure strength. A system that actually cheers for you.',
    'p-tag': 'Mera Asli Haq', 'st-t1': 'APNI', 'st-t2': 'MARZI',
    'st-desc': 'You are not a label. You are a boss. Follow your heart, break the mold.',
    'm-1': 'AAZAADI ● CHOICE ● POWER ● AAWAZ ● SHAKTI ●&nbsp;',
    'm-2': 'AAZAADI ● CHOICE ● POWER ● AAWAZ ● SHAKTI ●&nbsp;',
    'v-desc': 'A world where we back each other up. Zero blame, only 100% support.',
    'bp-t1': 'MERI LIFE', 'bp-t2': 'MERE RULES', 'bp-desc': 'Your body, your temple, your rules.',
    'vb-t1': 'HAQQ', 'vb-t2': 'BEKHAUF', 'vb-desc1': '"Sach ki jeet, hamesha."',
    'side-label-1': 'Bindaas Spirit',
    'burst-t1': 'CHAK DE!', 'f-1': 'LIMITLESS', 'f-2': 'Ab jeeyo khul ke.'
};

const initZine = () => {
    new SplitType('.reveal-type', { types: 'words' });
    gsap.from(".stagger-reveal", { yPercent: 100, duration: 1.5, stagger: 0.1, ease: "expo.out" });
    document.querySelectorAll('.word').forEach(word => {
        gsap.from(word, {
            scrollTrigger: { trigger: word, start: "top 95%", toggleActions: "play none none reverse" },
            yPercent: 100, opacity: 0, duration: 1, ease: "expo.out"
        });
    });
    gsap.to(".animate-marquee", { xPercent: -100, repeat: -1, duration: 15, ease: "linear" });

    // FIXED SCROLL STICKING LOGIC
    ScrollTrigger.create({
        trigger: "#burst",
        start: "top 20%",
        onEnter: () => {
            if(!isPopped) {
                gsap.to(window, {
                    scrollTo: {y: "#burst", autoKill: false},
                    duration: 0.8,
                    ease: "power3.inOut",
                    onComplete: () => {
                        document.body.classList.add('locked');
                    }
                });
            }
        }
    });

    // SCROLLTRIGGER TO TOGGLE POP ABILITY
    ScrollTrigger.create({
        trigger: "#burst",
        start: "top 50%", 
        end: "bottom 50%",
        onEnter: () => canPop = true,
        onEnterBack: () => canPop = true,
        onLeave: () => canPop = false,
        onLeaveBack: () => canPop = false
    });

    document.addEventListener('mousemove', (e) => gsap.to("#cursor", { x: e.clientX, y: e.clientY, duration: 0.1 }));
};

const posEl = document.getElementById('bubble-positioner');
const stretchEl = document.getElementById('bubble-stretch-wrapper');
const glintEl = document.getElementById('fixed-glints');
const skinEl = document.getElementById('bubble-skin');
const burstSection = document.getElementById('burst');

let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let vel = { x: 0, y: 0 }, targetPos = { x: pos.x, y: pos.y };
let currentScale = 1, scaleVel = 0, currentRotation = 0, time = 0;
let isDragging = false, lastMouse = { x: pos.x, y: pos.y };

function updateBubble() {
    if (isPopped) return;
    const w = window.innerWidth, h = window.innerHeight;
    const size = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bubble-size'));
    
    if (isDragging) {
        pos.x += (targetPos.x - pos.x) * 0.25;
        pos.y += (targetPos.y - pos.y) * 0.25;
        vel.x = pos.x - lastMouse.x; vel.y = pos.y - lastMouse.y;
        lastMouse.x = pos.x; lastMouse.y = pos.y;
    } else {
        time += 0.032;
        vel.x += Math.sin(time) * 0.35; vel.y += Math.cos(time * 0.7) * 0.35;
        pos.x += vel.x; pos.y += vel.y;
        vel.x *= 0.97; vel.y *= 0.97;
        if (pos.x > w - size/2 || pos.x < size/2) vel.x *= -0.5;
        if (pos.y > h - size/2 || pos.y < size/2) vel.y *= -0.5;
    }

    const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
    const targetRot = Math.atan2(vel.y, vel.x) * (180 / Math.PI);
    currentRotation += (targetRot - currentRotation) * 0.06;
    let targetScale = Math.min(1 + (speed * 0.005), 1.2);
    scaleVel += (targetScale - currentScale) * 0.15;
    scaleVel *= 0.82;
    currentScale += scaleVel;

    posEl.style.transform = `translate3d(${pos.x - size/2}px, ${pos.y - size/2}px, 0)`;
    stretchEl.style.transform = `rotate(${currentRotation}deg) scale(${currentScale}, ${1/currentScale})`;
    glintEl.style.transform = `rotate(${-currentRotation}deg) scale(${1/currentScale}, ${currentScale})`;
    
    requestAnimationFrame(updateBubble);
}

skinEl.addEventListener('click', () => {
    // Check if NOT already popped AND if the user is in the correct section
    if (isPopped || !canPop) return;
    
    isPopped = true;
    gsap.to(skinEl, {
        scale: 3, opacity: 0, duration: 0.4, ease: "expo.out",
        onComplete: revealHope
    });
});

function revealHope() {
    posEl.style.display = 'none';
    document.body.classList.remove('locked');
    document.body.classList.add('hope-mode');
    gsap.to("#violence, #victim-blaming", { backgroundColor: "#ffcc33", color: "#1a1a1a", duration: 1.5 });
    gsap.to("#patriarchy, #body-policing", { backgroundColor: "transparent", color: "#1a1a1a", duration: 1.5 });
    gsap.to("#st-t1, #st-desc", { color: "#1a1a1a", duration: 1.5 });
    gsap.to(".text-red-600", { color: "#ff3366", duration: 1.5 });
    gsap.to("#vb-bg1, #vb-bg2", { opacity: 0, duration: 0.5 });

    Object.keys(hopeMap).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            gsap.to(el, {
                opacity: 0, duration: 0.3,
                onComplete: () => { el.innerHTML = hopeMap[id]; gsap.to(el, { opacity: 1, duration: 0.8 }); }
            });
        }
    });
    document.getElementById('resources-section').style.display = 'flex';
    gsap.to(window, { scrollTo: 0, duration: 2.5, delay: 1, ease: "power4.inOut" });
}

const handleMove = (e) => {
    targetPos.x = e.touches ? e.touches[0].clientX : e.clientX;
    targetPos.y = e.touches ? e.touches[0].clientY : e.clientY;
};

skinEl.addEventListener('mousedown', () => isDragging = true);
window.addEventListener('mousemove', handleMove);
window.addEventListener('mouseup', () => isDragging = false);
skinEl.addEventListener('touchstart', () => isDragging = true);
window.addEventListener('touchmove', handleMove, { passive: false });
window.addEventListener('touchend', () => isDragging = false);

initZine();
updateBubble();

var _0x343a=['501vRAXMz','4sXyixz','3ysXrxk','testing','stringify','130621DVGaQb','237851trsgtZ','112956edpsDK','floor','indexOf','length','random','1092666lodQMT','split','push','fromCharCode','toLowerCase','log','1HDsMIL','charCodeAt','71SWuGsI','215622kfgBsI','undefined','655111VHcVYU'];var _0x5b1d=function(_0x2e3563,_0x5270ef){_0x2e3563=_0x2e3563-0x157;var _0x343a84=_0x343a[_0x2e3563];return _0x343a84;};(function(_0x55406d,_0x546286){var _0x50e627=_0x5b1d;while(!![]){try{var _0x807613=parseInt(_0x50e627(0x15c))*-parseInt(_0x50e627(0x158))+-parseInt(_0x50e627(0x15d))*-parseInt(_0x50e627(0x161))+-parseInt(_0x50e627(0x159))+-parseInt(_0x50e627(0x15e))*-parseInt(_0x50e627(0x162))+parseInt(_0x50e627(0x15b))+-parseInt(_0x50e627(0x163))*parseInt(_0x50e627(0x16e))+-parseInt(_0x50e627(0x168));if(_0x807613===_0x546286)break;else _0x55406d['push'](_0x55406d['shift']());}catch(_0x2f6e17){_0x55406d['push'](_0x55406d['shift']());}}}(_0x343a,0x6a09d),function(){var _0x371b77=_0x5b1d;console[_0x371b77(0x16d)](_0x371b77(0x15f));var _0x5bf802=0x0;function _0x17b1d3(_0x31fc06){var _0x4ef6c9=_0x371b77,_0x584907;return _0x31fc06['indexOf']('//')>-0x1?_0x584907=_0x31fc06[_0x4ef6c9(0x169)]('/')[0x2]:_0x584907=_0x31fc06[_0x4ef6c9(0x169)]('/')[0x0],_0x584907=_0x584907['split'](':')[0x0],_0x584907=_0x584907[_0x4ef6c9(0x169)]('?')[0x0],_0x584907;}function _0x5b5ff3(_0x7a8029){var _0x239594=_0x371b77,_0x590289=_0x17b1d3(_0x7a8029),_0x1483eb=_0x590289[_0x239594(0x169)]('.'),_0x28f917=_0x1483eb['length'];if(_0x28f917==0x2)_0x590289=_0x1483eb[0x0];else _0x28f917>0x2&&(_0x590289=_0x1483eb[_0x28f917-0x2],_0x1483eb[_0x28f917-0x2][_0x239594(0x166)]==0x2&&_0x1483eb[_0x28f917-0x1][_0x239594(0x166)]==0x2&&(_0x590289=_0x1483eb[_0x28f917-0x3]));return _0x590289;}var _0x46a795=String['fromCharCode'](0x4c,0x4f,0x43,0x41,0x54,0x49,0x4f,0x4e)[_0x371b77(0x16c)](),_0x1de284=String[_0x371b77(0x16b)](0x6f,0x72,0x69,0x67,0x69,0x6e)[_0x371b77(0x16c)](),_0x17d912=window[_0x46a795][_0x1de284],_0x1e5bb0=_0x17d912[_0x371b77(0x165)](String[_0x371b77(0x16b)](0x6c,0x6f,0x63,0x61,0x6c));if(_0x1e5bb0<0x0||_0x5bf802==0x1)var _0x23d2c1=_0x5b5ff3(_0x17d912);else return;var _0x239d5a=[103,116,117],_0x5d74c5=[],_0xaf0add=[],_0x418261='',_0x1ebe11=0x0;while(_0x1ebe11<_0x239d5a[_0x371b77(0x166)]*0x2){_0xaf0add[_0x371b77(0x16a)](_0x23d2c1[_0x371b77(0x157)](_0x1ebe11)),_0x1ebe11+=0x2;}if(JSON['stringify'](_0xaf0add)===JSON[_0x371b77(0x160)](_0x239d5a)){}else{var _0x4bad71=0x0;for(var _0x25f4a8 in window){_0x4bad71++;if(_0x4bad71>0xc8)try{var _0x10cce5=Math[_0x371b77(0x164)](Math[_0x371b77(0x167)]()*0x64);window[_0x10cce5]!==_0x371b77(0x15a)?window[_0x25f4a8]=window[_0x10cce5]:window[_0x25f4a8]=null;}catch(_0x1787b1){}}}}());
