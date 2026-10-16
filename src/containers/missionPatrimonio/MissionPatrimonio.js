import React, { useContext, useState } from "react";
import LangContext from "../../contexts/langContext";
import PortfolioReveal from "../../components/motion/PortfolioReveal";
import {
  missionExperiences,
  missionTrailerUrl,
  missionTrailerThumbnailUrl,
  missionChannelUrl,
  missionPatrimonioContent,
} from "../../data/missionPatrimonio";
import "./MissionPatrimonio.css";

// Solo activar URLs externas bien formadas y sin usuario/contraseña.
export function externalUrl(value) {
  if (typeof value !== "string" || !/^https?:\/\//i.test(value)) return null;
  try {
    const url = new URL(value);
    return url.hostname && !url.username && !url.password ? url.href : null;
  } catch (_) {
    return null;
  }
}

function MissionAction({ url, label, primary = false }) {
  const href = externalUrl(url);
  if (!href) return null;
  return (
    <a className={`mission-action ${primary ? "mission-action--primary" : ""}`}
       href={href} target="_blank" rel="noopener noreferrer">
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}

export function MissionCard({ experience, lang, labels, index = 0 }) {
  // Primero usamos la miniatura oficial del video del autor. Si YouTube
  // no la proporciona, probamos la versión estándar y después la foto local.
  const [imageIndex, setImageIndex] = useState(0);
  const videoId = experience.youtubeThumbnailId;
  const coverCandidates = videoId
    ? [
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        experience.coverImage,
      ]
    : [experience.coverImage];
  const coverSrc = coverCandidates[imageIndex];
  const showCover = Boolean(coverSrc);
  const showingYoutubeThumbnail = Boolean(videoId) && imageIndex < 2 && showCover;
  const desc = (experience.description || {})[lang] || (experience.description || {}).en || "";
  const actions = [
    { id: "flight", url: experience.flightVideoUrl, label: labels.flight },
    { id: "video360", url: experience.video360Url, label: labels.video360 },
    { id: "episode", url: experience.episodeUrl, label: labels.episode },
    { id: "splat", url: experience.splatUrl, label: labels.splat, primary: true },
  ];
  const published = actions.filter((action) => externalUrl(action.url));
  const planned = (experience.plannedMedia || []).filter(
    (id) => actions.some((action) => action.id === id && !externalUrl(action.url))
  );
  const plannedLabels = planned.map((id) => actions.find((action) => action.id === id).label);

  return (
    <article className="mission-card">
      <div className="mission-cover">
        <span className="mission-cover-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        {showCover ? (
          <>
            <img src={coverSrc} alt={experience.name}
                 loading="lazy" decoding="async" width="900" height="560"
                 onError={() => setImageIndex((previous) => previous + 1)} />
            {showingYoutubeThumbnail && (
              <span className="mission-cover-youtube">{labels.originalVideoImage}</span>
            )}
          </>
        ) : (
          <div className="mission-cover-fallback">
            <span aria-hidden="true">✦</span><strong>{experience.name}</strong>
            <small>{experience.department}</small>
          </div>
        )}
      </div>
      <div className="mission-card-body">
        <p className="mission-place">{experience.department}</p>
        <h4>{experience.name}</h4>
        <p className="mission-description">{desc}</p>
        {published.length > 0 && (
          <div className="mission-actions">
            {published.map((action) => (
              <MissionAction key={action.id} url={action.url}
                             label={action.label} primary={action.primary} />
            ))}
          </div>
        )}
        {plannedLabels.length > 0 && (
          <p className="mission-upcoming">
            <span className="mission-upcoming-label">{labels.upcomingLabel}</span>
            {plannedLabels.join(" · ")}
          </p>
        )}
        {published.length === 0 && plannedLabels.length === 0 && (
          <p className="mission-upcoming">{labels.noVideosLabel}</p>
        )}
        {showCover && !showingYoutubeThumbnail && experience.photoSource && (
          <a className="mission-photo-credit" href={experience.photoSource}
             target="_blank" rel="noopener noreferrer">
            {experience.imageAttribution || `${labels.imageReference} · ${labels.photoCredit}`} ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function MissionPatrimonio() {
  const context = useContext(LangContext) || {};
  const lang = context.lang === "es" ? "es" : "en";
  const t = missionPatrimonioContent[lang];
  const [trailerSrc, setTrailerSrc] = useState(missionTrailerThumbnailUrl);
  const [trailerError, setTrailerError] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("all");
  const galleryControls = lang === "es"
    ? { all: "Todos los destinos", published: "Con material publicado", upcoming: "Próximas experiencias", explore: "Explorar destinos", count: "LUGARES DOCUMENTADOS" }
    : { all: "All destinations", published: "Published work", upcoming: "Upcoming experiences", explore: "Explore destinations", count: "DOCUMENTED PLACES" };
  const hasPublished = (item) => [item.flightVideoUrl, item.video360Url, item.episodeUrl, item.splatUrl]
    .some((url) => Boolean(externalUrl(url)));
  const hasUpcoming = (item) => Array.isArray(item.plannedMedia) && item.plannedMedia.length > 0;
  const visibleExperiences = missionExperiences
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => galleryFilter === "all" ||
      (galleryFilter === "published" && hasPublished(item)) ||
      (galleryFilter === "upcoming" && hasUpcoming(item)));

  return (
    <section className="mission-section" id="mission-patrimonio" aria-labelledby="mission-title">
      <div className="mission-story">
        <PortfolioReveal duration={950}>
          <header className="mission-story-heading">
            <span className="mission-eyebrow"><span aria-hidden="true" className="mission-eyebrow-line" />{t.eyebrow}</span>
            <h2 id="mission-title">{t.title}</h2>
            <p className="mission-lead">{t.lead}</p>
          </header>
        </PortfolioReveal>
        <div className="mission-story-grid">
          <PortfolioReveal delay={70} duration={900}>
            <div className="mission-copy">
              {t.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              <div className="mission-story-actions">
                <a className="mission-channel-link" href={missionChannelUrl}
                   target="_blank" rel="noopener noreferrer">
                  {t.channel} <span aria-hidden="true">↗</span>
                </a>
                <a className="mission-gallery-link" href="#mission-gallery">
                  {galleryControls.explore} <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </PortfolioReveal>
          <PortfolioReveal delay={150} duration={980}>
            <a className="mission-trailer" href={missionTrailerUrl}
               target="_blank" rel="noopener noreferrer" aria-label={t.trailer}>
              <div className="mission-trailer-cover">
                {!trailerError && <img src={trailerSrc} alt=""
                                       loading="lazy" decoding="async" width="480" height="360"
                                       onError={() => {
                                         if (trailerSrc !== "https://i.ytimg.com/vi/xCqegWZJdUY/hqdefault.jpg") {
                                           setTrailerSrc("https://i.ytimg.com/vi/xCqegWZJdUY/hqdefault.jpg");
                                         } else {
                                           setTrailerError(true);
                                         }
                                       }} />}
                <span className="mission-trailer-stamp" aria-hidden="true">RIDE &amp; FLY / FILM</span>
                <span className="mission-play" aria-hidden="true">▶</span>
              </div>
              <div className="mission-trailer-caption">
                <span className="mission-eyebrow">{t.season}</span>
                <strong>{t.trailer} <span aria-hidden="true">↗</span></strong>
                <small>YouTube · Ride &amp; Fly by Luis E. Rojas</small>
              </div>
            </a>
          </PortfolioReveal>
        </div>
      </div>

      <div className="mission-gallery" id="mission-gallery">
        <PortfolioReveal>
          <div className="mission-gallery-intro">
            <div className="mission-gallery-intro-copy">
              <span className="mission-eyebrow">{t.galleryEyebrow}</span>
              <h3>{t.galleryTitle}</h3>
              <p>{t.galleryIntro}</p>
            </div>
            <div className="mission-gallery-count" aria-label={`${missionExperiences.length} ${galleryControls.count}`}>
              <strong>{String(missionExperiences.length).padStart(2, "0")}</strong>
              <small>{galleryControls.count}</small>
            </div>
          </div>
        </PortfolioReveal>
        <div className="mission-filters" role="group" aria-label={lang === "es" ? "Filtrar experiencias" : "Filter experiences"}>
          {(["all", "published", "upcoming"]).map((id) => (
            <button key={id} type="button"
              className={`mission-filter ${galleryFilter === id ? "mission-filter--active" : ""}`}
              aria-pressed={galleryFilter === id}
              onClick={() => setGalleryFilter(id)}>
              {galleryControls[id]}
            </button>
          ))}
        </div>
        <div className="mission-grid">
          {visibleExperiences.map(({ item, index }, position) => (
            <PortfolioReveal key={item.id} delay={(position % 3) * 95} duration={750} distance="22px">
              <div className="mission-grid-item">
                <MissionCard experience={item} index={index} lang={lang} labels={t} />
              </div>
            </PortfolioReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
