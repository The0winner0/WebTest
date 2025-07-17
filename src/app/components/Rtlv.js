import FadeInSection from './FadeInSection';
import '../HomeCss/HomeLocation.css';

const KinesisPlatformSection = ({ title, description }) => {
    return (
        <div className="kinesis-platform-container">
            <div className="kinesis-inner-container">
                <div className="kinesis-heading-wrapper">
                    <div className="kinesis-heading-widget">
                        <div className="kinesis-widget-container">
                            <h2 className="kinesis-heading">{title}</h2>
                        </div>
                    </div>
                </div>
                <div className="kinesis-text-wrapper">
                    <div className="kinesis-text-widget">
                        <div className="kinesis-widget-container">
                            <p className="kinesis-paragraph">{description}</p>
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

const Rtlv = ({ data }) => {
    const { kinesisTitle, kinesisDescription, rtlvTitle, rtlvFeatures } = data;

    // Split features for layout assuming there will always be 3
    const firstRowFeatures = rtlvFeatures.slice(0, 2);
    const secondRowFeatures = rtlvFeatures.slice(2);

    return (
        <main className="rtlv__container">
            <KinesisPlatformSection title={kinesisTitle} description={kinesisDescription} />
            <section className="rtlv">
                <div className="rtlv__inner">
                    <div className="rtlv__header">
                        <span className="rtlv__icon" aria-hidden="true" />
                        <h2 
                            className="rtlv__heading"
                            dangerouslySetInnerHTML={{ __html: rtlvTitle.replace(/\n/g, '<br />') }}
                        />
                    </div>
                    <div className="rtlv__features">
                        <div className="rtlv__features-first-row">
                            {firstRowFeatures.map((card, index) => (
                                <RtlvCard 
                                    key={card.id} 
                                    id={card.id}
                                    title={card.title}
                                    text={card.description}
                                    delay={300 + index * 100}
                                    rowClass="rtlv__feature-card-first-row"
                                />
                            ))}
                        </div>
                        {secondRowFeatures.map((card, index) => (
                            <RtlvCard 
                                key={card.id} 
                                id={card.id}
                                title={card.title}
                                text={card.description}
                                delay={500 + index * 100}
                                rowClass="rtlv__feature-card-second-row"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Rtlv;