import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Shivam Dixit",
  initials: "SD",
  url: "https://github.com/civdix",
  location: "Noida, Uttar Pradesh",
  locationLink: "https://www.google.com/maps/place/Noida,+Uttar+Pradesh",
  description:
    "AI Software Engineer specializing in building scalable applications, distributed systems, and AI solutions.",
  summary:
    "AI Software Engineer with experience building scalable applications using Node.js, Django REST Framework, React.js, Next.js, PostgreSQL, Redis, and AWS. Worked on large-scale systems at GeeksforGeeks handling 20M+ daily traffic, with hands-on experience in REST APIs, distributed systems, Docker, real-time communication, and AI-based solutions using GPT & RAG pipelines. currently working at Surepass, building an AIaaS (AI-as-a-Service) platform",
  avatarUrl: "/ShivamDixit.png",
  skills: {
    "Languages": [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "Java" },
      { name: "SQL" },
    ],
    "Frontend": [
      { name: "React" },
      { name: "Next.js" },
      { name: "Redux" },
      { name: "Tailwind CSS" },
      { name: "D3.js" },
      { name: "React Native" },
      { name: "Vue.js" },
      { name: "VueFlow" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Single Page Apps (SPA)" },
      { name: "Server-Side Rendering (SSR)" },
    ],
    "Backend": [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Django REST Framework" },
      { name: "Celery" },
      { name: "REST APIs" },
      { name: "WebSockets" },
      { name: "WebRTC / Agora" },
      { name: "Socket.IO" },
      { name: "JWT & Bcrypt" },
      { name: "SQLAlchemy" },
      { name: "Fast API" },
      { name: "Temporal" },
      { name: "Pydantic" },
      { name: "API Rate Limiting" }
    ],
    "Databases & Caching": [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Elasticsearch" },
      { name: "MinIO" },
      { name: "CDN Caching (CloudFront)" }
    ],
    "AI / ML": [
      { name: "OpenAI GPT APIs" },
      { name: "RAG Pipelines" },
      { name: "AI Agents" },
      { name: "OpenCV" },
      { name: "MediaPipe" }
    ],
    "DevOps & Tools": [
      { name: "AWS (S3, CloudFront, SQS, EC2, RDS, IAM)" },
      { name: "AWS EKS" },
      { name: "Docker" },
      { name: "N8N Automation" },
      { name: "Linux" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "BitBucket" }
    ]
  },
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "dixitshivam249@gmail.com",
    tel: "+919720965985",
    resumeLocation: "/resume.pdf",
    resumeUrl: "https://drive.google.com/file/d/1o8uC-yV_7_GfM3p2gH_3B81674wO8DkF/view?usp=sharing",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/civdix",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/shivdix",
        icon: Icons.linkedin,
        navbar: true,
      },
      LeetCode: {
        name: "LeetCode",
        url: "https://leetcode.com/u/oohwooh/",
        icon: Icons.leetcode,
        navbar: true,
      },
      GeeksForGeeks: {
        name: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/profile/shivamdixit11?tab=activity",
        icon: Icons.geeksforgeeks,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:dixitshivam249@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
      Whatsapp: {
        name: "Whatsapp",
        url: "https://wa.me/+919720965985",
        icon: Icons.whatsapp,
        navbar: true,
      }
    },
  },
  work: [
    {
      company: "Surepass",
      href: "https://surepass.io/",
      badges: ["Fast API", "PostgreSQL", "Redis", "Vue.js", "Temporal", "Pydantic", "MinIO", "VueFlow"],
      location: "North West Delhi, Delhi, India",
      title: "Software Engineer",
      logoUrl: "/surepass_logo.png",
      start: "June 2026",
      end: "Present",
      description: [
        "Developing a AIaaS (AI as a Service) Platform for Automating support and communication workflow for enterprises with their customers",
      ],
    },
    {
      company: "GeeksforGeeks",
      href: "https://www.geeksforgeeks.org",
      badges: ["DRF", "PostgreSQL", "Redis", "Elasticsearch", "Agora", "AWS (S3, CloudFront, SQS, EC2, RDS, IAM)", "Next.js", "Celery", "CloudFront", "Unix/Linux", "Git", "BitBucket", "Tailwind CSS",],
      location: "Noida, India",
      title: "Software Development Engineer Intern",
      logoUrl: "/gfg_logo.png",
      start: "Nov 2025",
      end: "June 2026",
      description: [
        "Developing scalable backend for GfG Connect using DRF for 20 Million+ Users worldwide with PostgreSQL.",
        "Contributed to Elasticsearch-based search optimization for GfG Connect.",
        "Implemented Redis and Celery (SQS Broker) for async tasks, improving response time & system performance.",
        "Developed real-time video/audio communication systems using WebSockets/WebRTC (Agora).",
        "Implemented CDN-based caching for GfG article pages, reducing estimated 32%+ backend requests.",
        "Revamped Jobs page of GeeksforGeeks into an SPA with SSR on initial render, improving SEO performance by 70%+ and reducing client-side load time.",
        "Developed an end-to-end Retrieval-Augmented Generation (RAG) pipeline for article evaluation, providing automated review, error detection, improvement recommendations, and a quality-based reward and penalty scoring system."
      ],
    },
    {
      company: "Seoulix Technologies",
      href: "https://seoulix.com",
      badges: ["Next.js", "n8n", "OpenAI", "RAG", "Docker", "EC2", "ExpressJS", "AWS"],
      location: "Gurugram, India",
      title: "Software Development Engineer Intern",
      logoUrl: "/seoulix_logo.png",
      start: "Jul 2025",
      end: "Nov 2025",
      description: [
        "Improved overall system performance and SEO by 73%, migrating architecture to SSR-based frontend Next.js.",
        "Developed an enterprise-level application (ERS) from scratch to deployment, handling 2,600+ Users daily.",
        "Designed and deployed a Dockerized n8n automation system on EC2, integrating OpenAI GPT APIs with a RAG pipeline for context-aware YouTube content generation."
      ],
    },
    {
      company: "Ritual Gurus",
      href: "#",
      badges: ["AWS EKS", "OpenCV", "MediaPipe", "Python", "API Rate Limiting", "React Native"],
      location: "Panighat Parikrama Marg, Vrindavan, India",
      title: "Full Stack Developer Intern",
      logoUrl: "/ritualguru_logo.png",
      start: "Feb 2025",
      end: "Apr 2025",
      description: [
        "Worked with cross-functional teams to deliver scalable containerized solutions on AWS Elastic Kubernetes Service (EKS).",
        "Implemented rate limiting which resulted in a 30% API calls reduction, improving backend efficiency.",
        "Developed a Palmistry module with Sign detection and Lines detection using OpenCV and MediaPipe."
      ],
    },
  ],
  education: [
    {
      school: "Dr. A.P.J. Abdul Kalam Technical University",
      href: "https://aktu.ac.in",
      degree: "Bachelor of Technology - Major: Computer Science",
      logoUrl: "/aktu_logo.png",
      start: "2022",
      end: "2026",
    },
  ],
  projects: [
    {
      title: "Sukoon World",
      href: "https://sukoonworld.org",
      dates: "Jun 2026",
      active: true,
      description:
        "A comprehensive mental wellness platform designed to provide interactive stress-relief resources, meditation exercises, and mindfulness techniques.",
      technologies: ["JavaScript", "React", "Next.js", "Tailwind CSS", "Node.js"],
      links: [
        {
          type: "Website",
          href: "https://sukoonworld.org",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/civdix/Sukoon-world",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/sukoon_world.png",
      video: "",
    },
    {
      title: "Jewels - The Smart Jwellery Website",
      href: "https://jewels-team.vercel.app",
      dates: "Apr 2026",
      active: true,
      description:
        "A Smart Jewellery website for new generation jewellers where the main feature virtual try on is AI compatible virtual try feature for person who visits the store.",
      technologies: ["JavaScript", "React", "Next.js", "Tailwind CSS", "Node.js"],
      links: [
        {
          type: "Website",
          href: "https://jewels-team.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/civdix/Jewels-Team",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/jwell_project.png",
      video: "",
    },
    {
      title: "ERS (Employee Review System)",
      href: "https://github.com/civdix/ERS-System",
      dates: "Aug 2025",
      active: true,
      description:
        "An enterprise-level customer feedback system featuring employee KPI tracking, outlet rankings, and statistical data visualization for Mystery Rooms.",
      technologies: ["Next.js", "Redux", "D3.js", "SQL", "AWS", "Tailwind CSS", "TypeScript"],
      links: [
        {
          type: "Website",
          href: "https://feedback.mysteryrooms.co.in",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/civdix/ERS-System",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/ers_preview.png",
      video: "",
    },
    {
      title: "Studmart",
      href: "https://studmart.vercel.app",
      dates: "Apr 2025",
      active: true,
      description:
        "A scalable student marketplace platform. Designed a secure authentication system using JWT/Bcrypt and robust media authorization using AWS S3 signed URLs.",
      technologies: ["React", "Redux", "Node.js", "Express.js", "MongoDB", "Redis", "Socket.IO", "AWS S3", "D3.js"],
      links: [
        {
          type: "Website",
          href: "https://studmart.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/civdix/studmart",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/studmart.png",
      video: "",
    },
    {
      title: "WAWY",
      href: "https://github.com/civdix/WAWY",
      dates: "Feb 2025",
      active: true,
      description:
        "A dignified afterlife service platform that handles cremation site booking, transport, accommodations, and ceremonies, bridging tradition and convenience.",
      technologies: ["JavaScript", "React", "Next.js", "Tailwind CSS", "Node.js"],
      links: [
        {
          type: "Website",
          href: "https://wawy.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/civdix/WAWY",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/wawy_preview.png",
      video: "",
    },
    {
      title: "RuralRise",
      href: "https://ruralrise.vercel.app",
      dates: "Feb 2025",
      active: true,
      description:
        "An award-winning platform (4th Prize at World Engineering Day) designed for rural development and empowerment, facilitating resources and digital connectivity.",
      technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
      links: [
        {
          type: "Website",
          href: "https://ruralrise.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/civdix/ruralrise",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/rural_rise.png",
      video: "",
    },
    {
      title: "Palmy",
      href: "https://github.com/civdix/MiniProject-RitualGuru",
      dates: "Dec 2024",
      active: true,
      description:
        "Palm Reading Astrological Software that uses OpenCV and MediaPipe to detect hand shapes, finger positions, and palm lines with 90% sign detection accuracy.",
      technologies: ["Python", "OpenCV", "MediaPipe", "NumPy", "Pandas", "Tkinter"],
      links: [
        {
          type: "Source",
          href: "https://github.com/civdix/MiniProject-RitualGuru",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/palmy_preview.png",
      video: "",
    },
    {
      title: "sharingCalc",
      href: "https://github.com/civdix/sharingCalc",
      dates: "Oct 2024",
      active: true,
      description:
        "Sharing and Caring Calculator is a web application that tracks spending and generates analytical reports with beautiful data visualizations.",
      technologies: ["JavaScript", "HTML", "CSS", "D3.js", "Chart.js"],
      links: [
        {
          type: "Source",
          href: "https://github.com/civdix/sharingCalc",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Youtube",
          href: "https://www.youtube.com/watch?v=QbtuedakTkw&list=PLuBu7ekp-O1V7VmWJNqKCarEVeIf9EATd&index=2",
          icon: <Icons.youtube className="size-3" />,
        }
      ],
      image: "/Sharing&caringCalc.png",
      video: "https://www.youtube.com/watch?v=QbtuedakTkw&list=PLuBu7ekp-O1V7VmWJNqKCarEVeIf9EATd&index=2",
    }
  ],
  achievements: [
    {
      title: "Solved 250+ DSA Questions",
      dates: "2024 - Present",
      location: "LeetCode & GeeksforGeeks",
      description: "Solved 250+ data structures and algorithms questions on competitive programming platforms.",
      image: "",
      links: [
        {
          title: "LeetCode",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://leetcode.com/u/oohwooh/",
        },
        {
          title: "GeeksforGeeks",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.geeksforgeeks.org/profile/shivamdixit11?tab=activity",
        },
      ],
    },
    {
      title: "2nd at BSAthon - DSA Competition",
      dates: "2024",
      location: "BSAthon",
      description: "Secured 2nd rank in the BSAthon Data Structures and Algorithms competition.",
      image: "",
      links: [],
    },
    {
      title: "4th Prize – World Engineering Day",
      dates: "March 2025",
      location: "World Engineering Day Competition",
      description: "Won 4th prize for showcasing RuralRise project at Eshan College of Engineering, Mathura.",
      image: "",
      links: [
        {
          title: "View Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://drive.google.com/file/d/10k58eva5s8Ua1XPLSfy8crW0XEfOZA3E/view?usp=sharing",
        },
      ],
    },
    {
      title: "2nd at Eureka AI Startup Idea Competition",
      dates: "2025",
      location: "Eureka AI Competition",
      description: "Secured 2nd place in Eureka AI Startup Idea Competition for pitching an innovative AI concept.",
      image: "",
      links: [
        {
          title: "View Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://drive.google.com/file/d/1QLruaRIeiInmurc-T6eB--BydLgI4kVc/view?usp=sharing",
        },
      ],
    },
  ],
} as const;
