import React from "react"
import useLogin from "@src/api/useLogin"

const Auth = () => {
  const login = useLogin()
  React.useEffect(() => {
    login(new URLSearchParams(window.location.search).get("code"), "GOOGLE")
      .then(({ token }) => {
        localStorage.token = token
        window.location = "/"
      })
      .catch(e => {
        console.error(e)
        window.location = "/login"
      })
  }, [])

  return null
}

export default Auth
