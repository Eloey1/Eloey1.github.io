const portfolioData = {
    sidebar: {
        status: "Seeking 2026 Internship",
        name: "Emil Barkefors",
        title: "Tools & Engine Programmer",
        
        description: "I'm a soon-to-be graduate in Game Programming from The Game Assembly in Malmö, Sweden. During my studies I have developed a interest for custom C++ Engines and Tools.",
        internshipNotice: "I am part of The Game Assembly's internship program. As per the agreement between the Games Industry and The Game Assembly, neither student nor company may be in contact with one another regarding internships before April 15th. Any internship offers can be made on April 27th, at the earliest.",
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
            "Perforce",
            "Github"
        ],
        links: {
            email: "mailto:emilb2002@gmail.com",
            resume: "image/Emil-Resume.pdf",
            linkedin: "https://www.linkedin.com/in/emil-barkefors/"
        }
    },

    architectureProjects: [
        {
            title: "Frostheim's Editor",
            status: "★ Specialization", 
            statusClass: "active",
            techStack: ["C++20", "DirectX 11", "ImGui", "JSON"],
            description: "My flagship project and primary specialization. A custom C++ engine editor built with ImGui, featuring a robust Content Browser, Unity-style Prefabs, and a seamless drag-and-drop workflow.",
            projectLink: "editor",
            linkText: "Read Breakdown →",
            media: {
                type: "video", 
                src: "image/editor/UndoAndRedo.mp4",
                fallbackImg: "https://placehold.co/1280x720/111620/00f0ff?text=Editor"
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
            status: "Production-Proven",
            statusClass: "", 
            techStack: ["C++", "DirectX 11", "ImGui", "Shaders"],
            description: "A modular, Niagara-inspired particle system and tool built entirely from scratch. Engineered a custom ImGui interface featuring curve editors and a component-based architecture where emitters own distinct behavior modules.",
            projectLink: "particle_editor", 
            linkText: "Read Breakdown →",
            media: {
                type: "video",
                src: "image/hailstorm/fireParticle.mp4",
                fallbackImg: "https://placehold.co/1280x720/111620/00f0ff?text=Particle+System"
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
            title: "Spite Oathbound",
            description: "Top-down ARPG built in our custom engine Frostheim.",
            techStack: ["C++", "Frostheim", "2025"],
            link: "spite_oathbound",
            media: {
                type: "hover-video",
                src: "https://img.youtube.com/vi/6T9ucwCqhoA/maxresdefault.jpg",
                hoverSrc: "image/spite_oathbound/spite.mp4"
            }
        },
        {
            title: "Merle: The Kinda Incompetent Wizard",
            description: "3D platformer with Smooth movement.",
            techStack: ["C++", "Frostheim", "2026"],
            link: "merle", 
            media: {
                type: "hover-video",
                src: "image/merle/merle.png",
                hoverSrc: "image/merle/merle_gameplay.mp4"
            }
        },
        {
            title: "Pawn's Gambit",
            description: "The Rookies Runner-up & People's Choice award-winning puzzle game.",
            techStack: ["C#", "Unity", "2024"],
            link: "pawn",
            media: {
                type: "hover-video", 
                src: "image/pawns/pawn_gambit.jpg", 
                hoverSrc: "image/pawns/pawns.mp4"
            }
        },
        {
            title: "Tunnel Vision",
            description: "Narrative Driven 2D Platformer.",
            techStack: ["C++", "TGE Engine", "2025"],
            link: "tunnel_vision",
            media: {
                type: "hover-video",
                src: "https://img.youtube.com/vi/C2sNwLEPPF4/maxresdefault.jpg",
                hoverSrc: "image/tunnel_vision/tunnel_vision.mp4"
            }
        },
        {
            title: "Beak Noir",
            description: "Isometric action-adventure game.",
            techStack: ["C++", "TGE Engine", "2025"],
            link: "beak_noir",
            media: {
                type: "hover-video",
                src: "https://img.youtube.com/vi/gxaEJ56esTE/maxresdefault.jpg",
                hoverSrc: "image/beak_noir/beak_noir.mp4"
            }
        },
        {
            title: "TBA",
            description: "Unannounced project.",
            techStack: ["C++", "Frostheim", "2026"],
            link: "/", 
            media: {
                type: "hover-video",
                src: "https://placehold.co/600x337/111620/00f0ff?text=TBA",
                hoverSrc: "https://placehold.co/600x337/111620/00f0ff?text=TBA+GIF"
            }
        }
    ]
};