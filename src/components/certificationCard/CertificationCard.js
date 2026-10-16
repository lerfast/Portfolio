import React, { useState } from 'react';
import "./CertificationCard.css";
import { Fade } from 'react-reveal';

const CertificationCard = (props) => {
	
		const certificate = props.certificate;
        const [logoUnavailable, setLogoUnavailable] = useState(false);
        const externalInstitution = Boolean(certificate.institution_link);
		return (
			<div>
				<Fade bottom duration={1200} distance="40px">
					<div className="cert-card">
						<div className="content">
							<a href={certificate.certificate_link} target="_blank" rel="noopener noreferrer">
								<div className="content-overlay"></div>
								<div className="cert-header" style={{ backgroundColor: certificate.color_code }}>
                                    {logoUnavailable ? (
                                      <span className="cert-logo-fallback" role="img" aria-label={certificate.alt_name}>AEROCIVIL</span>
                                    ) : (
                                      <img
                                        className="logo_img"
                                        src={certificate.logo_url || require(`../../assets/images/${certificate.logo_path}`)}
                                        alt={certificate.alt_name}
                                        loading="lazy"
                                        onError={certificate.logo_url ? () => setLogoUnavailable(true) : undefined}
                                      />
                                    )}
								</div>
								<div className="content-details fadeIn-top">
									<h3 className="content-title">{externalInstitution ? certificate.institution_hover_label : 'Certificate'}</h3>
								</div>
							</a>
						</div>
						<div className="cert-body">
							<h2 className="cert-body-title">{certificate.title}</h2>
							<h3 className="cert-body-subtitle">{certificate.subtitle}</h3>
						</div>
					</div>
				</Fade>
			</div>
		);
	
}

export default CertificationCard;
