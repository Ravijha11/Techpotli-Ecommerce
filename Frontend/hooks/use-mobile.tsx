import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    // Set initial value after hydration
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    setIsHydrated(true)

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return false during SSR and before hydration to prevent mismatch
  return isHydrated ? isMobile : false
}
