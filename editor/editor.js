// -----------------------------------------------------
// 1. PROJECT DATA
// -----------------------------------------------------
const projectData = {
    title: "Frostheim's Editor",
    tagline: "Custom Editor & Toolset for an In-House C++ Engine",
    status: "★ Flagship Project & Specialization",
    techStack: ["C++20", "DirectX 11", "ImGui", "JSON"],
    stats: [
        { label: "Role", value: "Engine & Tools Programmer" },
        { label: "Engine Base", value: "Frostheim (Custom C++)" },
        { label: "Core Focus", value: "Editor Architecture & UX" },
        { label: "TEMP", value: "TEMP" }
    ],
    
    steamCarousel: [
        { 
            type: "video", 
            src: "../image/editor/editor_showcase.mp4", 
            fallbackImg: "https://placehold.co/1280x720/111620/00f0ff?text=Showcase",
            thumb: "https://placehold.co/240x135/111620/00f0ff?text=Showcase" 
        },
        {
            type: "video",
            src: "../image/editor/parent_child.mp4",
            fallbackImg: "https://placehold.co/1280x720/111620/00f0ff?text=Parent",
            thumb: "https://placehold.co/1280x720/111620/00f0ff?text=Parent"
        },
        { 
            type: "image", 
            src: "../image/editor/editor1.png", 
            thumb: "../image/editor/editor1.png" 
        },
        { 
            type: "image", 
            src: "../image/editor/editor2.png", 
            thumb: "../image/editor/editor2.png" 
        },
        { 
            type: "image", 
            src: "../image/editor/editor3.png", 
            thumb: "../image/editor/editor3.png" 
        },
        { 
            type: "image", 
            src: "../image/editor/thumbnails.png", 
            thumb: "../image/editor/thumbnails.png" 
        }
    ],

    introSections: [
        {
            title: "Motivation & Goal",
            paragraphs: [
                "My vision for this editor was to create a familiar environment. Our team had several great utilities, but they were just standalone windows floating in the void. I wanted to create a unified workspace where they could all live and interact together.",
                "Having built a smaller-scale level editor in a previous project, I wanted to really challenge myself this time around. My goal was to take everything I had learned and make a proper, production-ready tool for real use cases."
            ]
        },
        {
            title: "Result & Reflection",
            paragraphs: [
                "I am incredibly proud of how the editor turned out. While a project of this scale is never truly 'finished,' it successfully achieved its primary goal: drastically improving our team's workflow by bringing previously scattered utilities into one seamless, unified environment.",
                "Will I keep developing Frostheim's editor? Absolutely. Building this from scratch was a massive challenge, but wrestling with complex architectural problems is exactly how you grow as an engine and tools programmer. I plan to continue expanding its features and pushing the editor to be the best it can possibly be."
            ]
        }
    ],
    
    splitOverviews: [
        {
            title: "The Architecture",
            isFullWidth: true,
            text: [
                "When designing the editor's architecture, my primary goal was extensibility and ease of use. I structured the system so any programmer could quickly build tools and expose components to the Inspector without wrestling with tedious boilerplate code."
            ],
            codeSnippet: {
                title: "src/components/TransformComponent.cpp",
                code: `void TransformComponent::OnInspectorUI(EditorUI& aUI)
{
    aUI.Vector3f("Position", myPosition);

    aUI.Vector3f("Rotation", {
        [&]() { return myRotation.GetEulerAnglesDegrees(); },
        [&](const CU::Vector3f& v) {
            myRotation = CU::QuaternionF(v * CU::DegToRad<float>());
            UpdateMatrix();
        }
    });

    aUI.Vector3f("Scale   ", myScale);
}`
            }
        },
        {
            title: "Undo/Redo via Custom ImGui Wrapper",
            isFullWidth: true,
            text: [
                "To support universal Undo/Redo without bloating the UI codebase, I built a custom ImGui wrapper. Modifying a value through this wrapper automatically generates the required command and pushes it to the stack entirely behind the scenes."
            ],
            codeSnippet: {
                title: "src/editor/EditorUI.cpp",
                code: `bool EditorUI::Float(const char* aLabel, UIBind<float> aBind, float aResetValue, const char* aFormat)
{
    bool moved = false;
    ImGuiID id = ImGui::GetID(aLabel);
    ImGui::PushID(aLabel);
    
    if (ImGui::BeginTable("##split", 2, ImGuiTableFlags_BordersInnerV | ImGuiTableFlags_SizingStretchProp))
    {
        DrawLabel(aLabel);
        float oldVal = aBind.Value;

        if (DrawResetButton("rst", aBind.Value, aResetValue))
        {
            aBind.Apply();
            HandleBindInstantUndo(aBind, oldVal, aBind.Value);
            moved = true;
        }
        ImGui::SameLine();
        ImGui::SetNextItemWidth(ImGui::GetContentRegionAvail().x);

        if (ImGui::DragFloat("##v", &aBind.Value, 0.1f, 0.0f, 0.0f, aFormat))
        {
            aBind.Apply();
            moved = true;
        }

        HandleBindDragUndo(id, aBind, ImGui::IsItemActivated(), ImGui::IsItemDeactivatedAfterEdit());
        ImGui::EndTable();
    }
    ImGui::PopID();
    return moved;
}`
            }
        },
        {
            title: "Content Browser",
            isFullWidth: false,
            text: [
                "An editor needs a way to manage project files. I developed a Content Browser that gives visual access to all models, textures, and prefabs directly within the interface and handles meta-files automatically.",
                "I tried to make it as easy as possible to import new assets and drop them out into the world, a goal I always had in mind."
            ],
            media: { type: "video", src: "../image/editor/dragAndDrop.mp4" },
            mediaOnLeft: false
        },
        {
            title: "Prefab System",
            isFullWidth: false,
            text: [
                "You can't have an editor without prefabs, so I built a robust Prefab system. I think the Unity-style prefab workflow is incredibly simple to understand, so that heavily influenced how mine works. It lets you save an object and all its different components as a single, reusable Actor.",
                "Editing a Prefab and clicking 'Apply' instantly synchronizes those changes across every instance in the scene."
            ],
            media: { type: "video", src: "../image/editor/sync_prefab.mp4", fallbackImg: "https://placehold.co/600x400/111620/00f0ff?text=Prefab+Video" },
            mediaOnLeft: true
        },
        {
            title: "Dynamic, Hot-Reloadable Thumbnails",
            isFullWidth: false,
            text: [
                "When a user creates a new Prefab or Material, the editor needs to show them what it looks like. I made a dedicated deferred and forward rendering pass that frames the asset in an invisible 'studio' and takes a snapshot to save to disk.",
                "This system is fully hot-reloadable. The moment a user modifies an asset and hits save, the old thumbnail is invalidated, re-rendered, and instantly updated in the Content Browser UI. This system also work if an asset was updated not during runtime"
            ],
            media: { type: "video", src: "../image/editor/hotreload_thumbnail.mp4", fallbackImg: "https://placehold.co/600x400/111620/00f0ff?text=Thumbnails" },
            mediaOnLeft: false
        },
        {
            title: "Perforce Integration",
            isFullWidth: false,
            text: [
                "The primary motivation for integrating perforce directly into the editor was to remove workflow friction. The introduction of a new meta-file system also inceresed the complexity of asset managemnt, so the editor-perforce workflow atomatilcy handles this.",
                "If a user checkouts a asset or mark a file for add, then system will find the corrusponding meta-file and automaticly mirrors the Perforce action."
            ],
            media: { type: "video", src: "../image/editor/temp_perforce.mp4", fallbackImg: "https://placehold.co/600x400/111620/00f0ff?text=Perforce" },
            mediaOnLeft: true
        },
        {
            title: "Visitor-Reflection",
            isFullWidth: true,
            text: [
                "Manually exposing and serializing component data often leads to massive amounts of duplicated, error-prone code.",
                "To solve this, I implemented the Visitor pattern. By defining a universal Visitor interface this can easily be used for more than just serializing, such as atomatic UI exposure. Now all I have to do is pass in an JSON Visitor to save/load a scene.",
                "This decoupled architecture also saved me a significant amount of time to make the prefab system."
            ],
            codeSnippet: {
                title: "src/core/Visitor.h",
                code: `class Visitor
{
public:
    virtual ~Visitor() = default;

    virtual void VisitField(const char* aName, float& aValue) = 0;
    virtual void VisitField(const char* aName, int& aValue) = 0;
    virtual void VisitField(const char* aName, bool& aValue) = 0;

    void Visit() {}

    template<typename T, typename... Rest>
    void Visit(const char* aName, T& aValue, Rest&&... aRest)
    {
        VisitField(aName, aValue);
        Visit(std::forward<Rest>(aRest)...);
    }
};`
            }
        }
    ],
    futurePlans: [
        {
            title: "Advanced Prefab Hierarchies",
            text: "I plan to expand the prefab system to support complex, multi-level hierarchies, allowing entire structures of parent and child to be saved as a single asset. Additionally, I want to develop a dedicated prefab editor as an isolated prefab window."
        },
        {
            title: "Continuous Iteration",
            text: "My philosophy as a tools programmer is that an editor is never truly finished. Moving forward, I want to focus on quality of life features, including adding multi-viewport rendering, a dedicated real-time statistics panel, and more adjustible selection outlines and themes to make the enviroment as comfortable as possible for the team."
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
        .replace(/\/\/.*/g, match => `<span className="cm">${match}</span>`)
        .replace(/\b(void|delete|while|for|if|else|int|float|double|bool|class|struct|return|const|constexpr|auto|template|typename|std|forward|virtual|public|default)\b/g, '<span class="kw">$1</span>')
        .replace(/\b(CommandStack|ICommand|EditorUI|TransformComponent|UIBind|ImGuiID|ImGui|Visitor|T|Rest)\b/g, '<span class="ty">$1</span>')
        .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="fn">$1</span>')
        .replace(/className=/g, 'class=');
}

function renderProjectPage() {
    const container = document.getElementById('project-content');

    const html = `
        <style>
            /* Intro Styles */
            .intro-block { margin-bottom: 50px; padding-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .intro-section { margin-bottom: 30px; }
            .intro-section h2 { color: var(--text-primary); margin-top: 0; margin-bottom: 15px; font-size: 1.5rem; }
            .intro-section p { margin-bottom: 15px; line-height: 1.6; font-size: 1.05rem; color: var(--text-secondary); }

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
            .steam-thumb { flex: 0 0 100px; aspect-ratio: 16 / 9; border-radius: 6px; overflow: hidden; cursor: pointer; border: 2px solid transparent; opacity: 0.5; transition: all 0.2s ease; background: #111; scroll-snap-align: start; }
            .steam-thumb.active { opacity: 1; border-color: var(--accent-color); }
            .steam-thumb:hover { opacity: 0.8; }
            .steam-thumb > img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
            
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
                        // NEW LOGIC: Check if it should be full width!
                        if (block.isFullWidth) {
                            return `
                                <div class="scroll-reveal" style="margin-bottom: 70px;">
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

                        // OLD LOGIC: Standard Zig-Zag layout for images
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
                    <section class="article-section" style="margin-top: 80px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.05);">
                        <h2 class="scroll-reveal" style="color: var(--accent-color); font-size: 1.8rem; margin-bottom: 30px;">Future Plans</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                            ${projectData.futurePlans.map(plan => `
                                <div class="scroll-reveal" style="background: rgba(0, 240, 255, 0.02); border: 1px solid rgba(0, 240, 255, 0.1); border-radius: 12px; padding: 25px;">
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

// -----------------------------------------------------
// 5. GLOBAL IDE WINDOW COLLAPSE LOGIC
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