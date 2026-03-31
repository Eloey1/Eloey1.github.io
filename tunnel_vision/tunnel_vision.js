// -----------------------------------------------------
// 1. PROJECT DATA
// -----------------------------------------------------
const projectData = {
    title: "Tunnel Vision",
    tagline: "Narrative Driven 2D Platformer",
    status: "Complete",
    techStack: ["C++", "TGE Engine", "Tools", "Data-Driven", "JSON"],
    stats: [
        { label: "Engine", value: "TGE Engine" },
        { label: "Language", value: "C++" },
        { label: "Role", value: "Gameplay & Tools Programmer" },
        { label: "Release Year", value: "2025" }
    ],
    mainMedia: {
        type: "iframe", 
        src: "https://www.youtube.com/embed/C2sNwLEPPF4",
        fallbackImg: ""
    },
    overview: [
        "Tunnel Vision was our first project built using TGA's in-house engine (TGE). At the time, TGE functioned more as a barebones framework than a complete engine. To solve our tooling needs, we established a custom pipeline where our level designers used Unity as a level editor, exporting scene data as JSON files that we parsed and loaded directly into our engine.",
        "In the game, players step into the role of a struggling artist, traversing their own mindspace to rediscover their passion for art and overcome their inner doubts."
    ],
    challenges: [
        {
            title: "Particles",
            desc: "This was my first time making a particle system and when I fell in love making tools. I needed a way of making it possible for other teamates to make particles and in this project I made it possibel with a data driven approach using json files"
        },
        {
            title: "Player Movement",
            desc: "For me a movement can really make or break a platformer and I really worked hard to make this celeste inspired player movement, and I made my first ImGui tool so the level designers could tweak the numbers of the movement and save to a JSON file"
        }
    ],
    codeSnippet: {
        title: "src/particles/DashTrail.json",
        code: `{
    "dashParticles": {
        "ParticlePoolSize": 50,
        "Sprite": "Sprites/DashTrailParticle.dds",
        
        "MaxLifeTime": 0.8,
        "MinLifeTime": 0.2,
        
        "MaxXVelocity": 10.0,
        "MaxYVelocity": 10.0,
        "MinXVelocity": -10.0,
        "MinYVelocity": -10.0,

        "EmitInterval": 0.05,
        "EmitPerInterval": 1,

        "MaxStartSize": 0.02,
        "MinStartSize": 0.02,
        "MaxEndSize": 0.24,
        "MinEndSize": 0.24,

        "StartColor": "ffffff",
        "EndColor": "ffffff",

        "StartAlpha": 0.3,
        "EndAlpha": 1,
        
        "Radius": 0
    }
}`
    },
    gallery: [
        {
            media: { type: "image", src: "../image/tunnel_vision/LilGuy.gif" },
            caption: "Early stages of the particle system"
        },
        {
            media: { type: "image", src: "../image/tunnel_vision/LilGuyDashing.gif" },
            caption: "More testing of the particle system"
        },
        {
            media: { type: "image", src: "../image/tunnel_vision/DashTrail.gif" },
            caption: "After some itteration from a animator"
        }
    ]
};

// -----------------------------------------------------
// 2. RENDERING LOGIC
// -----------------------------------------------------
function getMediaHTML(media) {
    if (media.type === 'video') {
        return `<video autoplay loop muted playsinline poster="${media.fallbackImg}">
                    <source src="${media.src}" type="video/mp4">
                    <img src="${media.fallbackImg}" alt="Fallback">
                </video>`;
    } else if (media.type === 'iframe') {
        // Includes YouTube security attributes so it plays properly!
        return `<iframe src="${media.src}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>`;
    } else {
        return `<img src="${media.src}" alt="Media">`;
    }
}

function highlightCode(code) {
    return code
        .replace(/"(.*?)"/g, '<span class="ty">"$1"</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="kw">$1</span>')
        .replace(/\/\/.*/g, match => `<span className="cm">${match}</span>`)
        .replace(/className=/g, 'class='); 
}

function renderProjectPage() {
    const container = document.getElementById('project-content');

    const html = `
        <div class="back-nav fade-in">
            <a href="/" class="back-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                cd ../portfolio
            </a>
        </div>

        <header class="project-hero">
            <div class="status-badge fade-in d-1"><div class="pulse"></div> ${projectData.status}</div>
            <h1 class="text-gradient fade-in d-2">${projectData.title}</h1>
            <p class="project-tagline fade-in d-3">${projectData.tagline}</p>
        </header>

        <div class="media-wrapper media-reveal hero-media">
            ${getMediaHTML(projectData.mainMedia)}
        </div>

        <div class="article-layout">
            <aside class="article-sidebar fade-in d-4">
                <div class="stats-panel">
                    <h3 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-color); margin-bottom: 1.5rem;">Project Details</h3>
                    ${projectData.stats.map(s => `
                        <div class="stat-item">
                            <span class="stat-label">${s.label}</span>
                            <span class="stat-value">${s.value}</span>
                        </div>
                    `).join('')}
                    
                    <div class="stat-item" style="border-bottom: none; padding-bottom: 0;">
                        <span class="stat-label">Tech Stack</span>
                        <div class="instant-skills" style="margin-top: 0.8rem;">
                            ${projectData.techStack.map(t => `<span class="skill-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </aside>

            <div class="article-main fade-in d-5">
                <section class="article-section scroll-reveal">
                    <h2>About the Project</h2>
                    ${projectData.overview.map(p => `<p>${p}</p>`).join('')}
                </section>

                <section class="article-section scroll-reveal">
                    <h2>Development & Challenges</h2>
                    <div class="feature-grid">
                        ${projectData.challenges.map(chal => `
                            <div class="bento-card" style="padding: 2rem;">
                                <h4 style="margin-bottom: 15px; color: var(--text-primary); font-size: 1.2rem;">${chal.title}</h4>
                                <p style="margin: 0; font-size: 0.95rem; color: var(--text-secondary);">${chal.desc}</p>
                            </div>
                        `).join('')}
                    </div>

                    <div class="ide-wrapper scroll-reveal" style="margin-top: 40px;">
                        <div class="ide-window collapsed">
                            <div class="ide-header">
                                <span style="margin-left:auto; color:var(--text-secondary); font-size: 0.75rem;">${projectData.codeSnippet.title}</span>
                            </div>
                            <div class="ide-content">${highlightCode(projectData.codeSnippet.code)}</div>
                        </div>
                    </div>
                </section>

                <section class="article-section scroll-reveal">
                    <h2>Gallery</h2>
                    <div class="gallery-grid">
                        ${projectData.gallery.map(item => `
                            <div class="gallery-item">
                                <div class="media-wrapper" style="padding-bottom: 66.66%; border-bottom: none;">
                                    ${getMediaHTML(item.media)}
                                </div>
                                <div class="gallery-caption">
                                    <span class="accent" style="margin-right: 5px;">></span> ${item.caption}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

renderProjectPage();