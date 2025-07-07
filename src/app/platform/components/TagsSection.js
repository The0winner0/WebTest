import SvgElement from './SvgElements';

export default function TagsSection() {
    return (
        <section className="platform-section">
            <div>
                <h2 className="platform-heading">Tags for Location Visibility</h2>
                <p>Atoll Solutions offers a wide range of standard and customisable Tags for all your Location Visibility needs. These devices can be used wherever you need low power sensors, widgets or location identifiers. Tags may be used for either movable applications (as a Tracker) or immovable applications (as a Beacon).</p>
                <p>
                    <span className="platform-tags-description-large">We offer three families of tags based on the supported technologies</span>
                </p>
            </div>
            <div className="platform-svg-container">
                <SvgElement id="agTag" />
                <SvgElement id="auTag" />
                <SvgElement id="acTag" />
            </div>
        </section>
    );
}