// -----------------------------------------------------
// 1. PROJECT DATA
// -----------------------------------------------------
const projectData = {
    title: "Frostheim Editor",
    tagline: "Custom Engine & Custom Editor",
    status: "★ Flagship Project & Specialization",
    techStack: ["C++20", "DirectX 11", "ImGui", "JSON"],
    stats: [
        { label: "TEMP", value: "TEMP" },
        { label: "TEMP", value: "TEMP" },
        { label: "TEMP", value: "TEMP" },
        { label: "TEMP", value: "TEMP" }
    ],
    
    steamCarousel: [
        { 
            type: "video", 
            src: "your-editor-video.mp4", 
            fallbackImg: "https://placehold.co/1280x720/111620/00f0ff?text=Video+Fallback",
            thumb: "https://placehold.co/240x135/111620/00f0ff?text=Video" 
        },
        { 
            type: "image", 
            src: "image/editor/editor1.png", 
            thumb: "image/editor/editor1.png" 
        },
        { 
            type: "image", 
            src: "image/editor/editor2.png", 
            thumb: "image/editor/editor2.png" 
        },
        { 
            type: "image", 
            src: "image/editor/editor3.png", 
            thumb: "image/editor/editor3.png" 
        }
    ],

    introSections: [
        {
            title: "Motivation & Goal",
            paragraphs: [
                "My vision for this level editor was to create a familiar environment. Our team had several great utilities, but they were just standalone windows floating in the void. I wanted to create a unified workspace where they could all live and interact together.",
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
    
    // Zig-Zag layout (Good for scannable highlights)
    splitOverviews: [
        {
            title: "TEMP",
            text: [
                ".",
                "."
            ],
            media: { type: "image", src: "https://placehold.co/600x400/111620/00f0ff?text=TEMP" },
            mediaOnLeft: false
        }
    ],

    // DEEP DIVE SECTIONS (For massive amounts of text and code)
    deepDives: [
        {
            title: "The Command Stack (Undo/Redo System)",
            paragraphs: [
                ".",
                ".",
                "."
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
            }
        },
        {
            title: "Content Browser & P4 Integration",
            paragraphs: [
                ".",
                "."
            ]
        }
    ]
};

// -----------------------------------------------------
// 2. RENDERING LOGIC
// -----------------------------------------------------
function getMediaHTML(media, isThumb = false) {
    if (isThumb) {
        return `<img src="${media.thumb}" alt="Thumbnail">`;
    }
    if (media.type === 'video') {
        return `<video autoplay loop muted playsinline poster="${media.fallbackImg || ''}">
                    <source src="${media.src}" type="video/mp4">
                    <img src="${media.fallbackImg || ''}" alt="Fallback">
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
            /* Intro Styles */
            .intro-block { margin-bottom: 50px; padding-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .intro-section { margin-bottom: 30px; }
            .intro-section h2 { color: var(--accent-color); margin-top: 0; margin-bottom: 15px; font-size: 1.5rem; }
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
            
            /* Deep Dive Styles - MOBILE: Smaller padding so text isn't squished */
            .deep-dive-section { background: rgba(0, 240, 255, 0.02); border: 1px solid rgba(0, 240, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 40px; }
            .deep-dive-section h2 { margin-top: 0; color: var(--accent-color); border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 15px; margin-bottom: 20px; font-size: 1.4rem; }

            @media (min-width: 850px) {
                .intro-section h2 { font-size: 1.8rem; }
                .zig-zag-row { flex-direction: row; gap: 50px; align-items: center; }
                .zig-zag-row.media-right { flex-direction: row-reverse; }
                .zig-zag-col { flex: 1 1 0%; width: auto; min-width: 0; }
                
                /* DESKTOP: Restore large luxurious padding and larger thumbnails */
                .deep-dive-section { padding: 40px; }
                .deep-dive-section h2 { margin-bottom: 25px; font-size: 1.8rem; }
                .steam-thumb { flex: 0 0 140px; }
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

        <div class="steam-carousel-container media-reveal fade-in d-4">
            <div class="steam-main-view" id="carousel-main-view">
                ${getMediaHTML(projectData.steamCarousel[0])}
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

                <section class="article-section">
                    ${projectData.deepDives.map(dive => `
                        <div class="deep-dive-section scroll-reveal">
                            <h2>${dive.title}</h2>
                            ${dive.paragraphs.map(p => `<p style="margin-bottom: 20px; line-height: 1.7; font-size: 1.05rem;">${p}</p>`).join('')}
                            
                            ${dive.codeSnippet ? `
                            <div class="ide-window collapsed" style="margin-top: 30px; width: 100%;">
                                <div class="ide-header" onclick="void(0)">
                                    <div class="ide-dot" style="background:#ff5f56"></div><div class="ide-dot" style="background:#ffbd2e"></div><div class="ide-dot" style="background:#27c93f"></div>
                                    <span style="margin-left:auto; color:var(--text-secondary); font-size: 0.75rem;">${dive.codeSnippet.title}</span>
                                </div>
                                <div class="ide-content" style="max-height: 400px; overflow-y: auto; overflow-x: auto;">${highlightCode(dive.codeSnippet.code)}</div>
                            </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </section>

            </div>
        </div>
    `;

    container.innerHTML = html;
    startCarouselAutoPlay();
}

// -----------------------------------------------------
// 3. STEAM CAROUSEL LOGIC
// -----------------------------------------------------
let carouselIndex = 0;
let carouselTimer;

window.changeCarouselMedia = function(index) {
    carouselIndex = index;
    const mainView = document.getElementById('carousel-main-view');
    const thumbs = document.querySelectorAll('.steam-thumb');
    
    mainView.innerHTML = getMediaHTML(projectData.steamCarousel[index]);
    
    thumbs.forEach((t, i) => {
        if (i === index) t.classList.add('active');
        else t.classList.remove('active');
    });

    resetCarouselTimer();
};

function startCarouselAutoPlay() {
    carouselTimer = setInterval(() => {
        let nextIndex = carouselIndex + 1;
        if (nextIndex >= projectData.steamCarousel.length) nextIndex = 0;
        changeCarouselMedia(nextIndex);
    }, 5000);
}

function resetCarouselTimer() {
    clearInterval(carouselTimer);
    startCarouselAutoPlay();
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