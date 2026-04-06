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
        { label: "Role", value: "Engine & Tools Programmer" },
        { label: "Release Year", value: "2025" }
    ],
    
    steamCarousel: [
        { 
            type: "youtube", 
            src: "https://www.youtube.com/embed/6T9ucwCqhoA", 
            thumb: "https://img.youtube.com/vi/6T9ucwCqhoA/maxresdefault.jpg" 
        },
        { 
            type: "image", 
            src: "../image/spite_oathbound/spite1.png", 
            thumb: "../image/spite_oathbound/spite1.png" 
        },
        { 
            type: "image", 
            src: "../image/spite_oathbound/spite2.png", 
            thumb: "../image/spite_oathbound/spite2.png" 
        }
    ],

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
                "As the Engine and Tools Programmer, my primary focus was laying the foundational architecture. Alongside a teammate, I established the build environment using Premake to ensure a clean, scalable multi-project solution. I also designed the engine's initial game object model, building a traditional pointer-based component system.",
                "While I wasn't the primary graphics programmer, I stepped in to heavily optimize the rendering pipeline. I developed an automatic instancing system that dynamically batched draw calls based on shared meshes and materials, which resulted in massive performance gains and kept our framerate smooth."
            ]
        }
    ],
    
    splitOverviews: [
        {
            title: "Core Architecture & Premake Build System",
            isFullWidth: true,
            text: [
                "To support three upcoming projects, I established our build environment using Premake. This allowed us to cleanly separate the Engine, Game, and Editor into modular projects without fighting manual Visual Studio configurations.",
                "I designed a decoupled application loop to separate game logic from rendering. While strict modularity was the goal, production realities caused some tightly coupled dependencies to slip through. Documenting these bottlenecks became a crucial learning experience that directly improved the architecture of our next engine iteration."
            ],
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Engine+Architecture" },
            mediaOnLeft: true
        },
        {
            title: "Pointer-Based Component System",
            isFullWidth: true,
            text: [
                "While an Object-Oriented, pointer-based component model isn't the most performant architecture compared to a modern ECS, it was the design the team agreed upon to get production moving quickly, and I built the system to meet those requirements.",
                "As the game scaled, the pitfalls of this design became apparent. Heavy reliance on raw pointers led to memory management issues and dangling pointers. We were too deep into production to safely rewrite the core, but this tech debt was a massive learning experience that directly motivated my push for rewriting our component system in time for the next project."
            ],
            codeSnippet: {
                title: "src/core/Actor.h",
                code: `class Actor
{
public:
    explicit Actor(const std::string& aName = "Actor");
    ~Actor();

    void Update(float aDeltaTime);

    template <class T, class... Args>
    T& AddComponent(Args&&... someArgs);

    template <class T>
    T& GetComponent();

    template <class T>
    const T& GetComponent() const;

    template <class T>
    T* TryGetComponent();

    template <class T>
    const T* TryGetComponent() const;

private:
    bool myIsActive;
    std::string myName;
    std::vector<Component*> myComponents;
    Scene* myScene;
};`
            }
        },
        {
            title: "Foundational Tools & ImGui Integration",
            isFullWidth: false,
            text: [
                "Before I developed a fully integrated editor, the team needed a way to debug and manipulate the game in real-time. I established the foundational tools architecture, creating a system for the team to easily instantiate floating ImGui panels.",
                "While these standalone panels were incredibly useful during early production, managing a chaotic workspace of floating windows is what ultimately motivated me to create the Editor as my specialization."
            ],
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=ImGui+Floating+Panels" },
            mediaOnLeft: false
        },
        {
            title: "Dynamic Camera Shake",
            isFullWidth: false,
            text: [
                "In a top-down Action RPG, combat is all about impact and 'game feel'. I took ownership of the camera system and built a custom camera shake mechanic that I am incredibly proud of, as it completely transformed how heavy and satisfying our combat felt.",
                "Instead of a jittery screen shake, I wanted the movement to feel natural and organic. The system smoothly blends in and out of shakes and can layer multiple impacts on top of each other."
            ],
            media: { type: "video", src: "../image/spite_oathbound/camera_shake.mp4", fallbackImg: "https://placehold.co/600x400/111620/00f0ff?text=Camera+Shake" },
            mediaOnLeft: true
        },
        {
            title: "Automatic Instancing Renderer",
            isFullWidth: true,
            text: [
                "As the game scaled and the levels got bigger, draw call overhead became a significant bottleneck. To solve this, I developed an automatic hardware instancing system that dynamically groups identical objects into rendering batches.",
                "The pipeline sorts active actors by Mesh and Material. As shown below, the engine binds a global instance buffer, iterates through each sub-mesh element, and applies the specific Pipeline State Object (PSO) and textures for that material batch. Finally, it dispatches a single 'DrawIndexedInstanced' call per batch, which drastically reduced our draw call count and maintained smooth framerate."
            ],
            codeSnippet: {
                title: "src/graphics/GraphicsEngine.cpp",
                code: `void GraphicsEngine::DrawModelInstanced(const Mesh& aMesh, const MeshBatch& aBatch, MaterialDomain aDomain, GraphicsCommandList& inoutCommandList)
{
    if (!PrepareModelForRendering(aMesh))
        return;

    ObjectBuffer objectBuffer = {};
    UpdateAndSetConstantBuffer(inoutCommandList, ConstantBufferType::ObjectBuffer, objectBuffer, 1, PipelineStage_VertexShader);

    inoutCommandList.BeginEvent(aMesh.GetName() + "_Instanced");

    inoutCommandList.SetVertexBuffer(&aMesh.myVertexBuffer, myGlobalInstanceBuffer.get());
    inoutCommandList.SetIndexBuffer(aMesh.myIndexBuffer);

    for (size_t elementIndex = 0; elementIndex < aMesh.myElements.size(); ++elementIndex)
    {
        const Mesh::Element& element = aMesh.myElements[elementIndex];

        for (const MaterialBatch& matBatch : aBatch.MaterialsPerElement[elementIndex])
        {
            Material* material = matBatch.Material;

            if (material->GetDescription().Domain != aDomain)
                continue;

            inoutCommandList.SetPipelineStateObject(material->myPSO);

            if (material->HasMaterialBuffer())
            {
                UpdateAndSetConstantBufferInternal(inoutCommandList, ConstantBufferType::MaterialBuffer, material->myData, Material::MATERIAL_BUFFER_SIZE, material->myBufferSlot,
                    PipelineStage_VertexShader | PipelineStage_PixelShader);
            }

            std::vector<Texture*> textures(material->myTextures.size());
            for (size_t i = 0; i < material->myTextures.size(); ++i)
                if (material->myTextures[i])
                    textures[i] = &material->myTextures[i]->GetTexture();

            inoutCommandList.SetShaderResources(
                textures.data(),
                textures.size(),
                0,
                PipelineStage_PixelShader
            );

            inoutCommandList.DrawIndexedInstanced(
                element.NumIndices,
                element.IndexOffset,
                matBatch.InstanceCount,
                matBatch.InstanceOffsetGlobal
            );
        }
    }

    inoutCommandList.EndEvent();
}`
            }
        }
    ]
};

