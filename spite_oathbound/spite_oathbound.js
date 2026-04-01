// -----------------------------------------------------
// 1. PROJECT DATA
// -----------------------------------------------------
const projectData = {
    title: "Spite Oathbound",
    tagline: "Top-Down ARPG Built on a Custom C++ Engine",
    status: "Complete",
    techStack: ["C++20", "DirectX 11", "Component System", "ImGui"],
    stats: [
        { label: "Engine", value: "Frostheim (Custom)" },
        { label: "Language", value: "C++" },
        { label: "Core Focus", value: "Engine Architecture" },
        { label: "Role", value: "Engine & Tools Programmer" }
    ],
    
    mainMedia: {
        type: "iframe", 
        src: "https://www.youtube.com/embed/6T9ucwCqhoA?si=hkPgm1wvhzHxMWkx", 
        fallbackImg: ""
    },

    introSections: [
        {
            title: "The Leap to a Custom Engine",
            paragraphs: [
                "Spite Oathbound is a top-down Action RPG, but more importantly, it was our fifth project and the very first time we built our own game engine from the ground up.",
                "Having developed a deep interest in engine architecture and tools programming, I took on a major role in shaping the codebase. My primary goal was to design the 'Frostheim Engine' to be as decoupled and modular as possible, as I strongly believe that strict modularity is the foundation of any maintainable engine."
            ]
        },
        {
            title: "My Role & Responsibilities",
            paragraphs: [
                "As the Engine and Tools Programmer, my primary focus was laying the foundational architecture. Alongside a teammate, I established the build environment using Premake, ensuring a clean, scalable multi-project solution. I also designed the engine's initial game object model, building a traditional pointer-based component system.",
                "While I wasn't the primary graphics programmer, I stepped in to heavily optimize the rendering pipeline. I developed an automatic instancing system that dynamically batched draw calls based on shared meshes and materials, which resulted in massive performance gains and kept our framerate smooth."
            ]
        }
    ],
    
    splitOverviews: [
        {
            title: "Core Architecture & Premake Build System",
            isFullWidth: false,
            text: [
                "To support three upcoming projects, I established our build environment using Premake. This allowed us to cleanly separate the Engine, Game, and Editor into modular projects without fighting manual Visual Studio configurations.",
                "I designed a decoupled application loop to separate game logic from rendering. While strict modularity was the goal, production realities caused some tightly coupled dependencies to slip through. Documenting these bottlenecks became a crucial learning experience that directly improved the architecture of our next engine iteration."
            ],
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Engine+Architecture" },
            mediaOnLeft: true
        },
        {
            title: "Pointer-Based Component System",
            isFullWidth: false,
            text: [
                ".",
                ""
            ],
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Component+Architecture" },
            mediaOnLeft: false
        },
        {
            title: "Automatic Instancing Renderer",
            isFullWidth: true,
            text: [
                "As the game scaled and enemy counts increased, CPU draw call overhead became a massive bottleneck. Stepping into the graphics pipeline, I developed an automatic hardware instancing system to alleviate the CPU.",
                "Every frame, the renderer gathers all active meshes, sorts them first by Material ID and then by Mesh ID, and dynamically batches identical objects together. The engine then submits them to the GPU using a single instanced draw call, which resulted in massive performance gains and kept our framerate smooth during chaotic combat."
            ],
            codeSnippet: {
                title: "src/graphics/Renderer.cpp",
                code: `class="cm">// Flushes the dynamically batched render commands to the GPU
void Renderer::FlushInstancedBatches() {
    for (auto& [materialId, meshMap] : m_RenderBatches) {
        BindMaterial(materialId);

        for (auto& [meshId, instanceData] : meshMap) {
            if (instanceData.empty()) continue;

            class="cm">// Upload all transform matrices to the GPU Instance Buffer
            m_InstanceBuffer->SetData(instanceData.data(), instanceData.size() * sizeof(InstanceData));
            m_InstanceBuffer->Bind(1); class="cm">// Bind to shader slot 1

            auto mesh = AssetManager::GetMesh(meshId);
            mesh->Bind();

            class="cm">// Execute a single hardware instanced draw call for X identical meshes
            RenderCommand::DrawIndexedInstanced(mesh->GetIndexCount(), instanceData.size(), 0, 0, 0);

            class="cm">// Clear the batch for the next frame
            instanceData.clear(); 
        }
    }
}`
            }
        }
    ],

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
        return `<video autoplay loop muted playsinline poster="${media.fallbackImg}" style="width: 100%; height: 100%; object-fit: contain;">
                    <source src="${media.src}" type="video/mp4">
                    <img src="${media.fallbackImg}" alt="Fallback" style="width: 100%; height: 100%; object-fit: contain;">
                </video>`;
    } else if (media.type === 'iframe') {
        return `<iframe src="${media.src}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>`;
    } else {
        return `<img src="${media.src}" alt="Media" style="width: 100%; height: 100%; object-fit: contain;">`;
    }
}

function highlightCode(code) {
    return code
        .replace(/\/\/.*/g, match => `<span className="cm">${match}</span>`)
        .replace(/\b(void|float|if|else|return|auto|for|const|bool|continue|class|sizeof)\b/g, '<span className="kw">$1</span>')
        .replace(/\b(Renderer|AssetManager|RenderCommand|InstanceData|m_RenderBatches|m_InstanceBuffer)\b/g, '<span className="ty">$1</span>')
        .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span className="fn">$1</span>')
        .replace(/className=/g, 'class='); 
}

