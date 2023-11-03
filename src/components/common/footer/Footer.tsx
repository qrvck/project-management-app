import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer>
      <div className={`container ${styles.container}`}>
        <p className={styles.copyright}>Copyright | 2022</p>
        <div className={styles.authors}>
          <a
            className={styles.authorLink}
            href="https://github.com/qrvck"
            target="_blank"
            rel="noreferrer"
          >
            qrvck
          </a>
          <a
            className={styles.authorLink}
            href="https://github.com/azozulya"
            target="_blank"
            rel="noreferrer"
          >
            azozulya
          </a>
          <a
            className={styles.authorLink}
            href="https://github.com/kosirina"
            target="_blank"
            rel="noreferrer"
          >
            kosirina
          </a>
        </div>
        <a
          className={styles.courseLogo}
          href="https://rs.school/react/"
          target="_blank"
          rel="noreferrer"
        />
      </div>
    </footer>
  );
}

export default Footer;
