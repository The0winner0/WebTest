'use client';
import dynamic from 'next/dynamic';
import PlatformSection from './components/PlatformSection';


const sectionLoader = () => <div style={{ height: '400px', width: '100%' }} />;

const LazyVideoPlayer = dynamic(() => import('../components/VideoPlayer'), {
    loading: () => <div style={{ height: '500px', width: '100%', backgroundColor: '#eee' }} />,
    ssr: false,
});
const LazyKinesisHighlights = dynamic(() => import('./components/KinesisHighlightsListSection'), { loading: sectionLoader });
const LazyCustomerChoice = dynamic(() => import('./components/CustomerChoiceSection'), { loading: sectionLoader });
const LazyUseCases = dynamic(() => import('./components/UseCasesSection'), { loading: sectionLoader });
const LazyIotPlatform = dynamic(() => import('./components/IotPlatformSection'), { loading: sectionLoader });
const LazyTags = dynamic(() => import('./components/TagsSection'), { loading: sectionLoader });
const LazyApplications = dynamic(() => import('./components/ApplicationsSection'), { loading: sectionLoader });
const LazyConfigApp = dynamic(() => import('./components/ConfigAppSection'), { loading: sectionLoader });


export default function Page() {
    return (
        <main className="platform-main">
            <div className="platform-container">
                <div style={{ marginTop: '50px' }}></div>
                <PlatformSection />
                <LazyVideoPlayer />
                <LazyKinesisHighlights />
                <LazyCustomerChoice />
                <LazyUseCases />
                <LazyIotPlatform />
                <LazyTags />
                <LazyApplications />
                <LazyConfigApp />
            </div>
        </main>
    );
}