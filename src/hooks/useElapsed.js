import { useState, useEffect } from 'react'

export function useElapsed(baseDate) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  let ms = Math.max(0, now - baseDate)
  const days = Math.floor(ms / 86400000); ms -= days * 86400000
  const hours = Math.floor(ms / 3600000);  ms -= hours * 3600000
  const minutes = Math.floor(ms / 60000);  ms -= minutes * 60000
  const seconds = Math.floor(ms / 1000)
  return { days, hours, minutes, seconds }
}
