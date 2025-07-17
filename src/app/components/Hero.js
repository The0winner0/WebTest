import Image from 'next/image';
import Link from 'next/link';
import '../HomeCss/Hero.css';
import { getStrapiURL } from '../lib/api';
import pinImg from '../../../public/images/Pin.png'; 

const Pin = ({ style }) => (
    <div className="pin" style={style}>
        <Image 
            unoptimized={true}   
            src={pinImg}
            alt="map pin" 
            width={34} 
            height={52} 
        />
    </div>
);

const Hero = ({ data }) => {
    // Add a check in case data is missing
    if (!data) return null;

    const {
        heroTitleLine1,
        heroTitleGradient,
        heroDescription,
        heroButtonText,
        heroButtonLink,
        heroBackgroundImageDesktop,
        heroBackgroundImageMobile,
        heroMapPins
    } = data;

    // Access the URL and alt text directly, with optional chaining (?.) for safety
    const desktopImageUrl = getStrapiURL(heroBackgroundImageDesktop?.url);
    
    const mobileImageUrl = getStrapiURL(heroBackgroundImageMobile?.url);
    const desktopImageAlt = heroBackgroundImageDesktop?.alternativeText || 'Location intelligence map';
    const mobileImageAlt = heroBackgroundImageMobile?.alternativeText || 'Location intelligence map';
    // console.log('DATA RECEIVED BY HERO COMPONENT:', JSON.stringify(data, null, 2));
    return (
        <section className="hero-section">
            <div className="hero-container">
                {desktopImageUrl && (
                    <Image 
                        unoptimized={true} 
                        src={desktopImageUrl}
                        alt={desktopImageAlt}
                        fill
                        className="background-img background-img--desktop"
                        priority
                    />
                )}
                {mobileImageUrl && (
                    <Image 
                        unoptimized={true} 
                        src={mobileImageUrl}
                        alt={mobileImageAlt}
                        fill
                        className="background-img background-img--mobile"
                        priority
                    />
                )}
                {heroMapPins?.map((pin) => (
                    <Pin key={pin.id} style={{ top: pin.topPosition, left: pin.leftPosition }} />
                ))}
            </div>
            <div className="hero-text-section">
                <div className="container">
                    <h1 className="title-large">{heroTitleLine1}</h1>
                    <h1 className="title-gradient">{heroTitleGradient}</h1>
                    <p className="description" dangerouslySetInnerHTML={{ __html: heroDescription?.replace(/\n/g, '<br />') }} />
                    <Link href={heroButtonLink || '/contact'} className="button">
                        <span>{heroButtonText}</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;