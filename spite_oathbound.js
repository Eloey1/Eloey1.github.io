// -----------------------------------------------------
// 1. PROJECT DATA
// -----------------------------------------------------
const projectData = {
    title: "Spite Oathbound",
    tagline: "Top-Down ARPG Built on Custom Tech",
    status: "Complete",
    techStack: ["C++", "Frostheim Engine", "ImGui"],
    stats: [
        { label: "Engine", value: "Frostheim (Custom)" },
        { label: "Language", value: "Native C++" },
        { label: "Core Focus", value: "The Engine and Tools" },
        { label: "Role", value: "Engine / Tools Programmer" }
    ],
    mainMedia: {
        type: "iframe", 
        src: "https://www.youtube.com/embed/6T9ucwCqhoA?si=hkPgm1wvhzHxMWkx", 
        fallbackImg: ""
    },
    overview: [
        "Spite Oathbound is a top-down Action RPG prototype developed to battle-test the architecture of my custom Frostheim Engine. Building an engine is one thing, but proving it can handle complex gameplay logic, rapid state changes, and numerous entities is the true test of its design.",
        "The project heavily utilizes Frostheim's Entity Component System (ECS) to manage player combat, enemy AI, and collision detection. This separation of data and logic ensured that adding new abilities or enemy types was fast, modular, and highly performant."
    ],
    challenges: [
        {
            title: "Combat State Machines via ECS",
            desc: "Traditional Object-Oriented combat systems can easily become tangled webs of inheritance. I built the combat system as a dedicated ECS System that iterates strictly over entities possessing a `CombatStateComponent`. This allowed me to cleanly handle attack wind-ups, hit frames, and recovery states in a completely data-oriented way."
        },
        {
            title: "Dynamic Hitbox Generation",
            desc: "ARPGs require precise melee combat. Instead of relying on static collision spheres, the engine dynamically spawns temporary trigger entities attached to weapon sockets during specific animation frames, ensuring hit detection is perfectly synced with the visual swings."
        }
    ],
    codeSnippet: {
        title: "src/systems/CombatSystem.cpp",
        code: `// Data-Oriented Combat State Processing
void CombatSystem::Update(float deltaTime) {
    // Query all entities with both a Transform and CombatState
    auto view = m_Registry.view<TransformComponent, CombatStateComponent>();
    
    for (auto entity : view) {
        auto& state = view.get<CombatStateComponent>(entity);
        
        if (state.isAttacking) {
            state.attackTimer -= deltaTime;
            
            // Check if we hit the active frame of the animation
            if (state.attackTimer <= 0.0f && !state.hasDealtDamage) {
                ExecuteAttackHitbox(entity);
                state.hasDealtDamage = true;
            }
            
            // Reset state when animation finishes
            if (state.attackTimer <= -state.recoveryTime) {
                state.isAttacking = false;
                state.hasDealtDamage = false;
            }
        }
    }
}`
    },
    gallery: [
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Hitbox+Debug" },
            caption: "Debug rendering of dynamic weapon hitboxes spawning mid-swing."
        },
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=NavMesh+AI" },
            caption: "Enemy pathfinding built on top of the Frostheim routing system."
        },
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=ECS+Profiler" },
            caption: "In-engine profiler showing CombatSystem execution times."
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
        return `<iframe src="${media.src}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>`;
    } else {
        return `<img src="${media.src}" alt="Media">`;
    }
}

function highlightCode(code) {
    return code
        .replace(/\/\/.*/g, match => `<span className="cm">${match}</span>`)
        .replace(/\b(void|float|if|else|return|auto|for)\b/g, '<span class="kw">$1</span>')
        .replace(/\b(CombatSystem|TransformComponent|CombatStateComponent)\b/g, '<span class="ty">$1</span>')
        .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="fn">$1</span>')
        .replace(/className=/g, 'class='); 
}

function renderProjectPage() {
    const container = document.getElementById('project-content');

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
                    <h2>Architecture Overview</h2>
                    ${projectData.overview.map(p => `<p>${p}</p>`).join('')}
                </section>

                <section class="article-section scroll-reveal">
                    <h2>Core Engineering Highlights</h2>
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
                    <h2>System & Logic Visualization</h2>
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