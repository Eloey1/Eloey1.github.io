const portfolioData = {
    sidebar: {
        status: "Seeking 2026 Internship",
        name: "Emil Barkefors",
        title: "Engine & Tools Programmer",
        // 1. Made the bio explicitly state your specialization
        description: "My core specialization is developing custom C++ game engines and intuitive level editor tools that bridge the gap between performance and designer workflow.",
        skills: [
            "C++ (14/17/20)", 
            "DirectX 11", 
            "ECS", 
            "ImGui Tooling", 
            "RenderDoc", 
            "Engine Architecture",
            "HLSL",
            "C#",
            "Custom Engine",
            "Unity",
            "Godot",
            "Unreal"
        ],
        links: {
            email: "mailto:emilb2002@gmail.com",
            resume: "Resume.pdf",
            linkedin: "https://www.linkedin.com/in/emil-barkefors-901096231/"
        }
    },

    architectureProjects: [
        {
            title: "Frostheim Editor",
            // 2. Transformed the status badge into a glowing Specialization tag
            status: "★ Specialization", 
            statusClass: "active", // Keeps the glowing cyan border
            techStack: ["C++20", "DX11", "ImGui", "JSON"],
            // 3. Updated the description to frame it as your flagship work
            description: "My flagship project and primary specialization. A custom 3D level editor engineered from scratch using ImGui to streamline asset placement and iteration. Built on a high-performance ECS architecture, featuring a robust Command Pattern undo/redo stack.",
            projectLink: "frostheim.html",
            linkText: "Read Technical Breakdown →",
            media: {
                type: "video", 
                src: "your-editor-video.mp4",
                fallbackImg: "https://placehold.co/1280x720/111620/00f0ff?text=Frostheim+Editor+Video+Goes+Here"
            },
            codeSnippet: {
                title: "src/core/CommandStack.cpp",
                code: `// Command Pattern Undo Stack
void CommandStack::Push(ICommand* cmd) {
    m_UndoStack.push(cmd);

    // Clear redo on new action
    while (!m_RedoStack.empty()) {
        delete m_RedoStack.top();
        m_RedoStack.pop();
    }
}`
            }
        },
        {
            title: "Particle System & Editor",
            status: "Complete",
            statusClass: "", 
            techStack: ["C++", "DirectX 11", "ImGui", "Shaders"],
            description: "A modular, Niagara-inspired particle system and tool built entirely from scratch. Engineered a custom ImGui interface featuring curve editors and a component-based architecture where emitters own distinct behavior modules.",
            projectLink: "particle_editor.html", 
            linkText: "View Tool Architecture →",
            media: {
                type: "image",
                src: "https://placehold.co/1280x720/111620/00f0ff?text=Particle+Editor+GIF/Image+Goes+Here"
            },
            codeSnippet: {
                title: "src/tools/ParticleEditor.cpp",
                code: `// ImGui VFX Authoring Tool
void ParticleEditor::DrawEmitterUI(Emitter& e) {
    ImGui::Text("Emission Properties");
    ImGui::DragFloat("Rate (p/s)", &e.EmissionRate, 1.0f, 0.0f, 5000.0f);
    
    // Evaluate custom curve data for over-time properties
    if (ImGui::TreeNode("Velocity over Lifetime")) {
        ImGui::CurveEditor("Velocity X", e.VelocityCurveX);
        ImGui::TreePop();
    }
}`
            }
        }
    ],

    gameProjects: [
        {
            title: "Pawn's Gambit",
            description: "The Rookies Runner-up & People's Choice award-winning puzzle game.",
            techStack: ["C#", "Unity", "2024"],
            link: "pawn.html",
            media: {
                type: "hover-gif", 
                src: "https://img.youtube.com/vi/RV0J4raLpqY/maxresdefault.jpg", 
                hoverSrc: "path/to/pawn-gameplay.gif"
            }
        },
        {
            title: "Tunnel Vision",
            description: "Narrative Driven 2D Platformer.",
            techStack: ["C++", "TGE Engine", "2025"],
            link: "tunnel_vision.html",
            media: {
                type: "hover-gif",
                src: "https://img.youtube.com/vi/C2sNwLEPPF4/maxresdefault.jpg",
                hoverSrc: "path/to/tunnel-vision.gif"
            }
        },
        {
            title: "Beak Noir",
            description: "Isometric top-down adventure featuring custom camera systems.",
            techStack: ["C++", "TGE Engine", "2025"],
            link: "beak_noir.html",
            media: {
                type: "hover-gif",
                src: "https://img.youtube.com/vi/gxaEJ56esTE/maxresdefault.jpg",
                hoverSrc: "path/to/beak-noir.gif"
            }
        },
        {
            title: "Spite Oathbound",
            description: "Top-down ARPG prototype built to test the Frostheim Engine logic.",
            techStack: ["C++", "Frostheim", "2025"],
            link: "spite_oathbound.html",
            media: {
                type: "hover-gif",
                src: "https://img.youtube.com/vi/6T9ucwCqhoA/maxresdefault.jpg",
                hoverSrc: "path/to/spite-oathbound.gif"
            }
        },
        {
            title: "3D Platformer",
            description: "Smooth movement and jumping mechanics.",
            techStack: ["C++", "Frostheim", "2026"],
            link: "#", // Add your HTML link here when ready
            media: {
                type: "hover-gif",
                src: "https://placehold.co/600x337/111620/00f0ff?text=Platformer+Static",
                hoverSrc: "https://placehold.co/600x337/111620/00f0ff?text=Platformer+GIF"
            }
        },
        {
            title: "TBA",
            description: "Unannounced project.",
            techStack: ["C++", "Frostheim", "2026"],
            link: "#", 
            media: {
                type: "hover-gif",
                src: "https://placehold.co/600x337/111620/00f0ff?text=TBA+Static",
                hoverSrc: "https://placehold.co/600x337/111620/00f0ff?text=TBA+GIF"
            }
        }
    ]
};