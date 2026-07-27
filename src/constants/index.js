import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";
import project5 from "../assets/projects/project-5.png";
import project6 from "../assets/projects/project-6.png";
import project7 from "../assets/projects/project-7.jpg";

export const HERO_CONTENT = `I build modern, scalable, and intelligent web applications by combining clean UI design with robust backend development and AI-powered solutions. Passionate about creating responsive, user-centric experiences, I enjoy transforming complex business requirements into elegant, high-performance applications. I continuously explore emerging technologies including Artificial Intelligence, Retrieval-Augmented Generation (RAG), Cybersecurity, and Cloud Computing while contributing to innovative, technology-driven products. `;

export const ABOUT_TEXT = `I am a Computer Science graduate currently pursuing my M.Tech in Computer Science and Engineering at Amrita Vishwa Vidyapeetham, Bengaluru. I specialize in developing responsive web applications using React, Spring Boot, Java, and Python, while expanding my expertise in Artificial Intelligence and Machine Learning.

My interests extend beyond front-end development into building complete full-stack applications, AI-powered systems, Retrieval-Augmented Generation (RAG), cybersecurity dashboards, and intelligent healthcare solutions.

I enjoy solving real-world problems through software engineering and continuously strive to learn new technologies, write clean code, and build scalable applications that deliver exceptional user experiences.`;

export const EXPERIENCES = [
  {
    year: "2023 - Present",
    role: "Senior Full Stack Developer",
    company: "Google Inc.",
    description: `Led a team in developing and maintaining web applications using JavaScript, React.js, and Node.js. Implemented RESTful APIs and integrated with MongoDB databases. Collaborated with stakeholders to define project requirements and timelines.`,
    technologies: ["Javascript", "React.js", "Next.js", "mongoDB"],
  },
  {
    year: "2022 - 2023",
    role: "Frontend Developer",
    company: "Adobe",
    description: `Designed and developed user interfaces for web applications using Next.js and React. Worked closely with backend developers to integrate frontend components with Node.js APIs. Implemented responsive designs and optimized frontend performance.`,
    technologies: ["HTML", "CSS", "Vue.js", "mySQL"],
  },
  {
    year: "2021 - 2022",
    role: "Full Stack Developer",
    company: "Facebook",
    description: `Developed and maintained web applications using JavaScript, React.js, and Node.js. Designed and implemented RESTful APIs for data communication. Collaborated with cross-functional teams to deliver high-quality software products on schedule.`,
    technologies: ["Python", "Svelte", "Three.js", "Postgres"],
  },
  {
    year: "2020 - 2021",
    role: "Software Engineer",
    company: "Paypal",
    description: `Contributed to the development of web applications using JavaScript, React.js, and Node.js. Managed databases and implemented data storage solutions using MongoDB. Worked closely with product managers to prioritize features and enhancements.`,
    technologies: ["Ruby", "Rails", "PHP", "Sqlite"],
  },
];

export const EDUCATION = [
  {
    year: "2025 - 2027",
    studiedAt: "Amrita Vishwavidyapeetham, Bengaluru, Karnataka",
    qualification: `Master of Technology,Computer Science and Engineering`,
    cgpa: `8.1 CGPA`,
  },
  {
    year: "2020 - 2024",
    studiedAt: "KL University,Vaddeswaram,Vijayawada,Andhra Pradesh",
    qualification: `Bachelor of Technology,Computer Science and Engineering`,
    cgpa: `8.92 CGPA`,
  },
  {
    year: "2018 - 2020",
    studiedAt: "SREE CHAITANYA JUNIOR COLLEGE,Kavali,Andhra Pradesh",
    qualification: `Higher Secondary School`,
    cgpa: `9.57 CGPA`,
  },
  {
    year: "2018",
    studiedAt: "SRI CHAITANYA E.M SCHOOL,Kavali,Andhra Pradesh",
    qualification: `Secondary School`,
   cgpa:`10.00 CGPA`,
  },
];

export const PROJECTS = [
  {
    title: "E-Commerce Website",
    image: project1,
    description:
      "A fully functional e-commerce website with features like product listing, shopping cart, and user authentication.",
    technologies: ["HTML", "CSS", "React.js", "Email.js","Redux"],
    demo: "https://sudarsan2003.github.io/BuyIt/",
  },
  {
    title: "Food Delivey App",
    image: project2,
    description:
      "An application for ordering food in online and get them delivered to you from nearby restaurants",
    technologies: ["HTML", "CSS", "React.js", "Redux"],
    demo:"",
  },
  {
    title: "Portfolio Website",
    image: project3,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["HTML", "CSS", "React.js", "Tailwind"],
    demo:"",
  },
  {
    title: "Movie Search Engine",
    image: project4,
    description:
      "A platform for searching a movie ",
    technologies: ["HTML", "CSS", "React.js", "Tailwind"],
    demo:"https://sudarsan2003.github.io/MFlix/",
  },
  {
    title: "LearnMate – AI-Powered RAG Learning Assistant",
    image: project5,
    description:
      "An AI-powered Retrieval-Augmented Generation (RAG) platform that provides accurate, context-aware answers from uploaded PDFs, DOCX, and study materials by chunking, embedding, and semantically retrieving the most relevant sections before generating grounded responses — reducing hallucinations compared to relying on a language model alone.",
    technologies: ["React", "FastAPI", "Spring Boot", "PostgreSQL", "pgvector/Chroma", "LangChain", "Docker", "JWT"],
    demo: "",
  },
  {
    title: "CyberDefense – Intelligent Cybersecurity Monitoring Platform",
    image: project6,
    description:
      "A cybersecurity monitoring and analytics platform that aggregates security events, analyzes logs, visualizes potential threats, and delivers AI-assisted insights through a real-time dashboard, helping security teams spot suspicious activity and respond faster.",
    technologies: ["React", "Spring Boot", "Python", "PostgreSQL", "JWT", "Chart.js", "Docker"],
    demo: "",
  },
  {
    title: "AI-Based Cardiomegaly Detection using Deep Learning",
    image: project7,
    description:
      "A medical imaging application that uses a convolutional neural network to classify chest X-rays as Normal or Cardiomegaly, with Grad-CAM explainability visualizations and an AI module that generates simplified medical explanations for healthcare professionals and students.",
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Grad-CAM", "Flutter", "Firebase", "Scikit-learn"],
    demo: "",
  },
];

export const TECHNOLOGIES = [
  {
    category: "Frontend",
    accent: "#22d3ee", // cyan-400
    items: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React.js",
      "Redux",
      "Tailwind CSS",
      "Material UI",
      "Bootstrap",
    ],
  },
  {
    category: "Backend",
    accent: "#facc15", // yellow-400
    items: ["Java", "Spring Boot", "Python", "FastAPI", "Flask", "REST APIs"],
  },
  {
    category: "Databases",
    accent: "#a78bfa", // violet-400
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "pgvector", "ChromaDB"],
  },
  {
    category: "AI & Machine Learning",
    accent: "#fb7185", // rose-400
    items: [
      "TensorFlow",
      "Keras",
      "Scikit-Learn",
      "LangChain",
      "OpenCV",
      "Grad-CAM",
      "NLP",
    ],
  },
  {
    category: "Cloud & DevOps",
    accent: "#34d399", // emerald-400
    items: ["Docker", "Git", "GitHub", "JWT Authentication", "Firebase"],
  },
];

export const CONTACT = {
  address: "Sarjapur Road, Bengaluru, Karnataka, India",
  phoneNo: "+91 8341504695 ",
  email: "annalurusudarsan@gmail.com",
};