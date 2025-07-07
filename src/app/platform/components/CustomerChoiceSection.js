import SvgElement from './SvgElements';

export default function CustomerChoiceSection() {
    return (
        <section className="platform-section">
            <h2 className="platform-heading">Why Customers Choose Kinesis</h2>
            <div className="platform-svg-container">
                <SvgElement id="increasedProfitability" />
                <SvgElement id="improvedEfficiency" />
                <SvgElement id="saferEnvironment" />
            </div>
        </section>
    );
}