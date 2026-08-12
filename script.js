/* ============================================================
   HOLY FACE OF JESUS CHRIST – MASTER JAVASCRIPT
   "Voice in the Silent"
   Developed by Mac-Collins Ukwuoma · Graphic Realities
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

// ----- GOLDEN ARROW WALL (if on the golden-arrow page) -----
function fireGoldenArrow() {
    const input = document.getElementById('arrow-input');
    const stream = document.getElementById('arrow-stream');
    if (!input || !stream) return;

    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const arrowItem = document.createElement('div');
    arrowItem.className = 'arrow-item';
    arrowItem.innerHTML = `
        ${text}
        <span class="arrow-time">🕊️ ${timeStr} — Arrow fired to the Holy Face</span>
    `;

    stream.prepend(arrowItem);
    input.value = '';

    // Keep max 50 arrows
    while (stream.children.length > 50) {
        stream.removeChild(stream.lastChild);
    }
}

// ----- CANDLE WALL (if on candles page) -----
function lightCandle() {
    const nameInput = document.getElementById('candle-name');
    const intentionInput = document.getElementById('candle-intention');
    const grid = document.getElementById('candle-grid');
    if (!nameInput || !grid) return;

    const name = nameInput.value.trim() || 'Anonymous Soul';
    const intention = intentionInput.value.trim() || 'For the Holy Face';

    const candle = document.createElement('div');
    candle.className = 'candle';
    candle.title = `${name}: ${intention}`;
    candle.innerHTML = `
        <span class="candle-flame candle-lit">🕯️</span>
        <span class="name">${name.substring(0, 15)}</span>
    `;
    grid.prepend(candle);

    nameInput.value = '';
    intentionInput.value = '';

    // Save to localStorage
    const candles = JSON.parse(localStorage.getItem('holyface-candles') || '[]');
    candles.unshift({ name, intention, time: new Date().toISOString() });
    if (candles.length > 100) candles.length = 100;
    localStorage.setItem('holyface-candles', JSON.stringify(candles));
}

function loadCandles() {
    const grid = document.getElementById('candle-grid');
    if (!grid) return;
    const candles = JSON.parse(localStorage.getItem('holyface-candles') || '[]');
    candles.forEach(c => {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.title = `${c.name}: ${c.intention}`;
        candle.innerHTML = `
            <span class="candle-flame candle-lit">🕯️</span>
            <span class="name">${c.name.substring(0, 15)}</span>
        `;
        grid.appendChild(candle);
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
    // Brief animation
    countEl.style.transform = 'scale(1.3)';
    setTimeout(() => { countEl.style.transform = 'scale(1)'; }, 300);
}

function loadConsecrationCount() {
    const countEl = document.getElementById('consecration-count');
    if (!countEl) return;
    const count = parseInt(localStorage.getItem('holyface-consecrations') || '0');
    countEl.textContent = count.toLocaleString();
}

// ----- SITE VISITOR COUNTER (Simple, no 500k) -----
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
    loadConsecrationCount();
    incrementVisitorCount();
    loadVisitorCount();

    // Enter key for arrow input
    const arrowInput = document.getElementById('arrow-input');
    if (arrowInput) {
        arrowInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') fireGoldenArrow();
        });
    }

    // Smooth scroll for all anchor links
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
    console.log('🙏 Site by Mac-Collins Ukwuoma ·');
});