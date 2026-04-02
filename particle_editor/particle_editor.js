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
    
    steamCarousel: [
        { 
            type: "video", 
            src: "../image/hailstorm/particles_showcase.mp4",
            fallbackImg: "https://placehold.co/1280x720/111620/00f0ff?text=Particle+System+Showcase",
            thumb: "https://placehold.co/240x135/111620/00f0ff?text=Showcase"
        },
        {
            type: "video",
            src: "../image/hailstorm/purpleParticles.mp4",
            fallbackImg: "https://placehold.co/600x400/111620/00f0ff?text=Particles",
            thumb: "https://placehold.co/240x135/111620/00f0ff?text=Particles"
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
        }
    ],
    
    introSections: [
        {
            title: "Motivation & Goal",
            paragraphs: [
                "During a previous project, tight deadlines forced me to build a particle system and authoring tool that, while functional, ultimately fell short in flexibility and modularity.",
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
            text: [
                "The system is heavily inspired by Unreal Engine's Niagara, so I made a component-based architecture where emitters own distinct behavior modules (like velocity, color over life, and size curves).",
                "My technical artists had a large wishlist of features. So I tried to implement them all and it turned out great. Now it is easy to add new behavior and modules."
            ],
            media: { type: "image", src: "../image/hailstorm/hailstorm2.png" },
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
            media: { type: "image", src: "../image/hailstorm/hailstorm3.png" },
            mediaOnLeft: true
        },
        {
            title: "Curves",
            text: [
                "My technical artists really wanted to have curves in the modules so I made that with a custom UI widget.",
                "I had made a full Easing utility from before so I also upgraded our curve class so I can have different easing on the curve for nice and non-linear curves."
            ],
            media: { type: "image", src: "../image/hailstorm/hailstorm5.png" },
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
            media: { type: "video", src: "../image/hailstorm/purpleParticles.mp4", fallbackImg: "https://placehold.co/600x400/111620/00f0ff?text=Particles" },
            caption: ""
        },
        {
            media: { type: "image", src: "../image/hailstorm/hailstorm6.png" },
            caption: ""
        }
    ]
};

// -----------------------------------------------------
// 2. RENDERING LOGIC
// -----------------------------------------------------
function getMediaHTML(media, isThumb = false, isFirstLoad = false) {
    const loadingBehavior = isFirstLoad ? 'eager' : 'lazy';
    const videoPreload = isFirstLoad ? 'auto' : 'metadata';

    if (isThumb) {
        return `<img src="${media.thumb}" loading="lazy" decoding="async" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
    
    if (media.type === 'video') {
        return `
            <video autoplay loop muted playsinline preload="${videoPreload}" poster="${media.fallbackImg || ''}" style="width: 100%; height: 100%; object-fit: contain;">
                <source src="${media.src}" type="video/mp4">
                <img src="${media.fallbackImg || ''}" loading="${loadingBehavior}" decoding="async" alt="Fallback" style="width: 100%; height: 100%; object-fit: contain;">
            </video>`;
    } else if (media.type === 'iframe') {
        return `<iframe src="${media.src}" loading="${loadingBehavior}" title="Video" allowfullscreen style="width: 100%; height: 100%; border: none;"></iframe>`;
    } else {
        return `<img src="${media.src}" loading="${loadingBehavior}" decoding="async" alt="Media" style="width: 100%; height: 100%; object-fit: contain;">`;
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
            /* Intro Styles */
            .intro-block { margin-bottom: 60px; padding-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .intro-section { margin-bottom: 30px; }
            .intro-section h2 { color: var(--text-primary); margin-top: 0; margin-bottom: 15px; font-size: 1.5rem; }
            .intro-section p { margin-bottom: 15px; line-height: 1.6; font-size: 1.05rem; color: var(--text-secondary); }

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
            
            /* Steam Carousel Styles */
            .steam-carousel-container { width: 100%; margin-bottom: 60px; }
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
            .thumb-play-icon svg { margin-left: 2px; } /* Optically center the triangle */

            @media (min-width: 850px) {
                .intro-section h2 { font-size: 1.8rem; }
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
                /* DESKTOP: Restore larger thumbnails */
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
                        ${item.type === 'video' ? `
                            <div class="thumb-play-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
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
    window.changeCarouselMedia(0);
}

// -----------------------------------------------------
// 3. STEAM CAROUSEL LOGIC (SMART AUTO-PLAY)
// -----------------------------------------------------
let carouselIndex = 0;
let carouselTimer;

window.changeCarouselMedia = function(index) {
    carouselIndex = index;
    const mainView = document.getElementById('carousel-main-view');
    const thumbs = document.querySelectorAll('.steam-thumb');
    
    // Load new media into the main view (true = isFirstLoad to bypass lazy loading)
    mainView.innerHTML = getMediaHTML(projectData.steamCarousel[index], false, true);
    
    // Update thumbnail highlights
    thumbs.forEach((t, i) => {
        if (i === index) t.classList.add('active');
        else t.classList.remove('active');
    });

    // 1. Clear any existing image timer
    clearTimeout(carouselTimer);

    // 2. Check if the newly added media is a video
    const videoElement = mainView.querySelector('video');
    
    if (videoElement) {
        // Remove the 'loop' attribute so the video is allowed to end!
        videoElement.removeAttribute('loop');
        
        // When the video naturally finishes, advance the carousel
        videoElement.onended = () => {
            advanceCarousel();
        };
        
        // Fallback: If the video fails to load, advance after 5 seconds anyway
        videoElement.onerror = () => {
            carouselTimer = setTimeout(advanceCarousel, 5000);
        };
    } else {
        // If it's an image or iframe, wait 5 seconds then advance
        carouselTimer = setTimeout(advanceCarousel, 5000);
    }
};

// Helper function to figure out the next slide
function advanceCarousel() {
    let nextIndex = carouselIndex + 1;
    if (nextIndex >= projectData.steamCarousel.length) nextIndex = 0;
    window.changeCarouselMedia(nextIndex);
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