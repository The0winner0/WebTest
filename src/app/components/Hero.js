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

    const desktopImage = heroBackgroundImageDesktop;
    const mobileImage = heroBackgroundImageMobile;

    const desktopImageUrl = getStrapiURL(desktopImage?.url);
    const mobileImageUrl = getStrapiURL(mobileImage?.url);
    const desktopImageAlt = desktopImage?.alternativeText || 'Location intelligence map';
    const mobileImageAlt = mobileImage?.alternativeText || 'Location intelligence map';

    const containerStyle = {
        '--desktop-aspect-ratio': (desktopImage?.width && desktopImage?.height)
            ? `${desktopImage.width} / ${desktopImage.height}`
            : '16 / 9',
        '--mobile-aspect-ratio': (mobileImage?.width && mobileImage?.height)
            ? `${mobileImage.width} / ${mobileImage.height}`
            : '3 / 4' 
    };

    return (
        <section className="hero-section">
            <div className="hero-container" style={containerStyle}>
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