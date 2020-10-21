import React from "react"
import { TransitionState } from "gatsby-plugin-transition-link"
import useAuthenticate from "@src/api/useAuthenticate"

import SEO from "../seo"
import Footer from "../Footer"
import Loader from "../Loader"
import styles from "./Layout.module.scss"

export default function Layout({
  children,
  title,
  description,
  className = "",
  url,
  type,
}) {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const authenticate = useAuthenticate()
  React.useEffect(() => {
    setLoading(true)
    authenticate(localStorage.token)
      .then(({ token, user }) => {
        localStorage.token = token
        setUser(user)
        if (type === "NON_AUTH_ONLY") window.location = "/"
      })
      .catch(e => {
        if (type === "AUTH_ONLY") window.location = "/login"
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <div
          className={`${styles.layout} ${className} ${styles[transitionStatus]}`}
        >
          <SEO title={title} description={description} lang="en-US" url={url} />
          {loading ? (
            <div className={styles.layoutLoading}>
              <Loader />
            </div>
          ) : typeof children === "function" ? (
            children({ user })
          ) : (
            children
          )}
          <Footer />
        </div>
      )}
    </TransitionState>
  )
}
