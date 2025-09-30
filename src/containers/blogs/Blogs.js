import React, { useContext, useEffect } from "react";
import "./Blog.css";
import BlogCard from "../../components/blogCard/BlogCard";
import { blogSection } from "../../portfolio";
import { Fade } from "react-reveal";
import StyleContext from "../../contexts/styleContext";

export default function Blogs() {
  const { isDark } = useContext(StyleContext);

  // Tilt 3D (se declara siempre; no rompe reglas de hooks)
  useEffect(() => {
    const mq = window.matchMedia
      ? window.matchMedia("(min-width: 769px)")
      : { matches: false, addEventListener: () => {}, removeEventListener: () => {} };

    let cleanups = [];

    const attachTilt = () => {
      // Limpia anteriores
      cleanups.forEach((fn) => fn());
      cleanups = [];

      if (!mq.matches) return; // solo desktop

      const cards = document.querySelectorAll(".blog-tilt");
      cards.forEach((card) => {
        card.style.willChange = "transform";

        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;

          const max = 10;
          const rotY = (px - 0.5) * (max * 2);
          const rotX = -(py - 0.5) * (max * 2);

          card.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
            2
          )}deg) translateY(-4px)`;
          card.style.setProperty("--px", `${(px * 100).toFixed(1)}%`);
          card.style.setProperty("--py", `${(py * 100).toFixed(1)}%`);
        };

        const onEnter = (e) => onMove(e);
        const onLeave = () => {
          card.style.transform = "";
          card.style.removeProperty("--px");
          card.style.removeProperty("--py");
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
          card.style.willChange = "";
          card.style.transform = "";
          card.style.removeProperty("--px");
          card.style.removeProperty("--py");
        });
      });
    };

    attachTilt();
    mq.addEventListener?.("change", attachTilt);

    return () => {
      mq.removeEventListener?.("change", attachTilt);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  if (!blogSection.display) return null;

  return (
    <Fade bottom duration={1200} distance="40px">
      <section className="blogs-section main" id="blogs">
        <header className="blog-header">
          <h1 className="blog-header-text">{blogSection.title}</h1>
          <p className={`blog-subtitle ${isDark ? "dark-mode" : ""}`}>
            {blogSection.subtitle}
          </p>
        </header>

        <div className="blog-main-div">
          <div className="blog-text-div">
            {blogSection.blogs.map((blog, i) => (
              <article className="blog-tilt" key={i}>
                <BlogCard
                  isDark={isDark}
                  blog={{
                    url: blog.url,
                    image: blog.image,
                    title: blog.title,
                    description: blog.description,
                  }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>
    </Fade>
  );
}
