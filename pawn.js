// -----------------------------------------------------
// 1. GAME PROJECT DATA
// -----------------------------------------------------
const projectData = {
    title: "Pawn's Gambit",
    tagline: "The Rookies Runner-up & People's Choice Award-Winning Puzzle Game",
    status: "Released",
    techStack: ["C#", "Unity 3D", "A* Pathfinding", "Custom Editor Tools"],
    stats: [
        { label: "My Role", value: "Gameplay & Tools Programmer" },
        { label: "Core Mechanic", value: "Chess-based Dungeon Crawler" },
        { label: "Engine", value: "Unity" },
        { label: "Release Year", value: "2025" }
    ],
    cta: {
        text: "Play on Itch.io",
        url: "https://snackapawn.itch.io/pawns-gambit"
    },
    mainMedia: {
        type: "iframe", 
        src: "https://www.youtube.com/embed/RV0J4raLpqY?si=IUUBVSzTFFv-cV02",
        fallbackImg: "https://placehold.co/1280x720/111620/00f0ff?text=Pawn's+Gambit"
    },
    overview: [
        "Pawn's Gambit is an award-winning puzzle game built in Unity. The core mechanic revolves around strict chess movement rules applied to a dynamic dungeon crawler setting.",
        "My primary role on the team was driving the gameplay programming and developing custom tools to empower our level designers to iterate quickly without bottlenecking the engineering team."
    ],
    challenges: [
        {
            title: "Custom A* Pathfinding",
            desc: "Because enemies and the player are restricted to specific chess-piece movement patterns (e.g., L-shapes for Knights, diagonals for Bishops), standard Unity NavMesh couldn't be used. I engineered a custom A* pathfinding algorithm that calculates valid node traversals based on dynamic piece-state matrices."
        },
        {
            title: "Level Designer Tooling",
            desc: "To speed up production, I built custom Unity Editor windows and Gizmos. Designers could instantly paint valid grid tiles, set enemy patrol routes, and simulate movement rules directly in the editor without entering Play Mode."
        }
    ],
    // If you don't want to show code for a project, just change this to: codeSnippet: null,
    codeSnippet: null, 
    gallery: [
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Gameplay+Screenshot+1" },
            caption: "Grid-based movement and combat resolution."
        },
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Gameplay+Screenshot+2" },
            caption: "Advanced puzzle mechanics with multiple enemy types."
        },
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Level+Editor+View" },
            caption: "Custom Unity Inspector tools for rapid level creation."
        },
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Menu+System" },
            caption: "Sleek UI and level selection menus."
        }
    ]
};

// -----------------------------------------------------
// 2. RENDERING LOGIC (Smart Template)
// -----------------------------------------------------
function getMediaHTML(media) {
    if (media.type === 'video') {
        return `<video autoplay loop muted playsinline poster="${media.fallbackImg}">
                    <source src="${media.src}" type="video/mp4">
                    <img src="${media.fallbackImg}" alt="Fallback">
                </video>`;
    } else if (media.type === 'iframe') {
        // Includes the EXACT security attributes YouTube requires
        return `<iframe src="${media.src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>`;
    } else {
        return `<img src="${media.src}" alt="Media">`;
    }
}

function highlightCode(code) {
    return code
        .replace(/\/\/.*/g, match => `<span className="cm">${match}</span>`)
        .replace(/\b(void|delete|while|for|if|else|int|float|double|bool|class|struct|return)\b/g, '<span class="kw">$1</span>')
        .replace(/\b(CommandStack|ICommand|Renderer|Pipeline)\b/g, '<span class="ty">$1</span>')
        .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="fn">$1</span>')
        .replace(/className=/g, 'class='); 
}

function renderProjectPage() {
    const container = document.getElementById('project-content');

    // Generate CTA Button if it exists
    const ctaHtml = projectData.cta ? `
        <div style="margin-top: 2rem;">
            <a href="${projectData.cta.url}" target="_blank" class="btn btn-primary" style="padding: 16px; font-size: 1rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                ${projectData.cta.text}
            </a>
        </div>
    ` : '';

    // Generate Code Snippet if it exists
    const codeHtml = projectData.codeSnippet ? `
        <div class="ide-wrapper scroll-reveal" style="margin-top: 40px;">
            <div class="ide-window">
                <div class="ide-header">
                    <div class="ide-dot" style="background:#ff5f56"></div><div class="ide-dot" style="background:#ffbd2e"></div><div class="ide-dot" style="background:#27c93f"></div>
                    <span style="margin-left:auto; color:var(--text-secondary); font-size: 0.75rem;">${projectData.codeSnippet.title}</span>
                </div>
                <div class="ide-content">${highlightCode(projectData.codeSnippet.code)}</div>
            </div>
        </div>
    ` : '';

    const html = `
        <div class="back-nav fade-in">
            <a href="index.html" class="back-btn">
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
                    <h3 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-color); margin-bottom: 1.5rem;">Project Telemetry</h3>
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

                    ${ctaHtml}
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
                    ${codeHtml}
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