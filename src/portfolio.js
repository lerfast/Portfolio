// src/portfolio.js
import emoji from "react-easy-emoji";

// Resumen y saludo principal
const greeting = {
  username: "Luis Emilio Rojas Rojas",
  greetingText: "Hi all, I'm ",
  greetingName: "Luis",
  subTitle: emoji("Full-Stack Software Developer | Business Administrator | Specialist in Occupational Health and Security (OHS)"),
  resumeLink: "https://drive.google.com/file/d/16KOJpFXgMhibKc7grFxfytRfSmcaQaFT/view?usp=drive_link",
};

// Redes sociales
const socialMediaLinks = {
  github: "https://github.com/lerfast",
  linkedin: "https://www.linkedin.com/in/luisemiliorojas/",
  email: "luisemiliorojas@hotmail.com",
  whatsapp: "https://wa.me/573187757620",
};

// Sección de habilidades
const skillsSection = {
  title: "What I Do",
  subTitle:
  "I am a Full-Stack Developer with a background in business administration and occupational health & safety (OHS). I build high-impact solutions that boost productivity and workplace well-being. I work with the following technologies:",
    
  skills: [
    emoji("⚡ Full-Stack Development (React, Ruby on Rails, Node.js, PostgreSQL)"),
    emoji("⚡ Business Administration & Project Management"),
    emoji("⚡ Occupational Health & Safety Consulting"),
  ],
  softwareSkills: [
    { skillName: "HTML5", fontAwesomeClassname: "fab fa-html5", id: "html-5" },
    { skillName: "CSS3", fontAwesomeClassname: "fab fa-css3-alt", id: "css3" },
    { skillName: "JavaScript", fontAwesomeClassname: "fab fa-js", id: "js" },
    { skillName: "React", fontAwesomeClassname: "fab fa-react", id: "reactjs" },
    { skillName: "Node.js", fontAwesomeClassname: "fab fa-node", id: "nodejs" },
    { skillName: "Ruby", fontAwesomeClassname: "fas fa-gem", id: "ruby" },
    { skillName: "Ruby on Rails", fontAwesomeClassname: "fas fa-train", id: "rails" },
    { skillName: "PostgreSQL", fontAwesomeClassname: "fas fa-database", id: "postgres" },
    { skillName: "WordPress", fontAwesomeClassname: "fab fa-wordpress", id: "wordpress" },
    { skillName: "Spree Commerce", fontAwesomeClassname: "fas fa-shopping-cart", id: "spree" },
   
    { skillName: "Python", fontAwesomeClassname: "fab fa-python", id: "python" },
    
    { skillName: "TensorFlow", fontAwesomeClassname: "fas fa-brain", id: "tensorflow" },
  ],
};


// Sección de certificaciones
const certifications = {
  certifications: [
    {
      title: "Bachelor in Business Administration",
      subtitle: "San Martin University, Bogotá-Colombia",
      logo_path: "sanmartin.png",
      certificate_link: "https://sanmartin.edu.co/",
      alt_name: "sanmartin",
      color_code: "#F6EAEA",
    },
    {
      title: "Master Degree in Occupational Health and Safety Management",
      subtitle: "Universidad del Rosario, Bogotá-Colombia",
      logo_path: "urosario.png",
      certificate_link: "https://urosario.edu.co/",
      alt_name: "urosario",
      color_code: "#F0FFDD",
    },
    {
      title: "Full Stack Web Development",
      subtitle: "Microverse",
      logo_path: "microverse.png",
      certificate_link: "https://www.credential.net/f7e1f4f8-726a-4501-a0ad-09d2d8923cf7#acc.fovmP9Dz",
      alt_name: "Microverse",
      color_code: "#DDEFE6",
    },
  ],
};

// Sección para open source (GitHub)
const openSource = {
  githubConvertedToken: process.env.REACT_APP_GITHUB_TOKEN,
  githubUserName: "lerfast",
  showGithubProfile: "true",
  display: true,
};

// Sección de blogs
const blogSection = {
  title: "Blogs",
  subtitle: "I love writing about software development and technology.",
  blogs: [
    {
      url: "https://medium.com/@luisemiliorojas/how-overcoming-challenges-in-software-development-can-lead-to-personal-growth-b288352210dd",
      title: "Embracing Challenges in Software Development: A Journey of Growth and Resilience",
      description: "Embracing Challenges in Software Development highlights how overcoming obstacles fosters resilience, leadership, and growth. Through a personal experience, the author emphasizes the value of challenges as opportunities for continuous improvement.",
    },
  ],
  display: true,
};

// Sección de contacto
const contactInfo = {
  subtitle: "Let's connect! Feel free to reach out.",
  email_address: "luisemiliorojas@hotmail.com",
};

// Sección de ciclismo (Cycling)
const cyclingSection = {
  title: "Passion for MTB",
  
  image: "YOUR_CYCLING_IMAGE_URL",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID", 
};


// NUEVA SECCIÓN: "commitmentSection"
// Aquí describes tu compromiso como Especialista en Salud y Seguridad en el Trabajo
const commitmentSection = {
  title: "Protecting Lives",
  subTitle: "Occupational Health & Safety Specialist",
  description: `My commitment goes beyond coding. As an OHS specialist, 
    I'm dedicated to safeguarding workplaces, ensuring every 
    process is safe, and prioritizing human well-being in everything we do.
    Let's build technology that not only changes business,
    but also helps save lives.`,
  // Ajusta si deseas usar una Lottie
  lottiePath: "src/assets/lotties/ohs.json" 
};

export {
  greeting,
  socialMediaLinks,
  skillsSection,
  openSource,
  blogSection,
  contactInfo,
  certifications,
  cyclingSection,
  commitmentSection // <-- Exportamos la nueva sección
};
