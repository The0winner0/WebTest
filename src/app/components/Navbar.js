"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../HomeCss/Navbar.css';
import logo from '../../../public/images/Logo-for-Website.png';

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/platform", label: "Platform" },
    { href: "/products", label: "Products" },
    { href: "/blog", label: "Blog" },
    { href: "/about-us", label: "About Us" }
];

const socialLinks = [
    {
        href: "https://twitter.com/Atollsol",
        label: "Twitter",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
    },
    {
        href: "https://www.youtube.com/@atollsolutions7749",
        label: "YouTube",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.887 3.427 0 5.282 0 12s.887 8.573 4.385 8.816c3.6.245 11.626.246 15.23 0C23.113 20.573 24 18.718 24 12s-.887-8.573-4.385-8.816zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
    },
    {
        href: "https://www.linkedin.com/company/atoll-solutions-pvt-ltd",
        label: "LinkedIn",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
    }
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 10) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY <= 0 ? 0 : currentScrollY);
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);
    
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const navbarClasses = `navbar ${!isVisible ? 'navbar--hidden' : ''} ${isMenuOpen ? 'navbar--menu-open' : ''}`;

    return (
        <header>
            <div id="wrapper-navbar" className={navbarClasses}>
                <div className="navbar__container">
                    <Link href="/" className="navbar__brand">
                        <Image src={logo} alt="Atoll Solutions" className="navbar__logo" width={150} height={45} priority />
                    </Link>
                    <div className="navbar__collapsible">
                        <nav className="navbar__menu">
                            <ul className="menu">
                                {navLinks.map((link) => (
                                    <li key={link.href} className="menu__item">
                                        <Link href={link.href} className="menu__link">{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="navbar__extras">
                            <div className="social-icons">
                                {socialLinks.map((social) => (
                                    <a key={social.label} href={social.href} className={`social-icons__link social-icons__${social.label}`} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                            <Link href="/contact" className="nav-button">Contact Us</Link>
                        </div>
                    </div>
                    <button className="hamburger" aria-label="Toggle Menu" onClick={toggleMenu}>
                        <span className="hamburger__bar" />
                        <span className="hamburger__bar" />
                        <span className="hamburger__bar" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;