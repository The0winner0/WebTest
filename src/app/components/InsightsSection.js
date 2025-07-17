import Link from 'next/link';
import '../HomeCss/InsightsSection.css';

const InsightsSection = ({ data }) => {
  const { insightsTitle, insightsButtonText, insightsButtonLink } = data;

  return (
    <section className="insights-section-wrapper">
      <div className="insights-section-container">
        <div className="insights-section-column insights-section-left">
          <div className="insights-section-widget-wrap">
            <h2 className="insights-section-heading">
              {insightsTitle}
            </h2>
          </div>
        </div>

        <div className="insights-section-column insights-section-right">
          <div className="insights-section-widget-wrap">
            <div className="insights-section-button-wrapper">
              <Link href={insightsButtonLink || '/blog'} className="insights-section-button">
                <span className="insights-section-button-content">
                  <span className="insights-section-button-text">{insightsButtonText}</span>
                  <span className="insights-section-button-icon">
                    <svg
                      aria-hidden="true"
                      viewBox="10 10 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                      className="insights-section-button-svg"
                    >
                      <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path>
                    </svg>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;