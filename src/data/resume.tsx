import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import { RAG } from "@/components/ui/svgs/RAG";

export const DATA = {
  name: "Shivam Dixit",
  initials: "SD",
  url: "https://github.com/civdix",
  location: "Noida, Uttar Pradesh",
  locationLink: "https://www.google.com/maps/place/Noida,+Uttar+Pradesh",
  description:
    "Full Stack Software Engineer specializing in building scalable applications, distributed systems, and AI solutions.",
  summary:
    "Full Stack Software Engineer with experience building scalable applications using Node.js, Django REST Framework, React.js, Next.js, PostgreSQL, Redis, and AWS. Worked on large-scale systems at GeeksforGeeks handling 20M+ daily traffic, with hands-on experience in REST APIs, distributed systems, Docker, real-time communication, and AI-based solutions using GPT & RAG pipelines.",
  avatarUrl: "/ShivamDixit.png",
  skills: {
    "Languages": [
      { name: "JavaScript", icon: (props: any) => <img src="/javascript.png" alt="JavaScript" className="size-4 object-contain rounded" {...props} /> },
      { name: "TypeScript", icon: Typescript },
      { name: "Python", icon: Python },
      { name: "Java", icon: Java },
      { name: "PostgreSQL", icon: Postgresql },
      { name: "MySQL", icon: (props: any) => <img src="/mysql_logo.png" alt="MySQL" className="size-4 object-contain rounded" {...props} /> },
      { name: "HTML5", icon: (props: any) => <img src="/html5_logo.png" alt="HTML5" className="size-4 object-contain rounded" {...props} /> },
      { name: "CSS3", icon: (props: any) => <img src="/css3_logo.png" alt="CSS3" className="size-4 object-contain rounded" {...props} /> }
    ],
    "Frontend": [
      { name: "React", icon: ReactLight },
      { name: "Next.js", icon: NextjsIconDark },
      { name: "Redux", icon: (props: any) => <img src="/redux_logo.png" alt="Redux" className="size-4 object-contain rounded" {...props} /> },
      { name: "Tailwind CSS", icon: Icons.tailwindcss },
      { name: "D3.js", icon: (props: any) => <img src="/d3_logo.png" alt="D3" className="size-4 object-contain rounded" {...props} /> },
      { name: "Single Page Apps (SPA)", icon: undefined },
      { name: "Server-Side Rendering (SSR)", icon: undefined }
    ],
    "Backend": [
      { name: "Node.js", icon: Nodejs },
      { name: "Express.js", icon: Nodejs },
      { name: "Django REST Framework", icon: (props: any) => <img src="/drf_logo.png" alt="DRF" className="size-4 object-contain rounded" {...props} /> },
      { name: "Celery", icon: Python },
      { name: "REST APIs", icon: (props: any) => <img src="/restapi_logo.png" alt="REST APIs" className="size-4 object-contain rounded" {...props} /> },
      { name: "WebSockets", icon: undefined },
      { name: "WebRTC / Agora", icon: (props: any) => <img src="/agora_logo.png" alt="Agora" className="size-4 object-contain rounded" {...props} /> },
      { name: "Socket.IO", icon: (props: any) => <img src="/socketio_logo.png" alt="Socket.IO" className="size-4 object-contain rounded" {...props} /> },
      { name: "JWT & Bcrypt", icon: (props: any) => <img src="/jwt_logo.png" alt="JWT" className="size-4 object-contain rounded" {...props} /> },
      { name: "API Rate Limiting", icon: undefined }
    ],
    "Databases & Caching": [
      { name: "PostgreSQL", icon: Postgresql },
      { name: "MySQL", icon: (props: any) => <img src="/mysql_logo.png" alt="MySQL" className="size-4 object-contain rounded" {...props} /> },
      { name: "MongoDB", icon: (props: any) => <img src="/mongodb_logo.png" alt="MongoDB" className="size-4 object-contain rounded" {...props} /> },
      { name: "Redis", icon: (props: any) => <img src="/redis_logo.png" alt="Redis" className="size-4 object-contain rounded" {...props} /> },
      // { name: "DynamoDB", icon: undefined },
      { name: "Elasticsearch", icon: (props: any) => <img src="/elasticsearch_logo.png" alt="Elasticsearch" className="size-4 object-contain rounded" {...props} /> },
      { name: "CDN Caching (CloudFront)", icon: (props: any) => <img src="/cloudfront_logo.png" alt="CloudFront" className="size-4 object-contain rounded" {...props} /> }
    ],
    "AI / ML": [
      { name: "OpenAI GPT APIs", icon: Icons.openai },
      { name: "RAG Pipelines", icon: RAG },
      { name: "AI Agents", icon: Icons.openai },
      { name: "OpenCV", icon: (props: any) => <img src="/opencv_logo.png" alt="OpenCV" className="size-4 object-contain rounded" {...props} /> },
      { name: "MediaPipe", icon: Python }
    ],
    "DevOps & Tools": [
      { name: "AWS (S3, CloudFront, SQS, EC2, RDS, IAM)", icon: (props: any) => <img src="/aws_logo.png" alt="AWS" className="size-4 object-contain rounded" {...props} /> },
      // { name: "AWS EKS", icon: Kubernetes },
      { name: "Docker", icon: Docker },
      { name: "N8N Automation", icon: (props: any) => <img src="/n8n_logo.png" alt="n8n" className="size-4 object-contain rounded" {...props} /> },
      { name: "Linux", icon: (props: any) => <img src="/linux_logo.png" alt="Linux" className="size-4 object-contain rounded" {...props} /> },
      { name: "Git", icon: Icons.github }
    ]
  },
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "dixitshivam249@gmail.com",
    tel: "+919720965985",
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
    },
  },
  work: [
    {
      company: "GeeksforGeeks",
      href: "https://www.geeksforgeeks.org",
      badges: ["DRF", "PostgreSQL", "Redis", "Elasticsearch", "Agora"],
      location: "Noida, India",
      title: "Software Development Engineer Intern",
      logoUrl: "/gfg_logo.png",
      start: "Nov 2025",
      end: "Present",
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
      badges: ["Next.js", "n8n", "OpenAI", "RAG", "Docker", "EC2"],
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
      badges: ["AWS EKS", "OpenCV", "MediaPipe", "Python", "API Rate Limiting"],
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
        {
          type: "Youtube",
          href: "https://youtube.com/playlist?list=PLuBu7ekp-O1V7VmWJNqKCarEVeIf9EATd&si=55wP2uUcC4ghg1o7",
          icon: <Icons.youtube className="size-3" />,
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
      ],
      image: "/sharing&caringCalc.png",
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
