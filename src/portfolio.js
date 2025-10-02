// src/portfolio.js
import emoji from "react-easy-emoji";

/** ===== Diccionario bilingüe ===== */
const content = {
  en: {
    nav: {
      skills: "Skills",
      projects: "Projects",
      certs: "Certifications",
      blogs: "Blogs",
      
    },
    ui: {
      whatIDo: "What I Do",
      certificationsTitle: "Certifications",
      certificationsSubtitle: "Degrees, diplomas & professional credentials",
      projectsTitleA: "Projects in Development",
      projectsTitleB: "Real projects from real businesses",
      moreProjects: "More Projects",
    },

    // Greeting / Hero
    greeting: {
      username: "Luis Emilio Rojas Rojas",
      greetingText: "Hi all, I'm ",
      greetingName: "Luis",
      subTitle: emoji(
        "Full-Stack Software Developer | Business Administrator | Specialist in Occupational Health & Safety (OHS) | Video Editor | Professional Drone Pilot"
      ),
      resumeLink:
        "https://drive.google.com/file/d/16KOJpFXgMhibKc7grFxfytRfSmcaQaFT/view?usp=drive_link",
    },

    // Social Media
    socialMediaLinks: {
      github: "https://github.com/lerfast",
      linkedin: "https://www.linkedin.com/in/luisemiliorojas/",
      gmail: "luisemiliorojas@oshlix.com",
      whatsapp: "https://wa.me/573187757620",
      youtube: "https://www.youtube.com/@rojastech1",
    },

    // Skills
    skillsSection: {
      title: "What I Do",
      subTitle:
        "I am a Full-Stack Developer with a background in business administration and Occupational Health & Safety (OHS). I build high-impact solutions that boost productivity, safety, and user experience.",
      skills: [
        emoji("⚡ Full-Stack Development (React, Ruby on Rails, Node.js, PostgreSQL)"),
        emoji("⚡ Business Administration & Project Management"),
        emoji("⚡ OHS consulting and safety-by-design thinking"),
        emoji("⚡ Video editing & color (DaVinci Resolve)"),
        emoji("⚡ Aerial cinematography — professional drone pilot"),
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
        { skillName: "DaVinci Resolve", fontAwesomeClassname: "fas fa-film", id: "davinci" },
        { skillName: "YouTube", fontAwesomeClassname: "fab fa-youtube", id: "youtube" },
        { skillName: "Drone", fontAwesomeClassname: "fas fa-helicopter", id: "drone" },
      ],
    },

    // Certifications
    certifications: {
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
          certificate_link:
            "https://www.credential.net/f7e1f4f8-726a-4501-a0ad-09d2d8923cf7#acc.fovmP9Dz",
          alt_name: "Microverse",
          color_code: "#DDEFE6",
        },
      ],
    },

    // Open Source
    openSource: {
      githubConvertedToken: process.env.REACT_APP_GITHUB_TOKEN,
      githubUserName: "lerfast",
      showGithubProfile: "true",
      display: true,
    },

    // Blogs
    blogSection: {
      title: "Blogs",
      subtitle: "I love writing about software development and technology.",
      blogs: [
        {
          url: "https://medium.com/@luisemiliorojas/how-overcoming-challenges-in-software-development-can-lead-to-personal-growth-b288352210dd",
          title:
            "Embracing Challenges in Software Development: A Journey of Growth and Resilience",
          description:
            "Embracing challenges in software development highlights how overcoming obstacles fosters resilience, leadership, and growth. Through a personal experience, the author emphasizes the value of challenges as opportunities for continuous improvement.",
        },
      ],
      display: true,
    },

    // Contact
    contactInfo: {
      subtitle: "Let's connect! Feel free to reach out.",
      email_address: "luisemiliorojas@oshlix.com",
    },

    // Cycling / Video
    cyclingSection: {
      title: "YouTube, Video & Drone",
      image: "YOUR_CYCLING_IMAGE_URL",
      videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    },

    // Commitment / OHS
    commitmentSection: {
      title: "Protecting Lives",
      subTitle: "Occupational Health & Safety Specialist",
      description:
        "My commitment goes beyond coding. As an OHS specialist, I'm dedicated to safeguarding workplaces, ensuring every process is safe, and prioritizing human well-being in everything we do. Let's build technology that not only changes business, but also helps save lives.",
      droneTitle: "Aerial Perspective",
      droneDescription:
        "Aerial operations have also shaped how I build products and solve problems. As a professional drone pilot, flying has taught me to read environments from above, anticipate risks, and appreciate patterns at scale. That perspective helps me design safer systems, plan better workflows, and bring cinematic clarity to storytelling through video.",
    },
  },

  es: {
    nav: {
      skills: "Habilidades",
      projects: "Proyectos",
      certs: "Certificaciones",
      blogs: "Blogs",
      
    },
    ui: {
      whatIDo: "Lo que hago",
      certificationsTitle: "Certificaciones",
      certificationsSubtitle: "Títulos, diplomas y credenciales profesionales",
      projectsTitleA: "Proyectos en desarrollo",
      projectsTitleB: "Proyectos reales para negocios reales",
      moreProjects: "Más proyectos",
    },

    greeting: {
      username: "Luis Emilio Rojas Rojas",
      greetingText: "Hola a todos, soy ",
      greetingName: "Luis",
      subTitle: emoji(
        "Desarrollador Full-Stack | Administrador de Empresas | Especialista en Seguridad y Salud en el Trabajo (SST) | Editor de video | Piloto profesional de drones"
      ),
      resumeLink:
        "https://drive.google.com/file/d/16KOJpFXgMhibKc7grFxfytRfSmcaQaFT/view?usp=drive_link",
    },

    socialMediaLinks: {
      github: "https://github.com/lerfast",
      linkedin: "https://www.linkedin.com/in/luisemiliorojas/",
      gmail: "luisemiliorojas@oshlix.com",
      whatsapp: "https://wa.me/573187757620",
      youtube: "https://www.youtube.com/@rojastech1",
    },

    skillsSection: {
      title: "Lo que hago",
      subTitle:
        "Soy Desarrollador Full-Stack con base en administración de empresas y Seguridad y Salud en el Trabajo (SST). Creo soluciones de alto impacto que potencian productividad, seguridad y experiencia de usuario.",
      skills: [
        emoji("⚡ Desarrollo Full-Stack (React, Ruby on Rails, Node.js, PostgreSQL)"),
        emoji("⚡ Administración y gestión de proyectos"),
        emoji("⚡ Consultoría en SST y diseño seguro"),
        emoji("⚡ Edición y color de video (DaVinci Resolve)"),
        emoji("⚡ Cinematografía aérea — piloto profesional de drones"),
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
        { skillName: "DaVinci Resolve", fontAwesomeClassname: "fas fa-film", id: "davinci" },
        { skillName: "YouTube", fontAwesomeClassname: "fab fa-youtube", id: "youtube" },
        { skillName: "Drone", fontAwesomeClassname: "fas fa-helicopter", id: "drone" },
      ],
    },

    certifications: {
      certifications: [
        {
          title: "Administrador de Empresas",
          subtitle: "Universidad San Martín, Bogotá-Colombia",
          logo_path: "sanmartin.png",
          certificate_link: "https://sanmartin.edu.co/",
          alt_name: "sanmartin",
          color_code: "#F6EAEA",
        },
        {
          title: "Maestría en Gestión de Seguridad y Salud en el Trabajo",
          subtitle: "Universidad del Rosario, Bogotá-Colombia",
          logo_path: "urosario.png",
          certificate_link: "https://urosario.edu.co/",
          alt_name: "urosario",
          color_code: "#F0FFDD",
        },
        {
          title: "Desarrollo Web Full-Stack",
          subtitle: "Microverse",
          logo_path: "microverse.png",
          certificate_link:
            "https://www.credential.net/f7e1f4f8-726a-4501-a0ad-09d2d8923cf7#acc.fovmP9Dz",
          alt_name: "Microverse",
          color_code: "#DDEFE6",
        },
      ],
    },

    openSource: {
      githubConvertedToken: process.env.REACT_APP_GITHUB_TOKEN,
      githubUserName: "lerfast",
      showGithubProfile: "true",
      display: true,
    },

    blogSection: {
      title: "Blogs",
      subtitle: "Me encanta escribir sobre desarrollo de software y tecnología.",
      blogs: [
        {
          url: "https://medium.com/@luisemiliorojas/how-overcoming-challenges-in-software-development-can-lead-to-personal-growth-b288352210dd",
          title:
            "Abrazar los retos en desarrollo de software: un camino de crecimiento y resiliencia",
          description:
            "Cómo superar obstáculos fomenta resiliencia, liderazgo y crecimiento. A partir de una experiencia personal, se destaca el valor de los retos como oportunidades de mejora continua.",
        },
      ],
      display: true,
    },

    contactInfo: {
      subtitle: "¡Conectemos! Escríbeme con confianza.",
      email_address: "luisemiliorojas@oshlix.com",
    },

    cyclingSection: {
      title: "YouTube, Video y Drones",
      image: "YOUR_CYCLING_IMAGE_URL",
      videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    },

    commitmentSection: {
      title: "Protegiendo Vidas",
      subTitle: "Especialista en Seguridad y Salud en el Trabajo",
      description:
        "Mi compromiso va más allá del código. Como especialista en SST, trabajo por resguardar los lugares de trabajo, asegurar que cada proceso sea seguro y priorizar el bienestar humano en todo lo que hacemos. Construyamos tecnología que no solo transforme los negocios, sino que también ayude a salvar vidas.",
      droneTitle: "Perspectiva Aérea",
      droneDescription:
        "Las operaciones aéreas también moldearon cómo construyo productos y soluciono problemas. Como piloto profesional de drones, volar me enseñó a leer el entorno desde arriba, anticipar riesgos y apreciar los patrones a escala. Esa perspectiva me ayuda a diseñar sistemas más seguros, planear mejores flujos de trabajo y aportar claridad cinematográfica al storytelling en video.",
    },
  },
};

/** Helper para obtener el “pack” según idioma */
export const getContent = (lang = "en") => content[lang];

/** Exports por compatibilidad (EN por defecto) */
export const {
  greeting,
  socialMediaLinks,
  skillsSection,
  openSource,
  blogSection,
  contactInfo,
  certifications,
  cyclingSection,
  commitmentSection,
} = content.en;
