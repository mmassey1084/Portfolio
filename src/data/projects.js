import { summary } from "framer-motion/client";

export const projectItems = [
  {
    projectId: "church-studio-app",
    title: "The Church Studio Mobile App",
    role: "Software Developer Intern",
    year: "2025",
    tags: ["React", "Node", "APIs", "Mobile"],
    summary: "Cross-platform visitor app with tours, content, and modern UI.",
    highlights: [
      "Built reusable UI components and navigation patterns for a smooth visitor experience.",
      "Integrated content and structured data so pages stay fast and easy to update.",
      "Focused on accessibility and responsive layouts across devices.",
    ],
    technologyStack: ["React", "JavaScript", "Node.js", "Express", "Firebase", "REST APIs"],
    links: [
      { label: "GitHub", url: "https://github.com/mmassey1084/The-Church-Studio-App" },
    ],
  },
  {
    projectId: "dreamy-esthetics",
    title: "Dreamy Esthetics Website",
    role: "Full-Stack / Front-End",
    year: "2025",
    tags: ["React", "UI", "SEO", "MySQL"],
    summary: "Modern esthetics site with polished components and SEO basics.",
    highlights: [
      "Created reusable sections, animations, and a clean layout system.",
      "Improved metadata and page structure for better crawlability.",
    ],
    technologyStack: ["React", "HTML/CSS", "JavaScript", "MySQL", "Node.js"],
    links: [
      { label: "Live Site", url: "http://dreamy-esthetics.s3-website-us-east-1.amazonaws.com/" },
    ],
  },
  {
    projectId: "luma-kitchen",
    title: "Luma Kitchen Website",
    role: "Full-Stack / Front-End",
    year: "2025",
    tags: ["React", "Vite", "HTML", "CSS", "Node.js", "Express"],
    summary: "A Full-stack restaurant template inspired by modern editorial restaurant sites, with real multi-page navigation, menu search, online ordering + reservation availability logic, gift cards, email signup, and social links.",
    highlights: [
      "Created reusable layout components and consistent UI sections to streamline page development.",
      "Implemented responsive design patterns to ensure a polished experience across desktop, tablet, and mobile devices.",
      "Improved site structure, metadata, and semantic HTML for stronger SEO and crawlability.",
      "Integrated dynamic menu and content rendering to simplify future updates."
    ],
    technologyStack:["React", "HTML/CSS", "JavaScript","Vite", "Node.js"],
    links: [
      {label: "GitHub", url:"https://github.com/mmassey1084/Luma-Kitchen"}
    ]
  },
  {
    projectId: "paws-and-forever",
    title: "Paws and Forever",
    role: "Full-Stack / Front-End",
    year: "2023",
    tags: ["HTML", "CSS", "Node.js", "Express","JavaScript"],
    summary: "A full-stack web application designed for an animal adoption center. It allows users to browse adoptable dogs, submit adoption requests, and add new dog profiles with images. The system also includes a live countdown, animations, and a responsive design.",
    highlights: [
      "Built a full-stack web application enabling users to browse adoptable dogs, submit adoption requests, and manage animal profiles.",
      "Designed and implemented a Node.js + Express backend to handle routing, database interactions, and image uploads.",
      "Integrated a MySQL database with structured schemas for dogs and adopters, supporting persistent data storage."
    ],
    technologyStack:[ "HTML/CSS", "JavaScript","Node.js", "MySQL"],
    links: [
      {label: "GitHub", url:"https://github.com/mmassey1084/Dynamic-Paws-and-Forever"}
    ]
  },
  {
    projectId: "book-catalog-application",
    title: "Book Catalog Application",
    role: "Full-Stack / Front-End",
    year: "2023",
    tags: ["HTML", "CSS", "Node.js", "Express","JavaScript"],
    summary: "A full-stack web application that allows users to add books to a catalog and search them by title or author.",
    highlights: [
      "Built RESTful API endpoints to handle book creation, retrieval, and database interactions.",
      "Designed a relational MySQL schema to store and query book records by title and author.",
      "Implemented live search functionality using the Fetch API with dynamic table rendering on the frontend."
    ],
    technologyStack:[ "HTML/CSS", "JavaScript","Node.js", "MySQL"],
    links: [
      {label: "GitHub", url:"https://github.com/mmassey1084/Book-Catalog-Application"}
    ]
  },
  {
    projectId: "car-dealership-application",
    title: "Car Dealership Application",
    role: "Full-Stack / Front-End",
    year: "2023",
    tags: ["HTML", "CSS", "Node.js", "Express","JavaScript"],
    summary: "A full-stack web application for managing a car dealership’s inventory, customer records, sales transactions, and monthly payment reports. It uses Node.js, Express, and MySQL for the backend and static HTML for the frontend.",
    highlights: [
      "Developed a full-stack web application to manage vehicle inventory, customer records, and sales transactions for a car dealership.",
      "Built a Node.js and Express backend with RESTful API endpoints to handle CRUD operations and business logic.",
      "Designed and integrated a MySQL database schema supporting cars, customers, sales, and payment records.",
      "Implemented static HTML forms for adding inventory, registering customers, and processing vehicle sales.",
      "Created a monthly payment reporting feature that aggregates expected revenue and payments made, displayed in a structured table format."
    ],
    technologyStack:[ "HTML/CSS", "JavaScript","Node.js", "MySQL"],
    links: [
      {label: "GitHub", url:"https://github.com/mmassey1084/Car-Dealership-Application"}
    ]
  },
  {
    projectId: "housing-mlops-deployment",
    title: "Housing Deployment- MLOps Workflow",
    role: "Machine Learning Engineer",
    year: "2024",
    tags: ["Python", "Scikit-learn", "Linear Regression", "Machine Learning"],
    summary: "A simple MLOps workflow for predicting housing prices based on features like area and bedrooms. The model is trained using linear regression and deployed using a lightweight Gradio web app.",
    highlights: [
      "Built an end-to-end machine learning workflow to predict housing prices using linear regression.",
      "Trained and evaluated a regression model using Python, pandas, and scikit-learn.",
      "Implemented a training pipeline that serializes the model using joblib for reuse and deployment.",
      "Developed a lightweight Gradio web application to serve real-time housing price predictions."
    ],
    technologyStack:["Python", "Scikit-learn", "Linear Regression", "Machine Learning"],
    links: [
      {label: "GitHub", url:"https://github.com/mmassey1084/housing-mlops-deployment"}
    ]
  }
];
