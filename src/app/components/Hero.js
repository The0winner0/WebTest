import Image from 'next/image';
import '../HomeCss/Hero.css';
import backgroundImgDesktop from '../../../public/images/Featured-Image-scaled.webp';
import backgroundImgMobile from '../../../public/images/Featured-Image-Mobile34.webp';
import pinImg from '../../../public/images/Pin.png';

const pins = [
    { top: '10%', left: '30%' },
    { top: '45%', left: '33%' },
    { top: '12%', left: '53%' },
    { top: '50%', left: '43%' },
    { top: '44%', left: '83%' },
];

const Pin = ({ style }) => (
    <div className="pin" style={style}>
        <Image 
            src={pinImg}
            alt="map pin" 
            width={34} 
            height={52} 
        />
    </div>
);

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-container">
                <Image
                    src={backgroundImgDesktop}
                    alt="Location intelligence map"
                    width={1536}
                    height={496}
                    className="background-img background-img--desktop"
                    priority
                />
                <Image
                    src={backgroundImgMobile}
                    alt="Location intelligence map"
                    width={461}
                    height={487}
                    className="background-img background-img--mobile"
                    priority
                />
                {pins.map((pin, index) => (
                    <Pin key={index} style={pin} />
                ))}
            </div>
            <div className="hero-text-section">
                <div className="container">
                    <h1 className="title-large">Making Location Intelligence</h1>
                    <h1 className="title-gradient">Precise &amp; Ubiquitous</h1>
                    <p className="description">
                        We provide reliable and real-time location visibility with our scalable end-to-end IoT platform. <br /> Get in touch to see how it can help you implement your digital transformation.
                    </p>
                    <button className="button" href="/contact">Book a Demo</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;