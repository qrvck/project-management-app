import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.scss';

function Header() {
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef?.current?.getBoundingClientRect() as DOMRect;
    const updateHeaderOnScroll = () => {
      if (window.pageYOffset > header.top + header.height) {
        setSticky({ isSticky: true, offset: header.height });
      } else {
        setSticky({ isSticky: false, offset: 0 });
      }
    };

    window.addEventListener('scroll', updateHeaderOnScroll);

    return () => {
      window.removeEventListener('scroll', updateHeaderOnScroll);
    };
  }, []);

  return (
    <header
      className={sticky.isSticky ? `${styles.header} ${styles.sticky}` : styles.header}
      ref={headerRef}
    >
      <div className={`container ${styles.container}`}>
        <h1 className={styles.logo}>Project Management</h1>
      </div>
    </header>
  );
}

export default Header;
