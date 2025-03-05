// src/containers/projects/Projects.js
import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./Project.css";
import Button from "../../components/button/Button";
import { socialMediaLinks } from "../../portfolio";
import StyleContext from "../../contexts/styleContext";

// Import images from src/assets/projectImages
import arepasImage from "../../assets/projectImages/arepas.png";
import coffeeImage from "../../assets/projectImages/coffee.png";
import budgetImage from "../../assets/projectImages/budget.png";

const Projects = () => {
  const { isDark } = useContext(StyleContext);

  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="projects-main" id="projects">
        {/* Text area (similar to commitment-text-div) */}
        <div className="projects-text-div">
          <h1
            className={
              isDark
                ? "dark-mode heading projects-title"
                : "heading projects-title"
            }
          >
            Projects
          </h1>

          {/* CHASHH introduction as a 'subTitle' style */}
          <p
            className={
              isDark
                ? "dark-mode projects-text"
                : "projects-text"
            }
          >
            I am currently developing an innovative platform called 
            <strong> CHASHH</strong> to revolutionize workplace safety 
            by combining advanced technology with real-time data and predictive analytics. 
            CHASHH aims to standardize how organizations identify and prevent hazards, 
            providing actionable insights to protect employees and ensure compliance 
            with critical regulations. By harnessing <strong>React</strong> for the frontend,{" "}
            <strong>Ruby on Rails</strong> for the backend, and <strong>Python</strong> 
            with <strong>TensorFlow</strong> for AI-driven risk analysis, <strong>CHASHH</strong> 
            detects potential issues before they escalate, seamlessly integrates with existing 
            systems, and fosters a culture of proactive risk management. From predictive risk 
            analysis and personalized prevention strategies to continuous monitoring and 
            education, <strong>CHASHH</strong> delivers a streamlined approach to safeguarding 
            workers across diverse industries.
          </p>

          {/* Button to learn more about CHASHH */}
          <Button
            text="For more information about CHASHH, please click here"
            className="project-button"
            href="https://lerfast.github.io/chashh-landing-page/"
            newTab={true}
          />
        </div>

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
              A real business located in Miami, with many satisfied customers.
              Built 100% in <strong>React</strong>, it provides a basic e-commerce 
              functionality to order arepas. When checking out, it sends an email to 
              the company with the request.
            </p>
            <a
              href="https://lerfast.github.io/arepas-mas-corp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </a>
          </div>

          {/* Project 2: Coffee Shop Landing */}
          <div className="project-card">
            <img
              src={coffeeImage}
              alt="Coffee Shop Landing Page"
              className="project-image"
            />
            <h2>Coffee Shop Landing Page</h2>
            <p>
              A React landing page for a café in Neiva, Huila-Colombia. Customers scan
              a QR code at their table, leading them to this page with a welcome
              message and a button to see the menu.
            </p>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project (Coming Soon)
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
              A basic application for managing personal expenses and tracking budgets.
              This was one of my milestone projects at Microverse, built 100% with
              <strong> Ruby on Rails</strong>.
            </p>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project (Link Pending)
            </a>
          </div>
        </div>

        {/* Optional "More Projects" button */}
        <Button
          text="More Projects"
          className="project-button"
          href={socialMediaLinks.github}
          newTab={true}
        />
      </div>
    </Fade>
  );
};

export default Projects;
