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
    const style = { transitionDelay: `${delay}ms` };

    return (
        <div ref={ref} style={style} className={`${animationClass} ${isVisible ? 'is-visible' : ''}`}>
            {children}
        </div>
    );
};

const InfoCard = ({ iconSvg, title, content }) => (
    <div className="info-card">
        <div className="info-card__icon-wrapper">
            <div
                className="info-card__icon-bg"
                dangerouslySetInnerHTML={{ __html: iconSvg }}
            />
        </div>
        <p className="info-card__title">{title}</p>
        <div
            className="info-card__content"
            dangerouslySetInnerHTML={{ __html: content }}
        />
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

export default function ContactClient({ pageData }) {
    if (!pageData) {
        return <p>Contact information could not be loaded.</p>;
    }

    const { heroHeading, heroParagraph, contactDetails } = pageData;

    return (
        <div className="contact-page">
            <main className="page-wrapper">
                <section className="hero-section">
                    <div className="container">
                        <PageHeading title="Contact" />
                        <h1 className="hero-section__heading">{heroHeading}</h1>
                        <p className="hero-section__paragraph">{heroParagraph}</p>
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
                            {contactDetails?.map((detail, index) => (
                                <AnimatedWrapper key={index} animationClass={detail.animationClass} delay={detail.delay}>
                                    <InfoCard
                                        iconSvg={detail.iconSvg}
                                        title={detail.title}
                                        content={detail.content}
                                    />
                                </AnimatedWrapper>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}