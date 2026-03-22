// -----------------------------------------------------
// 0. DATA RENDERING LOGIC
// -----------------------------------------------------

// Helper function to generate HTML based on media type
function getMediaHTML(media) {
    if (media.type === 'video') {
        return `
            <video autoplay loop muted playsinline poster="${media.fallbackImg}">
                <source src="${media.src}" type="video/mp4">
                <img src="${media.fallbackImg}" alt="Video Fallback">
            </video>`;
    } else if (media.type === 'iframe') {
        return `<iframe src="${media.src}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (media.type === 'hover-gif') {
        // NEW: Hover GIF logic!
        return `<img src="${media.src}" data-static="${media.src}" data-hover="${media.hoverSrc}" class="hover-gif" alt="Project Media">`;
    } else {
        return `<img src="${media.src}" alt="Project Media">`;
    }
}

// Helper function for syntax highlighting
function highlightCode(code) {
    return code
        .replace(/\/\/.*/g, match => `<span className="cm">${match}</span>`) 
        .replace(/\b(void|delete|while|for|if|else|int|float|double|bool|class|struct)\b/g, '<span class="kw">$1</span>') 
        .replace(/\b(CommandStack|ICommand|Renderer|Pipeline)\b/g, '<span class="ty">$1</span>')
        .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="fn">$1</span>')
        .replace(/className=/g, 'class='); 
}

function renderPortfolio() {
    // 1. Render Sidebar
    const sidebarHtml = `
        <div>
            <div class="status-badge"><div class="pulse"></div> ${portfolioData.sidebar.status}</div>
            <h1 class="text-gradient">${portfolioData.sidebar.name}</h1>
            <h2>${portfolioData.sidebar.title}</h2>
            <p style="font-size: 0.95rem;">${portfolioData.sidebar.description}</p>
            <div class="instant-skills">
                ${portfolioData.sidebar.skills.map((skill, index) => 
                    `<span class="skill-tag" ${index === 0 ? 'style="border-color: var(--accent-color); color: var(--accent-color);"' : ''}>${skill}</span>`
                ).join('')}
            </div>
        </div>
        <div>
            <div class="nav-links">
                <a href="${portfolioData.sidebar.links.email}" class="btn btn-primary">Contact / Email</a>
                <a href="${portfolioData.sidebar.links.resume}" target="_blank" class="btn btn-secondary">View Resume (PDF)</a>
                <a href="${portfolioData.sidebar.links.linkedin}" target="_blank" class="btn btn-secondary">
                    <svg viewBox="0 0 24 24" style="width:16px; height:16px; fill:currentColor; margin-right: 8px;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    LinkedIn
                </a>
            </div>
            <div class="sidebar-footer">
                <span id="fps" style="color: var(--accent-color);">60 FPS</span>
                <span>DRAW CALLS: 1</span>
            </div>
        </div>
    `;
    document.getElementById('sidebar-container').innerHTML = sidebarHtml;

    // 2. Render Architecture Section
    const archHtml = portfolioData.architectureProjects.map((proj, index) => `
        <article class="featured-card" style="position: relative; ${index > 0 ? 'margin-top: 3rem;' : ''}">
            
            <a href="${proj.projectLink}" style="position: absolute; inset: 0; z-index: 10; width: 100%; height: 100%;"></a>

            <div class="media-wrapper" style="position: relative; z-index: 1;">
                ${getMediaHTML(proj.media)}
            </div>
            <div class="card-body">
                <div class="card-title-area" style="position: relative; z-index: 1;">
                    <h4>${proj.title} <span class="status ${proj.statusClass}">${proj.status}</span></h4>
                    <div class="tech-list">${proj.techStack.join(' • ')}</div>
                    <p>${proj.description}</p>
                    <span style="color: var(--accent-color); font-family: var(--font-mono); font-size: 0.9rem; text-decoration: underline; text-underline-offset: 4px; pointer-events: none;">${proj.linkText}</span>
                </div>
                
                <div class="ide-window" style="position: relative; z-index: 11;">
                    <div class="ide-header">
                        <span style="margin-left:auto; color:#666;">${proj.codeSnippet.title}</span>
                    </div>
                    <div class="ide-content">${highlightCode(proj.codeSnippet.code)}</div>
                </div>
            </div>
        </article>
    `).join('');
    document.getElementById('architecture-container').innerHTML = archHtml;

    // 3. Render Games Bento Grid
    const gamesHtml = portfolioData.gameProjects.map(game => `
        <div class="bento-card" style="position: relative; overflow: hidden;">
            
            <a href="${game.link}" style="position: absolute; inset: 0; z-index: 10; width: 100%; height: 100%;"></a>
            
            <div class="media-wrapper" style="position: relative; z-index: 1;">
                ${getMediaHTML(game.media)}
            </div>
            <div class="bento-content" style="position: relative; z-index: 1;">
                <div class="bento-header">
                    <h4>${game.title}</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                </div>
                <p>${game.description}</p>
                <div class="bento-footer"><span>${game.techStack.slice(0, 2).join(' • ')}</span><span>${game.techStack[2]}</span></div>
            </div>
        </div>
    `).join('');
    document.getElementById('games-container').innerHTML = gamesHtml;
}

// Initialize rendering
renderPortfolio();

// -----------------------------------------------------
// HOVER GIF LOGIC (Swaps image source when hovering over the card)
// -----------------------------------------------------
document.addEventListener('mouseover', function(e) {
    const card = e.target.closest('.bento-card, .featured-card');
    if (card) {
        const img = card.querySelector('.hover-gif');
        if (img && img.dataset.hover) {
            img.src = img.dataset.hover; // Play GIF
        }
    }
});

document.addEventListener('mouseout', function(e) {
    const card = e.target.closest('.bento-card, .featured-card');
    if (card) {
        const img = card.querySelector('.hover-gif');
        if (img && img.dataset.static) {
            img.src = img.dataset.static; // Back to static image
        }
    }
});

// -----------------------------------------------------
// 1. SMOOTH ANTI-BANDING SHADER BACKGROUND
// -----------------------------------------------------
const shaderCanvas = document.getElementById('shader-canvas');
const gl = shaderCanvas.getContext('webgl');

if (gl) {
    const vsSource = `
    attribute vec2 position;
    void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;
    
    const fsSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;

    void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv.x *= u_resolution.x / u_resolution.y;
        vec3 color = vec3(0.01, 0.015, 0.025);
        float wave1 = sin(uv.x * 2.5 + u_time * 0.4) * 0.5 + 0.5;
        float wave2 = cos(uv.y * 2.0 - u_time * 0.2 + uv.x) * 0.5 + 0.5;
        float wave3 = sin(uv.x * 4.0 + uv.y * 3.0 + u_time * 0.5) * 0.5 + 0.5;
        float v = (wave1 + wave2 + wave3) / 3.0;
        vec3 cyan = vec3(0.0, 0.94, 1.0);
        vec3 deepBlue = vec3(0.0, 0.3, 0.6);
        color += mix(deepBlue, cyan, v) * v * 0.12;
        color *= (0.3 + 0.7 * gl_FragCoord.y / u_resolution.y);
        gl_FragColor = vec4(color, 1.0);
    }
    `;

    function createShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    function renderShader(time) {
        if(shaderCanvas.width !== window.innerWidth || shaderCanvas.height !== window.innerHeight) {
            shaderCanvas.width = window.innerWidth;
            shaderCanvas.height = window.innerHeight;
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        }
        gl.uniform2f(resLoc, gl.canvas.width, gl.canvas.height);
        gl.uniform1f(timeLoc, time * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(renderShader);
    }
    requestAnimationFrame(renderShader);
}

// -----------------------------------------------------
// 2. UI & PARTICLES (Restored!)
// -----------------------------------------------------
const fpsElem = document.getElementById("fps");
let lastTime = performance.now();
let frameCount = 0;
function updateFPS() {
    const now = performance.now();
    frameCount++;
    if (now - lastTime >= 1000) {
        fpsElem.innerText = frameCount + " FPS";
        frameCount = 0; lastTime = now;
    }
    requestAnimationFrame(updateFPS);
}
updateFPS();

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 60;
const connectionDistance = 150;
const mouse = { x: null, y: null };

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

// Desktop Mouse Events
window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

// Mobile Touch Events
window.addEventListener('touchstart', (e) => { 
    mouse.x = e.touches[0].clientX; 
    mouse.y = e.touches[0].clientY; 
}, {passive: true});

window.addEventListener('touchmove', (e) => { 
    mouse.x = e.touches[0].clientX; 
    mouse.y = e.touches[0].clientY; 
}, {passive: true});

window.addEventListener('touchend', () => { 
    mouse.x = null; 
    mouse.y = null; 
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        this.vx = (Math.random() - 0.5) * 0.2; 
        this.vy = (Math.random() - 0.5) * 0.2; 
        
        this.size = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
} 

for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dist / connectionDistance) * 0.3})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }

        if (mouse.x != null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dist / 200) * 0.5})`;
                ctx.lineWidth = 1.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// -----------------------------------------------------
// 3. SEAMLESS PAGE TRANSITION & BACK-BUTTON FIX
// -----------------------------------------------------
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('is-exiting');
        document.body.classList.add('is-loaded');
    } else {
        setTimeout(() => { document.body.classList.add('is-loaded'); }, 100);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname && !this.hash && this.target !== '_blank') {
                e.preventDefault();
                const destination = this.href;
                document.body.classList.remove('is-loaded');
                document.body.classList.add('is-exiting');
                setTimeout(() => { window.location.href = destination; }, 500); 
            }
        });
    });
});

// -----------------------------------------------------
// 4. GLOBAL IDE WINDOW COLLAPSE LOGIC
// -----------------------------------------------------
document.addEventListener('click', function(e) {
    const header = e.target.closest('.ide-header');
    if (header) {
        const window = header.closest('.ide-window');
        if (window) {
            window.classList.toggle('collapsed');
        }
    }
});