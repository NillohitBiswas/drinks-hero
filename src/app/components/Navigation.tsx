'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navigation.module.css';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navTopButtonRef = useRef<HTMLButtonElement>(null);

  // Hamburger menu handlers
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Animate Buy Beer button on mount
  useEffect(() => {
    if (navTopButtonRef.current) {
      gsap.from(navTopButtonRef.current, { xPercent: 200, duration: 0.8, delay: 0.3, ease: 'power3.out' });
    }
  }, []);

  return (
    <>
      <nav
        id="nav_top"
        className={styles.navTop}
      >
        <a href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.png" alt="Thameside Logo" width={200} height={190} priority />
        </a>
        <button ref={navTopButtonRef} className={styles.buyBeerBtn}>Buy Beer</button>
      </nav>
      <nav id="nav_left" className={styles.navLeft}>
        <div className={styles.hamburgerIcon} onClick={toggleMenu}>
          <i className={`ri-menu-line ${isMenuOpen ? styles.open : ''}`}></i>
        </div>
        <i className="ri-search-line"></i>
      </nav>
      {/* Hamburger Menu (All Devices) */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <button className={styles.closeMenuBtn} onClick={closeMenu} aria-label="Close menu">&times;</button>
        <ul>
          <li><a href="/" onClick={closeMenu}>Home</a></li>
          <li><a href="/about" onClick={closeMenu}>About</a></li>
          <li><a href="/contact" onClick={closeMenu}>Contact</a></li>
          <li><a href="/blog" onClick={closeMenu}>Blog</a></li>
          <li><a href="/product" onClick={closeMenu}>Products</a></li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
