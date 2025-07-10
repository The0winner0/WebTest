import Image from 'next/image';
import RouteMapImage from "../../../../public/images/Platform/Route-map-feature.webp";
export default function UseCasesSection() {
    return (
        <section className="platform-section">
            <h2 className="platform-heading">Scales Across Use Cases</h2>
            <div className="platform-use-cases-container">
                <div className="platform-use-cases-image-wrapper">
                    <Image unoptimized={true} 
                        width="1800"
                        height="1062"
                        src={RouteMapImage}
                        className="platform-image"
                        alt="Route map feature"
                        sizes="(max-width: 1800px) 100vw, 1800px"
                        loading="lazy"
                    />
                </div>
                <div className="platform-use-cases-text-wrapper">
                    <p>Get instant location visibility with existing infrastructure. There is no need for precise mapping of the site, minimizing the time to deploy. The platform provides seamless visibility across areas covered by different infrastructure, including in moving vehicles. </p>
                </div>
            </div>
        </section>
    );
}