// -----------------------------------------------------
// 2. RENDERING LOGIC (ULTRA-OPTIMIZED)
// -----------------------------------------------------
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
            <video autoplay loop muted playsinline preload="${videoPreload}" poster="${media.fallbackImg || ''}" style="width: 100%; height: 100%; object-fit: contain;">
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
        .replace(/\b(void|float|if|else|return|auto|for|const|bool|continue|class|sizeof|size_t|public|private|explicit|template)\b/g, '<span className="kw">$1</span>')
        .replace(/\b(GraphicsEngine|Mesh|MeshBatch|MaterialDomain|GraphicsCommandList|ObjectBuffer|ConstantBufferType|MaterialBatch|Material|Texture|Element|std|vector|string|Actor|Component|Scene|T|Args)\b/g, '<span className="ty">$1</span>')
        .replace(/\b(PipelineStage_VertexShader|PipelineStage_PixelShader|MATERIAL_BUFFER_SIZE)\b/g, '<span className="ty" style="color: #d2a8ff;">$1</span>')
        .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span className="fn">$1</span>')
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

                ${projectData.futurePlans && projectData.futurePlans.length > 0 ? `
                    <section class="article-section scroll-reveal" style="padding-top: 20px;">
                        <h2 style="color: var(--accent-color); font-size: 1.8rem; margin-bottom: 30px;">Future Plans</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                            ${projectData.futurePlans.map(plan => `
                                <div style="background: rgba(0, 240, 255, 0.02); border: 1px solid rgba(0, 240, 255, 0.1); border-radius: 12px; padding: 25px;">
                                    <h3 style="color: var(--text-primary); margin-top: 0; margin-bottom: 15px; font-size: 1.2rem;">${plan.title}</h3>
                                    <p style="color: var(--text-secondary); line-height: 1.6; margin: 0; font-size: 0.95rem;">${plan.text}</p>
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

    // 1. Clear any existing timer
    clearTimeout(carouselTimer);

    const activeMedia = projectData.steamCarousel[index];

    // 2. Decide how to handle auto-playing based on media type
    if (activeMedia.type === 'youtube') {
        // DO NOTHING: Leave the timer cleared. 
        // This lets the user click Play on the YouTube video and watch it at their own pace without the carousel interrupting them.
    } else if (activeMedia.type === 'video') {
        const videoElement = mainView.querySelector('video');
        if (videoElement) {
            // Remove the 'loop' attribute so the video is allowed to end!
            videoElement.removeAttribute('loop');
            
            // When the video naturally finishes, advance the carousel
            videoElement.onended = () => { advanceCarousel(); };
            
            // Fallback: If the video fails to load, advance after 5 seconds anyway
            videoElement.onerror = () => { carouselTimer = setTimeout(advanceCarousel, 5000); };
        } else {
            carouselTimer = setTimeout(advanceCarousel, 5000);
        }
    } else {
        // If it's a static image or a standard iframe, wait 5 seconds then advance
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
// 4. SEAMLESS PAGE TRANSITION LOGIC
// -----------------------------------------------------
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