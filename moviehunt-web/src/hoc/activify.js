import React from "react"

export default function activify(Component, config = {}) {
  return ({ active, ...props }) => {
    const [isVisible, setIsVisible] = React.useState(
      !config.animateIn ? active : false
    )
    const [isEnabled, setIsEnabled] = React.useState(
      !config.animateIn ? active : false
    )
    const timeout = React.useRef()
    React.useEffect(() => {
      let intervalTimeout = active ? 50 : 200
      let setFirst = active ? setIsEnabled : setIsVisible
      let setSecond = active ? setIsVisible : setIsEnabled

      setFirst(active)
      clearTimeout(timeout.current)
      try {
        timeout.current = setTimeout(() => setSecond(active), intervalTimeout)
      } catch (e) {}
    }, [active])

    if (!isEnabled) return null
    return <Component {...props} active={isVisible} />
  }
}
