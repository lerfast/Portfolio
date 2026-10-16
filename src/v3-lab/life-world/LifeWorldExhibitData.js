/* Entrega D: verified portfolio destinations and conceptual interactive exhibits.
 * These are illustrative 3D props, not screenshots or implemented Oshlix features.
 * Published video IDs are kept separate from planned 360/3DGS projects.
 */
import {LINKS} from './LifeWorldContent';

export const EXHIBITS = {
 capabilities:[
  {id:'safety',name:{es:'Prevención + SST',en:'Prevention + OHS'},subtitle:{es:'Cultura de seguridad y gestión del riesgo',en:'Safety culture and risk management'},icon:'oshlix'},
  {id:'software',name:{es:'Ingeniería de software',en:'Software engineering'},subtitle:{es:'Proyectos reales desarrollados con tecnología',en:'Real projects built with technology'},icon:'software'},
  {id:'spatial',name:{es:'Visualización espacial',en:'Spatial visualization'},subtitle:{es:'Fotogrametría, 360° y 3DGS',en:'Photogrammetry, 360° and 3DGS'},icon:'drone'}
 ],
 projects:[
  {id:'arepas',name:{es:'Arepas y Más',en:'Arepas y Más'},subtitle:{es:'Proyecto de desarrollo web',en:'Web development project'},url:LINKS.arepas,icon:'software'},
  {id:'catacafe',name:{es:'Cata Café',en:'Cata Café'},subtitle:{es:'Proyecto de desarrollo web',en:'Web development project'},url:LINKS.catacafe,icon:'software'},
  {id:'budget',name:{es:'Aplicación de presupuesto',en:'Budget application'},subtitle:{es:'Proyecto de software y repositorio',en:'Software project and repository'},url:LINKS.budget,icon:'software'}
 ],
 credentials:[
  {id:'administration',name:{es:'Administración de Empresas',en:'Business Administration'},subtitle:{es:'Formación profesional',en:'Professional education'},icon:'credentials'},
  {id:'ohs',name:{es:'Especialización en Gerencia de SST',en:'OHS Management Specialization'},subtitle:{es:'Especialización, no maestría',en:'Postgraduate specialization, not a master’s'},icon:'oshlix'},
  {id:'software',name:{es:'Desarrollo de software',en:'Software Development'},subtitle:{es:'Competencias y proyectos de desarrollo',en:'Development skills and projects'},icon:'software'},
  {id:'uas',name:{es:'Piloto UAS · Aerocivil Colombia',en:'UAS Pilot · Aerocivil Colombia'},subtitle:{es:'Piloto profesional UAS · licencia vigente',en:'Professional UAS pilot · valid license'},icon:'drone'}
 ],
 studio:[
  {id:'trailer',name:{es:'Misión Patrimonio · Tráiler',en:'Misión Patrimonio · Trailer'},subtitle:{es:'Presentación de la serie documental',en:'Documentary series introduction'},youtubeId:'xCqegWZJdUY',icon:'youtube'},
  {id:'cali',name:{es:'Santiago de Cali · Vuelo',en:'Santiago de Cali · Aerial'},subtitle:{es:'Registro aéreo y edición',en:'Aerial recording and editing'},youtubeId:'9Do3RMFLCfk',icon:'youtube'},
  {id:'buenaventura',name:{es:'Buenaventura · Vuelo',en:'Buenaventura · Aerial'},subtitle:{es:'Registro documental aéreo',en:'Aerial documentary footage'},youtubeId:'nfjlRb8mejU',icon:'youtube'},
  {id:'neiva360',name:{es:'Neiva · Recorrido 360°',en:'Neiva · 360° Tour'},subtitle:{es:'Video inmersivo narrado',en:'Narrated immersive video'},youtubeId:'I27aUEYO0G4',icon:'youtube'}
 ],
 heritage:[
  {id:'pitalito',name:{es:'Pitalito · Huila',en:'Pitalito · Huila'},youtubeId:'9bUhwaROxbA',icon:'heritage'},
  {id:'mocoa',name:{es:'Mocoa · Putumayo',en:'Mocoa · Putumayo'},youtubeId:'X297MpqsPKk',icon:'heritage'},
  {id:'pasto',name:{es:'Pasto · Nariño',en:'Pasto · Nariño'},youtubeId:'aZnB3GnBFGA',icon:'heritage'},
  {id:'lajas',name:{es:'Santuario de Las Lajas',en:'Las Lajas Sanctuary'},youtubeId:'z5O-s_tw9BI',icon:'heritage'},
  {id:'cali',name:{es:'Cali · Valle del Cauca',en:'Cali · Valle del Cauca'},youtubeId:'9Do3RMFLCfk',icon:'heritage'},
  {id:'buenaventura',name:{es:'Buenaventura · Malecón',en:'Buenaventura · Waterfront'},youtubeId:'nfjlRb8mejU',icon:'heritage'},
  {id:'armenia',name:{es:'Armenia · Quindío',en:'Armenia · Quindío'},youtubeId:'EZwj21crnIw',icon:'heritage'},
  {id:'pereira',name:{es:'Pereira · Risaralda',en:'Pereira · Risaralda'},youtubeId:'iQ3gTvzd6y4',icon:'heritage'},
  {id:'manizales',name:{es:'Manizales · Caldas',en:'Manizales · Caldas'},youtubeId:'wrr49iyEjiI',icon:'heritage'}
 ]
};
export const VISUAL_ZONES=['capabilities','projects','credentials','studio','heritage'];
export function exhibitLabel(id,language='en'){
 const parts=String(id).split(':');
 if(parts[0]!=='exhibit')return null;
 const options=EXHIBITS[parts[1]]||[];
 const index=Number(parts[2]);
 const chosen=options[index];
 return chosen?chosen.name[language==='es'?'es':'en']:null;
}
export const videoPage = id=>`https://www.youtube.com/watch?v=${id}`;
export const videoThumbnail = id=>`https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
