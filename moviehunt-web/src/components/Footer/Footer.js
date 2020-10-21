import React from "react"
import styles from "./Footer.module.scss"

const Footer = ({ className = "" }) => {
  return (
    <footer className={`${styles.footer} ${className}`}>
      <div className={styles.footerRow}>
        <div className={styles.footerRowLogo}>
          Built with{" "}
          <a
            href="https://canonic.dev"
            rel="noopener norefferer"
            target="_blank"
          >
            Canonic
          </a>
        </div>
        <div className={styles.footerRowCopyright}>
          © {new Date().getFullYear()} — All Rights Reserved
        </div>
      </div>
    </footer>
  )
}

export default Footer