function renderProjectPage() {
    const container = document.getElementById('project-content');

    const html = `
        <style>
            /* Intro Styles */
            .intro-block { margin-bottom: 60px; padding-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .intro-section { margin-bottom: 30px; }
            .intro-section h2 { color: var(--text-primary); margin-top: 0; margin-bottom: 15px; font-size: 1.5rem; }
            .intro-section p { margin-bottom: 15px; line-height: 1.6; font-size: 1.05rem; color: var(--text-secondary); }

            /* Zig-Zag Styles */
            .zig-zag-row { display: flex; flex-direction: column; gap: 30px; margin-bottom: 60px; align-items: center; }
            .zig-zag-col { width: 100%; min-width: 0; }
            .ide-header { cursor: pointer !important; position: relative; z-index: 10; user-select: none; -webkit-tap-highlight-color: transparent; }
            .ide-header * { pointer-events: none; }
            
            /* Main Hero Media */
            .hero-media { width: 100%; aspect-ratio: 16 / 9; background: #000; border-radius: 12px; overflow: hidden; margin-bottom: 40px; position: relative; border: 1px solid rgba(255,255,255,0.05); }
            
            /* Gallery Grid */
            .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 20px; }
            .gallery-item { background: rgba(0, 240, 255, 0.02); border: 1px solid rgba(0, 240, 255, 0.1); border-radius: 12px; overflow: hidden; }
            .gallery-caption { padding: 15px 20px; color: var(--text-secondary); font-size: 0.95rem; border-top: 1px solid rgba(255,255,255,0.05); line-height: 1.5; }

            @media (min-width: 850px) {
                .intro-section h2 { font-size: 1.8rem; }
                .zig-zag-row { flex-direction: row; gap: 50px; align-items: center; }
                .zig-zag-row.media-right { flex-direction: row-reverse; }
                .zig-zag-col { flex: 1 1 0%; width: auto; min-width: 0; }
            }
        </style>

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

        <div class="hero-media fade-in d-4">
            ${getMediaHTML(projectData.mainMedia)}
        </div>

        <div class="article-layout">
            <aside class="article-sidebar fade-in d-5">
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
                
                <section class="intro-block scroll-reveal">
                    ${projectData.introSections.map(section => `
                        <div class="intro-section">
                            <h2>${section.title}</h2>
                            ${section.paragraphs.map(p => `<p>${p}</p>`).join('')}
                        </div>
                    `).join('')}
                </section>

                <section class="article-section">
                    ${projectData.splitOverviews.map(block => {
                        if (block.isFullWidth) {
                            return `
                                <div class="scroll-reveal" style="margin-bottom: 60px;">
                                    ${block.title ? `<h2 style="margin-top: 0; margin-bottom: 20px; color: var(--text-primary); font-size: 1.5rem;">${block.title}</h2>` : ''}
                                    ${block.text.map(p => `<p style="margin-bottom: 15px; line-height: 1.6; font-size: 1.05rem; color: var(--text-secondary);">${p}</p>`).join('')}
                                    ${block.codeSnippet ? `
                                        <div class="ide-window collapsed" style="margin-top: 30px; width: 100%;">
                                            <div class="ide-header" onclick="void(0)">
                                                <div class="ide-dot" style="background:#ff5f56"></div><div class="ide-dot" style="background:#ffbd2e"></div><div class="ide-dot" style="background:#27c93f"></div>
                                                <span style="margin-left:auto; color:var(--text-secondary); font-size: 0.75rem;">${block.codeSnippet.title}</span>
                                            </div>
                                            <div class="ide-content" style="max-height: 450px; overflow-y: auto; overflow-x: auto;">${highlightCode(block.codeSnippet.code)}</div>
                                        </div>
                                    ` : ''}
                                </div>
                            `;
                        }

                        const textHTML = `
                            <div class="zig-zag-col">
                                ${block.title ? `<h2 style="margin-top: 0; margin-bottom: 20px; color: var(--text-primary);">${block.title}</h2>` : ''}
                                ${block.text.map(p => `<p style="margin-bottom: 15px; line-height: 1.6; font-size: 1.05rem; color: var(--text-secondary);">${p}</p>`).join('')}
                            </div>
                        `;
                        let visualHTML = '';
                        if (block.media) {
                            visualHTML = `
                                <div class="media-wrapper" style="padding-bottom: 60%; border-bottom: none; border-radius: 12px; overflow: hidden; margin: 0; border: 1px solid rgba(255,255,255,0.05); width: 100%; position: relative;">
                                    ${getMediaHTML(block.media)}
                                </div>
                            `;
                        }
                        return `
                            <div class="scroll-reveal zig-zag-row ${block.mediaOnLeft ? 'media-left' : 'media-right'}">
                                <div class="zig-zag-col">${visualHTML}</div>
                                ${textHTML}
                            </div>
                        `;
                    }).join('')}
                </section>

                <section class="article-section scroll-reveal" style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 40px;">
                    <h2 style="color: var(--text-primary); font-size: 1.5rem; margin-bottom: 20px;">System Visualizations</h2>
                    <div class="gallery-grid">
                        ${projectData.gallery.map(item => `
                            <div class="gallery-item">
                                <div class="media-wrapper" style="padding-bottom: 66.66%; border-bottom: none; position: relative;">
                                    <div style="position: absolute; inset: 0; width: 100%; height: 100%;">
                                        ${getMediaHTML(item.media)}
                                    </div>
                                </div>
                                <div class="gallery-caption">
                                    <span class="accent" style="margin-right: 5px; color: var(--accent-color);">></span> ${item.caption}
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

// Ensure the page transitions and IDE collapse still work
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { document.body.classList.add('is-loaded'); }, 100);

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

renderProjectPage();