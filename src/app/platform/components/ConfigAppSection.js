import Image from 'next/image';
import BobileImage1 from "../../../../public/images/Platform/Platform-mobile-img1.webp";
import BobileImage2 from "../../../../public/images/Platform/Platform-mobile-img2.webp";
import BobileImage3 from "../../../../public/images/Platform/Platform-mobile-img3.webp";


export default function ConfigAppSection() {
    return (
        <section className="platform-section platform-config-app-container">
            <div className="platform-config-app-text">
                <h2 className="platform-heading">Configuration App</h2>
                <p>The Atoll Locate app helps you manage your BLE Tags and Beacons.</p>
                <ul className="platform-list">
                    <li className="platform-list-item">Scan for nearby BLE Tags and Beacons</li>
                    <li className="platform-list-item">Update device configuration</li>
                    <li className="platform-list-item">Locate devices on a map</li>
                </ul>
            </div>
            <div className="platform-config-app-gallery">
                <div className="platform-config-app-image-group">
                    <figure className="platform-config-app-image-item">
                        <Image loading="lazy" width="200" height="auto" src={BobileImage1} />
                    </figure>
                    <figure className="platform-config-app-image-item">
                        <Image loading="lazy" width="200" height="auto" src={BobileImage2} />
                    </figure>
                    <figure className="platform-config-app-image-item">
                        <Image loading="lazy" width="200" height="auto" src={BobileImage3} />
                    </figure>
                </div>
            </div>
        </section>
    );
}