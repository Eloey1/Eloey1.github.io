const projectData = {
    title: "Particle System & Editor",
    tagline: "Modular CPU-Based VFX Tool",
    status: "Active Engine Feature",
    techStack: ["C++", "DirectX 11", "ImGui", "Shaders", "JSON"],
    stats: [
        { label: "Simulation Space", value: "CPU (Data-Oriented)" },
        { label: "Authoring Tool", value: "Custom ImGui Editor" },
        { label: "Architecture", value: "Emitter / Module Hierarchy" },
        { label: "Serialization", value: "JSON Reflection" }
    ],
    
    steamCarousel: [
        { 
            type: "video", 
            src: "../image/hailstorm/particles_showcase.mp4",
            fallbackImg: "../image/hailstorm/showcase_thumb.png",
            thumb: "../image/hailstorm/showcase_thumb.png"
        },
        {
            type: "video",
            src: "../image/hailstorm/purpleParticles.mp4",
            fallbackImg: "../image/hailstorm/particles_thumb.png",
            thumb: "../image/hailstorm/particles_thumb.png"
        },
        { 
            type: "image", 
            src: "../image/hailstorm/particles1.png", 
            thumb: "../image/hailstorm/particles1.png" 
        },
        { 
            type: "image", 
            src: "../image/hailstorm/particle_editor.png", 
            thumb: "../image/hailstorm/particle_editor.png" 
        },
        { 
            type: "image", 
            src: "../image/hailstorm/hailstorm6.png", 
            thumb: "../image/hailstorm/hailstorm6.png" 
        }
    ],
    
    introSections: [
        {
            title: "Motivation & Goal",
            paragraphs: [
                "During a previous project, tight deadlines forced me to build a particle system and tool that, while functional, ultimately fell short in flexibility and modularity.",
                "Driven by that experience, I was highly motivated to build this new system entirely from scratch. My core goal was to engineer a highly scalable VFX architecture and editor that would reliably serve the tech art team for all our future projects."
            ]
        },
        {
            title: "Result & Reflection",
            paragraphs: [
                "By adopting a modular, Niagara-inspired architecture early on, I successfully eliminated the bottlenecks of my previous system. Technical artists can now easily combine and tweak behaviors like velocity, color over life, and size curves without needing custom code for every new effect.",
                "Even though the system is still in active development, it has successfully powered the VFX pipeline throughout an entire project. Collaborating closely with the technical art team and iterating on their daily feedback was an incredible learning experience. Ultimately, this feedback loop resulted in a highly intuitive environment for the tech artists, while establishing a robust foundation that made my own development workflow much easier."
            ]
        }
    ],

    splitOverviews: [
        {
            title: "The Architecture",
            isFullWidth: false,
            text: [
                "The system is heavily inspired by Unreal Engine's Niagara, so I made a component-based architecture where emitters own distinct behavior modules (like velocity, color over life, and size curves).",
                "My technical artists had a large wishlist of features. So I tried to implement them all and it turned out great. Now it is easy to add new behavior and modules."
            ],
            media: { type: "image", src: "../image/hailstorm/hailstorm2.png" },
            mediaOnLeft: true
        },
        {
            title: "The Workflow",
            isFullWidth: true,
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
            isFullWidth: false,
            text: [
                "I have tried to make a clear UI with aligned titles and a reset button on every type for a uniform look.",
                "My inspiration for the component-like look is from Unity and Godot."
            ],
            media: { type: "image", src: "../image/hailstorm/hailstorm3.png" },
            mediaOnLeft: false
        },
        {
            title: "Curves",
            isFullWidth: false,
            text: [
                "My technical artists really wanted to have curves in the modules so I made that with a custom UI widget.",
                "I had made a full Easing utility from before so I also upgraded our curve class so I can have different easing on the curve for nice and non-linear curves."
            ],
            media: { type: "image", src: "../image/hailstorm/hailstorm5.png" },
            mediaOnLeft: true
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

    futurePlans: [
       {
            title: "Mesh Particles & Instance Rendering",
            text: "The current rendering pipeline utilizes a geometry shader to expand point data into billboarded 2D quads. Driven by requests from the tech art team, my next major milestone is to overhaul the rendering architecture to support true 3D mesh particles efficiently using instancing for reduced draw calls."
        },
        {
            title: "GPU-Based System",
            text: "It would be a fun challenge to transition this into a fully GPU-based system using compute shaders in the future. Moving the update loop off the CPU would guarantee maximum performance and massive particle counts."
        }
    ]
};

function getMediaHTML(media, isThumb = false, isFirstLoad = false) {
    const loadingBehavior = isFirstLoad ? 'eager' : 'lazy';
    const videoPreload = isFirstLoad ? 'auto' : 'metadata';

    if (isThumb) {
        return `<img src="${media.thumb}" loading="lazy" decoding="async" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
    
    if (media.type === 'youtube') {
        return `<iframe src="${media.src}?rel=0" title="YouTube Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 100%; position: absolute; inset: 0;"></iframe>`;
    } else if (media.type === 'video') {
        return `
            <video autoplay loop muted controls playsinline preload="${videoPreload}" poster="${media.fallbackImg || ''}" style="width: 100%; height: 100%; object-fit: contain;">
                <source src="${media.src}" type="video/mp4">
                <img src="${media.fallbackImg || ''}" loading="${loadingBehavior}" decoding="async" alt="Fallback" style="width: 100%; height: 100%; object-fit: contain;">
            </video>`;
    } else if (media.type === 'iframe') {
        return `<iframe src="${media.src}" loading="${loadingBehavior}" title="Video" allowfullscreen style="width: 100%; height: 100%; border: none; position: absolute; inset: 0;"></iframe>`;
    } else {
        return `<img src="${media.src}" loading="${loadingBehavior}" decoding="async" alt="Media" style="width: 100%; height: 100%; object-fit: contain;">`;
    }
}

function highlightCode(code) {
    return code
        .replace(/\/\/.*/g, match => `<span className="cm">${match}</span>`)
        .replace(/"(.*?)"/g, '<span className="ty" style="color: #a5d6ff;">"$1"</span>')
        .replace(/\b(struct|float|void|override|int|for|const|size_t|class|auto)\b/g, '<span class="kw">$1</span>')
        .replace(/\b(MODULE_NAME|REFLECT|VAR)\b/g, '<span class="kw" style="color: #ffbd2e;">$1</span>')
        .replace(/\b(Vector3f|Matrix4x4f|Matrix3x3f|Particle|std|vector|EditorUI|ParticleModule|BoxSpawnModule|CU)\b/g, '<span class="ty">$1</span>')
        .replace(/\b([a-zA-Z_]\w*)(?=\()/g, match => {
            if (['MODULE_NAME', 'REFLECT', 'VAR', 'for'].includes(match)) return match;
            return `<span class="fn">${match}</span>`;
        })
        .replace(/\b(\d+\.?\d*f?)\b/g, '<span class="kw" style="color: #79c0ff;">$1</span>')
        .replace(/className=/g, 'class='); 
}

function renderProjectPage() {
    const container = document.getElementById('project-content');

    const html = `
        <style>
            /* Intro Styles */
            .intro-section { margin-bottom: 30px; }
            .intro-section h2 { color: var(--text-primary); margin-top: 0; margin-bottom: 15px; font-size: 1.5rem; }
            .intro-section p { margin-bottom: 15px; line-height: 1.6; font-size: 1.05rem; color: var(--text-secondary); }
            .intro-block { margin-bottom: 60px; padding-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.05); }

            /* Zig-Zag Styles */
            .zig-zag-row { display: flex; flex-direction: column; gap: 30px; margin-bottom: 60px; align-items: center; }
            .zig-zag-col { width: 100%; min-width: 0; }
            .ide-header { cursor: pointer !important; position: relative; z-index: 10; user-select: none; -webkit-tap-highlight-color: transparent; }
            .ide-header * { pointer-events: none; }
            
            /* Steam Carousel Styles */
            .steam-carousel-container { width: 100%; margin-bottom: 40px; }
            .steam-main-view { width: 100%; aspect-ratio: 16 / 9; background: #000; border-radius: 12px; overflow: hidden; margin-bottom: 15px; position: relative; border: 1px solid rgba(255,255,255,0.05); }
            .steam-main-view > * { width: 100%; height: 100%; object-fit: contain; position: absolute; inset: 0; }
            
            /* MOBILE: Smooth momentum scrolling for thumbnails */
            .steam-thumbs-track { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 10px; scrollbar-width: thin; scrollbar-color: var(--accent-color) rgba(0,0,0,0.3); -webkit-overflow-scrolling: touch; scroll-snap-type: x mandatory; }
            /* MOBILE: Slightly smaller thumbs so more fit on screen */
            .steam-thumb { position: relative; flex: 0 0 100px; aspect-ratio: 16 / 9; border-radius: 6px; overflow: hidden; cursor: pointer; border: 2px solid transparent; opacity: 0.5; transition: all 0.2s ease; background: #111; scroll-snap-align: start; }
            .steam-thumb.active { opacity: 1; border-color: var(--accent-color); }
            .steam-thumb:hover { opacity: 0.8; }
            .steam-thumb > img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
            
            /* Play icon overlay for video thumbnails */
            .thumb-play-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 28px;
                height: 28px;
                background: rgba(0, 0, 0, 0.6);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
                color: white;
                backdrop-filter: blur(2px);
            }
            .thumb-play-icon svg { margin-left: 2px; }

            @media (min-width: 850px) {
                .intro-section h2 { font-size: 1.8rem; }
                .zig-zag-row { flex-direction: row; gap: 50px; align-items: center; }
                .zig-zag-row.media-right { flex-direction: row-reverse; }
                .zig-zag-col { flex: 1 1 0%; width: auto; min-width: 0; }
                
                /* DESKTOP: Restore large luxurious padding and larger thumbnails */
                .steam-thumb { flex: 0 0 140px; }
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

       <div class="steam-carousel-container media-reveal fade-in d-4">
            <div class="steam-main-view" id="carousel-main-view">
            </div>
            <div class="steam-thumbs-track" id="carousel-thumbs">
                ${projectData.steamCarousel.map((item, index) => `
                    <div class="steam-thumb ${index === 0 ? 'active' : ''}" data-index="${index}" onclick="changeCarouselMedia(${index})">
                        ${getMediaHTML(item, true)}
                        ${item.type === 'video' || item.type === 'youtube' ? `
                            <div class="thumb-play-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
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

                ${projectData.codeSnippet ? `
                <section class="article-section scroll-reveal" style="margin-bottom: 60px;">
                    <h2 style="color: var(--text-primary); margin-top: 0; margin-bottom: 15px; font-size: 1.5rem;">Module Code Example</h2>
                    <p style="margin-bottom: 15px; line-height: 1.6; font-size: 1.05rem; color: var(--text-secondary);">An example of how simple it is to construct a new logic module for the particle emitters using the custom component architecture and reflection macros.</p>
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
                ` : ''}

                ${projectData.futurePlans && projectData.futurePlans.length > 0 ? `
                    <section class="article-section scroll-reveal" style="padding-top: 20px;">
                        <h2 style="color: var(--accent-color); font-size: 1.8rem; margin-bottom: 30px;">Future Plans</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                            ${projectData.futurePlans.map(plan => `
                                <div style="background: rgba(0, 240, 255, 0.02); border: 1px solid rgba(0, 240, 255, 0.1); border-radius: 12px; padding: 25px;">
                                    <h3 style="color: var(--text-primary); margin-top: 0; margin-bottom: 15px; font-size: 1.2rem;">${plan.title}</h3>
                                    <p style="color: var(--text-secondary); line-height: 1.6; margin: 0; font-size: 0.95rem;">${plan.text || plan.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

            </div>
        </div>
    `;

    container.innerHTML = html;
    window.changeCarouselMedia(0);
}

let carouselIndex = 0;
let carouselTimer;

window.changeCarouselMedia = function(index) {
    carouselIndex = index;
    const mainView = document.getElementById('carousel-main-view');
    const thumbs = document.querySelectorAll('.steam-thumb');
    
    mainView.innerHTML = getMediaHTML(projectData.steamCarousel[index], false, true);
    
    thumbs.forEach((t, i) => {
        if (i === index) t.classList.add('active');
        else t.classList.remove('active');
    });

    clearTimeout(carouselTimer);

    const activeMedia = projectData.steamCarousel[index];

    if (activeMedia.type === 'youtube') {
    } else if (activeMedia.type === 'video') {
        const videoElement = mainView.querySelector('video');
        if (videoElement) {
            videoElement.removeAttribute('loop');
            
            videoElement.onended = () => { advanceCarousel(); };
            
            videoElement.onerror = () => { carouselTimer = setTimeout(advanceCarousel, 5000); };
        } else {
            carouselTimer = setTimeout(advanceCarousel, 5000);
        }
    } else {
        carouselTimer = setTimeout(advanceCarousel, 5000);
    }
};

function advanceCarousel() {
    let nextIndex = carouselIndex + 1;
    if (nextIndex >= projectData.steamCarousel.length) nextIndex = 0;
    window.changeCarouselMedia(nextIndex);
}

renderProjectPage();

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

document.addEventListener('click', function(e) {
    const header = e.target.closest('.ide-header');
    if (header) {
        const ideWindow = header.closest('.ide-window');
        if (ideWindow) {
            ideWindow.classList.toggle('collapsed');
        }
    }
});