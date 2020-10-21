import React from "react"
import Header from "@src/components/Header"

export const wrapPageElement = ({ element, props }) => {
  return <Layout element={element} props={props} />
}

function Layout({ element, props }) {
  return (
    <div>
      <Header {...props} />
      {element}
    </div>
  )
}
