import React from "react"
import { Transition } from "react-transition-group"

const DURATION = 500

const defaultStyle = duration => ({
  transition: `opacity ${duration}ms cubic-bezier(0.19, 1, 0.22, 1), transform ${duration}ms cubic-bezier(0.19, 1, 0.22, 1)`,
  opacity: 0,
  transform: "scale3d(0.99,0.99,1)",
})

const transitionStyles = {
  entering: {
    position: "absolute",
    opacity: 0,
    transform: "scale3d(0.99,0.99,1)",
  },
  entered: { opacity: 1, transform: "scale3d(1,1,1)" },
  exiting: {
    opacity: 0,
    transform: "scale3d(0.99,0.99,1)",
  },
  exited: {
    position: "absolute",
    opacity: 0,
    transform: "scale3d(0.99,0.99,1)",
  },
}

export function Switch({ value, children, duration }) {
  const updatedChildren = React.Children.map(children, (child, index) => {
    if (child.props[value])
      return React.cloneElement(child, { active: true, duration })
    return React.cloneElement(child, { duration })
  })

  return updatedChildren
}

export function Case({
  children,
  active,
  style = {},
  childStyle = {},
  duration = DURATION,
}) {
  return (
    <Transition in={active} timeout={duration - 200} mountOnEnter unmountOnExit>
      {state => (
        <div
          style={{
            position: "relative",
            width: "100%",
            // height: "100%",
            overflow: "hidden",
            ...style,
          }}
        >
          <div
            className={state}
            style={{
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              ...childStyle,
              ...defaultStyle(duration),
              ...transitionStyles[state],
            }}
          >
            {children}
          </div>
        </div>
      )}
    </Transition>
  )
}
