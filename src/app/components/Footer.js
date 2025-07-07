import Image from 'next/image';
import Link from 'next/link';
import FadeInSection from './FadeInSection';

const footerLinks = [
    {
        title: 'Company',
        links: [
            { href: '/about-us', label: 'About' },
            { href: '/contact', label: 'Contact' },
        ],
        delay: 100,
    },
    {
        title: 'Quick Links',
        links: [
            { href: '/platform', label: 'Platform' },
            { href: '/blog', label: 'Blog' },
        ],
        delay: 200,
    },
    {
        title: 'Follow Us',
        links: [
            { href: 'https://x.com/Atollsol', label: 'Twitter' },
            { href: 'https://www.linkedin.com/company/atoll-solutions-pvt-ltd/', label: 'LinkedIn' },
        ],
        delay: 300,
    },
];

const FooterLinkColumn = ({ title, links, delay }) => (
    <FadeInSection delay={delay}>
        <div className="footer-section">
            <h4 className="title">{title}</h4>
            <ul className="footer-links">
                {links.map(link => (
                    <li key={link.href}>
                        <Link href={link.href} className="link">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </FadeInSection>
);

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className="footer-container">
                <FadeInSection delay={10}>
                    <div className="footer-logo-container">
                        <Image src="/images/atoll-solutions-logo.png" alt="Atoll Solutions Logo" className="footer-logo" width={130} height={40} />
                        <p className="footer-tagline">Making location intelligence precise &amp; ubiquitous</p>
                    </div>
                </FadeInSection>
                <div className="footer-grid">
                    {footerLinks.map(column => (
                        <FooterLinkColumn key={column.title} {...column} />
                    ))}
                </div>
            </div>
            <footer className="footer">
                <div className="container">
                    <p>&copy; {currentYear} Atoll Solutions. All rights reserved.</p>
                    <div className="footer-legal-links">
                        <Link href="/privacy" className="footer-legal-link">Privacy Policy</Link>
                        <span>&middot;</span>
                        <Link href="/terms" className="footer-legal-link">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;