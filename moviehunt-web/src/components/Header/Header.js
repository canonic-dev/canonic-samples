import React from "react"
import Link from "gatsby-plugin-transition-link"

import styles from "./Header.module.scss"

export default function Header({ className = "" }) {
  const [isConsentGiven, setIsConsentGiven] = React.useState(true)
  const headerClassNames = [styles.header, className].join(" ").trim()
  const consentGivenClassName = isConsentGiven ? styles.isConsentGiven : ""

  const giveConsent = React.useCallback(() => {
    localStorage.isConsentGiven = true
    setIsConsentGiven(true)
  }, [])

  const logout = React.useCallback(() => {
    delete localStorage.token
    window.location = "/login"
  }, [])

  React.useEffect(() => {
    setIsConsentGiven(localStorage.getItem("isConsentGiven"))
  }, [])

  return (
    <div className={styles.headerWrapper}>
      <div className={`${styles.cookieStrip} ${consentGivenClassName}`}>
        <p>We use cookies to personalize your experience.</p>
        <button onClick={giveConsent}>Close</button>
      </div>
      <header className={headerClassNames}>
        <div className={styles.headerColumn}>
          <Link to="/" entry={{ length: 0.3 }} exit={{ length: 0.3 }}>
            <div className={styles.headerLogo}>MH</div>
          </Link>
        </div>
        <div
          onClick={logout}
          className={`${styles.headerColumn} ${styles.alignRight} ${styles.logout}`}
        >
          Logout
        </div>
      </header>
    </div>
  )
}
