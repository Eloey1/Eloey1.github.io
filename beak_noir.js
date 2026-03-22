// -----------------------------------------------------
// 1. PROJECT DATA
// -----------------------------------------------------
const projectData = {
    title: "Beak Noir",
    tagline: "Isometric Adventure",
    status: "Complete",
    techStack: ["C++", "TGE Engine", "Animation", "State Machines", "Pipelines", "ImGui"],
    stats: [
        { label: "Engine", value: "TGE Engine" },
        { label: "Language", value: "C++" },
        { label: "Role", value: "Pipeline & Tools Programmer" },
        { label: "Release Year", value: "2025" }
    ],
    mainMedia: {
        type: "iframe", 
        src: "https://www.youtube.com/embed/gxaEJ56esTE", 
        fallbackImg: ""
    },
    overview: [
        "Beak Noir is an isometric action-adventure game where players shoot their way through a dangerous syndicate of gangster vipers to solve the mystery of their missing mouse friend.",
        "This was our fourth game project and second time utilizing The Game Assembly's engine TGE. Since I was already comfortable with the engine at this point, I intentionally challenged myself by taking on new responsibilities. I focused on building pipelines for our level designers and our animators."
    ],
    challenges: [
        {
            title: "Smooth Target Interpolation (Lerping)",
            desc: "A hard-locked camera feels incredibly rigid. I implemented a dynamic interpolation system using framerate-independent lerping. The camera calculates the player's future trajectory and smoothly tracks towards a calculated offset, giving the camera a cinematic, 'elastic' feel."
        },
        {
            title: "Dynamic Camera Zones",
            desc: "Different areas of the game required different perspectives. I engineered a trigger-volume system where the camera smoothly transitions between specific states—such as zooming out for large arenas or panning to frame a point of interest—while maintaining its strict isometric angle."
        }
    ],
    codeSnippet: {
        title: "src/camera/IsometricCamera.cpp",
        code: `// Smooth Isometric Camera Tracking
void IsometricCamera::Update(float deltaTime, const Vector3& targetPos) {
    // 1. Calculate the ideal camera position based on isometric offset
    Vector3 desiredPos = targetPos + m_IsometricOffset;

    // 2. Framerate-independent interpolation (Lerp)
    // Using an exponential decay curve to prevent snapping
    float t = 1.0f - std::exp(-m_TrackingSpeed * deltaTime);
    
    // 3. Smoothly move current position towards desired position
    m_CurrentPos.x = Lerp(m_CurrentPos.x, desiredPos.x, t);
    m_CurrentPos.y = Lerp(m_CurrentPos.y, desiredPos.y, t);
    m_CurrentPos.z = Lerp(m_CurrentPos.z, desiredPos.z, t);

    // 4. Update the View Matrix for the rendering pipeline
    UpdateViewMatrix(m_CurrentPos, targetPos, Vector3::Up());
}`
    },
    gallery: [
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Camera+Zones" },
            caption: "Debug view of trigger volumes that shift the camera parameters."
        },
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=State+Machine" },
            caption: "Gameplay state machine handling dialogue and exploration modes."
        },
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Isometric+Math" },
            caption: "Orthographic projection matrix setup for true isometric rendering."
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
        .replace(/\b(void|float|if|else|return|const)\b/g, '<span class="kw">$1</span>')
        .replace(/\b(Vector3|IsometricCamera|std)\b/g, '<span class="ty">$1</span>')
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
                    <h2>About The Project</h2>
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