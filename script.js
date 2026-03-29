// -----------------------------------------------------
// 0. DATA RENDERING LOGIC (ULTRA-OPTIMIZED)
// -----------------------------------------------------

function getMediaHTML(media, isFirstLoad = false) {
    const loadingBehavior = isFirstLoad ? 'eager' : 'lazy';
    const videoPreload = isFirstLoad ? 'auto' : 'none';
    const fillStyles = "position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;";

    if (media.type === 'video') {
        return `
            <video loop muted playsinline preload="${videoPreload}" poster="${media.fallbackImg}" style="${fillStyles}" class="lazy-autoplay">
                <source src="${media.src}" type="video/mp4">
                <img src="${media.fallbackImg}" loading="${loadingBehavior}" alt="Video Fallback" style="${fillStyles}">
            </video>`;
    } else if (media.type === 'iframe') {
        return `<iframe loading="${loadingBehavior}" src="${media.src}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="${fillStyles} border: none;"></iframe>`;
    } else if (media.type === 'hover-video') {
        return `
            <div class="hover-video-container" style="${fillStyles} overflow: hidden;">
                <img src="${media.src}" loading="${loadingBehavior}" decoding="async" class="hover-video-poster" alt="Project Media" style="${fillStyles} z-index: 2; transition: opacity 0.3s ease;">
                <video loop muted playsinline preload="none" class="hover-video-player" style="${fillStyles} z-index: 1;">
                    <source src="${media.hoverSrc}" type="video/mp4">
                </video>
            </div>`;
   } else if (media.type === 'hover-gif') {
        return `<img src="${media.src}" data-static="${media.src}" data-hover="${media.hoverSrc}" class="hover-gif" loading="${loadingBehavior}" decoding="async" alt="Project Media" style="${fillStyles}">`;
    } else {
        return `<img src="${media.src}" loading="${loadingBehavior}" decoding="async" alt="Project Media" style="${fillStyles}">`;
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

function renderPortfolio() {
    // 1. Render Sidebar
    const sidebarHtml = `
        <div>
            <div class="status-badge"><div class="pulse"></div> ${portfolioData.sidebar.status}</div>
            <h1 class="text-gradient">${portfolioData.sidebar.name}</h1>
            <h2>${portfolioData.sidebar.title}</h2>
            <p style="font-size: 0.95rem;">${portfolioData.sidebar.description}</p>
            <div class="instant-skills">
                ${portfolioData.sidebar.skills.map((skill, index) => 
                    `<span class="skill-tag" ${index === 0 ? 'style="border-color: var(--accent-color); color: var(--accent-color);"' : ''}>${skill}</span>`
                ).join('')}
            </div>
        </div>
        <div>
            <div class="nav-links">
                <a href="${portfolioData.sidebar.links.email}" class="btn btn-primary">Contact / Email</a>
                <a href="${portfolioData.sidebar.links.resume}" target="_blank" class="btn btn-secondary">View Resume (PDF)</a>
                <a href="${portfolioData.sidebar.links.linkedin}" target="_blank" class="btn btn-secondary">
                    <svg viewBox="0 0 24 24" style="width:16px; height:16px; fill:currentColor; margin-right: 8px;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    LinkedIn
                </a>
            </div>
            <div class="sidebar-footer">
                <span id="fps" style="color: var(--accent-color);">60 FPS</span>
                <span>DRAW CALLS: 1</span>
            </div>
        </div>
    `;
    document.getElementById('sidebar-container').innerHTML = sidebarHtml;

    // 2. Render Architecture Section (Restored Hover Effects & Optimization)
    const archHtml = portfolioData.architectureProjects.map((proj, index) => `
        <article class="featured-card scroll-reveal" style="position: relative; transition: transform 0.3s ease, box-shadow 0.3s ease; ${index > 0 ? 'margin-top: 3rem;' : ''}" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(0, 240, 255, 0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            
            <a href="${proj.projectLink}" style="position: absolute; inset: 0; z-index: 10; width: 100%; height: 100%;"></a>

            <div class="media-wrapper" style="position: relative; z-index: 1; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.02)';" onmouseout="this.style.transform='scale(1)';">
                ${getMediaHTML(proj.media, index === 0)}
            </div>
            
            <div class="card-body" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 30px;">
                
                <div class="card-title-area" style="position: relative; z-index: 1; flex: 1 1 400px; min-width: 0;">
                    <h4>${proj.title} <span class="status ${proj.statusClass}">${proj.status}</span></h4>
                    <div class="tech-list">${proj.techStack.join(' • ')}</div>
                    <p style="margin-bottom: 20px; line-height: 1.6;">${proj.description}</p>
                    <span style="color: var(--accent-color); font-family: var(--font-mono); font-size: 0.95rem; font-weight: 600; text-decoration: none; pointer-events: none;">
                        ${proj.linkText}
                    </span>
                </div>
                
                <div style="flex: 0 1 420px; width: 100%; background: linear-gradient(145deg, rgba(0, 240, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 12px; padding: 24px; position: relative; z-index: 1; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
                    <h5 style="color: var(--accent-color); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid rgba(0, 240, 255, 0.15); padding-bottom: 10px;">Highlights</h5>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        ${proj.keyFeatures.map(feature => `
                            <li style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 12px; display: flex; align-items: flex-start; line-height: 1.5;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 12px; margin-top: 3px; flex-shrink: 0;"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                ${feature}
                            </li>
                        `).join('')}
                    </ul>
                </div>

            </div>
        </article>
    `).join('');
    document.getElementById('architecture-container').innerHTML = archHtml;

    // 3. Render Games Bento Grid (Restored Hover Effects & Forced Lazy Loading)
    let gamesHtml = portfolioData.gameProjects.map(game => `
        <div class="bento-card scroll-reveal" style="position: relative; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.3s ease, border-color 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='var(--accent-color)';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='';">
            
            <a href="${game.link}" style="position: absolute; inset: 0; z-index: 10; width: 100%; height: 100%;"></a>
            
            <div class="media-wrapper" style="position: relative; z-index: 1; width: 100%; aspect-ratio: 16/9; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,0.05);">
                ${getMediaHTML(game.media, false)}
            </div>
            
            <div class="bento-content" style="position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column;">
                <div class="bento-header">
                    <h4>${game.title}</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" stroke-width="2" style="transition: transform 0.3s ease;" class="bento-arrow"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                </div>
                <p style="flex: 1;">${game.description}</p>
                <div class="bento-footer"><span>${game.techStack.slice(0, 2).join(' • ')}</span><span>${game.techStack[2]}</span></div>
            </div>
        </div>
    `).join('');

    gamesHtml += `
            <div class="scroll-reveal" style="grid-column: 1 / -1; margin-top: 50px; padding-top: 40px; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
                <div style="display: inline-block; text-align: left; background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 8px; padding: 20px; max-width: 800px;">
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
                        <strong style="color: var(--accent-color);">Important Notice:</strong><br>
                        ${portfolioData.sidebar.internshipNotice}
                    </p>
                </div>
            </div>
        `;
    
    document.getElementById('games-container').innerHTML = gamesHtml;
}

renderPortfolio();

// -----------------------------------------------------
// HOVER MEDIA LOGIC (Supports both GIFs and MP4s)
// -----------------------------------------------------
document.addEventListener('mouseover', function(e) {
    const card = e.target.closest('.bento-card, .featured-card');
    if (card) {
        // Handle Legacy GIFs
        const img = card.querySelector('.hover-gif');
        if (img && img.dataset.hover) {
            img.src = img.dataset.hover;
        }

        // Handle Optimized MP4 Videos
        const vidContainer = card.querySelector('.hover-video-container');
        if (vidContainer) {
            const vid = vidContainer.querySelector('.hover-video-player');
            const poster = vidContainer.querySelector('.hover-video-poster');
            if (vid) {
                vid.play().catch(err => console.log("Video play interrupted"));
                if (poster) poster.style.opacity = '0';
            }
        }
    }
});

document.addEventListener('mouseout', function(e) {
    const card = e.target.closest('.bento-card, .featured-card');
    if (card) {
        // Handle Legacy GIFs
        const img = card.querySelector('.hover-gif');
        if (img && img.dataset.static) {
            img.src = img.dataset.static;
        }

        // Handle Optimized MP4 Videos
        const vidContainer = card.querySelector('.hover-video-container');
        if (vidContainer) {
            const vid = vidContainer.querySelector('.hover-video-player');
            const poster = vidContainer.querySelector('.hover-video-poster');
            if (vid) {
                vid.pause();
                vid.currentTime = 0; // Resets video to beginning
                if (poster) poster.style.opacity = '1';
            }
        }
    }
});


// -----------------------------------------------------
// 3. SEAMLESS PAGE TRANSITION & SCROLL REVEAL (Restored)
// -----------------------------------------------------
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('is-exiting');
        document.body.classList.add('is-loaded');
    } else {
        setTimeout(() => { document.body.classList.add('is-loaded'); }, 100);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Reveal links handler
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

    // SCROLL REVEAL ANIMATIONS (Fixes the fade-in logic missing previously)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Fade the card in
                entry.target.classList.add('visible');
                
                // 2. If the card has a video, start downloading and playing it NOW!
                const lazyVids = entry.target.querySelectorAll('video.lazy-autoplay');
                lazyVids.forEach(vid => {
                    vid.play().catch(err => console.log("Autoplay prevented:", err));
                });

                // Stop observing once it's loaded
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px 100px 0px" // Loads 100px before it enters the screen so it's ready
    });

    setTimeout(() => {
        document.querySelectorAll('.scroll-reveal').forEach((el) => {
            observer.observe(el);
        });
    }, 100);
});

