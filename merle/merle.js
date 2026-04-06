// -----------------------------------------------------
// 1. PROJECT DATA
// -----------------------------------------------------
const projectData = {
    title: "Merle: The Kinda Incompetent Wizard",
    tagline: "3D Platformer Featuring Fluid Movement and Custom Physics",
    status: "Released 2026",
    techStack: ["C++20", "Frostheim Engine", "ImGui", "PhysX"],
    stats: [
        { label: "Engine", value: "Frostheim (Custom)" },
        { label: "Language", value: "C++" },
        { label: "Role", value: "Engine & Gameplay Programmer" },
        { label: "Release Year", value: "2026" }
    ],
    
    steamCarousel: [
        // --- Example of how to add a YouTube Video for Merle's Trailer! ---
        // { 
        //     type: "youtube", 
        //     src: "https://www.youtube.com/embed/YOUR_VIDEO_ID", 
        //     thumb: "https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg" 
        // },
        { 
            type: "video", 
            src: "../image/merle/merle_gameplay.mp4",
            fallbackImg: "https://placehold.co/1280x720/111620/00f0ff?text=Merle+Gameplay+Trailer",
            thumb: "https://placehold.co/240x135/111620/00f0ff?text=Trailer"
        },
        { 
            type: "image", 
            src: "../image/merle/Screenshot_01.png", 
            thumb: "../image/merle/Screenshot_01.png" 
        },
        { 
            type: "image", 
            src: "../image/merle/Screenshot_02.png", 
            thumb: "../image/merle/Screenshot_02.png" 
        },
        { 
            type: "image", 
            src: "../image/merle/Screenshot_03.png", 
            thumb: "../image/merle/Screenshot_03.png" 
        },
        { 
            type: "image", 
            src: "../image/merle/Screenshot_04.png", 
            thumb: "../image/merle/Screenshot_04.png" 
        },
        { 
            type: "image", 
            src: "../image/merle/Screenshot_05.png", 
            thumb: "../image/merle/Screenshot_05.png" 
        },
    ],

    introSections: [
        {
            title: "Evolving the Frostheim Engine",
            paragraphs: [
                "For our sixth project, we took a step back to address the technical debt we had found during Spite Oathbound. My primary focus was overhauling our component and actor architecture to eliminate the heavy reliance on raw pointers, effectively resolving the memory management issues and dangling pointer crashes we had previously struggled with.",
                "To push the engine's modularity even further, I created a application layer system. This allowed us to dynamically push and pop layers at runtime, meaning we could completely isolate or remove parts of the application stack on the fly. This architectural upgrade massively improved our stability and workflow."
            ]
        },
        {
            title: "Result & Reflection",
            paragraphs: [
                "Refactoring the engine's core was a massive time investment, but the payoff was undeniable. The entire programming team was significantly happier with the improved workflow, safety, and stability. Seeing the team smoothly develop gameplay mechanics without fighting the architecture made me incredibly proud of where the Frostheim engine stands today.",
                "Building a custom engine and immediately using it in production is the ultimate stress test, it quickly exposes what actually works in practice versus just in theory. While we have already identified new systems we want to optimize for our next project, this continuous cycle of building, using, and refining has been one of the greatest learning experiences of my education."
            ]
        }
    ],

    splitOverviews: [
        {
            title: "Semi-ECS",
            isFullWidth: true,
            text: [
                "When upgrading the engine, we needed better performance and memory safety without forcing the entire team to completely relearn a pure Data-Oriented ECS. To solve this, I engineered a 'Semi-ECS' architecture.",
                "Under the hood, the memory layout is tightly packed, utilizing IDs and handles to guarantee O(1) lookup speeds and cache coherency. However, it exposes a familiar, object-oriented base component interface to the gameplay programmers. This approach massively improved stability while keeping the team's workflow fast and comfortable."
            ],
            media: { type: "image", src: "https://placehold.co/1280x400/111620/00f0ff?text=Semi-ECS+Architecture" },
            mediaOnLeft: false
        },
        {
            title: "PhysX Character Controller",
            isFullWidth: false,
            text: [
                "For a 3D platformer, movement is everything. I was one of the two primary programmers dedicated to the player character, specifically focusing on the core movement mechanics.",
                "Using the PhysX CharacterController as our foundation, we made a completely data-driven player movement. Rather than hardcoding jump arcs and momentum logic, we built the system so that altering the underlying stats could create entirely different movement. We exposed all of these parameters directly to the level designers, empowering them to tweak the numbers, rapidly iterate, and dial in the perfect 'game feel' without ever needing to touch the code."
            ],
            media: { type: "video", src: "../image/merle/merle_movement.mp4", fallbackImg: "https://placehold.co/600x400/111620/00f0ff?text=Player+Movement" },
            mediaOnLeft: true
        },
        {
            title: "Dynamic Camera & Unreal Spline Pipeline",
            isFullWidth: false,
            text: [
                "I took ownership of the dynamic game camera, ensuring it smoothly tracked the player through complex 3D environments without clipping. However, other disciplines on the team also needed a way to create cinematic, scripted camera movements.",
                "To solve this, I developed a custom data pipeline between Unreal Engine and Frostheim. The team could draw standard splines in Unreal, which were then automatically exported into our level files and parsed directly by our engine. This cross-engine workflow gave the team the power to easily create camera rail tracks with zero friction."
            ],
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=Unreal+Spline+Tool" },
            mediaOnLeft: false
        }
    ],
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
        .replace(/\b(void|delete|while|for|if|else|int|float|double|bool|class|struct|return|const|constexpr|auto|template|typename|std|forward|virtual|public|default)\b/g, '<span class="kw">$1</span>')
        .replace(/\b(CharacterController|CollisionFlags|CollisionFlag|Vector3f|CU)\b/g, '<span class="ty">$1</span>')
        .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="fn">$1</span>')
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