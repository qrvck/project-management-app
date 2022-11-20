import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer>
      <div className={`container ${styles.container}`}>
        <p className={styles.copyright}>Copyright | 2022</p>
        <div className={styles.authors}>
          <a className={styles.authorLink} href="https://github.com/qrvck">
            qrvck
          </a>
          <a className={styles.authorLink} href="https://github.com/azozulya">
            azozulya
          </a>
          <a className={styles.authorLink} href="https://github.com/kosirina">
            kosirina
          </a>
        </div>
        <a className={styles.courseLogo} href="https://rs.school/react/" />
      </div>
    </footer>
  );
}

export default Footer;
