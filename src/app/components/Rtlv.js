import FadeInSection from './FadeInSection';
import '../HomeCss/HomeLocation.css';

const rtlvCardData = [
    {
        id: 1,
        title: 'Increased Profitability',
        text: 'through increased product quality and reliability e.g. a logistics company can get timely alerts about the location and condition of their deliveries, and provide a better service to their customers',
        delay: 300,
        rowClass: 'rtlv__feature-card-first-row'
    },
    {
        id: 2,
        title: 'Improved Efficiency',
        text: 'by optimising their processes using reliable location information e.g. a factory can track work items at various stages of production, and identify and address bottlenecks.',
        delay: 400,
        rowClass: 'rtlv__feature-card-first-row'
    },
    {
        id: 3,
        title: 'Safer Environment',
        text: 'through access control for people and geofencing of assets e.g. visitors can be restricted to access only specific areas of a plant, with an alert being sent if they approach a hazardous area.',
        delay: 500,
        rowClass: 'rtlv__feature-card-second-row'
    }
];
const KinesisPlatformSection = () => {
  return (
    <div className="kinesis-platform-container">
      <div className="kinesis-inner-container">

        <div className="kinesis-heading-wrapper">
          <div className="kinesis-heading-widget">
            <div className="kinesis-widget-container">
              <h2 className="kinesis-heading">
                Kinesis : A Sensor-to-API Platform
              </h2>
            </div>
          </div>
        </div>

        <div className="kinesis-text-wrapper">
          <div className="kinesis-text-widget">
            <div className="kinesis-widget-container">
              <p className="kinesis-paragraph">
                Imagine a world where misplaced assets are a distant memory, employee safety is at your fingertips, and your operations runs like a well oiled machine, all thanks to instant location visibility.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


const RtlvCard = ({ id, title, text, delay, rowClass }) => (
    <div className={`rtlv__feature-card rtlv__feature-card-${id} ${rowClass}`}>
        <FadeInSection delay={delay}>
            <h3 className="rtlv__feature-title">{title}</h3>
            <p className="rtlv__feature-text">{text}</p>
        </FadeInSection>
    </div>
);

const Rtlv = () => {
    return (
        <main className="rtlv__container">
        <KinesisPlatformSection />
        <section className="rtlv">
            <div className="rtlv__inner">
                <div className="rtlv__header">
                    <span className="rtlv__icon" aria-hidden="true" />
                    <h2 className="rtlv__heading">
                        Real Time Location Visibility. Kinesis gives you the <br/> 'where' and 'how' <br/> for your people<br/> and<br/> assets
                    </h2>
                </div>
                <div className="rtlv__features">
                    <div className="rtlv__features-first-row">
                        {rtlvCardData.slice(0, 2).map(card => (
                            <RtlvCard key={card.id} {...card} />
                        ))}
                    </div>
                    {rtlvCardData.slice(2).map(card => (
                         <RtlvCard key={card.id} {...card} />
                    ))}
                </div>
            </div>
        </section>
        </main>
    );
};

export default Rtlv;