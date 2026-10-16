import React from 'react';

/* Small inline SVG icon vocabulary; no additional package or font required. */
const shapes = {
  resume:<><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
  oshlix:<><path d="M12 2 4 5v6c0 5.2 3.5 8.5 8 11 4.5-2.5 8-5.8 8-11V5z"/><path d="m8.5 12 2.3 2.4 4.9-5"/></>,
  github:<><path d="M9 19c-4 1-4-2-6-2m12 4v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6-1.5 6-6.7a5.2 5.2 0 0 0-1.5-3.7A4.9 4.9 0 0 0 18.5.5S17.2.2 15 2a13 13 0 0 0-6 0C6.8.2 5.5.5 5.5.5a4.9 4.9 0 0 0-.1 3.5A5.2 5.2 0 0 0 4 7.7c0 5.2 3 6.4 6 6.7a3.4 3.4 0 0 0-.9 2.7V21"/></>,
  linkedin:<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10v7M7.5 7v.1M12 17v-7h3v1.4c.4-.9 1.5-1.5 2.5-1.5 1.8 0 2.5 1.1 2.5 3.2V17"/></>,
  whatsapp:<><path d="M20.2 11.6a8.1 8.1 0 0 1-11.9 7.1L4 20l1.4-4.2a8.1 8.1 0 1 1 14.8-4.2Z"/><path d="M9 8.1c-.7.4-1 1.3-.6 2.4.6 1.7 2.2 3.3 4 4 1.1.4 2 .1 2.5-.6l-1.8-1.2-1.1 1c-1.2-.6-2.2-1.6-2.8-2.8l1-1.1z"/></>,
  mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></>,
  youtube:<><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/></>,
  software:<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m9 9-3 3 3 3m6-6 3 3-3 3"/></>,
  credentials:<><path d="M12 2 4 5v7c0 5 3 7 8 10 5-3 8-5 8-10V5z"/><path d="m8 12 3 3 5-6"/></>,
  drone:<><circle cx="12" cy="12" r="2"/><path d="M10 10 6 6m8 4 4-4m-8 8-4 4m8-4 4 4"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></>,
  heritage:<><path d="M2 9 12 3l10 6M4 9v12m16-12v12M8 9v12m8-12v12M2 21h20"/></>,
  contact:<><path d="M3 4h18v12H9l-6 5z"/><path d="M7 9h10M7 12h7"/></>,
  capabilities:<><path d="m12 2 2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z"/></>,
  project:<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></>,
  play:<><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/></>,
  arrow:<><path d="M4 12h16m-7-7 7 7-7 7"/></>,
  rotate:<><path d="M20 11a8 8 0 1 1-2.5-5.7M20 4v6h-6"/></>,
  location:<><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.7"/></>,
  external:<><path d="M14 4h6v6m0-6-9 9"/><path d="M19 14v5H5V5h5"/></>,
};
export default function LifeWorldIcon({name,size=20,className=''}){return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[name]||shapes.project}</svg>;}
