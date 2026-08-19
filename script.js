/* ============================================================
   HOLY FACE OF JESUS CHRIST – MASTER JAVASCRIPT
   "Voice in the Silent"
   Developed by Mac-Collins Ukwuoma
   ============================================================ */

// ----- PARTICLES BACKGROUND -----
(function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedY = Math.random() * 0.3 + 0.1;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.5 ? '184, 148, 30' : '232, 213, 163';
        }
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                this.reset();
                this.y = canvas.height + 10;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        const count = Math.min(Math.floor(window.innerWidth * 0.08), 100);
        particles = Array.from({ length: count }, () => new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    resizeCanvas();
    initParticles();
    animate();
})();

// ============================================================
// SMART HEADER — Facebook Lite Style
// Hide on scroll down, show on scroll up
// ============================================================
(function() {
    let lastScrollY = window.scrollY;
    let scrollTimeout;
    const header = document.querySelector('header');

    function handleScroll() {
        if (!header) return;
        
        const currentScrollY = window.scrollY;
        
        // Always show header at top of page
        if (currentScrollY <= 50) {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            lastScrollY = currentScrollY;
            return;
        }
        
        // Clear previous timeout for smooth behavior
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Delay slightly for smooth transition
        scrollTimeout = setTimeout(() => {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling DOWN — hide header
                header.classList.add('header-hidden');
                header.classList.remove('header-visible');
            } else {
                // Scrolling UP — show header
                header.classList.remove('header-hidden');
                header.classList.add('header-visible');
            }
            lastScrollY = currentScrollY;
        }, 50);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize header as visible on page load
    if (header) {
        header.classList.add('header-visible');
    }
})();

// ============================================================
// PERSISTENT STORAGE FOR CANDLES AND ARROWS
// ============================================================

// ----- CANDLE WALL -----
function lightCandle() {
    const nameInput = document.getElementById('candle-name');
    const intentionInput = document.getElementById('candle-intention');
    const grid = document.getElementById('candle-grid');
    if (!nameInput || !grid) return;

    const name = nameInput.value.trim() || 'Anonymous Soul';
    const intention = intentionInput.value.trim() || 'For the Holy Face';
    const now = new Date();
    const timeStr = now.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
    });

    // Save to localStorage (PERSISTENT)
    const candles = JSON.parse(localStorage.getItem('holyface-candles') || '[]');
    candles.unshift({ 
        name: name, 
        intention: intention, 
        time: timeStr,
        timestamp: now.toISOString()
    });
    localStorage.setItem('holyface-candles', JSON.stringify(candles));

    // Add to DOM
    const candle = document.createElement('div');
    candle.className = 'candle';
    candle.title = `${name}: ${intention} (Lit on ${timeStr})`;
    candle.innerHTML = `
        <span class="candle-flame candle-lit">🕯️</span>
        <span class="name">${name.substring(0, 20)}</span>
    `;
    grid.prepend(candle);

    // Clear inputs
    nameInput.value = '';
    intentionInput.value = '';

    updateCandleCounter();

    alert('🕯️ Your candle is burning before the Holy Face. Your intention will be prayed for.');
}

function loadCandles() {
    const grid = document.getElementById('candle-grid');
    if (!grid) return;

    const candles = JSON.parse(localStorage.getItem('holyface-candles') || '[]');
    
    if (candles.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-dim); font-style: italic; grid-column: 1/-1; padding: 40px;">No candles yet. Be the first to light one. 🕯️</p>';
        return;
    }

    candles.forEach(c => {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.title = `${c.name}: ${c.intention} (Lit on ${c.time})`;
        candle.innerHTML = `
            <span class="candle-flame candle-lit">🕯️</span>
            <span class="name">${c.name.substring(0, 20)}</span>
        `;
        grid.appendChild(candle);
    });
}

