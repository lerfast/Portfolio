// Misión Patrimonio · datos editables, sin dependencias nuevas.
// Coloca fotos propias en public/images/mission-patrimonio/ y sustituye las fotos
// de referencia descargadas con scripts/descargar_fotos.py.
// Las URL sin confirmar quedan en null: NUNCA inventar enlaces.

export const gaitanaDemo = {
  title: { en: "La Gaitana — Neiva, Huila", es: "La Gaitana — Neiva, Huila" },
  sceneUrl: "https://superspl.at/scene/5ccc87ed",
  embedUrl: "https://superspl.at/s?id=5ccc87ed",
  tour360Url: "https://www.youtube.com/watch?v=I27aUEYO0G4",
};

export const missionTrailerUrl = "https://www.youtube.com/watch?v=xCqegWZJdUY";
export const missionTrailerThumbnailUrl = "https://i.ytimg.com/vi/xCqegWZJdUY/maxresdefault.jpg";
export const missionChannelUrl = "https://www.youtube.com/@rojastech1";

// Fotografía: imágenes ilustrativas del destino, NO capturas de los splats.
// photoSource debe retirarse cuando sustituyas la foto por una captura propia.
export const missionExperiences = [
  {
    id: "pitalito", name: "Pitalito — Plaza central", department: "Huila",
    description: {
      en: "Pitalito is a gateway to southern Huila. Its central park and San Antonio tower bring together everyday life, local identity, and the architecture of the town center.",
      es: "Pitalito es una puerta de entrada al sur del Huila. Su parque principal y la torre de San Antonio reúnen la vida cotidiana, la identidad local y la arquitectura del centro urbano.",
    },
    coverImage: "/images/mission-patrimonio/pitalito.jpg",
    youtubeThumbnailId: "9bUhwaROxbA",
    photoSource: "https://commons.wikimedia.org/wiki/File:Parque_Principal_Pitalito.jpg",
    flightVideoUrl: "https://www.youtube.com/watch?v=9bUhwaROxbA", video360Url: null, splatUrl: null,
  },
  {
    id: "mocoa", name: "Mocoa", department: "Putumayo",
    description: {
      en: "Surrounded by green mountains and rivers, Mocoa connects the Andean and Amazonian landscapes. The journey reveals a different rhythm of life in southern Colombia.",
      es: "Rodeada de montañas verdes y ríos, Mocoa conecta los paisajes andinos y amazónicos. El recorrido revela otra manera de vivir el sur de Colombia.",
    },
    coverImage: "/images/mission-patrimonio/mocoa.jpg",
    youtubeThumbnailId: "X297MpqsPKk",
    photoSource: "https://commons.wikimedia.org/wiki/File:Panoramica_Mocoa.jpg",
    episodeUrl: "https://www.youtube.com/watch?v=gGDFJxJXnhE",
    flightVideoUrl: "https://www.youtube.com/watch?v=X297MpqsPKk", video360Url: null, splatUrl: null,
  },
  {
    id: "pasto", name: "San Juan de Pasto", department: "Nariño",
    description: {
      en: "Pasto's historic center, plazas, and churches are part of the cultural landscape of the Nariño highlands, framed by mountains and the nearby Galeras volcano.",
      es: "El centro histórico, las plazas y las iglesias de Pasto forman parte del paisaje cultural del altiplano nariñense, rodeado de montañas y próximo al volcán Galeras.",
    },
    coverImage: "/images/mission-patrimonio/pasto.jpg",
    youtubeThumbnailId: "aZnB3GnBFGA",
    photoSource: "https://commons.wikimedia.org/wiki/File:Edificio_de_la_Plaza_de_Nari%C3%B1o.JPG",
    episodeUrl: "https://www.youtube.com/watch?v=JuaeK1IWLYY",
    flightVideoUrl: "https://www.youtube.com/watch?v=aZnB3GnBFGA", video360Url: null, splatUrl: null,
  },
  {
    id: "lajas", name: "Santuario de Las Lajas", department: "Ipiales · Nariño",
    description: {
      en: "Built across the Guáitara River canyon near Ipiales, Las Lajas Sanctuary is an extraordinary meeting point between neo-Gothic architecture, dramatic terrain, and devotional heritage.",
      es: "Construido sobre el cañón del río Guáitara, cerca de Ipiales, el Santuario de Las Lajas reúne arquitectura neogótica, un entorno natural imponente y patrimonio religioso.",
    },
    coverImage: "/images/mission-patrimonio/las-lajas.jpg",
    youtubeThumbnailId: "z5O-s_tw9BI",
    photoSource: "https://commons.wikimedia.org/wiki/File:Santuario_de_Las_Lajas.jpg",
    episodeUrl: "https://www.youtube.com/watch?v=3OX4eXvzmfs",
    flightVideoUrl: "https://www.youtube.com/watch?v=z5O-s_tw9BI", video360Url: null, splatUrl: null,
  },
  {
    id: "tulcan", name: "Cementerio José María Azaél Franco", department: "Tulcán · Carchi · Ecuador",
    description: {
      en: "In Tulcán, northern Ecuador, the José María Azaél Franco Cemetery is renowned for intricate living sculptures shaped from cypress trees. Its gardens express local artistry, cultural memory and a remarkable relationship between nature and heritage. This stop continues the journey beyond the Colombian border.",
      es: "En Tulcán, al norte de Ecuador, el Cementerio José María Azaél Franco destaca por sus esculturas vivas talladas en cipreses. Sus jardines reúnen arte, memoria cultural y una relación extraordinaria entre naturaleza y patrimonio. Esta parada lleva el recorrido más allá de la frontera colombiana.",
    },
    // Fotografía de referencia CC BY-SA; sustituir por una foto propia cuando esté disponible.
    coverImage: "/images/mission-patrimonio/tulcan.jpg",
    photoSource: "https://commons.wikimedia.org/wiki/File:Cementerio,_Tulc%C3%A1n,_Ecuador,_2015-07-21,_DD_68.JPG",
    imageAttribution: "Diego Delso · CC BY-SA 4.0",
    episodeUrl: null, flightVideoUrl: null, video360Url: null, splatUrl: null,
    plannedMedia: ["episode", "video360", "splat"],
  },
  {
    id: "popayan", name: "Puente del Humilladero", department: "Popayán · Cauca",
    description: {
      en: "The historic Humilladero Bridge is one of Popayán's landmarks. Its long series of arches connects the city's urban memory with the paths once used to cross the area.",
      es: "El histórico Puente del Humilladero es uno de los símbolos de Popayán. Su sucesión de arcos conecta la memoria urbana de la ciudad con los antiguos caminos de paso.",
    },
    coverImage: "/images/mission-patrimonio/popayan.jpg",
    photoSource: "https://commons.wikimedia.org/wiki/File:Puente_del_humilladero_Popay%C3%A1n.JPG",
    flightVideoUrl: null, video360Url: null, splatUrl: null,
  },
  {
    id: "cali", name: "Santiago de Cali", department: "Valle del Cauca",
    description: {
      en: "From La Ermita church and the Río Cali boulevard to its lively streets, Cali blends urban heritage, music, public spaces, and the character of Colombia's salsa capital.",
      es: "Desde la iglesia La Ermita y el Bulevar del Río hasta sus calles llenas de vida, Cali reúne patrimonio urbano, música, espacios públicos y el carácter de la capital de la salsa.",
    },
    coverImage: "/images/mission-patrimonio/cali.jpg",
    youtubeThumbnailId: "9Do3RMFLCfk",
    photoSource: "https://commons.wikimedia.org/wiki/File:La_Ermita,_Cali,_Colombia.jpg",
    flightVideoUrl: "https://www.youtube.com/watch?v=9Do3RMFLCfk", video360Url: null, splatUrl: null,
  },
  {
    id: "buga", name: "Basílica del Señor de los Milagros", department: "Guadalajara de Buga · Valle del Cauca",
    description: {
      en: "The Basilica of the Lord of Miracles is one of Colombia's best-known pilgrimage destinations. Located in the historic city of Guadalajara de Buga, its monumental architecture and living religious traditions make it a meaningful setting for a future immersive 360° visit.",
      es: "La Basílica del Señor de los Milagros es uno de los destinos de peregrinación más reconocidos de Colombia. En el centro histórico de Guadalajara de Buga, su arquitectura monumental y sus tradiciones religiosas ofrecen un escenario especial para un próximo recorrido inmersivo en 360°.",
    },
    // Fotografía de referencia CC0; sustituir por una foto propia cuando esté disponible.
    coverImage: "/images/mission-patrimonio/buga.jpg",
    photoSource: "https://commons.wikimedia.org/wiki/File:Iglesia_del_Se%C3%B1or_de_los_Milagros.jpg",
    imageAttribution: "Dieram · CC0 1.0",
    flightVideoUrl: null, video360Url: null, splatUrl: null,
    plannedMedia: ["video360"],
  },
  {
    id: "buenaventura", name: "Buenaventura — Malecón Bahía de la Cruz", department: "Valle del Cauca",
    description: {
      en: "On Colombia's Pacific coast, Buenaventura is a port city closely connected to the sea. Its Malecón Bahía de la Cruz is a public waterfront promenade and gathering place. The published aerial video documents the city, while a 360° tour and a separate 3D reconstruction of the malecón are planned.",
      es: "Sobre el Pacífico colombiano, Buenaventura es una ciudad portuaria profundamente vinculada al mar. Su Malecón Bahía de la Cruz es un espacio público de encuentro junto al litoral. El vuelo publicado documenta la ciudad; el recorrido 360° y la reconstrucción 3D del malecón están previstos como experiencias independientes.",
    },
    coverImage: "/images/mission-patrimonio/buenaventura.jpg",
    youtubeThumbnailId: "nfjlRb8mejU",
    photoSource: "https://commons.wikimedia.org/wiki/File:Muelle_Buenaventura.jpg",
    flightVideoUrl: "https://www.youtube.com/watch?v=nfjlRb8mejU", video360Url: null, splatUrl: null,
    plannedMedia: ["video360", "splat"],
  },
  {
    id: "armenia", name: "Armenia", department: "Quindío",
    description: {
      en: "At the heart of the Coffee Cultural Landscape, Armenia tells a story of urban renewal, resilience, plazas, and everyday life among the mountains of Quindío.",
      es: "En el corazón del Paisaje Cultural Cafetero, Armenia cuenta una historia de renovación urbana, resiliencia, plazas y vida cotidiana entre las montañas del Quindío.",
    },
    coverImage: "/images/mission-patrimonio/armenia.jpg",
    youtubeThumbnailId: "EZwj21crnIw",
    photoSource: "https://commons.wikimedia.org/wiki/File:Plaza_de_Bol%C3%ADvar_Armenia.jpg",
    flightVideoUrl: "https://www.youtube.com/watch?v=EZwj21crnIw", video360Url: null, splatUrl: null,
  },
  {
    id: "pereira", name: "Pereira", department: "Risaralda",
    description: {
      en: "Pereira combines the activity of a growing Andean city with its central squares, monuments, and close connection to the coffee region's landscape and traditions.",
      es: "Pereira combina el movimiento de una ciudad andina en crecimiento con sus plazas, monumentos y una estrecha relación con los paisajes y las tradiciones cafeteras.",
    },
    coverImage: "/images/mission-patrimonio/pereira.jpg",
    youtubeThumbnailId: "iQ3gTvzd6y4",
    photoSource: "https://commons.wikimedia.org/wiki/File:Plaza_Bolivar_Pereira.JPG",
    flightVideoUrl: "https://www.youtube.com/watch?v=iQ3gTvzd6y4", video360Url: null, splatUrl: null,
  },
  {
    id: "manizales", name: "Manizales", department: "Caldas",
    description: {
      en: "Built on steep Andean slopes, Manizales stands out for its mountain views, the Cathedral Basilica, and an urban landscape shaped by the geography of Colombia's coffee region.",
      es: "Construida sobre las laderas empinadas de los Andes, Manizales destaca por sus panorámicas montañosas, la Catedral Basílica y un paisaje urbano marcado por la geografía cafetera.",
    },
    coverImage: "/images/mission-patrimonio/manizales.jpg",
    youtubeThumbnailId: "wrr49iyEjiI",
    photoSource: "https://commons.wikimedia.org/wiki/File:Catedral_de_Manizales.jpg",
    flightVideoUrl: "https://www.youtube.com/watch?v=wrr49iyEjiI", video360Url: null, splatUrl: null,
  },
];

