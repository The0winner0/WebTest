import SvgElement from './SvgElements';

export default function ApplicationsSection() {
    return (
        <section className="platform-section">
            <h2 className="platform-heading">Applications</h2>
            <div className="platform-svg-container">
                <SvgElement id="locationTag" />
                <SvgElement id="sensorTag" />
                <SvgElement id="widgetTag" />
            </div>
        </section>
    );
}