// -----------------------------------------------------
// 6. SEQUENTIAL BACKGROUND ASSET LOADER
// -----------------------------------------------------
window.addEventListener('load', () => {
    // Give the CPU and network 1 full second to completely finish rendering the page
    setTimeout(() => {
        console.log("Page is ready. Starting sequential asset streaming...");
        
        const backgroundVideos = document.querySelectorAll('video.lazy-autoplay');
        
        // This is an asynchronous queue that loads one video at a time
        async function loadVideosSequentially() {
            for (let i = 0; i < backgroundVideos.length; i++) {
                const vid = backgroundVideos[i];
                console.log(`Buffering video ${i + 1} of ${backgroundVideos.length}...`);
                
                await new Promise((resolve) => {
                    // If the video is already buffered, skip it!
                    if (vid.readyState >= 3) {
                        return resolve();
                    }

                    // Create a function to move to the next video
                    const finishLoading = () => {
                        vid.removeEventListener('canplaythrough', finishLoading);
                        vid.removeEventListener('error', finishLoading);
                        resolve();
                    };

                    // Listen for when the browser says "I have downloaded enough to play this smoothly"
                    vid.addEventListener('canplaythrough', finishLoading);
                    
                    // Listen for errors (so a broken video doesn't freeze the whole queue)
                    vid.addEventListener('error', finishLoading);

                    // TRIGGER THE DOWNLOAD
                    vid.preload = 'auto';
                    vid.load(); // Force the browser to start fetching

                    // FAILSAFE: If a video takes longer than 4 seconds to buffer, 
                    // move on to the next one so the queue doesn't get stuck forever on slow 4G.
                    setTimeout(finishLoading, 4000);
                });
            }
            console.log("All background assets successfully streamed into memory!");
        }

        // Start the queue!
        loadVideosSequentially();

    }, 1000); 
});

// -----------------------------------------------------
// 4. GLOBAL IDE WINDOW COLLAPSE LOGIC
// -----------------------------------------------------
document.addEventListener('click', function(e) {
    const header = e.target.closest('.ide-header');
    if (header) {
        const window = header.closest('.ide-window');
        if (window) {
            window.classList.toggle('collapsed');
        }
    }
});