// -----------------------------------------------------
// 1. PROJECT DATA
// -----------------------------------------------------
const projectData = {
    title: "Frostheim Editor",
    tagline: "Custom 3D Engine & Level Design Tool",
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
    
    splitOverviews: [
        {
            title: "Building the Engine",
            text: [
                "Frostheim is a custom 3D level editor designed to bridge the gap between engine efficiency and designer workflow. Built entirely from scratch in C++ using DirectX 11, it eliminates the bloat of commercial engines while focusing on lightning-fast iteration times.",
                "The core philosophy was implementing industry-standard patterns to ensure both performance and a non-destructive editing workflow."
            ],
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Frostheim+UI+Screenshot" },
            mediaOnLeft: false
        },
        {
            title: "Data-Oriented ECS",
            text: [
                "To handle massive object counts without CPU cache misses, the engine avoids traditional Object-Oriented deep inheritance.",
                "Instead, it utilizes an Entity Component System (ECS) with packed contiguous memory arrays for components, drastically speeding up the core update loop."
            ],
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=ECS+Architecture+Diagram" },
            mediaOnLeft: true
        },
        {
            title: "Non-Destructive Workflow",
            text: [
                "Level designers need the freedom to make mistakes. I engineered a robust Command Pattern for the editor.",
                "Every transform, deletion, and spawn is encapsulated into an ICommand object, allowing for infinite, memory-safe Undo/Redo operations without breaking scene state."
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
            mediaOnLeft: false
        },
        {
            title: "Content Browser & Assets",
            text: [
                "I also built a custom content browser that integrates seamlessly with our workflow.",
                "(You can add more text here about your P4 integration, Prefabs, or drag-and-drop mechanics!)"
            ],
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Content+Browser" },
            mediaOnLeft: true
        }
    ],

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
        .replace(/\/\/.*/g, match => `<span class="cm">${match}</span>`)
        .replace(/\b(void|delete|while|for|if|else|int|float|double|bool|class|struct|return)\b/g, '<span class="kw">$1</span>')
        .replace(/\b(CommandStack|ICommand|Renderer|Pipeline)\b/g, '<span class="ty">$1</span>')
        .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="fn">$1</span>')
        .replace(/className=/g, 'class='); 
}

function renderProjectPage() {
    const container = document.getElementById('project-content');

    const html = `
        <style>
            .zig-zag-row {
                display: flex;
                flex-direction: column; /* MOBILE: Image on top, Text below */
                gap: 30px;
                margin-bottom: 60px;
                align-items: center;
            }
            .zig-zag-col {
                width: 100%; /* FIXED: Full width on mobile */
            }
            .ide-header {
                cursor: pointer; /* FIXED: Forces iOS mobile to register clicks */
            }
            @media (min-width: 850px) {
                .zig-zag-row {
                    flex-direction: row; /* DESKTOP: Default to Image Left */
                    gap: 50px;
                    align-items: center;
                }
                .zig-zag-row.media-right {
                    flex-direction: row-reverse; /* DESKTOP: Swap to Image Right */
                }
                .zig-zag-col {
                    flex: 1 1 0%; /* DESKTOP: Share width equally */
                    width: auto;
                }
            }
        </style>

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
                
                <section class="article-section">
                    ${projectData.splitOverviews.map(block => {
                        const textHTML = `
                            <div class="zig-zag-col">
                                <h2 style="margin-top: 0; margin-bottom: 20px;">${block.title}</h2>
                                ${block.text.map(p => `<p>${p}</p>`).join('')}
                            </div>
                        `;
                        
                        let visualHTML = '';
                        if (block.codeSnippet) {
                            // Notice 'collapsed' is added here so it starts closed like it should!
                            visualHTML = `
                                <div class="ide-window collapsed" style="margin: 0; width: 100%;">
                                    <div class="ide-header" onclick="void(0)">
                                        <div class="ide-dot" style="background:#ff5f56"></div><div class="ide-dot" style="background:#ffbd2e"></div><div class="ide-dot" style="background:#27c93f"></div>
                                        <span style="margin-left:auto; color:var(--text-secondary); font-size: 0.75rem;">${block.codeSnippet.title}</span>
                                    </div>
                                    <div class="ide-content" style="max-height: 350px; overflow-y: auto; overflow-x: auto;">${highlightCode(block.codeSnippet.code)}</div>
                                </div>
                            `;
                        } else if (block.media) {
                            visualHTML = `
                                <div class="media-wrapper" style="padding-bottom: 60%; border-bottom: none; border-radius: 12px; overflow: hidden; margin: 0; border: 1px solid rgba(255,255,255,0.05); width: 100%; position: relative;">
                                    ${getMediaHTML(block.media)}
                                </div>
                            `;
                        }

                        const sideElementHTML = `<div class="zig-zag-col">${visualHTML}</div>`;

                        return `
                            <div class="scroll-reveal zig-zag-row ${block.mediaOnLeft ? 'media-left' : 'media-right'}">
                                ${sideElementHTML}
                                ${textHTML}
                            </div>
                        `;
                    }).join('')}
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

// -----------------------------------------------------
// SEAMLESS PAGE TRANSITION LOGIC
// -----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('is-loaded');
    }, 100);

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname && !this.hash && this.target !== '_blank') {
                e.preventDefault();
                const destination = this.href;

                document.body.classList.remove('is-loaded');
                document.body.classList.add('is-exiting');

                setTimeout(() => {
                    window.location.href = destination;
                }, 500); 
            }
        });
    });
});

// -----------------------------------------------------
// GLOBAL IDE WINDOW COLLAPSE LOGIC
// -----------------------------------------------------
document.addEventListener('click', function(e) {
    const header = e.target.closest('.ide-header');
    if (header) {
        const ideWindow = header.closest('.ide-window');
        if (ideWindow) {
            ideWindow.classList.toggle('collapsed');
        }
    }
});