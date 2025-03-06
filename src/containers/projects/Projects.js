// src/containers/projects/Projects.js
import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./Project.css";
import Button from "../../components/button/Button";
import { socialMediaLinks } from "../../portfolio";
import StyleContext from "../../contexts/styleContext";

// Import images for your real-world projects
import arepasImage from "../../assets/projectImages/arepas.png";
import coffeeImage from "../../assets/projectImages/coffee.png";
import budgetImage from "../../assets/projectImages/budget.png";

// Import the CHASHH logo
import chashhLogo from "../../assets/images/chashh_logo.png";

const Projects = () => {
  const { isDark } = useContext(StyleContext);

  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="projects-main" id="projects">
        <h1
          className={
            isDark
              ? "dark-mode heading projects-title"
              : "heading projects-title", "project-title"
          }
        >
          Projects in Development
        </h1>

        {/* CHASHH Intro Container (paragraph on left, clickable logo on right) */}
        <div className="chashh-intro-container">
          {/* Left side: CHASHH Paragraph */}
          <div className="chashh-text">
            <p className={isDark ? "dark-mode projects-text" : "projects-text"}>
              I am currently developing an innovative platform called{" "}
              <strong>CHASHH</strong> to revolutionize workplace safety by 
              combining advanced technology with real-time data and predictive 
              analytics. CHASHH aims to standardize how organizations identify 
              and prevent hazards, providing actionable insights to protect 
              employees and ensure compliance with critical regulations. By 
              harnessing <strong>React</strong> for the frontend,{" "}
              <strong>Ruby on Rails</strong> for the backend, and{" "}
              <strong>Python</strong> with <strong>TensorFlow</strong> for 
              AI-driven risk analysis, <strong>CHASHH</strong> detects potential 
              issues before they escalate, seamlessly integrates with existing 
              systems, and fosters a culture of proactive risk management. From 
              predictive risk analysis and personalized prevention strategies to 
              continuous monitoring and education, <strong>CHASHH</strong>{" "}
              delivers a streamlined approach to safeguarding workers across 
              diverse industries. <strong>For more information about this project, please 
              click on the CHASHH logo.</strong>
            </p>
          </div>

          {/* Right side: Clickable CHASHH logo */}


          <Fade right duration={1200}>
          <div className="chashh-logo">
            <a
              href="https://lerfast.github.io/chashh-landing-page/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={chashhLogo}
                alt="CHASHH Logo"
                className="chashh-logo-image"
              />
            </a>
          </div>
        </Fade>
        </div>
        <Fade bottom duration={1200} distance="40px">
        
        <h1
          className={
            isDark
              ? "dark-mode heading projects-title"
              : "heading projects-title", "project-title"
          }
        >
          Real projects from real businesses
        </h1>

        </Fade>
        <Fade bottom duration={1200} distance="40px">


        {/* Real-world projects */}
        <div className="repo-cards-div-main">
          {/* Project 1: Arepas y Más */}
          <div className="project-card">
            <img
              src={arepasImage}
              alt="Arepas y Más"
              className="project-image"
            />
            <h2>Arepas y Más</h2>
            <p>
              A real business located in Miami Florida, with many satisfied customers, thanks to this app.
              Built 100% in <strong>React</strong>, it provides a basic 
              e-commerce functionality to order arepas. When checking out, it 
              sends an email to the company with the request.
            </p>
            <a
              href="https://lerfast.github.io/arepas-mas-corp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Site
            </a>
          </div>

          {/* Project 2: Coffee Shop Landing */}
          <div className="project-card">
            <img
              src={coffeeImage}
              alt="Coffee Shop Landing Page"
              className="project-image"
            />
            <h2>Cata Café Landing Page</h2>
            <p>
              A React landing page for a café in Neiva, Huila-Colombia. 
              Customers scan a QR code at their table, leading them to this 
              page with a welcome message and a button to see the menu.
            </p>
            <a href="https://lerfast.github.io/cata-cafe/" target="_blank" rel="noopener noreferrer">
              View Site
            </a>
          </div>

          {/* Project 3: Personal Budget App */}
          <div className="project-card">
            <img
              src={budgetImage}
              alt="Personal Budget App"
              className="project-image"
            />
            <h2>Personal Budget App</h2>
            <p>
              A basic application for managing personal expenses and tracking 
              budgets. This was one of my milestone projects at Microverse, 
              built 100% with <strong>Ruby on Rails</strong>.
            </p>
            <a href="https://github.com/lerfast/Module5-Capstone-budget-app?tab=readme-ov-file" target="_blank" rel="noopener noreferrer">
              View Source Code of the Project 
            </a><br></br>
            <a href="https://www.loom.com/share/3223814f988341dcabf9407e5000beb0" target="_blank" rel="noopener noreferrer">
              View Video Project 
            </a>
            
          </div>
        </div>
        </Fade>
        {/* Optional "More Projects" button */}
        <Fade bottom duration={1200} distance="40px">
        <Button
          text="More Projects"
          className="project-button"
          href={socialMediaLinks.github}
          newTab={true}
        />
        </Fade>
      </div>
    </Fade>
  );
};

export default Projects;
