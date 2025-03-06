import React, {useContext} from "react";
import "./Footer.css";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/styleContext";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  return (
    <>
      
      <Fade bottom duration={1000} distance="5px">
        <div className="footer-div">
          <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
            Made with <span><i id="heart" class="blink fas fa-heart"></i> </span> by Luis Emilio Rojas
        </p>
      </div>
    </Fade>
    <div className="visit-counter" data-aos="fade-up" data-aos-delay="950">
      <a href="https://www.hitwebcounter.com" target="_blank">
      <img src="https://hitwebcounter.com/counter/counter.php?page=19482089&style=0006&nbdigits=9&type=page&initCount=0" title="Counter Widget" Alt="Visit counter For Websites"   border="0" /></a>       
      </div>
    </>
  );
}
