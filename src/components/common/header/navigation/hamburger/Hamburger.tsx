import React from 'react';
import styles from './Hamburger.module.scss';

interface IHamburgerProps {
  isSticky: boolean;
  isOpen: boolean;
  toggleHamburger: () => void;
}

function Hamburger({ isSticky, isOpen, toggleHamburger }: IHamburgerProps) {
  return (
    <div className={styles.hamburger} onClick={toggleHamburger}>
      <div
        className={`${styles.line} ${styles.line1} ${isSticky ? styles.sticky : ''} ${
          isOpen ? styles.open : ''
        }`}
      />
      <div
        className={`${styles.line} ${styles.line2} ${isSticky ? styles.sticky : ''} ${
          isOpen ? styles.open : ''
        }`}
      />
      <div
        className={`${styles.line} ${styles.line3} ${isSticky ? styles.sticky : ''} ${
          isOpen ? styles.open : ''
        }`}
      />
    </div>
  );
}

export default Hamburger;
