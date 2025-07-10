'use client';
import { useState, useEffect, useRef, useReducer } from 'react';
import PageHeading from '../components/PageHeading';
import '../style/Contact.css';

const useIntersectionObserver = (options) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = containerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options]);

    return [containerRef, isVisible];
};


const AnimatedWrapper = ({ children, animationClass, delay = 0 }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    const style = {
        transitionDelay: `${delay}ms`,
    };

    return (
        <div ref={ref} style={style} className={`${animationClass} ${isVisible ? 'is-visible' : ''}`}>
            {children}
        </div>
    );
};

const contactDetails = [
    {
        icon: (
            <svg aria-hidden="true" className="info-card__icon-svg" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
            </svg>
        ),
        title: "Phone Number",
        content: "+91 8040944502",
        animation: "fade-in-left-animate",
        delay: 200,
    },
    {
        icon: (
            <svg aria-hidden="true" className="info-card__icon-svg" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
            </svg>
        ),
        title: "Email",
        content: "sales@atollsolutions.com",
        animation: "fade-in-animate",
        delay: 400,
    },
    {
        icon: (
            <svg aria-hidden="true" className="info-card__icon-svg" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z"></path>
            </svg>
        ),
        title: "Address",
        content: `Atoll Solutions Private Limited
1st Floor, 143, 10th Cross, 1st stage, Indiranagar, Bengaluru, 560038`,
        animation: "fade-in-right-animate",
        delay: 600,
    },
];

const InfoCard = ({ icon, title, content }) => (
    <div className="info-card">
        <div className="info-card__icon-wrapper">
            <div className="info-card__icon-bg">
                {icon}
            </div>
        </div>
        <p className="info-card__title">{title}</p>
        <p className="info-card__content">{content}</p>
    </div>
);


const initialState = {
    formData: { name: '', email: '', subject: '', message: '' },
    status: 'idle',
    errors: {},
};

function formReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_FIELD':
            return {
                ...state,
                formData: { ...state.formData, [action.payload.name]: action.payload.value },
                errors: { ...state.errors, [action.payload.name]: null },
            };
        case 'SET_ERRORS':
            return { ...state, errors: action.payload };
        case 'SET_STATUS':
            return { ...state, status: action.payload };
        case 'RESET_FORM':
            return initialState;
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const ContactForm = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const { formData, status, errors } = state;

    const validate = () => {
        const tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'Your name is required.';
        if (!formData.email.trim()) {
            tempErrors.email = 'Your email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Please enter a valid email.';
        }
        if (!formData.subject.trim()) tempErrors.subject = 'A subject is required.';
        if (!formData.message.trim()) tempErrors.message = 'A message is required.';


        dispatch({ type: 'SET_ERRORS', payload: tempErrors });
        return Object.keys(tempErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'CHANGE_FIELD', payload: { name, value } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            dispatch({ type: 'SET_STATUS', payload: 'error' });
            return;
        }

        dispatch({ type: 'SET_STATUS', payload: 'submitting' });

        try {
            const response = await fetch('https://formspree.io/f/myzjpaer', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                dispatch({ type: 'SET_STATUS', payload: 'success' });
                setTimeout(() => dispatch({ type: 'RESET_FORM' }), 3000);
            } else {
                const data = await response.json();
                const serverErrors = data.errors.reduce((acc, err) => {
                    acc[err.field] = err.message;
                    return acc;
                }, {});
                dispatch({ type: 'SET_ERRORS', payload: serverErrors });
                throw new Error('Form submission failed with validation errors');
            }
        } catch (error) {
            console.error(error);
            dispatch({ type: 'SET_STATUS', payload: 'error' });
        }
    };

    return (
        <section className="contact-form-section">
            <div className="contact-form-wrapper">
                <div className="form-header">
                    <h3 className="form-title">Contact Us</h3>
                    <p className="form-subtitle">Have a question or want to work together? Fill out the form below.</p>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-fields">
                        <div className={`form-group ${formData.name ? 'has-value' : ''}`}>
                            <input type="text" name="name" id="your-name" value={formData.name} onChange={handleInputChange} required className="form-input" aria-describedby="name-error" />
                            <label htmlFor="your-name" className="form-label">Name</label>
                            {errors.name && <p id="name-error" className="form-error">{errors.name}</p>}
                        </div>
                        <div className={`form-group ${formData.email ? 'has-value' : ''}`}>
                            <input type="email" name="email" id="your-email" value={formData.email} onChange={handleInputChange} required className="form-input" aria-describedby="email-error" />
                            <label htmlFor="your-email" className="form-label">Email</label>
                            {errors.email && <p id="email-error" className="form-error">{errors.email}</p>}
                        </div>
                        <div className={`form-group ${formData.subject ? 'has-value' : ''}`}>
                            <input type="text" name="subject" id="your-subject" value={formData.subject} onChange={handleInputChange} required className="form-input" aria-describedby="subject-error" />
                            <label htmlFor="your-subject" className="form-label">Subject</label>
                            {errors.subject && <p id="subject-error" className="form-error">{errors.subject}</p>}
                        </div>
                        <div className={`form-group ${formData.message ? 'has-value' : ''}`}>
                            <textarea name="message" id="your-message" rows="5" value={formData.message} onChange={handleInputChange} className="form-textarea"></textarea>
                            <label htmlFor="your-message" className="form-label">Message</label>
                            {errors.message && <p id="message-error" className="form-error">{errors.message}</p>}
                        </div>
                    </div>
                    <div className="form-submit-wrapper">
                        <button type="submit" disabled={status === 'submitting'} className="form-submit-button">
                            {status === 'submitting' ? <div className="spinner"></div> : 'Send Message'}
                        </button>
                    </div>
                    <div className="form-status-message">
                        {status === 'success' && <p className="status-success">Message sent successfully!</p>}
                        {status === 'error' && Object.keys(errors).length === 0 && <p className="status-error">Something went wrong. Please try again.</p>}
                    </div>
                </form>
            </div>
        </section>
    );
};
export default function ContactPage() {
    return (
        <div className="contact-page">
        <main className="page-wrapper">
            <section className="hero-section">
                <div className="container">
                    <PageHeading title="Contact" />
                    <h1 className="hero-section__heading">
                        Get in touch
                    </h1>
                    <p className="hero-section__paragraph">
                        Contact us today! Our team of experts is eager to discuss your specific needs and design a customized RTLS solution that empowers you.
                    </p>
                </div>
            </section>

            <div className="spacer"></div>

            <section className="form-section">
                <div className="container">
                    <div className="form-container">
                        <ContactForm />
                    </div>
                </div>
            </section>

            <section className="info-section">
                <div className="container">
                    <div className="info-grid">
                        {contactDetails.map((detail, index) => (
                            <AnimatedWrapper key={index} animationClass={detail.animation} delay={detail.delay}>
                                <InfoCard icon={detail.icon} title={detail.title} content={detail.content} />
                            </AnimatedWrapper>
                        ))}
                    </div>
                </div>
            </section>
        </main>
        </div>
    );
}