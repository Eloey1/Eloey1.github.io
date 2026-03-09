// -----------------------------------------------------
// 1. PROJECT DATA
// -----------------------------------------------------
const projectData = {
    title: "Frostheim Editor",
    tagline: "Custom 3D Engine & Level Design Toolset",
    status: "In Development",
    techStack: ["C++20", "DirectX 11", "ImGui", "JSON"],
    stats: [
        { label: "Core Architecture", value: "Entity Component System" },
        { label: "Design Pattern", value: "Command Pattern (Undo/Redo)" },
        { label: "Graphics API", value: "DirectX 11" },
        { label: "Lines of Code", value: "15,000+ Native C++" }
    ],
    mainMedia: {
        type: "video", 
        src: "your-editor-video.mp4",
        fallbackImg: "https://placehold.co/1280x720/111620/00f0ff?text=Main+Editor+View"
    },
    overview: [
        "Frostheim is a custom 3D level editor designed to bridge the gap between engine efficiency and designer workflow. Built entirely from scratch in C++ using DirectX 11, it eliminates the bloat of commercial engines while focusing on lightning-fast iteration times.",
        "The core philosophy was implementing industry-standard patterns—specifically a highly optimized Entity Component System (ECS) for data locality, and a robust Command Pattern to ensure non-destructive editing workflows."
    ],
    challenges: [
        {
            title: "Non-Destructive Workflow (Command Stack)",
            desc: "Level designers need the freedom to make mistakes. I engineered a robust Command Pattern where every transform, deletion, and spawn is encapsulated into an `ICommand` object, allowing for infinite, memory-safe Undo/Redo operations."
        },
        {
            title: "Data-Oriented ECS",
            desc: "To handle massive object counts without CPU cache misses, the engine avoids traditional Object-Oriented deep inheritance. Instead, it utilizes packed contiguous memory arrays for components, drastically speeding up the update loop."
        }
    ],
    codeSnippet: {
        title: "src/core/CommandStack.cpp",
        code: `void CommandStack::Undo() {
    if (m_UndoStack.empty()) return;

    // Retrieve the last executed command
    ICommand* cmd = m_UndoStack.top();
    
    // Safely revert the internal logic
    cmd->Undo(); 
    
    // Shift to redo stack
    m_UndoStack.pop();
    m_RedoStack.push(cmd);
}`
    },
    gallery: [
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Gizmos" },
            caption: "Math-heavy ImGuizmo integration for 3D manipulation."
        },
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Content+Browser" },
            caption: "Custom asset pipeline with drag-and-drop instantiation."
        },
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Scene+Graph" },
            caption: "Parent/Child hierarchy processing via relative transform matrices."
        },
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=JSON" },
            caption: "Fast scene serialization and deserialization using JSON."
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
        return `<iframe src="${media.src}" title="Video" allowfullscreen></iframe>`;
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
                    <h3 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-color); margin-bottom: 1.5rem;">Engine Telemetry</h3>
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
                        <div class="ide-window">
                            <div class="ide-header">
                                <div class="ide-dot" style="background:#ff5f56"></div><div class="ide-dot" style="background:#ffbd2e"></div><div class="ide-dot" style="background:#27c93f"></div>
                                <span style="margin-left:auto; color:var(--text-secondary); font-size: 0.75rem;">${projectData.codeSnippet.title}</span>
                            </div>
                            <div class="ide-content">${highlightCode(projectData.codeSnippet.code)}</div>
                        </div>
                    </div>
                </section>

                <section class="article-section scroll-reveal">
                    <h2>System Tools & Pipelines</h2>
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

// -----------------------------------------------------
// SEAMLESS PAGE TRANSITION LOGIC
// -----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Reveal page on load
    // Wait a brief moment to ensure WebGL has compiled, then lift the curtain
    setTimeout(() => {
        document.body.classList.add('is-loaded');
    }, 100);

    // 2. Handle link clicks for the exit animation
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only intercept internal links (ignore anchors and external/PDF links)
            if (this.hostname === window.location.hostname && !this.hash && this.target !== '_blank') {
                e.preventDefault();
                const destination = this.href;

                // Drop the curtain and trigger UI push-back
                document.body.classList.remove('is-loaded');
                document.body.classList.add('is-exiting');

                // Wait 500ms for the curtain to fully cover the screen, then navigate
                setTimeout(() => {
                    window.location.href = destination;
                }, 500); 
            }
        });
    });
});