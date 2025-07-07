import SvgElement from './SvgElements';

export default function IotPlatformSection() {
    return (
        <section className="platform-section">
            <h2 className="platform-heading">Configurable, End-To-End IoT Platform</h2>
            <div className="platform-svg-container">
                <SvgElement id="cloudLayer" />
                <SvgElement id="edgeLayer" />
                <SvgElement id="infrastructureLayer" />
                <SvgElement id="sensorLayer" />
            </div>
        </section>
    );
}