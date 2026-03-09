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
        <article class="featured-card" style="${index > 0 ? 'margin-top: 3rem;' : ''}">
            <div class="media-wrapper">
                ${getMediaHTML(proj.media)}
            </div>
            <div class="card-body">
                <div class="card-title-area">
                    <h4>${proj.title} <span class="status ${proj.statusClass}">${proj.status}</span></h4>
                    <div class="tech-list">${proj.techStack.join(' • ')}</div>
                    <p>${proj.description}</p>
                    <a href="${proj.projectLink}" style="color: var(--accent-color); font-family: var(--font-mono); font-size: 0.9rem; text-decoration: underline; text-underline-offset: 4px;">${proj.linkText}</a>
                </div>
                <div class="ide-window">
                    <div class="ide-header">
                        <div class="ide-dot" style="background:#ff5f56"></div><div class="ide-dot" style="background:#ffbd2e"></div><div class="ide-dot" style="background:#27c93f"></div>
                        <span style="margin-left:auto; color:#666;">${proj.codeSnippet.title}</span>
                    </div>
                    <div class="ide-content">${highlightCode(proj.codeSnippet.code)}</div>
                </div>
            </div>
        </article>
    `).join('');
    document.getElementById('architecture-container').innerHTML = archHtml;

    // 3. Render Games Bento Grid
    const gamesHtml = portfolioData.gameProjects.map(game => {
        const WrapperTag = game.media.type === 'image' ? 'a' : 'div';
        const linkAttr = game.media.type === 'image' ? `href="${game.link}"` : '';
        
        return `
        <${WrapperTag} ${linkAttr} class="bento-card">
            <div class="media-wrapper">
                ${getMediaHTML(game.media)}
            </div>
            <div class="bento-content">
                <div class="bento-header">
                    <h4>${game.title}</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${game.media.type === 'image' ? 'var(--accent-color)' : 'var(--text-secondary)'}" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                </div>
                <p>${game.description}</p>
                <div class="bento-footer"><span>${game.techStack.slice(0, 2).join(' • ')}</span><span>${game.techStack[2]}</span></div>
            </div>
        </${WrapperTag}>
    `}).join('');
    document.getElementById('games-container').innerHTML = gamesHtml;
}

// Initialize rendering
renderPortfolio();

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
    
    // Cool deep electric plasma/aurora shader
    const fsSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;

    void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv.x *= u_resolution.x / u_resolution.y;

        // Dark base color
        vec3 color = vec3(0.01, 0.015, 0.025);

        // Create slow undulating waves
        float wave1 = sin(uv.x * 2.5 + u_time * 0.4) * 0.5 + 0.5;
        float wave2 = cos(uv.y * 2.0 - u_time * 0.2 + uv.x) * 0.5 + 0.5;
        float wave3 = sin(uv.x * 4.0 + uv.y * 3.0 + u_time * 0.5) * 0.5 + 0.5;

        float v = (wave1 + wave2 + wave3) / 3.0;

        // Theme colors: Cyan and Deep Neon Blue
        vec3 cyan = vec3(0.0, 0.94, 1.0);
        vec3 deepBlue = vec3(0.0, 0.3, 0.6);

        // Blend glows
        color += mix(deepBlue, cyan, v) * v * 0.12;

        // Dim at the bottom
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
// 2. UI & PARTICLES
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

// Mobile Touch Events (Let users play with particles using their fingers!)
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
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
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
// 3. THE 3D SHADER GIZMO (NO LABELS)
// -----------------------------------------------------
const gizmoCanvas = document.getElementById('gizmo-canvas');
const gizmoGl = gizmoCanvas.getContext('webgl', { alpha: true }); 

if (gizmoGl) {
    const vsGizmo = `
        attribute vec2 position;
        void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;
    
    const fsGizmo = `
        precision highp float;
        uniform vec2 u_resolution;
        uniform float u_rotX;
        uniform float u_rotY;

        float sdArrow(vec3 p) {
            float shaft = max(length(p.xz) - 0.05, abs(p.y - 0.35) - 0.35);
            vec3 q = p;
            q.y -= 0.7; 
            float r = 0.15 * clamp(1.0 - q.y/0.3, 0.0, 1.0);
            float head = max(length(q.xz) - r, max(q.y - 0.3, -q.y));
            return min(shaft, head) - 0.005; 
        }

        vec2 map(vec3 p) {
            // Apply camera rotations
            float cy = cos(u_rotY), sy = sin(u_rotY);
            p.xz = mat2(cy, -sy, sy, cy) * p.xz;
            
            float cx = cos(u_rotX), sx = sin(u_rotX);
            p.yz = mat2(cx, -sx, sx, cx) * p.yz;

            vec2 res = vec2(999.0, 0.0);
            
            // X Arrow (Red)
            float dX = sdArrow(vec3(p.y, p.x, p.z));
            if(dX < res.x) res = vec2(dX, 1.0);
            
            // Y Arrow (Green)
            float dY = sdArrow(p);
            if(dY < res.x) res = vec2(dY, 2.0);
            
            // Z Arrow (Blue)
            float dZ = sdArrow(vec3(p.x, p.z, p.y));
            if(dZ < res.x) res = vec2(dZ, 3.0);
            
            // Center Sphere
            float dC = length(p) - 0.15;
            if(dC < res.x) res = vec2(dC, 4.0);
            
            return res;
        }

        vec3 calcNormal(vec3 p) {
            vec2 e = vec2(0.001, 0.0);
            return normalize(vec3(
                map(p+e.xyy).x - map(p-e.xyy).x,
                map(p+e.yxy).x - map(p-e.yxy).x,
                map(p+e.yyx).x - map(p-e.yyx).x
            ));
        }

        void main() {
            vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
            
            vec3 ro = vec3(uv * 2.8, 3.0); 
            vec3 rd = vec3(0.0, 0.0, -1.0);
            
            float t = 0.0;
            float id = 0.0;
            for(int i=0; i<60; i++) {
                vec3 p = ro + rd * t;
                vec2 res = map(p);
                if(res.x < 0.001) { id = res.y; break; }
                t += res.x;
                if(t > 10.0) break;
            }

            if(t < 10.0) {
                vec3 p = ro + rd * t;
                vec3 n = calcNormal(p);
                
                vec3 light = normalize(vec3(1.0, 1.0, 2.0));
                float diff = max(dot(n, light), 0.0);
                float amb = 0.4;
                
                vec3 col = vec3(0.0);
                if(id == 1.0) col = vec3(1.0, 0.2, 0.2); 
                if(id == 2.0) col = vec3(0.2, 1.0, 0.2); 
                if(id == 3.0) col = vec3(0.2, 0.4, 1.0); 
                if(id == 4.0) col = vec3(0.8);           
                
                float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
                vec3 finalCol = col * (diff * 0.6 + amb) + vec3(rim * 0.4);
                
                gl_FragColor = vec4(finalCol, 1.0);
            } else {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); 
            }
        }
    `;

    function createGizmoShader(type, source) {
        const shader = gizmoGl.createShader(type);
        gizmoGl.shaderSource(shader, source);
        gizmoGl.compileShader(shader);
        return shader;
    }

    const gizmoProgram = gizmoGl.createProgram();
    gizmoGl.attachShader(gizmoProgram, createGizmoShader(gizmoGl.VERTEX_SHADER, vsGizmo));
    gizmoGl.attachShader(gizmoProgram, createGizmoShader(gizmoGl.FRAGMENT_SHADER, fsGizmo));
    gizmoGl.linkProgram(gizmoProgram);
    gizmoGl.useProgram(gizmoProgram);

    const gizmoBuffer = gizmoGl.createBuffer();
    gizmoGl.bindBuffer(gizmoGl.ARRAY_BUFFER, gizmoBuffer);
    gizmoGl.bufferData(gizmoGl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gizmoGl.STATIC_DRAW);

    const posLocG = gizmoGl.getAttribLocation(gizmoProgram, "position");
    gizmoGl.enableVertexAttribArray(posLocG);
    gizmoGl.vertexAttribPointer(posLocG, 2, gizmoGl.FLOAT, false, 0, 0);

    const resLocG = gizmoGl.getUniformLocation(gizmoProgram, "u_resolution");
    const rotXLoc = gizmoGl.getUniformLocation(gizmoProgram, "u_rotX");
    const rotYLoc = gizmoGl.getUniformLocation(gizmoProgram, "u_rotY");

    function renderGizmo() {
        gizmoGl.viewport(0, 0, gizmoCanvas.width, gizmoCanvas.height);
        gizmoGl.uniform2f(resLocG, gizmoCanvas.width, gizmoCanvas.height);
        
        const scrollY = window.pageYOffset;
        const rotX = -0.4; 
        const rotY = 0.5 + (scrollY * 0.005); 

        gizmoGl.uniform1f(rotXLoc, rotX);
        gizmoGl.uniform1f(rotYLoc, rotY);
        
        gizmoGl.drawArrays(gizmoGl.TRIANGLES, 0, 6);

        requestAnimationFrame(renderGizmo);
    }
    requestAnimationFrame(renderGizmo);
}

// -----------------------------------------------------
        // SEAMLESS PAGE TRANSITION & BACK-BUTTON FIX
        // -----------------------------------------------------
        
        // 1. Reveal page on load (and handle the browser 'Back' button)
        window.addEventListener('pageshow', (event) => {
            // If the page is loaded from the browser's memory cache (Back button)
            if (event.persisted) {
                document.body.classList.remove('is-exiting');
                document.body.classList.add('is-loaded');
            } else {
                // Normal first-time load
                setTimeout(() => { document.body.classList.add('is-loaded'); }, 100);
            }
        });

        // 2. Fade out on link click
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
// GLOBAL IDE WINDOW COLLAPSE LOGIC
// -----------------------------------------------------
document.addEventListener('click', function(e) {
    // Check if the user clicked on an IDE header (or the text inside it)
    const header = e.target.closest('.ide-header');
    if (header) {
        // Find the parent window and toggle the 'collapsed' class
        const window = header.closest('.ide-window');
        if (window) {
            window.classList.toggle('collapsed');
        }
    }
});