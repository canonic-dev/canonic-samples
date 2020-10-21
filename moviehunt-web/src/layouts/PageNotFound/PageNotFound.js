import React from "react"
import styles from "./PageNotFound.module.scss"

const PageNotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundWrapper}>
        <h1>404</h1>
        <p>Oh Damn, brb Just fixing the lights!</p>
        <a href="/">
          <button>Back to homepage</button>
        </a>
      </div>
    </div>
  )
}

export default PageNotFound