function updateCandleCounter() {
    const counterEl = document.getElementById('candle-total');
    if (!counterEl) return;
    const candles = JSON.parse(localStorage.getItem('holyface-candles') || '[]');
    counterEl.textContent = candles.length;
}

// ----- GOLDEN ARROW WALL -----
function fireGoldenArrow() {
    const input = document.getElementById('arrow-input');
    const stream = document.getElementById('arrow-stream');
    if (!input || !stream) return;

    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = now.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
    });

    // Save to localStorage (PERSISTENT)
    const arrows = JSON.parse(localStorage.getItem('holyface-arrows') || '[]');
    arrows.unshift({ 
        text: text, 
        time: timeStr,
        timestamp: now.toISOString()
    });
    localStorage.setItem('holyface-arrows', JSON.stringify(arrows));

    // Add to DOM
    const arrowItem = document.createElement('div');
    arrowItem.className = 'arrow-item';
    arrowItem.innerHTML = `
        ${text}
        <span class="arrow-time">🕊️ ${timeStr} — Arrow fired to the Holy Face</span>
    `;
    stream.prepend(arrowItem);

    input.value = '';
}

function loadArrows() {
    const stream = document.getElementById('arrow-stream');
    if (!stream) return;

    const arrows = JSON.parse(localStorage.getItem('holyface-arrows') || '[]');
    
    if (arrows.length === 0) {
        stream.innerHTML = '<p style="text-align: center; color: var(--text-dim); font-style: italic; padding: 40px;">No arrows fired yet. Be the first to fire one. 🏹</p>';
        return;
    }

    stream.innerHTML = '';
    arrows.forEach(a => {
        const arrowItem = document.createElement('div');
        arrowItem.className = 'arrow-item';
        arrowItem.innerHTML = `
            ${a.text}
            <span class="arrow-time">🕊️ ${a.time} — Arrow fired to the Holy Face</span>
        `;
        stream.appendChild(arrowItem);
    });
}

// ----- CONSECRATION COUNTER -----
function pledgeConsecration() {
    const countEl = document.getElementById('consecration-count');
    if (!countEl) return;
    let count = parseInt(localStorage.getItem('holyface-consecrations') || '0');
    count++;
    localStorage.setItem('holyface-consecrations', count);
    countEl.textContent = count.toLocaleString();
    countEl.style.transform = 'scale(1.3)';
    setTimeout(() => { countEl.style.transform = 'scale(1)'; }, 300);
    alert('🕊️ Your consecration has been recorded. May the Holy Face shine upon you.');
}

function loadConsecrationCount() {
    const countEl = document.getElementById('consecration-count');
    if (!countEl) return;
    const count = parseInt(localStorage.getItem('holyface-consecrations') || '0');
    countEl.textContent = count.toLocaleString();
}

// ----- SITE VISITOR COUNTER -----
function incrementVisitorCount() {
    const countEl = document.getElementById('visitor-count');
    if (!countEl) return;
    let count = parseInt(localStorage.getItem('holyface-visitors') || '0');
    count++;
    localStorage.setItem('holyface-visitors', count);
    countEl.textContent = count.toLocaleString();
}

function loadVisitorCount() {
    const countEl = document.getElementById('visitor-count');
    if (!countEl) return;
    const count = parseInt(localStorage.getItem('holyface-visitors') || '1');
    countEl.textContent = count.toLocaleString();
}

// ----- INITIALIZE ON PAGE LOAD -----
document.addEventListener('DOMContentLoaded', () => {
    loadCandles();
    loadArrows();
    loadConsecrationCount();
    incrementVisitorCount();
    loadVisitorCount();
    updateCandleCounter();

    const arrowInput = document.getElementById('arrow-input');
    if (arrowInput) {
        arrowInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') fireGoldenArrow();
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    console.log('🕊️ Holy Face of Jesus, have mercy on us.');
    console.log('🙏 Site by Mac-Collins Ukwuoma');
    console.log('📿 Candles and Arrows are stored locally so you can pray for each intention.');
});