export const missionPatrimonioContent = {
  en: {
    demoEyebrow: "Interactive 3D demonstration",
    demoTitle: "Explore La Gaitana without leaving this website",
    demoText: "Before discovering the journey, try a real 3D Gaussian Splatting experience: La Gaitana, in Neiva, Huila. Drag to look around, zoom in, and explore a digitally reconstructed space directly in your browser.",
    demoInstructions: "Drag to explore · Scroll or pinch to zoom · Fullscreen available",
    demoLink: "Open La Gaitana on SuperSplat",
    eyebrow: "Ride & Fly · Original YouTube series",
    title: "Misión Patrimonio — Colombia by motorcycle, drone and 360°",
    lead: "A journey across Colombia that began as a YouTube documentary travel series and later inspired interactive 3D reconstructions.",
    paragraphs: [
      "Misión Patrimonio was created as a travel series for the Ride & Fly by Luis E. Rojas YouTube channel. Riding a Bajaj Dominar 400, I set out to document Colombian landscapes, urban landmarks, architecture, culture, and local heritage, sharing the road as well as the destinations.",
      "Each episode brings together the motorcycle journey, production behind the scenes, drone flights, and 360° camera footage. The route includes destinations such as Mocoa, Pasto, Las Lajas, Popayán, Cali, Buenaventura and the Coffee Region. A future chapter extends the journey into Ecuador, with a stop at Tulcán.",
      "That audiovisual archive opened the door to another experiment: using selected footage to reconstruct places through 3D Gaussian Splatting. The gallery below connects each destination to its flight video, its 360° journey where available, and its interactive splat once the corresponding link is added.",
    ],
    channel: "Visit Ride & Fly on YouTube",
    season: "Season 1 · Official trailer",
    trailer: "Watch the official trailer",
    galleryEyebrow: "Destinations & digital experiences",
    galleryTitle: "From the YouTube journey to interactive 3D",
    galleryIntro: "Explore the places documented through this journey, from Colombian cities to the Ecuadorian border. Watch published films and discover the immersive experiences in preparation; new links are added as each project is released.",
    upcomingLabel: "In preparation",
    noVideosLabel: "New material in preparation",
    flight: "Drone flight",
    video360: "360° journey",
    episode: "YouTube episode",
    splat: "Explore the 3D splat",
    pending: "Link to be added",
    imageReference: "Illustrative destination photo",
    photoCredit: "Photo source",
    originalVideoImage: "Original video thumbnail · Ride & Fly",
    coverPending: "Destination photo pending",
  },
  es: {
    demoEyebrow: "Demostración interactiva en 3D",
    demoTitle: "Recorre La Gaitana sin salir de esta página",
    demoText: "Antes de conocer la historia del viaje, prueba una experiencia real de 3D Gaussian Splatting: La Gaitana, en Neiva, Huila. Arrastra para mirar alrededor, acércate y explora el espacio reconstruido digitalmente desde tu navegador.",
    demoInstructions: "Arrastra para explorar · Desplaza o pellizca para acercarte · Pantalla completa disponible",
    demoLink: "Abrir La Gaitana en SuperSplat",
    eyebrow: "Ride & Fly · Serie original de YouTube",
    title: "Misión Patrimonio — Colombia en moto, dron y 360°",
    lead: "Un recorrido por Colombia que nació como serie documental de viajes en YouTube y luego inspiró reconstrucciones 3D interactivas.",
    paragraphs: [
      "Misión Patrimonio nació como una serie de viajes para el canal de YouTube Ride & Fly by Luis E. Rojas. A bordo de mi Bajaj Dominar 400, emprendí un recorrido para documentar paisajes, lugares emblemáticos, arquitectura, cultura y patrimonio colombiano, mostrando tanto los destinos como las vivencias en carretera.",
      "Cada capítulo combina el recorrido en motocicleta, el detrás de cámaras, vuelos con dron y grabaciones con cámaras 360°. La ruta incluye Mocoa, Pasto, Las Lajas, Popayán, Cali, Buenaventura y el Eje Cafetero. Un próximo capítulo ampliará el recorrido hasta Ecuador, con una parada en Tulcán.",
      "Ese archivo audiovisual abrió paso a otro experimento: aprovechar parte del material para reconstruir lugares mediante 3D Gaussian Splatting. La galería de abajo conecta cada destino con su video de vuelo, su recorrido 360° cuando esté disponible y su splat interactivo cuando agreguemos el enlace correspondiente.",
    ],
    channel: "Visitar Ride & Fly en YouTube",
    season: "Temporada 1 · Tráiler oficial",
    trailer: "Ver el tráiler oficial",
    galleryEyebrow: "Destinos y experiencias digitales",
    galleryTitle: "Del viaje en YouTube a las experiencias 3D",
    galleryIntro: "Explora los lugares documentados durante el viaje, desde ciudades colombianas hasta la frontera con Ecuador. Descubre los videos publicados y las experiencias inmersivas en preparación; los nuevos enlaces aparecerán cuando cada proyecto se publique.",
    upcomingLabel: "En preparación",
    noVideosLabel: "Nuevos materiales en preparación",
    flight: "Video del vuelo",
    video360: "Recorrido en 360°",
    episode: "Capítulo de YouTube",
    splat: "Explorar el splat 3D",
    pending: "Enlace pendiente",
    imageReference: "Fotografía ilustrativa del destino",
    photoCredit: "Fuente de la foto",
    originalVideoImage: "Miniatura de video original · Ride & Fly",
    coverPending: "Foto del destino pendiente",
  },
};
