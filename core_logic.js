/* 
   Copyright 2026 oneinagoogolplex._ 
   LEGAL: Cloning this source is a violation of DMCA 2026.
*/
(function(){
    // CHANGE THIS TO YOUR ACTUAL GITHUB LINK
    const _0xDOMAIN = 'your-username.github.io'; 

    if(window.location.hostname !== _0xDOMAIN && window.location.hostname !== 'localhost') {
        document.body.innerHTML = "<h1>Unauthorized Clone Detected. Source Protected by oneinagoogolplex._</h1>";
        window.location.href = "https://instagram.com/oneinagoogolplex._";
    }

    const _0xDB = function() { const _0xX = function(){ debugger; }; setInterval(_0xX, 100); };
    _0xDB();

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    window.isPopped = false;

    const _0xMAP = {
        'hero-t1': 'POORI', 'hero-t2': 'AAZAADI', 'hero-sub': 'Umeedon ka naya savera.',
        'hero-desc': 'The air is fresh. No more spheres. *Duniya tumhari hai.*',
        'p-t1': 'BE', 'p-t2': 'KHOUF', 'p-desc': 'No more chains, just pure strength.',
        'p-tag': 'Mera Asli Haq', 'st-t1': 'APNI', 'st-t2': 'MARZI',
        'st-desc': 'You are not a label. You are a boss.',
        'm-1': 'AAZAADI ● CHOICE ● POWER ● AAWAZ ● SHAKTI ● ',
        'm-2': 'AAZAADI ● CHOICE ● POWER ● AAWAZ ● SHAKTI ● ',
        'v-desc': 'Zero blame, only 100% support.',
        'bp-t1': 'MERI LIFE', 'bp-t2': 'MERE RULES', 'bp-desc': 'Your body, your temple.',
        'vb-t1': 'HAQQ', 'vb-t2': 'BEKHAUF', 'vb-desc1': '"Sach ki jeet, hamesha."',
        'side-label-1': 'Bindaas Spirit',
        'burst-t1': 'CHAK DE!', 'f-1': 'LIMITLESS', 'f-2': 'Ab jeeyo khul ke.'
    };

    const _0xIN = () => {
        new SplitType('.reveal-type', { types: 'words' });
        gsap.from(".stagger-reveal", { yPercent: 100, duration: 1.5, stagger: 0.1, ease: "expo.out" });
        
        ScrollTrigger.create({
            trigger: "#burst", start: "top 20%",
            onEnter: () => {
                if(!window.isPopped) {
                    gsap.to(window, { scrollTo: "#burst", duration: 0.8 });
                    document.body.classList.add('locked');
                }
            }
        });

        document.addEventListener('mousemove', (e) => {
            gsap.to("#cursor", { x: e.clientX, y: e.clientY, duration: 0.1 });
            window.updateT(e.clientX, e.clientY);
        });
    };

    const _0xHOPE = () => {
        window.isPopped = true;
        document.body.classList.remove('locked');
        document.body.classList.add('hope-mode');
        gsap.to("#violence, #victim-blaming", { backgroundColor: "#ffcc33", color: "#1a1a1a", duration: 1.5 });
        
        Object.keys(_0xMAP).forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                gsap.to(el, { opacity: 0, duration: 0.3, onComplete: () => { 
                    el.innerHTML = _0xMAP[id]; 
                    gsap.to(el, { opacity: 1, duration: 0.8 }); 
                }});
            }
        });
        document.getElementById('resources-section').style.display = 'flex';
        gsap.to(window, { scrollTo: 0, duration: 3, ease: "power4.inOut" });
    };

    document.getElementById('bubble-skin').addEventListener('click', () => {
        if (!window.isPopped) gsap.to('#bubble-skin', { scale: 3, opacity: 0, duration: 0.4, onComplete: _0xHOPE });
    });

    document.getElementById('bubble-skin').addEventListener('mousedown', () => window.setD(true));
    window.addEventListener('mouseup', () => window.setD(false));
    
    document.onkeydown = (e) => {
        if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) || (e.ctrlKey && e.keyCode == 85)) return false;
    };

    _0xIN();
})();
