gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
let isPopped = false;

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
        start: "top 20%", // Trigger slightly before it hits the top
        onEnter: () => {
            if(!isPopped) {
                // Smoothly snap to section before locking
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
        pos.x += (targetPos.x - pos.x) * 0.15;
        pos.y += (targetPos.y - pos.y) * 0.15;
        vel.x = pos.x - lastMouse.x; vel.y = pos.y - lastMouse.y;
        lastMouse.x = pos.x; lastMouse.y = pos.y;
    } else {
        time += 0.032;
        vel.x += Math.sin(time) * 0.35; vel.y += Math.cos(time * 0.7) * 0.15;
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
    if (isPopped) return;

    // Check if the '#burst' section is currently in the viewport
    const rect = burstSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
        // Simplified pop condition: only works if in the Burst section
        isPopped = true;
        gsap.to(skinEl, {
            scale: 3, opacity: 0, duration: 0.4, ease: "expo.out",
            onComplete: revealHope
        });
    }
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
