const projectData = {
    title: "Beak Noir",
    tagline: "An Isometric Action-Adventure. Solve the mystery.",
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
        "Beak Noir is an isometric action-adventure game where the player shoots their way through a dangerous syndicate of gangster snakes to solve the mystery of their missing mouse friend.",
        "This was our fourth game project and second time utilizing The Game Assembly's engine TGE. Since I was already comfortable with the engine at this point, I intentionally challenged myself by taking on new responsibilities. I focused on building pipelines for our level designers and our animators."
    ],
    challenges: [
        {
            title: "Unity - TGE Pipeline",
            desc: "The Game Assembly's engine TGE didn't have a level editor at the time, so the level designers used Unity. I took on the task of making the exporter from Unity to TGE. I wrote a custom C# Unity export script that output a JSON file to load our scenes in-game."
        },
        {
            title: "Camera Tool",
            desc: "Sometimes it's hard to visualize how the camera will look in an isometric game by just tweaking numbers in code. To solve this, I built a camera tool to visually set the camera angle and all its properties in real-time. When I was satisfied with the result, the tool saved the settings to a JSON file which was loaded the next time the game booted up."
        },
        {
            title: "Data-Driven Animation Pipeline",
            desc: "Working with the animation systems in TGE was completely new to me, making it an challenge. I made a data-driven pipeline instead of hard-coding animation logic, I built a system where animators could independently define states, link FBX files, and configure FPS entirely through simple JSON configuration file."
        }
    ],
   codeSnippet: {
        title: "data/animations/Redbeak.json",
        code: `{
  "Model": {
    "fbx": "Character/SK_Redbeak.fbx",
    "texture": "Art/3D/Characters/C.Materials/T_CH_C_Redbeak.dds",
    "scale": 1.0
  },
  "Idle": {
    "animation": "Animations/A_Redbeak_idle.fbx",
    "fps": 30.0,
    "loop": true
  },
  "Run": {
    "animation": "Animations/A_Redbeak_Run.fbx",
    "fps": 30.0,
    "loop": true
  }
}`
    },
    gallery: [
        {
            media: { type: "image", src: "../image/beak_noir/BeakNoir1.jpg" },
            caption: ""
        },
        {
            media: { type: "image", src: "../image/beak_noir/BeakNoir5.jpg" } 
        }
    ]
};

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
        .replace(/"(.*?)"/g, '<span class="ty" style="color: #a5d6ff;">"$1"</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="kw" style="color: #79c0ff;">$1</span>')
        .replace(/\b(true|false)\b/g, '<span class="kw" style="color: #ff7b72;">$1</span>')
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
                    <h3 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-color); margin-bottom: 1.5rem;">Project Overview</h3>
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
                                <div class="media-wrapper" style="padding-bottom: 66.66%; border-bottom: none; ${item.caption ? '' : 'border-radius: 12px;'}">
                                    ${getMediaHTML(item.media)}
                                </div>
                                
                                ${item.caption ? `
                                <div class="gallery-caption">
                                    <span class="accent" style="margin-right: 5px;">></span> ${item.caption}
                                </div>
                                ` : ''}
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