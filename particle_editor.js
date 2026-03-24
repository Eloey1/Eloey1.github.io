// -----------------------------------------------------
// 1. PROJECT DATA
// -----------------------------------------------------
const projectData = {
    title: "Particle System & Editor",
    tagline: "Modular CPU-Based VFX Tool",
    status: "In Development",
    techStack: ["C++", "DirectX 11", "ImGui", "Shaders", "JSON"],
    stats: [
        { label: "Simulation Space", value: "CPU (Data-Oriented)" },
        { label: "Authoring Tool", value: "Custom ImGui Editor" },
        { label: "Architecture", value: "Emitter / Module Hierarchy" },
        { label: "Serialization", value: "JSON Reflection" }
    ],
    mainMedia: {
        type: "video", 
        src: "your-particle-video.mp4",
        fallbackImg: "https://placehold.co/1280x720/111620/00f0ff?text=Particle+System+Showcase"
    },
    
    splitOverviews: [
        {
            title: "Motivation & Goal",
            text: [
                "I made a particle system in our 5th project and a tool for it but I didn't have a lot of time so I was really unhappy how it turned out.",
                "This got me really motivated to create a new particle system from scratch and start over, and my goal was to build a scalable and modular system and tool that would last the rest of the projects."
            ],
            media: { type: "image", src: "image/hailstorm/hailstorm1.png" },
            mediaOnLeft: false
        },
        {
            title: "The Architecture",
            text: [
                "The system is heavily inspired by Unreal Engine's Niagara, so I made a component-based architecture where emitters own distinct behavior modules (like velocity, color over life, and size curves).",
                "My technical artists had a large wishlist of features. So I tried to implement them all and it turned out great. Now it is easy to add new behavior and modules."
            ],
            media: { type: "image", src: "image/hailstorm/hailstorm2.png" },
            mediaOnLeft: true
        },
        {
            title: "The Workflow",
            text: [
                "It's always a priority for me that it's easy for other programmers to both understand my code and extend its behavior.",
                "I went through several iterations of the particle editor, actively seeking and applying feedback from my technical artists. This continuous feedback loop was crucial in making this tool."
            ],
            codeSnippet: {
                title: "src/particles/Emitter.cpp",
                code: `// Clean, extendable update loop for behavior modules
for (std::unique_ptr<ParticleModule>& module : myModules)
{
    module->OnUpdate(myParticles, myActiveParticleCount, myGlobalTransform, aDeltaTime);
}`
            },
            mediaOnLeft: false
        },
        {
            title: "Custom UI",
            text: [
                "I have tried to make a clear UI with aligned titles and a reset button on every type for a uniform look.",
                "My inspiration for the component-like look is from Unity and Godot."
            ],
            media: { type: "image", src: "image/hailstorm/hailstorm3.png" },
            mediaOnLeft: true
        },
        {
            title: "Curves",
            text: [
                "My technical artists really wanted to have curves in the modules so I made that with a custom UI widget.",
                "I had made a full Easing utility from before so I also upgraded our curve class so I can have different easing on the curve for nice and non-linear curves."
            ],
            media: { type: "image", src: "image/hailstorm/hailstorm5.png" },
            mediaOnLeft: false
        }
    ],

    futurePlans: [
       {
            title: "Mesh Particles & Instance Rendering",
            desc: "The current rendering pipeline utilizes a geometry shader to expand point data into billboarded 2D quads. Driven by requests from the tech art team, my next major milestone is to overhaul the rendering architecture to support true 3D mesh particles efficiently using instancing for reduced draw calls."
        },
        {
            title: "GPU-Based System",
            desc: "It would be a fun challenge to transition this into a fully GPU-based system using compute shaders in the future. Moving the update loop off the CPU would guarantee maximum performance and massive particle counts."
        }
    ],
    codeSnippet: {
        title: "src/particles/modules/BoxSpawnModule.h",
        code: `struct BoxSpawnModule : ParticleModule
{
    float Strength = 2.f;
    CU::Vector3f Size = { 30, 30, 30 };

    void OnSpawn(std::vector<Particle>& someParticles, size_t aStartIdx, size_t aCount, const CU::Matrix4x4f& aEmitterTransform) override
    {
        CU::Matrix3x3f rotationMatrix(aEmitterTransform);
        for (int i = 0; i < aCount; ++i)
        {
            size_t idx = aStartIdx + i;
            Particle& particle = someParticles[idx];

            CU::Vector3f randomPos = Random::InsideUnitCube() * Size;
            CU::Vector3f rotatedPos = randomPos * rotationMatrix;
            particle.Position += rotatedPos;
            particle.Velocity += rotatedPos.GetSafeNormal() * Strength;
        }
    }

    void OnParticleUI(EditorUI& aUI) override
    {
        aUI.Float("Strength", Strength);
        aUI.Vector3f("Size", Size);
    }

    MODULE_NAME("Box Spawn Module")
    REFLECT(VAR(Strength), VAR(Size))
};`
    },
    gallery: [
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=ImGui+Editor" },
            caption: ""
        },
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Curve+Editor" },
            caption: ""
        },
        {
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=In-Game+VFX" },
            caption: ""
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
        .replace(/"(.*?)"/g, '<span class="ty" style="color: #a5d6ff;">"$1"</span>')
        .replace(/\b(struct|float|void|override|int|for|const|size_t)\b/g, '<span class="kw">$1</span>')
        .replace(/\b(MODULE_NAME|REFLECT|VAR)\b/g, '<span class="kw" style="color: #ffbd2e;">$1</span>')
        .replace(/\b(Vector3f|Matrix4x4f|Matrix3x3f|Particle|std|vector|EditorUI|ParticleModule)\b/g, '<span class="ty">$1</span>')
        .replace(/\b([a-zA-Z_]\w*)(?=\()/g, match => {
            if (['MODULE_NAME', 'REFLECT', 'VAR', 'for'].includes(match)) return match;
            return `<span class="fn">${match}</span>`;
        })
        .replace(/\b(\d+\.?\d*f?)\b/g, '<span class="kw" style="color: #79c0ff;">$1</span>')
        .replace(/\/\/.*/g, match => `<span class="cm">${match}</span>`)
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
                width: 100%;
                min-width: 0; /* CRITICAL FIX: Stops the code block from squishing the layout */
            }
            /* Clean CSS fix for clickable headers */
            .ide-header {
                cursor: pointer !important;
                position: relative;
                z-index: 10;
                user-select: none;
                -webkit-tap-highlight-color: transparent;
            }
            .ide-header * {
                pointer-events: none; /* Makes sure you click the header, not the text */
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
                    min-width: 0; /* CRITICAL FIX: Stops the code block from squishing the layout */
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
                    <h3 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-color); margin-bottom: 1.5rem;">System Architecture</h3>
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
                    <h2>Module Code Example</h2>
                    <p>An example of how simple it is to construct a new logic module for the particle emitters using the custom component architecture and reflection macros.</p>
                    <div class="ide-wrapper scroll-reveal" style="margin-top: 20px;">
                        <div class="ide-window collapsed">
                            <div class="ide-header" onclick="void(0)">
                                <div class="ide-dot" style="background:#ff5f56"></div><div class="ide-dot" style="background:#ffbd2e"></div><div class="ide-dot" style="background:#27c93f"></div>
                                <span style="margin-left:auto; color:var(--text-secondary); font-size: 0.75rem;">${projectData.codeSnippet.title}</span>
                            </div>
                            <div class="ide-content" style="overflow-x: auto;">${highlightCode(projectData.codeSnippet.code)}</div>
                        </div>
                    </div>
                </section>

                <section class="article-section scroll-reveal">
                    <h2>Future Plans</h2>
                    <div class="feature-grid">
                        ${projectData.futurePlans.map(plan => `
                            <div class="bento-card" style="padding: 2rem; border-color: rgba(0, 240, 255, 0.2);">
                                <h4 style="margin-bottom: 15px; color: var(--accent-color); font-size: 1.2rem;">${plan.title}</h4>
                                <p style="margin: 0; font-size: 0.95rem; color: var(--text-secondary);">${plan.desc}</p>
                            </div>
                        `).join('')}
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