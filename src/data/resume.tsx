import { Icons } from "@/components/icons";
import { FileText, HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Shivam Dixit",
  initials: "SD",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shivamdixit.cv",
  location: "Noida, Uttar Pradesh",
  locationLink: "https://www.google.com/maps/place/Noida,+Uttar+Pradesh",
  description:
    "AI Software Engineer specializing in building scalable applications, distributed systems, and AI solutions.",
  summary:
    "Software Engineer specializing in backend engineering, system design, and distributed systems. Demonstrated track record of building scalable high-traffic applications, most notably at GeeksforGeeks serving 20M+ users with optimized REST APIs, microservices, and Docker containerization. Experienced in real-time communications, caching strategies, and Applied-AI integration.",
  avatarUrl: "/ShivamDixit.png",
  skills: {
    "Languages": [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "Java" },
    ],
    "Frontend": [
      { name: "Electron.js" },
      { name: "Next.js" },
      { name: "React.js" },
      { name: "Redux" },
      { name: "RTK" },
      { name: "Tailwind CSS" },
    ],
    "Backend": [
      { name: "FastAPI" },
      { name: "Django REST Framework" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Celery" },
      { name: "LiveKit" },
      { name: "Temporal" },
    ],
    "Databases & Caching": [
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "Elasticsearch" },
      { name: "CDN" },
    ],
    "DevOps & Tools": [
      { name: "AWS (S3, Lambda, SQS, EC2, IAM, RDS)" },
      { name: "Linux" },
      { name: "Git" },
      { name: "Bitbucket" },
      { name: "Github" },
      { name: "N8N" },
      { name: "CloudFlare" },
    ],
  },
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/resume", icon: FileText, label: "Resume" },
  ],
  contact: {
    email: "dixitshivam249@gmail.com",
    tel: "+919720965985",
    resumeLocation:
      "https://docs.google.com/document/d/e/2PACX-1vSyIoyDM6z-uyF_ziqazySlPgZsldO6xohOILhT8TMuBepIm1ZhaJqIznDPinduGI1SigSV3YihSjLN/pub",
    resumeUrl:
      "https://docs.google.com/document/d/e/2PACX-1vSyIoyDM6z-uyF_ziqazySlPgZsldO6xohOILhT8TMuBepIm1ZhaJqIznDPinduGI1SigSV3YihSjLN/pub",
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
        url: "https://leetcode.com/u/goingtofar/",
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
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@shivdix",
        icon: Icons.youtube,
        navbar: true,
      }

    },
  },
  work: [
    {
      company: "Surepass",
      href: "https://surepass.io/",
      badges: ["FastAPI", "PostgreSQL", "Redis", "Vue.js", "Temporal", "MinIO", "VueFlow"],
      location: "Delhi, India",
      title: "Software Engineer",
      logoUrl: "/surepass_logo.png",
      start: "Jun 2026",
      end: "Aug 2026",
      description: [
        "Contributed to SureVoice, an AI-powered voice calling agent using STT, TTS, LiveKit and conversational AI.",
        "Benchmarked models from Deepgram, Gnani, Cartesia, and ElevenLabs to identify suitable STT/TTS models.",
        "Worked with Temporal for workflow orchestration and MinIO for audio, transcript and assets storage.",
        "Developed a Node-based interactive workflow creation interface for call journeys and flows using Vue Flow.",
      ],
    },
    {
      company: "GeeksforGeeks",
      href: "https://www.geeksforgeeks.org",
      badges: ["Django REST Framework", "PostgreSQL", "Redis", "Elasticsearch", "Docker", "WebSockets", "WebRTC", "Amazon IVS", "CDN", "Celery"],
      location: "Noida, India",
      title: "Software Development Engineer Intern",
      logoUrl: "/gfg_logo.png",
      start: "Nov 2025",
      end: "Jun 2026",
      description: [
        "Architected and deployed high-scale REST APIs across distributed systems using Django, PostgreSQL, and Docker containerization.",
        "Designed and integrated Elasticsearch infrastructure for GfG Connect, optimizing scalability and boosting search performance by 40% for 20M+ users.",
        "Developed one-to-one real-time video/audio communication systems using WebSockets/WebRTC (Agora).",
        "Worked with Amazon IVS to develop an in-house real-time classroom platform, reducing Zoom dependency.",
        "Developed an article pipeline for article evaluation, providing automated review, error detection, improvement recommendations, and a quality-based reward and penalty scoring system.",
        "Implemented CDN caching with soft purge for GfG articles, reducing backend requests by an estimated 32%+.",
        "Revamped geeksforgeeks.org/jobs into an SPA with SSR on initial render, resulting in a 28%+ performance gain.",
        "Applied key system design principles using Redis and Celery (SQS Broker) to manage async task queues, drastically lowering backend latency.",
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
        "Improved overall system performance and SEO by 73%, migrating architecture to SSR based frontend Next.js.",
        "Developed an enterprise-level application (ERS) from scratch to deployment, handling 2600+ users daily.",
        "Automated customer reach-out and remediation, driving 18% growth in recurring customers across 6 outlets.",
        "Deployed an in-house open-source n8n server and automated 12 services and workflows for client and company.",
      ],
    },
    {
      company: "Ritual Guru",
      href: "#",
      badges: ["AWS EKS", "OpenCV", "MediaPipe", "Python", "API Rate Limiting", "React Native"],
      location: "Vrindavan, India",
      title: "Full Stack Developer Intern",
      logoUrl: "/ritualguru_logo.png",
      start: "Feb 2025",
      end: "Apr 2025",
      description: [
        "Implemented rate limiting, resulting in a 30% reduction in API calls, improving backend efficiency.",
        "Developed 30+ React Native screens for the PoojaHarGhar mobile application.",
        "Worked with OpenCV and MediaPipe to develop a Python module for Palmy, a palmistry software.",
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
      title: "Rent on Cent",
      href: "https://rentoncent.bond",
      dates: "Sep 2026",
      active: true,
      description:
        "Rent on Cent Is a P2P 2 Wheeler renting website on first phase which is current phase we are running it around Vrindavan and Mathura for best customer service",
      technologies: ["JavaScript", "Astro.js", "CloudFlare", "Tailwind CSS", "Node.js", 'Telegram bot', 'Kotlin'],
      links: [
        {
          type: "Website",
          href: "https://rentoncent.bond",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/civdix/rentmeyoubike",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/rentocent.png",
      video: "",
    },
    {
      title: "Aktu Result",
      href: "https://akturesult.bond",
      dates: "Sep 2026",
      active: true,
      description:
        "This website serves the AKTU result without dob service to user so Student can check there Result without entering there DOB, also there is a Roll number finder service with retrieving roll number of studnent from all across the student of AKTU with only the help of name and some basic details like college and year .",
      technologies: ["JavaScript", "Astro.js", "CloudFlare", "Tailwind CSS", "Node.js", 'Telegram bot', 'Kotlin'],
      links: [
        {
          type: "Website",
          href: "https://akturesult.bond",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/civdix/aktu-result",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/akturesultbond.png",
      video: "https://www.youtube.com/watch?v=RG9ewV1w9lA",
    },
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
      title: "Solved 470+ DSA Questions",
      dates: "2024 - Present",
      location: "LeetCode & GeeksforGeeks",
      description: "Solved 470+ data structures and algorithms questions on competitive programming platforms.",
      image: "",
      links: [
        {
          title: "LeetCode",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://leetcode.com/u/goingtofar/",
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

export type ResumeData = typeof DATA;
