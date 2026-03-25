const portfolioData = {
    sidebar: {
        status: "Seeking 2026 Internship",
        name: "Emil Barkefors",
        title: "Engine & Tools Programmer",
        
        description: "My core specialization is developing custom C++ game engines and intuitive level editor tools that bridge the gap between performance and designer workflow.",
        internshipNotice: "I am part of The Game Assembly's internship program. As per the agreement between the Games Industry and The Game Assembly, neither student nor company may be in contact with one another regarding internships before April 23rd. Any internship offers can be made on May 5th, at the earliest.",
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
            status: "★ Specialization", 
            statusClass: "active",
            techStack: ["C++20", "DX11", "ImGui", "JSON"],
            description: "My flagship project and primary specialization. A custom 3D level editor created using ImGui.",
            projectLink: "frostheim.html",
            linkText: "Read Breakdown →",
            media: {
                type: "video", 
                src: "your-editor-video.mp4",
                fallbackImg: "https://placehold.co/1280x720/111620/00f0ff?text=Frostheim+Editor+Video+Goes+Here"
            },
            keyFeatures: [
                "Content Browser with P4 Integration",
                "Prefab System",
                "Command Pattern Undo/Redo",
                "Dynamic Asset Thumbnails",
                "Macro-Driven C++ Reflection",
                "Object Picking"
            ]
        },
        {
            title: "Particle System & Editor",
            status: "Complete",
            statusClass: "", 
            techStack: ["C++", "DirectX 11", "ImGui", "Shaders"],
            description: "A modular, Niagara-inspired particle system and tool built entirely from scratch. Engineered a custom ImGui interface featuring curve editors and a component-based architecture where emitters own distinct behavior modules.",
            projectLink: "particle_editor.html", 
            linkText: "Read Breakdown →",
            media: {
                type: "image",
                src: "https://placehold.co/1280x720/111620/00f0ff?text=Particle+Editor+GIF/Image+Goes+Here"
            },
            keyFeatures: [
                "Component-Based Modules",
                "Easing Curves",
                "Custom UI",
                "Extensible Module API",
                "Macro-Driven C++ Reflection"
            ]
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
            description: "Isometric action-adventure game.",
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
            description: "Top-down ARPG built in our custom engine Frostheim.",
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
            description: "Smooth movement.",
            techStack: ["C++", "Frostheim", "2026"],
            link: "#", 
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