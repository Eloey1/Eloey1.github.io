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
            "ECS Architecture", 
            "ImGui Tooling", 
            "RenderDoc", 
            "Linear Algebra"
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
            description: "My flagship project and primary specialization. A custom 3D level editor engineered from scratch to streamline asset placement and iteration. Built on a high-performance ECS architecture, featuring a robust Command Pattern undo/redo stack for non-destructive workflows.",
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
            techStack: ["C++", "DirectX 11", "ImGui", "Compute Shaders"],
            description: "A high-performance, GPU-driven particle system paired with a comprehensive ImGui authoring tool. Engineered to empower VFX artists with real-time visual feedback, curve-based property editing, and efficient data serialization.",
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
            techStack: ["C#", "Unity", "2025"],
            link: "pawn.html", // Updated link to your new pawn page!
            media: {
                type: "image",
                src: "https://placehold.co/600x337/111620/00f0ff?text=Pawn's+Gambit+GIF"
            }
        },
        {
            title: "Tunnel Vision",
            description: "Custom physics-based character controller built natively.",
            techStack: ["C++", "TGE Engine", "2025"],
            link: "https://www.youtube.com/watch?v=C2sNwLEPPF4",
            media: {
                type: "iframe",
                src: "https://www.youtube.com/embed/C2sNwLEPPF4"
            }
        },
        {
            title: "Beak Noir",
            description: "Isometric top-down adventure featuring custom camera systems.",
            techStack: ["C++", "TGE Engine", "2025"],
            link: "https://www.youtube.com/watch?v=gxaEJ56esTE",
            media: {
                type: "iframe",
                src: "https://www.youtube.com/embed/gxaEJ56esTE"
            }
        },
        {
            title: "Spite Oathbound",
            description: "Top-down ARPG prototype built to test the Frostheim Engine logic.",
            techStack: ["C++", "Frostheim", "2026"],
            link: "https://www.youtube.com/watch?v=6T9ucwCqhoA",
            media: {
                type: "video",
                src: "your-spite-video.mp4",
                fallbackImg: "https://placehold.co/600x337/111620/00f0ff?text=Spite+Oathbound+Video"
            }
        },
        {
            title: "3D Platformer",
            description: "Smooth movement and jumping mechanics.",
            techStack: ["C++", "Frostheim", "2026"],
            link: "https://www.youtube.com/watch?v=6T9ucwCqhoA",
            media: {
                type: "video",
                src: "your-spite-video.mp4",
                fallbackImg: "https://placehold.co/600x337/111620/00f0ff?text=TBA"
            }
        },
        {
            title: "TBA",
            description: "Unannounced project.",
            techStack: ["C++", "Frostheim", "2026"],
            link: "https://www.youtube.com/watch?v=6T9ucwCqhoA",
            media: {
                type: "video",
                src: "your-spite-video.mp4",
                fallbackImg: "https://placehold.co/600x337/111620/00f0ff?text=TBA"
            }
        }
    ]
};